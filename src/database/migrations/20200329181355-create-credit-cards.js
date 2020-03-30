module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('credit_cards', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      limit: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      invoice: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      invoice_expiration: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bank_id: {
        type: Sequelize.INTEGER,
        references: { model: 'banks', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('credit_cards');
  },
};
