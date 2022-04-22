import * as React from 'react';
import "./index.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

interface State {
    token: {
        access_token: string;
    }
}

const Playlist: React.FC<{songs:string[]}> = ({songs}) => {
    const [playlist, setPlaylist] = useState({name: '', description: ''});
    const {access_token} = useSelector((state:State) => state.token);

    const createPlaylist = async () => {
        const{name, description} = playlist;
        await axios.post('https://api.spotify.com/v1/me/playlists', {
            name,
            description,
            public: false,
            collaborative: false
        }, {
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        })
        .then(response => {
            const {id} = response.data;
            axios.post(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
                uris: songs
            }, {
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                }
            })
        })
        alert(`Playlist ${name} created! Check your Spotify account.`);        
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if(songs.length === 0){
            alert('Please select songs!');
            return false;
        }
        playlist.name.length >= 5 ? createPlaylist() : alert('The title must be at least 5 characters long');
    }

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setPlaylist({...playlist, [name]: value});
    }

    return(
        <div data-testid="playlist" className="playlist">
            <h1>Playlist</h1>
            <form>
                <table className="tablePlaylist">
                    <tbody>
                        <tr>
                            <td><label htmlFor="title">Title:</label></td>
                            <td><input type="text" name="name" onChange={handleInputChange} placeholder='must be at least 5 characters'/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="description">Description:</label></td>
                            <td><textarea name="description" onChange={handleInputChange}></textarea></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" onClick={handleSubmit}>Create</button>
            </form>
        </div>
    )
}

export default Playlist;