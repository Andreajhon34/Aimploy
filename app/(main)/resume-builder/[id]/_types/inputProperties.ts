import { Path, FieldValues } from "react-hook-form";

export type InputProperties<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: React.HtmlHTMLAttributes<HTMLElement>["className"];
};
