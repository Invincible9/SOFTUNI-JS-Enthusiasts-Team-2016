import React, {Component} from 'react';

//import '../../node_modules/bootstrap/dist/css/bootstrap.css'
export default class PostView extends Component {
    render() {
        let postRows = this.props.posts.map(post =>
            <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.description}
                    <p>
                        <i>
                            <font size="1">Publish date: {post.date.slice(0,33)}</font>
                        </i>
                    </p>
                </td>
                {this.getActions(post, this.props.userId)}
            </tr>
        );

        return (
            <div className="container">
                <div className="table-responsive">
                    <h1>Posts</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Title:</th>
                            <th>Description:</th>
                            <th>Posted by:</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {postRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    getActions(post, userId) {
        if (post._acl.creator === userId)
            return (
                <td>
                    <input type="button" value="Edit"  className="btn btn-lg btn-primary btn-block"
                           onClick={this.props.editPostClicked.bind(this, post._id)}/>
                    &nbsp;
                    <input type="button" value="Delete"  className="btn btn-lg btn-primary btn-block"
                           onClick={this.props.deletePostClicked.bind(this, post._id)}/>
                    <input type="button" value="More..."  className="btn btn-lg btn-primary btn-block"
                           onClick={this.props.viewDetailsClicked.bind(this, post._id)}/>
                </td>
            );
        else
            return (<td>
                <input type="button" value="More..." className="btn btn-lg btn-primary btn-block"
                       onClick={this.props.viewDetailsClicked.bind(this, post._id)}/>
            </td>);
    }
}
