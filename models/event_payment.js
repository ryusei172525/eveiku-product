'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event_payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      event_payment.belongsTo(models.user);
      event_payment.belongsTo(models.event);
    }
  };
  event_payment.init({
    user_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    payjp_token: DataTypes.STRING,
    refund: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'event_payment',
    underscored: true,
  });
  return event_payment;
};