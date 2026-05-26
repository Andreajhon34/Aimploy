"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";
import { DropdownMenuItem } from "../../../components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type LogoutDialogProps = {
  email: string;
} & React.ComponentProps<typeof DropdownMenuItem>;

export const LogoutDialog = ({ email, ...props }: LogoutDialogProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });

    if (error) {
      toast.error("Terjadi kesalahan saat ingin Sign out", {
        description: error.message,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => e.preventDefault()}
          {...props}
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah kamu yakin ingin Log out?</AlertDialogTitle>
          <AlertDialogDescription>
            Log Out sebagai {email} ?
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
