module.exports = (sequelize, DataTypes) => {
  const Caja = sequelize.define('Caja', {
    dateOpen: DataTypes.DATE,
    dateClose: DataTypes.DATE,
    montoInicial: DataTypes.DECIMAL,
    montoIngreso: DataTypes.DECIMAL,
    montoEgreso: DataTypes.DECIMAL,
    montoFinal: DataTypes.DECIMAL,
    num: DataTypes.INTEGER,
    open: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      }
    },
  }, {});
  Caja.associate = function(models) {
    // associations can be defined here
    Caja.belongsTo(models.User,{
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Caja;
};