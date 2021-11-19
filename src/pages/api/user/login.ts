/**
 * 用户登录接口
 *
 * sobird<i@sobird.me> at 2021/11/19 13:23:49 created.
 */

import { NextApiRequest, NextApiResponse } from "next";
import rest from "@/lib/rest";

import { User } from "@/models";

User.identify("sobird", "123456");

module.exports.post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  await User.identify(username, password).catch(result => {
    res.json({
      message: result
    })
  });

 

  

  res.json({
    code: 0,
    message: "",
    data: "",
  });
};

export default rest.bind(module.exports);
