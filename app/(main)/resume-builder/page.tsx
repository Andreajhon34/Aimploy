import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Plus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ResumeGrid, ResumesGridProps } from "./_components/ResumesGrid";
import { ResumeCounter } from "./_components/ResumeCounter";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function ResumeBuilderContent({ userId }: { userId: string }) {
  const resumesPromise = prisma.resume
    .findMany({
      where: { userId },
      select: { id: true, updatedAt: true, title: true, createdAt: true },
    })
    .then((rawResumes) => {
      const resumes = rawResumes.map(({ id, ...props }) => {
        const result: Awaited<ResumesGridProps["resumesPromise"]>[number] = {
          resumeId: id,
          ...props,
        };
        return result;
      });
      return resumes;
    });

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <div className="flex-1 flex flex-col container mx-auto px-4 py-16">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              asChild
              className="h-56 w-full border-2 border-dashed"
            >
              <Link href="/resume-builder/new">
                <Plus className="size-20 text-muted-foreground" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Buat resume baru</p>
          </TooltipContent>
        </Tooltip>

        <ResumeGrid resumesPromise={resumesPromise} />
      </div>
    </div>
  );
}

export default async function ResumeBuilderPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  return <ResumeBuilderContent userId={session.user.id} />;
}
