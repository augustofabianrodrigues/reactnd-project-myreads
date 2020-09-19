import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from './Header';
import ShelfSkeletonLoader from './ShelfSkeletonLoader';
import Shelf from './Shelf';
import CurrentlyReadingIcon from './icons/CurrentlyReadingIcon';
import WantToReadIcon from './icons/WantToReadIcon';
import ReadBookIcon from './icons/ReadBookIcon';

const shelves = [
  {
    name: 'currentlyReading',
    icon: <CurrentlyReadingIcon />,
    title: 'Currently Reading'
  },
  {
    name: 'wantToRead',
    icon: <WantToReadIcon />,
    title: 'Want to Read'
  },
  {
    name: 'read',
    icon: <ReadBookIcon />,
    title: 'Read'
  },
];

const HomePage = (props) => {
  const { books, loading } = props;

  return (
    <div className={classNames('h-full w-full flex flex-col', {
      'overflow-hidden': loading,
      'overflow-y-auto': !loading
    })}>
      <Header />

      <main className="relative w-full max-w-6xl mx-auto flex-grow flex-shrink-0 space-y-4 p-4 xl:py-10 space-y-10">
        {loading ? shelves.map((shelf) => (
          <ShelfSkeletonLoader key={`${shelf.name}-skeleton-loader`} />
        )) : shelves.map((shelf) => (
          <Shelf
            key={shelf.name}
            books={books.filter((book) => book.shelf === shelf.name)}
            icon={shelf.icon}
            title={shelf.title}
          />
        ))}
      </main>
    </div>
  );
};

HomePage.propTypes = {
  books: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default HomePage;
