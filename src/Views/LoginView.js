import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

export default class LoginView extends Component {
    render() {
        return (

            <form className="form-horizontal" onSubmit={this.submitForm.bind(this)}>
                <h1>Login</h1>
                <label>
                    <div>Username:</div>
                    <input type="text" name="username" required
                           ref={e => this.usernameField = e} />
                </label>

                <label>

                    <div>Password:</div>
                    <input type="password" name="password" required
                           ref={e => this.passwordField = e} />
                </label>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>

            // <form role="form">
            //     <div className="row">
            //         <div className="col-xs-3 col-sm-3 col-md-3">
            //             <div className="form-group">
            //                 <input type="text" name="first_name" id="first_name" className="form-control input-sm" placeholder="First Name"/>
            //             </div>
            //         </div>
            //         <div className="col-xs-3 col-sm-3 col-md-3">
            //             <div className="form-group">
            //                 <input type="text" name="last_name" id="last_name" className="form-control input-sm" placeholder="Last Name"/>
            //             </div>
            //         </div>
            //     </div>
            //
            //     <div className="form-group">
            //         <input type="email" name="email" id="email" className="form-control input-sm" placeholder="Email Address"/>
            //     </div>
            //
            //     <div className="row">
            //         <div className="col-xs-3 col-sm-3 col-md-3">
            //             <div className="form-group">
            //                 <input type="password" name="password" id="password" className="form-control input-sm" placeholder="Password"/>
            //             </div>
            //         </div>
            //         <div className="col-xs-3 col-sm-3 col-md-3">
            //             <div className="form-group">
            //                 <input type="password" name="password_confirmation" id="password_confirmation" className="form-control input-sm" placeholder="Confirm Password"/>
            //             </div>
            //         </div>
            //     </div>
            //
            //     <input type="submit" value="Register" className="btn btn-info btn-block" />
            //
            // </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.usernameField.value,
            this.passwordField.value);
    }
}
