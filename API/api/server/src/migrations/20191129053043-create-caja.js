module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cajas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateOpen: {
        type: Sequelize.DATE
      },
      dateClose: {
        type: Sequelize.DATE
      },
      montoInicial: {
        type: Sequelize.DECIMAL
      },
      montoIngreso: {
        type: Sequelize.DECIMAL
      },
      montoEgreso: {
        type: Sequelize.DECIMAL
      },
      montoFinal: {
        type: Sequelize.DECIMAL
      },
      open: {
        type: Sequelize.BOOLEAN
      },
      est: {
        type: Sequelize.BOOLEAN
      },
      num: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
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
    return queryInterface.dropTable('Cajas');
  }
};