'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _slate = require('slate');

var _isUrl = require('is-url');

var _isUrl2 = _interopRequireDefault(_isUrl);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Define the default node type.
 */

var DEFAULT_NODE = 'paragraph';

var propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  onSave: _propTypes2.default.func,
  state: _propTypes2.default.object.isRequired,
  schema: _propTypes2.default.object,
  plugins: _propTypes2.default.array
};

var defaultProps = {
  schema: _schema2.default
};

/**
 * The rich text example.
 *
 * @type {Component}
 */

var RichText = function (_React$Component) {
  _inherits(RichText, _React$Component);

  function RichText(props, context) {
    _classCallCheck(this, RichText);

    var _this = _possibleConstructorReturn(this, (RichText.__proto__ || Object.getPrototypeOf(RichText)).call(this, props, context));

    _this.state = _this.props.state;

    _this.hasMark = _this.hasMark.bind(_this);
    _this.hasBlock = _this.hasBlock.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onClickMark = _this.onClickMark.bind(_this);
    _this.onClickBlock = _this.onClickBlock.bind(_this);
    _this.onUndo = _this.onUndo.bind(_this);
    _this.onRedo = _this.onRedo.bind(_this);
    _this.renderMarkButton = _this.renderMarkButton.bind(_this);
    _this.renderBlockButton = _this.renderBlockButton.bind(_this);
    _this.renderGenericButton = _this.renderGenericButton.bind(_this);
    _this.onSave = _this.onSave.bind(_this);
    _this.renderEditor = _this.renderEditor.bind(_this);
    _this.hasInline = _this.hasInline.bind(_this);
    _this.onClickLink = _this.onClickLink.bind(_this);
    return _this;
  }

  _createClass(RichText, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.state = props.state;
    }
  }, {
    key: 'hasMark',
    value: function hasMark(type) {
      return this.state.marks.some(function (mark) {
        return mark.type === type;
      });
    }
  }, {
    key: 'hasBlock',
    value: function hasBlock(type) {
      return this.state.blocks.some(function (node) {
        return node.type === type;
      });
    }
  }, {
    key: 'hasInline',
    value: function hasInline(type) {
      return this.state.inlines.some(function (inline) {
        return inline.type === type;
      });
    }

    /**
     * On change, save the new state.
     *
     * @param {State} state
     */

  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.props.onChange(state);
    }

    /**
     * On key down, if it's a formatting command toggle a mark.
     *
     * @param {Event} e
     * @param {Object} data
     * @param {State} state
     * @return {State}
     */

  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e, data, state) {
      if (!data.isMod) return;
      var mark = void 0;

      switch (data.key) {
        case 'b':
          mark = 'bold';
          break;
        case 'i':
          mark = 'italic';
          break;
        case 'u':
          mark = 'underlined';
          break;
        case '`':
          mark = 'code';
          break;
        default:
          return;
      }

      var nextState = state.transform().toggleMark(mark).apply();

      e.preventDefault();
      return nextState;
    }

    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} e
     * @param {String} type
     */

  }, {
    key: 'onClickMark',
    value: function onClickMark(e, type) {
      e.preventDefault();

      var state = this.state.transform().toggleMark(type).apply();

      this.onChange(state);
    }

    /**
     * When a block button is clicked, toggle the block type.
     *
     * @param {Event} e
     * @param {String} type
     */

  }, {
    key: 'onClickBlock',
    value: function onClickBlock(e, type) {
      e.preventDefault();
      var transform = this.state.transform();
      var document = this.state.document;

      var state = void 0;

      // Handle everything but list buttons.
      if (type !== 'bulleted-list' && type !== 'numbered-list') {
        var isActive = this.hasBlock(type);
        var isList = this.hasBlock('list-item');

        if (isList) {
          transform.setBlock(isActive ? DEFAULT_NODE : type).unwrapBlock('bulleted-list').unwrapBlock('numbered-list');
        } else {
          transform.setBlock(isActive ? DEFAULT_NODE : type);
        }
      }

      // Handle the extra wrapping required for list buttons.
      else {
          var _isList = this.hasBlock('list-item');
          var isType = this.state.blocks.some(function (block) {
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
      this.onChange(state);
    }

    /**
     * @param {Event} e
     */

  }, {
    key: 'onClickLink',
    value: function onClickLink(e) {
      e.preventDefault();
      var state = void 0;
      var hasLinks = this.hasInline('link');

      if (hasLinks) {
        state = this.state.transform().unwrapInline('link').apply();
      } else if (this.state.isExpanded) {
        var href = window.prompt('Enter the URL of the link:');
        state = this.state.transform().wrapInline({
          type: 'link',
          data: { href: href }
        }).collapseToEnd().apply();
      } else {
        var _href = window.prompt('Enter the URL of the link:');
        var text = window.prompt('Enter the text for the link:');
        state = this.state.transform().insertText(text).extend(0 - text.length).wrapInline({
          type: 'link',
          data: { href: _href }
        }).collapseToEnd().apply();
      }

      this.onChange(state);
    }

    /**
     * Render.
     *
     * @return {Element}
     */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.renderToolbar(),
        this.renderEditor()
      );
    }

    /**
     * Render the toolbar.
     *
     * @return {Element}
     */

  }, {
    key: 'renderToolbar',
    value: function renderToolbar() {
      return _react2.default.createElement(
        'div',
        { className: 'menu toolbar-menu' },
        this.props.onSave && this.renderGenericButton('save_icon', this.onSave),
        this.renderGenericButton('undo_icon', this.onUndo),
        this.renderGenericButton('redo_icon', this.onRedo),
        this.renderMarkButton('bold', 'format_bold'),
        this.renderMarkButton('italic', 'format_italic'),
        this.renderMarkButton('underlined', 'format_underlined'),
        this.renderMarkButton('code', 'code'),
        this.renderBlockButton('heading-one', 'looks_one'),
        this.renderBlockButton('heading-two', 'looks_two'),
        this.renderBlockButton('block-quote', 'format_quote'),
        this.renderBlockButton('numbered-list', 'format_list_numbered'),
        this.renderBlockButton('bulleted-list', 'format_list_bulleted')
      );
    }
  }, {
    key: 'renderMarkButton',


    /**
     * Render a mark-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    value: function renderMarkButton(type, icon) {
      var _this2 = this;

      var isActive = this.hasMark(type);
      var onMouseDown = function onMouseDown(e) {
        return _this2.onClickMark(e, type);
      };

      return _react2.default.createElement(
        'span',
        { className: 'button', onMouseDown: onMouseDown, 'data-active': isActive },
        _react2.default.createElement(
          'span',
          { className: 'material-icons' },
          icon
        )
      );
    }
  }, {
    key: 'renderGenericButton',
    value: function renderGenericButton(icon, onMouseDown) {
      return _react2.default.createElement(
        'span',
        { className: 'button', onMouseDown: onMouseDown },
        _react2.default.createElement(
          'span',
          { className: 'material-icons' },
          icon
        )
      );
    }

    /**
     * Render a block-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

  }, {
    key: 'renderBlockButton',
    value: function renderBlockButton(type, icon) {
      var _this3 = this;

      var isActive = this.hasBlock(type);
      var onMouseDown = function onMouseDown(e) {
        return _this3.onClickBlock(e, type);
      };

      return _react2.default.createElement(
        'span',
        { className: 'button', onMouseDown: onMouseDown, 'data-active': isActive },
        _react2.default.createElement(
          'span',
          { className: 'material-icons' },
          icon
        )
      );
    }

    /**
     * Render the Slate editor.
     *
     * @return {Element}
     */

  }, {
    key: 'renderEditor',
    value: function renderEditor() {
      return _react2.default.createElement(
        'div',
        { className: 'editor' },
        _react2.default.createElement(_slate.Editor, {
          spellCheck: true,
          placeholder: 'Enter some rich text...',
          schema: this.props.schema,
          state: this.state,
          plugins: this.props.plugins,
          onChange: this.onChange,
          onKeyDown: this.onKeyDown
        })
      );
    }
  }]);

  return RichText;
}(_react2.default.Component);

RichText.propTypes = propTypes;
RichText.defaultProps = defaultProps;

/**
 * Export.
 */

exports.default = RichText;