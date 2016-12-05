import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../styles/Forms-Style.css'
import '../styles/buttons.css';

export default class ModeratorUsersView extends Component {
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
        return (
            <td>
                <div className="form-group">
                    <input className="btn btn-primary" type="button" value="Edit"
                           onClick={this.props.editModeratorUserClicked.bind(this, user._id)}/>
                    &nbsp;
                    <input className="btn btn-primary" type="button" value="Delete"
                           onClick={this.props.deleteModeratorUserClicked.bind(this, user._id)}/>
                    <input className="btn btn-primary" type="button" value="Details"
                           onClick={this.props.viewModeratorUserDetailsClicked.bind(this, user._id)}/>
                </div>
            </td>
        );
    }
}
