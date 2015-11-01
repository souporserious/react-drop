import React, { Component, Children, PropTypes, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import Travel from 'react-travel'
import shallowCompare from 'react/lib/shallowCompare'
import ResizeHandler from './Resize-Handler'
import getScrollParent from './get-scroll-parent'

const resizeHandler = new ResizeHandler()

class Drop extends Component {
  static propTypes = {
    target: PropTypes.object,
    position: PropTypes.string,
    align: PropTypes.string,
    offset: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number
    })
  }

  static defaultProps = {
    position: 'top',
    align: 'left',
    offset: {
      top: 0,
      left: 0
    }
  }

  state = {
    drop: null,
    dirty: true,
    positioning: true,
    x: 0,
    y: 0
  }
  _scrollParent = undefined
  _isPositioning = false
  _isMounted = false
  _lastDrop = {}

  componentDidMount() {
    const { target } = this.props

    // keep track of us being mounted or not
    this._isMounted = true

    // position the dropped content
    this.position()

    // check if there is a scrollable parent
    this._scrollParent = getScrollParent(target)

    // if so we need to reposition on that parent's scroll
    if (this._scrollParent !== document.body) {
      this._scrollParent.addEventListener('scroll', this.position)
    }

    // reposition on window resize
    resizeHandler.add(this)
  }

  componentWillReceiveProps({children}) {
    if (this.props.children !== children) {
      this.setState({dirty: true})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentDidUpdate() {
    if (this.state.dirty ||
        this._drop.offsetWidth !== this._lastDrop.width &&
        this._drop.offsetHeight !== this._lastDrop.height) {
      this.position()
    }
  }

  componentWillUnmount() {
    this._isMounted = false

    if (typeof this._scrollParent !== 'undefined') {
      this._scrollParent.removeEventListener('scroll', this.position)
    }

    resizeHandler.remove(this)
  }

  position = () => {
    const { target, position, align, offset } = this.props
    const { scrollTop, scrollLeft } = document.body
    const targetRect = target.getBoundingClientRect()
    const dropRect = {
      width: this._drop.offsetWidth,
      height: this._drop.offsetHeight
    }
    let x = 0
    let y = 0

    this._positioning()
    
    switch (position) {
      case 'top':
        x = targetRect.left
        y = targetRect.top - dropRect.height

        if (align === 'middle') {
          x = targetRect.left + (targetRect.width/2) - (dropRect.width/2)
        }
        if (align === 'right') {
          x = targetRect.right - dropRect.width
        }
        break
      case 'right':
        x = targetRect.right
        y = targetRect.top

        if (align === 'middle') {
          y = targetRect.top + (targetRect.height/2) - (dropRect.height/2)
        }

        if (align === 'bottom') {
          y = targetRect.bottom - dropRect.height
        }
        break
      case 'bottom':
        x = targetRect.left
        y = targetRect.bottom

        if (align === 'middle') {
          x = targetRect.left + (targetRect.width/2) - (dropRect.width/2)
        }

        if (align === 'right') {
          x = targetRect.right - dropRect.width
        }
        break
      case 'left':
        x = targetRect.left - dropRect.width
        y = targetRect.top

        if (align === 'middle') {
          y = targetRect.top + (targetRect.height/2) - (dropRect.height/2)
        }

        if (align === 'bottom') {
          y = targetRect.bottom - dropRect.height
        }
        break
    }

    x += scrollTop + offset.top
    y += scrollLeft + offset.left
    
    this.setState({x, y, dirty: false}, () => {
      // store the last drop so we can compare changes
      this._lastDrop = dropRect
    })
  }

  _getDimensions() {
    const { scrollTop, scrollLeft } = document.body

    this.setState({
      target: target.getBoundingClientRect(),
      content: {
        width: this._drop.offsetWidth,
        height: this._drop.offsetHeight
      },
      scrollTop,
      scrollLeft
    })
  }
  
  _positioning() {
    this._isPositioning = true

    this.setState({positioning: true}, () => {
      this._isPositioning = false
      
      // stop positioning after 350ms, used to disable pointer events
      setTimeout(() => {
        if(!this._isPositioning && this._isMounted) {
          this.setState({positioning: false})
        }
      }, 350)
    })
  }

  render() {
    const { children, onWheel } = this.props
    const { positioning, x, y} = this.state
    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: `translate(${x}px, ${y}px)`,
      zIndex: 10000,
      pointerEvents: positioning ? 'none' : 'auto'
    }
    
    return(
      <Travel getNode={n => this._drop = n} style={style}>
        {
          cloneElement(
            Children.only(children),
            {
              onWheel: (e) => {
                this.setState({positioning: true})
                onWheel && onWheel(e)
              }
            }
          )
        }
      </Travel>
    )
  }
}

export default Drop