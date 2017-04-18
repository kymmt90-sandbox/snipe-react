import React, { Component } from 'react';
import MetaData from './MetaData.js';
import Content from './Content.js';

class Snippet extends Component {
  render() {
    return (
      <div>
        <MetaData title={this.props.title} author={this.props.author} />
        <Content value={this.props.content} />
      </div>
    );
  }
}

export default Snippet;
