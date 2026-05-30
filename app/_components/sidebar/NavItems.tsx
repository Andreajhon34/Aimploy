"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { FileText, Home, ScrollText, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const NavItems = () => {
  const router = usePathname();
  const features = [
    { name: "Home", href: "/", Icon: Home },
    { name: "Resume builder", href: "/resume-builder", Icon: FileText },
    { name: "ATS Checker", href: "/ats", Icon: Search },
    { name: "Cover letter", href: "/cover-letter", Icon: ScrollText },
  ] as const;

  return features.map(({ name, href, Icon }) => (
    <SidebarMenuItem key={name}>
      <SidebarMenuButton
        asChild
        isActive={
          href === "/"
            ? router === "/"
            : router === href || router.startsWith(href)
        }
        tooltip={name}
      >
        <Link href={href}>
          <Icon />
          <span>{name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));
};
