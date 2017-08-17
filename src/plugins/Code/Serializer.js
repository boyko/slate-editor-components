import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.any.isRequired,
};


const Code = ({ children }) => (
  <pre><code>{children}</code></pre>
);

Code.propTypes = propTypes;

export default Code;
