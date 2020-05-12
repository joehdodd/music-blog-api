import qs from 'qs';
import SpotifyController from '../controllers/spotifyController';

const spotify = new SpotifyController();

const spotifySession = async (req, res, next) => {
  const {
    user: { dataValues },
    context: { models },
  } = req;
  const { refreshToken, accessExpires } = dataValues;
  const date = new Date();
  if (accessExpires.getTime() <= date.getTime()) {
    console.log(accessExpires, 'expired token');
    const {
      data: { access_token, refresh_token, expires_in },
    } = await spotify.authorize('/api/token', {
      method: 'POST',
      data: qs.stringify({
        refreshToken,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000/authorize',
      }),
    });
    const expires = date.getTime() + expires_in * 1000;
    const expirationDate = new Date(expires);
    models.User.update(
      {
        accessToken: access_token,
        refreshToken: refresh_token,
        accessExpires: expirationDate,
      },
      { returning: true, where: { id: user.dataValues.id } }
    )
      .then(function ([rowsUpdated, [updatedUser]]) {
        next();
      })
      .catch((e) => {
        res.status(400).json({ message: 'Error!', e });
      });
  } else {
    next();
  }
};

export { spotifySession };
