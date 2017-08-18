'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializer = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _slate = require('slate');

var _parse = require('parse5');

var _parse2 = _interopRequireDefault(_parse);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Link = require('./plugins/Link');

var _Link2 = _interopRequireDefault(_Link);

var _html = require('./html');

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var linkPlugin = (0, _Link2.default)();

var plugins = [linkPlugin];

var rules = _html2.default.concat([linkPlugin.html]);

var serializer = exports.serializer = new _slate.Html({ rules: rules, parseHtml: _parse2.default.parse });

var propTypes = {
  state: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onSave: _propTypes2.default.func
};

var defaultProps = {
  onSave: null
};

var RichTextEditor = function (_React$Component) {
  _inherits(RichTextEditor, _React$Component);

  function RichTextEditor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RichTextEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RichTextEditor.__proto__ || Object.getPrototypeOf(RichTextEditor)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (state) {
      _this.props.onChange(state);
    }, _this.render = function () {
      var state = _this.props.state;


      return _react2.default.createElement(
        'div',
        { className: 'editor' },
        _react2.default.createElement(_Toolbar2.default, {
          state: state,
          onChange: _this.onChange,
          onSave: _this.props.onSave
        }),
        _react2.default.createElement(_slate.Editor, {
          schema: _schema2.default,
          plugins: plugins,
          state: state,
          onChange: _this.onChange
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return RichTextEditor;
}(_react2.default.Component);

RichTextEditor.propTypes = propTypes;
RichTextEditor.defaultProps = defaultProps;

exports.default = RichTextEditor;