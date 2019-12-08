module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CajaItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cajaId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Cajas',
          key: 'id',
          as: 'cajaId'
        }
      },
      monto: {
        type: Sequelize.DECIMAL
      },
      tipo: {
        type: Sequelize.STRING
      },
      label: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('CajaItems');
  }
};