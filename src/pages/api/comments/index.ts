import { NextApiRequest, NextApiResponse } from "next";
import { ServerResponse } from "http";
import { getClientIp } from "request-ip";
import rest from "@/lib/rest";
import { Comment } from "@/models";

/**
 * 获取评论列表接口
 * 
 * @param req 
 * @param res 
 */
export const get = async (req: NextApiRequest, res: ServerResponse) => {
  const {
    query,
  } = req;

  const pn = Number(query.pn) | 1;
  const ps = Number(query.ps) | 20;
  
  return Comment.findAndPagination(pn, ps);
};

/**
 * 创建评论
 * 
 * @param req 
 * @param res 
 */
export const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, headers } = req;
  const agent = headers["user-agent"];
  const ip = getClientIp(req);

  body.agent = agent;
  body.ip = ip;

  return Comment.create(body);
};

export default rest.bind({
  get,
  post
});
