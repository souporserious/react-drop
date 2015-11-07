import React, { Component, Children, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Drop from '../src/react-drop'
import Travel from 'react-travel'
import './main.scss'

class App extends Component {
  state = {
    isOpen: true,
    toggleHeight: false,
    position: 'top',
    align: 'middle',
    toggleContent: false
  }

  componentDidMount() {
    // position example in the middle
    this.refs.example.scrollLeft = 925
    this.refs.example.scrollTop = 925
    
    // allow correct position of drop after first render
    this.forceUpdate()
  }

  render() {
    const { isOpen, toggleHeight, position, align, toggleContent } = this.state

    return(
      <div className="app">
        <button onClick={() => this.setState({isOpen: !isOpen})}>
          Toggle Drop
        </button>
        <select
          value={position}
          onChange={
            e => this.setState({position: e.target.value})
          }
        >
          <option value="top">Top</option>
          <option value="right">Right</option>
          <option value="bottom">Bottom</option>
          <option value="left">Left</option>
        </select>
        <select
          value={align}
          onChange={
            e => this.setState({align: e.target.value})
          }
        >
          <option value="left">Left</option>
          <option value="middle">Middle</option>
          <option value="right">Right</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>
        <button onClick={() => this.setState({toggleContent: !this.state.toggleContent})}>
          Toggle Drop Content
        </button>
        <button onClick={() => this.setState({toggleHeight: !this.state.toggleHeight})}>
          {toggleHeight ? <span>Decrease Height</span> : <span>Increase Height</span>}
        </button>

        <div ref="example" className="drop-example">
          <div className="drop-scroll-content">
            <div
              ref="target"
              style={{
                width: 200,
                height: toggleHeight ? 300 : 200,
                padding: 12,
                background: '#b4da55',
              }}
              onClick={() => this.setState({isOpen: !isOpen})}
            />
            {
              isOpen &&
              <Drop
                target={this.refs.target}
                position={position}
                align={align}
              >
                <div
                  style={{
                    padding: 12,
                    background: '#FF9800'
                  }}
                >
                  Dropped Content
                  {
                    toggleContent &&
                    <div>Can have state too :)</div>
                  }
                </div>
              </Drop>
            }
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));