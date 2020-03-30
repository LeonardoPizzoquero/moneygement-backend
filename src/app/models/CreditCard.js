import Sequelize, { Model } from 'sequelize';

class CreditCard extends Model {
  static init(sequelize) {
    super.init(
      {
        limit: Sequelize.DECIMAL,
        invoice: Sequelize.DECIMAL,
        invoice_expiration: Sequelize.DATE,
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

export default CreditCard;
