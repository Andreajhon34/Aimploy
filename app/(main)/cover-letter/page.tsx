import { getSession } from "@/app/_lib/getSession";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { ChevronDownIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { resumeBuilderDbSchema } from "../resume-builder/_schemas/resumeBuilderDbForm";
import {
  CoverLetterTabClient,
  CoverLetterTabClientProps,
} from "./_components/CoverLetterTabClient";
import { CreateTabClient } from "./_components/CreateTabClient";
import {
  FAQCollapsibleSection,
  FAQItem,
} from "@/app/_components/FAQCollapsible";
import { CoverLetter } from "./_types/coverLetter";

const COVER_LETTER_FAQ: FAQItem[] = [
  {
    question: "Apakah data resume saya aman di sini?",
    answer:
      "Aman banget, Data personal information, riwayat kerja, dan pendidikan kamu dienkripsi dan disimpan dengan aman. Kami tidak akan membagikan atau menjual data kamu ke pihak ketiga.",
  },
  {
    question: "Apakah hasil cover letter-nya bisa langsung dicetak?",
    answer:
      "Bisa dong! Setiap cover letter yang sukses dibuat akan muncul di tab 'Cover letter saya'. Kamu tinggal klik tombol tiga titik (Ellipsis) lalu pilih 'Cetak' untuk langsung print atau simpan sebagai PDF.",
  },
  {
    question: "Berapa banyak cover letter yang bisa saya buat dalam sehari?",
    answer:
      "Untuk saat ini, tidak ada batasan! Kamu bebas melakukan generate sebanyak mungkin sesuai dengan jumlah lowongan pekerjaan yang ingin kamu lamar.",
  },
  {
    question:
      "Bolehkah saya menggunakan hasil teks ini untuk proyek komersial?",
    answer:
      "Tentu saja! Hasil cover letter murni milik kamu. Bebas digunakan untuk melamar kerja secara personal maupun komersial tanpa perlu mencantumkan atribusi apa pun.",
  },
  {
    question: "Kenapa proses generate AI-nya kadang terhenti sendiri?",
    answer:
      "Kami menerapkan sistem timeout selama 10 detik demi menjaga performa server. Jika koneksi internet kamu atau server AI sedang sibuk, kamu bisa menekan tombol stop lalu klik 'Generate' ulang.",
  },
];

type AwaitedResumesPromise = Awaited<
  CoverLetterTabClientProps["resumesPromise"]
>;

export default async function CoverLetterPage() {
  const session = await getSession();

  if (!session) {
    return redirect("/login");
  }

  const userId = session.user.id;

  const resumesPromise = prisma.resume
    .findMany({
      where: { userId },
    })
    .then((resumes) =>
      resumes.map(({ id, data, ...props }) => {
        const parsedData = resumeBuilderDbSchema.parse(data);
        return { ...props, resumeId: id, content: parsedData };
      }),
    );

  const coverLettersPromises = prisma.resume
    .findMany({
      where: { userId, coverLetter: { some: {} } },
      select: {
        coverLetter: {
          select: {
            resume: { select: { title: true, data: true } },
            id: true,
            content: true,
            createdAt: true,
          },
        },
        id: true,
        title: true,
      },
    })
    .then((resume) =>
      resume.map(({ coverLetter: rawCoverLetters, ...props }) => {
        const coverLetters: AwaitedResumesPromise[number]["coverLetters"] =
          rawCoverLetters.map(({ resume, ...props }) => {
            const parsedData = resumeBuilderDbSchema.parse(resume.data);
            const { email, fullName, number } = parsedData.personalInformation;
            return {
              ...props,
              resumeTitle: resume.title,
              personalInfo: { email, fullName, phone: number },
            };
          });

        const result: AwaitedResumesPromise[number] = {
          ...props,
          coverLetters,
          resumeId: props.id,
        };
        return result;
      }),
    );

  return (
    <div className="flex-1 container mx-auto p-4 pt-20! flex flex-col gap-20">
      <Tabs defaultValue="create" className="h-[640px] w-full">
        <TabsList>
          <TabsTrigger value="create">Buat</TabsTrigger>
          <TabsTrigger value="myCoverLetter">Cover letter saya</TabsTrigger>
        </TabsList>
        <TabsContent value="create" className="size-full min-h-0">
          <CreateTabClient resumesPromise={resumesPromise} />
        </TabsContent>
        <TabsContent value="myCoverLetter" className="size-full min-h-0">
          <CoverLetterTabClient resumesPromise={coverLettersPromises} />
        </TabsContent>
      </Tabs>

      <FAQCollapsibleSection FAQItems={COVER_LETTER_FAQ} />
    </div>
  );
}
