import React, { Component } from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import ChatScreen from './ChatScreen';

import './Chat.css';

class ChatContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      showing: false
    };
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({ username: this.props.auth.user.name });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.setState({ username: nextProps.auth.user.name });
    }
  }

  handleClickOutside = evt => {
    this.setState({ showing: false });
  };

  render() {
    const { showing } = this.state;

    const noUsername = <div>Please sign in to Chat!</div>;

    const usernameExists = <ChatScreen username={this.state.username} />;

    const showingContent = (
      <div className='chat-box'>
        {this.props.auth.isAuthenticated ? usernameExists : noUsername}
      </div>
    );

    return (
      <div className='chat-container'>
        {showing ? showingContent : null}
        <div className='chat-icon' onClick={() => this.setState({ showing: !showing })}>
          <i className='fas fa-comment-alt' />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(onClickOutside(ChatContainer));
