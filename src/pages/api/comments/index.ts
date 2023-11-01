import { NextApiHandler } from "next";
import { getClientIp } from "request-ip";
import rest from "@/lib/restful";
import { Comment } from "@/models";
import { compose, use, AppMiddleware } from '@/lib/middleware';

/**
 * 获取评论列表接口
 *
 * @param req
 * @param res
 */
export const GET: AppMiddleware = async (req, res) => {
  const { query } = req;

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
export const POST: NextApiHandler = async (req, res) => {
  const { body, headers } = req;
  const agent = headers["user-agent"];
  const ip = getClientIp(req);

  body.agent = agent;
  body.ip = ip;

  return Comment.create(body);
};

export default rest({
  GET: use(async (req, res, next) => {
    console.log('middleware1-before')
    next();
    console.log('middleware1-after')
  }, async (req, res, next) => {
    console.log('middleware2-before')
    next();
    console.log('middleware2-after')
  }, GET),
  POST,
});
