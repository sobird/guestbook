/**
 * JSON Web Token
 *
 * sobird<i@sobird.me> at 2021/11/15 15:25:21 created.
 */

import { SignJWT, jwtVerify, JWTPayload, JWTVerifyOptions } from "jose";
import { nanoid } from "nanoid";

const JWT_SECRET_KEY = "JWT_SECRET_KEY";

const jwt = new SignJWT({
  iss: "12", // JWT Issuer: 签发人
  exp: 123, // JWT Expiration Time: 过期时间
  sub: "", // JWT Subject: 主题
  aud: "", // JWT Audience: 受众
  nbf: 123, // JWT Not Before: 生效时间
  iat: 123, // JWT Issued At: 签发时间
  jti: "string", // JWT ID: 编号
} as JWTPayload)
  // Sets the JWS Protected Header on the SignJWT object.
  .setProtectedHeader({ alg: "HS256" })
  .setIssuer("urn:example:issuer")
  .setExpirationTime("2h")
  .setSubject("")
  .setAudience("urn:example:audience")
  //.setNotBefore("2h")
  .setIssuedAt()
  .setJti(nanoid())
  // Signs and returns the JWT.
  .sign(new TextEncoder().encode(JWT_SECRET_KEY));

jwt.then(async (token) => {
  const verified = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET_KEY), {
    issuer: 'urn:example:issuer',
    audience: 'urn:example:audience',
  } as JWTVerifyOptions)
});




