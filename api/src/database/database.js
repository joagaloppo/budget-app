import Sequelize from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const { DB_PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env; 

export const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);