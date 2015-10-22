'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactLibShallowCompare = require('react/lib/shallowCompare');

var _reactLibShallowCompare2 = _interopRequireDefault(_reactLibShallowCompare);

var Drop = (function (_Component) {
  _inherits(Drop, _Component);

  function Drop() {
    _classCallCheck(this, Drop);

    _get(Object.getPrototypeOf(Drop.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Drop, [{
    key: '_getPosition',
    value: function _getPosition() {
      var _props = this.props;
      var dimensions = _props.dimensions;
      var position = _props.position;
      var topOffset = _props.topOffset;
      var leftOffset = _props.leftOffset;
      var width = dimensions.width;
      var height = dimensions.height;
      var top = dimensions.top;
      var right = dimensions.right;
      var bottom = dimensions.bottom;
      var left = dimensions.left;
      var _document$body = document.body;
      var scrollTop = _document$body.scrollTop;
      var scrollLeft = _document$body.scrollLeft;

      var style = { top: top, left: left };

      switch (position) {
        case 'top':
          style.transform = 'translateY(-100%)';
          style.WebkitTransform = 'translateY(-100%)';
          break;
        case 'right':
          style.left = right;
          break;
        case 'bottom':
          style.top = bottom;
          break;
        case 'left':
          style.transform = 'translateX(-100%)';
          style.WebkitTransform = 'translateX(-100%)';
          break;
      }

      style.top += scrollTop + topOffset;
      style.left += scrollLeft + leftOffset;

      return style;
    }
  }, {
    key: 'render',
    value: function render() {
      var Portal = Services.Components.Helpers.Portal;
      var _props2 = this.props;
      var children = _props2.children;
      var visible = _props2.visible;
      var onLeave = _props2.onLeave;
      var getRef = _props2.getRef;

      var position = this._getPosition();

      return _react2['default'].createElement(
        Portal,
        null,
        _react2['default'].createElement(
          'div',
          {
            style: _extends({
              position: 'absolute'
            }, position, {
              zIndex: 10000
            })
          },
          _react2['default'].createElement(
            Transition,
            {
              onlyChild: true,
              enter: {
                scale: spring(1, [400, 38]),
                opacity: spring(1, [400, 38])
              },
              leave: {
                scale: spring(0.98, [380, 34]),
                opacity: spring(0, [380, 34])
              },
              onLeave: onLeave
            },
            visible && _react2['default'].createElement(
              'div',
              _extends({
                ref: function (c) {
                  return getRef(c);
                }
              }, this.props),
              children
            )
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      visible: _react.PropTypes.bool,
      dimensions: _react.PropTypes.object,
      position: _react.PropTypes.string,
      align: _react.PropTypes.string,
      topOffset: _react.PropTypes.number,
      leftOffset: _react.PropTypes.number,
      getRef: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
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
      getRef: function getRef() {
        return null;
      }
    },
    enumerable: true
  }]);

  return Drop;
})(_react.Component);

exports['default'] = Drop;
module.exports = exports['default'];