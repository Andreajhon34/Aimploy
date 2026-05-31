"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { refresh } from "next/cache";
import { headers } from "next/headers";

export async function deleteCoverLetter(coverLetterId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        code: "UNAUTHORIZED",
        message: "Operation is not allowed, Please Log in.",
        body: null,
      };
    }

    console.log("CoverLetterId: ", coverLetterId);

    await prisma.coverLetter.delete({
      where: { id: coverLetterId },
    });

    refresh();

    return {
      success: true,
      code: "SUCCESS",
      message: "Cover letter deleted successfully",
      body: null,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong.",
      body: false,
    };
  }
}
