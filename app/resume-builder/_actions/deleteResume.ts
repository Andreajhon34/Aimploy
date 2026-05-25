"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { refresh } from "next/cache";
import { headers } from "next/headers";

export const deleteResume = async (resumeId: string) => {
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

  try {
    await prisma.resume.delete({
      where: { userId: session.user.id, id: resumeId },
    });

    refresh();

    return {
      success: true,
      code: "SUCCESS",
      message: "Resume was deleted successfully",
      body: null,
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
