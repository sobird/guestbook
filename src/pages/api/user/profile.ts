/**
 * 用户信息
 * 
 * sobird<i@sobird.me> at 2023/11/04 20:26:54 created.
 */


import { NextApiRequest, NextApiResponse } from 'next';
import restful from '@/lib/restful';
import { sign, TOKEN_COOKIE_NAME } from '@/lib/jwt';
import { UserModel } from '@/models';
import { setCookie } from '@/utils/cookies';
import { userAuth } from '@/middleware/withUserAuth';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await userAuth(req, res);

  if (!user) {
    return {
      code: -1,
      message: "用户未登录"
    };
  }

  return user;
};

export default restful({
  GET,
});

