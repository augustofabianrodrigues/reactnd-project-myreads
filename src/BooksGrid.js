import React from 'react';
import PropTypes from 'prop-types';

const BooksGrid = (props) => {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-3"
      children={props.children}/>
  );
};

BooksGrid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default BooksGrid;
