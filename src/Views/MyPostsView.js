import React, { Component } from 'react';

//import '../../node_modules/bootstrap/dist/css/bootstrap.css'

export default class MyPostsView extends Component {
    render() {
        let postRows = this.props.posts.map(post =>
        (post._acl.creator === sessionStorage.getItem('userId')) ?
            <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.description}</td>
                {this.getActions(post, this.props.userId)}
            </tr>:null
        );

        return (
            <div className="table-responsive">
                <h1>posts</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postRows}
                    </tbody>
                </table>
            </div>
        );
    }

    getActions(post, userId) {
        if (post._acl.creator === userId)
            return (
                <td>
                    <input type="button" value="Edit"
                           onClick={this.props.editPostClicked.bind(this, post._id)}/>
                    &nbsp;
                    <input type="button" value="Delete"
                           onClick={this.props.deletePostClicked.bind(this, post._id)}/>
                    <input type="button" value="Details"
                           onClick={this.props.viewDetailsClicked.bind(this, post._id)}/>
                </td>
            );
        else
            return (<td>
                <input type="button" value="Details"
                       onClick={this.props.viewDetailsClicked.bind(this, post._id)}/>
            </td>);
    }
}
