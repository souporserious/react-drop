import React, { Component, Children, PropTypes } from 'react'
import Drop from '../src/react-drop'

import './main.scss'

class App extends Component {
  render() {
    return(
      <div className="app">
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));