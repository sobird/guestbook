import { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "request-ip";
import rest from "@/lib/rest";
import { Comment } from "@/models";

// 获取评论
module.exports.get = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query,
  } = req;

  const pn = Number(query.pn) | 1;
  const ps = Number(query.ps) | 1;
  
  const comments = await Comment.findAndPagination(pn, ps).catch((error) => {
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
