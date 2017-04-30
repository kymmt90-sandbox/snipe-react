import React, { Component } from 'react';
import Content from './Content.js';
import { Link } from 'react-router-dom';

class Snippet extends Component {
  render() {
    const backToSnippetsUrl = '/';
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.author}</h2>
        <Content value={this.props.content} />
        <Link to={backToSnippetsUrl}>Back to snippets</Link>
      </div>
    );
  }
}

export default Snippet;
