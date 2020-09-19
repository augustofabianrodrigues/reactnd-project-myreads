import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Shelf = (props) => {
  const { books } = props;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-4">
        <div className="h-6 w-6 flex-shrink text-purple-500">
          {props.icon}
        </div>
        <h2 className="h-6 my-auto text-lg text-gray-800 font-medium">
          {props.title}
        </h2>
      </div>

      <hr className="border-purple-300" />

      {books.length === 0 ? (
        <p className="text-2xl text-gray-600 pb-10">
          Nothing here
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {books.map((book) => (
            <Book
              key={book.id}
              title={book.title}
              thumbnail={book.imageLinks.thumbnail}
              authors={book.authors}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired
};

export default Shelf;
