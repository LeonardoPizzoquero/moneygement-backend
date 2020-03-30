module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('banks', [
    {
      name: 'Nubank',
      color: '#8A05BE',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Santander',
      color: '#EC0000',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Usecred',
      color: '#F5DC3D',
      created_at: new Date(),
      updated_at: new Date()
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('banks', null, {});
  }
};
