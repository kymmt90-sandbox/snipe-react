import React, { Component } from 'react';
import Snippet from './Snippet.js';

class SnippetsList extends Component {
  render() {
    let snippets = this.props.snippets.map((snippet, index) => {
      return <Snippet key={index} title={snippet.title} author={snippet.author} content={snippet.content} />
    });

    return (
      <div>
        {snippets}
      </div>
    );
  }
}

export default SnippetsList;
