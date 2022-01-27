/**
 * API 路由可以通过在括号内添加三个点 (...) 来扩展以捕获所有路径
 *
 * sobird<i@sobird.me> at 2021/11/12 19:48:18 created.
 */

import { NextApiRequest, NextApiResponse } from "next";
import rest from "@/lib/rest";
import { Comment } from "@/models";

// 查询评论详情
module.exports.get = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const comment = await Comment.findByPk(id as unknown as number);

  res.json({ comment });
};

// 删除评论
module.exports.delete = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const comment = await Comment.destroy({
    where: {
      id,
    }
  });

  res.json({ comment });
}

// 更新评论
module.exports.patch = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body,
    headers,
    query: { id },
  } = req;

  const comment = await Comment.update(body, {
    where: {
      id,
    }
  });

  res.json({ comment });
} 


export default rest.bind(module.exports);