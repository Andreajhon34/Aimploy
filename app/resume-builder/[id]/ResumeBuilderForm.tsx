"use client";

import { Button } from "@/components/ui/button";
import { Printer, Save } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import React from "react";
import EducationCard from "@/app/resume-builder/[id]/_components/educationCard";
import ExperienceCard from "@/app/resume-builder/[id]/_components/experienceCard";
import PersonalInformationCard from "@/app/resume-builder/[id]/_components/personalInformationCard";
import SkillCard from "@/app/resume-builder/[id]/_components/skillCard";
import { Template1 } from "@/app/resume-builder/[id]/_components/templates";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { saveResume } from "./_actions/saveResume";
import { ResumeBuilderDbSchema } from "../_schemas/resumeBuilderDbForm";
import {
  PersonalInformationSchema,
  resumeBuilderSchema,
  ResumeBuilderSchema,
} from "@/app/resume-builder/_schemas/resumeBuilderForm";
import { Input } from "@/components/ui/input";

type ResumeBuilderFormProps = {
  id: string;
  title: string;
  data: ResumeBuilderDbSchema;
};

const PERSONAL_INFORMATION_DEFAULTS: PersonalInformationSchema = {
  fullName: "",
  email: "",
  job: "",
  number: "",
  describeProfile: "",
  linkedinProfile: "",
};

export function ResumeBuilderForm({
  data,
  id,
  title: initialTitle,
}: ResumeBuilderFormProps) {
  const methods = useForm<ResumeBuilderSchema>({
    resolver: zodResolver(resumeBuilderSchema),
    defaultValues: {
      personalInformation:
        data.personalInformation ?? PERSONAL_INFORMATION_DEFAULTS,
      experiences: data.experiences ?? [],
      educations: data.educations ?? [],
      skills: data.skills ?? "",
    },
    mode: "onBlur",
  });
  const [isSaving, startTransition] = React.useTransition();
  const [title, setTitle] = React.useState(initialTitle);
  const isValidTitle = title.length >= 2;

  const contentRef = React.useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    contentRef,
  });

  const onSubmit = (payload: ResumeBuilderSchema) => {
    if (!isValidTitle) {
      toast.error("Name must be at least 2 characters");
      return;
    }

    startTransition(async () => {
      const res = await saveResume(id, title, payload);
      if (res.success) {
        toast.success("Saved");
      } else {
        toast.error("Error", { description: res.message });
      }
    });
  };

  return (
    <form
      className="flex flex-row h-screen w-full"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <motion.div
        className="flex-1 no-scrollbar h-full overflow-y-auto scroll"
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
        <div className="bg-background sticky top-0 p-4 inset-x-0 border-b shadow-md flex justify-end items-center">
          {/* <h2 className="font-semibold text-2xl">Resume builder</h2> */}
          <div className="absolute left-1/2 top-1/2 -translate-1/2">
            <Input
              className="
    rounded-none
    font-semibold

    border-0
    border-b border-transparent

    bg-transparent
    shadow-none
    ring-0!
    outline-none

    text-lg!

    p-0
    h-auto
    text-center

    focus-visible:border-b
    focus-visible:border-input
    focus-visible:ring-0
  "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-invalid={!isValidTitle}
            />
          </div>
          <Button size="icon-lg" type="submit" disabled={isSaving}>
            <Save />
            <span className="sr-only">save resume</span>
          </Button>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <FormProvider {...methods}>
            <PersonalInformationCard />
            <ExperienceCard />
            <EducationCard />
            <SkillCard />
          </FormProvider>
        </div>
      </motion.div>
      <Button
        onClick={handlePrint}
        className="shadow-lg h-16 w-42 absolute bottom-12 right-8 z-50"
        variant="secondary"
      >
        <Printer className="size-6 mr-2" />
        Export to PDF
      </Button>
      <div className="flex-1 h-full no-scrollbar overflow-y-auto">
        <div className="p-8">
          <Template1 watch={methods.watch} ref={contentRef} />
        </div>
      </div>
    </form>
  );
}
