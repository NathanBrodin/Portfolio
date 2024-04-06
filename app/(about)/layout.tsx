import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-tl from-zinc-900 via-zinc-400/20 to-zinc-900 min-h-screen w-full flex flex-col justify-center">
      <div className="max-w-5xl px-6 py-20 mx-auto lg:px-8  md:py-24 lg:py-32">
        <Link href="/#about">
          <ArrowLeft className="w-6 h-6 text-zinc-300 mb-4 hover:text-zinc-100" />
        </Link>

        {children}
      </div>
    </div>
  );
}
