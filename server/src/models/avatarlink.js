'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AvatarLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AvatarLink.hasOne(models.User,{foreignKey:"codeuser",sourceKey:"codeuser",as:"avatar"})

    }
  }
  AvatarLink.init({
    codeuser: DataTypes.STRING,
    avatarlink: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'AvatarLink',
  });
  return AvatarLink;
};