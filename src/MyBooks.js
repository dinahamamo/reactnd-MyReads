import React from 'react';
import Shelf from './Shelf';
import { Link } from 'react-router-dom';

const MyBooks = (props) => {
  const { myBooks, getCurrentBooks } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          { myBooks && Object.values(myBooks).map( shelf =>
            <Shelf  key={shelf.title}
                    shelfTitle={shelf.title}
                    shelfBooks={shelf.books}
                    getCurrentBooks={getCurrentBooks}
            />
          )}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search"></Link>
      </div>
    </div>
  )
}

export default MyBooks;