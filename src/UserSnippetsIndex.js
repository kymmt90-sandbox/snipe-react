import React, { Component } from 'react';
import SnippetsList from './SnippetsList';
import Paginator from './Paginator';

class UserSnippetsIndex extends Component {
  render() {
    return (
      <div className="App">
        <SnippetsList snippets={this.props.snippets} onClickTitle={this.props.onClickTitle} onClickUserName={this.props.onClickUserName} />
        <Paginator first={this.props.first} previous={this.props.previous} next={this.props.next} last={this.props.last} onClick={this.props.onClickPaginator} />
        <a href="http://localhost:3001/snippets" onClick={this.props.onClickPaginator}>Back to all snippets</a>
      </div>
    );
  }
}

export default UserSnippetsIndex;
