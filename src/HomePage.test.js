import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import HomePage from './HomePage';
import Shelf from './Shelf';
import ShelfSkeletonLoader from './ShelfSkeletonLoader';

test('shows 3 shelves for books', () => {
  const books = [];

  const wrapper = shallow((
    <HomePage books={books} loading={false} onBookMove={() => {}} />
  ), { wrappingComponent: MemoryRouter });

  expect(wrapper.find(Shelf)).toHaveLength(3);
});

test('shows books in the correct shelves', () => {
  const books = [
    { id: 1, title: 'Must be in Currently Reading', shelf: 'currentlyReading' },
    { id: 2, title: 'Must be in Want to Read', shelf: 'wantToRead' },
    { id: 3, title: 'Must be in Read', shelf: 'read' },
    { id: 4, title: 'Must not be in any', shelf: 'none' }
  ];

  const wrapper = shallow((
    <HomePage books={books} loading={false} onBookMove={() => {}} />
  ), { wrappingComponent: MemoryRouter });

  const shelves = wrapper
    .find(Shelf).map((shelf) => shelf.prop('books'));

  expect(shelves[0]).toEqual([books[0]]);
  expect(shelves[1]).toEqual([books[1]]);
  expect(shelves[2]).toEqual([books[2]]);

  expect(shelves).not.toContain([books[3]]);
});

test('shows shelves skeleton loader', () => {
  const books = [];

  const wrapper = shallow((
    <HomePage books={books} loading={true} onBookMove={() => {}} />
  ), { wrappingComponent: MemoryRouter });

  expect(wrapper.find(ShelfSkeletonLoader)).toHaveLength(3);
});
