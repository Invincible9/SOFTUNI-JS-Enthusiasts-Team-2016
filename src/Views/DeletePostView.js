import React, { Component } from 'react';

export default class DeletePostView extends Component {
    render() {
        return (
            <form className="delete-post-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Confirm - Delete Post</h1>
                <label>
                    <div>Title:</div>
                    <input type="text" name="title" disabled
                           defaultValue={this.props.title} />
                </label>
                <label>
                    <div>Author:</div>
                    <input type="text" name="author" disabled
                           defaultValue={this.props.author} />
                </label>
                <label>
                    <div>Description:</div>
                    <textarea name="description" rows="10" disabled
                              defaultValue={this.props.description} />
                </label>
                <div>
                    <br/>
                        <font color="red">Please be informed that all comments related to that post will be deleted!!!</font>
                    <br/><br/>
                </div>
                <div>
                    <input type="submit" value="Delete" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(this.props.postId);//промених bookId на PostId
    }
}
