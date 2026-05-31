"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { GalleryVerticalEndIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "../_schemas/loginSchema";
import { InputFormListProps } from "../../_components/InputForm";
import { ButtonWithLoading } from "@/components/ui/ButtonWithLoading";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginWithGoogleButton } from "./LoginWithGoogleButton";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const router = useRouter();

  const onSubmit = async (payload: LoginSchema) => {
    const { error } = await authClient.signIn.email({
      email: payload.email,
      password: payload.password,
    });

    if (!error) {
      return router.push("/");
    }

    form.setError("root", {
      type: error.code,
      message: error.message,
    });
  };

  const inputFormProperties: InputFormListProps<LoginSchema>["inputFields"] = [
    {
      labelName: "Email",
      name: "email",
      type: "email",
    },
    {
      labelName: "Password",
      name: "password",
      type: "password",
    },
  ];

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl font-bold">Welcome to Aimploy.ai</h1>
          <FieldDescription>
            Don&apos;t have an account? <Link href="/signup">Sign up</Link>
          </FieldDescription>
        </div>
        <InputFormListProps
          inputFields={inputFormProperties}
          control={form.control}
        />
        {form.formState.errors.root && (
          <p className="text-destructive text-center mt-2">
            {form.formState.errors.root.message}
          </p>
        )}
        <FieldGroup
          className={cn("mt-4", form.formState.errors.root && "mt-2")}
        >
          <Field>
            <ButtonWithLoading isLoading={form.formState.isSubmitting}>
              Login
            </ButtonWithLoading>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field>
            <LoginWithGoogleButton setError={form.setError} />
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center text-xs">
        By clicking continue, you agree to our{" "}
        <span className="font-bold ">Terms of Service</span> and{" "}
        <span className="font-bold">Privacy Policy</span>.
      </FieldDescription>
    </div>
  );
}
