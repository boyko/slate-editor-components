import React from 'react';
import propTypes from '../../propTypes';

const Link = ({ node, attributes, children }) => {
  const { data } = node;
  const href = data.get('href');
  return (
    <a {...attributes} href={href}>{children}</a>
  );
};

Link.propTypes = propTypes;

export default Link;
