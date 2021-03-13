'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      message.belongsTo(models.room);
      message.belongsTo(models.user);
    }
  };
  message.init({
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    body: DataTypes.TEXT,
    read: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'message',
    underscored: true,
  });
  return message;
};