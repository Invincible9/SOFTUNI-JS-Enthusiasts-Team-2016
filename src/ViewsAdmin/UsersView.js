import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../styles/buttons.css';

export default class UsersView extends Component {
    render() {
        let userRows = this.props.users.map(user =>
            <tr key={user._id}>
                <td style={{textAlign:'center'}}>{user.username}</td>
                <td style={{textAlign:'center'}}>{user.fullname}</td>
                <td style={{textAlign:'center'}}>{user.roles}</td>
                <td style={{textAlign:'center'}}>{user.isDeleted}</td>
                {this.getActions(user, this.props.userId)}
            </tr>
        );

        return (
            <div className="container">
                <div className="table-responsive">
                    <h1>Users</h1>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>FullName</th>
                            <th>Roles</th>
                            <th>ExistingAccount</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    getActions(user, userId) {
        return (
            <td style={{textAlign:'center'}}>
                <div className="form-group">
                    <input className="btn btn-primary" type="button" value="Edit"
                           onClick={this.props.editUserClicked.bind(this, user._id)}/>
                    &nbsp;
                    <input className="btn btn-primary" type="button" value="Delete"
                           onClick={this.props.deleteUserClicked.bind(this, user._id)}/>
                    &nbsp;
                    <input className="btn btn-primary" type="button" value="Details"
                           onClick={this.props.viewUserDetailsClicked.bind(this, user._id)}/>
                </div>
            </td>
        );

    }
}
