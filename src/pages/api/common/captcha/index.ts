import { NextApiHandler } from 'next';
import restful from '@/lib/restful';
import {sendMail} from '@/lib/nodemailer';

/**
 * 发送邮箱验证码
 *
 * @param req
 * @param res
 */
export const POST: NextApiHandler = async (req, res) => {
  const { body } = req;
  return await sendMail(body.email, 123456);
};

export default restful({
  POST,
});
