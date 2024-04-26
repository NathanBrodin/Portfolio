import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <LoaderCircle className="animate-spin" />
        <h1>Loading project...</h1>
      </div>
    </div>
  );
}
