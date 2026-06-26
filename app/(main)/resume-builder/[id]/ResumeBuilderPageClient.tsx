"use client";

import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Printer, Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import React, { startTransition } from "react";
import EducationCard from "@/app/(main)/resume-builder/[id]/_components/educationCard";
import ExperienceCard from "@/app/(main)/resume-builder/[id]/_components/experienceCard";
import PersonalInformationCard from "@/app/(main)/resume-builder/[id]/_components/personalInformationCard";
import SkillCard from "@/app/(main)/resume-builder/[id]/_components/skillCard";
import { Template1 } from "@/app/(main)/resume-builder/[id]/_components/templates/Template1";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { saveResume } from "./_actions/saveResume";
import isEqual from "lodash/isEqual";
import {
  resumeBuilderDbSchema,
  ResumeBuilderDbSchema,
} from "../_schemas/resumeBuilderDbForm";
import {
  PersonalInformationSchema,
  resumeBuilderSchema,
  ResumeBuilderSchema,
} from "@/app/(main)/resume-builder/_schemas/resumeBuilderForm";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { renameResume } from "../_actions/renameResume";
import { cn } from "@/lib/utils";
import { TEMPLATES, TEMPLATES_NAME } from "./_lib/templates";
import { TemplateDialog } from "./_components/TemplatesDialog";

type ResumeBuilderFormProps = {
  id: string;
  title: string;
  data: ResumeBuilderDbSchema;
};

const PERSONAL_INFORMATION_DEFAULTS: PersonalInformationSchema = {
  fullName: "",
  email: "",
  location: "",
  job: "",
  number: "",
  describeProfile: "",
  linkedinProfile: "",
};

export function ResumeBuilderPageClient({
  data,
  id,
  title: initialTitle,
}: ResumeBuilderFormProps) {
  const form = useForm({
    resolver: zodResolver(resumeBuilderDbSchema),
    defaultValues: {
      personalInformation:
        data.personalInformation ?? PERSONAL_INFORMATION_DEFAULTS,
      experiences: data.experiences ?? [],
      educations: data.educations ?? [],
      skills: data.skills ?? "",
    },
    mode: "onBlur",
  });
  const [isSaving, startSaveTransition] = React.useTransition();
  const [isRenaming, startRenameTransition] = React.useTransition();
  const [title, setTitle] = React.useState(initialTitle);
  const isValidTitle = title.trim().length >= 2;
  const [isMutatingTitle, setIsMutatingTitle] = React.useState(false);
  const [template, setTemplate] = React.useState<TEMPLATES_NAME>("classic");
  const ActiveTemplate = TEMPLATES[template];

  const handleKeyDownTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (title === initialTitle) return;
      setIsMutatingTitle(false);
      startRenameTransition(async () => {
        const res = await renameResume(id, title);
        if (res.success) {
          toast.success("Berhasil mengubah nama.");
        } else {
          toast.error("Terjadi kesalahan saat mengubah nama.");
        }
      });
    }
  };

  const handleOnBlurTitle = () => {
    setIsMutatingTitle(false);
    if (title === initialTitle) return;
    startRenameTransition(async () => {
      const res = await renameResume(id, title);
      if (res.success) {
        toast.success("Berhasil mengubah nama.");
      } else {
        toast.error("Terjadi kesalahan saat mengubah nama.");
      }
    });
  };

  const contentRef = React.useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    pageStyle: `
    body {
      font-family: 'Inter', sans-serif;
    }
  `,
  });

  const onSubmit = (payload: ResumeBuilderDbSchema) => {
    if (!isValidTitle) {
      toast.error("Name must be at least 2 characters");
      return;
    }

    if (isEqual(payload, data)) return;

    startSaveTransition(async () => {
      const res = await saveResume(id, title, payload);
      if (res.success) {
        toast.success("Berhasil disimpan.");
      } else {
        toast.error("Terjadi kesalahan saat ingin menyimpan resume.");
      }
    });
  };

  return (
    <form
      className="flex flex-row bg-background h-screen w-full"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <motion.div
        className="flex-1 relative no-scrollbar h-full overflow-y-auto scroll"
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-background sticky top-0 p-4 z-10 inset-x-0 border-b shadow-md flex justify-end items-center">
          <div className="absolute left-1/2 top-1/2 -translate-1/2 font-semibold">
            {isMutatingTitle ? (
              <Input
                className="text-lg! bg-transparent! shadow-none outline-none p-0 h-auto text-center"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-invalid={!isValidTitle}
                onBlur={handleOnBlurTitle}
                onKeyDown={handleKeyDownTitle}
                disabled={isRenaming || isSaving}
                autoFocus
              />
            ) : (
              <span
                className={cn(
                  "text-lg px-20 cursor-text truncate",
                  (isRenaming || isSaving) && "pointer-events-none opacity-50",
                )}
                onClick={() => setIsMutatingTitle(true)}
              >
                {title}
              </span>
            )}
          </div>
          <TemplateDialog setTemplate={setTemplate} />
          <Button
            size="icon-lg"
            type="submit"
            disabled={isSaving}
            variant="ghost"
          >
            <Save />
            <span className="sr-only">save resume</span>
          </Button>
        </div>
        <div className="flex flex-col gap-4 p-4 relative max-w-3xl left-1/2 -translate-x-1/2">
          <FormProvider {...form}>
            <PersonalInformationCard />
            <ExperienceCard />
            <EducationCard />
            <Card>
              <CardContent>
                <Collapsible className="rounded-md">
                  <CollapsibleTrigger asChild>
                    <Button variant="plain" className="group w-full">
                      Keahlian
                      <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SkillCard />
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </FormProvider>
        </div>
      </motion.div>
      <Button
        onClick={handlePrint}
        className="shadow-lg h-16 w-42 absolute bottom-12 right-8 z-50"
        variant="secondary"
        type="button"
      >
        <Printer className="size-6 mr-2" />
        Export to PDF
      </Button>
      <div className="flex-1 h-full no-scrollbar overflow-y-auto">
        <div
          ref={contentRef}
          className="
      w-[210mm] min-h-[297mm] bg-white p-[20mm] shadow-2xl border transition-all duration-300 relative

      bg-[linear-gradient(to_bottom,transparent_296mm,rgba(239,68,68,0.4)_296mm,rgba(239,68,68,0.4)_297mm)]
      bg-[size:100%_297mm]
      
      print:shadow-none print:border-none print:bg-none print:w-full
    "
        >
          <ActiveTemplate watch={form.watch} />
        </div>
      </div>
    </form>
  );
}
