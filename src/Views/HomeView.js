import React, { Component } from 'react';
export default class HomeView extends Component {
    render() {
        let postsRows = this.props.posts.map(post =>
            <article key={post._id}>
                <header><h1>{post.title}</h1>
                    <p>Posted by: {post.author}</p></header>
                <hr/>
                <p>{post.description}</p>
            </article>
        ).slice(0,6);
        return (
            <div className="home-view">
                <h1><span>Auto<span>Blog</span></span></h1>
                <aside>
                    <header className="recommended">
                        <h3>5 Most Viewed Posts</h3>
                    </header>
                    <hr/>
                    <div className="body">
                        <ul className="list">
                            <li><a href="#">Post1</a> </li>
                            <li><a href="#">Post2</a> </li>
                            <li><a href="#">Post3</a> </li>
                            <li><a href="#">Post4</a> </li>
                            <li><a href="#">Post5</a> </li>
                        </ul>
                    </div>
                </aside>
                <div className="home-posts-table">
                    {postsRows}
                </div>
            </div>
        );
    }
}