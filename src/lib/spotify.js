var client_id = process.env.REACT_APP_SPOTIFY_KEY;
var redirect_uri = process.env.REACT_APP_REDIRECT_URI;

var state = 'mySpotifyAppGigih';

localStorage.setItem("stateKey", state);
var scope = 'playlist-modify-private';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=http://localhost:3000';
url += '&state=' + encodeURIComponent(state);

export default url;