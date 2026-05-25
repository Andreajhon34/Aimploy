"use client";

import { ButtonWithLoading } from "@/components/ui/ButtonWithLoading";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { InputFormListProps } from "../../_components/InputForm";
import { signupSchema, SignupSchema } from "../_schemas/signupSchema";
import { SignupWithGoogle } from "./SignupWithGoogleButton";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const router = useRouter();

  const inputFormProperties: InputFormListProps<SignupSchema>["inputFields"] = [
    {
      labelName: "Name",
      name: "name",
      type: "text",
    },
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

  const onSubmit = async (payload: SignupSchema) => {
    const { error } = await authClient.signUp.email({
      email: payload.email,
      name: payload.name,
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

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-bold">Welcome to Aimploy.ai</h1>
            <FieldDescription>
              Already have an account? <Link href="/login">Log in</Link>
            </FieldDescription>
          </div>
          <InputFormListProps
            inputFields={inputFormProperties}
            control={form.control}
          />
          {form.formState.errors.root && (
            <Field>
              <p className="text-destructive text-center">
                {form.formState.errors.root.message}
              </p>
            </Field>
          )}
          <Field>
            <ButtonWithLoading isLoading={form.formState.isLoading}>
              Create Account
            </ButtonWithLoading>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field orientation="vertical">
            <SignupWithGoogle setError={form.setError} />
          </Field>
        </FieldGroup>
      </form>
<<<<<<< HEAD
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
=======
      <FieldDescription className="px-6 text-center text-xs">
        By clicking continue, you agree to our{" "}
        <span className="font-bold ">Terms of Service</span> and{" "}
        <span className="font-bold">Privacy Policy</span>.
>>>>>>> 7c80933 (update auth pages and layouts)
      </FieldDescription>
    </div>
  );
}
