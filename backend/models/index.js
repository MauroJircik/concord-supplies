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

// Relação User 1:N Order
User.hasMany(Order, { foreignKey: 'UserId', as: 'orders' })
Order.belongsTo(User, { foreignKey: 'UserId', as: 'user' })

// Relação N:N entre Order e Product via OrderProduct
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'OrderId', otherKey: 'ProductId', as: 'products' })
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'ProductId', otherKey: 'OrderId', as: 'orders' })

// Associações diretas do modelo intermediário
OrderProduct.belongsTo(Order, { foreignKey: 'OrderId' })
OrderProduct.belongsTo(Product, { foreignKey: 'ProductId' })

// Opcionalmente, pode criar hasMany para facilitar queries
Order.hasMany(OrderProduct, { foreignKey: 'OrderId' })
Product.hasMany(OrderProduct, { foreignKey: 'ProductId' })

export {
  User,
  Product,
  Order,
  OrderProduct,
  sequelize
}

