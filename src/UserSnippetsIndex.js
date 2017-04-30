import React, { Component } from 'react';
import SnippetsList from './SnippetsList';
import Paginator from './Paginator';
import { Link } from 'react-router-dom';

class UserSnippetsIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snippets: [],
    };

    this.fetchUserSnippets = this.fetchUserSnippets.bind(this);
  }

  render() {
    return (
      <div className="App">
        <SnippetsList snippets={this.state.snippets} />
        <Paginator first={this.props.first} previous={this.props.previous} next={this.props.next} last={this.props.last} onClick={this.props.onClickPaginator} />
        <Link to="/">Back to all snippets</Link>
      </div>
    );
  }

  componentDidMount() {
    this.fetchUserSnippets();
  }

  fetchUserSnippets() {
    const url = `http://localhost:3001/users/${this.props.id}/snippets`;
    this.props.getRequestWithAuth(url)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            snippets: res.body
          });
        }
      });
  }
}

export default UserSnippetsIndex;
