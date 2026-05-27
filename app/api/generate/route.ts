import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { ApiError } from "@google/genai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = JSON.stringify(body);

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return NextResponse.json(
      {
        success: true,
        code: "SUCCESS",
        message: "Prompt was successfull",
        data: response.text,
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof ApiError) {
      const allowedStatus = [429, 500, 503, 504];
      try {
        const error = JSON.parse(err.message)["error"];

        if (allowedStatus.includes(err.status)) {
          return NextResponse.json(
            {
              success: false,
              code: error["status"],
              message: error["message"],
              data: null,
            },
            { status: 500 },
          );
        }
      } catch (err) {
        console.error("Unexpected Error:", err);
        return NextResponse.json(
          {
            success: false,
            code: "Internal server error",
            message: "internal server error, please try again later",
            data: null,
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
        data: null,
      },
      { status: 500 },
    );
  }
}
