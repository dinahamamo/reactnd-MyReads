import React, { Component } from 'react';

class Book extends Component {
  render() {
    const { book, handleChange, loading } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            {(book.imageLinks.thumbnail)?
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.thumbnail})`}}></div>
              : <div className="book-cover book-cover-title" style={{ width: 128, height: 193}}>{book.title}</div>
            }
            <div className={(!loading)? "book-shelf-changer" : "book-shelf-changer disabled"}>
              <select value={book.shelf} onChange={(e) => handleChange(e, book)} disabled={loading}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
              {book.authors.map(author => <div className="book-authors" key={author}>{author}
            </div>)}

        </div>
      </li>
    )
  }
}

export default Book;