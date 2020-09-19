import React from 'react';
import Header from './Header';
import ShelfSkeletonLoader from './ShelfSkeletonLoader';

const HomePage = (props) => {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <Header />

      <main className="w-full max-w-6xl mx-auto flex-grow flex-shrink-0 space-y-4 p-4 xl:py-10">
        <div className="space-y-10">
          <ShelfSkeletonLoader />
          <ShelfSkeletonLoader />
          <ShelfSkeletonLoader />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
