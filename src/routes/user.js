import { Router } from 'express';
import JWTAuth from '../middleware/JWTAuth';
import bcrypt from 'bcrypt';

const router = Router();

router.get('/', JWTAuth, async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.status(200).json({ message: 'Ok', data: users });
});

router.get('/:userId', JWTAuth, async (req, res) => {
  const user = await req.context.models.User.findById(req.params.userId);
  return res.status(200).json({ message: 'Ok', user: user.dataValues });
});

router.get('/:userId/posts', JWTAuth, async (req, res) => {
  const { userId } = req.params;
  const posts = await req.context.models.Post.findByUserId(userId);
  return res.status(200).json({ message: 'Ok!', data: posts });
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await req.context.models.User.findByLogin(username);
  if (existingUser) {
    return res
      .status(400)
      .json({ message: 'That username is taken. Please choose another.' });
  } else {
    bcrypt.hash(password, 10).then(hashedPassword => {
      req.context.models.User.create({
        username,
        password: hashedPassword
      }).then(user => {
        console.log('user created', user);
        return res.status(200).json({ message: 'User created!' });
      });
    });
  }
});

export default router;
