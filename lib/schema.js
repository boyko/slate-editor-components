'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = {
  nodes: {
    'bulleted-list': function bulletedList(props) {
      return _react2.default.createElement(
        'ul',
        props.attributes,
        props.children
      );
    },
    'numbered-list': function numberedList(props) {
      return _react2.default.createElement(
        'ol',
        props.attributes,
        props.children
      );
    },
    code: function code(props) {
      return _react2.default.createElement(
        'pre',
        null,
        _react2.default.createElement(
          'code',
          props.attributes,
          props.children
        )
      );
    },
    'heading-one': function headingOne(props) {
      return _react2.default.createElement(
        'h1',
        props.attributes,
        props.children
      );
    },
    'heading-two': function headingTwo(props) {
      return _react2.default.createElement(
        'h2',
        props.attributes,
        props.children
      );
    },
    'heading-three': function headingThree(props) {
      return _react2.default.createElement(
        'h3',
        props.attributes,
        props.children
      );
    },
    'heading-four': function headingFour(props) {
      return _react2.default.createElement(
        'h4',
        props.attributes,
        props.children
      );
    },
    'heading-five': function headingFive(props) {
      return _react2.default.createElement(
        'h5',
        props.attributes,
        props.children
      );
    },
    'heading-six': function headingSix(props) {
      return _react2.default.createElement(
        'h6',
        props.attributes,
        props.children
      );
    },
    'list-item': function listItem(props) {
      return _react2.default.createElement(
        'li',
        props.attributes,
        props.children
      );
    },
    quote: function quote(props) {
      return _react2.default.createElement(
        'blockquote',
        props.attributes,
        props.children
      );
    }
  },
  marks: {
    bold: function bold(props) {
      return _react2.default.createElement(
        'strong',
        null,
        props.children
      );
    },
    code: function code(props) {
      return _react2.default.createElement(
        'code',
        null,
        props.children
      );
    },
    italic: function italic(props) {
      return _react2.default.createElement(
        'em',
        null,
        props.children
      );
    },
    underlined: function underlined(props) {
      return _react2.default.createElement(
        'u',
        null,
        props.children
      );
    }
  }
};

exports.default = schema;