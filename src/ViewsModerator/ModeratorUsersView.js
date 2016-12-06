import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../styles/Forms-Style.css'
import '../styles/buttons.css';

export default class ModeratorUsersView extends Component {
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


        if (user.roles === "user") {
            return (
                <td style={{textAlign:'center'}}>
                    <input type="button" className="btn btn-primary" value="Edit"
                           onClick={this.props.editModeratorUserClicked.bind(this, user._id)}/>
                    &nbsp;
                    <input type="button" className="btn btn-primary" value="Delete"
                           onClick={this.props.deleteModeratorUserClicked.bind(this, user._id)}/>
                    &nbsp;
                    <input type="button" className="btn btn-primary" value="Details"
                           onClick={this.props.viewModeratorUserDetailsClicked.bind(this, user._id)}/>
                </td>
            );
        } else if (user.roles === "admin" || user.roles === "moderator") {
            return (
                <td style={{textAlign:'center'}}>
                    <input type="button" className="btn btn-primary" value="Details"
                           onClick={this.props.viewModeratorUserDetailsClicked.bind(this, user._id)}/>
                </td>
            );
        }
    }
}
