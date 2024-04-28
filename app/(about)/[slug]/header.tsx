import { About } from "@/.velite";

export default function Header({ about }: { about: About }) {
  return (
    <header>
      <div className="container mx-auto relative isolate overflow-hidden  py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
              {about.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              {about.description}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
