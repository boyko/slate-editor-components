import React from 'react';
import PropTypes from 'prop-types';
import SaveIcon from 'react-material-icons/lib/save.svg.react';
import UndoIcon from 'react-material-icons/lib/undo.svg.react';
import RedoIcon from 'react-material-icons/lib/redo.svg.react';
import BoldIcon from 'react-material-icons/lib/format_bold.svg.react';
import ItalicIcon from 'react-material-icons/lib/format_italic.svg.react';
import LinkIcon from 'react-material-icons/lib/link.svg.react';
import HeadingOneIcon from 'react-material-icons/lib/filter_1.svg.react';
import HeadingTwoIcon from 'react-material-icons/lib/filter_2.svg.react';

import { hasMark, hasBlock, hasInline } from '../utils';

// defined  in index.js, not DRY
const DEFAULT_NODE = 'paragrpah';

const propTypes = {
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func,
};

const defaultProps = {
  onSave: null,
};

class Toolbar extends React.Component {

  onChange = (state) => {
    this.props.onChange(state);
  };

  canUndo = () => {
    return this.props.state.hasUndos;
  };

  canRedo = () => {
    return this.props.state.hasRedos;
  };

  onUndo = () => {
    const nextState = this.props.state
      .transform()
      .undo()
      .apply({ save: false });

    this.onChange(nextState);
  };

  onRedo = () => {
    const nextState = this.props.state
      .transform()
      .redo()
      .apply({ save: false });

    this.onChange(nextState);
  };

  onSave = () => {
    this.props.onSave(this.props.state);
  };

  onClickMark = (e, type) => {
    e.preventDefault();
    let { state } = this.props;

    state = state
      .transform()
      .toggleMark(type)
      .apply();

    this.onChange(state);
  };

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} e
   * @param {String} type
   */

  onClickBlock = (e, type) => {
    e.preventDefault();
    let { state } = this.props;
    const transform = state.transform();
    const { document } = state;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = hasBlock(state, type);
      const isList = hasBlock(state, 'list-item');

      if (isList) {
        transform
          .setBlock(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        transform
          .setBlock(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.

      const isList = hasBlock(state, 'list-item');
      const isType = state.blocks.some((block) => {
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
  };

  onClickLink = (e) => {
    e.preventDefault();
    let { state } = this.props;
    const hasLinks = hasInline(state, 'link');

    if (hasLinks) {
      state = state
        .transform()
        .unwrapInline('link')
        .apply();
    } else if (state.isExpanded) {
      const href = window.prompt('Enter the URL of the link:');
      state = state
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
      state = state
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
  };

  renderMarkButton = (type, IconComponent) => {
    const isActive = hasMark(this.props.state, type);
    const onMouseDown = e => this.onClickMark(e, type);

    return (
      <span
        className="button"
        onMouseDown={onMouseDown}
        data-active={isActive}
        style={{ fill: isActive ? 'green' : 'black' }}
      >
        <IconComponent />
      </span>
    );
  };

  renderBlockButton = (type, IconComponent) => {
    const isActive = hasBlock(this.props.state, type);
    const onMouseDown = e => this.onClickBlock(e, type);

    return (
      <span
        className="button"
        onMouseDown={onMouseDown}
        data-active={isActive}
        style={{ fill: isActive ? 'green' : 'black' }}
      >
        <IconComponent />
      </span>
    );
  };

  renderGenericButton = (action, IconComponent, isActive) => {
    return (
      <span
        className="button"
        onMouseDown={action}
        data-active={isActive}
        style={{ fill: isActive ? 'green' : 'black' }}
      >
        <IconComponent />
      </span>
    );
  };

  // TODO: this should be linked to constants defining marks
  render() {
    return (
      <div className="toolbar">
        {this.props.onSave && this.renderGenericButton(this.onSave, SaveIcon, this.canUndo())}
        {this.renderGenericButton(this.onUndo, UndoIcon, this.canUndo())}
        {this.renderGenericButton(this.onRedo, RedoIcon, this.canRedo())}
        {this.renderMarkButton('bold', BoldIcon)}
        {this.renderMarkButton('italic', ItalicIcon)}
        {this.renderGenericButton(this.onClickLink, LinkIcon)}
        {this.renderBlockButton('heading-one', HeadingOneIcon)}
        {this.renderBlockButton('heading-two', HeadingTwoIcon)}
      </div>
    );
  }
}

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;

export default Toolbar;
