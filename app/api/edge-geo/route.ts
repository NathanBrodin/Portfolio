import { geolocation } from "@vercel/edge";

export const runtime = "edge";

export function GET(request: Request) {
  const geo = geolocation(request);
  return new Response(JSON.stringify(geo), {
    headers: { "content-type": "application/json" },
  });
}
