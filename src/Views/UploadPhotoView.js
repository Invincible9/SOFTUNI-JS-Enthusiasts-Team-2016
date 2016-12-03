import React, { Component } from 'react';

export default class UploadPhotoView extends Component {
    render() {
        return (
            <form className="upload-photo-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Upload Image</h1>
                <label>
                    <div>Title:</div>
                    <input type="text" name="title" required
                           ref={e => this.titleField = e} />
                </label>
                <label>
                    <div>Image Url:</div>
                    <input type="url" name="image" required
                           ref={e => this.imageField = e} />
                </label>
                <label>
                    <div>Description:</div>
                    <textarea name="description" rows="3"
                              ref={e => this.descriptionField = e} />
                </label>

                <div>
                    <input type="submit" value="Upload" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.titleField.value,
            this.descriptionField.value,
            this.imageField.value
        );
    }
}

