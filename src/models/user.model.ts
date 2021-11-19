/**
 * user.model.ts
 *
 * sobird<i@sobird.me> at 2021/11/16 20:30:51 created.
 */

import { randomBytes, createHmac } from "crypto";
import {
  Sequelize,
  DataTypes as DT,
  Model,
  Optional,
  fn,
  ValidationError,
} from "sequelize";

// These are all the attributes in the User model
export interface UserAttributes {
  id?: number;
  username: string;
  nickname?: string | null;
  realname?: string | null;
  email: string;
  password: string;
  salt: string;
  ip: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "nickname" | "realname" | "salt"> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  public username!: string;
  public salt!: string;
  public password!: string;
  public ip!: any;

  /**
   * 通过安全散列算法生成一个64位长度的hash串
   *
   * @param password 原始密码
   * @param salt 盐
   * @return 返回一个64位长度的Hash字符串
   */
  public static passwordHash(password: string, salt: string): string {
    return createHmac("sha256", salt).update(password).digest("hex");
  }

  /**
   * 通过用户名和密码进行用户认证
   *
   * @param username
   * @param password
   */
  public static async identify(username: string, password: string) {
    if (!username || !password) {
      await Promise.reject("username or password cannot be empty!");
    }

    const user = await this.findOne({
      where: { username },
    });

    if (!user) {
      await Promise.reject("user not found!");
    }

    const password_hash = this.passwordHash(password, user.salt);

    if (password_hash === user.password) {
      return user;
    } else {
      await Promise.reject("username or password not correct");
    }
  }
}

export default function (sequelize: Sequelize, DataTypes: typeof DT) {
  User.init(
    {
      username: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: "user name",
      },
      nickname: {
        type: DataTypes.STRING(32),
        allowNull: true,
        comment: "nick name",
      },
      realname: {
        type: DataTypes.STRING(32),
        allowNull: true,
        comment: "real name",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "user email",
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
        comment: "user password hash",
      },
      salt: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: randomBytes(16).toString("hex"),
        comment: "user salt",
      },
      ip: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "user last login ip",
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  User.beforeCreate((model, options) => {
    model.password = User.passwordHash(model.password, model.salt);
    model.ip = fn("INET_ATON", model.ip); // INET_NTOA
  });

  return User;
}
