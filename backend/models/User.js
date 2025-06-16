// backend/models/User.js
export default (sequelize, DataTypes) => {
  return sequelize.define('User', {
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomeUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'comum',
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    }, {
      tableName: 'Users',
      timestamps: false,
    });
};

