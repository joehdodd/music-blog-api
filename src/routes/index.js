import session from './session';
import user from './user';
import post from './post';
import comment from './comment';

export default app => {
  app.use('/session', session);
  app.use('/users', user);
  app.use('/post', post);
  app.use('/comments', comment)
};
