import { NextApiRequest, NextApiResponse } from "next";
import rest from "@/lib/rest";

import { Comment } from "@/models";

module.exports.get = async (req: NextApiRequest, res: NextApiResponse) => {
  const comments = await Comment.findAll().catch((error) => {
    res.json({
      message: error.message,
    });
  });

  res.json({
    code: 0,
    message: "ok",
    data: comments,
  });
};

// 创建评论
module.exports.post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  const comment = await Comment.create(body).catch(error => {
    res.json({
      message: error.message
    });
  })

  res.json({
    code: 0,
    message: "ok",
    data: {},
  });
};

export default rest.bind(module.exports);
