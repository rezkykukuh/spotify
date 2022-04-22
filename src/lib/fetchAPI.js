import axios from 'axios';

const buildHeaders = (token) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
}

export const searchSongs = async (keyword, access_token, setSongs) => {
    const songs = await axios.get(`https://api.spotify.com/v1/search?q=${keyword}&type=track&limit=10`, {
        ...buildHeaders(access_token)
    })
    .then(response => response.data.tracks.items)   
    setSongs(songs);
};

export const createPlaylist = async (playlist, access_token, songs) => {
    const{name, description} = playlist;
    await axios.post('https://api.spotify.com/v1/me/playlists', {
        name,
        description,
        public: false,
        collaborative: false
    }, {
        ...buildHeaders(access_token)
    })
    .then(response => {
        const {id} = response.data;
        axios.post(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            uris: songs
        }, {
            ...buildHeaders(access_token)
        })
    })
    alert(`Playlist ${name} created! Check your Spotify account.`);        
}