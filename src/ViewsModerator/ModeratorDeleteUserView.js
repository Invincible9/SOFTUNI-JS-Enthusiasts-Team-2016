import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../styles/Forms-Style.css';
import '../styles/buttons.css';

export default class DeleteUserView extends Component {
    render() {
        return (
            <div className="container">
                <form className="edit-book-form" onSubmit={this.submitForm.bind(this)}>

                    <div className="form-group">
                        <h1>Edit Post</h1>
                        <label>
                            <div>Username:</div>
                            <input className="form-control" type="text" name="title" required disabled="disabled"
                                   defaultValue={this.props.username}
                                   ref={e => this.username = e}/>
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            <div>FullName:</div>
                            <input className="form-control" type="text" name="author" required disabled="disabled"
                                   defaultValue={this.props.fullname}
                                   ref={e => this.fullname = e}/>
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            <div>Roles:</div>
                            <input className="form-control" name="description" disabled="disabled"
                                   defaultValue={this.props.roles}
                                   ref={e => this.roles = e}/>
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            <div>ExistingAccount:</div>
                            <input className="form-control" name="description" disabled="disabled"
                                   defaultValue={this.props.isDeleted}
                                   ref={e => this.isDeleted = e}/>
                        </label>
                    </div>

                    <div className="form-group">
                        <div>
                            <input className="btn btn-danger" type="submit" value="DELETE"/>
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
            this.username.value,
            this.props.repeat,
            this.fullname.value,
            this.roles.value,
            this.isDeleted.value = "true",
        );
    }
}
