'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUrl = require('is-url');

var _isUrl2 = _interopRequireDefault(_isUrl);

var _utils = require('../../utils');

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _rules = require('./rules');

var _rules2 = _interopRequireDefault(_rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function linkPlugin() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var Component = opts && opts.Component ? opts.Component : _Link2.default;
  var type = opts && opts.type ? opts.type : 'link';

  function onPaste(e, data, state) {
    if (state.isCollapsed) return;
    if (data.type !== 'text' && data.type !== 'html') return;
    if (!(0, _isUrl2.default)(data.text)) return;

    var transform = state.transform();

    if ((0, _utils.hasInline)(state, type)) {
      transform.unwrapInline(type);
    }

    return transform.wrapInline({
      type: type,
      data: {
        href: data.text
      }
    }).collapseToEnd().apply();
  }

  var schema = {
    nodes: _defineProperty({}, type, Component)
  };

  var html = (0, _rules2.default)({ tag: 'a', type: type });

  return {
    onPaste: onPaste,
    schema: schema,
    html: html
  };
}

exports.default = linkPlugin;