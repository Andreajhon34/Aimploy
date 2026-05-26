"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSidebar, SidebarTrigger } from "@/components/ui/sidebar";

export const AppLogo = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    // Parent utama diberikan `relative` agar tombol saat collapsed bisa presisi di tengah
    <div className="group relative flex h-9 items-center justify-between w-full px-2 overflow-hidden">
      <Link
        href="/"
        className="relative flex items-center font-bold tracking-tight"
      >
        <span
          className={cn(
            "transition-all duration-100 ease-out whitespace-nowrap text-foreground",
            isCollapsed
              ? "opacity-0 -translate-x-3 pointer-events-none w-0"
              : "opacity-100 translate-x-0",
          )}
        >
          Aimploy.ai
        </span>

        <span
          className={cn(
            "absolute transition-all duration-200 ease-in-out whitespace-nowrap text-foreground",
            isCollapsed
              ? "opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-75"
              : "opacity-0 scale-95 pointer-events-none",
          )}
        >
          Ai
        </span>
      </Link>

      {isCollapsed && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none scale-90 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 transition-all duration-200 ease-in-out">
          <SidebarTrigger className="h-8 w-8" />
        </div>
      )}

      {!isCollapsed && (
        <SidebarTrigger className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors shrink-0" />
      )}
    </div>
  );
};
