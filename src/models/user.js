import { Op } from 'sequelize';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    accessToken: {
      type: DataTypes.STRING,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
    accessExpires: {
      type: DataTypes.DATE,
    },
    accessGranted: {
      type: DataTypes.BOOLEAN,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Post);
    User.hasMany(models.PostComment);
  };

  User.findByLogin = async (login) => {
    let user = await User.findOne({
      where: { username: { [Op.eq]: login } },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: { [Op.eq]: login } },
      });
    }
    return user;
  };

  User.findById = async (id) => {
    let user = await User.findOne({
      where: { id: { [Op.eq]: id } },
    });

    return user;
  };

  return User;
};
