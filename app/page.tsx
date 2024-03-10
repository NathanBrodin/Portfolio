import About from "./_components/about";
import Hero from "./_components/hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen">
      <Hero />
      <About />
    </div>
  );
}
