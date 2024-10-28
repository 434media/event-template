import { Container } from '~/components/ui/Container';
import { FadeIn } from '~/components/ui/FadeIn';

export function TechBloc() {
   return (
      <>
      <div className="mx-2 my-40 rounded-3xl bg-neutral-950 bg-[url('https://res.cloudinary.com/jessebubble/image/upload/v1727662921/duotone-dots-2-dots_axkyty.png')] bg-cover bg-right pb-24 pt-72 lg:pt-36">
         <Container>
            <FadeIn>
               <div className="grid grid-cols-1 lg:grid-cols-[384px_1fr_1fr]">
                  <div className="-mt-80 lg:-mt-52">
                     <div className="-m-2 rounded-3xl bg-white/15 shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:max-w-xs">
                        <div className="rounded-3xl p-2 shadow-md shadow-black/5">
                           <div className="overflow-hidden rounded-3xl shadow-2xl outline outline-1 -outline-offset-1 outline-black/10">
                              <img
                                 alt="profile headshot of Tech Bloc CEO Ileana Gonzalez"
                                 src="https://res.cloudinary.com/jessebubble/image/upload/v1714685480/ileana2_mif5p4.jpg"
                                 className="aspect-[3/4] w-full object-cover"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex max-lg:mt-16 lg:col-span-2 lg:px-16">
                     <figure className="mx-auto flex max-w-xl flex-col gap-16 max-lg:text-center">
                        <blockquote>
                           <p className="relative text-3xl tracking-tight text-white before:absolute before:-translate-x-full before:content-['“'] after:absolute after:content-['”'] lg:text-4xl">
                              It's time to stop asking for permission, let's
                              collaborate and drive San Antonio's tech future
                              forward!
                           </p>
                        </blockquote>
                        <figcaption className="mt-auto">
                           <p className="text-sm/6 font-medium text-white">
                              Ileana Gonzalez
                           </p>
                           <p className="text-sm/6 font-medium">
                              <span className="bg-gradient-to-r from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] bg-clip-text text-transparent">
                                 CEO Tech Bloc
                              </span>
                           </p>
                        </figcaption>
                     </figure>
                  </div>
               </div>
            </FadeIn>
         </Container>
      </div>

      <div className="-mt-24 py-16 sm:py-32">
        <Container className="">
        <FadeIn>
                <img
                    src="https://res.cloudinary.com/jessebubble/image/upload/v1729697036/techday-header_odewv9.svg"
                    className="h-full w-full object-contain"
                    alt="Tech Day Logo"
                />
        </FadeIn>
        </Container>
        </div>
      </>
   );
}