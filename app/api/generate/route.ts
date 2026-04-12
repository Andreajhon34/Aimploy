import { GoogleGenAI, ApiError } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = JSON.stringify(body);

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return NextResponse.json({
      success: true,
      data: {
        responseText: response.text,
      },
    });
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      const allowedStatus = [429, 500, 503, 504];

      try {
        const error = JSON.parse(err.message)["error"];

        if (allowedStatus.includes(err.status)) {
          return NextResponse.json({
            success: false,
            code: error["status"],
            message: error["message"],
          });
        }
      } catch (err: unknown) {
        console.error("Unexpected Error:", err);
        return NextResponse.json(
          {
            success: false,
            code: "Internal server error",
            message: "internal server error, please try again later",
            stack: process.env.NODE_ENV === "development" ? err : undefined,
          },
          { status: 500 },
        );
      }
    }

    console.error("Unexpected Error:", err);
    return NextResponse.json(
      {
        success: false,
        code: "Internal server error",
        message: "internal server error, please try again later",
        stack: process.env.NODE_ENV === "development" ? err : undefined,
      },
      { status: 500 },
    );
  }
}
