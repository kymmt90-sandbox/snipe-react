import React, { Component } from 'react';
import Snippet from './Snippet';

class SnippetsShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      author: '',
      content: '',
    };

    this.fetchSnippet = this.fetchSnippet.bind(this);
  }

  render() {
    return (
      <div className="App">
        <Snippet title={this.state.title} author={this.state.author} content={this.state.content} currentPage={this.props.currentPage} onClickBackToIndex={this.props.onClickBackToIndex} />
      </div>
    );
  }

  componentDidMount() {
    this.fetchSnippet();
  }

  fetchSnippet() {
    const url = `http://localhost:3001/snippets/${this.props.id}`;
    this.props.getRequestWithAuth(url)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            title: res.body.title,
            author: res.body.author.name,
            content: res.body.content,
          });
        }
      });
  }
}

export default SnippetsShow;
