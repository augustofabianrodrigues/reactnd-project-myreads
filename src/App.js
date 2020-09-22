import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import * as booksAPI from './booksAPI';
import SearchPage from './SearchPage';

function setNavigationBarHeightCSSVariable() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}

/**
 * Returns a copy of the array but the book with same id, which is replaced or added if not matched.
 * @param {Array} books The book array to replace.
 * @param {Object} book The book to be replaced for the book with same id or added when not matched.
 * @param {boolean} appendMatch When set to true, a book that is matched by id will be the last one in the new array.
 */
function replaceOrAddToBookArray (books, book, appendMatch = false) {
  const replaceIndex = books.findIndex(({ id }) => id === book.id);
  if (replaceIndex === -1) return books.concat(book);

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

function removeFromBookArray (books, book) {
  const removeIndex = books.findIndex(({ id }) => id === book.id);
  if (removeIndex === -1) return books;

  const booksCopy = books.slice();
  booksCopy.splice(removeIndex, 1);
  return booksCopy;
}

class App extends Component {
  state = {
    books: [],
    loading: false
  };

  getBooksFromAPI = async () => {
    try {
      this.setState(() => ({
        books: [],
        loading: true
      }));

      const books = await booksAPI.getAll();

      this.setState(() => ({
        books
      }));
    } finally {
      this.setState(() => ({
        loading: false
      }));
    }
  };

  handleBookMove = async (book, shelf) => {
    this.setState((prevState) => ({
      books: replaceOrAddToBookArray(prevState.books, {
        ...book, moving: true
      })
    }));

    try {
      await booksAPI.update(book, shelf);
      this.setState((prevState) => {
        if (shelf === 'none') {
          return {
            books: removeFromBookArray(prevState.books, book)
          };
        }

        return {
          books: replaceOrAddToBookArray(prevState.books, {
            ...book, shelf, moving: false
          }, true)
        };
      });
    } catch (e) {
      console.error(e);
      this.setState((prevState) => ({
        books: replaceOrAddToBookArray(prevState.books, {
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
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              books={books}
              loading={loading}
              onBookMove={this.handleBookMove}
            />
          )}
        />

        <Route
          path="/search"
          render={() => (
            <SearchPage
              books={books}
              loading={loading}
              onBookMove={this.handleBookMove}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
