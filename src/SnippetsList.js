import React, { Component } from 'react';
import Snippet from './Snippet.js';

class SnippetsList extends Component {
  render() {
    let snippets = this.props.snippets.map((snippet, index) => {
      return <Snippet key={snippet.id} id={snippet.id} title={snippet.title} author={snippet.author} content={snippet.content} onClickTitle={this.props.onClickTitle} />
    });

    return (
      <div>
        {snippets}
      </div>
    );
  }
}

export default SnippetsList;
