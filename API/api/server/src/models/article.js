module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    variant: DataTypes.STRING,
    vol: DataTypes.DECIMAL,
    brt: DataTypes.DECIMAL,
    net: DataTypes.DECIMAL,
    psale: DataTypes.DECIMAL,
    filename: DataTypes.STRING,    
    pdesc: DataTypes.DECIMAL,
    ofert: DataTypes.BOOLEAN,
    desc: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    inStock: DataTypes.BOOLEAN,
    stock: DataTypes.INTEGER,
    minim: DataTypes.INTEGER,
    inCatalog: DataTypes.BOOLEAN,
    dest: DataTypes.BOOLEAN,
    origin: DataTypes.STRING,
    purchase: DataTypes.DECIMAL,
    reposic: DataTypes.INTEGER,    
    typeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Type',
        key: 'id',
        as: 'typeId'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Category',
        key: 'id',
        as: 'categoryId'
      }
    },
    markId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Mark',
        key: 'id',
        as: 'markId'
      }
    },

  }, {});
  Article.associate = function(models) {
    // associations can be defined here
    Article.belongsTo(models.Mark,{
      foreignKey: 'markId',
      onDelete: 'CASCADE'
    });
    Article.belongsTo(models.Category,{
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    });
    Article.belongsTo(models.Type,{
      foreignKey: 'typeId',
      onDelete: 'CASCADE'
    });

  };
  return Article;
};