/**
 * models
 *
 * sobird<i@sobird.me> at 2021/11/16 20:33:20 created.
 */

import sequelize from "./sequelize";
import UserModel from "./user.model";
import commentModel from "./comment.model";

export const User = UserModel(sequelize);
export const Comment = commentModel(sequelize);

User.hasMany(Comment, {
  foreignKey: "userId",
});
Comment.belongsTo(User);

export default sequelize
