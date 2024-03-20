import { DashedSeparator } from "@/components/dashed-separator";
import About from "./_components/about";
import Hero from "./_components/hero";
import LocationInfos from "./_components/location-infos";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <Hero />
      <DashedSeparator />
      <LocationInfos />
      <DashedSeparator />
      <About />
    </div>
  );
}
