"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  returnUrl?: string;
  links?: { href: string; children: React.ReactNode }[];
};

export function Navigation({ returnUrl, links }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <nav ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500  border-zinc-800 "
        }`}
      >
        <div className="container flex flex-row items-center justify-between p-6 mx-auto">
          <Link
            href={returnUrl || "/"}
            className="duration-200 text-zinc-300 hover:text-zinc-100"
          >
            <ArrowLeft className="w-6 h-6 " />
          </Link>
          <div className="flex justify-between gap-8">
            {links?.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                className="duration-200 text-zinc-400 hover:text-zinc-100"
              >
                {link.children}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
