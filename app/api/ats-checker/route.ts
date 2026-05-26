import { ai } from "@/lib/gemini";
import { NextResponse } from "next/server";

export default async function POST(req: Request) {
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
}
