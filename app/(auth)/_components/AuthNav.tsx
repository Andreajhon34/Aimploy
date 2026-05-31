"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function AuthNav() {
  const router = useRouter();

  return (
    <header className="w-full flex container justify-start items-center mx-auto px-4 py-4">
      <Button variant="ghost" size="icon-lg" onClick={() => router.back()}>
        <ChevronLeft className="size-7" />
        <span className="sr-only">back</span>
      </Button>
    </header>
  );
}
