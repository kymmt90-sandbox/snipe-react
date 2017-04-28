import LogIn from './LogIn';
import Paginator from './Paginator';
import parse from 'parse-link-header';
import React, { Component } from 'react';
import request from 'superagent';
import Snippet from './Snippet';
import SnippetsIndex from './SnippetsIndex';
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
      previousPage: {},
      jwt: ''
    }

    this.fetchSnippets = this.fetchSnippets.bind(this);
    this.fetchSnippet = this.fetchSnippet.bind(this);
    this.setPagesToState = this.setPagesToState.bind(this);
    this.handleClickPaginator = this.handleClickPaginator.bind(this);
    this.handleClickSnippetTitle = this.handleClickSnippetTitle.bind(this);
    this.handleClickBackToIndex = this.handleClickBackToIndex.bind(this);
    this.handleClickUserName = this.handleClickUserName.bind(this);
    this.handleClickLogIn = this.handleClickLogIn.bind(this);
    this.moveToLogInPage = this.moveToLogInPage.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.getUserToken = this.getUserToken.bind(this);
    this.getRequestWithAuth = this.getRequestWithAuth.bind(this);
    this.postRequestWithAuth = this.postRequestWithAuth.bind(this);

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

  handleClickLogIn(event) {
    event.preventDefault();
    this.moveToLogInPage();
  }

  moveToLogInPage() {
    this.setState({
      currentLocation: 'log_in'
    });
  }

  getCurrentPage() {
    if (!_.isEmpty(this.state.nextPage)) {
      return this.toDecimalNumber(this.state.nextPage.number) - 1;
    } else {
      return this.toDecimalNumber(this.state.previousPage.number) + 1;
    }
  }

  getUserToken(email, password) {
    const params = {
      auth: {
        email: email,
        password: password
      }
    };

    this.postRequestWithAuth('http://localhost:3001/user_token')
      .send(params)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          if (res.body.jwt) {
            this.setState({
              jwt: res.body.jwt,
              currentLocation: 'snippets'
            });
          } else {
            this.setState({
              jwt: ''
            });
          }
        }
      });
  }

  toDecimalNumber(intRepresentation) {
    return parseInt(intRepresentation, 10)
  }

  fetchSnippet(url) {
    this.getRequestWithAuth(url)
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
    this.getRequestWithAuth(url)
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
    this.getRequestWithAuth(url)
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

  getRequestWithAuth(url) {
    if (this.state.jwt) {
      return request.get(url).accept('json').set('Authorization', `Bearer ${this.state.jwt}`);
    } else {
      return request.get(url).accept('json');
    }
  }

  postRequestWithAuth(url) {
    if (this.state.jwt) {
      return request.post(url).accept('json').set('Authorization', `Bearer ${this.state.jwt}`);
    } else {
      return request.post(url).accept('json');
    }
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
    } else if (this.state.currentLocation === 'log_in') {
      return (
        <LogIn getUserToken={this.getUserToken} />
      );
    } else {
      return (
        <SnippetsIndex snippets={this.state.snippets} onClickLogIn={this.handleClickLogIn} onClickSnippetTitle={this.handleClickSnippetTitle} onClickUserName={this.handleClickUserName} first={this.state.firstPage} previous={this.state.previousPage} next={this.state.nextPage} last={this.state.lastPage} onClickPaginator={this.handleClickPaginator} />
      );
    }
  }
}

export default App;
