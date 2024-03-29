import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAllUsers, deleteUser } from '../../actions/adminActions';

import './Admin.css';

class AdminUser extends Component {
  constructor() {
    super();
    this.state = {
      allUsers: [],
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated && !this.props.auth.user.role) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allUsers: nextProps.admin.getUsers
    });
  }

  onClickDelete(id) {
    this.props.deleteUser(id, this.props.history);
  }

  onClickEdit(id, user) {
    this.props.history.push({
      pathname: `/admin/users/${id}`,
      state: {
        key: user
      }
    });
  }

  render() {
    const users = this.state.allUsers.map(user => (
      <tr key={user._id}>
        <th scope='row'>{user.name}</th>
        <td>{user.email}</td>
        <td>
          <button
            onClick={this.onClickEdit.bind(this, user._id, user)}
            type='button'
            className='btn btn-info'
          >
            Edit
          </button>
          <button
            onClick={this.onClickDelete.bind(this, user._id)}
            type='button'
            className='btn btn-danger'
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div className='container'>
        <Link to='/admin/dashboard' className='btn btn-secondary'>
          Back
        </Link>
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>Username</th>
                <th scope='col'>Email</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>{users}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.admin,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllUsers, deleteUser }
)(withRouter(AdminUser));
