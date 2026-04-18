'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScoreUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ScoreUser.init({
    codeuser: DataTypes.STRING,
    score: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ScoreUser',
  });
  return ScoreUser;
};