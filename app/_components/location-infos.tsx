import { Geo } from "@vercel/edge";

async function getLocation() {
  const res = await fetch("http://localhost:3000/api/edge-geo");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: Geo = await res.json();

  return data;
}

export default async function LocationInfos() {
  const location = await getLocation();

  return (
    <div>
      <h1>Location Infos</h1>
      <pre>{location.city ?? "City"}</pre>
      <pre>{location.country ?? "Country"}</pre>
      <pre>{location.countryRegion ?? "Region"}</pre>
      <pre>{location.latitude ?? "Latitude"}</pre>
      <pre>{location.longitude ?? "Longitude"}</pre>
      <pre>{location.flag ?? "Flag"}</pre>
    </div>
  );
}
