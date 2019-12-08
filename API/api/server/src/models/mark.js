'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mark = sequelize.define('Mark', {
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {});
  Mark.associate = function(models) {
    // associations can be defined here
  };
  return Mark;
};