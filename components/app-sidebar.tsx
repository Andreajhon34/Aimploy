"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  FileText,
  Home,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  SunMoon,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { LogInModal, SignUpModal } from "./auth/modals";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AppLogo = () => {
  const { state } = useSidebar();

  return (
    <div
      className={cn(
        "flex size-full",
        state === "collapsed" && "justify-center",
        state === "expanded" && "px-2",
      )}
    >
      {state === "expanded" ? (
        <h1 className="font-bold">Aimploy.ai</h1>
      ) : (
        <h1 className="font-bold">Ai</h1>
      )}
    </div>
  );
};
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";

const FeatureItems = () => {
  const features = [
    { name: "Home", href: "/", Icon: Home },
    { name: "Resume builder", href: "/resume-builder", Icon: FileText },
    { name: "ATS Checker", href: "/ats", Icon: Search },
  ] as const;
  const { state } = useSidebar();

  return features.map(({ name, href, Icon }) => (
    <SidebarMenuItem key={name}>
      {state === "collapsed" ? (
        <Tooltip disableHoverableContent>
          <TooltipTrigger asChild>
            <SidebarMenuButton asChild>
              <Link href={href}>
                <Icon />
                <span>{name}</span>
              </Link>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right">{name}</TooltipContent>
        </Tooltip>
      ) : (
        <SidebarMenuButton asChild>
          <Link href={href}>
            <Icon />
            <span>{name}</span>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  ));
};

const ThemeSwitcher = ({
  ...props
}: React.ComponentProps<typeof DropdownMenu>) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSub {...props}>
      <DropdownMenuSubTrigger>
        <SunMoon />
        Theme
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Settings className="mr-2 h-4 w-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

const LogoutButton = () => {
  const { isPending, data } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => e.preventDefault()}
          disabled={isPending}
        >
          <LogOut />
          {isPending ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah kamu yakin ingin Log Out?</AlertDialogTitle>
          <AlertDialogDescription>
            Log Out sebagai {data?.user.email} ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel className="mt-5">Batalkan</AlertDialogCancel>
        <AlertDialogAction onClick={handleLogout} variant="destructive">
          Log Out
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const UserProfile = ({
  ...props
}: React.ComponentProps<typeof DropdownMenu>) => {
  const { data } = authClient.useSession();

  if (!data) return null;

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg">
          <Avatar size="lg">
            <AvatarImage src={data.user.image ?? undefined} />
            <AvatarFallback>{data.user.name[0]}</AvatarFallback>
          </Avatar>
          <span>{data.user.name}</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
        <ThemeSwitcher />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AuthButtons = ({
  ...props
}: React.ComponentProps<typeof SidebarMenu>) => {
  return (
    <SidebarMenu {...props} className="gap-2">
      <SignUpModal />
      <LogInModal />
    </SidebarMenu>
  );
};

const SidebarFooterContent = () => {
  const { state } = useSidebar();
  const { data, isPending } = authClient.useSession();

  if (isPending)
    return (
      <div className="flex gap-2">
        <Skeleton className="size-10 rounded-full shrink-0 grow-0" />
        <Skeleton className="rounded-sm size-full" />
      </div>
    );

  if (data) return <UserProfile />;

  return state === "expanded" ? <AuthButtons /> : null;
};

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
      <SidebarFooter>
        <SidebarFooterContent />
      </SidebarFooter>
    </Sidebar>
  );
}
