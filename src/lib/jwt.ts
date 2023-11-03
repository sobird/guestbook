import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { nanoid } from 'nanoid';

interface UserPayload {
  username: string;
}

export const TOKEN_COOKIE_NAME = 'token';
export const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * JWTPayload
 *
 * iss, JWT Issuer: 签发人
 * exp, JWT Expiration Time: 过期时间
 * sub, JWT Subject: 主题
 * aud, JWT Audience: 受众
 * nbf, JWT Not Before: 生效时间
 * iat, JWT Issued At: 签发时间
 * jti, JWT ID: 编号
 *
 * @returns Promise<string>
 */
export const sign = async (payload: JWTPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .setJti(nanoid())
    .sign(JWT_SECRET_KEY);
};

export const verify = async (token: string) => {
  return jwtVerify<UserPayload>(token, JWT_SECRET_KEY);
};
