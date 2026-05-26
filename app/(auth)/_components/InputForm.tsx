"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from "react-hook-form";

export type InputFormProps<T extends FieldValues> = {
  labelName: string;
  placeholder?: string;
  name: Path<T>;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  className?: React.InputHTMLAttributes<HTMLInputElement>["className"];
} & Omit<ControllerProps<T>, "render">;

export const InputForm = <T extends FieldValues>({
  labelName,
  className,
  placeholder,
  type,
  ...props
}: InputFormProps<T>) => {
  const [isSeen, setIsSeen] = React.useState(false);
  return (
    <Controller
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid} className={className}>
            <FieldLabel htmlFor={props.name}>{labelName}</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                id={props.name}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid}
                type={
                  type === "password" ? (isSeen ? "text" : "password") : type
                }
              />
              {type === "password" && (
                <InputGroupAddon align="inline-end">
                  <Button
                    variant="ghost"
                    onClick={() => setIsSeen((prev) => !prev)}
                  >
                    {isSeen ? <EyeIcon /> : <EyeOffIcon />}
                  </Button>
                </InputGroupAddon>
              )}
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
      {...props}
    />
  );
};

export type InputFormListProps<T extends FieldValues> = {
  inputFields: Omit<InputFormProps<T>, "control">[];
  control: Control<T>;
} & React.ComponentProps<typeof FieldGroup>;

export const InputFormListProps = <T extends FieldValues>({
  inputFields,
  control,
  ...props
}: InputFormListProps<T>) => {
  return (
    <FieldGroup {...props}>
      {inputFields.map((inputProps) => (
        <InputForm control={control} key={inputProps.name} {...inputProps} />
      ))}
    </FieldGroup>
  );
};
