"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsFileEarmarkText, BsFileText } from "react-icons/bs";
import { LuFileCheck } from "react-icons/lu";

export const AppFeaturesNav = () => {
  const router = usePathname();
  const features = [
    { name: "Home", href: "/", Icon: Home },
    {
      name: "Resume builder",
      href: "/resume-builder",
      Icon: BsFileEarmarkText,
    },
    { name: "ATS Checker", href: "/ats", Icon: LuFileCheck },
    { name: "Cover letter", href: "/cover-letter", Icon: BsFileText },
  ] as const;

  return (
    <SidebarMenu>
      {features.map(({ name, href, Icon }) => {
        return (
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
        );
      })}
    </SidebarMenu>
  );
};
