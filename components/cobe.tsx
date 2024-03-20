"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from "react-spring";

interface CobeProps {
  className?: string;
  markers?: { location: [number, number]; size: number }[];
  mode?: "light" | "dark";
  rotate?: boolean;
  focusToLocation?: [number, number];
  size?: number;
}

export default function Cobe({
  className,
  markers,
  mode = "dark",
  rotate = true,
  focusToLocation,
  size = 600,
}: CobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const locationToAngles = (lat: number, long: number) => {
    return [
      Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180,
    ];
  };
  const focusRef = useRef(
    focusToLocation ? locationToAngles(...focusToLocation) : [0, 0],
  );

  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef<number>(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    if (canvasRef.current === null) {
      return;
    }

    let phi = 0;
    let theta = 0.3;
    const doublePi = Math.PI * 2;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: phi,
      theta: theta,
      dark: mode === "dark" ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: mode === "dark" ? [0.3, 0.3, 0.3] : [1, 1, 1],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: markers ?? [],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        if (focusToLocation) {
          state.phi = phi;
          state.theta = theta;
          const [focusPhi, focusTheta] = focusRef.current;
          const distPositive = (focusPhi - phi + doublePi) % doublePi;
          const distNegative = (phi - focusPhi + doublePi) % doublePi;
          // Control the speed
          if (distPositive < distNegative) {
            phi += distPositive * 0.08;
          } else {
            phi -= distNegative * 0.08;
          }
          theta = theta * 0.92 + focusTheta * 0.08;
        } else {
          state.phi = r.get() + (rotate === true ? Number(phi) : 0);
          phi += 0.003;
        }
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size, maxWidth: "100%", aspectRatio: 1 }}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          rotate && (canvasRef.current!.style.cursor = "grabbing");
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          rotate && (canvasRef.current!.style.cursor = "grab");
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          rotate && (canvasRef.current!.style.cursor = "grab");
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 200,
            });
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 100,
            });
          }
        }}
      />
    </div>
  );
}
