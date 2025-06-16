// backend/models/Product.js
export default (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    ProductId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomeProduct: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preco_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    unidade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    tableName: 'Products',
    timestamps: false,
  });
};
