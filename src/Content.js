import React, { Component } from 'react';

class Content extends Component {
  render() {
    return (
      <div>
        {this.props.value}
      </div>
    );
  }
}

export default Content;
