'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class template_payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      template_payments.belongsTo(models.template);
      template_payments.belongsTo(models.user)
    }
  };
  template_payments.init({
    user_id: DataTypes.INTEGER,
    template_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    payjp_token: DataTypes.STRING,
    refund: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'template_payments',
    underscored: true,
  });
  return template_payments;
};