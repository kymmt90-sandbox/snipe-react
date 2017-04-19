import React, { Component } from 'react';
import request from 'superagent';
import SnippetsList from './SnippetsList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippets: [],
    }
    this.fetchSnippets = this.fetchSnippets.bind(this);
  }

  fetchSnippets() {
    request
      .get('http://localhost:3001/snippets')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            snippets: res.body
          });
        }
      });
  }

  componentWillMount() {
    this.fetchSnippets();
  }

  render() {
    return (
      <div className="App">
        <SnippetsList snippets={this.state.snippets} />
      </div>
    );
  }
}

export default App;
