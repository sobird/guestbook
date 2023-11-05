import { NextApiHandler } from 'next';
import restful from '@/lib/restful';
import { sendMail } from '@/lib/nodemailer';
import { generate, verify } from '@/lib/2fa';
import { isEmail } from '@/lib/validator';
import { UserModel } from '@/models';
import rateLimit from '@/utils/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export const GET: NextApiHandler = async (req, res) => {
  const { query } = req;
  const email = query?.email as string;

  if (!isEmail(email)) {
    throw new Error('邮箱不正确');
  }

  const user = await UserModel.findOne({
    where: {
      email
    }
  });

  if(user) {
    throw {
      code: -1,
      message: "该邮箱已被注册"
    }
  }

  try {
    await limiter.check(res, 10, 'CACHE_TOKEN'); // 10 requests per minute
    // One-Time Password
    const otp = generate(email);
    return await sendMail(email, '【Sobird】请在5分钟内验证您的邮箱', otp);
  } catch(err) {
    res.status(429).json({ error: 'Rate limit exceeded' });
  }
};

/**
 * 发送邮箱验证码
 *
 * @param req
 * @param res
 */
export const POST: NextApiHandler = async (req, res) => {
  const {
    body: { email, code },
  } = req;
  if (!isEmail(email)) {
    throw new Error('邮箱不正确');
  }

  if (!verify(email, code)) {
    throw new Error('验证码不正确或失效');
  }
  // 注册成功

  try {
    await UserModel.create({
      username: email,
      password: email,
      email,
    } as any);
  } catch (e) {
    res.json({
      code: -1,
      message: '注册用户失败',
    });
  }
};

export default restful({
  GET,
  POST,
});
