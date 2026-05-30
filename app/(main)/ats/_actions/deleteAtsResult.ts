"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { refresh } from "next/cache";
import { headers } from "next/headers";

export async function deleteAtsResult(atsResultId: string) {
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

    await prisma.atsResult.delete({
      where: { id: atsResultId },
    });

    refresh();

    return {
      success: true,
      code: "SUCCESS",
      message: "Cover letter was created successfully",
      body: null,
    };
  } catch (err) {
    return {
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong.",
      body: false,
    };
  }
}
