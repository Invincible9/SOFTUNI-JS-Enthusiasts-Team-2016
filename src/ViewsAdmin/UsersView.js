import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../styles/buttons.css';

export default class UsersView extends Component {
    render() {
        let userRows = this.props.users.map(user =>
            <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.fullname}</td>
                <td>{user.roles}</td>
                <td>{user.isDeleted}</td>
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
        if (user.roles === "user") {
            return (
                <td>
                    <input type="button" className="btn btn-primary" value="Edit"
                           onClick={this.props.editUserClicked.bind(this, user._id)}/>
                    &nbsp;
                    <input type="button" className="btn btn-primary" value="Delete"
                           onClick={this.props.deleteUserClicked.bind(this, user._id)}/>
                    <input type="button" className="btn btn-primary" value="Details"
                           onClick={this.props.viewUserDetailsClicked.bind(this, user._id)}/>
                </td>
            );
        } else if (user.roles === "admin") {
            return (
                <td>
                    <input type="button" className="btn btn-primary" value="Details"
                           onClick={this.props.viewUserDetailsClicked.bind(this, user._id)}/>
                </td>
            );
        }
        else if (user.roles === "moderator") {
            return (
                <td>
                    <input type="button" className="btn btn-primary" value="Details"
                           onClick={this.props.viewUserDetailsClicked.bind(this, user._id)}/>
                </td>
            );
        }
    }
}
