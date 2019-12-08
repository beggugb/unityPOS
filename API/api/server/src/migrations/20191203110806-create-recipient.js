module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recipients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      disabled: {
        type: Sequelize.BOOLEAN
      },
      razonSocial: {
        type: Sequelize.STRING
      },
      numOrd: {
        type: Sequelize.STRING
      },
      importe: {
        type: Sequelize.DECIMAL
      },
      concept: {
        type: Sequelize.STRING
      },
      nit: {
        type: Sequelize.STRING
      },
      label: {
        type: Sequelize.STRING
      },
      clientId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Clients',
          key: 'id',
          as: 'clientId'
        }
      },
      saleId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Sales',
          key: 'id',
          as: 'saleId'
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
    return queryInterface.dropTable('Recipients');
  }
};