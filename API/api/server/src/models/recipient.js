module.exports = (sequelize, DataTypes) => {
  const Recipient = sequelize.define('Recipient', {
    disabled: DataTypes.BOOLEAN,
    razonSocial: DataTypes.STRING,
    numOrd: DataTypes.STRING,
    importe: DataTypes.DECIMAL,
    concept: DataTypes.STRING,
    nit: DataTypes.STRING,
    label: DataTypes.STRING,
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Client',
        key: 'id',
        as: 'clientId'
      }
    },
    saleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Sale',
        key: 'id',
        as: 'saleId'
      }
    },
    
  }, {});
  Recipient.associate = function(models) {
    // associations can be defined here
    Recipient.belongsTo(models.Client,{
      foreignKey: 'clientId',
      onDelete: 'CASCADE'
    });
    Recipient.belongsTo(models.Sale,{
      foreignKey: 'saleId',
      onDelete: 'CASCADE'
    });

  };
  return Recipient;
};