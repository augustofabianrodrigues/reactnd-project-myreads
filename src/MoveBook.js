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
    shelf: PropTypes.string,
    moving: PropTypes.bool.isRequired,
    onMove: PropTypes.func.isRequired
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
    if (this.ref.current !== null && !this.ref.current.contains(e.target)) {
      this.setState(() => ({
        open: false
      }));
    }
  };

  handleOptionClick = (shelf) => {
    this.setState(() => ({
      open: false
    }));
    this.props.onMove(shelf);
  };

  renderAvailableOptions = (availableOptions) => {
    return availableOptions.map((option, index) => {
      const isSelected = this.props.shelf === option.name;
      const isLast = index + 1 !== availableOptions.length;

      return (
        <li
          key={option.name}
          className={classNames('flex flex-row items-center px-4 py-2 space-x-2', {
            'border-b border-gray-300': isLast,
            'text-purple-400 cursor-not-allowed': isSelected,
            'hover:bg-gray-200 cursor-pointer': !isSelected
          })}
          onClick={isSelected ? null : () => this.handleOptionClick(option.name)}
        >
          <option.Icon svgClassName="h-5 w-5" />
          <span>{option.title}</span>
        </li>
      );
    })
  };

  componentDidMount () {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  render () {
    const { shelf, moving } = this.props;

    const ActionIcon = shelf ? MoveToIcon : AddToIcon;
    const moveToLabel = shelf ? 'Move To' : 'Add To';
    const movingLabel = shelf ? 'Moving' : 'Adding';

    const availableOptions = shelf
      ? moveToOptions : moveToOptions.slice(0, 3);

    if (moving) {
      return (
        <p className="p-2 mb-1 flex flex-row items-center bg-transparent text-sm space-x-2">
          <svg className="animate-spin h-4 w-4 text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-500">
            {movingLabel}
          </span>
        </p>
      );
    }

    return (
      <div ref={this.ref} className="relative">
        <button
          type="button"
          className="p-2 mb-1 flex flex-row items-center bg-transparent text-sm space-x-2 transition duration-150 ease-in-out transform hover:scale-110"
          onClick={this.handleMoveToClick}
        >
          <ActionIcon svgClassName="text-purple-500 h-4 w-4" />
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-500">
            {moveToLabel}
          </span>
        </button>

        <div
          className={classNames('absolute top-0 right-0 z-10 rounded-lg shadow-xl w-64 h-auto bg-white transition duration-150 ease-in-out', {
            'invisible opacity-0': !this.state.open,
            'visible opacity-100': this.state.open
          })}
        >
          <p className="p-4 font-medium text-gray-800">{moveToLabel}...</p>
          <ul className="list-none">
            {this.renderAvailableOptions(availableOptions)}
          </ul>
        </div>
      </div>
    );
  }
};

export default MoveBook;
