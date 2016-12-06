import React, { Component } from 'react';

export default class EditPostView extends Component {
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
                                        required defaultValue={this.props.title}
                                        ref={e => this.titleField = e}/>
                                <input type="text" className="form-control" placeholder="Author" disabled
                                       defaultValue={this.props.author}
                                       ref={e => this.authorField = e} />
                                <textarea type="text" className="form-control" placeholder="Edit post" rows="20" required
                                          defaultValue={this.props.description}
                                          ref={e => this.descriptionField = e} autoFocus="autoFocus"/>
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Edit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>);
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.props.postId,
            this.titleField.value,
            this.authorField.value,
            this.descriptionField.value,
            this.props.date,
            this.props.imageUrl
        );
    }
}
