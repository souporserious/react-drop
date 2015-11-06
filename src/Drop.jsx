import React, { Component, Children, PropTypes, cloneElement } from 'react'
import ReactDOM from 'react-dom'
import Travel from 'react-travel'
import shallowCompare from 'react-addons-shallow-compare'
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

    // bail out if target isn't available yet
    if (!target) return

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
    const { offsetWidth, offsetHeight } = this._drop

    if (this.state.dirty ||
        offsetWidth !== this._lastDrop.offsetWidth &&
        offsetHeight !== this._lastDrop.offsetHeight) {
      // position drop content
      this.position()

      // store dimensions to compare against next update
      this._lastDrop = { offsetWidth, offsetHeight }
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
    const { position, align, offset } = this.props
    const { target, content, viewport } = this._getDimensions()
    const { scrollLeft, scrollTop } = document.body
    let x = 0
    let y = 0

    //this._positioning()
    
    switch (position) {
      case 'top':
        x = target.left
        y = target.top - content.height

        if (align === 'middle') {
          x = target.left + (target.width/2) - (content.width/2)
        }
        if (align === 'right') {
          x = target.right - content.width
        }
        break
      case 'right':
        x = target.right
        y = target.top

        if (align === 'middle') {
          y = target.top + (target.height/2) - (content.height/2)
        }

        if (align === 'bottom') {
          y = target.bottom - content.height
        }
        break
      case 'bottom':
        x = target.left
        y = target.bottom

        if (align === 'middle') {
          x = target.left + (target.width/2) - (content.width/2)
        }

        if (align === 'right') {
          x = target.right - content.width
        }
        break
      case 'left':
        x = target.left - content.width
        y = target.top

        if (align === 'middle') {
          y = target.top + (target.height/2) - (content.height/2)
        }

        if (align === 'bottom') {
          y = target.bottom - content.height
        }
        break
    }

    x += scrollLeft + offset.left
    y += scrollTop + offset.top
    
    this.setState({x, y, dirty: false})
  }

  _getDimensions() {
    const { pageXOffset, pageYOffset, innerWidth, innerHeight } = window

    return {
      target: this.props.target.getBoundingClientRect(),
      content: this._drop.getBoundingClientRect(),
      viewport: {
        left: pageXOffset,
        top: pageYOffset,
        right: pageXOffset + innerWidth,
        bottom: pageYOffset + innerHeight
      }
    }
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