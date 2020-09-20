import React from 'react';
import PropTypes from 'prop-types';
import MoveBook from './MoveBook';

const Book = (props) => {
  const { title, thumbnail, authors, shelf, moving, onMove } = props;
  const authorsNames = authors.join('; ');

  return (
    <div className="border border-gray-300 shadow rounded-md h-40 w-full box-border">
      <div className="flex space-x-2">
        <div
          className="rounded-l-md h-40 w-32 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
        <div className="flex flex-col flex-1 space-y-1 p-2 pr-4">
          <p title={title} className="font-medium leading-tight flex-shrink text-sm lg:text-base text-gray-900">
            {title}
          </p>
          <p title={authorsNames} className="leading-tight text-xs lg:text-sm text-gray-800">
            {authorsNames}
          </p>
          <div className="flex-grow flex flex-row justify-end items-end">
            <MoveBook shelf={shelf} moving={moving} onMove={onMove} />
          </div>
        </div> 
      </div>
    </div>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  authors: PropTypes.array.isRequired,
  shelf: PropTypes.string,
  moving: PropTypes.bool.isRequired,
  onMove: PropTypes.func.isRequired
};

export default Book;
