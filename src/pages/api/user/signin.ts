/**
 * 用户登录接口
 *
 * sobird<i@sobird.me> at 2021/11/19 13:23:49 created.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { SignJWT, jwtVerify } from 'jose';
import { serialize, CookieSerializeOptions } from 'cookie';
import restful from '@/lib/restful';

import { UserModel } from '@/models';

export const TOKEN_COOKIE_NAME = 'token';
export const JWT_SECRET_KEY = 'jwt_secret_key';

async function createToken(params: any) {
  return await new SignJWT(params)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));
}

const cookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options: CookieSerializeOptions = {
    maxAge: 60 * 60 * 24 * 7 * 1000,
  }
) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader('set-cookie', serialize(name, String(stringValue), options));
};


export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { username, password },
  } = req;

  try {
    const user = await UserModel.signin({ username, password });

    return user;
  } catch(err) {
    throw {
      code: -1,
      message: err
    };
  }



  // const token = await createToken({
  //   username: user.username,
  // });

  // cookie(res, 'token', token, {
  //   httpOnly: true,
  //   maxAge: 60 * 60 * 24 * 7 * 1000,
  //   path: '/',
  // });

  // return {
  //   username: user.username,
  //   token,
  // };
};

export default restful({
  POST,
});