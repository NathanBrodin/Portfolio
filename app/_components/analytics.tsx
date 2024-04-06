"use client";

export function BeamAnalytics() {
  const token = process.env.NEXT_PUBLIC_BEAM_TOKEN;
  if (!token) {
    return null;
  }
  return (
    <script
      src="https://beamanalytics.b-cdn.net/beam.min.js"
      data-token={token}
      async
    />
  );
}
