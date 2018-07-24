import React from 'react';
import Book from './Book';

const Shelf = (props) => {
  const { shelfTitle, shelfBooks, getCurrentBooks } = props;
  return (
    <div className="bookshelf">
    <h2 className="bookshelf-title">{shelfTitle}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        { shelfBooks.map( book =>
          <Book key={book.id}
                book={book}
                getCurrentBooks={getCurrentBooks}
          />
        )}
      </ol>
    </div>
  </div>
  )
}

export default Shelf;