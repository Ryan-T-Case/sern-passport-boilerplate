import Sequelize from 'sequelize';
import UserModel from './models/user';

const sequelize = new Sequelize('sern-passport', 'casery2', 'Yankees02', {
  host: 'db',
  dialect: 'mysql',
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  console.log('Users db and user table have been created');
});

module.exports = User;