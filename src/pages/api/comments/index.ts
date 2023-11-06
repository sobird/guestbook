import { NextApiHandler } from 'next';
import { getClientIp } from 'request-ip';
import restful from '@/lib/restful';
import { CommentModel, default as comments } from '@/models';
import { use, AppMiddleware } from '@/lib/middleware';
import { userAuth } from '@/middleware/withUserAuth';

/**
 * 获取评论列表接口
 *
 * @param req
 * @param res
 */
export const GET: NextApiHandler = async (req, res) => {
  const { query: { pn, ps } } = req;
  return CommentModel.findAllWithPagination({ pn, ps });
};

/**
 * 创建评论
 *
 * @param req
 * @param res
 */
export const POST: NextApiHandler = async (req, res) => {
  const { body, headers } = req;
  const userInfo = await userAuth(req, res);
  if (!userInfo) {
    throw {
      code: -1,
      message: "没有权限"
    };
  }
  
  const agent = headers['user-agent'];
  const ip = getClientIp(req);

  body.agent = agent;
  body.ip = ip;

  return CommentModel.create({
    ...body,
    content: body.content,
    author: userInfo.username,
    email: userInfo.email,
    userId: userInfo.id
  });
};

export default restful({
  GET: use(
    async (req, res, next) => {
      console.log('middleware1-before');
      next();
      console.log('middleware1-after');
    },
    async (req, res, next) => {
      console.log('middleware2-before');
      next();
      console.log('middleware2-after');
    },
    GET
  ),

  POST,
});
