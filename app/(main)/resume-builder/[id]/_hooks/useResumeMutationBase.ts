"use client";

import { toastApiError } from "@/app/_lib/toastApiError";
import { HttpError } from "@/lib/HttpError";
import {
  DefaultError,
  MutationFunction,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { Editor } from "@tiptap/react";
import React from "react";
import { toast } from "sonner";

export const useResumeMutationBase = <
  TError = DefaultError,
  TOnMutateResult = unknown,
>(
  options: UseMutationOptions<
    string,
    TError,
    { text: string; signal?: AbortSignal },
    TOnMutateResult
  > &
    Required<
      Pick<
        UseMutationOptions<
          string,
          TError,
          { text: string; signal?: AbortSignal },
          TOnMutateResult
        >,
        "mutationFn"
      >
    >,
) => {
  const tiptapRef = React.useRef<{ editor: Editor }>(null);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const mutation = useMutation<
    string,
    TError,
    { text: string; signal?: AbortSignal },
    TOnMutateResult
  >({
    ...options,
    mutationFn: ({ text }, context) => {
      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      return options.mutationFn(
        { text, signal: abortController.signal },
        context,
      );
    },
    onError: (err, variables, onMutateResult, context) => {
      options.onError?.(err, variables, onMutateResult, context);

      if (err instanceof HttpError) {
        if (err.code === "REQUEST_ABORTED") return;

        return toast.error("Error", {
          description: err.message,
        });
      }

      toast.error(
        "Terjadi kesalahan, Silahkan periksa koneksi internet anda dan coba lagi nanti",
      );
    },
    onSettled: () => (abortControllerRef.current = null),
    retry: false,
  });

  React.useEffect(() => {
    if (!mutation.isSuccess) return;

    const timer = setTimeout(() => mutation.reset(), 2000);

    return () => clearTimeout(timer);
  }, [mutation.isSuccess]);

  const handleOnCancle = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return {
    ...mutation,
    tiptapRef,
    handleOnCancle,
  };
};
