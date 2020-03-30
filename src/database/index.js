import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Bank from '../app/models/Bank';
import CreditCard from '../app/models/CreditCard';

const models = [User, Bank, CreditCard, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
     .map(model => model.init(this.connection))
     .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
