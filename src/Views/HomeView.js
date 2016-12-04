import React, { Component } from 'react';
export default class HomeView extends Component {
    render() {
        let postsRows = this.props.posts.map(post =>
            <article key={post._id}>
                <header><h1>{post.title}</h1>
                    <div>{post.author}</div></header>
                <div>{post.content}</div>
            </article>
        ).slice(0,6);
        return (
            <div className="home-view">
                <h1>Home Page</h1>
                <div className="home-posts-table">
                    {postsRows}
                </div>
            </div>
        );
    }
}
