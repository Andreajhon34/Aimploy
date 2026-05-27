import prisma from "@/lib/prisma";
import { AtsCheckerPage } from "./_components/AtsCheckerPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { title } from "process";
import { resumeBuilderDbSchema } from "../resume-builder/_schemas/resumeBuilderDbForm";
import { AtsResult } from "./_types/AtsResult";

export default async function AtsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const [rawResumes, atsResult] = await Promise.all([
    prisma.resume.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        title: true,
        updatedAt: true,
        data: true,
      },
    }),
    prisma.atsResult.findMany({
      where: { userId: session.user.id },
      select: {
        content: true,
        id: true,
        createdAt: true,
        resume: { select: { title: true } },
      },
    }),
  ]);

  const resumes = rawResumes.map(({ id, data, ...props }) => {
    const parsedData = resumeBuilderDbSchema.parse(data);
    return { ...props, resumeId: id, content: parsedData };
  });

  const atsResults = atsResult.map(
    ({ id, content, createdAt, resume: { title } }) => {
      const jsonContent = content as unknown as AtsResult;
      return { ...jsonContent, id, createdAt, resumeTitle: title, atsResult };
    },
  );

  return <AtsCheckerPage resumes={resumes} atsResults={atsResults} />;
}
