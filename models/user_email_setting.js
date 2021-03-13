'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_email_setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_email_setting.belongsTo(models.user);
    }
  };
  user_email_setting.init({
    user_id: DataTypes.INTEGER,
    when_followed: DataTypes.BOOLEAN,
    when_messages: DataTypes.BOOLEAN,
    when_contacted: DataTypes.BOOLEAN,
    when_purchased: DataTypes.BOOLEAN,
    when_interested: DataTypes.BOOLEAN,
    when_paid: DataTypes.BOOLEAN,
    when_canceled: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user_email_setting',
    underscored: true,
  });
  return user_email_setting;
};