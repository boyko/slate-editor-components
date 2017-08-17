import React from 'react';
import Serializer from './Serializer';

/**
 *
 * @param (Object) opts
 * @returns {{deserialize: (function(*, *)), serialize: (function(*, *))}}
 */
function createRule(opts) {

  // const type = opts && opts.type ? opts.type : 'pre';
  // const tag = opts && opts.tag ? opts.tag : 'a';
  const rules = {
    // Special case for links, to grab their href.
    deserialize: (el, next) => {
      if (el.tagName !== 'pre') return undefined;
      const code = el.childNodes[0];
      const childNodes = code && code.tagName === 'code'
        ? code.childNodes
        : el.childNodes;

      return {
        kind: 'block',
        type: 'code',
        nodes: next(childNodes),
      };
    },
    serialize: (object, children) => {
      if (object.kind === 'block' && object.type === 'code') {
        return (
          <Serializer>
            {children}
          </Serializer>
        );
      }
      return undefined;
    },
  };

  return rules;
}

export default createRule;
