import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const AddToIcon = props => {
  return (
    <i className={props.className}>
      <svg className={classNames('fill-current', props.svgClassName)} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
      </svg>
    </i>
  );
};

AddToIcon.propTypes = {
  className: PropTypes.string,
  svgClassName: PropTypes.string
};

export default AddToIcon;
