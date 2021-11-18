/**
 * user.model.ts
 *
 * sobird<i@sobird.me> at 2021/11/16 20:30:51 created.
 */

import {
  Sequelize,
  DataTypes as DT,
  Model,
  Optional,
} from "sequelize";

import {randomBytes}  from 'crypto';

// These are all the attributes in the User model
interface UserAttributes {
  id?: number;
  username: string;
  nickname?: string | null;
  realname?: string | null;
  email: string;
  password: string;
  salt: string;
  ip: number;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "nickname" | "realname" | "salt"> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  public username!: string;
  public salt!: string;

  public static test() {
    console.log(`this`, this.beforeCreate);
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
        defaultValue: randomBytes(16).toString('hex'),
        comment: "user salt",
      },
      ip: {
        type: DataTypes.TINYINT,
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

  User.beforeCreate( (model, options) => {
    // console.log(`model`, model)
  });

  return User;
}
