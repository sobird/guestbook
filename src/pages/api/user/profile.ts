/**
 * 用户信息
 * 
 * sobird<i@sobird.me> at 2023/11/04 20:26:54 created.
 */


import { NextApiRequest, NextApiResponse } from 'next';
import restful from '@/lib/restful';
import { userAuth } from '@/middleware/withUserAuth';
import { UserModel } from '@/models';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await userAuth(req, res);

  if (!user) {
    throw {
      code: -1,
      message: "用户未登录"
    };
  }

  return user;
};

// 更新用户信息
export const PATCH = async (req: NextApiRequest, res: NextApiResponse) => {
  const userInfo = await userAuth(req, res);
  const {body} = req

  if (!userInfo) {
    throw {
      code: -1,
      message: "用户没有更新权限"
    };
  }

  try {
    const [affectedCount] = await UserModel.update(body, {
      where: {
        username: userInfo.username
      },
      fields: ['nickname', 'realname']
    });

    return {};

  } catch(err) {
    return {
      code: -1,
      message: "更新用户信息失败"
    }
  }
};

export default restful({
  GET,
  PATCH
});

