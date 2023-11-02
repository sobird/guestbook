import { DataTypes, Model, Optional, fn } from "sequelize";
import sequelize from "@/lib/sequelize";

// These are all the attributes in the Comment model
export interface CommentAttributes {
  id?: number;
  title?: string;
  content: string;
  author?: string;
  email: string;
  url?: string;
  agent: string;
  parent: string;
  ip: string;
}

// Some attributes are optional in `Comment.build` and `Comment.create` calls
export interface CommentCreationAttributes
  extends Optional<CommentAttributes, "id" | "title" | "author" | "email"> {}

export interface IPaginationParams {
  /** 当前页数 */
  pn?: string | string[];
  /** 每页条数 */
  ps?: string | string[];
}

export class Comment extends Model<
  CommentAttributes,
  CommentCreationAttributes
> {
  declare id: number;
  public title!: string;
  public ip!: unknown;

  /** 分页查找评论数据 */
  public static async findAllWithPagination(query: IPaginationParams) {
    const ps = Number(query.ps) || 20;
    const pn = Number(query.pn) || 0;

    const offset = (pn - 1) * ps;
    const { count, rows } = await this.findAndCountAll({
      offset,
      limit: ps,
      order: [
        // 创建时间倒序
        ["createdAt", "DESC"],
      ],
      raw: true,
    });

    return {
      pn,
      ps,
      count,
      rows,
    };
  }
}

Comment.init(
  {
    title: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "comment title",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "comment conent",
    },
    author: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "author name",
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "author email",
    },
    url: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "author email",
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "comment parent id",
    },
    agent: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "comment agent",
    },
    ip: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "comment ip",
    },
  },
  {
    sequelize,
    modelName: "comment",
  }
);

Comment.beforeCreate((model, options) => {
  // todo
});

export default Comment;
