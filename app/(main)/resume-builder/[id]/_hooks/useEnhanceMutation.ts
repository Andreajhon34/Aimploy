"use client";

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
    onError: (err) => {
      if (err instanceof HttpError) {
        return toast.error("Terjadi kesalahan saat mengirim prompt", {
          description: err.message,
        });
      }

      if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
        return toast.error("Kamu sedang tidak terhubung ke internet", {
          description: "Silahkan coba lagi nanti",
        });
      }

      if (err.name === "AbortError") {
        return toast.error("Waktu timeout telah tercapai", {
          description: "Silahkan coba lagi nanti",
        });
      }

      toast.error("Sepertinya ada yang salah", {
        description: "Silahkan coba lagi nanti",
      });
    },
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
