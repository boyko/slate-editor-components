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

  var type = opts && opts.type ? opts.type : 'link';
  var tag = opts && opts.tag ? opts.tag : 'a';

  var rules = {
    // Special case for links, to grab their href.
    deserialize: function deserialize(el, next) {
      if (el.tagName !== tag) return;
      return {
        kind: 'inline',
        type: type,
        nodes: next(el.childNodes),
        data: {
          href: el.attrs.find(function (_ref) {
            var name = _ref.name;
            return name === 'href';
          }).value
        }
      };
    },
    serialize: function serialize(object, children) {
      if (object.kind === 'inline' && object.type === 'link') {
        var href = object.data.get('href');
        var props = { href: href, children: children };
        return _react2.default.createElement(_Serializer2.default, props);
      }
    }
  };

  return rules;
}

exports.default = createRule;