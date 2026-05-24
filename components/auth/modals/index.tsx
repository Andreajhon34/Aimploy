"use client";

import { signupAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import {
  LoginSchema,
  loginSchema,
  SignupSchema,
  signupSchema,
} from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ComponentProps, InputHTMLAttributes, useState } from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  FormProvider,
  Path,
  UseControllerReturn,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { SiGoogle } from "@icons-pack/react-simple-icons";

type InputFieldProps<T extends FieldValues> = {
  htmlFor: string;
  labelName: string;
  inputName: string;
  placeholder?: string;
  name: Path<T>;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
};

const InputField = <T extends FieldValues>({
  htmlFor,
  labelName,
  placeholder,
  inputName,
  type,
  control,
  name,
}: InputFieldProps<T> & { control: Control<T> }) => {
  const [isSeen, setIsSeen] = useState(false);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={htmlFor}>{labelName}</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                id={htmlFor}
                name={inputName}
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
    />
  );
};

type InputFieldGroupProps<T extends FieldValues> = {
  inputFields: InputFieldProps<T>[];
};

const InputFieldGroup = <T extends FieldValues>({
  inputFields,
  ...props
}: InputFieldGroupProps<T> & React.ComponentProps<typeof FieldGroup>) => {
  const { control } = useFormContext<T>();
  return (
    <FieldGroup {...props}>
      {inputFields.map(({ name, ...fields }) => (
        <InputField
          key={fields.htmlFor}
          control={control}
          name={name}
          {...fields}
        />
      ))}
    </FieldGroup>
  );
};

const OrSeparator = () => {
  return (
    <div className="relative my-4">
      <Separator />
      <span className="absolute top-1/2 left-1/2 -translate-1/2 bg-card text-muted-foreground px-2">
        Or
      </span>
    </div>
  );
};

export function SignUpModal() {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { isPending } = authClient.useSession();

  const { isSubmitting, isValid } = form.formState;

  const inputFields: InputFieldGroupProps<SignupSchema>["inputFields"] = [
    {
      htmlFor: "nameInput",
      inputName: "name",
      labelName: "Name",
      name: "name",
      placeholder: "",
      type: "text",
    },
    {
      htmlFor: "emailInput",
      inputName: "email",
      labelName: "Email",
      name: "email",
      placeholder: "",
      type: "email",
    },
    {
      htmlFor: "passwordInput",
      inputName: "password",
      labelName: "Password",
      name: "password",
      placeholder: "",
      type: "password",
    },
  ];

  const onSubmit = async (data: SignupSchema) => {
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (error) {
      form.setError("root.serverError", {
        type: "server",
        message: `Server returned with Code: ${error.code}`,
      });
    }
  };

  const handleSignUpWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Dialog>
      <form onSubmit={form.handleSubmit(onSubmit)} id="signupForm">
        <DialogTrigger asChild>
          <Button size="lg" className="w-full">
            Sign Up
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Sign up</DialogTitle>
            <DialogDescription>
              Sign Up untuk membuka lebih banyak fitur dan respon yang lebih
              pintar
            </DialogDescription>
          </DialogHeader>
          <FormProvider {...form}>
            <InputFieldGroup inputFields={inputFields} />
          </FormProvider>
          {form.formState.errors.root?.serverError && (
            <p className="text-destructive text-xs">
              {form.formState.errors.root.serverError.message}
            </p>
          )}
          <Button
            size="lg"
            type="submit"
            form="signupForm"
            className="mt-6"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? <Loader /> : "Sign up"}
          </Button>
          <OrSeparator />
          <Button
            onClick={handleSignUpWithGoogle}
            size="lg"
            variant="secondary"
          >
            {isPending ? (
              <Loader />
            ) : (
              <>
                <SiGoogle />
                Google
              </>
            )}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export function LogInModal() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { isPending } = authClient.useSession();

  const { isValid, isSubmitting } = form.formState;

  const inputFields: InputFieldGroupProps<LoginSchema>["inputFields"] = [
    {
      htmlFor: "emailInput",
      inputName: "email",
      labelName: "Email",
      name: "email",
      placeholder: "",
      type: "email",
    },
    {
      htmlFor: "passwordInput",
      inputName: "password",
      labelName: "Password",
      name: "password",
      placeholder: "",
      type: "password",
    },
  ];

  const onSubmit = async (data: LoginSchema) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      form.setError("root.serverError", {
        type: "server",
        message: `Server returned with Code: ${error.code}`,
      });
    }
  };

  const handleSignUpWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Dialog>
      <form id="loginForm" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button variant="secondary" size="lg" className="w-full">
            Log In
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Log in</DialogTitle>
            <DialogDescription>
              Log In untuk membuka lebih banyak fitur dan respon yang lebih
              pintar
            </DialogDescription>
          </DialogHeader>
          <FormProvider {...form}>
            <InputFieldGroup inputFields={inputFields} />
          </FormProvider>
          {form.formState.errors.root?.serverError && (
            <p className="text-destructive text-xs">
              {form.formState.errors.root.serverError.message}
            </p>
          )}
          <Button
            size="lg"
            type="submit"
            form="loginForm"
            className="mt-6"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? <Loader /> : "Login"}
          </Button>
          <OrSeparator />
          <Button
            onClick={handleSignUpWithGoogle}
            size="lg"
            variant="secondary"
          >
            {isPending ? (
              <Loader />
            ) : (
              <>
                <SiGoogle />
                Google
              </>
            )}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}
