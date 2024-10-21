import { clsx } from 'clsx'

export function TechHost({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'flex justify-between max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-4',
      )}
    >
      <img
        alt="Tech Bloc"
        src="https://res.cloudinary.com/jessebubble/image/upload/v1714771175/TB_Full_Logo_lpeeau.png"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      <img
        alt="Rackspace"
        src="https://www.rackspace.com/themes/custom/hansel/images/rs-logo-2021B.svg"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      <img
        alt="MGV Capital Group"
        src="https://mgvcapital.com/wp-content/themes/mgv/img/logo-color.png"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      <img
        alt="DEVSA"
        src="https://res.cloudinary.com/jessebubble/image/upload/v1714511311/devsa-logo_nvahyh.svg"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
      />
    </div>
  )
}