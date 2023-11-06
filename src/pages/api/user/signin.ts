/**
 * 用户登录接口
 *
 * sobird<i@sobird.me> at 2021/11/19 13:23:49 created.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import restful from '@/lib/restful';
import { sign, TOKEN_COOKIE_NAME } from '@/lib/jwt';
import { UserModel } from '@/models';
import { setCookie } from '@/utils/cookies';

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { username, password },
  } = req;

  try {
    const user = await UserModel.signin({ username, password });

    // sign jwt
    const token = await sign(user);

    setCookie(res, TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30
    });

    return user;
  } catch (err) {
    throw {
      code: -1,
      message: err,
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
