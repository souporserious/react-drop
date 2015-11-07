export default function isColliding(scrollParent, target, content, attachment) {
  const { scrollLeft, scrollTop, offsetWidth, offsetHeight } = scrollParent
  const viewport = {
    left: scrollLeft,
    top: scrollTop,
    right: scrollLeft + offsetWidth,
    bottom: scrollTop + offsetHeight
  }
  let collisions = []

  if (viewport.left > target.offsetLeft) {
    collisions.push('left')
  }
  if (viewport.top > target.offsetTop - content.offsetHeight) {
    collisions.push('top')
  }
  if (viewport.right < target.offsetLeft + content.offsetWidth) {
    collisions.push('right')
  }
  if (viewport.bottom < target.offsetTop) {
    collisions.push('bottom')
  }
  return collisions
}