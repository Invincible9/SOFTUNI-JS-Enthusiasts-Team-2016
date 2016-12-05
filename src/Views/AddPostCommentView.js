import React, { Component } from 'react';

export default class AddPostCommentView extends Component {
    render() {
        return (
            <form className="add-post-comment-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Add post comment</h1>
                <h1>Title: {this.props.title}</h1><br/>
                <div><span className="postContent">Content: </span>{this.props.description}</div><br/>
                <div><span className="postContent">Author: </span>{this.props.postAuthor}</div><br/>

                <label>
                    <div><span className="postContent">Comment: </span></div>

                    <textarea type="text" className="add-comment" placeholder="Add Comment" rows="20" cols="40" required
                              ref={e => this.descriptionField = e} autoFocus />
                </label>
                <div>
                    <button className="btn btn-lg btn-primary btn-add" type="submit">Add</button>
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.props.post._id,
            this.descriptionField.value,
            this.props.commentAuthor
        );
    }
}
