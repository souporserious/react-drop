'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTravel = require('react-travel');

var _reactTravel2 = _interopRequireDefault(_reactTravel);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _ResizeHandler = require('./Resize-Handler');

var _ResizeHandler2 = _interopRequireDefault(_ResizeHandler);

var _getScrollParent = require('./get-scroll-parent');

var _getScrollParent2 = _interopRequireDefault(_getScrollParent);

var resizeHandler = new _ResizeHandler2['default']();

var Drop = (function (_Component) {
  _inherits(Drop, _Component);

  function Drop() {
    var _this = this;

    _classCallCheck(this, Drop);

    _get(Object.getPrototypeOf(Drop.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      drop: null,
      dirty: true,
      positioning: true,
      x: 0,
      y: 0
    };
    this._scrollParent = undefined;
    this._isPositioning = false;
    this._isMounted = false;
    this._lastDrop = {};

    this.position = function () {
      var _props = _this.props;
      var target = _props.target;
      var position = _props.position;
      var align = _props.align;
      var offset = _props.offset;
      var _document$body = document.body;
      var scrollTop = _document$body.scrollTop;
      var scrollLeft = _document$body.scrollLeft;

      var targetRect = target.getBoundingClientRect();
      var dropRect = {
        width: _this._drop.offsetWidth,
        height: _this._drop.offsetHeight
      };
      var x = 0;
      var y = 0;

      _this._positioning();

      switch (position) {
        case 'top':
          x = targetRect.left;
          y = targetRect.top - dropRect.height;

          if (align === 'middle') {
            x = targetRect.left + targetRect.width / 2 - dropRect.width / 2;
          }
          if (align === 'right') {
            x = targetRect.right - dropRect.width;
          }
          break;
        case 'right':
          x = targetRect.right;
          y = targetRect.top;

          if (align === 'middle') {
            y = targetRect.top + targetRect.height / 2 - dropRect.height / 2;
          }

          if (align === 'bottom') {
            y = targetRect.bottom - dropRect.height;
          }
          break;
        case 'bottom':
          x = targetRect.left;
          y = targetRect.bottom;

          if (align === 'middle') {
            x = targetRect.left + targetRect.width / 2 - dropRect.width / 2;
          }

          if (align === 'right') {
            x = targetRect.right - dropRect.width;
          }
          break;
        case 'left':
          x = targetRect.left - dropRect.width;
          y = targetRect.top;

          if (align === 'middle') {
            y = targetRect.top + targetRect.height / 2 - dropRect.height / 2;
          }

          if (align === 'bottom') {
            y = targetRect.bottom - dropRect.height;
          }
          break;
      }

      x += scrollTop + offset.top;
      y += scrollLeft + offset.left;

      _this.setState({ x: x, y: y, dirty: false }, function () {
        // store the last drop so we can compare changes
        _this._lastDrop = dropRect;
      });
    };
  }

  _createClass(Drop, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var target = this.props.target;

      // keep track of us being mounted or not
      this._isMounted = true;

      // bail out if target isn't available yet
      if (!target) return;

      // position the dropped content
      this.position();

      // check if there is a scrollable parent
      this._scrollParent = (0, _getScrollParent2['default'])(target);

      // if so we need to reposition on that parent's scroll
      if (this._scrollParent !== document.body) {
        this._scrollParent.addEventListener('scroll', this.position);
      }

      // reposition on window resize
      resizeHandler.add(this);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var children = _ref.children;

      if (this.props.children !== children) {
        this.setState({ dirty: true });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _reactAddonsShallowCompare2['default'])(this, nextProps, nextState);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.dirty || this._drop.offsetWidth !== this._lastDrop.width && this._drop.offsetHeight !== this._lastDrop.height) {
        this.position();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._isMounted = false;

      if (typeof this._scrollParent !== 'undefined') {
        this._scrollParent.removeEventListener('scroll', this.position);
      }

      resizeHandler.remove(this);
    }
  }, {
    key: '_getDimensions',
    value: function _getDimensions() {
      var _document$body2 = document.body;
      var scrollTop = _document$body2.scrollTop;
      var scrollLeft = _document$body2.scrollLeft;

      this.setState({
        target: target.getBoundingClientRect(),
        content: {
          width: this._drop.offsetWidth,
          height: this._drop.offsetHeight
        },
        scrollTop: scrollTop,
        scrollLeft: scrollLeft
      });
    }
  }, {
    key: '_positioning',
    value: function _positioning() {
      var _this2 = this;

      this._isPositioning = true;

      this.setState({ positioning: true }, function () {
        _this2._isPositioning = false;

        // stop positioning after 350ms, used to disable pointer events
        setTimeout(function () {
          if (!_this2._isPositioning && _this2._isMounted) {
            _this2.setState({ positioning: false });
          }
        }, 350);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props;
      var children = _props2.children;
      var _onWheel = _props2.onWheel;
      var _state = this.state;
      var positioning = _state.positioning;
      var x = _state.x;
      var y = _state.y;

      var style = {
        position: 'absolute',
        top: 0,
        left: 0,
        transform: 'translate(' + x + 'px, ' + y + 'px)',
        zIndex: 10000,
        pointerEvents: positioning ? 'none' : 'auto'
      };

      return _react2['default'].createElement(
        _reactTravel2['default'],
        { getNode: function (n) {
            return _this3._drop = n;
          }, style: style },
        (0, _react.cloneElement)(_react.Children.only(children), {
          onWheel: function onWheel(e) {
            _this3.setState({ positioning: true });
            _onWheel && _onWheel(e);
          }
        })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      target: _react.PropTypes.object,
      position: _react.PropTypes.string,
      align: _react.PropTypes.string,
      offset: _react.PropTypes.shape({
        top: _react.PropTypes.number,
        left: _react.PropTypes.number
      })
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      position: 'top',
      align: 'left',
      offset: {
        top: 0,
        left: 0
      }
    },
    enumerable: true
  }]);

  return Drop;
})(_react.Component);

exports['default'] = Drop;
module.exports = exports['default'];