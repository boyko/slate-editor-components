'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _saveSvg = require('react-material-icons/lib/save.svg.react');

var _saveSvg2 = _interopRequireDefault(_saveSvg);

var _undoSvg = require('react-material-icons/lib/undo.svg.react');

var _undoSvg2 = _interopRequireDefault(_undoSvg);

var _redoSvg = require('react-material-icons/lib/redo.svg.react');

var _redoSvg2 = _interopRequireDefault(_redoSvg);

var _format_boldSvg = require('react-material-icons/lib/format_bold.svg.react');

var _format_boldSvg2 = _interopRequireDefault(_format_boldSvg);

var _format_italicSvg = require('react-material-icons/lib/format_italic.svg.react');

var _format_italicSvg2 = _interopRequireDefault(_format_italicSvg);

var _linkSvg = require('react-material-icons/lib/link.svg.react');

var _linkSvg2 = _interopRequireDefault(_linkSvg);

var _filter_1Svg = require('react-material-icons/lib/filter_1.svg.react');

var _filter_1Svg2 = _interopRequireDefault(_filter_1Svg);

var _filter_2Svg = require('react-material-icons/lib/filter_2.svg.react');

var _filter_2Svg2 = _interopRequireDefault(_filter_2Svg);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// defined  in index.js, not DRY
var DEFAULT_NODE = 'paragrpah';

var propTypes = {
  state: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onSave: _propTypes2.default.func
};

var defaultProps = {
  onSave: null
};

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Toolbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (state) {
      _this.props.onChange(state);
    }, _this.canUndo = function () {
      return _this.props.state.hasUndos;
    }, _this.canRedo = function () {
      return _this.props.state.hasRedos;
    }, _this.onUndo = function () {
      var nextState = _this.props.state.transform().undo().apply({ save: false });

      _this.onChange(nextState);
    }, _this.onRedo = function () {
      var nextState = _this.props.state.transform().redo().apply({ save: false });

      _this.onChange(nextState);
    }, _this.onSave = function () {
      _this.props.onSave(_this.props.state);
    }, _this.onClickMark = function (e, type) {
      e.preventDefault();
      var state = _this.props.state;


      state = state.transform().toggleMark(type).apply();

      _this.onChange(state);
    }, _this.onClickBlock = function (e, type) {
      e.preventDefault();
      var state = _this.props.state;

      var transform = state.transform();
      var _state = state,
          document = _state.document;

      // Handle everything but list buttons.

      if (type !== 'bulleted-list' && type !== 'numbered-list') {
        var isActive = (0, _utils.hasBlock)(state, type);
        var isList = (0, _utils.hasBlock)(state, 'list-item');

        if (isList) {
          transform.setBlock(isActive ? DEFAULT_NODE : type).unwrapBlock('bulleted-list').unwrapBlock('numbered-list');
        } else {
          transform.setBlock(isActive ? DEFAULT_NODE : type);
        }
      } else {
        // Handle the extra wrapping required for list buttons.

        var _isList = (0, _utils.hasBlock)(state, 'list-item');
        var isType = state.blocks.some(function (block) {
          return !!document.getClosest(block.key, function (parent) {
            return parent.type === type;
          });
        });

        if (_isList && isType) {
          transform.setBlock(DEFAULT_NODE).unwrapBlock('bulleted-list').unwrapBlock('numbered-list');
        } else if (_isList) {
          transform.unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list').wrapBlock(type);
        } else {
          transform.setBlock('list-item').wrapBlock(type);
        }
      }

      state = transform.apply();
      _this.onChange(state);
    }, _this.onClickLink = function (e) {
      e.preventDefault();
      var state = _this.props.state;

      var hasLinks = (0, _utils.hasInline)(state, 'link');

      if (hasLinks) {
        state = state.transform().unwrapInline('link').apply();
      } else if (state.isExpanded) {
        var href = window.prompt('Enter the URL of the link:');
        state = state.transform().wrapInline({
          type: 'link',
          data: { href: href }
        }).collapseToEnd().apply();
      } else {
        var _href = window.prompt('Enter the URL of the link:');
        var text = window.prompt('Enter the text for the link:');
        state = state.transform().insertText(text).extend(0 - text.length).wrapInline({
          type: 'link',
          data: { href: _href }
        }).collapseToEnd().apply();
      }

      _this.onChange(state);
    }, _this.renderMarkButton = function (type, IconComponent) {
      var isActive = (0, _utils.hasMark)(_this.props.state, type);
      var onMouseDown = function onMouseDown(e) {
        return _this.onClickMark(e, type);
      };

      return _react2.default.createElement(
        'span',
        {
          className: 'button',
          onMouseDown: onMouseDown,
          'data-active': isActive,
          style: { fill: isActive ? 'green' : 'black' }
        },
        _react2.default.createElement(IconComponent, null)
      );
    }, _this.renderBlockButton = function (type, IconComponent) {
      var isActive = (0, _utils.hasBlock)(_this.props.state, type);
      var onMouseDown = function onMouseDown(e) {
        return _this.onClickBlock(e, type);
      };

      return _react2.default.createElement(
        'span',
        {
          className: 'button',
          onMouseDown: onMouseDown,
          'data-active': isActive,
          style: { fill: isActive ? 'green' : 'black' }
        },
        _react2.default.createElement(IconComponent, null)
      );
    }, _this.renderGenericButton = function (action, IconComponent, isActive) {
      return _react2.default.createElement(
        'span',
        {
          className: 'button',
          onMouseDown: action,
          'data-active': isActive,
          style: { fill: isActive ? 'green' : 'black' }
        },
        _react2.default.createElement(IconComponent, null)
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} e
   * @param {String} type
   */

  _createClass(Toolbar, [{
    key: 'render',


    // TODO: this should be linked to constants defining marks
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'toolbar' },
        this.props.onSave && this.renderGenericButton(this.onSave, _saveSvg2.default, this.canUndo()),
        this.renderGenericButton(this.onUndo, _undoSvg2.default, this.canUndo()),
        this.renderGenericButton(this.onRedo, _redoSvg2.default, this.canRedo()),
        this.renderMarkButton('bold', _format_boldSvg2.default),
        this.renderMarkButton('italic', _format_italicSvg2.default),
        this.renderGenericButton(this.onClickLink, _linkSvg2.default),
        this.renderBlockButton('heading-one', _filter_1Svg2.default),
        this.renderBlockButton('heading-two', _filter_2Svg2.default)
      );
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;

exports.default = Toolbar;