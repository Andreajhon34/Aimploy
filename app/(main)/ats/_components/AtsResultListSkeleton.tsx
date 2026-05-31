import { Skeleton } from "@/components/ui/skeleton";

export function AtsResultListSkeleton() {
  return (
    <div className="size-full flex flex-col gap-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <Skeleton key={index} className="flex-1 w-full" />
      ))}
    </div>
  );
}
