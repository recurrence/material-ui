'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Transition = require('react-transition-group/Transition');

var _Transition2 = _interopRequireDefault(_Transition);

var _transitions = require('../styles/transitions');

var _withTheme = require('../styles/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reflow = function reflow(node) {
  return node.scrollTop;
};

/**
 * The Zoom transition is used by the SpeedDial component.
 * It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
// @inheritedComponent Transition

var Zoom = function (_React$Component) {
  (0, _inherits3.default)(Zoom, _React$Component);

  function Zoom() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Zoom);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Zoom.__proto__ || (0, _getPrototypeOf2.default)(Zoom)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      mounted: false
    }, _this.handleEnter = function (node) {
      node.style.transform = 'scale(0)';
      reflow(node);

      if (_this.props.onEnter) {
        _this.props.onEnter(node);
      }
    }, _this.handleEntering = function (node) {
      var _this$props = _this.props,
          theme = _this$props.theme,
          timeout = _this$props.timeout;

      node.style.transition = theme.transitions.create('transform', {
        duration: typeof timeout === 'number' ? timeout : timeout.enter
      });
      node.style.webkitTransition = theme.transitions.create('transform', {
        duration: typeof timeout === 'number' ? timeout : timeout.enter
      });
      node.style.transform = 'scale(1)';
      node.style.transitionDelay = _this.props.enterDelay + 'ms';

      if (_this.props.onEntering) {
        _this.props.onEntering(node);
      }
    }, _this.handleExit = function (node) {
      var _this$props2 = _this.props,
          theme = _this$props2.theme,
          timeout = _this$props2.timeout;

      node.style.transition = theme.transitions.create('transform', {
        duration: typeof timeout === 'number' ? timeout : timeout.exit
      });
      node.style.webkitTransition = theme.transitions.create('transform', {
        duration: typeof timeout === 'number' ? timeout : timeout.exit
      });
      node.style.transform = 'scale(0)';

      if (_this.props.onExit) {
        _this.props.onExit(node);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Zoom, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ mounted: true }); // eslint-disable-line react/no-did-mount-set-state
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          appear = _props.appear,
          children = _props.children,
          enterDelay = _props.enterDelay,
          onEnter = _props.onEnter,
          onEntering = _props.onEntering,
          onExit = _props.onExit,
          styleProp = _props.style,
          theme = _props.theme,
          other = (0, _objectWithoutProperties3.default)(_props, ['appear', 'children', 'enterDelay', 'onEnter', 'onEntering', 'onExit', 'style', 'theme']);


      var style = {};

      // For server side rendering.
      if (!this.props.in && !this.state.mounted && appear) {
        style.transform = 'scale(0)';
      }

      style = (0, _extends3.default)({}, style, styleProp, _react2.default.isValidElement(children) ? children.props.style : {});

      return _react2.default.createElement(
        _Transition2.default,
        (0, _extends3.default)({
          appear: appear,
          style: style,
          onEnter: this.handleEnter,
          onEntering: this.handleEntering,
          onExit: this.handleExit
        }, other),
        children
      );
    }
  }]);
  return Zoom;
}(_react2.default.Component);

Zoom.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * @ignore
   */
  appear: _propTypes2.default.bool,
  /**
   * A single child content element.
   */
  children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
  /**
   * The duration before the enter animation starts in milliseconds.
   */
  enterDelay: _propTypes2.default.number,
  /**
   * If `true`, the component will transition in.
   */
  in: _propTypes2.default.bool,
  /**
   * @ignore
   */
  onEnter: _propTypes2.default.func,
  /**
   * @ignore
   */
  onEntering: _propTypes2.default.func,
  /**
   * @ignore
   */
  onExit: _propTypes2.default.func,
  /**
   * @ignore
   */
  style: _propTypes2.default.object,
  /**
   * @ignore
   */
  theme: _propTypes2.default.object.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({ enter: _propTypes2.default.number, exit: _propTypes2.default.number })])
} : {};

Zoom.defaultProps = {
  appear: true,
  enterDelay: 0,
  timeout: {
    enter: _transitions.duration.enteringScreen,
    exit: _transitions.duration.leavingScreen
  }
};

exports.default = (0, _withTheme2.default)()(Zoom);