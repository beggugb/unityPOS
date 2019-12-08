module.exports = (sequelize, DataTypes) => {
  const SaleItems = sequelize.define('SaleItems', {
    cantidad: DataTypes.INTEGER,
    precioUnitario: DataTypes.DECIMAL,
    precioTotal: DataTypes.DECIMAL,    
    saleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Sale',
        key: 'id',
        as: 'saleId'
      }
    },
    articleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Article',
        key: 'id',
        as: 'articleId'
      }
    },
  }, {});
  SaleItems.associate = function(models) {
    // associations can be defined here
    SaleItems.belongsTo(models.Sale,{
      foreignKey: 'saleId',
      onDelete: 'CASCADE'
    });
    
    SaleItems.belongsTo(models.Article,{
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });

  };
  return SaleItems;
};