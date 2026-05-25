"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
    if (initialTitle === title) return setDropdownOpen(false);
    startTransition(async () => {
      const res = await renameResume(resumeId, title);
      if (res.success) {
        setDropdownOpen(false);
        toast.success(`${initialTitle} berhasil diganti ke ${title}`);
      } else {
        setDropdownOpen(false);
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
            <DialogTitle>Nama baru</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col">
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

            <div className="flex gap-2 justify-end mt-4">
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>

              <Button onClick={handleRename} disabled={isPending}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
