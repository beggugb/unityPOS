module.exports = (sequelize, DataTypes) => {
  const Mesa = sequelize.define('Mesa', {
    nro: DataTypes.INTEGER,
    estate: DataTypes.STRING,
    deudor: DataTypes.BOOLEAN
  }, {});
  Mesa.associate = function(models) {
    // associations can be defined here
  };
  return Mesa;
};