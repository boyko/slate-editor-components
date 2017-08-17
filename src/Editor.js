import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'slate';
import isUrl from 'is-url';

/**
 * Define the default node type.
 */

import schema from './schema';

const DEFAULT_NODE = 'paragraph';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  state: PropTypes.object.isRequired,
  schema: PropTypes.object,
  plugins: PropTypes.array,
};

const defaultProps = {
  schema,
};

/**
 * The rich text example.
 *
 * @type {Component}
 */

class RichText extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = this.props.state;

    this.hasMark = this.hasMark.bind(this);
    this.hasBlock = this.hasBlock.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClickMark = this.onClickMark.bind(this);
    this.onClickBlock = this.onClickBlock.bind(this);
    this.onUndo = this.onUndo.bind(this);
    this.onRedo = this.onRedo.bind(this);
    this.renderMarkButton = this.renderMarkButton.bind(this);
    this.renderBlockButton = this.renderBlockButton.bind(this);
    this.renderGenericButton = this.renderGenericButton.bind(this);
    this.onSave = this.onSave.bind(this);
    this.renderEditor = this.renderEditor.bind(this);
    this.hasInline = this.hasInline.bind(this);
    this.onClickLink = this.onClickLink.bind(this);
  }

  componentWillReceiveProps(props) {
    this.state = props.state;
  }

  hasMark(type) {
    return this.state.marks.some(mark => mark.type === type);
  }

  hasBlock(type) {
    return this.state.blocks.some(node => node.type === type);
  }

  hasInline(type) {
    return this.state.inlines.some(inline => inline.type === type);
  }

  /**
   * On change, save the new state.
   *
   * @param {State} state
   */

  onChange(state) {
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

  onKeyDown(e, data, state) {
    if (!data.isMod) return;
    let mark;

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

    const nextState = state
      .transform()
      .toggleMark(mark)
      .apply();

    e.preventDefault();
    return nextState;
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} e
   * @param {String} type
   */

  onClickMark(e, type) {
    e.preventDefault();

    const state = this.state
      .transform()
      .toggleMark(type)
      .apply();

    this.onChange(state);
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} e
   * @param {String} type
   */

  onClickBlock(e, type) {
    e.preventDefault();
    const transform = this.state.transform();
    const { document } = this.state;
    let state;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        transform
          .setBlock(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      }

      else {
        transform
          .setBlock(isActive ? DEFAULT_NODE : type);
      }
    }

    // Handle the extra wrapping required for list buttons.
    else {
      const isList = this.hasBlock('list-item');
      const isType = this.state.blocks.some((block) => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        transform
          .setBlock(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        transform
          .unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
          .wrapBlock(type);
      } else {
        transform
          .setBlock('list-item')
          .wrapBlock(type);
      }
    }

    state = transform.apply();
    this.onChange(state);
  }

  /**
   * @param {Event} e
   */

  onClickLink(e) {
    e.preventDefault();
    let state;
    const hasLinks = this.hasInline('link');

    if (hasLinks) {
      state = this.state
        .transform()
        .unwrapInline('link')
        .apply();
    } else if (this.state.isExpanded) {
      const href = window.prompt('Enter the URL of the link:');
      state = this.state
        .transform()
        .wrapInline({
          type: 'link',
          data: { href },
        })
        .collapseToEnd()
        .apply();
    } else {
      const href = window.prompt('Enter the URL of the link:');
      const text = window.prompt('Enter the text for the link:');
      state = this.state
        .transform()
        .insertText(text)
        .extend(0 - text.length)
        .wrapInline({
          type: 'link',
          data: { href },
        })
        .collapseToEnd()
        .apply();
    }

    this.onChange(state);
  }

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    return (
      <div>
        {this.renderToolbar()}
        {this.renderEditor()}
      </div>
    );
  }

  /**
   * Render the toolbar.
   *
   * @return {Element}
   */

  renderToolbar() {
    return (
      <div className="menu toolbar-menu">
        {this.props.onSave && this.renderGenericButton('save_icon', this.onSave)}
        {this.renderGenericButton('undo_icon', this.onUndo)}
        {this.renderGenericButton('redo_icon', this.onRedo)}
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
        {this.renderBlockButton('heading-one', 'looks_one')}
        {this.renderBlockButton('heading-two', 'looks_two')}
        {this.renderBlockButton('block-quote', 'format_quote')}
        {this.renderBlockButton('numbered-list', 'format_list_numbered')}
        {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
      </div>
    );
  };

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton(type, icon) {
    const isActive = this.hasMark(type);
    const onMouseDown = e => this.onClickMark(e, type);

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    );
  }

  renderGenericButton(icon, onMouseDown) {
    return (
      <span className="button" onMouseDown={onMouseDown}>
        <span className="material-icons">{icon}</span>
      </span>
    );
  }

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton(type, icon) {
    const isActive = this.hasBlock(type);
    const onMouseDown = e => this.onClickBlock(e, type);

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    );
  }

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */

  renderEditor() {
    return (
      <div className="editor">
        <Editor
          spellCheck
          placeholder={'Enter some rich text...'}
          schema={this.props.schema}
          state={this.state}
          plugins={this.props.plugins}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}

RichText.propTypes = propTypes;
RichText.defaultProps = defaultProps;

/**
 * Export.
 */

export default RichText;
