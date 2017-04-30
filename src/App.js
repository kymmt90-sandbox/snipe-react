import LogIn from './LogIn';
import React, { Component } from 'react';
import SnippetShow from './SnippetShow';
import SnippetsIndex from './SnippetsIndex';
import UserSnippetsIndex from './UserSnippetsIndex';
import parse from 'parse-link-header';
import request from 'superagent';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import _ from 'lodash';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippets: [],
      firstPage: {},
      lastPage: {},
      nextPage: {},
      previousPage: {},
      jwt: ''
    }

    this.fetchSnippets = this.fetchSnippets.bind(this);
    this.setPagesToState = this.setPagesToState.bind(this);
    this.handleClickPaginator = this.handleClickPaginator.bind(this);
    this.handleClickUserName = this.handleClickUserName.bind(this);
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

  fetchSnippets(url) {
    this.getRequestWithAuth(url)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
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
    const mySnippetsIndex = ({ match }) => (
        <SnippetsIndex snippets={this.state.snippets} onClickSnippetTitle={this.handleClickSnippetTitle} onClickUserName={this.handleClickUserName} first={this.state.firstPage} previous={this.state.previousPage} next={this.state.nextPage} last={this.state.lastPage} onClickPaginator={this.handleClickPaginator} />
    );

    const myUserSnippetsIndex = ({ match }) => (
      <UserSnippetsIndex id={match.params.id} first={this.state.firstPage} previous={this.state.previousPage} next={this.state.nextPage} last={this.state.lastPage} onClickPaginator={this.handleClickPaginator} getRequestWithAuth={this.getRequestWithAuth}  />
    );

    const mySnippetShow = ({ match }) => (
      <SnippetShow id={match.params.id} currentPage={this.getCurrentPage()} getRequestWithAuth={this.getRequestWithAuth} />
    );

    const myLogIn = ({ match }) => (
      <LogIn getUserToken={this.getUserToken} jwt={this.state.jwt} />
    );

    return(
      <Router>
        <div>
          <Route exact path="/" component={mySnippetsIndex} />
          <Route path="/users/:id" component={myUserSnippetsIndex} />
          <Route path="/snippets/:id" component={mySnippetShow} />
          <Route path="/login" component={myLogIn} />
        </div>
      </Router>
    );
  }
}

export default App;
