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
    FileText,
    Search
} from "lucide-react"
import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"


const AppLogo = () => {
    const { state } = useSidebar();

    return (
        <div className={cn(
            "flex size-full", 
            state === "collapsed"  && "justify-center",
            state === "expanded" && "px-2"
        )}>
            {state === "expanded" 
            ? (
                <h1 className="font-bold">Aimploy.ai</h1>
            ) : (
                <h1 className="font-bold">Ai</h1>
            )}
        </div>
    );
}

const FeatureItems = () => {
    const features = [
        { name: "Resume builder", href: "/resume-builder", Icon: FileText },
        { name: "ATS Checker", href: "/ats-checker", Icon: Search }
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
        <Sidebar collapsible="icon">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <AppLogo />
                </SidebarMenuItem>
            </SidebarMenu>
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