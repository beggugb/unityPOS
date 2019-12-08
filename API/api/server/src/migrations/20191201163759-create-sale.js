module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orden: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      estate: {
        type: Sequelize.STRING
      },
      cant: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      },      
      mesaId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Mesas',
          key: 'id',
          as: 'mesaId'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      clientId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Clients',
          key: 'id',
          as: 'clientId'
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
    return queryInterface.dropTable('Sales');
  }
};