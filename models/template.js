'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      template.hasMany(models.template_payments);
      template.hasMany(models.event_template);
      template.hasMany(models.templates_tag);
    }
  };
  template.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    html: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'template',
    underscored: true,
  });
  return template;
};