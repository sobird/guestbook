/**
 * 用户登录权限认证
 *
 * sobird<i@sobird.me> at 2023/11/04 2:02:03 created.
 */

import { type GetServerSidePropsContext } from 'next';
import { verify } from '@/lib/jwt';
import { type UserAttributes} from '@/models/user'
import { UserModel } from '@/models';


export const userAuth = async (req: GetServerSidePropsContext['req'], res: GetServerSidePropsContext['res']): Promise<Omit<UserAttributes, "password" | "salt"> | undefined | null> => {
  const token = req?.cookies['token'];

  if(!token) {
    return null;
  }

  try {
    const { payload }  = await verify(token);

    const user = await UserModel.findOne({
      where: {
        username: payload.username
      },
      attributes: {
        exclude: ["password", "salt"]
      },
      raw: true
    })
    return user;
  } catch (err) {
    return null;
  }
};

const withUserAuth = handler => {
  return async (req, res) => {
    return handler(req, res);
  };
};

export default withUserAuth;
