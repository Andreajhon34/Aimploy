import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ResumeBuilderDbSchema } from "@/app/resume-builder/_schemas/resumeBuilderDbForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const baseTitle = "Untitled Resume";

export default async function NewResumeBuilderPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const existingResumes = await prisma.resume.findMany({
    where: {
      userId: session.user.id,
      title: {
        startsWith: baseTitle,
      },
    },
    select: {
      title: true,
    },
  });

  let title = baseTitle;

  if (existingResumes.length > 0) {
    const numbers = existingResumes.map((resume) => {
      const match = resume.title.match(/\((\d+)\)$/);
      return match ? Number(match[1]) : 0;
    });

    const nextNumber = Math.max(...numbers) + 1;

    title = `${baseTitle} (${nextNumber})`;
  }

  const data: ResumeBuilderDbSchema = {
    personalInformation: {
      describeProfile: "",
      email: "",
      fullName: "",
      job: "",
      linkedinProfile: "",
      number: "",
    },
    educations: [],
    experiences: [],
    skills: "",
  };

  const newResume = await prisma.resume.create({
    data: {
      userId: session.user.id,
      title,
      data,
    },
  });

  redirect(`/resume-builder/${newResume.id}`);
}
