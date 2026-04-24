'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role,{foreignKey:"rolecode",targetKey:"code",as:"role"})
      User.belongsTo(models.Log,{foreignKey:"codeuser",targetKey:"codeuser",as:"user"})
      User.belongsTo(models.AvatarLink,{foreignKey:"codeuser",targetKey:"codeuser",as:"avatar"})
      User.belongsTo(models.BankHistory, { foreignKey: "codeuser", targetKey: "codeuser", as: "user_bank" });
      User.belongsTo(models.Order, { foreignKey: "codeuser", targetKey: "codeuser", as: "order_user" });
      User.belongsTo(models.NoteWaiter, { foreignKey: "codeuser", targetKey: "codeuser", as: "note_waiter" });
    }
  }
  User.init({
    codeuser: DataTypes.STRING,
    username: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    tag: DataTypes.STRING,
    rolecode: DataTypes.STRING,
    address:DataTypes.TEXT,
    isVerify:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};