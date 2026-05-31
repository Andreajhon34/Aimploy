"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { refresh } from "next/cache";
import { headers } from "next/headers";

export const renameResume = async (resumeId: string, newTitle: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        code: "UNAUTHORIZED",
        message: "Operation is not allowed, Please log in.",
        body: null,
      };
    }

    const resume = await prisma.resume.update({
      where: { userId: session.user.id, id: resumeId },
      data: { title: newTitle },
    });

    refresh();

    return {
      success: true,
      code: "SUCCESS",
      message: "Resume was renamed successfully",
      body: resume,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong.",
      body: null,
    };
  }
};
