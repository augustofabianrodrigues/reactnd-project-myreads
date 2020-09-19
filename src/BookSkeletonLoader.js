import React from 'react';

const BookSkeletonLoader = () => {
  return (
    <div class="border border-gray-300 shadow rounded-md p-4 w-full lg:max-w-md my-2 lg:mr-4">
      <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-gray-400 h-12 w-12"></div>
        <div class="flex-1 space-y-4 py-1">
          <div class="h-4 bg-gray-400 rounded w-3/4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-400 rounded"></div>
            <div class="h-4 bg-gray-400 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSkeletonLoader;
