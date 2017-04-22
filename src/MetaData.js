import React, { Component } from 'react';

class MetaData extends Component {
  render() {
    return (
        <h1><a href={`http://localhost:3001/snippets/${this.props.snippetId}`} onClick={this.props.onClickTitle}>{this.props.title}</a> / <a href={`http://localhost:3001/users/${this.props.author.id}/snippets`} onClick={this.props.onClickUserName}>{this.props.author.name}</a></h1>
    );
  }
}

export default MetaData;
