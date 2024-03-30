import { DashedSeparator } from "@/components/dashed-separator";
import About from "./_components/about";
import Hero from "./_components/hero";
import LocationInfos from "./_components/location-infos";
import { Geo } from "@vercel/edge";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const location: Geo = {
    city: searchParams.city as string,
    country: searchParams.country as string,
    flag: searchParams.flag as string,
    region: searchParams.region as string,
    countryRegion: searchParams.countryRegion as string,
    latitude: searchParams.latitude as string,
    longitude: searchParams.longitude as string,
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <Hero />
      <DashedSeparator />
      <About />
      {/* <DashedSeparator />
      <LocationInfos location={location} /> */}
    </div>
  );
}
