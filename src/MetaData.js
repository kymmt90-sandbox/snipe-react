import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MetaData extends Component {
  render() {
    return (
      <h1>
        <Link to={`/snippets/${this.props.snippetId}`}>{this.props.title}</Link>
        /
        <Link to={`/users/${this.props.author.id}`}>{this.props.author.name}</Link>
      </h1>
    );
  }
}

export default MetaData;
