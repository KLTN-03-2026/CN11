'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BankHistory.belongsTo(models.User, { foreignKey: "codeuser", targetKey: "codeuser",as: "user_bank" });
      BankHistory.belongsTo(models.Table, { foreignKey: "codetable", targetKey: "codetable",as: "table" });
    }
  }
  BankHistory.init({
    codebank: DataTypes.STRING,
    codeuser: DataTypes.STRING,
    codeorder: DataTypes.STRING,
    codetable: DataTypes.STRING,
    total: DataTypes.STRING,
    method: DataTypes.STRING,
    date: DataTypes.STRING,
    hour: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BankHistory',
  });
  return BankHistory;
};