import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, browserHistory } from 'react-router'
import { Route, IndexRoute, Link} from 'react-router'
import Login from './Views/LoginView'
import Register from './Views/RegisterView'
import About from './Views/AboutView'
import Home from './Views/HomeView'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
            <Route path="about" component={About}/>
        </Route>
    </Router>,document.getElementById('root')
);