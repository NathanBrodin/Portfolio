import BentoCard from "@/components/bento/card";
import BentoGrid from "@/components/bento/grid";
import { Calendar, Globe } from "lucide-react";
import Cobe from "@/components/cobe";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-screen bg-gradient-to-bl from-black via-zinc-400/20 to-black">
      <div className="bg-white/50 w-full max-w-5xl px-4 md:px-24 lg:px-0 flex flex-col lg:grid gap-4 lg:grid-cols-3">
        <div className="h-96 flex items-center justify-center bg-blue-500 col-span-1">
          1
        </div>
        <div className="h-96 flex items-center justify-center bg-blue-500 col-span-2 ">
          2
        </div>
        <div className="h-96 flex items-center justify-center bg-blue-500 col-span-2">
          3
        </div>
        <div className="h-96 flex items-center justify-center bg-blue-500 col-span-1">
          4
        </div>
      </div>
      <BentoGrid>
        <BentoCard
          icon={Calendar}
          title="Calendar"
          description="Use the calendar to filter your files by date."
          widget={<Widget />}
          link="/calendar"
        />
        <BentoCard
          icon={Calendar}
          title="Calendar"
          description="Use the calendar to filter your files by date."
          widget={
            <div>
              <div className="flex h-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10">
                <div className="relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none">
                  Hello world
                </div>
              </div>
            </div>
          }
          link="/calendar"
          size="lg"
        />
        <BentoCard
          icon={Globe}
          title="International Experience"
          description="Worked and studied in 3 different countries."
          widget={
            <div>
              <Cobe
                markers={[
                  { location: [48.0785146, -0.7669906], size: 0.1 }, // Laval
                  { location: [63.8391421, 23.1336845], size: 0.03 }, // Kokkola
                  { location: [59.9133301, 10.7389701], size: 0.03 }, // Oslo
                ]}
                className="absolute inset-0 mx-auto aspect-[1/1] max-w-[600px] top-0 h-[600px] w-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105 sm:left-40"
              />
            </div>
          }
          link="/international-experience"
          size="lg"
        />
        <BentoCard
          icon={Calendar}
          title="Calendar"
          description="Use the calendar to filter your files by date."
          widget={<Widget />}
          link="/calendar"
        />
      </BentoGrid>
    </div>
  );
}

function Widget() {
  return (
    <div>
      <div className="rdp p-3 absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
          <div className="space-y-4 rdp-caption_start rdp-caption_end">
            <div className="flex justify-center pt-1 relative items-center">
              <div
                className="text-sm font-medium"
                role="presentation"
                id="react-day-picker-1"
              >
                March 2024
              </div>
              <div className="space-x-1 flex items-center">
                <button
                  name="previous-month"
                  className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
                  type="button"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button
                  name="next-month"
                  aria-label="Go to next month"
                  className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
                  type="button"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <table className="w-full border-collapse space-y-1" role="grid">
              <thead className="rdp-head">
                <tr className="flex">
                  <th
                    scope="col"
                    className="text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]"
                    aria-label="Sunday"
                  >
                    Su
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]"
                    aria-label="Monday"
                  >
                    Mo
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]"
                    aria-label="Tuesday"
                  >
                    Tu
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]"
                    aria-label="Wednesday"
                  >
                    We
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]"
                    aria-label="Thursday"
                  >
                    Th
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]"
                    aria-label="Friday"
                  >
                    Fr
                  </th>
                  <th
                    scope="col"
                    className="text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]"
                    aria-label="Saturday"
                  >
                    Sa
                  </th>
                </tr>
              </thead>
              <tbody className="rdp-tbody">
                <tr className="flex w-full mt-2">
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
                      role="gridcell"
                      type="button"
                    >
                      25
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
                      role="gridcell"
                      type="button"
                    >
                      26
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
                      role="gridcell"
                      type="button"
                    >
                      27
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
                      role="gridcell"
                      type="button"
                    >
                      28
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
                      role="gridcell"
                      type="button"
                    >
                      29
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      1
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      2
                    </button>
                  </td>
                </tr>
                <tr className="flex w-full mt-2">
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      3
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      4
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      5
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      6
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      7
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      8
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 bg-accent text-accent-foreground"
                      role="gridcell"
                      type="button"
                    >
                      9
                    </button>
                  </td>
                </tr>
                <tr className="flex w-full mt-2">
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      10
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      11
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      12
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      13
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      14
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      15
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      16
                    </button>
                  </td>
                </tr>
                <tr className="flex w-full mt-2">
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      17
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      18
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      19
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      20
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      21
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      22
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      23
                    </button>
                  </td>
                </tr>
                <tr className="flex w-full mt-2">
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      24
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      25
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      26
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      27
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      28
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      29
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      30
                    </button>
                  </td>
                </tr>
                <tr className="flex w-full mt-2">
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                      role="gridcell"
                      type="button"
                    >
                      31
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
                      role="gridcell"
                      type="button"
                    >
                      1
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
                      role="gridcell"
                      type="button"
                    >
                      2
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
                      role="gridcell"
                      type="button"
                    >
                      3
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
                      role="gridcell"
                      type="button"
                    >
                      4
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
                      role="gridcell"
                      type="button"
                    >
                      5
                    </button>
                  </td>
                  <td
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&amp;:has([aria-selected])]:bg-accent [&amp;:has([aria-selected])]:rounded-md"
                    role="presentation"
                  >
                    <button
                      name="day"
                      className="rdp-button_reset rdp-button inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-muted-foreground opacity-50"
                      role="gridcell"
                      type="button"
                    >
                      6
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
