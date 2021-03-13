'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class credit_card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      credit_card.belongsTo(models.user);
    }
  };
  credit_card.init({
    user_id: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    payjp_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'credit_card',
    underscored: true,
  });
  return credit_card;
};