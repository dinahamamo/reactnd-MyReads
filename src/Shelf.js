import React from 'react';
import Book from './Book';

const Shelf = (props) => {
  const { shelfTitle, shelfBooks, handleChange } = props;
  return (
    <div className="bookshelf">
    <h2 className="bookshelf-title">{shelfTitle}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        { shelfBooks.map( book =>
          <Book key={book.id}
                book={book}
                handleChange={handleChange}
          />
        )}
      </ol>
    </div>
  </div>
  )
}

export default Shelf;