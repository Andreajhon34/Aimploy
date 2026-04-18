"use server"

/**
 *  Auth with actions, might never be used
 */

import { auth } from "@/lib/auth";
import { isAPIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signupAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
        }
    });

    redirect('/');
}

export async function signInAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signInEmail({
        body: {
            email,
            password
        }
    });

    redirect('/');
}

export async function signOutAction() {
    await auth.api.signOut({
        headers: await headers()
    });

    redirect('/');
}

