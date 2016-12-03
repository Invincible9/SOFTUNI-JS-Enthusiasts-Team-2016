import React, { Component } from 'react';

export default class AddPostCommentView extends Component {
    render() {
        return (
            <form className="edit-book-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Add post comment</h1>
                <div><strong>Title: </strong>{this.props.title}</div><br/>
                <div><strong>Content: </strong>{this.props.description}</div><br/>
                <div><strong>Author: </strong>{this.props.postAuthor}</div><br/>

                <label>
                    <div><strong>Comment:</strong></div>
                    <textarea name="description" rows="10"
                              defaultValue={''}
                              ref={e => this.descriptionField = e} />
                </label>
                <div>
                    <input type="submit" value="Add" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.props,
            this.props.post._id,
            this.props.imageUrl,
            this.props.description, // This is actually the current post content!!!
            this.props.postAuthor,
            this.descriptionField.value,
            this.props.commentAuthor
        );
    }
}
