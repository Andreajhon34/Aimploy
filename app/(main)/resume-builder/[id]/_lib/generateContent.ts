import { fetcher } from "@/lib/fetcher";
import { ResponseBody } from "@/types/responseBody";

const generateContent = async ({
  text,
  signal,
}: {
  text: string;
  signal?: AbortSignal;
}) => {
  const { data } = await fetcher.post<ResponseBody<string>>("/api/generate", {
    body: JSON.stringify({
      prompt: text,
    }),
    signal,
    timeout: 5000,
  });

  return data;
};

export default generateContent;
