import React from 'react';

const BLOCK_TAGS = {
  p: 'paragraph',
  li: 'list-item',
  ul: 'bulleted-list',
  ol: 'numbered-list',
  blockquote: 'quote',
  pre: 'code',
  h1: 'heading-one',
  h2: 'heading-two',
  h3: 'heading-three',
  h4: 'heading-four',
  h5: 'heading-five',
  h6: 'heading-six',
};

/**
 * Tags to marks.
 *
 * @type {Object}
 */

const MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underline',
  s: 'strikethrough',
  code: 'code',
};

/**
 * Serializer rules.
 *
 * @type {Array}
 */

const RULES = [
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName];
      if (!block) return undefined;
      return {
        kind: 'block',
        type: block,
        nodes: next(el.childNodes),
      };
    },
    serialize(object, children) {
      if (object.kind !== 'block') return undefined;
      if (Object.values(BLOCK_TAGS).indexOf(object.type) === -1) return undefined;

      const type = object.type;

      if (!type) return undefined;

      switch (type) {
        case 'paragraph':
          return <p>{children}</p>;
        case 'heading-one':
          return <h1>{children}</h1>;
        case 'heading-two':
          return <h2>{children}</h2>;
        case 'heading-three':
          return <h3>{children}</h3>;
        case 'heading-four':
          return <h4>{children}</h4>;
        case 'heading-five':
          return <h5>{children}</h5>;
        case 'heading-six':
          return <h6>{children}</h6>;
        default:
          return undefined;
      }
    },
  },
  {
    deserialize: (el, next) => {
      const type = MARK_TAGS[el.tagName];
      if (!type) return undefined;
      return {
        kind: 'mark',
        type,
        nodes: next(el.childNodes),
      };
    },
    serialize: (object, children) => {
      if (object.kind !== 'mark') return undefined;
      switch (object.type) {
        case 'bold':
          return <strong>{children}</strong>;
        case 'italic':
          return <em>{children}</em>;
        case 'underline':
          return <u>{children}</u>;
        default:
          return undefined;
      }
    },
  },
];

export default RULES;
