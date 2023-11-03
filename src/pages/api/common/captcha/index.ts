
import { NextApiHandler } from 'next';
import restful from '@/lib/restful';
import { sendMail } from '@/lib/nodemailer';
import { generate, verify } from '@/lib/2fa';
import { isEmail } from '@/lib/validator';

export const GET: NextApiHandler = async (req, res) => {
  const {query} = req
  const email = query?.email as string;

  if(!isEmail(email)) {
    throw new Error('邮箱不正确')
  }

  // One-Time Password
  const otp = generate(email);

  return await sendMail(email, '【Sobird】请在5分钟内验证您的邮箱', otp);
};

/**
 * 发送邮箱验证码
 *
 * @param req
 * @param res
 */
export const POST: NextApiHandler = async (req, res) => {
  const { body } = req;
  if(!verify(body.email, body.code)) {
    throw new Error('验证码不正确或失效')
  }
};

export default restful({
  GET,
  POST,
});
