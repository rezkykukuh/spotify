import './index.css';
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { saveToken } from '../../slice/token-slice';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const REDIRECT_URL = process.env.REACT_APP_SPOTIFY_redirect_uri;
const SCOPES = 'playlist-modify-private';

type Acc = { [key: string]: string };

const getReturnedToken = (hash:string) => {
    const stringAfterHastag = hash.substring(1);
    const params = stringAfterHastag.split('&');
    const paramsSplitUp = params.reduce<Acc>((acc:Acc, param) => {
        // console.log(param);
        const [key, value] = param.split('=');
        acc[key] = value;
        return acc;
    }, {});

    return paramsSplitUp;
}

const Login = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.location.hash) {
            const { access_token } = getReturnedToken(window.location.hash);
            // localStorage.setItem('access_token', access_token);
            dispatch(saveToken(access_token));
            // console.log(getReturnedToken(window.location.hash));
        }
    });
    const handleLogin = () => {
        window.location.href = `${SPOTIFY_AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES}&response_type=token`;
    }

    return(
        <>
        <h1>Welcome To Spotify</h1>
        <button data-testid='btnLogin' onClick={handleLogin} className="btnLogin">Login</button>
        </>

    )
}

export default Login;