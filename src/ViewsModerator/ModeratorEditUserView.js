/**
 * Created by Mihail on 12/3/2016.
 */
import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../styles/Forms-Style.css'
import '../styles/buttons.css';

export default class EditUserView extends Component {

    render() {
        return (
            <div className="container">
                <form className="edit-user-form" onSubmit={this.submitForm.bind(this)}>

                    <div className="form-group">
                        <h1>Edit User</h1>
                        <label>
                            <div>Username:</div>
                            <input className="form-control" type="text" name="username" required
                                   defaultValue={this.props.username}
                                   ref={e => this.usernameField = e}/>
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            <div>Password:</div>
                            <input className="form-control" type="text" name="password" required
                                   defaultValue={this.props.repeat}
                                   ref={e => this.passwordField = e}/>
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            <div>Repeat:</div>
                            <input className="form-control" type="text" name="repeat" required
                                   defaultValue={this.props.repeat}
                                   ref={e => this.repeatField = e}/>
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            <div>FullName:</div>
                            <input className="form-control" type="text" name="fullname" required
                                   defaultValue={this.props.fullname}
                                   ref={e => this.fullnameField = e}/>
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            <div>Roles: <i><b>user</b>/<b>admin</b>/<b>moderator</b></i></div>
                            <input className="form-control" type="text" name="roles" required
                                   defaultValue={this.props.roles}
                                   ref={e => this.rolesField = e}/>
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            <div>Deleted user: <i><b>true</b>/<b>false</b></i></div>
                            <input className="form-control" type="text" name="isDeleted"
                                   defaultValue={this.props.isDeleted}
                                   ref={e => this.isDeletedField = e}/>
                        </label>
                    </div>

                    <div className="btn-group">
                        <div>
                            <span><input className="btn btn-danger" type="submit" value="Edit"/></span>
                            <span style={{marginLeft:'90px'}}><input type="button" value="Cancel" className="btn btn-primary"
                                                                     onClick={this.props.backToUsers}/></span>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.props.userId,
            this.usernameField.value,
            this.passwordField.value,
            this.repeatField.value,
            this.fullnameField.value,
            this.rolesField.value,
            this.isDeletedField.value
        );
    }
}
