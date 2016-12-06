import React, {Component} from 'react';
import '../styles/Forms-Style.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

export default class PostDetailsView extends Component {
    render() {
        return (
            <div className="container">
                    <input type="button" value="Back to Users" className="btn btn-lg btn-primary" style={{marginBottom:'10px'}}
                           onClick={this.props.backToUsers}/>
                <div className="details-view">
                    <p>UserName: {this.props.username}</p>
                    <p>FullName: {this.props.fullname}</p>
                    <p>Roles: {this.props.roles}</p>
                    <p>Deleted user: {this.props.isDeleted}</p>
                </div>
            </div>
        );
    }
}
