import React, { Component } from 'react';

export default class CreatePostView extends Component {
    render() {
        return (
            <form className="post-article-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Create Post</h1>
                <label>
                    <div>Title:</div>
                    <input type="text" name="title" required
                        ref={e => this.titleField = e} />
                </label>
                <label>
                    <div>Author:</div>
                    <input type="text" name="author" required
                       ref={e => this.authorField = e} />
                </label>
                <label>
                    <div>Image:</div>
                    <input type="url" name="image" required
                           ref={e => this.imageField = e} />
                </label>
                <label>
                    <div>Description:</div>
                    <textarea name="description" rows="10"
                        ref={e => this.descriptionField = e} />
                </label>

                <div>
                    <input type="submit" value="Create" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.titleField.value,
            this.authorField.value,
            this.descriptionField.value,
            this.imageField.value,
        );
    }
}
