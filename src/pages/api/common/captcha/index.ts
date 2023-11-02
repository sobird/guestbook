import { NextApiHandler } from 'next';
import restful from '@/lib/restful';
import { sendMail } from '@/lib/nodemailer';
import { generate, verify } from '@/lib/2fa';

export const GET: NextApiHandler = async (req, res) => {
  const InitalizationKey = 'ORSXG5AORSXG5AORSXG5A';
  // One-Time Password
  const otp = generate(InitalizationKey);
  const result = verify(InitalizationKey, otp);

  console.log('result', result);

  return 123;
};

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
  GET,
  POST,
});
