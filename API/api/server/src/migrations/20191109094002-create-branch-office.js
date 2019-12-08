module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BranchOffices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      administrator: {
        type: Sequelize.STRING
      },      
      companyId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Companies',
          key: 'id',
          as: 'companyId'
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
    return queryInterface.dropTable('BranchOffices');
  }
};