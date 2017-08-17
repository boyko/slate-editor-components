'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BLOCK_TAGS = {
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
  h6: 'heading-six'
};

/**
 * Tags to marks.
 *
 * @type {Object}
 */

var MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underline',
  s: 'strikethrough',
  code: 'code'
};

/**
 * Serializer rules.
 *
 * @type {Array}
 */

var RULES = [{
  deserialize: function deserialize(el, next) {
    var block = BLOCK_TAGS[el.tagName];
    if (!block) return undefined;
    return {
      kind: 'block',
      type: block,
      nodes: next(el.childNodes)
    };
  },
  serialize: function serialize(object, children) {
    if (object.kind !== 'block') return undefined;
    if (Object.values(BLOCK_TAGS).indexOf(object.type) === -1) return undefined;

    var type = object.type;

    if (!type) return undefined;

    switch (type) {
      case 'paragraph':
        return _react2.default.createElement(
          'p',
          null,
          children
        );
      case 'heading-one':
        return _react2.default.createElement(
          'h1',
          null,
          children
        );
      case 'heading-two':
        return _react2.default.createElement(
          'h2',
          null,
          children
        );
      case 'heading-three':
        return _react2.default.createElement(
          'h3',
          null,
          children
        );
      case 'heading-four':
        return _react2.default.createElement(
          'h4',
          null,
          children
        );
      case 'heading-five':
        return _react2.default.createElement(
          'h5',
          null,
          children
        );
      case 'heading-six':
        return _react2.default.createElement(
          'h6',
          null,
          children
        );
      default:
        return undefined;
    }
  }
}, {
  deserialize: function deserialize(el, next) {
    var type = MARK_TAGS[el.tagName];
    if (!type) return undefined;
    return {
      kind: 'mark',
      type: type,
      nodes: next(el.childNodes)
    };
  },
  serialize: function serialize(object, children) {
    if (object.kind !== 'mark') return undefined;
    switch (object.type) {
      case 'bold':
        return _react2.default.createElement(
          'strong',
          null,
          children
        );
      case 'italic':
        return _react2.default.createElement(
          'em',
          null,
          children
        );
      case 'underline':
        return _react2.default.createElement(
          'u',
          null,
          children
        );
      default:
        return undefined;
    }
  }
}];

exports.default = RULES;