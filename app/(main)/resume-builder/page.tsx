import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Clock, FileText, Plus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DropdownClient } from "./_components/DropdownClient";

async function ResumeBuilderContent({ userId }: { userId: string }) {
  const resumes = await prisma.resume.findMany({
    where: { userId },
  });

  const hasResumes = resumes.length > 0;

  return (
    <div className="min-h-screen w-full bg-background text-foreground antialiased selection:bg-primary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-end justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Resume Builder
            </h1>
            <p className="text-sm text-muted-foreground">
              Kelola dan buat resume profesional bertenaga AI.
            </p>
          </div>
          {hasResumes && (
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full border">
              {resumes.length} Garapan
            </span>
          )}
        </div>

        <div className="w-full h-56 sm:h-64 border-2 border-dashed border-muted-foreground/20 rounded-2xl flex flex-col items-center justify-center bg-muted/10 hover:bg-muted/30 hover:border-primary/50 transition-all duration-300 cursor-pointer text-center p-6 relative overflow-hidden">
          {/* Efek gradasi ambient halus di background pas di-hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <Link href="/resume-builder/new">
            <div className="flex flex-col items-center space-y-4 relative z-10">
              {/* Lingkaran Icon Plus */}
              <div className="p-4 rounded-xl border bg-background shadow-xs group-hover:scale-105 group-hover:border-primary/30 transition-all duration-300">
                <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-base tracking-tight text-foreground/90 group-hover:text-primary transition-colors">
                  Buat Resume Baru dari Awal
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Pilih template standar ATS, isi data dirimu, dan optimalkan
                  teksnya menggunakan AI.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* 3. HISTORY SECTION (Daftar Resume di Bawahnya) */}
        {hasResumes ? (
          <div className="space-y-6 mt-6">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-muted-foreground/80">
              <Clock className="h-4 w-4" />
              <span>Resume Terakhir Kamu</span>
            </div>

            {/* Grid History */}
            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
              {resumes.map(({ id, updatedAt, title }) => (
                <ResumeCard
                  key={id}
                  id={id}
                  title={title}
                  updatedAt={updatedAt}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Sub-state penampung jika data di DB benar-benar kosong */
          <div className="text-center py-8 border border-dashed rounded-xl bg-muted/5">
            <p className="text-xs text-muted-foreground">
              Belum ada riwayat pembuatan resume.
            </p>
          </div>
        )}
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

type ResumeCardProps = { id: string; title: string; updatedAt: Date };

function ResumeCard({ id, title, updatedAt }: ResumeCardProps) {
  return (
    <Card className="group relative border bg-card text-card-foreground shadow-xs hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden">
      {/* Dropdown Menu (Absolute) */}
      <div className="absolute top-3 right-3 z-20">
        <DropdownClient resumeId={id} title={title} />
      </div>

      {/* Card Clickable Area */}
      <Link href={`/resume-builder/${id}`} className="block focus:outline-none">
        {/* Preview Area (Simulasi Dokumen Bersih) */}
        <div className="bg-muted/30 h-56 border-b p-5 flex flex-col justify-between group-hover:bg-muted/10 transition-colors">
          <div className="space-y-2">
            <div className="h-2 w-2/3 bg-foreground/10 rounded-xs" />
            <div className="h-1.5 w-1/2 bg-foreground/5 rounded-xs mb-4" />
            <div className="space-y-1.5 pt-2">
              <div className="h-1 bg-foreground/5 rounded-xs w-full" />
              <div className="h-1 bg-foreground/5 rounded-xs w-11/12" />
              <div className="h-1 bg-foreground/5 rounded-xs w-2/3" />
            </div>
          </div>
          <FileText className="h-4 w-4 text-muted-foreground/40 self-end group-hover:text-primary/40 transition-colors" />
        </div>

        {/* Card Info */}
        <div className="p-4 bg-card">
          <h3 className="font-medium text-sm tracking-tight truncate group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-1">
            Diubah{" "}
            {updatedAt.toLocaleString("id-ID", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      </Link>
    </Card>
  );
}
