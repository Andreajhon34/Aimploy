import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ResumeListSkeleton() {
  return (
    <div className="size-full flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton className="flex-1 w-full" key={index} />
      ))}
    </div>
  );
}
