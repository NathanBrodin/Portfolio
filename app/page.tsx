import About from "./_components/about";
import { CorrectedBento } from "./_components/corrected-bento";
import Hero from "./_components/hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <Hero />
      <CorrectedBento />
      <About />
    </div>
  );
}
