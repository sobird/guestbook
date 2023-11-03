/**
 * API: 用户注册
 *
 * sobird<i@sobird.me> at 2021/11/17 18:46:25 created.
 */

import { NextApiRequest, NextApiResponse } from "next";
import restful from "@/lib/restful";
import { UserModel } from "@/models";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password, email } = req.body;

  const [user, created] = await UserModel.signup({
    username,
    password,
    email
  });

  if(!created) {
    throw {
      message: '用户已存在'
    }
  }

  return user;
};

export default restful({
  POST,
});
