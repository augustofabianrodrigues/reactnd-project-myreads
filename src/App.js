import React, { Component } from 'react';
import HomePage from './HomePage';
import * as booksAPI from './booksAPI';

function setNavigationBarHeightCSSVariable() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
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

  componentDidMount () {
    setNavigationBarHeightCSSVariable();
    window.addEventListener('resize', setNavigationBarHeightCSSVariable);

    this.getBooksFromAPI();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', setNavigationBarHeightCSSVariable);
  }

  render () {
    // const { books } = this.state;
    return (
      <div className="app">
        <HomePage />
      </div>
    );
  }
}

export default App;
