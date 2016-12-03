import React, { Component } from 'react';

export default class PostDetailsView extends Component {
    render() {
        return (
            <div className="details-view">
                <h1>Author: {this.props.author}</h1>
                <img src={this.props.imageUrl} alt=""/>
                <p>Content: {this.props.content}</p>
            </div>
        );
    }
}


