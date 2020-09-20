import React, { Component } from 'react';
import HomePage from './HomePage';
import * as booksAPI from './booksAPI';

function setNavigationBarHeightCSSVariable() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}

/**
 * Returns a copy of the array but the book with same id, which is replaced.
 * @param {Array} books The book array to replaced.
 * @param {Object} book The book to be replaced for the book with same id.
 * @param {boolean} appendMatch When set to true, a book that is matched by id will be the last one in the new array.
 */
function getReplacedBookArray (books, book, appendMatch = false) {
  const replaceIndex = books.findIndex(({ id }) => id === book.id);
  if (replaceIndex === -1) return books;

  const booksCopy = books.slice();

  if (appendMatch) {
    booksCopy.splice(replaceIndex, 1);
    // Appends the book so it will appear as the last one for the shelf
    booksCopy.push(book);
  } else {
    booksCopy.splice(replaceIndex, 1, book);
  }

  return booksCopy;
}

class App extends Component {
  state = {
    books: [],
    loading: false,
    error: null
  };

  getBooksFromAPI = async () => {
    try {
      this.setState(() => ({
        books: [],
        loading: true,
        error: null
      }));

      const books = await booksAPI.getAll();

      this.setState(() => ({
        books
      }));
    } catch (e) {
      console.error(e);
      this.setState(() => ({
        error: e
      }));
    } finally {
      this.setState(() => ({
        loading: false
      }));
    }
  };

  handleBookMove = async (book, shelf) => {
    this.setState((prevState) => ({
      books: getReplacedBookArray(prevState.books, {
        ...book, moving: true
      })
    }));

    try {
      await booksAPI.update(book, shelf);
      this.setState((prevState) => ({
        books: getReplacedBookArray(prevState.books, {
          ...book, shelf, moving: false
        }, true)
      }));
    } catch (e) {
      console.error(e);
      // TODO: Display this error to the user. Maybe a toast or snackbar?
      this.setState((prevState) => ({
        books: getReplacedBookArray(prevState.books, {
          ...book, moving: false
        })
      }));
    }
  };

  componentDidMount () {
    setNavigationBarHeightCSSVariable();
    window.addEventListener('resize', setNavigationBarHeightCSSVariable);

    this.getBooksFromAPI();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', setNavigationBarHeightCSSVariable);
  }

  render () {
    const { books, loading } = this.state;
    return (
      <div className="app">
        <HomePage books={books} loading={loading} onBookMove={this.handleBookMove} />
      </div>
    );
  }
}

export default App;
