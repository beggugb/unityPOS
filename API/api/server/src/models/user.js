const bcrypt = require('bcrypt-nodejs')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },      
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [5,10]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true      
    },
    enabled: DataTypes.BOOLEAN,    
    branchId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'BranchOffice',
        key: 'id',
        as: 'branchId'
      }
    },
    rolId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Rol',
        key: 'id',
        as: 'rolId'
      }
    },
  }, {});
  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };
  User.associate = function(models) {
      User.belongsTo(models.Rol,{
      foreignKey: 'rolId',
      onDelete: 'CASCADE'
    });
  User.belongsTo(models.BranchOffice,{
      foreignKey: 'branchId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};