import React, {Component} from 'react';
import './NavigationBar.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'


export default class NavigationBar extends Component {
    render() {
        let username = this.props.username;
        if (username == null) {
            // No user logged in
            return (
                <nav className="navbar navbar-inverse">
                    <div className="container">
                        <ul className="nav navbar-nav ">
                            <li><a href="#"
                                   onClick={this.props.homeClicked}><span className="glyphicon glyphicon-home"></span>
                                Home</a></li>
                            <li><a href="#"
                                   onClick={this.props.loginClicked}><span
                                className="glyphicon glyphicon-log-in"></span> Login</a></li>
                            <li><a href="#"
                                   onClick={this.props.registerClicked}><span
                                className="glyphicon glyphicon-user"></span> Register</a></li>
                        </ul>
                    </div>
                </nav>
            );
        } else if (username !== null && sessionStorage.getItem('roles') === 'user') {
            // User logged in
            return (
                <nav className="navbar navbar-inverse ">
                    <div className="container">

                        <ul className="nav navbar-nav ">
                            <li className="active"><a href="#" onClick={this.props.homeClicked}>Home</a></li>
                            <li><a href="#" onClick={this.props.postsClicked}>List All Posts</a></li>
                            <li><a href="#" onClick={this.props.createPostClicked}>Create Post</a></li>
                            <li><a href="#" onClick={this.props.myPostClicked}>My Post</a></li>
                            <li><a href="#" onClick={this.props.uploadPhotoClicked}>Upload Image</a></li>
                            <li><a href="#" onClick={this.props.galleryClicked}>Gallery</a></li>
                            <li><a href="#" onClick={this.props.logoutClicked}>Logout</a></li>
                        </ul>
                        <li><span className="loggedInUser"> Welcome, {username}!</span></li>
                    </div>
                </nav>
            );
        }
        else if (username !== null && sessionStorage.getItem('roles') === 'admin') {
            // Admin logged in
            return (
                <nav className="navbar navbar-inverse ">
                    <div className="container">

                        <ul className="nav navbar-nav ">
                            <li><a href="#" onClick={this.props.homeClicked}>Home</a></li>
                            <li><a href="#" onClick={this.props.postsClicked}>List All Posts</a></li>
                            <li><a href="#" onClick={this.props.adminListUsersClicked}>List All Users</a></li>
                            <li><a href="#" onClick={this.props.createPostClicked}>Create Post</a></li>
                            <li><a href="#" onClick={this.props.myPostClicked}>My Post</a></li>
                            <li><a href="#" onClick={this.props.uploadPhotoClicked}>Upload Image</a></li>
                            <li><a href="#" onClick={this.props.galleryClicked}>Gallery</a></li>
                            <li><a href="#" onClick={this.props.logoutClicked}>Logout</a></li>
                        </ul>
                        <li><span className="loggedInUser"> Welcome, {username}!</span></li>
                    </div>
                </nav>
            );
        }
        else if (username !== null && sessionStorage.getItem('roles') === 'moderator') {
            // Moderator logged in
            return (
                <nav className="navbar navbar-inverse ">
                    <div className="container">

                        <ul className="nav navbar-nav ">
                            <li><a href="#" onClick={this.props.homeClicked}>Home</a></li>
                            <li><a href="#" onClick={this.props.postsClicked}>List All Posts</a></li>
                            <li><a href="#" onClick={this.props.moderatorListUsersClicked}>List All Users</a></li>
                            <li><a href="#" onClick={this.props.createPostClicked}>Create Post</a></li>
                            <li><a href="#" onClick={this.props.myPostClicked}>My Post</a></li>
                            <li><a href="#" onClick={this.props.uploadPhotoClicked}>Upload Image</a></li>
                            <li><a href="#" onClick={this.props.galleryClicked}>Gallery</a></li>
                            <li><a href="#" onClick={this.props.logoutClicked}>Logout</a></li>
                        </ul>
                        <li><span className="loggedInUser"> Welcome, {username}!</span></li>
                    </div>
                </nav>
            );
        }
    }
}
