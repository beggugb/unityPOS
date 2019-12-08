module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    to: DataTypes.STRING,
    from: DataTypes.STRING,
    subject: DataTypes.STRING,
    importance: DataTypes.STRING,
    tipo: DataTypes.STRING,
    message: DataTypes.STRING,
    state: DataTypes.BOOLEAN,    
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      }
    },
    originId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'originId'
      }
    },
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User,{
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Message.belongsTo(models.User,{
      foreignKey: 'originId',
      onDelete: 'CASCADE'
    });
  };
  return Message;
};