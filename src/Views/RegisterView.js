import React, {Component} from 'react';

export default class RegisterView extends Component {
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
                                <input type="text" className="form-control" placeholder="Username" required
                                       ref={e => this.usernameField = e} autoFocus/>
                                <input type="password" id="password" className="form-control" placeholder="Password"
                                       required
                                       ref={e => this.passwordField = e}/>
                                <input type="password" id="repeat" className="form-control" placeholder="Repeat"
                                       required
                                       ref={e => this.repeatField = e}/>
                                <input type="text" className="form-control" placeholder="FullName" required
                                       ref={e => this.fullnameField = e}/>
                                <button className="btn btn-lg btn-primary btn-block" type="Register">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>);
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(

            this.usernameField.value,
            this.passwordField.value,
            this.repeatField.value,
            this.fullnameField.value,
            "user",
            "false"
        );
    }
}
