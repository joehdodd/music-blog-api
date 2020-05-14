import { Op } from 'sequelize';

const post = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    title: { type: DataTypes.TEXT },
    body: { type: DataTypes.TEXT },
    name: { type: DataTypes.TEXT },
    spotifyId: { type: DataTypes.TEXT },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User);
    Post.hasMany(models.PostComment, { as: 'comments' });
  };

  Post.findById = async (id) => {
    let post = await Post.findOne({
      where: { id: { [Op.eq]: id } },
    });

    return post;
  };

  Post.findByUserId = async (userId) => {
    const posts = await Post.findAll({
      where: { userId: { [Op.eq]: userId } },
    });
    return posts;
  };

  return Post;
};

export default post;
