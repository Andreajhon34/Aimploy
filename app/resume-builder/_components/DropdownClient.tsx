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
          className="h-8 w-8 bg-background/80 hover:bg-background border shadow-xs backdrop-blur-xs opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreVertical className="h-4 w-4" />
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
