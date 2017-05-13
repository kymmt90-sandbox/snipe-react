import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

class SnippetEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      resultSnippetId: null,
      completed: false,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postSnippet = this.postSnippet.bind(this);
    this.submitButtonText = this.submitButtonText.bind(this);
    this.isEdit = this.isEdit.bind(this);
  }

  componentDidMount() {
    if (!this.isEdit()) return;

    const snippetUrl = `http://localhost:3001/snippets/${this.props.id}`;
    this.props.getRequestWithAuth(snippetUrl)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            title: res.body.title,
            content: res.body.content
          });
        }
      });
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
      this.isEdit() ? this.patchSnippet() : this.postSnippet();
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
            resultSnippetId: res.body.id,
            completed: true,
          });
        }
      });
  }

  patchSnippet() {
    const url = `http://localhost:3001/snippets/${this.props.id}`;
    const params = {
      title: this.state.title,
      content: this.state.content,
    };
    this.props.patchRequestWithAuth(url)
      .send(params)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            resultSnippetId: res.body.id,
            completed: true,
          });
        }
      });
  }

  submitButtonText() {
    return this.isEdit() ? 'Update snippet' : 'Create snippet'
  }

  isEdit() {
    return !_.isEmpty(this.props.id);
  }

  render() {
    if (this.state.completed) {
      const snippetUrl = `/snippets/${this.state.resultSnippetId}`
      return (
        <Redirect to={snippetUrl} />
      );
    } else {
      let deleteButton = null;
      if (this.isEdit()) {
        deleteButton = <form onSubmit={this.handleDeleteSubmit}>
                         <input type="submit" value="Delete" />
                       </form>
      }
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Title:
              <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
            </label>
            <label>
              Content:
              <textarea value={this.state.content} onChange={this.handleContentChange} />
            </label>
            <input type="submit" value={this.submitButtonText()} />
          </form>
          {deleteButton}
        </div>
      );
    }
  }
}

export default SnippetEditor;
