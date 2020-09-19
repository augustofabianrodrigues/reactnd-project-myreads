import React from 'react';
import PropTypes from 'prop-types';
import MoveToIcon from './icons/MoveToIcon';

const Book = (props) => {
  const { title, thumbnail, authors } = props;
  const authorsNames = authors.join('; ');

  return (
    <div className="border border-gray-300 shadow rounded-md h-40 w-full box-border">
      <div className="flex space-x-2">
        <div
          className="rounded-l-md h-40 w-32 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
        <div className="flex flex-col flex-1 space-y-1 p-2 pr-4 overflow-hidden">
          <div className="overflow-hidden">
            <p title={title} className="truncate flex-shrink text-sm lg:text-base text-gray-900">
              {title}
            </p>
            <p title={authorsNames} className="text-xs lg:text-sm text-gray-800">
              {authorsNames}
            </p>
          </div>
          <div className="flex-grow flex flex-row justify-end items-end">
            <button
              type="button"
              className="mb-3 flex flex-row items-center bg-transparent text-sm space-x-2 leading-none transition duration-150 ease-in-out transform hover:scale-110"
            >
              <MoveToIcon svgClassName="text-purple-500 h-4 w-4" />
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-500">
                Move To
              </span>
            </button>
          </div>
        </div> 
      </div>
    </div>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  authors: PropTypes.array.isRequired
};

export default Book;
