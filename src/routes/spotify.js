import { Router } from 'express';
import SpotifyController from '../controllers/spotifyController';
import JWTAuth from '../middleware/JWTAuth';

const router = Router();
const spotify = new SpotifyController();

console.log('spotify', spotify);

spotify.authorize('/token', { response_type: 'code' });

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
  // console.log(code, models.User, user);
  const spotifyToken = 'https://accounts.spotify.com/api/token';
  const spotifyAuthHeader = process.env.SPOTIFY_AUTH_HEADER;
  const spotifyGrant = 'authorization_code';
  // const token = await axios.post(spotifyToken, {
  //   headers: {
  //     Authorization: spotifyAuthHeader
  //   }
  // });
  const access_token = 'AFLKJJ392039jfasdl23509832509832';
  const refresh_token = 'AAFFFFFLKSDJF3920958209asdflkj392104982';
  const expires_in = 604800000;
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
});

export default router;
