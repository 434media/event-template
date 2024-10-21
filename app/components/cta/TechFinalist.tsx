import * as Headless from '@headlessui/react';
import { clsx } from 'clsx';
import {
   MotionValue,
   motion,
   useMotionValueEvent,
   useScroll,
   useSpring,
   type HTMLMotionProps,
} from 'framer-motion';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import useMeasure, { type RectReadOnly } from 'react-use-measure';
import { Container } from '~/components/ui/Container';
import { FadeIn } from '../ui/FadeIn';

const trackFinalist = [
   {
      img: 'https://media.licdn.com/dms/image/v2/D5622AQHtsHGV39SOcA/feedshare-shrink_1280/feedshare-shrink_1280/0/1729101572443?e=1732147200&v=beta&t=U5cPeP_IDQAC0dfiuMhbTp0qdws7IhEs-WwRXio0ioo',
      name: 'David Wessels',
      title: 'Founder',
      topic: 'JUST-IN-TRAPS',
   },
   {
      img: 'https://media.licdn.com/dms/image/v2/D5622AQHdXSq_VSQt5w/feedshare-shrink_1280/feedshare-shrink_1280/0/1729101572592?e=1732147200&v=beta&t=64O-vTpadyddP4dbP7FdiZLi1ops25Z8vfOAfxuPoGo',
      name: 'David Esra',
      title: 'Founder',
      topic: 'BobiHealth',
   },
   {
      img: 'https://media.licdn.com/dms/image/v2/D5622AQEL7PEYNdxezg/feedshare-shrink_1280/feedshare-shrink_1280/0/1729101572751?e=1732147200&v=beta&t=J87fY7t-qhQW69eXhP8UTbEPZRisK7PHNpeDTAGYnpk',
      name: 'José Alberto Díaz García',
      title: 'Founder',
      topic: "Balam",
   },
   {
      img: 'https://media.licdn.com/dms/image/v2/D5622AQGLB9pSQPB16Q/feedshare-shrink_1280/feedshare-shrink_1280/0/1729101572531?e=1732147200&v=beta&t=r8TOkm8AqVkoznf_XZ7R3A0UrXAhpp6l3GOfNBXpoc8',
      name: 'Kyle Walker',
      title: 'Founder',
      topic: "Axicle, Inc",
   },
   {
      img: 'https://media.licdn.com/dms/image/v2/D5622AQF2Op90TXdhXQ/feedshare-shrink_1280/feedshare-shrink_1280/0/1729101572623?e=1732147200&v=beta&t=wnjLo73ixAoQrxsMt6MM2Xm4Xnfx4jY9UjRL-u4grj4',
      name: 'Nicholas Kaufmann',
      title: 'Founder',
      topic: 'Wild Forge',
   },
];

function TopicCard({
   name,
   title,
   img,
   children,
   bounds,
   scrollX,
   ...props
}: {
   img: string;
   name: string;
   title: string;
   children: React.ReactNode;
   bounds: RectReadOnly;
   scrollX: MotionValue<number>;
} & HTMLMotionProps<'div'>) {
   let ref = useRef<HTMLDivElement | null>(null);

   let computeOpacity = useCallback(() => {
      let element = ref.current;
      if (!element || bounds.width === 0) return 1;

      let rect = element.getBoundingClientRect();

      if (rect.left < bounds.left) {
         let diff = bounds.left - rect.left;
         let percent = diff / rect.width;
         return Math.max(0.5, 1 - percent);
      } else if (rect.right > bounds.right) {
         let diff = rect.right - bounds.right;
         let percent = diff / rect.width;
         return Math.max(0.5, 1 - percent);
      } else {
         return 1;
      }
   }, [ref, bounds.width, bounds.left, bounds.right]);

   let opacity = useSpring(computeOpacity(), {
      stiffness: 154,
      damping: 23,
   });

   useLayoutEffect(() => {
      opacity.set(computeOpacity());
   }, [computeOpacity, opacity]);

   useMotionValueEvent(scrollX, 'change', () => {
      opacity.set(computeOpacity());
   });

   return (
      <motion.div
         ref={ref}
         style={{ opacity }}
         {...props}
         className="relative flex aspect-[9/16] w-72 shrink-0 snap-start scroll-ml-[var(--scroll-padding)] flex-col justify-end overflow-hidden rounded-3xl sm:aspect-[3/4] sm:w-96"
      >
         <img
            alt="profile headshot of speaker"
            src={img}
            className="aspect-square absolute inset-x-0 top-0 w-full object-cover"
         />
         <div
            aria-hidden="true"
            className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black from-[calc(7/16*100%)] ring-1 ring-inset ring-neutral-950/10 sm:from-25%"
         />
         <figure className="relative p-10">
            <blockquote>
               <p className="relative text-xl/7 text-white">
                  <span
                     aria-hidden="true"
                     className="absolute -translate-x-full"
                  ></span>
                  {children}
                  <span aria-hidden="true" className="absolute"></span>
               </p>
            </blockquote>
            <figcaption className="mt-6 border-t border-white/20 pt-6">
               <p className="text-sm/6 font-medium text-white">{name}</p>
               <p className="text-sm/6 font-medium">
                  <span className="bg-gradient-to-r from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] bg-clip-text text-transparent">
                     {title}
                  </span>
               </p>
            </figcaption>
         </figure>
      </motion.div>
   );
}

