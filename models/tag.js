'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tag.hasMany(models.events_tag);
      tag.hasMany(models.templates_tag);
    }
  };
  tag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tag',
    underscored: true,
  });
  return tag;
};