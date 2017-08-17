'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  href: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.any.isRequired
};
var defaultProps = {};

var Link = function Link(_ref) {
  var href = _ref.href,
      children = _ref.children;
  return _react2.default.createElement(
    'a',
    { href: href },
    children
  );
};

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

exports.default = Link;