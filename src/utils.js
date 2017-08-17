
export function hasMark(state, type) {
  return state.marks.some(mark => mark.type === type);
}

export function hasBlock(state, type) {
  return state.blocks.some(node => node.type === type);
}

export function hasInline(state, type) {
  return state.inlines.some(inline => inline.type === type);
}
