import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 w-full flex items-center justify-center bg-background">
      <Loader2 className="size-10 animate-spin" />
    </div>
  );
}
