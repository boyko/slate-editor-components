import isUrl from 'is-url';
import { hasInline } from '../../utils';
import Link from './Link';
import configureRule from './rules';

function linkPlugin(opts = {}) {
  const Component = opts && opts.Component ? opts.Component : Link;
  const type = opts && opts.type ? opts.type : 'link';

  function onPaste(e, data, state) {
    if (state.isCollapsed) return;
    if (data.type !== 'text' && data.type !== 'html') return;
    if (!isUrl(data.text)) return;

    const transform = state.transform();

    if (hasInline(state, type)) {
      transform.unwrapInline(type);
    }

    return transform
      .wrapInline({
        type,
        data: {
          href: data.text,
        },
      })
      .collapseToEnd()
      .apply();
  }

  const schema = {
    nodes: {
      [type]: Component,
    },
  };

  const html = configureRule({ tag: 'a', type });

  return {
    onPaste,
    schema,
    html,
  };
}

export default linkPlugin;
