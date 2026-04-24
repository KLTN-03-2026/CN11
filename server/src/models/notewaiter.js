'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NoteWaiter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NoteWaiter.hasOne(models.User, {
        foreignKey: "codeuser",
        sourceKey: "codeuser",
        as: "user"
      })

      NoteWaiter.hasOne(models.HourService, {
        foreignKey: "codehour",
        sourceKey: "codehour",
        as: "hourService"
      })

      NoteWaiter.hasOne(models.Table, {
        foreignKey: "codetable",
        sourceKey: "codetable",
        as: "table"
      })

    }
  }
  NoteWaiter.init({
    codenote: DataTypes.STRING,
    codeuser: DataTypes.STRING,
    codehour: DataTypes.STRING,
    codetable: DataTypes.STRING,
    date: DataTypes.STRING,
    des: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'NoteWaiter',
  });
  return NoteWaiter;
};