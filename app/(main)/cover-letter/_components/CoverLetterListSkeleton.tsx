import { Skeleton } from "@/components/ui/skeleton";

export function CoverLetterListSkeleton() {
  return (
    <div className="size-full flex flex-col gap-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <Skeleton className="flex-1 w-full" key={index} />
      ))}
    </div>
  );
}
