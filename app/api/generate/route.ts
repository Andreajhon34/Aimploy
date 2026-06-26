import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { ApiError } from "@google/genai";
import { z } from "zod";

const requestBodySchema = z.object({
  prompt: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const zodResult = requestBodySchema.safeParse(body);

    if (!zodResult.success) {
      return NextResponse.json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "The providate data was invalid",
        error: zodResult.error.flatten(),
      });
    }

    const { prompt } = zodResult.data;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { abortSignal: req.signal },
    });

    return NextResponse.json(
      {
        success: true,
        code: "SUCCESS",
        message: "Content generated successfully.",
        data: response.text,
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof ApiError) {
      try {
        const parsedError = JSON.parse(err.message);
        const { status, message, code } = parsedError["error"];
        const allowedStatus: readonly number[] = [429, 404];

        if (allowedStatus.includes(err.status)) {
          return NextResponse.json(
            {
              success: false,
              code: status,
              message: message,
              error: null,
            },
            { status: code },
          );
        }
      } catch {
        console.warn(
          "[Route Handler POST /generate] ApiError.message no longer returns a parsable JSON object:",
          err,
        );
      }
    } else if (err instanceof DOMException && err.name === "AbortError") {
      return NextResponse.json(
        {
          success: false,
          code: "REQUEST_ABORTED",
          message: "Request was aborted by the client.",
          error: null,
        },
        { status: 499 },
      );
    }

    console.error("[Route Handler POST /generate]:", err);
    return NextResponse.json(
      {
        success: false,
        code: "INTERNAL_SERVER_ERROR",
        message: "internal server error, please try again later",
        error: null,
      },
      { status: 500 },
    );
  }
}
