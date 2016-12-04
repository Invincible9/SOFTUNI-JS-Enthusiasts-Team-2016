// import React, { Component } from 'react';
//
// export default class PostDetailsView extends Component {
//     render() {
//         return (
//             <div className="details-view">
//                 <h1>Author: {this.props.author}</h1>
//                 <img src={this.props.imageUrl} alt=""/>
//                 <p>Content: {this.props.content}</p>
//             </div>
//         );
//     }
// }


import React, { Component } from 'react';

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
                <h1>Post author: {this.props.author}</h1>
                <img src={this.props.imageUrl} alt=""/>
                <p>Post content: {this.props.content}</p>
                <div>
                    {commentsRow}
                </div>

                {this.addComment(this.props.post, this.props.postId)}
            </div>
        );
    }

    addComment(post, postId) {
        return (
            <input type="button" value="Add comment"
                   onClick={this.props.addCommentClicked.bind(this, postId)} />
        );


    }
}


