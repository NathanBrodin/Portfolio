export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 min-h-screen w-full flex flex-col justify-center">
      <div className="max-w-5xl px-6 py-20 mx-auto lg:px-8  md:py-24 lg:py-32">
        {children}
      </div>
    </div>
  );
}
