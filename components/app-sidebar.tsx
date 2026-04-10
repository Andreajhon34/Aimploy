"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenuAction,
  SidebarMenuBadge
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
    ChevronDown,
    Plus,
    Home,
    FileText
} from "lucide-react"
import Link from "next/link"

const AppLogo = () => {
    return (
        <div className="flex px-2">
            <h1 className="font-bold">Aimploy.ai</h1>
        </div>
    )
}

const FeatureItems = () => {
    const features = [
        { name: "Resume builder", href: "/resume-builder", Icon: FileText}
    ] as const;

    return (
        <>
            {features.map(({ name, href, Icon }) => (
                <SidebarMenuItem key={name}>
                    <SidebarMenuButton asChild>
                        <Link href={href}>
                            <Icon />
                            <span>{name}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </>    
    )
}

export function AppSidebar() {
    return (
        <Sidebar>
        <SidebarHeader>
            <AppLogo />
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Features</SidebarGroupLabel>
                <FeatureItems />
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
        </Sidebar>
    )
}