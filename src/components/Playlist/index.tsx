import * as React from 'react';
import "./index.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createPlaylist } from "../../lib/fetchAPI";

interface State {
    token: {
        access_token: string;
    }
}

const Playlist: React.FC<{songs:string[]}> = ({songs}) => {
    const [playlist, setPlaylist] = useState({name: '', description: ''});
    const { access_token } = useSelector((state:State) => state.token);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if(songs.length === 0){
            alert('Please select songs!');
            return false;
        }
        playlist.name.length >= 10 ? createPlaylist(playlist, access_token, songs) : alert('The title must be at least 10 characters long');
    }

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setPlaylist({...playlist, [name]: value});
    }

    return(
        <div data-testid="playlist" className="playlist">
            <h2>Playlist</h2>
            <form>
                <table className="tablePlaylist">
                    <tbody>
                        <tr>
                            <td><label htmlFor="title">Title:</label></td>
                            <td><input type="text" name="name" onChange={handleInputChange} placeholder='must be at least 10 characters'/></td>
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