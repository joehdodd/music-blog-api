import axios from 'axios';

export default class SpotifyController {
  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    this.authHeader = process.env.SPOTIFY_AUTH_HEADER;
    this.spotifyAccountsURL = process.env.SPOTIFY_ACCOUNTS_URL;
    this.spotifyAPIURL = process.env.SPOTIFY_API_URL;
  }

  async authorize(endpoint, config) {
    try {
      const data = await axios.request({
        baseURL: this.spotifyAccountsURL,
        url: endpoint,
        headers: {
          Authorization: this.authHeader,
        },
        ...config,
      });
      return data;
    } catch (e) {
      return e;
    }
  }

  async get(endpoint, token, config) {
    try {
      const data = await axios.request({
        baseURL: this.spotifyAPIURL,
        url: endpoint,
        headers: {
          Authorization: token,
        },
        ...config,
      });
      return data;
    } catch (e) {
      return e;
    }
  }
}
