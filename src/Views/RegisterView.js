import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import './RegisterView.css'
export default class RegisterView extends Component {
    render() {
        return (
                <form className="form-inline" onSubmit={this.submitForm.bind(this)}>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon glyphicon glyphicon-user"></span>
                            <input type="text" className="form-control" id="username"  placeholder="Enter Username" required
                                   ref={e => this.passwordField = e}/>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon glyphicon glyphicon-lock"></span>
                            <input type="password" className="form-control" placeholder="Enter password" id="password" required
                                   ref={e => this.passwordField = e} />
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon glyphicon glyphicon-lock"></span>
                            <input type="password" className="form-control" placeholder="Confirm-Password" id="confirm-pass" required
                                   ref={e => this.passwordField = e}/>
                        </div>
                    </div>
                   <div>
                    <input className="btn btn-primary" type="submit" value="Submit" />
                   </div>
                </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.usernameField.value,
            this.passwordField.value);
    }
}


