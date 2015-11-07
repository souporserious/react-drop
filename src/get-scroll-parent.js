const POSITIONS = ['relative', 'absolute', 'fixed']

// shamelessly taken from https://github.com/HubSpot/tether/blob/master/src/js/utils.js
export default function getScrollParent(el) {
  const { position } = getComputedStyle(el) || {}

  if (position === 'fixed') {
    return el
  }

  let parent = el

  while (parent = parent.parentNode) {
    let style
    
    try {
      style = getComputedStyle(parent)
    } catch (err) {}

    if (typeof style === 'undefined' || style === null) {
      return parent
    }

    const {overflow, overflowX, overflowY} = style

    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' ||
          POSITIONS.indexOf(style.position) >= 0) {
        return parent
      }
    }
  }
  return document.body
}