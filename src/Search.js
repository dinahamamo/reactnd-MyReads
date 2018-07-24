import React, { Component } from 'react';
import SearchInput from './SearchInput';
import Book from './Book';

class Search extends Component {

  componentWillUnmount = () => {
    this.props.resetSearch();
  }

  render () {
    const { handleSearch, books, searching, noBooksFound, getCurrentBooks, resetSearch } = this.props;
    return (
      <div className="search-books">
        <SearchInput  handleSearch={handleSearch}
                      resetSearch={resetSearch}
        />
        <div className="search-books-results">
        { (searching)?
            <p className="status">Searching Books..</p>
          : (noBooksFound)?
            <p className="status">No Books Found</p>
          : <ol className="books-grid">
              {books.map((book) => <Book  key={book.id}
                                          book={book}
                                          getCurrentBooks={getCurrentBooks}
                                    />)
              }
            </ol>
          }
        </div>
      </div>
    )
  }
}

export default Search;