import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as booksAPI from './booksAPI';
import SearchBar from './SearchBar';
import BookSkeletonLoader from './BookSkeletonLoader';
import { debounce, isArray } from 'lodash';
import Book from './Book';

class SearchPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onBookMove: PropTypes.func.isRequired
  };

  state = {
    hasQuery: false,
    searching: false,
    query: '',
    results: [],
    errorMessage: null
  };

  searchDebounced = debounce((query) => {
    if (!this.state.hasQuery) return;

    this.setState(() => ({
      searching: true,
      results: [],
      errorMessage: null
    }));

    booksAPI.search(query)
      .then(results => {
        this.setState(() => ({
          searching: false,
          results: isArray(results) ? results : [],
          errorMessage: null
        }));
      })
      .catch((e) =>
        this.setState(() => ({
          searching: false,
          results: [],
          errorMessage: e.message
        })));
  }, 500);

  handleSearch = async (query) => {
    if (this.state.searching) return;
    const hasQuery = String(query).trim().length !== 0;

    this.setState(() => ({
      hasQuery,
      query
    }));

    this.searchDebounced(query);
  };

  renderSkeletalLoader = () => {
    return Array(10).fill().map((_, index) => (
      <BookSkeletonLoader key={index} />
    ));
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
      <Fragment>
        {this.state.results.map((book) => {
          const match = this.props.books.find(({ id }) => id === book.id);
          book = match || book;

          return (
            <Book
              key={book.id}
              title={book.title}
              thumbnail={book.imageLinks.thumbnail}
              authors={book.authors}
              shelf={book.shelf}
              moving={book.moving}
              onMove={(shelf) => this.props.onBookMove(book, shelf)}
            />
          );
        })}
      </Fragment>
    );
  };

  renderMain = () => {
    const { loading, searching, hasQuery, results } = this.state;
    const loadingOrSearching = (loading || searching);

    if (!hasQuery) return this.renderWaitingToSearch();
    if (!loadingOrSearching && results.length === 0) return this.renderNothingFound();

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {loadingOrSearching ? this.renderSkeletalLoader() : this.renderResults()}
      </div>
    );
  };

  render () {
    const { loading, searching, query } = this.state;
    const loadingOrSearching = (loading || searching);

    return (
      <div className={classNames('h-full w-full flex flex-col', {
        'overflow-hidden': loadingOrSearching,
        'overflow-y-auto': !loadingOrSearching
      })}>
        <SearchBar query={query} searching={loadingOrSearching} onSearch={this.handleSearch} />
        <main className="relative w-full max-w-6xl mx-auto flex-grow flex-shrink-0 p-4 xl:py-10">
          {this.renderMain()}
        </main>
      </div>
    );
  }
}

export default SearchPage;
