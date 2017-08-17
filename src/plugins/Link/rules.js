import React from 'react';
import Link from './Serializer';

/**
 *
 * @param (Object) opts
 * @returns {{deserialize: (function(*, *)), serialize: (function(*, *))}}
 */
function createRule(opts) {

  const type = opts && opts.type ? opts.type : 'link';
  const tag = opts && opts.tag ? opts.tag : 'a';

  const rules = {
    // Special case for links, to grab their href.
    deserialize: (el, next) => {
      if (el.tagName !== tag) return;
      return {
        kind: 'inline',
        type,
        nodes: next(el.childNodes),
        data: {
          href: el.attrs.find(({ name }) => name === 'href').value,
        },
      };
    },
    serialize: (object, children) => {
      if (object.kind === 'inline' && object.type === 'link') {
        const href = object.data.get('href');
        const props = { href, children };
        return <Link {...props} />;
      }
    },
  };

  return rules;
}

export default createRule;
