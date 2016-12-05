import React, { Component } from 'react';

export default class UploadPhotoView extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <div className="account-wall">
                            <img className="profile-img"
                                 src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                                 alt=""/>
                            <form className="form-signin" onSubmit={this.submitForm.bind(this)}>
                                <input  type="text" className="form-control" placeholder="Title" name="title"
                                        required ref={e => this.titleField = e}/>
                                <input  type="url" className="form-control" placeholder="Enter Image Url" name="image"
                                        ref={e => this.imageField = e}/>
                                <textarea type="text" className="form-control" placeholder="Description" rows="20" required
                                          ref={e => this.descriptionField = e} autoFocus />
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Upload</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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

