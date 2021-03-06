import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import BooksGrid from './BooksGrid';

const Shelf = (props) => {
  const { books, onBookMove } = props;

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
        <BooksGrid>
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
              onMove={(shelf) => onBookMove(book, shelf)}
            />
          ))}
        </BooksGrid>
      )}
    </div>
  );
};

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default Shelf;
