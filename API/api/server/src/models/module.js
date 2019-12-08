module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    path: DataTypes.STRING,
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    component: DataTypes.STRING,
    layout: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,    
    rolId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Rol',
        key: 'id',
        as: 'rolId'
      }
    },
  }, {});
  Module.associate = function(models) {
    // associations can be defined here
    Module.belongsTo(models.Rol,{
      foreignKey: 'rolId',
      onDelete: 'CASCADE'
    });
  };
  return Module;
};