import Cobe from "@/components/cobe";

export default function InternationalExperience() {
  return (
    <div>
      <Cobe
        markers={[
          { location: [48.0785146, -0.7669906], size: 0.07 }, // Laval
          { location: [63.8391421, 23.1336845], size: 0.03 }, // Kokkola
          { location: [59.9133301, 10.7389701], size: 0.03 }, // Oslo
        ]}
        className="absolute inset-0 mx-auto aspect-[1/1] max-w-[600px] top-0 h-[600px] w-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105 sm:left-40"
      />
    </div>
  );
}
