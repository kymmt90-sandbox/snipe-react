import React, { Component } from 'react';
import SnippetsList from './SnippetsList';
import Paginator from './Paginator';
import { Link } from 'react-router-dom';

class SnippetsIndex extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/login">Log in</Link>
        <SnippetsList snippets={this.props.snippets} />
        <Paginator first={this.props.first} previous={this.props.previous} next={this.props.next} last={this.props.last} onClick={this.props.onClickPaginator} />
      </div>
    )
  }
}

export default SnippetsIndex;
