import React, { Component } from 'react';
import Content from './Content.js';

class Snippet extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.author.name}</h2>
        <Content value={this.props.content} />
        <a href="http://localhost:3001/snippets" onClick={this.props.onClickBackToIndex}>Back to snippets</a>
      </div>
    );
  }
}

export default Snippet;
