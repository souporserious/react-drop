// shamelessly taken from https://github.com/HubSpot/tether/blob/master/src/js/utils.js
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getScrollParent;

function getScrollParent(el) {
  var _ref = getComputedStyle(el) || {};

  var position = _ref.position;

  if (position === 'fixed') {
    return el;
  }

  var parent = el;

  while (parent = parent.parentNode) {
    var style = undefined;

    try {
      style = getComputedStyle(parent);
    } catch (err) {}

    if (typeof style === 'undefined' || style === null) {
      return parent;
    }

    var _style = style;
    var overflow = _style.overflow;
    var overflowX = _style.overflowX;
    var overflowY = _style.overflowY;

    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
        return parent;
      }
    }
  }
  return document.body;
}

module.exports = exports['default'];