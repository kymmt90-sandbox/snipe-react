import React, { Component } from 'react';
import LoginForm from './LoginForm';

class LogIn extends Component {
  render() {
    return (
      <div className="App">
        <LoginForm getUserToken={this.props.getUserToken} loggedIn={this.props.loggedIn} />
      </div>
    );
  }
}

export default LogIn;
