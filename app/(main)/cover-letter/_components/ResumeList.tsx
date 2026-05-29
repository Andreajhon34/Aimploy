import { dateToLocalString } from "@/app/_lib/dateToLocalString";
import { Resume } from "@/app/_types/resume";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FileText, Funnel } from "lucide-react";
import { SortType } from "../_types/sortType";
import { DropdownMenuGroupSort } from "./DropdownMenuGroupSort";

type ResumeListProps = {
  resumes: Resume[];
  value: string;
  onValueChange: (resumeId: string) => void;
  setSortBy: (value: SortType) => void;
};

export function ResumeList({
  resumes,
  value,
  onValueChange,
  setSortBy,
}: ResumeListProps) {
  return (
    <div className="min-h-0 size-full min-w-0">
      <Card className="size-full">
        <CardHeader>
          <CardTitle className="w-full flex justify-center gap-2">
            <FileText /> Resume kamu
          </CardTitle>
        </CardHeader>
        <CardContent className="size-full overflow-hidden">
          <ScrollArea className="size-full">
            <ToggleGroup
              variant="outline"
              type="single"
              value={value}
              onValueChange={onValueChange}
              orientation="vertical"
              className="w-full pe-3.5"
            >
              {resumes.map(({ title, resumeId, updatedAt }) => (
                <ToggleGroupItem asChild value={resumeId} key={resumeId}>
                  <Card className="h-auto">
                    <CardContent className="w-full">
                      <p className="text-sm font-semibold">{title}</p>
                      <p className="text-sm text-muted-foreground">
                        Diperbaharui {dateToLocalString(updatedAt)}
                      </p>
                    </CardContent>
                  </Card>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </ScrollArea>
          {/* </div> */}
        </CardContent>
        <CardFooter className="bg-card border-none justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon-lg">
                <Funnel />
                <span className="sr-only">sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top">
              <DropdownMenuGroupSort setSortBy={setSortBy} />
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </div>
  );
}
