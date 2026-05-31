import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { AuthNav } from "./_components/AuthNav";

export default function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <AuthNav />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
