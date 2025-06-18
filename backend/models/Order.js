//Atributos de Order:
export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    OrderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'UserId'
      }  
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    forma_pagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'Orders',
    timestamps: false,
  });

  return Order;
};
