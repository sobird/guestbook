/**
 * user.model.ts
 *
 * sobird<i@sobird.me> at 2021/11/16 20:30:51 created.
 */

import { Sequelize, DataTypes as DT, Model } from "sequelize";

// These are all the attributes in the User model
interface UserAttrs {
  id: number;
  username: string;
  nickname: string | null;
  realname: string | null;
  email: string;
  password: string;
  salt: string;
  lastLoginDate: Date
  ip: number
}

export default function (sequelize: Sequelize, DataTypes: typeof DT) {
  class User extends Model {
    username;
    test() {
      console.log(`this.username`, this.username)
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: "user name123",
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
        comment: "user salt",
      },
      lastLoginDate: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "last login date",
      },
      ip: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        comment: "user last request ip",
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  return User;
}
