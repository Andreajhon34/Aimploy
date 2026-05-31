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

type TemplateDialogProps = {
  setTemplate: (value: TEMPLATES_NAME) => void;
};

export function TemplateDialog({ setTemplate }: TemplateDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="me-3">
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <div
          className="flex flex-col gap-3"
          onClick={() => {
            setTemplate("classic");
            setOpen(false);
          }}
        >
          <Template1Preview className="hover:cursor-pointer" />
          <span className="w-full text-center">Classic</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
