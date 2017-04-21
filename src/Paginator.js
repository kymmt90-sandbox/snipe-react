import React, { Component } from 'react';
import _ from 'lodash';

class Paginator extends Component {
  render() {
    let pageItems = [
      <li key="first"><a href="#">first</a></li>
    ];

    if (!_.isEmpty(this.props.previous)) {
      pageItems.push(<li key="previous"><a href="#">&lt;</a></li>);
    }

    if (!_.isEmpty(this.props.next)) {
      pageItems.push(<li key="next"><a href="#">&gt;</a></li>);
    }

    pageItems.push(<li key="last"><a href="#">last</a></li>);

    return (
      <ul>
        {pageItems}
      </ul>
    );
  }
}

export default Paginator;
