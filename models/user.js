'use strict';

module.exports = (sequelize, DataTypes) => {
  const { encrypt } = require('../helpers/bcrypt.js');

  const Model = sequelize.Sequelize.Model;
  class User extends Model {}

  User.init({
    first_name: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: {
          args: true,
          msg: `first name cannot be empty`
        }
      }
    },
    last_name: {
      type:  DataTypes.STRING,
      validate : {
        notEmpty: {
          args: true,
          msg: `last name cannot be empty`
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `username cannot be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 6,
          msg: `Password minimal 6 karakter`
        }, 
      }
    },
    email: {
      type:  DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `email cannot be empty`
        }
      }
    }, 
    birth_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: `email cannot be empty`
        }
      }
    },
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user) => {
        user.password = encrypt(user.password);
      }
    },
    modelName: 'User'
  });

  User.associate = function(models) {
    User.belongsToMany(models.Film, { through: 'UserFilms' });
  };
  return User;
};