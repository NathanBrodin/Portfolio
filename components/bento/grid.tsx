interface BentoGridProps {
  children: React.ReactNode;
}

export default function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="max-w-5xl relative flex flex-col items-center justify-center rounded-xl p-0">
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage: "radial-gradient(#ffffff22 1px,transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="grid w-full auto-rows-[22rem] grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}
