import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import { Editor } from "@tiptap/react";
import React from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldPathValue,
  FieldValues,
  Path,
} from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  placeholder?: string;
  className?: React.HtmlHTMLAttributes<HTMLElement>["className"];
} & Omit<ControllerProps<T>, "render">;

export const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  className,
  placeholder,
  ...props
}: InputFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input
            {...field}
            id={name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
      {...props}
    />
  );
};

type EditorFieldProps<T extends FieldValues> = {
  label: string;
  className?: React.HtmlHTMLAttributes<HTMLElement>["className"];
} & Omit<ControllerProps<T>, "render">;

export const EditorField = <T extends FieldValues>() =>
  React.forwardRef<{ editor: Editor }, EditorFieldProps<T>>(
    ({ control, name, className, label, ...props }, ref) => {
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { ref, ...etc }, fieldState }) => (
            <Field className={className} data-invalid={fieldState.invalid}>
              <FieldLabel>Ringkasan Profil</FieldLabel>
              <MinimalTiptapEditor
                aria-invalid={fieldState.invalid}
                ref={ref}
                className="w-full"
                editorContentClassName="p-5"
                output="html"
                placeholder="Enter your summary..."
                autofocus={true}
                editable={true}
                editorClassName="focus:outline-hidden"
                {...etc}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      );
    },
  );
