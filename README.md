## React Drop 0.1.1

Drop content anywhere on the page.

## Install

`npm install react-drop --save`

`bower install react-drop --save`

## Example Usage

```javascript
import Drop from 'react-drop'

class App extends Component {
  state = {
    isOpen: false
  }

  render() {
    return(
      const { isOpen } = this.state
      <div>
        <button
          ref="trigger"
          onClick={() => {this.setState({isOpen: !isOpen})}}
        >
          Toggle Dropped Content
        </button>
        {
          isOpen &&
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
        }
      </div>
    )
  }
}
```

## Props

#### `target:` PropTypes.object

Accepts a DOM node which the Drop component is attached to.

#### `position:` PropTypes.string

The position of the Drop component. Accepts `top`, `right`, `bottom`, or `left`.

#### `align:` PropTypes.string

How the Drop component is aligned. Accepts `left`, `middle`, `right`, `top`, or `bottom`.

#### `offset:` PropTypes.shape({top: PropTypes.number, left: PropTypes.number})

Adjust the top and/or left offset of where the content is dropped.

## Quirks

With the way React works, there are some quirks. If you need to show the content before the target component is rendered you will need to add a `forceUpdate` inside the target component's `componentDidMount` lifecycle method. If there is another way this can be fixed, I am open to suggestions.

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