import React, { Component } from 'react';
import SnippetEditor from './SnippetEditor.js';

class SnippetCreate extends Component {
  render() {
    return (
      <div className="App">
        <h1>Create a new snippet</h1>
        <SnippetEditor postRequestWithAuth={this.props.postRequestWithAuth} />
      </div>
    );
  }
}

export default SnippetCreate;
