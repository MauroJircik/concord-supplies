//Relações entre Usuário, Produtos, Pedidos e Order:

import { DataTypes } from 'sequelize'
import sequelize from '../database.js'

import UserModel from './User.js'
import ProductModel from './Product.js'
import OrderModel from './Order.js'
import OrderProductModel from './OrderProduct.js'

const User = UserModel(sequelize, DataTypes)
const Product = ProductModel(sequelize, DataTypes)
const Order = OrderModel(sequelize, DataTypes)
const OrderProduct = OrderProductModel(sequelize, DataTypes)

//- relação: User 1:N Order
User.hasMany(Order, { foreignKey: 'UserId', as: 'orders' })
Order.belongsTo(User, { foreignKey: 'UserId', as: 'user' })

//- relação N:N entre Order e Product via OrderProduct:
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'OrderId', otherKey: 'ProductId', as: 'products' })
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'ProductId', otherKey: 'OrderId', as: 'orders' })

//- relação entre Order e Produto:
OrderProduct.belongsTo(Order, { foreignKey: 'OrderId' })
OrderProduct.belongsTo(Product, { foreignKey: 'ProductId' })

Order.hasMany(OrderProduct, { foreignKey: 'OrderId' })
Product.hasMany(OrderProduct, { foreignKey: 'ProductId' })

//retornos:
export {
  User,
  Product,
  Order,
  OrderProduct,
  sequelize
}

