module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    orden: DataTypes.STRING,
    type: DataTypes.STRING,
    estate: DataTypes.STRING,
    cant: DataTypes.INTEGER,
    total: DataTypes.INTEGER,    
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      }
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Client',
        key: 'id',
        as: 'clientId'
      }
    },
    mesaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Mesa',
        key: 'id',
        as: 'mesaId'
      }
    },    
  }, {});
  Sale.associate = function(models) {
    // associations can be defined here
    Sale.belongsTo(models.User,{
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Sale.belongsTo(models.Client,{
      foreignKey: 'clientId',
      onDelete: 'CASCADE'
    });
    Sale.belongsTo(models.Mesa,{
      foreignKey: 'mesaId',
      onDelete: 'CASCADE'
    });
  };
  return Sale;
};