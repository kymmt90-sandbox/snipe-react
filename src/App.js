import React, { Component } from 'react';
import SnippetsList from './SnippetsList';
import './App.css';

class App extends Component {
  render() {
    let snippets = [
      {title: 'Snippet 1', author: 'John Smith', content: 'Lorem Ipsum'},
      {title: 'Snippet 2', author: 'John Smith', content: 'Lorem Ipsum'},
      {title: 'Snippet 3', author: 'John Smith', content: 'Lorem Ipsum'},
    ];

    return (
      <div className="App">
        <SnippetsList snippets={snippets} />
      </div>
    );
  }
}

export default App;
