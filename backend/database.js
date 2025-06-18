import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

//Sequelize:
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

export default sequelize;

