import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const db = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected');
  } catch (error) {
    console.error('Unable to connect to database:', error);
  }
};

db();
export { sequelize };
