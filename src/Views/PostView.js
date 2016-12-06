import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

export default class PostView extends Component {
    render() {
        let currentPage = this.props.currentPage;
        let countPages = this.props.countPages;
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
                    <h1>All Posts</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Title:</th>
                            <th>Posted by:</th>
                            <th>Description:</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {postRows}
                        </tbody>
                    </table>
                </div>
                <div>
                    {this.pagination(countPages, currentPage)}
                </div>
            </div>
        );
    }

    getActions(post, userId) {
        let role = this.props.role;
        if (post._acl.creator === userId || role === "admin" || role === "moderator") {
            return (
                <td>
                    <input type="button" value="Edit" className="btn btn-lg btn-primary btn-block"
                           onClick={this.props.editPostClicked.bind(this, post._id)}/>
                    &nbsp;
                    <input type="button" value="Delete" className="btn btn-lg btn-primary btn-block"
                           onClick={this.props.deletePostClicked.bind(this, post._id)}/>
                    <input type="button" value="More..." className="btn btn-lg btn-primary btn-block"
                           onClick={this.props.viewDetailsClicked.bind(this, post._id)}/>
                </td>
            );
        } else {
            return (<td>
                <input type="button" value="More..." className="btn btn-lg btn-primary btn-block"
                       onClick={this.props.viewDetailsClicked.bind(this, post._id)}/>
            </td>);
        }
    }

    pagination(countPages, currentPage){
        let html = [];

        for(let i = 1; i <= countPages; i++) {
            html.push(<span key={i}><input type="button" value={i}  style={{border: '1px solid','color': i === currentPage ? "red" : "grey"}}
                                           onClick={this.props.pageNumberClicked.bind(this, i)}/> </span>)
        }

        return(
                html
        )
    }
}
