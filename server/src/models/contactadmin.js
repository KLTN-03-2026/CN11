'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactAdmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContactAdmin.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    des: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ContactAdmin',
  });
  return ContactAdmin;
};