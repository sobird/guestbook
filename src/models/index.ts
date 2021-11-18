/**
 * models
 *
 * sobird<i@sobird.me> at 2021/11/16 20:33:20 created.
 */

import { DataTypes } from "sequelize";
import sequelize from "./sequelize";
import UserModel from './user.model';

export const User = UserModel(sequelize, DataTypes);
