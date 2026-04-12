"use client";

import { motion, Variants } from "framer-motion";
import { Sparkles, FileText, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      {/* --- MAIN KONTEN --- */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-23"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.h1
          variants={fadeUpVariant}
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
        >
          Bangun CV Profesional, <br className="hidden md:block" />
          {/* Menggunakan text-primary agar cocok dengan tema shadcn */}
          <span className="text-primary">Didukung Kecerdasan Buatan.</span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          variants={fadeUpVariant}
          className="text-lg md:text-md text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Tinggalkan cara lama membuat resume. Aimployee secara otomatis
          merapikan bahasa, mengelompokkan keahlian, dan mendesain CV Anda agar
          100% ramah ATS dalam hitungan detik.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUpVariant}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/resume-builder">
            <Button
              size="lg"
              className="h-13 px-7 text-base font-semibold group transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              Buat Resume Sekarang
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {/* --- FITUR GRID --- */}
        <motion.div
          variants={fadeUpVariant}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 pb-20 text-left"
        >
          <FeatureCard
            icon={<Zap className="size-6 text-primary" />}
            title="Generate AI Super Cepat"
            desc="Ubah catatan kasar pengalaman kerja menjadi poin-poin profesional yang memikat HRD hanya dengan satu klik."
          />
          <FeatureCard
            icon={<ShieldCheck className="size-6 text-primary" />}
            title="Sistem ATS Friendly"
            desc="Sistem grid dan tipografi yang dirancang khusus agar mudah dibaca oleh mesin pelacak pelamar kerja (ATS)."
          />
          <FeatureCard
            icon={<FileText className="size-6 text-primary" />}
            title="Live Preview Real-time"
            desc="Lihat perubahan CV Anda secara instan dengan sinkronisasi data yang mulus tanpa perlu reload halaman."
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-card text-card-foreground border border-border p-7 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30 group">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
    </div>
  );
}
