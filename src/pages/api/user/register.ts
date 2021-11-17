/**
 * 用户注册
 *
 * sobird<i@sobird.me> at 2021/11/17 18:46:25 created.
 */

import { NextApiRequest, NextApiResponse } from "next";
import rest from "@/lib/rest";
import { User } from "@/models";

module.exports.POST = (req: NextApiRequest, res: NextApiResponse) => {
  res.json({
    code: 0,
    message: "",
  });
};

export default rest.bind(module.exports);
