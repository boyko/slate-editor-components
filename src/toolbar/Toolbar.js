import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  editor: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
};
const defaultProps = {};

const Toolbar = ({ state }) => {

};

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;

export default Toolbar;
