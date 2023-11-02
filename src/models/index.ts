/**
 * models
 * 
 * @see https://github.com/sequelize/sequelize/blob/main/types/test/typescriptDocs/ModelInit.ts
 *
 * sobird<i@sobird.me> at 2021/11/16 20:33:20 created.
 */

import sequelize from "@/lib/sequelize";
import UserModel from "./user";
import Comment from "./comment";

export const User = UserModel;
export const CommentModel = Comment;

User.hasMany(Comment, {
  foreignKey: "userId",
});
Comment.belongsTo(User);

export default sequelize;
