class ResizeHandler {
  constructor() {
    this._queue = []
    this.update = this.update.bind(this)
    this.create()
  }

  create() {
    window.addEventListener('resize', this.update)
  }

  destroy() {
    this._queue = []
    window.removeEventListener('resize', this.update)
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

  update() {
    for (let i = this._queue.length; i--;) {
      this._queue[i].position()
    }
  }
}

export default ResizeHandler