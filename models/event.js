"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      event.belongsTo(models.user);
      event.hasMany(models.events_tag);
      event.hasMany(models.event_payment);
      event.hasMany(models.event_template);
      event.hasMany(models.interested_event);
      event.hasMany(models.participant);
      event.belongsToMany(models.user, { through: models.participant })
    }
  }
  event.init(
    {
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      organizer: DataTypes.STRING,
      description: DataTypes.TEXT,
      thumbnail: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      url: DataTypes.STRING,
      category: DataTypes.INTEGER,
      entry_way: DataTypes.INTEGER,
      zipcode: DataTypes.STRING,
      prefecture: DataTypes.STRING,
      city: DataTypes.STRING,
      area: DataTypes.STRING,
      building: DataTypes.STRING,
      date: DataTypes.DATE,
      open_date: DataTypes.DATE,
      close_date: DataTypes.DATE,
      status: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      html: DataTypes.JSON,
      online_url: DataTypes.STRING,
      online_capacity: DataTypes.INTEGER,
      online_price: DataTypes.INTEGER,

      draft_title: DataTypes.STRING,
      draft_organizer: DataTypes.STRING,
      draft_description: DataTypes.TEXT,
      draft_thumbnail: DataTypes.STRING,
      draft_capacity: DataTypes.INTEGER,
      draft_url: DataTypes.STRING,
      draft_category: DataTypes.INTEGER,
      draft_entry_way: DataTypes.INTEGER,
      draft_zipcode: DataTypes.STRING,
      draft_prefecture: DataTypes.STRING,
      draft_city: DataTypes.STRING,
      draft_area: DataTypes.STRING,
      draft_building: DataTypes.STRING,
      draft_date: DataTypes.DATE,
      draft_open_date: DataTypes.DATE,
      draft_close_date: DataTypes.DATE,
      draft_status: DataTypes.INTEGER,
      draft_price: DataTypes.INTEGER,
      draft_html: DataTypes.JSON,
      draft_online_url: DataTypes.STRING,
      draft_online_capacity: DataTypes.INTEGER,
      draft_online_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "event",
      underscored: true,
    }
  );
  return event;
};
