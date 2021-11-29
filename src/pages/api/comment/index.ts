import { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "request-ip";
import rest from "@/lib/rest";

import { Comment } from "@/models";

module.exports.get = async (req: NextApiRequest, res: NextApiResponse) => {
  const comments = await Comment.findAll().catch((error) => {
    res.json({
      message: error.message,
    });
  });

  console.log(`comment`, comments[0].toJSON())

  res.json({
    code: 0,
    message: "ok",
    data: comments[0].toJSON(),
  });
};

// 创建评论
module.exports.post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, headers } = req;
  const agent = headers["user-agent"];
  const ip = getClientIp(req);

  body.agent = agent;
  body.ip = ip;

  const comment = await Comment.create(body).catch((error) => {
    res.json({
      message: error.message,
    });
  });

  res.json({
    code: 0,
    message: "ok",
    data: comment,
  });
};

export default rest.bind(module.exports);
