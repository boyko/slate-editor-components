'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Serializer = require('./Serializer');

var _Serializer2 = _interopRequireDefault(_Serializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param (Object) opts
 * @returns {{deserialize: (function(*, *)), serialize: (function(*, *))}}
 */
function createRule(opts) {

  // const type = opts && opts.type ? opts.type : 'pre';
  // const tag = opts && opts.tag ? opts.tag : 'a';
  var rules = {
    // Special case for links, to grab their href.
    deserialize: function deserialize(el, next) {
      if (el.tagName !== 'pre') return undefined;
      var code = el.childNodes[0];
      var childNodes = code && code.tagName === 'code' ? code.childNodes : el.childNodes;

      return {
        kind: 'block',
        type: 'code',
        nodes: next(childNodes)
      };
    },
    serialize: function serialize(object, children) {
      if (object.kind === 'block' && object.type === 'code') {
        return _react2.default.createElement(
          _Serializer2.default,
          null,
          children
        );
      }
      return undefined;
    }
  };

  return rules;
}

exports.default = createRule;