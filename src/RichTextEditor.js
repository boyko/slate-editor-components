import React from 'react';
import PropTypes from 'prop-types';
import { Editor, Html } from 'slate';
import parse5 from 'parse5';
import schema from './schema';
import Toolbar from './Toolbar';
import configureLinkPlugin from './plugins/Link';
import RULES from './html';

const linkPlugin = configureLinkPlugin();

const plugins = [
  linkPlugin,
];

const rules = RULES.concat([linkPlugin.html]);

export const serializer = new Html({ rules, parseHtml: parse5.parse });

const propTypes = {
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  // plugins: PropTypes.array,
};

const defaultProps = {
  onSave: null,
  // plugins: [],
};

class RichTextEditor extends React.Component {
  onChange = (state) => {
    this.props.onChange(state);
  };

  render = () => {
    const { state } = this.props;

    return (
      <div className="editor">
        <Toolbar
          state={state}
          onChange={this.onChange}
          onSave={this.props.onSave}
        />
        <Editor
          schema={schema}
          plugins={plugins}
          state={state}
          onChange={this.onChange}
        />
      </div>
    );
  };
}

RichTextEditor.propTypes = propTypes;
RichTextEditor.defaultProps = defaultProps;

export default RichTextEditor;
