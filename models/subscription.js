'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      subscription.belongsTo(models.user);
    }
  };
  subscription.init({
    user_id: DataTypes.INTEGER,
    payjp_token: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'subscription',
    underscored: true,
  });
  return subscription;
};