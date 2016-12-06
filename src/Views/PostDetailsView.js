import React, { Component } from 'react';
import '../styles/PostDetailsView.css'
export default class PostDetailsView extends Component {
    render() {
        let commentsRow;
        if(this.props.comments) {
            commentsRow = this.props.comments.map(comment =>
                <div key={comment._id}>
                    <p>Comment content: {comment.comment}</p>
                    <p>Comment author: {comment.commentAuthor}</p>
                </div>
            );
        } else {
            commentsRow='';
        }

        return (
            <div className="details-view">
                <input type="button" value="Back to Posts" className="btn btn-lg btn-primary"
                       onClick={this.props.backToPosts}/>
                <h1>{this.props.title}</h1>
                <span>Posted by: {this.props.author}</span>
                <img src={this.props.imageUrl}  alt=""/>
                <p><span className="postContent">Post content:</span> <p className="cont">{this.props.content}</p></p>
                <div>
                    {commentsRow}
                </div>
                {this.addComment(this.props.post, this.props.postId)}
            </div>
        );
    }

    addComment(post, postId) {
        if(sessionStorage.getItem('userId')) {
            return (
                <input type="button" value="Add comment" className="btn btn-lg btn-primary"
                       onClick={this.props.addCommentClicked.bind(this, postId)}/>
            );
        } else {
            return ('');
        }


    }
}


