module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    classNames: DataTypes.STRING,
    backgroundColor: DataTypes.STRING,
    selectable: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      }
    },
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User,{
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Task;
};