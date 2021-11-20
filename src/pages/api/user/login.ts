/**
 * 用户登录接口
 *
 * sobird<i@sobird.me> at 2021/11/19 13:23:49 created.
 */

import { NextApiRequest, NextApiResponse } from "next";
import { SignJWT, jwtVerify } from "jose";
import rest from "@/lib/rest";

import { User } from "@/models";

export const TOKEN_COOKIE_NAME = "token";
export const JWT_SECRET_KEY = "jwt_secret_key";

async function createToken (params: any) {
  return await new SignJWT(params)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));
}

module.exports.post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  const user: any = await User.identify(username, password).catch((result) => {
    res.json({
      message: result,
    });
  });

  const token = await createToken({
    username: user.username,
  });

  console.log(`res.cookies`, res.cookie)

  res.setHeader('Set-Cookie',`token=${token}`)

  res.json({
    code: 0,
    message: "success",
    data: {
      username: user.username,
      token,
    },
  });
};

export default rest.bind(module.exports);
