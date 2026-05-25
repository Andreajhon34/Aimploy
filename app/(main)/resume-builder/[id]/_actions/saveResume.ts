"use server";
import { auth } from "@/lib/auth";
import {
  ResumeBuilderSchema,
  resumeBuilderSchema,
} from "@/app/(main)/resume-builder/_schemas/resumeBuilderForm";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const saveResume = async (
  resumeId: string,
  title: string,
  data: ResumeBuilderSchema,
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
    return {
      success: false,
      code: "UNAUTHORIZED",
      message: "Operation is not allowed, please login.",
      body: null,
    };

  const parsed = resumeBuilderSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      code: "VALIDATION_ERROR",
      message: "Data format was incorrect.",
      body: parsed.error.flatten(),
    };
  }

  try {
    const result = await prisma.resume.upsert({
      where: { userId: session.user.id, id: resumeId },
      update: { data, title },
      create: { userId: session.user.id, data, title },
    });

    return {
      success: true,
      code: "SUCCESS",
      message: "Resume was saved successfully",
      body: result,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to save resume.",
      body: null,
    };
  }
};
