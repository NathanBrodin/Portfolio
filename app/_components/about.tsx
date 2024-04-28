import { about } from ".velite";
import { Compass, Cpu, Globe, GraduationCap } from "lucide-react";
import Cobe from "@/components/cobe";
import { Bento, BentoCard } from "@/components/bento";
import Particles from "@/components/particles";
import TechStack from "./about/tech-stack";
import Browser from "./about/browser";

function getAboutBySlug(slug: string) {
  return about.find((a) => a.slug === slug);
}

export default function About() {
  const education = getAboutBySlug("education");
  const techStack = getAboutBySlug("tech-stack");
  const internationalExperience = getAboutBySlug("international-experience");
  const workExperience = getAboutBySlug("work-experience");

  return (
    <div
      id="about"
      className="flex py-24 flex-col relative items-center justify-center w-screen bg-gradient-to-bl from-black via-zinc-400/20 to-black"
    >
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={400}
      />
      <Bento>
        <BentoCard
          icon={GraduationCap}
          title={education!.title}
          description={education!.description}
          link={education!.slug}
          widget={<Widget />}
        />
        <BentoCard
          icon={Cpu}
          title={techStack!.title}
          description={techStack!.description}
          link={techStack!.slug}
          widget={<TechStack />}
          size="lg"
        />
        <BentoCard
          icon={Globe}
          title={internationalExperience!.title}
          description={internationalExperience!.description}
          link={internationalExperience!.slug}
          widget={
            <Cobe
              markers={[
                { location: [48.0785146, -0.7669906], size: 0.06 }, // Laval
                { location: [63.8391421, 23.1336845], size: 0.03 }, // Kokkola
                { location: [59.9133301, 10.7389701], size: 0.03 }, // Oslo
              ]}
              className="absolute inset-0 mx-auto aspect-[1/1] max-w-[600px] top-0 h-[600px] w-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105 sm:left-40"
            />
          }
          size="lg"
        />
        <BentoCard
          icon={Compass}
          title={workExperience!.title}
          description={workExperience!.description}
          link={workExperience!.slug}
          widget={<Browser />}
        />
      </Bento>
    </div>
  );
}

export function Widget() {
  return (
    <div>
      <div className="rdp p-3 absolute right-0 top-10 origin-top transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105">
        <div className="p-4"></div>
      </div>
    </div>
  );
}
