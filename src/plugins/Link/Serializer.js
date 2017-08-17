import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};
const defaultProps = {};

const Link = ({ href, children }) => (
  <a href={href}>{children}</a>
);

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;