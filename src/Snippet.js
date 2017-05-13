import React, { Component } from 'react';
import Content from './Content.js';

class Snippet extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.author}</h2>
        <Content value={this.props.content} />
      </div>
    );
  }
}

export default Snippet;
