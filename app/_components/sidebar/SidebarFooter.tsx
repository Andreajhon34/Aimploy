import { auth } from "@/lib/auth";
import { Ellipsis } from "lucide-react";
import { headers } from "next/headers";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../components/ui/sidebar";
import { LogoutDialog } from "./LogoutDialog";
import { ThemeSwitcherDropdown } from "./ThemeSwitcherDropdown";
import { GuessDropdown } from "./GuessDropdown";
import { getSession } from "@/app/_lib/getSession";

type UserAvatarDropdownProps = {
  email: string;
  imageUrl: string | null;
  fallback: string;
  userName: string;
} & React.ComponentProps<typeof SidebarMenuButton>;

const UserAvatarDropdown = ({
  imageUrl,
  fallback,
  userName,
  email,
  ...props
}: UserAvatarDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg" {...props}>
          <Avatar size="lg">
            <AvatarImage src={imageUrl ?? undefined} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col text-left leading-tight">
            <span className="truncate text-sm font-medium text-foreground">
              {userName}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {email}
            </span>
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
        <ThemeSwitcherDropdown />
        <LogoutDialog email={email} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export async function SidebarFooterContent() {
  const session = await getSession();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {session ? (
          <UserAvatarDropdown
            userName={session.user.name}
            email={session.user.email}
            fallback={session.user.name[0]}
            imageUrl={session.user.image ?? null}
          />
        ) : (
          <GuessDropdown />
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
