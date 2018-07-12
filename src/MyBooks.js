import React, { Component } from 'react';
import Shelf from './Shelf';
import * as BooksAPI from './BooksAPI'

class MyBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myBooks: {}
    }
  }

  componentDidMount() {
    this.getCurrentBooks()
  }

  handleChange = (e, book) => {
    const value = e.target.value;
    BooksAPI.update(book, value)
      .then(() =>
        this.getCurrentBooks()
      )
  }

  getCurrentBooks = () => {
    this.setState(() => ({
      loading: true
    }));

    BooksAPI.getAll()
      .then((books) =>
        this.updateMyBooks(books)
    )
  }

  updateMyBooks = (books) => {
    const myBooks = {
      'currentlyReading': {
        title: 'Currently Reading',
        books: []
      },
      'wantToRead': {
        title: 'Want To Read',
        books: []
      },
      'read': {
        title: 'Read',
        books: []
      }
    }
    for (let book of books) {
      switch (book.shelf) {
        case 'currentlyReading':
          myBooks.currentlyReading.books.push(book)
          break;
        case 'read':
          myBooks.read.books.push(book)
          break;
        default:
          myBooks.wantToRead.books.push(book)
          break;
      }
    }
    this.setState(() => ({
      loading: false,
      myBooks
    }))
  }

  render() {
    const { myBooks } = this.state;
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
                      handleChange={this.handleChange}
              />
            )}
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }


}

export default MyBooks;