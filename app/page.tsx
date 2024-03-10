import About from "./_components/about";
import Hero from "./_components/hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <Hero />
      <About />
      <div className="w-full h-screen relative flex items-center justify-center">
        <div className="absolute inset-0 h-full -z-10 w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        <div>Hello world </div>
      </div>
    </div>
  );
}
