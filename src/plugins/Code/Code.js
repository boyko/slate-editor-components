import React from 'react';
import propTypes from '../../propTypes';

const Code = ({ attributes, children }) => {
  return (
    <pre {...attributes} ><code>{children}</code></pre>
  );
};

Code.propTypes = propTypes;

export default Code;
