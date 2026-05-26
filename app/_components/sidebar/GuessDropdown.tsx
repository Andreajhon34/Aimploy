"use client";

import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "../../../components/ui/sidebar";
import { ThemeSwitcherDropdown } from "./ThemeSwitcherDropdown";
import { cn } from "@/lib/utils";

export const GuessDropdown = (
  props: React.ComponentProps<typeof SidebarMenuButton>,
) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg" {...props}>
          <Ellipsis className={cn("ms-auto", isCollapsed && "mx-auto")} />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
        <ThemeSwitcherDropdown />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
