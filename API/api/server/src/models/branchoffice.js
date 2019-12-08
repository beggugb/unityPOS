module.exports = (sequelize, DataTypes) => {
  const BranchOffice = sequelize.define('BranchOffice', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    administrator: DataTypes.STRING,    
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Company',
        key: 'id',
        as: 'companyId'
      }
    },
  }, {});
  BranchOffice.associate = function(models) {
    // associations can be defined here
    BranchOffice.belongsTo(models.Company,{
      foreignKey: 'companyId',
      onDelete: 'CASCADE'
    });

  };
  return BranchOffice;
};