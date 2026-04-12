"use client";

import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

const pubApi = axios.create({
  baseURL: "/api",
});

pubApi.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!isAxiosError(error)) return Promise.reject(error);

    if (!error.response) {
      if (error.code === "ERR_NETWORK") {
        toast.error(
          "Tidak dapat terhubung ke server. Pastikan koneksi internetmu stabil.",
        );
      } else if (error.code === "ECONNABORTED") {
        toast.error(
          "Koneksi terputus karena server terlalu lama merespons (Timeout).",
        );
      } else {
        toast.error("Terjadi kesalahan jaringan yang tidak diketahui.");
      }
      return Promise.reject(error);
    }

    const status = error.response.status;

    switch (status) {
      case 404:
        toast.error("Endpoint tidak ditemukan.");
        break;
      case 429:
        toast.error(
          "Terlalu banyak permintaan. Mohon coba lagi dalam beberapa menit.",
        );
        break;
      case 500:
      case 502:
      case 503:
        toast.error("Terjadi masalah pada server.");
        console.error("Backend Error Fatal:", error.response.data);
        break;
      default:
        break;
    }

    return Promise.reject(error);
  },
);

export { pubApi };
