'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('../../propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Code = function Code(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children;

  return _react2.default.createElement(
    'pre',
    attributes,
    _react2.default.createElement(
      'code',
      null,
      children
    )
  );
};

Code.propTypes = _propTypes2.default;

exports.default = Code;