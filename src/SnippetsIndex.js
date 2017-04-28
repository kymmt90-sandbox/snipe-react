import React, { Component } from 'react';
import SnippetsList from './SnippetsList';
import Paginator from './Paginator';

class SnippetsIndex extends Component {
  render() {
    return (
      <div className="App">
        <a href="#" onClick={this.props.onClickLogIn}>Log in</a>
        <SnippetsList snippets={this.props.snippets} onClickTitle={this.props.onClickSnippetTitle} onClickUserName={this.props.onClickUserName} />
        <Paginator first={this.props.first} previous={this.props.previous} next={this.props.next} last={this.props.last} onClick={this.props.onClickPaginator} />
      </div>
    )
  }
}

export default SnippetsIndex;
