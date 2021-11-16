/**
 * models
 *
 * sobird<i@sobird.me> at 2021/11/16 20:33:20 created.
 */

import sequelize, { DataTypes } from "./sequelize";

export const User = require("./user.model")(sequelize, DataTypes);
