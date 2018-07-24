import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MyBooks from './MyBooks';
import { Route } from 'react-router-dom';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    myBooks: {},
    foundBooks: [],
    noBooksFound: false,
    searching: false
  }

  componentDidMount = () => {
    this.getCurrentBooks()
  }



  getCurrentBooks = () => {
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
        case 'wantToRead':
          myBooks.wantToRead.books.push(book)
          break;
        default:
          break;
      }
    }
    this.setState(() => ({
      myBooks
    }))
  }

  handleSearch = (term) => {
    this.setState(() => ({
      searching: true
    }))
    if (term.length > 0) {
      this.searchBooks(term)
    } else {
      this.resetSearch();
    }
  }

  searchBooks = (term) => {
    BooksAPI.search(term)
      .then((foundBooks) => {
        this.notSearching();
        if (foundBooks && foundBooks.length > 0) {
          this.setState(() => ({
            foundBooks,
            noBooksFound: false
          }))
        } else {
          this.setState(() => ({
            noBooksFound: true
          }))
        }
      })
  }

  notSearching = () => {
    this.setState(() => ({
      searching: false
    }))
  }

  resetSearch = () => {
    this.setState(() => ({
      foundBooks: [],
      searching: false
    }))
  }

  render() {
    const { myBooks, foundBooks, searching, noBooksFound } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyBooks  myBooks={myBooks}
                    getCurrentBooks={this.getCurrentBooks}
          />)}
        />
        <Route path='/search' render={() => (
        <Search handleSearch={this.handleSearch}
                books={foundBooks}
                searching={searching}
                noBooksFound={noBooksFound}
                getCurrentBooks={this.getCurrentBooks}
                resetSearch={this.resetSearch}
        />
        )} />
      </div>
    )
  }
}

export default BooksApp
