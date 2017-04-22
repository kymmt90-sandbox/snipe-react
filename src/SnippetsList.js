import React, { Component } from 'react';
import SnippetSummary from './SnippetSummary.js';

class SnippetsList extends Component {
  render() {
    let snippets = this.props.snippets.map((snippet, index) => {
      return <SnippetSummary key={snippet.id} id={snippet.id} title={snippet.title} author={snippet.author} content={snippet.content} onClickTitle={this.props.onClickTitle} onClickUserName={this.props.onClickUserName} />
    });

    return (
      <div>
        {snippets}
      </div>
    );
  }
}

export default SnippetsList;
