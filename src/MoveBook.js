import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MoveToIcon from './icons/MoveToIcon';
import AddToIcon from './icons/AddToIcon';
import CurrentlyReadingIcon from './icons/CurrentlyReadingIcon';
import WantToReadIcon from './icons/WantToReadIcon';
import ReadBookIcon from './icons/ReadBookIcon';
import RemoveBookIcon from './icons/RemoveBookIcon';

const moveToOptions = [
  {
    name: 'currentlyReading',
    Icon: CurrentlyReadingIcon,
    title: 'Currently Reading'
  },
  {
    name: 'wantToRead',
    Icon: WantToReadIcon,
    title: 'Want to Read'
  },
  {
    name: 'read',
    Icon: ReadBookIcon,
    title: 'Read'
  },
  {
    name: 'none',
    Icon: RemoveBookIcon,
    title: 'None'
  }
];

class MoveBook extends Component {
  constructor (props) {
    super(props);

    this.ref = createRef();
  }

  static propTypes = {
    shelf: PropTypes.string
  };

  state = {
    open: false
  };

  handleMoveToClick = () => {
    this.setState(() => ({
      open: true
    }));
  };

  handleOutsideClick = (e) => {
    if (!this.ref.current.contains(e.target)) {
      this.setState(() => ({
        open: false
      }));
    }
  };

  componentDidMount () {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  render () {
    const { shelf } = this.props;

    const ActionIcon = shelf ? MoveToIcon : AddToIcon;
    const moveToLabel = shelf ? 'Move To' : 'Add To';

    const availableOptions = shelf
      ? moveToOptions : moveToOptions.slice(0, 3);

    return (
      <div ref={this.ref} className="relative">
        <button
          type="button"
          className="p-2 mb-1 flex flex-row items-center bg-transparent text-sm space-x-2 leading-none transition duration-150 ease-in-out transform hover:scale-110"
          onClick={this.handleMoveToClick}
        >
          <ActionIcon svgClassName="text-purple-500 h-4 w-4" />
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-500">
            {moveToLabel}
          </span>
        </button>

        <div
          className={classNames('absolute top-0 right-0 z-10 p-4 rounded-lg shadow-xl w-64 h-auto bg-white transition duration-150 ease-in-out', {
            'invisible opacity-0': !this.state.open,
            'visible opacity-100': this.state.open
          })}
        >
          <p className="font-medium text-gray-800">{moveToLabel}...</p>
          <ul className="list-none pt-2">
            {availableOptions.map((option, index) => (
              <li
                key={option.name}
                className={classNames('flex flex-row items-center py-2 space-x-2', {
                  'border-b border-gray-300': index + 1 !== availableOptions.length,
                  'text-purple-400 cursor-not-allowed': shelf === option.name,
                  'cursor-pointer': shelf !== option.name
                })}
              >
                <option.Icon svgClassName="h-5 w-5" />
                <span>{option.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default MoveBook;
