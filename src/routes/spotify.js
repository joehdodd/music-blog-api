import { Router } from 'express';
import qs from 'qs';
import SpotifyController from '../controllers/spotifyController';
import JWTAuth from '../middleware/JWTAuth';

const router = Router();
const spotify = new SpotifyController();

router.get('/authorize', JWTAuth, async (req, res) => {
  const spotifyAuthorize = 'https://accounts.spotify.com/authorize';
  const spotifyClientID = process.env.SPOTIFY_CLIENT_ID;
  const responseType = 'code';
  const redirectURL = 'http://localhost:3000/authorize';
  res.status(200).json({
    message: 'Ok!',
    redirect: `${spotifyAuthorize}?client_id=${spotifyClientID}&response_type=${responseType}&redirect_uri=${redirectURL}`,
  });
});

router.get('/token/:code', JWTAuth, async (req, res) => {
  const {
    params: { code },
    context: { models },
    user,
  } = req;
  const {
    data: { access_token, refresh_token, expires_in },
  } = await spotify.authorize('/api/token', {
    method: 'POST',
    data: qs.stringify({
      code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000/authorize',
    }),
  });
  const date = new Date();
  const expires = date.getTime() + expires_in;
  models.User.update(
    {
      accessToken: access_token,
      refreshToken: refresh_token,
    },
    { returning: false, where: { id: user.dataValues.id } }
  )
    .then(() => {
      res.status(200).json({
        message: 'Ok!',
        spotifySession: expires,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({
        message: 'Error!',
        e,
      });
    });

    // router.get('/search', JWTAuth, async (req, res) => {

    // })
});

export default router;
