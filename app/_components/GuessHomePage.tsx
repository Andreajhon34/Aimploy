"use client";

import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import { motion, Variants } from "framer-motion";
import { ArrowRight, FileText, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { Separator } from "react-resizable-panels";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { LightRays } from "@/components/ui/light-rays";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { Card, CardContent } from "@/components/ui/card";

// Animasi Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }, // Clean cubic-bezier
  },
};

export function GuestHomePage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden antialiased">
      <motion.div
        className="container mx-auto px-4 z-10 text-center pt-36 pb-24 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <LightRays />

        <motion.div
          variants={itemVariants}
          className="text-6xl flex flex-col gap-3 font-extrabold tracking-tight mb-6"
        >
          <span>Bangun Resume Profesional</span>
          <DiaTextReveal text={"Didukung Kecerdasan Buatan."} />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Tinggalkan cara lama mengedit resume. Aimploy merapikan bahasa,
          mengelompokkan keahlian, dan mendesain CV Anda agar 100% ramah ATS
          dalam hitungan detik.
        </motion.p>

        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 flex-col text-lg">
            <RainbowButton asChild>
              <Link href="/signup" className="h-10 w-100 text-lg!">
                Daftar
              </Link>
            </RainbowButton>
            <span className="font-semibold text-base">Atau</span>
            <RainbowButton
              asChild
              variant="outline"
              className="h-10 w-100 text-base"
            >
              <Link href="/login" className="h-10 w-64">
                Masuk
              </Link>
            </RainbowButton>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-28 w-full text-left">
          <FeatureCard
            variants={itemVariants}
            icon={<Zap className="size-5 text-primary" />}
            title="Generate AI Super Cepat"
            desc="Ubah catatan kasar pengalaman kerja menjadi poin-poin profesional yang memikat HRD hanya dengan satu klik."
          />
          <FeatureCard
            variants={itemVariants}
            icon={<ShieldCheck className="size-5 text-primary" />}
            title="Sistem ATS Friendly"
            desc="Sistem grid dan tipografi yang dirancang khusus agar mudah lolos sensor mesin pelacak pelamar kerja (ATS)."
          />
          <FeatureCard
            variants={itemVariants}
            icon={<FileText className="size-5 text-primary" />}
            title="Live Preview Real-time"
            desc="Lihat perubahan CV Anda secara instan dengan sinkronisasi data yang mulus tanpa perlu reload halaman."
          />
        </div>
      </motion.div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  variants,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  variants: Variants;
}) {
  return (
    <motion.div variants={variants}>
      <Card className="transition-all duration-300 hover:border-primary/20 hover:bg-card/80 group relative">
        <CardContent>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="size-10 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-primary/15 transition-all duration-300 relative z-10">
            {icon}
          </div>
          <h3 className="text-lg font-bold mb-2 tracking-tight relative z-10">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm relative z-10">
            {desc}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
