"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/canvas-reveal-effect";
import { useState } from "react";

export default function Browser() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-[85%] overflow-hidden border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15] h-full rounded-xl border translate-x-4 absolute right-0 top-10 origin-top transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
    >
      <div className="w-full h-8 bg-gray-100/[.10] flex items-center pl-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-50/[.10] group-hover:bg-red-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-gray-50/[.10] group-hover:bg-orange-400 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-gray-50/[.10] group-hover:bg-green-500 transition-colors"></div>
        </div>
      </div>
      <div className="h-full relative">
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full absolute inset-0"
            >
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-transparent"
                colors={[
                  [236, 72, 153],
                  [232, 121, 249],
                ]}
                dotSize={4}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
      </div>
    </div>
  );
}
