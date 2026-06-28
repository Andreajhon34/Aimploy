import {
  FAQCollapsibleSection,
  FAQItem,
} from "@/app/_components/FAQCollapsible";
import { ResumeListSkeleton } from "@/app/_components/ResumeListSkeleton";
import { getSession } from "@/app/_lib/getSession";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { resumeBuilderDbSchema } from "../resume-builder/_schemas/resumeBuilderDbForm";
import { AtsCheckTabClient } from "./_components/AtsCheckTabClient";
import {
  AtsResultListTabClient,
  AtsResultListTabClientProps,
} from "./_components/AtsResultTabClient";
import { AtsResult } from "./_types/atsResult";

const ATS_CHECKER_FAQ: FAQItem[] = [
  {
    question: "Bagaimana cara sistem menilai skor ATS resume saya?",
    answer:
      "Sistem kami memindai (parsing) teks dari resume kamu, lalu mencocokkannya dengan kata kunci (keywords), skill, dan kualifikasi yang ada di deskripsi pekerjaan. Semakin relevan struktur dan kosakata di resume kamu dengan lowongan, semakin tinggi skor ATS yang didapat.",
  },
  {
    question: "Format file apa yang paling aman agar lolos pemindaian ATS?",
    answer:
      "Sangat disarankan menggunakan format PDF atau DOCX (Word) dengan layout satu kolom yang bersih. Hindari mengunggah resume berformat gambar (JPG/PNG) atau hasil scan, karena teks di dalamnya tidak akan bisa dibaca oleh mesin ATS.",
  },
  {
    question:
      "Mengapa skor ATS saya rendah padahal pengalaman kerja saya sudah banyak?",
    answer:
      "Bisa jadi karena istilah atau nama skill yang kamu pakai berbeda dengan yang dicari oleh sistem rekruter, atau layout resume kamu terlalu kompleks (menggunakan tabel, grafik, atau icon gaib). Mesin ATS lebih menyukai teks biasa yang terstruktur rapi ketimbang desain dekoratif.",
  },
  {
    question:
      "Apakah aman mengunggah data resume sensitif ke sistem checker ini?",
    answer:
      "Aman dan rahasia, Resume yang kamu unggah hanya diproses secara real-time untuk kebutuhan analisis skor saat itu juga. Kami berkomitmen menjaga privasi kamu dan tidak menyimpan atau menyebarkan dokumen tersebut.",
  },
  {
    question: "Bagaimana cara tercepat untuk mendongkrak skor ATS resume saya?",
    answer:
      "Cek bagian 'Missing Keywords' hasil analisis kami. Masukkan keterampilan atau istilah teknis yang disarankan tersebut ke dalam bagian 'Skills' atau selipkan secara natural ke dalam deskripsi pengalaman kerja kamu.",
  },
];

type AwaitedResumesPromise = Awaited<
  AtsResultListTabClientProps["resumesPromise"]
>;

export default async function AtsPage() {
  const session = await getSession();

  if (!session) {
    return redirect("/login");
  }

  const atsResultsPromise = prisma.resume
    .findMany({
      where: { userId: session.user.id, atsResult: { some: {} } },
      select: {
        id: true,
        title: true,
        atsResult: {
          select: {
            createdAt: true,
            id: true,
            content: true,
            resume: { select: { title: true } },
          },
        },
      },
    })
    .then((resumes) =>
      resumes.map(({ atsResult: rawAtsResults, ...props }) => {
        const atsResults: AwaitedResumesPromise[number]["atsResults"] =
          rawAtsResults.map(({ content, resume: { title }, ...props }) => {
            const parsedContent = content as unknown as Omit<
              AtsResult,
              "id" | "createdAt"
            >;
            return { ...props, ...parsedContent, resumeTitle: title };
          });

        const result: AwaitedResumesPromise[number] = {
          ...props,
          resumeId: props.id,
          atsResults,
        };

        return result;
      }),
    );

  const resumesPromise = prisma.resume
    .findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        title: true,
        updatedAt: true,
        data: true,
        createdAt: true,
      },
    })
    .then((resume) =>
      resume.map(({ id, data, ...props }) => {
        const parsedData = resumeBuilderDbSchema.parse(data);
        return { ...props, resumeId: id, content: parsedData };
      }),
    );

  return (
    <div className="w-full flex-1 container mx-auto flex px-18 pb-4 pt-20! flex-col gap-20 min-w-[80rem]">
      <Tabs defaultValue="review" className="w-full h-[640px]">
        <TabsList>
          <TabsTrigger value="review">Review</TabsTrigger>
          <TabsTrigger value="reviewHistory">Hasil review saya</TabsTrigger>
        </TabsList>
        <TabsContent value="review" className="size-full min-h-0">
          <AtsCheckTabClient resumesPromise={resumesPromise} />
        </TabsContent>
        <TabsContent value="reviewHistory" className="size-full min-h-0">
          <Suspense fallback={<ResumeListSkeleton />}>
            <AtsResultListTabClient resumesPromise={atsResultsPromise} />
          </Suspense>
        </TabsContent>
      </Tabs>

      <FAQCollapsibleSection FAQItems={ATS_CHECKER_FAQ} />
    </div>
  );
}
