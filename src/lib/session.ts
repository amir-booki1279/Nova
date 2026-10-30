

import "server-only";

import { SignJWT, jwtVerify } from "jose";

const secret = process.env.SESSION_SECRET;

if (!secret) {
  throw new Error("SESSION_SECRET is not configured");
}

const secretKey = new TextEncoder().encode(secret);

export type SessionPayload = {
  userId: string;
  role: "USER" | "ADMIN";
};

export async function createSession(payload: SessionPayload) {
  return new SignJWT({
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    if (
      typeof payload.sub !== "string" ||
      (payload.role !== "USER" && payload.role !== "ADMIN")
    ) {
      return null;
    }

    return {
      userId: payload.sub,
      role: payload.role,
    } satisfies SessionPayload;
  } catch {
    return null;
  }
}
