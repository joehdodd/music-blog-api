import qs from 'qs';
import SpotifyController from '../controllers/spotifyController';

const spotify = new SpotifyController();

const spotifySession = async (req, res, next) => {
  const {
    user: { dataValues },
    context: { models },
  } = req;
  const { refreshToken, accessExpires, id } = dataValues;
  const date = new Date();
  if (accessExpires.getTime() <= date.getTime()) {
    const {
      data: { access_token, expires_in },
    } = await spotify.authorize('/api/token', {
      method: 'POST',
      data: qs.stringify({
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        redirect_uri: 'http://localhost:3000/authorize',
      }),
    });
    const expires = date.getTime() + expires_in * 1000;
    const expirationDate = new Date(expires);
    models.User.update(
      {
        accessToken: access_token,
        accessExpires: expirationDate,
      },
      { returning: false, where: { id: id } }
    )
      .then(() => {
        res.locals.accessToken = access_token;
        next();
      })
      .catch((e) => {
        res.status(400).json({ message: 'Error!', e });
      });
  } else {
    res.locals.accessToken = dataValues.accessToken;
    next();
  }
};

export { spotifySession };
