import { resumeBuilderDbSchema } from "@/app/(main)/resume-builder/_schemas/resumeBuilderDbForm";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ResumeBuilderForm } from "./ResumeBuilderForm";

export default async function ResumeBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const { id } = await params;

  const resume = await prisma.resume.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!resume) {
    return notFound();
  }

  const parsed = resumeBuilderDbSchema.parse(resume.data);

  return <ResumeBuilderForm data={parsed} id={id} title={resume.title} />;
}
