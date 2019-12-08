module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SaleItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      precioUnitario: {
        type: Sequelize.DECIMAL
      },
      precioTotal: {
        type: Sequelize.DECIMAL
      },      
      saleId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Sales',
          key: 'id',
          as: 'saleId'
        }
      },
      articleId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Articles',
          key: 'id',
          as: 'articleId'
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
    return queryInterface.dropTable('SaleItems');
  }
};