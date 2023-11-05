/**
 * user service
 * 
 * sobird<i@sobird.me> at 2023/11/03 22:09:03 created.
 */

import http from '@/lib/axios';
import { UserModel } from '@/models';
import { UserAttributes } from '@/models/user';

type UserSigninAttributes = Parameters<typeof UserModel.signin>;
type UserSignupAttributes = Parameters<typeof UserModel.signup>;

const UserService = {
  async signin(attributes: UserSignupAttributes) {
    return http.post('/api/user/signin', attributes);
  },
  async signup(attributes: UserSignupAttributes) {
    return http.post('/api/user/signup', attributes);
  },
  async profile() {
    return http.get<UserAttributes>('/api/user/profile');
  },
  async update(attributes: Pick<UserAttributes, 'nickname' | 'realname'>) {
    return http.patch<UserAttributes>('/api/user/profile', attributes);
  },
};

export default UserService;
