import Paginator from './Paginator';
import parse from 'parse-link-header';
import React, { Component } from 'react';
import request from 'superagent';
import SnippetsList from './SnippetsList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippets: [],
      firstPage: {},
      lastPage: {},
      nextPage: {},
      previousPage: {}
    }

    this.fetchSnippets = this.fetchSnippets.bind(this);
    this.handleClickPaginator = this.handleClickPaginator.bind(this);

    this.fetchSnippets('http://localhost:3001/snippets');
  }

  handleClickPaginator(event) {
    event.preventDefault();
    this.fetchSnippets(event.target.href);
  }

  fetchSnippets(url) {
    request
      .get(url)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          const linkHeader = parse(res.headers['link']);

          this.setState({
            snippets: res.body,
            firstPage: {
              number: linkHeader.first.page,
              url: linkHeader.first.url
            },
            lastPage: {
              number: linkHeader.last.page,
              url: linkHeader.last.url
            }
          });

          if (linkHeader.previous) {
            this.setState({
              previousPage: {
                number: linkHeader.previous.page,
                url: linkHeader.previous.url
              }
            });
          } else {
            this.setState({
              previousPage: {}
            });
          }

          if (linkHeader.next) {
            this.setState({
              nextPage: {
                number: linkHeader.next.page,
                url: linkHeader.next.url
              }
            });
          } else {
            this.setState({
              nextPage: {}
            });
          }
        }
      });
  }

  render() {
    return (
      <div className="App">
        <SnippetsList snippets={this.state.snippets} />
        <Paginator first={this.state.firstPage} previous={this.state.previousPage} next={this.state.nextPage} last={this.state.lastPage} onClick={this.handleClickPaginator} />
      </div>
    );
  }
}

export default App;
