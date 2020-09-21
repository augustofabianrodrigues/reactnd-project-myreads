import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

class SearchBar extends PureComponent {
  static propTypes = {
    query: PropTypes.string.isRequired,
    searching: PropTypes.bool.isRequired,
    onSearch: PropTypes.func.isRequired
  };

  handleChange = (e) => {
    e.preventDefault();
    this.props.onSearch(e.target.value);
  };

  render () {
    const { searching, query } = this.props;

    return (
      <header className="h-16 w-full shadow-lg sticky top-0 flex-grow-0 flex-shrink bg-gray-100 z-50">
        <div className="h-full max-w-6xl flex flex-row items-center mx-auto px-4 space-x-4">
          <nav className="flex flex-shrink">
            <Link className="flex p-2" to="/">
              <ArrowLeftIcon svgClassName="w-6 h-6 text-gray-700" />
              <span className="sr-only">
                Back
              </span>
            </Link>
          </nav>
  
          <h1 className="sr-only">Search</h1>
  
          <input
            type="text"
            placeholder="Type here"
            name="search"
            autoFocus
            className={classNames('rounded overflow-hidden flex-grow font-medium px-4 py-2 text-2xl', {
              'text-gray-900 bg-gray-100': !searching,
              'text-gray-700 bg-gray-400': searching,
            })}
            disabled={searching}
            value={query}
            onChange={this.handleChange}
          />
        </div>
      </header>
    );
  }
};

export default SearchBar;
