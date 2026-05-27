"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import React from "react";
import { TEMPLATES_NAME } from "../_lib/templates";

export const Template1Preview = ({
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
      {/* -- MINI HEADER -- */}
      <header className="flex flex-col items-start mb-2">
        {/* Nama Besar */}
        <h1 className="text-[10px] font-extrabold tracking-tight text-slate-950 leading-none mb-0.5">
          JONATHAN DOE
        </h1>
        {/* Job Title */}
        <p className="text-[6px] font-medium text-slate-800 leading-none mb-0.5">
          Full Stack Web Developer
        </p>
        {/* Location */}
        <p className="text-[4.5px] font-medium text-slate-500 leading-none mb-1">
          Jakarta, Indonesia
        </p>
        {/* Kontak Info Mini */}
        <div className="flex flex-wrap gap-x-1.5 text-[4px] text-slate-400 font-mono leading-none">
          <span>johndoe@email.com</span>
          <span>•</span>
          <span>+62 812-3456-789</span>
          <span>•</span>
          <span>linkedin.com/in/johndoe</span>
        </div>
      </header>

      {/* --- MINI SUMMARY --- */}
      <section className="mb-2">
        {/* Garis Pembatas Tipis */}
        <div className="w-full h-[0.5px] bg-slate-900/30 mb-1" />
        {/* Judul Section */}
        <h2 className="text-[5px] font-bold uppercase tracking-wider text-slate-900 mb-0.5">
          Professional Summary
        </h2>
        {/* Isi Paragraf */}
        <p className="text-[4px] leading-[5px] text-slate-600 text-justify tracking-tight">
          Passionate developer with 3+ years of experience building
          high-performance web applications using React, Next.js, and Tailwind
          CSS. Proven track record of optimizing frontend speed and implementing
          scalable dynamic architectures.
        </p>
      </section>

      {/* --- MINI EXPERIENCE --- */}
      <section className="mb-2">
        <div className="w-full h-[0.5px] bg-slate-900/30 mb-1" />
        <h2 className="text-[5px] font-bold uppercase tracking-wider text-slate-900 mb-1">
          Experience
        </h2>

        <div className="space-y-1.5">
          {/* Item Kerja 1 */}
          <div>
            <div className="flex justify-between items-baseline leading-none">
              <h3 className="text-[4.5px] font-bold text-slate-900">
                Senior Frontend Engineer
              </h3>
              <span className="text-[3.5px] font-medium text-slate-500">
                2024 - Present
              </span>
            </div>
            <div className="leading-none mb-0.5">
              <span className="text-[4px] font-medium text-slate-700">
                Tech Solutions Corp
              </span>
            </div>
            {/* Ciri Khas FIX 3 Lu (Garis vertikal di kiri deskripsi) */}
            <div className="pl-1 border-l-[0.5px] border-slate-300 space-y-0.5 py-0.5 text-[3.5px] leading-[4.5px] text-slate-500 tracking-tight">
              <p>
                • Successfully migrated legacy systems to modern React, boosting
                load speed by 40%.
              </p>
              <p>
                • Built and customized reusable UI components to streamline
                internal dashboard development.
              </p>
            </div>
          </div>

          {/* Item Kerja 2 */}
          <div>
            <div className="flex justify-between items-baseline leading-none">
              <h3 className="text-[4.5px] font-bold text-slate-900">
                Junior Web Developer
              </h3>
              <span className="text-[3.5px] font-medium text-slate-500">
                2022 - 2024
              </span>
            </div>
            <div className="leading-none mb-0.5">
              <span className="text-[4px] font-medium text-slate-700">
                Creative Digital Studio
              </span>
            </div>
            <div className="pl-1 border-l-[0.5px] border-slate-300 space-y-0.5 py-0.5 text-[3.5px] leading-[4.5px] text-slate-500 tracking-tight">
              <p>
                • Developed responsive landing pages and integrated RESTful APIs
                for e-commerce clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- MINI EDUCATION --- */}
      <section className="mb-2">
        <div className="w-full h-[0.5px] bg-slate-900/30 mb-1" />
        <h2 className="text-[5px] font-bold uppercase tracking-wider text-slate-900 mb-1">
          Education
        </h2>

        <div>
          <div className="flex justify-between items-baseline leading-none">
            <h3 className="text-[4.5px] font-bold text-slate-900">
              Bachelor of Computer Science
            </h3>
            <span className="text-[3.5px] font-medium text-slate-500">
              2018 - 2022
            </span>
          </div>
          <div className="leading-none">
            <span className="text-[4px] font-medium text-slate-700">
              Universitas Indonesia
            </span>
          </div>
        </div>
      </section>

      {/* --- MINI SKILLS --- */}
      <section>
        <div className="w-full h-[0.5px] bg-slate-900/30 mb-1" />
        <h2 className="text-[5px] font-bold uppercase tracking-wider text-slate-900 mb-0.5">
          Skills
        </h2>
        <p className="text-[4px] leading-none text-slate-600 tracking-tight">
          JavaScript (ES6+), TypeScript, React, Next.js, Tailwind CSS, Node.js,
          Git, REST APIs
        </p>
      </section>
    </div>
  );
};

type TemplateDialogProps = {
  setTemplate: (value: TEMPLATES_NAME) => void;
};

export function TemplateDialog({ setTemplate }: TemplateDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="me-3">
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <div
          className="flex flex-col gap-3"
          onClick={() => {
            setTemplate("classic");
            setOpen(false);
          }}
        >
          <Template1Preview className="hover:cursor-pointer" />
          <span className="w-full text-center">Classic</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
