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
import { CoverLetterTabClient } from "./_components/CoverLetterTabClient";
import { CreateTabClient } from "./_components/CreateTabClient";

function CoverLetterTabClientSkeleton() {
  return (
    <Card className="size-full">
      <CardContent className="size-full">
        <div className="size-full flex flex-col gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="flex flex-col size-full gap-2" key={index}>
              <Skeleton className="flex-1 w-full" />
              <Skeleton className="flex-1 w-[70%]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const FAQ_ITEMS = [
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

  const coverLettersPromises = prisma.coverLetter
    .findMany({
      where: { resume: { userId } },
      select: {
        id: true,
        content: true,
        createdAt: true,
        resume: true,
      },
    })
    .then((coverLetters) =>
      coverLetters.map(({ resume, ...props }) => {
        const parsedData = resumeBuilderDbSchema.parse(resume.data);
        const newResume = {
          ...resume,
          resumeId: resume.id,
          content: parsedData,
        };
        return { ...props, resume: newResume };
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
          <Suspense fallback={<CoverLetterTabClientSkeleton />}>
            <CoverLetterTabClient coverLettersPromise={coverLettersPromises} />
          </Suspense>
        </TabsContent>
      </Tabs>

      <section className="flex w-full flex-col gap-4">
        <h1 className="font-semibold text-4xl w-full text-center">FAQ</h1>
        <div className="flex flex-none w-full flex-col gap-4">
          {FAQ_ITEMS.map(({ question, answer }, index) => (
            <Card className="w-full" key={index}>
              <CardContent>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="plain" size="lg" className="group w-full">
                      {question}
                      <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-2.5 py-3">
                    {answer}
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
