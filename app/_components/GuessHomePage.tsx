"use client";

import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { ArrowRight, FileText, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

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
      {/* 1. MODERN BACKGROUND (Glow Radial + Dot Grid Pattern) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.02))] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-rgb),0.08),transparent_50%)] pointer-events-none" />

      {/* Ambient Light Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-primary/10 blur-[130px] rounded-full pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse duration-[12s]" />

      {/* 2. AUTH HEADER (Menggunakan struktur container standar) */}
      <header className="fixed top-0 inset-x-0">
        <div className="container mx-auto px-4 h-16 flex items-center justify-end">
          <div className="flex items-center gap-3">
            <Button size="sm" asChild className="rounded-full shadow-xs px-4">
              <Link href="/signup">Sign up</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hover:bg-muted/50 rounded-full px-4"
            >
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* 3. MAIN KONTEN (Konsisten dengan container & max-width halaman workspace) */}
      <motion.div
        className="container mx-auto px-4 max-w-4xl relative z-10 text-center pt-36 pb-24 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glow Micro Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full border bg-muted/60 backdrop-blur-xs px-3.5 py-1 text-xs font-medium mb-6 text-muted-foreground shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
          <span>Introducing Aimploy</span>
        </motion.div>

        {/* Headline dengan Gradient Text */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] bg-gradient-to-b from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent max-w-3xl"
        >
          Bangun CV Profesional, <br />
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Didukung Kecerdasan Buatan.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Tinggalkan cara lama mengedit resume. Aimploy merapikan bahasa,
          mengelompokkan keahlian, dan mendesain CV Anda agar 100% ramah ATS
          dalam hitungan detik.
        </motion.p>

        {/* Restorasi & Upgrade CTA Button */}
        <motion.div variants={itemVariants} className="w-full sm:w-auto">
          <Link href="/resume-builder" className="block">
            <Button
              size="lg"
              className="h-12 sm:h-13 px-8 text-sm sm:text-base font-medium rounded-full group transition-all duration-300 shadow-md shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.01]"
            >
              Buat Resume Sekarang
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {/* --- FITUR GRID --- */}
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
    // Menggunakan motion.div agar efek penundaan (stagger) berfungsi berurutan
    <motion.div
      variants={variants}
      className="bg-card/40 backdrop-blur-md text-card-foreground border border-border/60 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 hover:border-primary/20 hover:bg-card/80 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-primary/15 transition-all duration-300 relative z-10">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 tracking-tight relative z-10">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm relative z-10">
        {desc}
      </p>
    </motion.div>
  );
}
