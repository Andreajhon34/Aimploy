"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import React from "react";
import { TEMPLATES_NAME } from "../_lib/templates";
import { Template1Preview } from "../../_components/Template1Preview";
import { Template2Preview } from "../../_components/Template2Preview";

type TemplateDialogProps = {
  setTemplate: (value: TEMPLATES_NAME) => void;
};

export function TemplateDialog({ setTemplate }: TemplateDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="me-3" variant="ghost">
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="max-w-none! w-auto">
        <div className="flex gap-3">
          <div
            className="flex flex-col gap-3"
            onClick={() => {
              setTemplate("classic");
              setOpen(false);
            }}
          >
            <Template1Preview className="hover:cursor-pointer h-[500px]" />
            <span className="w-full text-center">Classic</span>
          </div>
          <div
            onClick={() => {
              setTemplate("modern");
              setOpen(false);
            }}
            className="flex flex-col gap-3"
          >
            <Template2Preview className="hover:cursor-pointer h-[500px]" />
            <span className="w-full text-center">Modern</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
