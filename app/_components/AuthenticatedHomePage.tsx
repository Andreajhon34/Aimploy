"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import prisma from "@/lib/prisma";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  LayoutDashboard,
  ScrollText,
  Search,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { AuroraText } from "@/components/ui/aurora-text";
import { BsFileEarmarkText, BsFileText } from "react-icons/bs";
import { LuFileCheck } from "react-icons/lu";

type AuthenticatedHomePageProps = {
  userName: string;
};

export function AuthenticatedHomePage({
  userName,
}: AuthenticatedHomePageProps) {
  const gridItemsConfig = [
    {
      text: "Resume Builder",
      hoverText:
        "Bikin, edit, dan susun Resume bertenaga AI dengan pilihan template standar ATS. Tulisan otomatis dirapikan agar memikat HRD.",
      Icon: BsFileEarmarkText,
      href: "/resume-builder",
    },
    {
      text: "ATS Checker",
      hoverText:
        "Scan berkas CV atau Resume kamu dan bandingkan langsung dengan syarat lowongan kerja. Cari tahu kata kunci (keywords) apa saja yang kurang.",
      Icon: LuFileCheck,
      href: "/ats",
    },
    {
      text: "Cover Letter",
      hoverText:
        "Buat Cover Letter profesional yang dipersonalisasi khusus untuk tiap lowongan secara instan. AI akan merangkai kalimat persuasif agar profilmu langsung dilirik rekruter.",
      Icon: BsFileText,
      href: "/cover-letter",
    },
  ] as const;

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <div className="flex-1 flex flex-col pt-[400px] container mx-auto px-4 py-16 space-y-12">
        <div className="flex flex-col items-center text-center gap-3">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Halo, <AuroraText>{userName}</AuroraText>
          </h1>
          <p className="text-muted-foreground text-base max-w-xl">
            Pilih alat yang kamu butuhkan hari ini untuk mempercepat proses
            lamaran kerjamu.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-3 auto-rows-[full]">
          {gridItemsConfig.map(({ text, hoverText, Icon, href }, index) => (
            <Link href={href} key={index}>
              <motion.div
                className="w-full text-center aspect-square"
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <MagicCard
                  mode="orb"
                  className="flex rounded-xl flex-col size-full text-center justify-center items-center relative"
                >
                  <motion.h2
                    variants={{
                      rest: { opacity: 1, y: 0 },
                      hover: { opacity: 0, y: -10 },
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-4xl inset-0 font-bold absolute flex justify-center items-center"
                  >
                    <div className="flex gap-3 items-center">
                      <Icon className="size-10" /> {text}
                    </div>
                  </motion.h2>

                  <div className="size-full flex justify-center items-center">
                    <motion.p
                      variants={{
                        rest: { opacity: 0, y: 10 },
                        hover: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="text-base font-semibold px-6 leading-relaxed"
                    >
                      {hoverText}
                    </motion.p>
                  </div>
                </MagicCard>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
