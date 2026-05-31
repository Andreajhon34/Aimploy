"use client";

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { SortType } from "../../../_types/sortType";

type DropdownMenuGroupSortProps = {
  setSortBy: (value: SortType) => void;
} & React.ComponentProps<typeof DropdownMenuGroup>;

export function DropdownMenuGroupSort({
  setSortBy,
  ...props
}: DropdownMenuGroupSortProps) {
  return (
    <DropdownMenuGroup {...props}>
      <DropdownMenuLabel>Sort by</DropdownMenuLabel>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Name</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem onSelect={() => setSortBy("ascending")}>
              Ascending
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortBy("descending")}>
              Descending
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Date</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem onSelect={() => setSortBy("latest")}>
              Latest
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortBy("oldest")}>
              Oldest
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  );
}
