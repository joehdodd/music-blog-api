// import { Router } from 'express';
// import JWTAuth from '../middleware/JWTAuth';

// const router = Router();

// router.post('/', JWTAuth, async (req, res) => {
//   const { comment, postId } = req.body;
//   const newComment = await req.context.models.PostComment.create(
//     {
//       comment,
//       postId,
//       userId: req.user.dataValues.id
//     },
//     { returning: true }
//   );
//   return res.status(200).json({ message: 'Ok!', data: newComment });
// });

// router.put('/:commentId', JWTAuth, async (req, res) => {
//   const { comment } = req.body;
//   req.context.models.PostComment.update(
//     {
//       comment
//     },
//     { returning: true, where: { id: req.params.commentId } }
//   )
//     .then(function([rowsUpdated, [newComment]]) {
//       return res.status(200).json({ message: 'Ok!', data: newComment });
//     })
//     .catch(err => console.log(err));
// });

// export default router;
