/**
 * 用户登录接口
 *
 * sobird<i@sobird.me> at 2021/11/19 13:23:49 created.
 */

import { NextApiRequest, NextApiResponse } from "next";
import { SignJWT, jwtVerify } from "jose";
import { serialize, CookieSerializeOptions } from "cookie";
import rest from "@/lib/rest";

import { User } from "@/models";

export const TOKEN_COOKIE_NAME = "token";
export const JWT_SECRET_KEY = "jwt_secret_key";

async function createToken(params: any) {
  return await new SignJWT(params)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));
}

const cookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader("set-cookie", serialize(name, String(stringValue), options));
};

module.exports.post = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { username, password },
  } = req;

  const user: any = await User.identify(username, password);

  const token = await createToken({
    username: user.username,
  });

  cookie(res, "token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7 * 1000,
    path: "/",
  });

  return {
    username: user.username,
    token,
  }
};

export default rest.bind(module.exports);
