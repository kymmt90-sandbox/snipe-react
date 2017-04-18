import React, { Component } from 'react';

class MetaData extends Component {
  render() {
    return (
      <h1>{this.props.title} / {this.props.author}</h1>
    );
  }
}

export default MetaData;
