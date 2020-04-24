'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;

  class Film extends Model {}

  Film.init({
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    released_year: DataTypes.INTEGER,
    genre: DataTypes.STRING
  }, {
    sequelize,
    hooks: {},
    validate: {
      valueNotEmpty() {
        if (!this.title || !this.status || !this.released_year || !this.genre) {
          throw new Error(`Value can't be empty`);
        }
      }
    },
    modelName: 'Film'
  });
  
  Film.associate = function(models) {
    Film.belongsToMany(models.User, { through: 'UserFilms'});
  };
  return Film;
};