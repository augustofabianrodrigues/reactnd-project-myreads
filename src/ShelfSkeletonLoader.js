import React from 'react';
import BookSkeletonLoader from './BookSkeletonLoader';

const ShelfSkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-4">
      <div className="flex flex-row space-x-4">
        <div className="rounded-full bg-gray-400 h-12 w-12 flex-shrink" />
        <div class="h-8 bg-gray-400 rounded my-auto flex-grow md:max-w-2xl" />
      </div>
      <hr />
      <div className="flex flex-row flex-wrap justify-start">
        <BookSkeletonLoader />
        <BookSkeletonLoader />
      </div>
    </div>
  );
};

export default ShelfSkeletonLoader;
