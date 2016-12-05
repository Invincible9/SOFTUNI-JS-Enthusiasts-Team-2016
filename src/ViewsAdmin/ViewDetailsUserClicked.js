import React, {Component} from 'react';
import '../styles/Forms-Style.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

export default class PostDetailsView extends Component {
    render() {
        return (
            <div className="container">
                <div className="details-view">
                    <p>UserName: {this.props.username}</p>
                    <p>FullName: {this.props.fullname}</p>
                    <p>Roles: {this.props.roles}</p>
                    <p>ExistingAccount: {this.props.isDeleted}</p>
                </div>
            </div>
        );
    }
}
