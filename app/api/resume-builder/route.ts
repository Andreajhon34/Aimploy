import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const body = await req.json();

  // const model = genAI.getGenerativeModel({ 
  //   model: "gemini-2.0-flash",
  //   generationConfig: { responseMimeType: "application/json" }
  // });

  // const prompt = `
  //   Anda adalah pakar HR profesional. Ubah data mentah berikut menjadi konten resume yang sangat profesional, menarik, dan berorientasi pada pencapaian.
    
  //   Data Mentah:
  //   - Ringkasan: ${describeInput}
  //   - Edukasi: ${educationInput}
  //   - Pengalaman: ${experienceInput}
  //   - Skill: ${skillsInput}

  //   Kembalikan respon dalam format JSON dengan struktur seperti ini:
  //   {
  //     "summary": "Hasil olahan profesional",
  //     "education": "Hasil olahan profesional",
  //     "experience": ["Poin 1", "Poin 2"],
  //     "skills": ["Skill 1", "Skill 2"]
  //   }
  // `;

  try {
    // const result = await model.generateContent(prompt);
    // const responseText = result.response.text();
    return NextResponse.json({
      success: true,
      data: body
    });
  } catch(error) {
    console.error(error);
    return NextResponse.json(
        { 
            error: "Gagal memproses AI", 
            stack: process.env.NODE_ENV === "development" ? error : undefined 
        }, { status: 500 }
    );
  }
}