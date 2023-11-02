/**
 * API 路由可以通过在括号内添加三个点 (...) 来扩展以捕获所有路径
 *
 * sobird<i@sobird.me> at 2021/11/12 19:48:18 created.
 */

import { NextApiRequest, NextApiResponse } from "next";
import rest from "@/lib/restful";
import Comment from "@/models/comment";

// 查询评论详情
module.exports.get = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  return Comment.findByPk(id as unknown as number);
};

// 删除评论
module.exports.delete = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  return Comment.destroy({
    where: {
      id,
    }
  });
}

// 更新评论
module.exports.patch = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body,
    headers,
    query: { id },
  } = req;

  return Comment.update(body, {
    where: {
      id,
    }
  });
} 


export default rest.bind(module.exports);