'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      participant.belongsTo(models.user);
      participant.belongsTo(models.event);
    }
  };
  participant.init({
    user_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER,
    canceled: DataTypes.BOOLEAN,
    form: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'participant',
    underscored: true,
  });
  return participant;
};