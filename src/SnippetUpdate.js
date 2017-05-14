import React, { Component } from 'react';
import SnippetEditor from './SnippetEditor.js';

class SnippetUpdate extends Component {
  render() {
    return (
      <div className="App">
        <h1>Update the snippet</h1>
        <SnippetEditor id={this.props.id} getRequestWithAuth={this.props.getRequestWithAuth} patchRequestWithAuth={this.props.patchRequestWithAuth} deleteRequestWithAuth={this.props.deleteRequestWithAuth} />
      </div>
    );
  }
}

export default SnippetUpdate;
