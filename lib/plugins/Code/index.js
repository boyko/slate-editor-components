'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Code = require('./Code');

var _Code2 = _interopRequireDefault(_Code);

var _rules = require('./rules');

var _rules2 = _interopRequireDefault(_rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function configurePlugin() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var Component = opts && opts.Component ? opts.Component : _Code2.default;
  var type = opts && opts.type ? opts.type : 'code';

  var schema = {
    nodes: _defineProperty({}, type, Component)
  };

  var html = (0, _rules2.default)({});

  return {
    schema: schema,
    html: html
  };
}

exports.default = configurePlugin;