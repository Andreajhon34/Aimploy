"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React, { startTransition } from "react";
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
import { deleteResume } from "../_actions/deleteResume";
import { toast } from "sonner";

type DeleteDropdownItemProps = {
  resumeId: string;
  title: string;
} & React.ComponentProps<typeof DropdownMenuItem>;

export function DeleteDropdownItem({
  resumeId,
  title,
  ...props
}: DeleteDropdownItemProps) {
  const [open, setOpen] = React.useState(false);

  const handleOnSelect = (e: Event) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    startTransition(async () => {
      const res = await deleteResume(resumeId);
      if (res.success) {
        toast.success(`${title} berhasil dihapus`);
      } else {
        toast.error(`Terjadi kesalahan saat menghapus ${title}`);
      }
    });
  };

  return (
    <>
      <DropdownMenuItem
        onSelect={handleOnSelect}
        className="text-destructive focus:text-destr
      uctive cursor-pointer"
        {...props}
      >
        Hapus
      </DropdownMenuItem>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Aksi ini tidak dapat dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batalkan</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
