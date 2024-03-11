import About from "./_components/about";
import { CorrectedBento } from "./_components/corrected-bento";
import Hero from "./_components/hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <Hero />
      <div className="bg-gradient-to-bl from-black via-zinc-400/20 to-black">
        <CorrectedBento />
      </div>

      <About />
    </div>
  );
}
