import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
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

test('<MoveBook /> should show currentlyReading option as selected', () => {
  const component = renderer.create(
    <MemoryRouter>
      <MoveBook shelf="currentlyReading" moving={false} onMove={jest.fn()} />
    </MemoryRouter>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('<MoveBook /> should show wantToRead option as selected', () => {
  const component = renderer.create(
    <MemoryRouter>
      <MoveBook shelf="wantToRead" moving={false} onMove={jest.fn()} />
    </MemoryRouter>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('<MoveBook /> should show read option as selected', () => {
  const component = renderer.create(
    <MemoryRouter>
      <MoveBook shelf="read" moving={false} onMove={jest.fn()} />
    </MemoryRouter>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('<MoveBook /> should show none option as selected', () => {
  const component = renderer.create(
    <MemoryRouter>
      <MoveBook shelf="none" moving={false} onMove={jest.fn()} />
    </MemoryRouter>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('<MoveBook /> should show the moving indicator', () => {
  const component = renderer.create(
    <MemoryRouter>
      <MoveBook shelf="currentlyReading" moving={true} onMove={jest.fn()} />
    </MemoryRouter>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
