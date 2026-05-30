import { dateToLocalString } from "@/app/_lib/dateToLocalString";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { toast } from "sonner";
import { deleteAtsResult } from "../_actions/deleteAtsResult";
import { AtsResult } from "../_types/AtsResult";
import { AtsScoreDisplay } from "./AtsScoreDisplay";

type AtsResultCardProps = {
  atsResult: AtsResult;
  resumeTitle: string;
};

export function AtsResultCard({ atsResult, resumeTitle }: AtsResultCardProps) {
  const [openDialog, setOpenDIalog] = React.useState(false);
  const [isDeleting, startDeleting] = React.useTransition();

  const handleDeleteAtsResult = () => {
    startDeleting(async () => {
      const res = await deleteAtsResult(atsResult.id);
      if (res.success) {
        toast.success("Berhasil dihapus");
      } else {
        toast.success("Gagal menghapus");
      }
    });
  };
  return (
    <>
      <Card className="w-full m-0.5 ring-0 bg-muted/20">
        <CardContent className="grid w-full grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-y-2">
          <div className="self-center">
            <Dialog>
              <DialogTrigger asChild>
                <p className="truncate text-sm font-semibold cursor-pointer">
                  {resumeTitle} - {atsResult.score}%
                </p>
              </DialogTrigger>
              <DialogContent
                showCloseButton={false}
                className="max-w-none! w-fit max-h-[90vh] overflow-y-auto no-scrollbar"
              >
                <DialogHeader className="sr-only">
                  <DialogTitle>ATS Check dialog</DialogTitle>
                  <DialogDescription>
                    This is an ATS check dialog
                  </DialogDescription>
                </DialogHeader>
                <AtsScoreDisplay atsResult={atsResult} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="col-start-1 row-start-2 self-center">
            <p className="text-sm text-muted-foreground">
              Dibuat: {dateToLocalString(atsResult.createdAt)}
            </p>
          </div>

          <div className="row-span-2 col-start-2 row-start-1 min-w-0 min-h-0 self-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon-lg" variant="ghost">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={(e) => setOpenDIalog(true)}>
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={openDialog} onOpenChange={setOpenDIalog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah kamu yakin ingin menghapus?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batalkan</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAtsResult}
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
