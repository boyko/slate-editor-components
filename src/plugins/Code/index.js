import Code from './Code';
import configureRule from './rules';

function configurePlugin(opts = {}) {
  const Component = opts && opts.Component ? opts.Component : Code;
  const type = opts && opts.type ? opts.type : 'code';

  const schema = {
    nodes: {
      [type]: Component,
    },
  };

  const html = configureRule({});

  return {
    schema,
    html,
  };
}

export default configurePlugin;
