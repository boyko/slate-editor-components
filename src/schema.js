import React from 'react';

const schema = {
  nodes: {
    'bulleted-list': props => <ul {...props.attributes}>{props.children}</ul>,
    'numbered-list': props => <ol {...props.attributes}>{props.children}</ol>,
    code: props => <pre><code {...props.attributes}>{props.children}</code></pre>,
    'heading-one': props => <h1 {...props.attributes}>{props.children}</h1>,
    'heading-two': props => <h2 {...props.attributes}>{props.children}</h2>,
    'heading-three': props => <h3 {...props.attributes}>{props.children}</h3>,
    'heading-four': props => <h4 {...props.attributes}>{props.children}</h4>,
    'heading-five': props => <h5 {...props.attributes}>{props.children}</h5>,
    'heading-six': props => <h6 {...props.attributes}>{props.children}</h6>,
    'list-item': props => <li {...props.attributes}>{props.children}</li>,
    quote: props => <blockquote {...props.attributes}>{props.children}</blockquote>,
  },
  marks: {
    bold: props => <strong>{props.children}</strong>,
    code: props => <code>{props.children}</code>,
    italic: props => <em>{props.children}</em>,
    underlined: props => <u>{props.children}</u>,
  },
};

export default schema;
