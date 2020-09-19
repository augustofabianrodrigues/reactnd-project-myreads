import React from 'react';

const BookSkeletonLoader = () => {
  return (
    <div className="border border-gray-300 shadow rounded-md h-40 w-full box-border">
      <div className="animate-pulse flex space-x-2">
        <div className="rounded-l-md bg-gray-400 h-40 w-32"></div>
        <div className="flex flex-col flex-1 space-y-2 p-4">
          <div className="flex-shrink h-3 bg-gray-400 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-400 rounded"></div>
            <div className="h-3 bg-gray-400 rounded w-5/6"></div>
          </div>
          <div className="flex-grow flex flex-row justify-end items-end">
            <div className="h-6 bg-gray-400 rounded w-24"></div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default BookSkeletonLoader;
