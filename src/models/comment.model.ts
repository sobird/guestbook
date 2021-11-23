import { Sequelize, DataTypes, Model, Optional, fn } from "sequelize";

// These are all the attributes in the Comment model
export interface CommentAttributes {
  id?: number;
  title: string;
  content: string;
  author?: string;
  email: string;
  agent: string;
  parent: string;
  ip: number;
}

// Some attributes are optional in `Comment.build` and `Comment.create` calls
export interface CommentCreationAttributes
  extends Optional<CommentAttributes, "id" | "title" | "author" | "email"> {}

  class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
    public title!: string;
    public ip!: unknown;
  }
  
  export default function (sequelize: Sequelize) {
    Comment.init(
      {
        title: {
          type: DataTypes.STRING(32),
          allowNull: false,
          comment: "comment title",
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: "comment conent",
        },
        author: {
          type: DataTypes.STRING(32),
          allowNull: true,
          comment: "author name",
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: "author email",
        },
        parent: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "comment parent id",
        },
        agent: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: "comment agent",
        },
        ip: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
          comment: "comment ip",
        },
      },
      {
        sequelize,
        modelName: "comment",
      }
    );
  
    Comment.beforeCreate((model, options) => {
      model.ip = fn("INET_ATON", model.ip); // INET_NTOA
    });
  
    return Comment;
  }
  