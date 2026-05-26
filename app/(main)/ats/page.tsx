import prisma from "@/lib/prisma";
import { AtsCheckerPage } from "./_components/AtsCheckerPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { title } from "process";
import { resumeBuilderDbSchema } from "../resume-builder/_schemas/resumeBuilderDbForm";

export default async function AtsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const rawResumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      title: true,
      updatedAt: true,
      data: true,
    },
  });

  const resumes = rawResumes.map(({ id, data, ...props }) => {
    const parsedData = resumeBuilderDbSchema.parse(data);
    return { ...props, resumeId: id, content: parsedData };
  });

  return <AtsCheckerPage resumes={resumes} />;
}
