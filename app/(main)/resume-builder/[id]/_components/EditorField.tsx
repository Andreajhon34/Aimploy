import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import { Editor } from "@tiptap/react";
import React from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";

type EditorFieldProps<T extends FieldValues> = {
  label: string;
  className?: React.HtmlHTMLAttributes<HTMLElement>["className"];
  placeholder?: string;
} & Omit<ControllerProps<T>, "render">;

const EditorFieldBase = React.forwardRef(
  <T extends FieldValues>(
    {
      control,
      name,
      className,
      label,
      placeholder,
      ...props
    }: EditorFieldProps<T>,
    ref: React.ForwardedRef<{ editor: Editor }>,
  ) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { ref: _ref, ...etc }, fieldState }) => (
          <Field className={className} data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>

            <MinimalTiptapEditor
              ref={ref}
              aria-invalid={fieldState.invalid}
              className="w-full"
              editorContentClassName="p-5"
              output="html"
              placeholder={placeholder}
              editable
              editorClassName="focus:outline-none"
              {...etc}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
        {...props}
      />
    );
  },
);

EditorFieldBase.displayName = "EditorField";

export const EditorField = EditorFieldBase as <T extends FieldValues>(
  props: EditorFieldProps<T> & {
    ref?: React.Ref<{ editor: Editor }>;
  },
) => React.ReactElement;
