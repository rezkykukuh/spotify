import './index.css'
import Login from '../../components/Login';
import Search from '../../components/Search';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface State {
    token: {
        isLogin: boolean;
    }
}

const Home = () => {
    const { isLogin } = useSelector((state:State) => state.token);
    console.log(isLogin);

    return(
        <div className='home'>
            <div className="search">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Login />
                            {isLogin && <Redirect exact from={window.location.href} to="/create-playlist"/>}
                        </Route>

                        <Route exact path="/create-playlist">
                            {isLogin ? <Search /> : <Redirect exact from="/create-playlist" to="/" />}
                        </Route>
                    </Switch>
                </Router>
            </div>

            <div data-testid='tracks' className="tracks">
            </div>
        </div>
    )
}

export default Home;