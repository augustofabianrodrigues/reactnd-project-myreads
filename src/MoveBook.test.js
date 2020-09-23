import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import MoveBook from './MoveBook';

test('calls onMove with the correct shelf', () => {
  const handleMove = jest.fn();

  const wrapper = shallow((
    <MoveBook shelf="currentlyReading" moving={false} onMove={handleMove} />
  ), { wrappingComponent: MemoryRouter });

  const wantToReadOption = wrapper
    .findWhere((n) => n.is('li') && n.key() === 'wantToRead');

  wantToReadOption.simulate('click');
  expect(handleMove).toHaveBeenLastCalledWith('wantToRead');

  const readOption = wrapper
    .findWhere((n) => n.is('li') && n.key() === 'read');

  readOption.simulate('click');
  expect(handleMove).toHaveBeenLastCalledWith('read');

  const noneOption = wrapper
    .findWhere((n) => n.is('li') && n.key() === 'none');

  noneOption.simulate('click');
  expect(handleMove).toHaveBeenLastCalledWith('none');
});

test('does not call onMove with the current shelf', () => {
  const handleMove = jest.fn();

  const wrapper = shallow((
    <MoveBook shelf="currentlyReading" moving={false} onMove={handleMove} />
  ), { wrappingComponent: MemoryRouter });

  const currentlyReadingOption = wrapper
    .findWhere((n) => n.is('li') && n.key() === 'currentlyReading');

  currentlyReadingOption.simulate('click');
  expect(handleMove).not.toHaveBeenCalled();
});
