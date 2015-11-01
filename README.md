## React Drop 0.1.0

Drop content anywhere on the page.

## Install

`npm install react-drop --save`

`bower install react-drop --save`

## Example Usage

```javascript
import Drop from 'react-drop';

class App extends Component {
  state = {
    isOpen: false
  }

  render() {
    return(
      <div>
        <button
          ref="trigger"
          onClick={() => {this.setState({})}}
        >
          Trigger Content
        </button>
        <Drop
          target={this.refs.trigger}
          position="top"
          align="middle"
        >
          <div>
              <h2>Dropped Content</h2>
              <p>A paragraph to accompany the title.</p>
          </div>
        </Drop>
      </div>
    )
  }
}
```

## Props

#### `target:` PropTypes.object

Accepts a DOM node which the Drop component is attached to. If getting `undefined` when using `refs`, try adding `forceUpdate` inside your trigger component's did mount lifecycle.

#### `position:` PropTypes.string

The position of the Drop component. Accepts `top`, `right`, `bottom`, or `left`.

#### `align:` PropTypes.string

How the Drop component is aligned. Accepts `left`, `middle`, `right`, `top`, or `bottom`.

#### `offset:` PropTypes.shape({top: PropTypes.number, left: PropTypes.number})

Adjust the top and/or left offset of where the content is dropped.

## Run Example

clone repo

`git clone git@github.com:souporserious/react-drop.git`

move into folder

`cd ~/react-drop`

install dependencies

`npm install`

run dev mode

`npm run dev`

open your browser and visit: `http://localhost:8080/`