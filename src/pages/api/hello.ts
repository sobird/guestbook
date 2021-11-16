import { NextApiRequest, NextApiResponse } from "next";

import { compose, Next } from "@/lib/middleware";

import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize("mix", "root", "12345678", {
  // The name of the database
  // database: 'mix',

  // The username which is used to authenticate against the database.
  // username: 'root',

  // The password which is used to authenticate against the database.
  // password: '12345678',

  // the sql dialect of the database
  // currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
  dialect: "mysql",

  // custom host; default: localhost
  host: "127.0.0.1",
  // for postgres, you can also specify an absolute path to a directory
  // containing a UNIX socket to connect over
  // host: '/sockets/psql_sockets'.

  // custom port; default: dialect default
  port: 3306,

  // custom protocol; default: 'tcp'
  // postgres only, useful for Heroku
  protocol: null,

  // disable logging or provide a custom logging function; default: console.log
  logging: false,

  // you can also pass any dialect options to the underlying dialect library
  // - default is empty
  // - currently supported: 'mysql', 'postgres', 'mssql'
  dialectOptions: {
    // 指定套接字文件路径
    // socketPath: '/var/lib/mysql/mysql.sock',
    supportBigNumbers: true,
    bigNumberStrings: true,
    // if your server run on full cpu load, please set trace to false
    trace: true,
  },

  // the storage engine for sqlite
  // - default ':memory:'
  // storage: 'path/to/database.sqlite',

  // disable inserting undefined values as NULL
  // - default: false
  omitNull: true,

  // a flag for using a native library or not.
  // in the case of 'pg' -- set this to true will allow SSL support
  // - default: false
  native: true,

  // Specify options, which are used when sequelize.define is called.
  // The following example:
  //   define: { timestamps: false }
  // is basically the same as:
  //   Model.init(attributes, { timestamps: false });
  //   sequelize.define(name, attributes, { timestamps: false });
  // so defining the timestamps for each model will be not necessary
  define: {
    underscored: false,
    // 强制表名称等于模型名称
    freezeTableName: true,
    charset: "utf8",
    // dialectOptions: {
    //   collate: 'utf8_general_ci'
    // },
    timestamps: true,

    // createdAt: 'createdAt',
    // updatedAt: 'updatedAt',
  },

  // similar for sync: you can define this to always force sync for models
  // sync: { force: true },

  // pool configuration used to pool database connections
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },

  // isolation level of each transaction
  // defaults to dialect default
  // isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
});

const User = sequelize.define(
  "user",
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
      comment: "user salt",
    },
    lastLoginDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "last login date"
    }
    // ip: {
    //   type: DataTypes.STRING(64),
    //   allowNull: false,
    //   comment: 'user last request ip',
    // }
  },
  {
    // 这是其他模型参数
    // 直接提供表名
    // tableName: 'Employees'
  }
);

// 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
User.sync({ force: true });

const mid = function (req: NextApiRequest, res: NextApiResponse, next: Next) {
  sequelize.authenticate().then((res) => {
    console.log(`res`, sequelize);
  });
  next();
};

export default compose(mid, (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: "Hello" });
});
