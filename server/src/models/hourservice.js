'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HourService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HourService.hasMany(models.OrderTable, { foreignKey: "codehour", sourceKey: "codehour", as: "order_hour" });
      HourService.belongsTo(models.OrderTableStatus, { foreignKey: "codehour",targetKey:"codehour", sourceKey: "codehour", as: "order_hour_name" });
      HourService.belongsTo(models.NoteWaiter, { foreignKey: "codehour", targetKey: "codehour", as: "note_waiter" });
    }
  }
  HourService.init({
    hour: DataTypes.STRING,
    codehour: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'HourService',
  });
  return HourService;
};