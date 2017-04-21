import React, { Component } from 'react';
import _ from 'lodash';

class Paginator extends Component {
  render() {
    let pageItems = [
      <li key="first"><a href={this.props.first.url} onClick={this.props.onClick}>first</a></li>
    ];

    if (!_.isEmpty(this.props.previous)) {
      pageItems.push(<li key="previous"><a href={this.props.previous.url} onClick={this.props.onClick}>&lt;</a></li>);
    }

    if (!_.isEmpty(this.props.next)) {
      pageItems.push(<li key="next"><a href={this.props.next.url} onClick={this.props.onClick}>&gt;</a></li>);
    }

    pageItems.push(<li key="last"><a href={this.props.last.url} onClick={this.props.onClick}>last</a></li>);

    return (
      <ul>
        {pageItems}
      </ul>
    );
  }
}

export default Paginator;
