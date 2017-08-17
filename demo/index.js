import 'babel-polyfill';
import ReactDOM from 'react-dom';
import parse5 from 'parse5';
import { Editor, Html, Raw } from 'slate';
import React from 'react';
import initialState from './state.json';
import schema from '../src/schema';
import Toolbar from './Toolbar';
import configureLinkPlugin from '../src/plugins/Link';
import RULES from '../src/html';

const linkPlugin = configureLinkPlugin();
const plugins = [
  linkPlugin,
];

/**
 * Tags to blocks.
 *
 * @type {Object}
 */


/**
 * Create a new HTML serializer with `RULES`.
 *
 * @type {Html}
 */

const rules = RULES.concat([linkPlugin.html]);

const serializer = new Html({ rules, parseHtml: parse5.parse });

/**
 * The pasting html example.
 *
 * @type {Component}
 */

class PasteHtml extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: Raw.deserialize(initialState, { terse: true }),
    };
  }

  /**
   * Deserialize the raw initial state.
   *
   * @type {Object}
   */


  /**
   * On change, save the new state.
   *
   * @param {State} state
   */

  onChange = (state) => {
    this.setState({ state });
  };

  /**
   * On paste, deserialize the HTML and then insert the fragment.
   *
   * @param {Event} e
   * @param {Object} data
   * @param {State} state
   */

  onPaste = (e, data, state) => {
    if (data.type !== 'html') return;
    if (data.isShift) return;

    const { document } = serializer.deserialize(data.html);

    return state
      .transform()
      .insertFragment(document)
      .apply();
  };

  onSerialize = () => {
    console.log(serializer.serialize(this.state.state));
  };

  /**
   * Render.
   *
   * @return {Component}
   */

  render = () => {
    return (
      <div className="editor">
        <button onClick={this.onSerialize}>Serialize</button>
        <Toolbar
          state={this.state.state}
          onChange={this.onChange}
        />
        <Editor
          schema={schema}
          plugins={plugins}
          state={this.state.state}
          onPaste={this.onPaste}
          onChange={this.onChange}
        />
      </div>
    );
  };

}

/**
 * Export.
 */


ReactDOM.render(
  <PasteHtml />,
  document.getElementById('root'),
);
