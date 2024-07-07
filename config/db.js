import { Sequelize } from "sequelize";
import { DB_URL } from "./config.js";

export const db = new Sequelize(DB_URL, {
    host: 'aws-0-eu-west-2.pooler.supabase.com',
    dialect: 'postgres',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
})
