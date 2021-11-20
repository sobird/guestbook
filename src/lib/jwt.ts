import { SignJWT, jwtVerify } from "jose";

export const TOKEN_COOKIE_NAME = "token";
export const JWT_SECRET_KEY = "jwt_secret_key";

export default async function (params: any) {
  return await new SignJWT(params)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));
}

