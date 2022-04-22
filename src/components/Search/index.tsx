import './index.css';
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Playlist from '../Playlist';
import FormSearch from './components/FormSearch';

interface State {
    token: {
        access_token: string;
    }
}

const Search = () => {
    const [songs, setSongs] = useState([
        {
            id: '',
            name: '',
            artists: [
                {
                    name: '',
                }
            ],
            album: {
                images: [
                    {
                        url: '',
                    }
                ],
                name: '',
            },
            uri: '',
            duration_ms: 0,
        },
    ]);
    const [keyword, setKeyword] = useState('');
    const [selectedSong, setSelectedSong] = useState<string[]>([]);
    const {access_token} = useSelector((state:State) => state.token);

    const searchSongs = useCallback(async() => {
        const songs = await axios.get(`https://api.spotify.com/v1/search?q=${keyword}&type=track&limit=10`, {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            })
            .then(response => response.data.tracks.items)   
        setSongs(songs);
    }, [keyword, access_token]);

    useEffect(() => {
        if (keyword.length === 0) {
            setSongs([]);
        } else if(keyword.length > 2){
            searchSongs();
        }
    }, [keyword, searchSongs]);

    const inputHandler = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setKeyword(e.target.value);
    }

    const searchButtonHandler = () => {
        if(keyword.length === 0){
            alert('Please enter a keyword!');
            return false;
        }
        searchSongs();
    }

    const resetButtonHandler = () => {
        setSelectedSong([]);
    };
    
    const selectButtonHandler = (uri: string) => {
        const indexSelectedSong = selectedSong.indexOf(uri);
        const newSelectedSong = [...selectedSong];
        (indexSelectedSong < 0) ? newSelectedSong.push(uri) : newSelectedSong.splice(indexSelectedSong, 1);
        setSelectedSong(newSelectedSong);
    };
    
    
    const msToMin = (millis: number) => {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < '10' ? '0' : '') + seconds;
    }

    return(
        <>
            <Playlist songs={selectedSong} />
            <div className='search' >
            <FormSearch onChange={inputHandler} onSearch={searchButtonHandler} onReset={resetButtonHandler}/>

                {songs.length > 0 && (
                    <div className='kotak'>
                    <h2>Songs List:</h2>
                    <div data-testid="resultSearch" className="tableSearchResult">
                            {songs.map((song, index) => {
                            const {name, artists, album, uri, duration_ms, id} = song;
                            const isSelected = selectedSong.includes(uri);
                                return(
                                    <div className='td' key={id+index}>
                                        <img src={album.images[0].url} alt={name} />
                                        <div className="songInfo">
                                            <h3>{name}</h3>
                                            <p className="lightText">{artists[0].name}</p>
                                            <p className="lightText">{album.name}</p>
                                            <input type="button" onClick={() => selectButtonHandler(uri)} className="selectButtonHandler" value={isSelected ? "Deselect" : "Select"} />
                                        </div>
                                        <p className="lightText duration">{msToMin(duration_ms)}</p>
                                    </div>
                                )
                            })}
                    </div>
                    </div>
                )}
            </div>
            
        </>
    )
}

export default Search;