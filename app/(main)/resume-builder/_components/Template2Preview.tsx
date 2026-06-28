import React from "react";
import { cn } from "@/lib/utils"; // Jalur utilitas tailwind-merge milikmu

export const Template2Preview = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "w-full aspect-[1/1.414] bg-white border border-slate-200 rounded p-3 shadow-sm flex flex-col select-none group-hover:border-primary transition-colors overflow-hidden text-left",
        className,
      )}
      {...props}
    >
      <header className="grid grid-cols-3 gap-1 border-b-[0.5px] border-zinc-900 pb-1.5 mb-2">
        <div className="col-span-2 space-y-0.5">
          {/* Nama Besar Bold */}
          <h1 className="text-[10px] font-black tracking-tight text-zinc-950 leading-none uppercase">
            JONATHAN DOE
          </h1>
          {/* Job Title Indigo */}
          <p className="text-[5.5px] font-bold tracking-wide text-indigo-600 leading-none uppercase">
            Full Stack Web Developer
          </p>
          {/* Location */}
          <p className="text-[4px] font-medium text-zinc-400 leading-none">
            Jakarta, Indonesia
          </p>
        </div>

        {/* Info Kontak Merapat Kanan */}
        <div className="flex flex-col gap-0.5 text-[3.8px] text-zinc-500 items-end text-right justify-self-end leading-none font-mono pt-0.5">
          <span>johndoe@email.com</span>
          <span>+62 812-3456-789</span>
          <span>linkedin.com/in/johndoe</span>
        </div>
      </header>

      {/* --- MINI PROFILE SUMMARY --- */}
      <section className="mb-2">
        <h2 className="text-[5px] font-bold uppercase tracking-wider text-zinc-900 mb-0.5">
          Profile Summary
        </h2>
        <p className="text-[4px] leading-[5px] text-zinc-600 text-justify tracking-tight">
          Passionate developer with 3+ years of experience building
          high-performance web applications using React, Next.js, and Tailwind
          CSS. Proven track record of optimizing frontend speed and implementing
          scalable architectures.
        </p>
      </section>

      {/* --- MINI WORK EXPERIENCE (Timeline Look) --- */}
      <section className="mb-2">
        <h2 className="text-[5px] font-bold uppercase tracking-wider text-zinc-900 mb-1">
          Professional Experience
        </h2>

        <div className="space-y-1.5">
          {/* Item Kerja 1 */}
          <div className="relative pl-1 border-l-[0.5px] border-zinc-200">
            {/* Dekorator Bulatan Mini Node */}
            <div className="absolute -left-[1.5px] top-[1.5px] w-[2.5px] h-[2.5px] rounded-full bg-zinc-300 border-[0.2px] border-white" />

            <div className="flex justify-between items-baseline leading-none">
              <h3 className="text-[4.5px] font-bold text-zinc-900 uppercase tracking-wide">
                Senior Frontend Engineer
              </h3>
              <span className="text-[3.5px] font-semibold bg-zinc-100 text-zinc-700 px-0.5 rounded-[1px]">
                2024 - Pres
              </span>
            </div>
            <div className="leading-none mb-0.5">
              <span className="text-[4px] font-semibold text-indigo-600">
                Tech Solutions Corp
              </span>
            </div>
            <p className="text-[3.5px] leading-[4.5px] text-zinc-500 tracking-tight">
              Successfully migrated legacy systems to modern React, boosting
              load speed by 40%.
            </p>
          </div>

          {/* Item Kerja 2 */}
          <div className="relative pl-1 border-l-[0.5px] border-zinc-200">
            <div className="absolute -left-[1.5px] top-[1.5px] w-[2.5px] h-[2.5px] rounded-full bg-zinc-300 border-[0.2px] border-white" />

            <div className="flex justify-between items-baseline leading-none">
              <h3 className="text-[4.5px] font-bold text-zinc-900 uppercase tracking-wide">
                Junior Web Developer
              </h3>
              <span className="text-[3.5px] font-semibold bg-zinc-100 text-zinc-700 px-0.5 rounded-[1px]">
                2022 - 2024
              </span>
            </div>
            <div className="leading-none mb-0.5">
              <span className="text-[4px] font-semibold text-indigo-600">
                Creative Digital Studio
              </span>
            </div>
            <p className="text-[3.5px] leading-[4.5px] text-zinc-500 tracking-tight">
              Developed responsive landing pages and integrated RESTful APIs.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-2">
        <h2 className="text-[5px] font-bold uppercase tracking-wider text-zinc-900 mb-1">
          Education
        </h2>

        <div className="grid grid-cols-2 gap-1.5">
          {/* Edu 1 */}
          <div className="p-0.5 rounded-[2px] border border-zinc-100 bg-zinc-50/50">
            <div className="flex justify-between items-baseline leading-none mb-0.5">
              <h3 className="text-[4px] font-bold text-zinc-900 truncate">
                B.S. Comp Science
              </h3>
              <span className="text-[3px] font-medium text-zinc-500 scale-90 origin-right">
                18-22
              </span>
            </div>
            <span className="text-[3.5px] font-semibold text-zinc-500 uppercase tracking-wider block leading-none">
              Univ Indonesia
            </span>
          </div>

          <div className="p-0.5 rounded-[2px] border border-zinc-100 bg-zinc-50/50">
            <div className="flex justify-between items-baseline leading-none mb-0.5">
              <h3 className="text-[4px] font-bold text-zinc-900 truncate">
                High School
              </h3>
              <span className="text-[3px] font-medium text-zinc-500 scale-90 origin-right">
                15-18
              </span>
            </div>
            <span className="text-[3.5px] font-semibold text-zinc-500 uppercase tracking-wider block leading-none">
              SMA Negeri 8
            </span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-[5px] font-bold uppercase tracking-wider text-zinc-900 mb-0.5">
          Core Expertise
        </h2>
        <p className="text-[4px] leading-none text-zinc-600 tracking-tight">
          JavaScript (ES6+), TypeScript, React, Next.js, Tailwind CSS, Node.js,
          Git, REST APIs
        </p>
      </section>
    </div>
  );
};
