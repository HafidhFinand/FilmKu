'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;

  class UserFilm  extends Model {}

  UserFilm.init({
    UserId: DataTypes.INTEGER,
    FilmId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserFilm'
  });

  UserFilm.associate = function(models) {
    UserFilm.belongsTo(models.Film, { foreignKey: 'FilmId', targetKey: 'id'});
    UserFilm.belongsTo(models.User, { foreignKey: 'UserId', targetKey: 'id'});
  };
  return UserFilm;
};