import { Container } from '~/components/ui/Container';
import { FadeIn } from '~/components/ui/FadeIn';
import { SectionIntro } from '~/components/ui/SectionIntro';

export function TechForm() {
   return (
      <div className="mt-24 sm:mt-16 sm:py-32">
         <SectionIntro title="Tech Day Registration Open">
            <p>
                <strong>Join us and be part of the innovation!</strong>{' '}
                Explore the latest tech trends and network with industry leaders at Tech Day
            </p>
         </SectionIntro>
         <Container className="mt-16">
            <FadeIn>
               <div className="rounded-2xl">
                  <iframe
                     src="https://airtable.com/embed/apptfFi1y2StuEQ7s/pagcUDiOUo0NzSooJ/form"
                     title="Tech Day Registration Form"
                     style={{
                        borderRadius: '12px',
                        width: '100%',
                        height: '600px',
                     }}
                     className=""
                     allowFullScreen={true}
                     aria-hidden="false"
                     tabIndex={0}
                  ></iframe>
               </div>
            </FadeIn>
         </Container>
      </div>
   );
}