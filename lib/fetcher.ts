import { HttpError } from "./HttpError";

type FetcherOptions = RequestInit & {
  timeout?: number;
};

export async function fetcher<T>(
  input: string | Request | URL,
  options: FetcherOptions = {},
): Promise<T> {
  const { timeout = 10_000, headers, ...init } = options;

  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const res = await fetch(input, {
      signal: controller.signal,
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new HttpError(
        res.status,
        data?.message ?? "Something went wrong",
        data?.code,
      );
    }

    return data;
  } finally {
    clearTimeout(timeoutId);
  }
}
