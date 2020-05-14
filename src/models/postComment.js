import { Op } from 'sequelize';

const postComment = (sequelize, DataTypes) => {
  const PostComment = sequelize.define('postComment', {
    comment: { type: DataTypes.TEXT },
  });

  PostComment.associate = (models) => {
    PostComment.belongsTo(models.Post);
    PostComment.belongsTo(models.User);
  };

  PostComment.findById = async (id) => {
    let postComment = await PostComment.findOne({
      where: { id: { [Op.eq]: id } },
    });

    return postComment;
  };

  PostComment.findByPostId = async (postId) => {
    const comments = await Instruction.findAll({
      where: { postId: { [Op.eq]: postId } },
    });
    return comments;
  };

  return PostComment;
};

export default postComment;
