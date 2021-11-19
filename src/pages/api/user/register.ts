/**
 * 用户注册
 *
 * sobird<i@sobird.me> at 2021/11/17 18:46:25 created.
 */

import { NextApiRequest, NextApiResponse } from "next";
import rest from "@/lib/rest";
import { User } from "@/models";

module.exports.post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password, email } = req.body;

  const user = await User.create(
    {
      username,
      password,
      email,
      ip: '0',
    },
    {
      //fields: ['username', 'password', 'email']
    }
  );

  res.json({
    code: 0,
    message: "",
    data: user,
  });
};

export default rest.bind(module.exports);
