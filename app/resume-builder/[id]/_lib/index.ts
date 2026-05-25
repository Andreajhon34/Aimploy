import { fetcher } from "@/lib/fetcher";
import { ResponseBody } from "@/types/responseBody";

export const generateText = async (text: string) => {
  const { data } = await fetcher<ResponseBody<string>>("/api/generate", {
    method: "POST",
    body: JSON.stringify({
      prompt: text,
    }),
    timeout: 15_000,
  });

  return data;
};
