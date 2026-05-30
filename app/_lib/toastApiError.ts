import { HttpError } from "@/lib/HttpError";
import React from "react";
import { toast } from "sonner";

export function toastApiError(
  err: unknown,
  abortControllerRef?: React.RefObject<AbortController | null>,
) {
  if (err instanceof HttpError) {
    return toast.error("Terjadi kesalahan saat mengirim prompt", {
      description: err.message,
    });
  }

  if (err instanceof TypeError && !navigator.onLine) {
    return toast.error("Kamu sedang tidak terhubung ke internet", {
      description: "Silahkan coba lagi nanti",
    });
  }

  /// AbortController with reason throws the reason value directly
  if (
    (err instanceof Error && err.name === "AbortError") ||
    err === "user" ||
    err === "timeout"
  ) {
    if (
      (err instanceof Error && err.name === "AbortError") ||
      err === "timeout"
    ) {
      toast.error("Waktu timeout telah tercapai", {
        description: "Silahkan coba lagi nanti",
      });
    }

    if (abortControllerRef && abortControllerRef.current) {
      abortControllerRef.current = null;
    }
    return;
  }

  if (err instanceof Error) {
    return toast.error(err.message);
  }

  toast.error("Sepertinya ada yang salah", {
    description: "Silahkan coba lagi nanti",
  });
}
