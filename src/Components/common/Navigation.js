import React, {Component} from 'react';
import './Navigation.css';
export default class Navigation extends Component{
    render() {
        return (
            <header className="jumbotron">
                <h1>Welcome to Sport site</h1>
                <nav>
                    {this.props.children}
                </nav>
            </header>
        );
    }
}