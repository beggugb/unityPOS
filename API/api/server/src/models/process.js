module.exports = (sequelize, DataTypes) => {
  const Process = sequelize.define('Process', {
    description: DataTypes.STRING,    
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      }
    },
  }, {});
  Process.associate = function(models) {
    // associations can be defined here
    Process.belongsTo(models.User,{
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Process;
};