"use server";

import { auth } from "@/lib/auth";
import { AtsResult } from "../_types/AtsResult";
import { headers } from "next/headers";
import { success } from "better-auth";
import prisma from "@/lib/prisma";
import { refresh } from "next/cache";

export async function saveAtsResult(atsResult: AtsResult, resumeId: string) {
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

    const res = await prisma.atsResult.create({
      data: {
        resumeId,
        userId: session.user.id,
        content: atsResult,
      },
    });

    refresh();

    return {
      success: true,
      code: "SUCCESS",
      message: "ats result created successfully.",
      body: res.content,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
      body: null,
    };
  }
}
