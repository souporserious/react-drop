class ResizeHandler {
  constructor() {
    this._queue = []
    this._isTicking = false
    this.create()
  }

  create() {
    window.addEventListener('resize', this._resizeHandler)
  }

  destroy() {
    this._queue = []
    window.removeEventListener('resize', this._resizeHandler)
  }

  add(component) {
    this._queue.push(component)
  }

  remove(component) {
    const pos = this._queue.indexOf(component)
    if (pos > -1) {
      this._queue.splice(pos, 1)
    }    
  }

  _resizeHandler = () => {
    if(!this.isTicking) {
      window.requestAnimationFrame(this.update)
    }
    this.isTicking = true
  }

  update = () => {
    for (let i = this._queue.length; i--;) {
      this._queue[i].position()
    }
    this.isTicking = false
  }
}

export default ResizeHandler