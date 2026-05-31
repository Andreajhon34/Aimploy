"use client";

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
          <AlertDialogTitle>Apakah anda yakin ingin keluar?</AlertDialogTitle>
          <AlertDialogDescription>
            keluar sebagai {email} ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batalkan</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} variant="destructive">
            Keluar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
