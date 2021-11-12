/**
 * API 路由可以通过在括号内添加三个点 (...) 来扩展以捕获所有路径
 *
 * sobird<i@sobird.me> at 2021/11/12 19:48:18 created.
 */

import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { slug },
  } = req;

  console.log(`slug`, slug)

  res.status(200).json({ slug });
};
