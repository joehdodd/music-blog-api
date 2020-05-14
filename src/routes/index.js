import session from './session';
import user from './user';
import post from './post';
import comment from './comment';
import spotify from './spotify';

export default app => {
  app.use('/session', session);
  app.use('/user', user);
  app.use('/post', post);
  // app.use('/comments', comment);
  app.use('/spotify', spotify);
};
