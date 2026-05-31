"use client";

import { toastApiError } from "@/app/_lib/toastApiError";
import { HttpError } from "@/lib/HttpError";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { Editor } from "@tiptap/react";
import React from "react";
import { toast } from "sonner";

type useEnhanceMutation<TData, TVariables> = {
  onMutation: MutationFunction<TData, TVariables>;
  onSuccess: (data: TData) => void;
};

export const useEnhanceMutation = <TData, TVariables = void>({
  onMutation: mutationFn,
  onSuccess,
}: useEnhanceMutation<TData, TVariables>) => {
  const tiptapRef = React.useRef<{ editor: Editor }>(null);

  const mutation = useMutation({
    mutationFn,
    onError: (err: unknown) => toastApiError(err),
    onSuccess,
  });

  React.useEffect(() => {
    if (!mutation.isSuccess) return;

    const timer = setTimeout(() => mutation.reset(), 2000);

    return () => clearTimeout(timer);
  }, [mutation.isSuccess]);

  return {
    mutate: mutation.mutate,
    tiptapRef,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};
