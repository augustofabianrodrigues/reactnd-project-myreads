import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as booksAPI from './booksAPI';
import SearchBar from './SearchBar';
import BookSkeletonLoader from './BookSkeletonLoader';
import { debounce, isArray } from 'lodash';
import Book from './Book';
import BooksGrid from './BooksGrid';

class SearchPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onBookMove: PropTypes.func.isRequired
  };

  state = {
    didSearch: false,
    searching: false,
    query: '',
    results: []
  };

  searchDebounced = debounce((query) => {
    if (query.trim().length === 0) {
      return this.setState(() => ({ didSearch: false }));
    }

    this.setState(() => ({
      searching: true,
      results: []
    }));

    booksAPI
      .search(query.trimStart())
      .then(results => 
        this.setState(() => ({ results: isArray(results) ? results : [] }))
      )
      .catch((e) =>
        this.setState(() => ({ results: [] }))
      )
      .finally(() => 
        this.setState(() => ({ searching: false, didSearch: true  }))
      );
  }, 800);

  handleSearch = async (query) => {
    this.setState(() => ({ query }));
    this.searchDebounced(query);
  };

  renderSkeletalLoader = () => {
    return (
      <BooksGrid>
        {Array(10).fill().map((_, index) => (
          <BookSkeletonLoader key={index} />
        ))}
      </BooksGrid>
    );
  };

  renderWaitingToSearch = () => {
    return (
      <div className="h-full w-full flex flex-col xl:justify-center items-center space-y-10">
        <img
          alt="Waiting to search!"
          src={require('./illustrations/waiting-to-search.svg')}
          className="bg-no-repeat bg-contain bg-fixed p-4 w-64 lg:w-auto"
        />
        <p className="text-lg">Waiting to search!</p>
      </div>
    );
  };

  renderNothingFound = () => {
    return (
      <div className="h-full w-full flex flex-col xl:justify-center items-center space-y-10">
        <img
          alt="Waiting to search!"
          src={require('./illustrations/nothing-found.svg')}
          className="bg-no-repeat bg-contain bg-fixed p-4 w-64 lg:w-auto"
        />
        <p className="text-lg">Sorry... didn’t find anything</p>
      </div>
    );
  };

  renderResults = () => {
    return (
      <BooksGrid>
        {this.state.results.map((book) => {
          const match = this.props.books.find(({ id }) => id === book.id);
          book = match || book;

          return (
            <Book
              key={book.id}
              book={book}
              onMove={(shelf) => this.props.onBookMove(book, shelf)}
            />
          );
        })}
      </BooksGrid>
    );
  };

  renderMain = () => {
    const { loading, searching, didSearch, results } = this.state;
    const loadingOrSearching = (loading || searching);

    if (loadingOrSearching) {
      return this.renderSkeletalLoader();
    }

    if (!didSearch) {
      return this.renderWaitingToSearch();
    }

    return results.length === 0 ?
      this.renderNothingFound() :
      this.renderResults();
  };

  render () {
    const { loading, searching, query } = this.state;
    const loadingOrSearching = (loading || searching);

    return (
      <div className={classNames('h-full w-full flex flex-col', {
        'overflow-hidden': loadingOrSearching,
        'overflow-y-auto': !loadingOrSearching
      })}>
        <SearchBar query={query} onSearch={this.handleSearch} />
        <main className="relative w-full max-w-6xl mx-auto flex-grow flex-shrink-0 p-4 xl:py-10">
          {this.renderMain()}
        </main>
      </div>
    );
  }
}

export default SearchPage;
