import nodemailer from 'nodemailer';

// 创建发送邮件的对象
const transporter = nodemailer.createTransport({
  // host: 'smtp.qq.com',
  // port: 465,
  service: 'qq',
  secure: true,
  auth: {
    user: process.env.AUTHMAIL,
    pass: process.env.AUTHCODE,
  },
});

export function sendMail(mail: string, subject: string, code: number | string) {
  // 邮件信息
  let mailobj = {
    from: '"sobird" <i@sobird.me>', // sender address
    to: mail, // 接收者邮箱 可以是多个 以,号隔开
    subject, // Subject line
    // 发送text或者html格式
    text: `验证码：${code}`,
    // html:`<h1>xxxx</h1>`
  };

  return new Promise((reslove, reject) => {
    transporter.sendMail(mailobj, (err, data) => {
      if (err) {
        reject(err);
      } else {
        reslove(data);
      }
    });
  });
}
