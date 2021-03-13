'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class templates_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      templates_tag.belongsTo(models.tag);
      templates_tag.belongsTo(models.template);
    }
  };
  templates_tag.init({
    tag_id: DataTypes.INTEGER,
    template_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'templates_tag',
    underscored: true,
  });
  return templates_tag;
};