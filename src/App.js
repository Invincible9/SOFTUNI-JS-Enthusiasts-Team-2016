import React, {Component} from 'react';
import {Link} from 'react-router';
import './App.css';
import './index.css';
import Navigation from './Components/common/Navigation'

export default class App extends Component {

    render() {
        return (
            <div className="container">
                <Navigation>
                    <Link to="/" className="btn btn-default">Home</Link>
                    <Link to="/login" className="btn btn-default">Login</Link>
                    <Link to="/register" className="btn btn-default">Register</Link>
                    <Link to="/about" className="btn btn-default">About</Link>
                </Navigation>
                {this.props.children}
            </div>
        )
    }
}