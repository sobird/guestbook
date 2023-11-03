/**
 * CommonService
 *
 * sobird<i@sobird.me> at 2023/10/27 11:54:08 created.
 */

import http from '@/lib/axios';

const CommonService = {
  async sendCaptcha(email: string) {
    return http.get('/api/common/captcha', { email });
  },
  async verifyCaptcha(data) {
    return http.post('/api/common/captcha', data);
  }
};

export default CommonService;
