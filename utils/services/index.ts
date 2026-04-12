import { pubApi } from "@/lib/axios";

type ResponseData<Data = unknown> = {
  success: boolean;
  data: Data;
};

const generateApi = async <Data = unknown>(data: unknown) => {
  const response = await pubApi.post<ResponseData<Data>>("/generate", data);
  return response.data;
};

export { generateApi };
