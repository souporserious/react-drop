export default function isColliding(scrollParent, content) {
  let viewport = {}
  let element = {}
  let collisions = []

  // get the proper viewport dimensions
  if (scrollParent === document) {
    const { pageXOffset, pageYOffset, innerWidth, innerHeight } = window

    scrollParent = document.body
    viewport = {
      left:   pageXOffset,
      top:    pageYOffset,
      right:  pageXOffset + innerWidth,
      bottom: pageYOffset + innerHeight
    }
  } else {
    const { scrollLeft, scrollTop, offsetWidth, offsetHeight } = scrollParent

    viewport = {
      left:   scrollLeft,
      top:    scrollTop,
      right:  scrollLeft + offsetWidth,
      bottom: scrollTop + offsetHeight
    }
  }
  
  const elementRect = content.getBoundingClientRect()

  if (scrollParent === document.body) {
    element = {
      left: elementRect.left + scrollParent.scrollLeft,
      top: elementRect.top + scrollParent.scrollTop,
      right: elementRect.right + scrollParent.scrollLeft,
      bottom: elementRect.bottom + scrollParent.scrollTop
    }
  } else {
    const viewportRect = scrollParent.getBoundingClientRect()

    element = {
      left: elementRect.left + scrollParent.scrollLeft - viewportRect.left,
      top: elementRect.top + scrollParent.scrollTop - viewportRect.top,
      right: elementRect.right + scrollParent.scrollLeft - viewportRect.left,
      bottom: elementRect.bottom + scrollParent.scrollTop - viewportRect.top
    }
  }

  if (viewport.left > element.left) {
    collisions.push('left')
  }
  if (viewport.top > element.top) {
    collisions.push('top')
  }
  if (viewport.right < element.right) {
    collisions.push('right')
  }
  if (viewport.bottom < element.bottom) {
    collisions.push('bottom')
  }
  return collisions
}