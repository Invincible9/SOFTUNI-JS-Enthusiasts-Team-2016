import React, { Component } from 'react';
import '../styles/Forms-Style.css'

export default class CreatePostView extends Component {
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
                                <input type="text" className="form-control" placeholder="Author" disabled
                                       defaultValue={this.props.username}/>
                                <input  type="url" className="form-control" placeholder="Enter Image Url" name="image"
                                        ref={e => this.imageField = e}/>
                                <textarea type="text" className="form-control" placeholder="Create post" rows="20" required
                                          ref={e => this.descriptionField = e} autoFocus />
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>);
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.titleField.value,
            this.props.username,
            this.descriptionField.value,
            this.imageField.value,
        );
    }
}


// <form className="post-article-form" onSubmit={this.submitForm.bind(this)}>
//
//     <h1>Create Post</h1>
//     <label>
//         <span>Title:</span>
//         <input className="title" type="text" name="title" required ref={e => this.titleField = e}/>
//     </label>
//     <label>
//         <span>Author:</span>
//         <input className="author" type="text" name="author" disabled
//                defaultValue={this.props.username}/>
//     </label>
//     <label>
//         <span>Image:</span>
//         <input className="image" type="url" name="image"
//                ref={e => this.imageField = e}/>
//     </label>
//     <label>
//         <span>Description:</span>
//         <textarea className="description" name="description" rows="10"
//                   ref={e => this.descriptionField = e}/>
//     </label>
//
//     <div>
//         <input type="submit" value="Create"/>
//     </div>
// </form>
