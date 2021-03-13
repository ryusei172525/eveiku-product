'use strict';
const { use } = require('passport');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.event, { foreignKey: 'user_id' });
      user.hasMany(models.event_payment);
      user.hasMany(models.follow);
      user.hasMany(models.user_email_setting);
      user.hasMany(models.participant);
      user.hasMany(models.interested_event);
      user.hasMany(models.subscription);
      user.hasMany(models.message);
      user.hasMany(models.images);
    }
  };
  user.init({
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.BOOLEAN,
    university: DataTypes.STRING,
    company: DataTypes.STRING,
    occupation: DataTypes.STRING,
    industry: DataTypes.STRING,
    contracted_plan: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    twitter_uid: DataTypes.STRING,
    facebook_uid: DataTypes.STRING,
    instagram_uid: DataTypes.STRING,
    note_uid: DataTypes.STRING,
    avatar: DataTypes.STRING,
    birthday: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
    underscored: true,
  });
  return user;
};