import React, { Component } from 'react';
import MetaData from './MetaData.js';
import Content from './Content.js';

class Snippet extends Component {
  render() {
    return (
      <div>
        <MetaData snippetId={this.props.id} title={this.props.title} author={this.props.author.name} onClickTitle={this.props.onClickTitle} />
        <Content value={this.props.content} />
      </div>
    );
  }
}

export default Snippet;
