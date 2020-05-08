import { Router } from 'express';
import Sequelize from 'sequelize';
import JWTAuth from '../middleware/JWTAuth';

const router = Router();
const Op = Sequelize.Op;

router.get('/', async (req, res) => {
  const posts = await req.context.models.Post.findAll({
    attributes: ['title', 'id']
  });
  return res.status(200).json({ message: 'Ok!', data: posts });
});

router.get('/:postId', async (req, res) => {
  const post = await req.context.models.Post.findOne({
    where: { id: parseInt(req.params.postId) },
  });
  return res.status(200).json({ message: 'Ok!', data: post });
});

router.post('/', JWTAuth, async (req, res) => {
  const { title, description } = req.body;
  const post = await req.context.models.Post.create(
    {
      title,
      description,
      userId: req.user.dataValues.id
    },
    { returning: true }
  );
  return res.status(200).json({ message: 'Ok!', data: post });
});

router.put('/:postId', JWTAuth, async (req, res) => {
  const { title, description } = req.body;
  req.context.models.Post.update(
    {
      title,
      description,
      userId: req.user.dataValues.id,
    },
    { returning: true, where: { id: req.params.postId } }
  )
    .then(function([rowsUpdated, [post]]) {
      return res.status(200).json({ message: 'Ok!', data: post });
    })
    .catch(err => console.log(err));
});

export default router;
