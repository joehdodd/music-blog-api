export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
  });

  User.associate = models => {
    User.hasMany(models.Post);
    User.hasMany(models.PostComment);
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login }
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login }
      });
    }
    return user;
  };

  User.findById = async id => {
    let user = await User.findOne({
      where: { id }
    });

    return user;
  };

  return User;
};
