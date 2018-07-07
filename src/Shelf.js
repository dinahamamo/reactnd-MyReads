import React, { Component } from 'react';
import Book from './Book';

class Shelf extends Component {
  render() {
    const { shelfTitle, shelfBooks, handleChange, loading } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelfBooks.map(book => <Book key={book.id} book={book} handleChange={handleChange} loading={loading}/>)}
          </ol>
        </div>
      </div>
    )
  }

}

export default Shelf;