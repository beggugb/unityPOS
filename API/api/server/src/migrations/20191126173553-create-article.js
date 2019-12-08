module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      variant: {
        type: Sequelize.STRING
      },
      vol: {
        type: Sequelize.DECIMAL
      },
      brt: {
        type: Sequelize.DECIMAL
      },
      net: {
        type: Sequelize.DECIMAL
      },
      psale: {
        type: Sequelize.DECIMAL
      },
      filename: {
        type: Sequelize.STRING
      },   
      typeId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Types',
          key: 'id',
          as: 'typeId'
        }
      },
      markId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Marks',
          key: 'id',
          as: 'markId'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Categories',
          key: 'id',
          as: 'categoryId'
        }
      },
      pdesc: {
        type: Sequelize.DECIMAL
      },
      ofert: {
        type: Sequelize.BOOLEAN
      },
      desc: {
        type: Sequelize.DECIMAL
      },
      description: {
        type: Sequelize.STRING
      },
      inStock: {
        type: Sequelize.BOOLEAN
      },
      stock: {
        type: Sequelize.INTEGER
      },
      minim: {
        type: Sequelize.INTEGER
      },
      inCatalog: {
        type: Sequelize.BOOLEAN
      },
      dest: {
        type: Sequelize.BOOLEAN
      },
      origin: {
        type: Sequelize.STRING
      },
      purchase: {
        type: Sequelize.DECIMAL
      },
      reposic: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Articles');
  }
};