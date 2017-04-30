import React, { Component } from 'react';
import LoginForm from './LoginForm';

class LogIn extends Component {
  render() {
    return (
      <div className="App">
        <LoginForm getUserToken={this.props.getUserToken} jwt={this.props.jwt} />
      </div>
    );
  }
}

export default LogIn;
