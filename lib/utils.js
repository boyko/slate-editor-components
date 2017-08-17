"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasMark = hasMark;
exports.hasBlock = hasBlock;
exports.hasInline = hasInline;
function hasMark(state, type) {
  return state.marks.some(function (mark) {
    return mark.type === type;
  });
}

function hasBlock(state, type) {
  return state.blocks.some(function (node) {
    return node.type === type;
  });
}

function hasInline(state, type) {
  return state.inlines.some(function (inline) {
    return inline.type === type;
  });
}