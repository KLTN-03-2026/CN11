'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasOne(models.User,{foreignKey:"rolecode",sourceKey:"code",as:"role"})
      Role.hasOne(models.Log,{foreignKey:"role",sourceKey:"code",as:"role_log"})
    }
  }
  Role.init({
    value: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};