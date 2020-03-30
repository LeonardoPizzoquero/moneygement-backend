import Sequelize, { Model } from 'sequelize';

class Ticket extends Model {
  static init(sequelize) {
    super.init(
      {
        balance: Sequelize.DECIMAL,
        plan: Sequelize.STRING,
        order: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Bank, { foreignKey: 'bank_id', as: 'bank' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Ticket;
