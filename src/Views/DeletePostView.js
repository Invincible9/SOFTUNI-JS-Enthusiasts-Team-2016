import React, { Component } from 'react';

export default class DeletePostView extends Component {
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
                                        required ref={e => this.titleField = e} defaultValue={this.props.title}/>
                                <input type="text" className="form-control" placeholder="Author" disabled
                                       defaultValue={this.props.author}/>
                                <textarea type="text" className="form-control" placeholder="Create post" rows="20" required
                                          ref={e => this.descriptionField = e} autoFocus  defaultValue={this.props.description} />
                                <div>
                                    <br/>
                                    <font color="red">Please be informed that all comments related to that post will be deleted!!!</font>
                                    <br/><br/>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Delete</button>
                                <span><input type="button" style={{marginTop:'10px', width:'120px', height:'45px'}} value="Cancel" className="btn btn-primary"
                                             onClick={this.props.backToUsers}/></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(this.props.postId);//промених bookId на PostId
    }
}
