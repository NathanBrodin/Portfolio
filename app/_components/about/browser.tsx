export default function Browser() {
  return (
    <div className="w-[85%] overflow-hidden border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15] h-full rounded-xl border translate-x-4 absolute right-0 top-10 origin-top transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105">
      <div className="w-full h-8 bg-gray-100/[.10] flex items-center pl-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-50/[.10] group-hover:bg-red-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-gray-50/[.10] group-hover:bg-orange-400 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-gray-50/[.10] group-hover:bg-green-500 transition-colors"></div>
        </div>
      </div>
    </div>
  );
}
