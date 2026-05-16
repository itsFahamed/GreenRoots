"use client";
import { createAuthClient } from "better-auth/react";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

export const authClient = createAuthClient({
  baseURL: baseUrl,
});

export const { useSession, signIn, signOut, signUp } = authClient;
