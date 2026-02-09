"use client"

import { useEffect, useState } from "react"

interface SponsorContact {
  id: string
  firstName: string
  lastName: string
  company: string
  workEmail: string
  phone: string
  message: string
  status: string
  submittedAt: string
}

const STATUSES = [
  { value: "", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
]

export default function SponsorContactsPage() {
  const [contacts, setContacts] = useState<SponsorContact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [selectedContact, setSelectedContact] = useState<SponsorContact | null>(null)
  const [isDeletingAll, setIsDeletingAll] = useState(false)

  useEffect(() => {
    fetchContacts()
  }, [statusFilter])

  async function fetchContacts() {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.set("status", statusFilter)

      const response = await fetch(`/api/admin/data/sponsor-contacts?${params}`, {
        credentials: "include",
      })
      const data = await response.json()
      setContacts(data.contacts || [])
    } catch (error) {
      console.error("Failed to fetch sponsor contacts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredContacts = contacts.filter((c) => {
    if (!search) return true
    const s = search.toLowerCase()
    return (
      c.firstName?.toLowerCase().includes(s) ||
      c.lastName?.toLowerCase().includes(s) ||
      c.workEmail?.toLowerCase().includes(s) ||
      c.company?.toLowerCase().includes(s)
    )
  })

  const exportToCSV = () => {
    const headers = ["First Name", "Last Name", "Company", "Email", "Phone", "Message", "Status", "Date"]
    const rows = filteredContacts.map((c) => [
      c.firstName || "",
      c.lastName || "",
      c.company || "",
      c.workEmail || "",
      c.phone || "",
      c.message || "",
      c.status || "",
      c.submittedAt ? new Date(c.submittedAt).toLocaleDateString() : "",
    ])

    const escapeCSV = (value: string) => {
      if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    }

    const csv = [headers, ...rows].map((row) => row.map(escapeCSV).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `sponsor-contacts-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  async function deleteContact(id: string) {
    if (!confirm("Are you sure you want to delete this sponsor inquiry?")) return

    try {
      const response = await fetch(`/api/admin/data/sponsor-contacts?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        fetchContacts()
      }
    } catch (error) {
      console.error("Failed to delete contact:", error)
    }
  }

  async function deleteAllContacts() {
    if (!confirm("Are you sure you want to delete ALL sponsor inquiries? This action cannot be undone.")) return
    if (!confirm("This will permanently remove all sponsor contact data. Are you absolutely sure?")) return

    setIsDeletingAll(true)
    try {
      const response = await fetch("/api/admin/data/sponsor-contacts?id=all", {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        fetchContacts()
      }
    } catch (error) {
      console.error("Failed to delete all contacts:", error)
    } finally {
      setIsDeletingAll(false)
    }
  }

  return (
    <div className="p-8 lg:p-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-black mb-1">
            Sponsor Inquiries
          </h1>
          <p className="text-sm text-neutral-500">
            {filteredContacts.length} inquiries found
          </p>
        </div>
        <div className="flex items-center gap-3">
          {contacts.length > 0 && (
            <button
              onClick={deleteAllContacts}
              disabled={isDeletingAll}
              className="px-4 py-2 text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {isDeletingAll ? "Deleting..." : "Delete All"}
            </button>
          )}
          <button
            onClick={exportToCSV}
            disabled={filteredContacts.length === 0}
            className="px-4 py-2 text-sm font-medium bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-neutral-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-50">
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, email, company..."
              className="w-full px-3 py-2 bg-white border border-neutral-200 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
            />
          </div>
          <div className="w-40">
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-neutral-200 text-sm text-black focus:outline-none focus:border-black"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-neutral-200 border-t-black rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-neutral-500">Loading sponsor inquiries...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm text-neutral-500">No sponsor inquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-400">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-400">
                    Company
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-400">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-400">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-400">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-400">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-neutral-50 transition-colors"
                  >
                    <td
                      className="px-4 py-3 text-sm font-medium text-black cursor-pointer"
                      onClick={() => setSelectedContact(contact)}
                    >
                      {contact.firstName} {contact.lastName}
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-neutral-600 cursor-pointer"
                      onClick={() => setSelectedContact(contact)}
                    >
                      {contact.company}
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-neutral-600 cursor-pointer"
                      onClick={() => setSelectedContact(contact)}
                    >
                      {contact.workEmail}
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-neutral-600 cursor-pointer"
                      onClick={() => setSelectedContact(contact)}
                    >
                      {contact.phone || "—"}
                    </td>
                    <td
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => setSelectedContact(contact)}
                    >
                      <StatusBadge status={contact.status} />
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-neutral-500 cursor-pointer"
                      onClick={() => setSelectedContact(contact)}
                    >
                      {contact.submittedAt
                        ? new Date(contact.submittedAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteContact(contact.id)
                        }}
                        className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                        title="Delete inquiry"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedContact && (
        <ContactDetailModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-red-600 text-white",
    contacted: "bg-neutral-800 text-white",
    closed: "bg-neutral-200 text-neutral-500",
  }

  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-medium uppercase tracking-wider ${
        styles[status] || styles.new
      }`}
    >
      {status}
    </span>
  )
}

function ContactDetailModal({
  contact,
  onClose,
}: {
  contact: SponsorContact
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1">
              Sponsor Inquiry
            </p>
            <h2 className="text-lg font-semibold text-black">
              {contact.firstName} {contact.lastName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <DetailRow label="Company" value={contact.company} />
          <DetailRow label="Email" value={contact.workEmail} />
          <DetailRow label="Phone" value={contact.phone || "—"} />
          <DetailRow label="Status" value={contact.status} capitalize />
          <DetailRow
            label="Submitted"
            value={
              contact.submittedAt
                ? new Date(contact.submittedAt).toLocaleString()
                : "—"
            }
          />
          <div>
            <dt className="text-sm text-neutral-500 mb-2">Message</dt>
            <dd className="text-sm text-black bg-neutral-50 p-4 rounded-lg whitespace-pre-wrap leading-relaxed">
              {contact.message}
            </dd>
          </div>
        </div>
        <div className="p-6 border-t border-neutral-200">
          <button
            onClick={onClose}
            className="w-full py-2 text-sm font-medium text-neutral-600 hover:text-black transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function DetailRow({
  label,
  value,
  capitalize,
}: {
  label: string
  value: string
  capitalize?: boolean
}) {
  return (
    <div className="flex justify-between items-start gap-4">
      <dt className="text-sm text-neutral-500 shrink-0">{label}</dt>
      <dd
        className={`text-sm text-black text-right ${capitalize ? "capitalize" : ""}`}
      >
        {value}
      </dd>
    </div>
  )
}
