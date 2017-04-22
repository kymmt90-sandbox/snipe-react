import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    if (event.target.type === 'text') {
      this.setState({
        email: event.target.value,
      });
    } else if (event.target.type === 'password') {
      this.setState({
        password: event.target.value,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.getUserToken(this.state.email, this.state.password);
  }

  render() {
    return (
      <div>
        <h1>Log in</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="text" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input type="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
