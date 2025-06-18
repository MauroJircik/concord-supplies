//Atributos de Pedido:
export default (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    OrderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
  }, {
    tableName: 'order_products',
    timestamps: false,
  });
  
  return OrderProduct;
};


