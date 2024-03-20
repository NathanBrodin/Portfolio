import Cobe from "@/components/cobe";
import { Geo } from "@vercel/edge";
import Particles from "@/components/particles";

export default async function LocationInfos({ location }: { location: Geo }) {
  const { latitude, longitude } = {
    latitude: parseFloat(location.latitude ?? "0"),
    longitude: parseFloat(location.longitude ?? "0"),
  };

  return (
    <div className="w-full max-w-6xl pr-16 flex flex-col lg:flex-row relative">
      <Particles className="absolute inset-0 -z-10" quantity={400} />
      <Cobe
        className="flex-shrink-0 overflow-hidden -translate-x-44"
        size={750}
        mode="light"
        rotate={false}
        focusToLocation={[latitude, longitude]}
        markers={[
          {
            location: [latitude, longitude],
            size: 0.06,
          },
        ]}
      />
      <div className="flex flex-col pt-12 w-full">
        <h1 className="text-2xl text-transparent bg-white font-display sm:text-3xl md:text-4xl lg:text-5xl whitespace-nowrap bg-clip-text ">
          {location.city} ?
        </h1>
        <p className="text-transparent bg-gray-200 font-display text-lg whitespace-nowrap bg-clip-text">
          I would love to work there
        </p>
      </div>
    </div>
  );
}
