import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { ArrowRight, FileText, LayoutDashboard, Search } from "lucide-react";
import Link from "next/link";

type AuthenticatedHomePageProps = {
  userName: string;
  userId: string;
};

export async function AuthenticatedHomePage({
  userName,
  userId,
}: AuthenticatedHomePageProps) {
  const resumeCount = await prisma.resume.count({
    where: { userId },
  });

  return (
    <div className="min-h-screen w-full bg-background text-foreground antialiased">
      <div className="container mx-auto px-4 py-16 space-y-12">
        {/* 1. WELCOME HEADER */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Halo, {userName}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Pilih alat yang kamu butuhkan hari ini untuk mempercepat proses
            lamaran kerjamu.
          </p>
        </div>

        {/* 2. FEATURE HUB LAUNCHER GRID */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* CARD FEATURE 1: RESUME BUILDER */}
          <Card className="group relative border bg-card shadow-xs transition-all overflow-hidden flex flex-col justify-between">
            <CardHeader className="space-y-4 p-6 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-105 transition-transform">
                <FileText className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">
                    Resume Builder
                  </CardTitle>
                  {resumeCount > 0 && (
                    <span className="text-[11px] bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium px-2 py-0.5 rounded-sm border border-blue-500/20">
                      {resumeCount} Berkas
                    </span>
                  )}
                </div>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  Bikin, edit, dan susun Resume bertenaga AI dengan pilihan
                  template standar ATS. Tulisan otomatis dirapikan agar memikat
                  HRD.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-0 mt-auto relative z-10">
              <Link href="/resume-builder">
                <Button
                  className="w-full justify-between group/btn py-6"
                  variant="secondary"
                >
                  Buka Resume Builder
                  <ArrowRight className=" transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* CARD FEATURE 2: ATS CHECKER */}
          <Card className="group relative border transition-all overflow-hidden flex flex-col justify-between">
            <CardHeader className="space-y-4 p-6 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 group-hover:scale-105 transition-transform">
                <Search className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">
                    ATS Optimization Scanner
                  </CardTitle>
                  <span className="text-[11px] bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium px-2 py-0.5 rounded-sm border border-purple-500/20">
                    Scanner Ready
                  </span>
                </div>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  Scan berkas CV atau Resume kamu dan bandingkan langsung dengan
                  syarat lowongan kerja. Cari tahu kata kunci (keywords) apa
                  saja yang kurang.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-0 mt-auto relative z-10">
              <Link href="/ats">
                <Button
                  className="w-full py-6 justify-between group/btn"
                  variant="secondary"
                >
                  Mulai Scan ATS
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
