import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConn.js';

const User = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default User;