export function TechFinalist() {
   let scrollRef = useRef<HTMLDivElement | null>(null);
   let { scrollX } = useScroll({ container: scrollRef });
   let [setReferenceWindowRef, bounds] = useMeasure();
   let [activeIndex, setActiveIndex] = useState(0);

   useMotionValueEvent(scrollX, 'change', (x) => {
      setActiveIndex(
         Math.floor(x / scrollRef.current!.children[0].clientWidth)
      );
   });

   function scrollTo(index: number) {
      let gap = 32;
      let width = (scrollRef.current!.children[0] as HTMLElement).offsetWidth;
      scrollRef.current!.scrollTo({ left: (width + gap) * index });
   }

   return (
      <div className="overflow-hidden py-16">
         <Container>
            <FadeIn>
            <div ref={setReferenceWindowRef}>
               <h2 className="font-mono text-xs/5 font-semibold uppercase tracking-widest text-neutral-500 data-[dark]:text-neutral-400">
                Powered by Bexar County Economic & Community Development
               </h2>
               <h3 className="mt-2 max-w-3xl text-pretty text-4xl font-medium tracking-tighter text-neutral-950 data-[dark]:text-white sm:text-6xl">
                  Announcing the Tech Fuel 2024 Finalists!
               </h3>
            </div>
            </FadeIn>
         </Container>
         <div
            ref={scrollRef}
            className={clsx([
               'mt-16 flex gap-8 px-[var(--scroll-padding)]',
               '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
               'snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth',
               '[--scroll-padding:max(theme(spacing.6),calc((100vw-theme(maxWidth.2xl))/2))] lg:[--scroll-padding:max(theme(spacing.8),calc((100vw-theme(maxWidth.7xl))/2))]',
            ])}
         >
            {trackFinalist.map(({ img, name, title, topic}, talkIndex) => (
               <TopicCard
                  key={talkIndex}
                  name={name}
                  title={title}
                  img={img}
                  bounds={bounds}
                  scrollX={scrollX}
                  onClick={() => scrollTo(talkIndex)}
               >
                  {topic}
                  
               </TopicCard>
            ))}
            <div className="w-[42rem] shrink-0 sm:w-[54rem]" />
         </div>
         <Container className="mt-16">
            <div className="flex justify-end">
               <div className="hidden sm:flex sm:gap-2">
                  {trackFinalist.map(({ name }, talkIndex) => (
                     <Headless.Button
                        key={talkIndex}
                        onClick={() => scrollTo(talkIndex)}
                        data-active={
                           activeIndex === talkIndex ? true : undefined
                        }
                        aria-label={`Scroll to testimonial from ${name}`}
                        className={clsx(
                           'size-2.5 rounded-full border border-transparent bg-neutral-300 transition',
                           'data-[active]:bg-neutral-400 data-[hover]:bg-neutral-400',
                           'forced-colors:data-[active]:bg-[Highlight] forced-colors:data-[focus]:outline-offset-4'
                        )}
                     />
                  ))}
               </div>
            </div>
         </Container>
      </div>
   );
}