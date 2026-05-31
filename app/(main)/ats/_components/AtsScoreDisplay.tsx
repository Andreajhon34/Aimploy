"use client";

import AtsScoreCard from "@/components/kokonutui/AtsScoreCard";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Sparkles, XCircle } from "lucide-react";
import { motion, useMotionValue, useTransform, Variants } from "motion/react";
import { useState } from "react";
import { AtsResult } from "../_types/atsResult";
import { Skeleton } from "@/components/ui/skeleton";

type AtsScoreDisplayProps = {
  atsResult: Omit<AtsResult, "resumeTitle" | "createdAt" | "id">;
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function AtsScoreDisplay({ atsResult }: AtsScoreDisplayProps) {
  const score = atsResult.score;
  const hasFoundKeywords = atsResult.foundKeywords.length > 0;
  const hasMissingKeywords = atsResult.missingKeywords.length > 0;

  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }
  return (
    <div className="size-full grid grid-cols-12 gap-6">
      <motion.div
        className="col-span-4 border rounded-md bg-card p-8 flex flex-col gap-3"
        onHoverEnd={handleMouseLeave}
        onHoverStart={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        variants={fadeInUp}
        whileHover={{ y: -5 }}
      >
        <span className="text-xl font-semibold w-full text-center">
          ATS score
        </span>
        <AtsScoreCard atsScore={score} className="aspect-square flex-1" />
      </motion.div>

      <motion.div
        className="col-span-8 p-6 border rounded-md bg-card space-y-4 shadow-sm flex flex-col"
        onHoverEnd={handleMouseLeave}
        onHoverStart={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        variants={fadeInUp}
        whileHover={{ y: -5 }}
      >
        <div className="flex flex-col flex-1 gap-3">
          <h3 className="font-semibold flex items-center gap-2 text-destructive text-base">
            <XCircle /> Keyword yang Hilang (Wajib Ditambah)
          </h3>
          {hasMissingKeywords ? (
            <div className="flex flex-wrap gap-2">
              {atsResult.missingKeywords.map((kw, i) => (
                <Badge variant="destructive" key={i}>
                  {kw}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="flex-1 min-h-[96px] flex items-center justify-center">
              <p className="w-full text-center text-muted-foreground">
                Tidak ada data
              </p>
            </div>
            // <div className="flex flex-col gap-5">
            //   {Array.from({ length: 20 }).map((_, index) => (
            //     <Skeleton key={index} className="h-50 w-full" />
            //   ))}
            // </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <h3 className="font-semibold flex items-center gap-2 text-emerald-600 pt-2 text-base">
            <CheckCircle2 /> Keyword yang Sudah Cocok
          </h3>
          {hasFoundKeywords ? (
            <div className="flex flex-wrap gap-2">
              {atsResult.foundKeywords.map((kw, i) => (
                <Badge key={i} className="bg-emerald-50 text-emerald-700">
                  {kw}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="flex-1 min-h-[96px] flex items-center justify-center">
              <p className="w-full text-center text-muted-foreground">
                Tidak ada data
              </p>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        className="col-span-6 p-6 border rounded-md bg-card shadow-sm"
        onHoverEnd={handleMouseLeave}
        onHoverStart={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        variants={fadeInUp}
        whileHover={{ y: -5 }}
      >
        <div className="size-full flex flex-col gap-4">
          <h3 className="font-semibold flex items-center gap-2 text-base">
            <AlertTriangle className="text-amber-500" /> Catatan Formatting &
            Struktur
          </h3>
          {atsResult.formattingIssues.length > 0 ? (
            <ul className="pl-2 space-y-2.5 text-sm text-muted-foreground">
              {atsResult.formattingIssues.map((issue, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-1 text-base text-foreground">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex-1 flex justify-center items-center">
              <p className="w-full text-center text-muted-foreground">
                Tidak ada data
              </p>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        className="col-span-6 p-6 border rounded-md bg-card shadow-md"
        onHoverEnd={handleMouseLeave}
        onHoverStart={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        variants={fadeInUp}
        whileHover={{ y: -5 }}
      >
        <div className="size-full flex flex-col gap-4">
          <h3 className="font-semibold flex items-center gap-2 text-base">
            <Sparkles className="text-amber-500" /> Saran Perbaikan dari AI
          </h3>
          {atsResult.aiSuggestions.length > 0 ? (
            <ul className="pl-2 space-y-2.5 text-sm text-muted-foreground">
              {atsResult.aiSuggestions.map((suggestion, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-1 text-base text-foreground">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex-1 flex justify-center items-center">
              <p className="w-full text-center text-muted-foreground">
                Tidak ada data
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
