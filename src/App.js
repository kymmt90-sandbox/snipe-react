import Paginator from './Paginator';
import parse from 'parse-link-header';
import React, { Component } from 'react';
import request from 'superagent';
import Snippet from './Snippet';
import SnippetsList from './SnippetsList';
import _ from 'lodash';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: 'snippets',
      snippets: [],
      snippet: {},
      firstPage: {},
      lastPage: {},
      nextPage: {},
      previousPage: {}
    }

    this.fetchSnippets = this.fetchSnippets.bind(this);
    this.fetchSnippet = this.fetchSnippet.bind(this);
    this.setPagesToState = this.setPagesToState.bind(this);
    this.handleClickPaginator = this.handleClickPaginator.bind(this);
    this.handleClickSnippetTitle = this.handleClickSnippetTitle.bind(this);
    this.handleClickBackToIndex = this.handleClickBackToIndex.bind(this);
    this.handleClickUserName = this.handleClickUserName.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);

    this.fetchSnippets('http://localhost:3001/snippets');
  }

  handleClickPaginator(event) {
    event.preventDefault();
    this.fetchSnippets(event.target.href);
  }

  handleClickSnippetTitle(event) {
    event.preventDefault();
    this.fetchSnippet(event.target.href);
  }

  handleClickBackToIndex(event) {
    event.preventDefault();
    this.fetchSnippets(event.target.href);
  }

  handleClickUserName(event) {
    event.preventDefault();
    this.fetchUserSnippets(event.target.href);
  }

  getCurrentPage() {
    if (!_.isEmpty(this.state.nextPage)) {
      return this.toDecimalNumber(this.state.nextPage.number) - 1;
    } else {
      return this.toDecimalNumber(this.state.previousPage.number) + 1;
    }
  }

  toDecimalNumber(intRepresentation) {
    return parseInt(intRepresentation, 10)
  }

  fetchSnippet(url) {
    request
      .get(url)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            currentLocation: 'snippet',
            snippet: res.body
          });
        }
      });
  }

  fetchSnippets(url) {
    request
      .get(url)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            currentLocation: 'snippets',
            snippets: res.body
          });
          this.setPagesToState(res);
        }
      });
  }

  fetchUserSnippets(url) {
    request
      .get(url)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            currentLocation: 'user',
            snippets: res.body
          });
          this.setPagesToState(res);
        }
      });
  }

  setPagesToState(res) {
    const linkHeader = parse(res.headers['link']);

    this.setState({
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

  render() {
    if (this.state.currentLocation === 'snippet') {
      return (
        <div className="App">
          <Snippet title={this.state.snippet.title} author={this.state.snippet.author} content={this.state.snippet.content} currentPage={this.getCurrentPage()} onClickBackToIndex={this.handleClickBackToIndex} />
        </div>
      );
    } else if (this.state.currentLocation === 'user') {
      return (
        <div className="App">
          <SnippetsList snippets={this.state.snippets} onClickTitle={this.handleClickSnippetTitle} onClickUserName={this.handleClickUserName} />
          <Paginator first={this.state.firstPage} previous={this.state.previousPage} next={this.state.nextPage} last={this.state.lastPage} onClick={this.handleClickPaginator} />
          <a href="http://localhost:3001/snippets" onClick={this.handleClickPaginator}>Back to all snippets</a>
        </div>
      );
    } else {
      return (
        <div className="App">
          <SnippetsList snippets={this.state.snippets} onClickTitle={this.handleClickSnippetTitle} onClickUserName={this.handleClickUserName} />
          <Paginator first={this.state.firstPage} previous={this.state.previousPage} next={this.state.nextPage} last={this.state.lastPage} onClick={this.handleClickPaginator} />
        </div>
      );
    }
  }
}

export default App;
