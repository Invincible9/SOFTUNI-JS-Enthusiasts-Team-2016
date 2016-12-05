import React, {Component} from 'react';

//import '../../node_modules/bootstrap/dist/css/bootstrap.css'

export default class MyPostsView extends Component {
    render() {
        let postTable = this.props.posts.length ?
            <tr>
                <th>Title:</th>
                <th>Description:</th>
                <th>Posted by:</th>
                <th>Actions</th>
            </tr> : <tr>
            <td>No Post</td>
        </tr>;
        let postRows = this.props.posts.map(post =>
            <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.description}</td>
                {this.getActions(post, this.props.userId)}
            </tr>);
        return (
            <div className="container">
                <div className="table-responsive">
                    <h1>My posts</h1>
                    <table className="table">
                        <thead>
                        {postTable}
                        </thead>
                        <tbody>
                        {postRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    getActions(post) {
        return (
            <td>
                <input type="button" value="Edit" className="btn btn-lg btn-primary btn-block"
                       onClick={this.props.editPostClicked.bind(this, post._id)}/>
                &nbsp;
                <input type="button" value="Delete" className="btn btn-lg btn-primary btn-block"
                       onClick={this.props.deletePostClicked.bind(this, post._id)}/>
                <input type="button" value="Details" className="btn btn-lg btn-primary btn-block"
                       onClick={this.props.viewDetailsClicked.bind(this, post._id)}/>
            </td>
        );
    }
}
