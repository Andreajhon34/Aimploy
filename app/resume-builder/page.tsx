"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import EducationCard from "@/components/resume-builder/cards/educationCard";
import ExperienceCard from "@/components/resume-builder/cards/experienceCard";
import PersonalInformationCard from "@/components/resume-builder/cards/personalInformationCard";
import SkillCard from "@/components/resume-builder/cards/skillCard";
import { Template1 } from "@/components/resume-builder/templates";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { pubApi } from "@/lib/axios";
import type { ResumeBuilderSchema } from "@/schemas/resume-builder";
import { resumeBuilderSchema } from "@/schemas/resume-builder";
import {
  PERSONAL_INFORMATION_DEFAULTS,
  SKILLS_DEFAULT,
} from "@/utils/constants/resumeBuilder";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "react-responsive";
import { useReactToPrint } from "react-to-print";
import { motion } from "framer-motion";

type ResponseData = {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    linkedin: string;
  };
  summary: string;
  experience: {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    achievements: string[];
  }[];
  education: {
    id: number;
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    details: string;
  }[];
  skills: {
    programming: string[];
    frameworks: string[];
    tools: string[];
  };
};

export default function ResumeBuilderPage() {
  const methods = useForm<ResumeBuilderSchema>({
    resolver: zodResolver(resumeBuilderSchema),
    defaultValues: {
      personalInformation: PERSONAL_INFORMATION_DEFAULTS,
      experiences: [],
      educations: [],
      skills: SKILLS_DEFAULT,
    },
    mode: "onBlur",
  });

  const [isMounted, setIsMounted] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    contentRef,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex w-full h-dvh p-4 gap-4">
        <Skeleton className="w-[40%] h-full rounded-xl" />
        <Skeleton className="w-[794px] h-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-row h-dvh w-full">
      {" "}
      {/* 1. Kunci layar total */}
      <FormProvider {...methods}>
        <motion.div
          className="flex-1 h-full min-w-sm"
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
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-4 px-4">
              <h1 className="text-xl font-bold my-3">Resume builder</h1>
              <PersonalInformationCard />
              <ExperienceCard />
              <EducationCard />
              <SkillCard />
              <ScrollBar />
            </div>
            <ScrollBar />
          </ScrollArea>
        </motion.div>
        <div className="absolute bottom-12 right-8 z-50">
          <Button
            onClick={handlePrint}
            className="shadow-lg h-16 w-42"
            variant="secondary"
          >
            <Printer className="w-4 h-4 mr-2" />
            Export to PDF
          </Button>
        </div>
        <ScrollArea className="h-full w-[794px]">
          <div className="size-full py-8 px-4 sm:px-8 flex justify-center">
            <Template1 watch={methods.watch} ref={contentRef} />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </FormProvider>
    </div>
  );
}
