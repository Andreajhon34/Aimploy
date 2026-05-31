"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import React from "react";
import { toast } from "sonner";
import { renameResume } from "../_actions/renameResume";

type DeleteDropdownItemProps = {
  resumeId: string;
  title: string;
  setDropdownOpen: (value: boolean) => void;
} & React.ComponentProps<typeof DropdownMenuItem>;

export function RenameDropdownItem({
  resumeId,
  setDropdownOpen,
  title: initialTitle,
  ...props
}: DeleteDropdownItemProps) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(initialTitle);
  const [isPending, startTransition] = React.useTransition();
  const isValidTitle = title.length >= 2;

  React.useEffect(() => {
    if (!open) {
      setTitle(initialTitle);
    }
  }, [open, initialTitle]);

  const handleOnSelect = (e: Event) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleRename = () => {
    setDropdownOpen(false);
    if (initialTitle === title) return;
    startTransition(async () => {
      const res = await renameResume(resumeId, title);
      if (res.success) {
        toast.success(`${initialTitle} berhasil diganti ke ${title}`);
      } else {
        toast.error(
          `Terjadi kesalahan saat mengganti name ${initialTitle} ke ${title}`,
        );
      }
    });
  };

  return (
    <>
      <DropdownMenuItem
        onSelect={handleOnSelect}
        className="cursor-pointer"
        {...props}
      >
        Ubah nama
      </DropdownMenuItem>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Nama</DialogTitle>
          </DialogHeader>
          <Input
            aria-invalid={!isValidTitle}
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRename();
              if (e.key === "Escape") setDropdownOpen(false);
            }}
          />
          {!isValidTitle && (
            <p className="text-destructive mt-2">
              Nama harus lebih dari 2 karakter
            </p>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button onClick={handleRename} disabled={isPending}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
