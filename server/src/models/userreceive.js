'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserReceive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserReceive.belongsTo(models.Bell, {
        foreignKey: "codebell",
        targetKey: "codebell",
        as: "bell"
      });
    }
  }
  UserReceive.init({
    codeuser: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    codebell: DataTypes.STRING,
    codeuserreceive: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserReceive',
  });
  return UserReceive;
};