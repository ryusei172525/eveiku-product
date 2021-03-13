'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event_template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      event_template.belongsTo(models.event);
      event_template.belongsTo(models.template);
    }
  };
  event_template.init({
    event_id: DataTypes.INTEGER,
    template_id: DataTypes.INTEGER,
    theme_color: DataTypes.INTEGER,
    html: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'event_template',
    underscored: true,
  });
  return event_template;
};