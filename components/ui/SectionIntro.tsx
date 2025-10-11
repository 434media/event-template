import clsx from 'clsx';

import { Container } from './Container';
import { FadeIn } from './FadeIn';

interface SectionIntroProps {
   title: string;
   children?: React.ReactNode;
   smaller?: boolean;
   invert?: boolean;
   [key: string]: any;
}

export function SectionIntro({
   title,
   children,
   smaller = false,
   invert = false,
   ...props
}: SectionIntroProps) {
   return (
      <Container {...props}>
         <FadeIn className="max-w-2xl">
            <h2>
               <span
                  className={clsx(
                     'font-display text-wrap:balance block tracking-tight',
                     smaller
                        ? 'text-2xl font-semibold'
                        : 'text-4xl font-medium sm:text-5xl',
                     invert ? 'text-white' : 'text-neutral-950'
                  )}
               >
                  {title}
               </span>
            </h2>
            {children && (
               <div
                  className={clsx(
                     'mt-6 text-xl',
                     invert ? 'text-neutral-300' : 'text-neutral-600'
                  )}
               >
                  {children}
               </div>
            )}
         </FadeIn>
      </Container>
   );
}