import React, { Component } from 'react';
import Snippet from './Snippet';

class SnippetsShow extends Component {
  render() {
    return (
      <div className="App">
        <Snippet title={this.props.title} author={this.props.author} content={this.props.content} currentPage={this.props.currentPage} onClickBackToIndex={this.props.onClickBackToIndex} />
      </div>
    );
  }
}

export default SnippetsShow;
