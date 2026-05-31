import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { AppLogo } from "@/app/_components/sidebar/AppLogo";
import { Suspense } from "react";
import { SidebarFooterContent } from "../app/_components/sidebar/SidebarFooter";
import { AppFeaturesNav } from "@/app/_components/sidebar/AppFeaturesNav";
import { SidebarContentView } from "@/app/_components/sidebar/SidebarContentView";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <AppLogo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarContentView />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterContent />
      </SidebarFooter>
    </Sidebar>
  );
}
