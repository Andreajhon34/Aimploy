"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import type { ReactNode } from "react";
import { z } from "zod";
import type { HTMLAttributes } from "react";
import { ExperienceSchema } from "@/schemas/resume-builder";
import {
  type Control,
  type FieldValues,
  Controller,
  FieldPath,
  Path,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Sparkle, Check, Plus } from "lucide-react";

type CardBaseProps = {
  children: ReactNode;
  title: ReactNode;
};

const CardBase = ({ children, title }: CardBaseProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row gap-x-3 justify-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">{children}</CardContent>
    </Card>
  );
};

type DynamicFieldsProps<T extends FieldValues> = {
  htmlFor: string;
  label: string;
  name: FieldPath<T>;
  placeholder?: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  control: Control<T>;
};

const DynamicFields = <T extends FieldValues>({
  name,
  htmlFor,
  label,
  placeholder,
  className,
  control,
}: DynamicFieldsProps<T>) => {
  return (
    <Controller
      key={htmlFor}
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
          <Input
            {...field}
            id={htmlFor}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

type CardFieldProps = {
  children: ReactNode;
  onRemove: () => void;
};

const CardField = ({ children, onRemove }: CardFieldProps) => {
  return (
    <Card>
      <CardHeader>
        <CardAction>
          <Button
            type="button"
            variant="destructive"
            onClick={() => onRemove()}
          >
            <Trash />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">{children}</CardContent>
    </Card>
  );
};

type EnhanceWithAiButtonProps = {
  disabled: boolean;
  onClick: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
};

const EnhanceWithAiButton = ({
  disabled,
  onClick,
  isSubmitting,
  isSuccess,
}: EnhanceWithAiButtonProps) => {
  return (
    <Button
      type="button"
      size="lg"
      className="col-span-2"
      disabled={disabled}
      onClick={() => onClick()}
    >
      {isSubmitting ? (
        <>
          <Sparkle className="animate-spin" />
          Enhancing...
        </>
      ) : isSuccess ? (
        <Check />
      ) : (
        <>
          <Sparkle />
          Enhance with Aimploy
        </>
      )}
    </Button>
  );
};

type TextAreaFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  htmlFor: string;
  className?: string;
  placeholder?: string;
};

const TextAreaField = <T extends FieldValues>({
  name,
  control,
  label,
  htmlFor,
  className,
  placeholder,
}: TextAreaFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
          <Textarea
            {...field}
            id={htmlFor}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            placeholder={placeholder}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

type AddButtonProps = {
  onClick: () => void;
};

const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <Button onClick={() => onClick()} type="button">
      <Plus />
      Tambah
    </Button>
  );
};

export {
  CardBase,
  DynamicFields,
  CardField,
  EnhanceWithAiButton,
  TextAreaField,
  AddButton,
};
