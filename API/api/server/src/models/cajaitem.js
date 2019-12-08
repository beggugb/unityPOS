module.exports = (sequelize, DataTypes) => {
  const CajaItem = sequelize.define('CajaItem', {    
    monto: DataTypes.DECIMAL,
    tipo: DataTypes.STRING,
    label: DataTypes.STRING,
    est: DataTypes.BOOLEAN,     
    cajaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Caja',
        key: 'id',
        as: 'cajaId'
      }
    },
  }, {});
  CajaItem.associate = function(models) {
    // associations can be defined here
    CajaItem.belongsTo(models.Caja,{
      foreignKey: 'cajaId',
      onDelete: 'CASCADE'
    });
  };
  return CajaItem;
};