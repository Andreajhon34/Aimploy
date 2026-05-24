export type ResponseBody<T = null> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};
