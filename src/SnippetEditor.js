import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

class SnippetEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      id: null,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postSnippet = this.postSnippet.bind(this);
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  handleContentChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!_.isEmpty(this.state.title) && !_.isEmpty(this.state.content)) {
      this.postSnippet();
    }
  }

  postSnippet() {
    const url = `http://localhost:3001/snippets`;
    const params = {
      title: this.state.title,
      content: this.state.content,
    };
    this.props.postRequestWithAuth(url)
      .send(params)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            id: res.body.id,
          });
        }
      });
  }

  render() {
    if (this.state.id) {
      const url = `http://localhost:3001/snippets/${this.state.id}`
      return (
        <Redirect to={url} />
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
          </label>
          <label>
            Content:
            <textarea value={this.state.content} onChange={this.handleContentChange} />
          </label>
          <input type="submit" value="Create snippet" />
        </form>
      );
    }
  }
}

export default SnippetEditor;
