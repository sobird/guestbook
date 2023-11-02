/**
 * CommonService
 *
 * sobird<i@sobird.me> at 2023/10/27 11:54:08 created.
 */

import http from '@/lib/axios';

const CommonService = {
  async captcha(email: string) {
    return http.post('/captcha', { email }).then(res => {
      // message.success(`【验证码】已发送到您的注册邮箱。工作人员不会向您索要，请勿向任何人泄露，以免造成账户或资金损失。`, 5);
      return res;
    });
  }
};

export default CommonService;
