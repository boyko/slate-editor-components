'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('../../propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function Link(_ref) {
  var node = _ref.node,
      attributes = _ref.attributes,
      children = _ref.children;
  var data = node.data;

  var href = data.get('href');
  return _react2.default.createElement(
    'a',
    _extends({}, attributes, { href: href }),
    children
  );
};

Link.propTypes = _propTypes2.default;

exports.default = Link;