/**
 * API 路由可以通过在括号内添加三个点 (...) 来扩展以捕获所有路径
 *
 * sobird<i@sobird.me> at 2021/11/12 19:48:18 created.
 */

import { NextApiRequest, NextApiResponse } from "next";
import restful from "@/lib/restful";
import { CommentModel } from "@/models";

// 查询评论详情
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  return CommentModel.findByPk(id as unknown as number);
};

// 删除评论
export const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  return CommentModel.destroy({
    where: {
      id,
    }
  });
}

// 更新评论
export const PATCH = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body,
    query: { id },
  } = req;

  return CommentModel.update(body, {
    where: {
      id,
    }
  });
} 


export default restful({
  GET
});