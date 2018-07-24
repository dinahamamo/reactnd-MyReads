import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      shelf: ''
    }
  }

  componentDidMount = () => {
    this.getShelf(this.props.book.id);
    // const { book } = this.props;
    // this.setState(() => ({
    //   shelf: book.shelf ? book.shelf : this.getShelf(book.id)
    // }))
  }


  handleBookChange = (e, book) => {
    e.preventDefault();
    this.setState(() => ({
      loading: true
    }))
    const value = e.target.value;
    BooksAPI.update(book, value)
      .then(() => {
        this.props.getCurrentBooks();
        this.getShelf(book.id);
      }
    )
  }

  getShelf = (id) => {
    BooksAPI.get(id)
    .then(book => {
      this.setState(() => ({
        shelf: book.shelf,
        loading: false
      }))
    })
  }

  render() {
    const { loading, shelf } = this.state;
    const { book } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            { (book.imageLinks) ?
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.thumbnail})`}}></div>
              : <div className="book-cover book-cover-title" style={{ width: 128, height: 193}}>{book.title}</div>
            }
            <div className={(!loading)? "book-shelf-changer" : "book-shelf-changer disabled"}>
              <select value={shelf} onChange={(e) => this.handleBookChange(e, book)} disabled={loading}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
              { book.authors && (
                book.authors.map( author =>
                  <div className="book-authors" key={author}>{author}</div>
                )
              )}
        </div>
      </li>
    )
  }
}

export default Book;