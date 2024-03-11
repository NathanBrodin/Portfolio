import About from "./_components/about";
import Hero from "./_components/hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <Hero />
      <div className="w-full h-4 border-zinc-500/50 border-dashed border-b-2" />
      <About />
    </div>
  );
}
