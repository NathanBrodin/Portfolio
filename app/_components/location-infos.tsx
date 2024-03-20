import { Geo } from "@vercel/edge";

export default async function LocationInfos({ location }: { location: Geo }) {
  return (
    <div>
      <h1>Location Infos</h1>
      <pre>{location.city ?? "City"}</pre>
      <pre>{location.country ?? "Country"}</pre>
      <pre>{location.countryRegion ?? "Region"}</pre>
      <pre>{location.latitude ?? "Latitude"}</pre>
      <pre>{location.longitude ?? "Longitude"}</pre>
      <pre>{location.flag ?? "Flag"}</pre>
      <pre>{location.region ?? "Server Region"}</pre>
    </div>
  );
}
