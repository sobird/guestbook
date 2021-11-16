/**
 * user.model.ts
 *
 * sobird<i@sobird.me> at 2021/11/16 20:30:51 created.
 */

import { Sequelize, DataTypes as DT } from "sequelize";

module.exports = function (sequelize: Sequelize, DataTypes: typeof DT) {
  const UserModel = sequelize.define(
    "user",
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
      // 这是其他模型参数
      // 直接提供表名
      // tableName: 'Employees'
    }
  );

  return UserModel;
}
