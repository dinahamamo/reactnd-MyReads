import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchInput extends Component {
  state = {
    term: ''
  }

  handleInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState(() => ({
      term: value
    }))
      this.props.handleSearch(value);
  }

  render() {
    const { term } = this.state;
    return (
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input  type="text"
                  placeholder="Search by title or author"
                  value={term}
                  onChange={this.handleInput}/>
        </div>
      </div>
    )
  }
}

export default SearchInput;