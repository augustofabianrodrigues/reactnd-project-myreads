import React, { Component } from 'react';
import HomePage from './HomePage';
import * as booksAPI from './booksAPI';

function setNavigationBarHeightCSSVariable() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}

function getReplacedBookArray (books, book) {
  const replaceIndex = books.findIndex(({ id }) => id === book.id);
  if (replaceIndex === -1) return;

  const booksCopy = books.slice();
  booksCopy.splice(replaceIndex, 1, book);
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
        })
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
