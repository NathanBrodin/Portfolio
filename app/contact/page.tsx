import {
  Clapperboard,
  Figma,
  Github,
  Gitlab,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "../_components/nav";
import { Card } from "@/components/card";

const socials = [
  {
    icon: <Mail size={20} />,
    href: "mailto:nathan@brodin.dev",
    label: "Email",
    handle: "nathan@brodin.dev",
  },
  {
    icon: <Github size={20} />,
    href: "https://github.com/NathanBrodin",
    label: "Github",
    handle: "NathanBrodin",
  },
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/nathan-brodin/",
    label: "LinkedIn",
    handle: "nathan-brodin",
  },
];

const others = [
  {
    icon: <Gitlab size={20} />,
    href: "https://gitlab.com/nathanbrodin",
    label: "GitLab",
    handle: "nathanbrodin",
  },
  {
    icon: <Figma size={20} />,
    href: "https://www.figma.com/@nathanbrodin",
    label: "Figma",
    handle: "nathanbrodin",
  },
  {
    icon: <Clapperboard size={20} />,
    href: "https://letterboxd.com/nathannnnnn/",
    label: "Letterboxd",
    description: "(because I have incredible taste in movies)",
    handle: "nathannnnnn",
  },
];

export default function ContactPage() {
  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation
        links={[
          { href: "/#about", children: "About" },
          { href: "/projects", children: "Projects" },
        ]}
      />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
          {socials.map((s, index) => (
            <Card key={index}>
              <Link
                href={s.href}
                target="_blank"
                className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
              >
                <span
                  className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                  {s.icon}
                </span>{" "}
                <div className="z-10 flex flex-col items-center">
                  <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
                    {s.handle}
                  </span>
                  <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                    {s.label}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
      <div className="container flex items-center justify-center pb-32 -translate-y-1/4 mt-16 px-4 mx-auto">
        <div className="grid w-full grid-cols-1 gap-8 mx-auto sm:mt-0 sm:grid-cols-3 lg:gap-16">
          {others.map((s, index) => (
            <Card key={index}>
              <Link
                href={s.href}
                target="_blank"
                className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  "
              >
                <span
                  className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                  {s.icon}
                </span>{" "}
                <div className="z-10 flex flex-col items-center">
                  <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
                    {s.handle}
                  </span>
                  <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                    {s.label}
                  </span>
                  {s.description && (
                    <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                      {s.description}
                    </span>
                  )}
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
