import React from 'react';
import BooksGrid from './BooksGrid';
import BookSkeletonLoader from './BookSkeletonLoader';

const ShelfSkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-4">
      <div className="flex flex-row space-x-4">
        <div className="rounded-full bg-gray-400 h-8 w-8 flex-shrink" />
        <div className="h-6 bg-gray-400 rounded my-auto flex-grow md:max-w-2xl" />
      </div>
      <hr />
      <BooksGrid>
        <BookSkeletonLoader />
        <BookSkeletonLoader />
      </BooksGrid>
    </div>
  );
};

export default ShelfSkeletonLoader;
