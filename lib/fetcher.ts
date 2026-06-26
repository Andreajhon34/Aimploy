import { HttpError } from "./HttpError";

type FetcherOptions = RequestInit & {
  timeout?: number;
};

type InputType = string | Request | URL;

async function fetcherBase<T>(
  input: InputType,
  options: FetcherOptions = {},
): Promise<T> {
  const { timeout = 0, headers, ...init } = options;

  const signals: AbortSignal[] = [];

  if (init.signal) signals.push(init.signal);

  if (timeout > 0) {
    signals.push(AbortSignal.timeout(timeout));
  }

  try {
    const res = await fetch(input, {
      signal: AbortSignal.any(signals),
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
  } catch (err) {
    if (err instanceof DOMException && err.name === "TimeoutError") {
      throw new HttpError(
        408,
        "Permintaan terlalu lama untuk diselesaikan",
        "REQUEST_TIMEOUT",
      );
    }

    if (err instanceof DOMException && err.name === "AbortError") {
      throw new HttpError(
        499,
        "Permintaan dibatalkan oleh klien",
        "REQUEST_ABORTED",
      );
    }

    throw err;
  }
}

async function fetcherPost<T>(input: InputType, options: FetcherOptions) {
  return fetcherBase<T>(input, { ...options, method: "POST" });
}

export const fetcher = Object.assign(fetcherBase, {
  post: fetcherPost,
});
