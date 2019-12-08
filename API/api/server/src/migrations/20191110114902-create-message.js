module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      to: {
        type: Sequelize.STRING
      },
      from: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      importance: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.BOOLEAN
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      originId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id',
          as: 'orginId'
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
    return queryInterface.dropTable('Messages');
  }
};