module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {              
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    nit: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    sure: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    website: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    key: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },    
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
  };
  return Company;
};