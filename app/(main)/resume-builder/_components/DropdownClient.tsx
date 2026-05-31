"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { RenameDropdownItem } from "./RenameDropdownItem";
import { DeleteDropdownItem } from "./DeleteDropdownItem";
import React from "react";

export function DropdownClient({
  resumeId,
  title,
}: {
  resumeId: string;
  title: string;
}) {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100"
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <RenameDropdownItem
          resumeId={resumeId}
          title={title}
          setDropdownOpen={setDropdownOpen}
        />
        <DeleteDropdownItem resumeId={resumeId} title={title} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
