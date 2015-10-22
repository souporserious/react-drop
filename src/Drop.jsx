import React, { Component, Children, PropTypes, createElement, cloneElement } from 'react'
import DOM from 'react-dom'
import shallowCompare from 'react/lib/shallowCompare'

class Drop extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    dimensions: PropTypes.object,
    position: PropTypes.string,
    align: PropTypes.string,
    topOffset: PropTypes.number,
    leftOffset: PropTypes.number,
    getRef: PropTypes.func
  }

  static defaultProps = {
    visible: false,
    dimensions: {
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    position: 'bottom',
    // align: 'left', TODO align left, center, right
    topOffset: 0,
    leftOffset: 0,
    getRef: () => null
  }
  
  _getPosition() {
    const { dimensions, position, topOffset, leftOffset } = this.props
    const { width, height, top, right, bottom, left } = dimensions
    const { scrollTop, scrollLeft } = document.body
    const style = { top, left }

    switch(position) {
      case 'top':
        style.transform = 'translateY(-100%)'
        style.WebkitTransform = 'translateY(-100%)'
        break
      case 'right':
        style.left = right
        break
      case 'bottom':
        style.top = bottom
        break
      case 'left':
        style.transform = 'translateX(-100%)'
        style.WebkitTransform = 'translateX(-100%)'
        break
    }

    style.top += scrollTop + topOffset
    style.left += scrollLeft + leftOffset

    return style
  }

  render() {
    const { Portal } = Services.Components.Helpers
    const { children, visible, onLeave, getRef } = this.props
    const position = this._getPosition()

    return(
      <Portal>
        <div
          style={{
            position: 'absolute',
            ...position,
            zIndex: 10000
          }}
        >
          <Transition
            onlyChild={true}
            enter={{
              scale: spring(1, [400, 38]),
              opacity: spring(1, [400, 38])
            }}
            leave={{
              scale: spring(0.98, [380, 34]),
              opacity: spring(0, [380, 34])
            }}
            onLeave={onLeave}
          >
            {
              visible &&
              <div
                ref={c => getRef(c)}
                {...this.props}
              >
                {children}
              </div>
            }
          </Transition>
        </div>
      </Portal>
    )
  }
}

export default Drop