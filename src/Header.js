import React from 'react';
import { Link } from 'react-router-dom';
import SearchPlusIcon from './icons/SearchPlusIcon';

const Header = () => {
  return (
    <header className="h-16 w-full shadow-lg sticky top-0 flex-grow-0 flex-shrink bg-gray-100 z-50">
      <div className="h-full max-w-6xl mx-auto flex flex-row justify-between items-center">
        <div className="dummy-spacer w-10 lg:w-32 ml-4" />

        <h1 className="font-serif text-purple-800 font-bold text-2xl sm:text-3xl">
          MyReads
        </h1>

        <nav className="w-10 lg:w-32 mr-4">
          <Link
            className="h-10 px-2 flex flex-row justify-end xl:justify-around items-center rounded-lg text-white invisible xl:visible bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 hover:from-purple-500 hover:via-purple-400 hover:to-purple-300 hover:shadow-sm"
            to="/search"
          >
            <SearchPlusIcon className="w-6 h-6 visible text-purple-500 xl:text-white" />
            <span className="hidden xl:inline text-base font-bold">
              Search
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
