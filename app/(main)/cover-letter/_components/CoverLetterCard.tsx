"use client";

import { dateToLocalString } from "@/app/_lib/dateToLocalString";
import { Resume } from "@/app/_types/resume";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import React from "react";
import { useReactToPrint } from "react-to-print";
import { CoverLetter } from "../_types/CoverLetter";
import { CoverLetterPreview } from "./CoverLetterPreview";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "../_actions/deleteCoverLetter";
import { toast } from "sonner";

type CoverLetterCardProps = {
  coverLetter: CoverLetter & { id: string };
  resume: Resume & { createdAt: Date };
};

export function CoverLetterCard({ coverLetter, resume }: CoverLetterCardProps) {
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const [isDeleting, startDeleting] = React.useTransition();

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Aimploy_cover_letter",
    pageStyle: `
    body {
      font-family: 'Inter', sans-serif;
    }
  `,
  });

  const handleDeleteCoverLetter = () => {
    startDeleting(async () => {
      const res = await deleteCoverLetter(coverLetter.id);
      if (res.success) {
        toast.success("Berhasil dihapus");
      } else {
        toast.error("Gagal dihapus");
      }
    });
  };

  const [openDialog, setOpenDIalog] = React.useState(false);

  return (
    <>
      <div className="w-full flex flex-col p-0.5">
        {" "}
        <Card className="relative size-full">
          <CardContent className="grid grid-cols-[1fr_auto] grid-rows-2 gap-y-2">
            <Dialog>
              {/* 
                Keep a hidden printable version mounted in the DOM.
                The Dialog content is lazily mounted, so react-to-print
                needs a persistent element reference to print correctly.
            */}
              <div
                className="fixed -top-[9999px] -left-[9999px]"
                aria-hidden="true"
              >
                <CoverLetterPreview
                  ref={contentRef}
                  content={coverLetter.content}
                  personalInfo={{
                    fullName: coverLetter.personalInfo.fullName,
                    email: coverLetter.personalInfo.email,
                    phone: coverLetter.personalInfo.phone,
                  }}
                />
              </div>

              <DialogTrigger asChild>
                <div>
                  <p className="text-sm font-semibold cursor-pointer">
                    Dari: {resume.title}
                  </p>
                </div>
              </DialogTrigger>

              <DialogContent
                className="max-w-none! w-fit h-[90vh]"
                showCloseButton={false}
              >
                <DialogHeader className="sr-only">
                  <DialogTitle>Your Cover letter</DialogTitle>

                  <DialogDescription>
                    This is your cover letter that has been generated
                  </DialogDescription>
                </DialogHeader>

                <div className="overflow-y-auto no-scrollbar">
                  <CoverLetterPreview
                    ref={contentRef}
                    content={coverLetter.content}
                    personalInfo={{
                      fullName: coverLetter.personalInfo.fullName,
                      email: coverLetter.personalInfo.email,
                      phone: coverLetter.personalInfo.phone,
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>
            <div className="colxxxxxxxx-start-1 row-start-2">
              <p className="text-sm text-muted-foreground">
                Diperbaharui: {dateToLocalString(resume.createdAt)}
              </p>
            </div>
            <div className="row-span-2 col-start-2 row-start-1 self-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon-lg" variant="ghost">
                    <Ellipsis />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handlePrint}>
                    Cetak
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={(e) => setOpenDIalog(true)}>
                    Hapus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={openDialog} onOpenChange={setOpenDIalog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah kamu yakin ingin menghapus cover letter ini?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batalkan</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCoverLetter}
              disabled={isDeleting}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
