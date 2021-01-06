'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cliente.init({
      cliente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    nome: DataTypes.STRING,
    cpf: DataTypes.INTEGER,
    telefone: DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName: 'Cliente',
    timestamps: false
  });
  return Cliente;
};