import 'babel-polyfill';
import ReactDOM from 'react-dom';
import { Raw } from 'slate';
import React from 'react';
import initialState from './state.json';

import Editor, { serializer } from '../src/RichTextEditor';

class PasteHtml extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: Raw.deserialize(initialState, { terse: true }),
    };
  }

  /**
   * On change, save the new state.
   *
   * @param {State} state
   */

  onChange = (state) => {
    this.setState({ state });
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
        <Editor
          state={this.state.state}
          onChange={this.onChange}
          onSave={this.onSerialize}
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
