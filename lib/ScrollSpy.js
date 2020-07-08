"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ScrollSpy = function ScrollSpy(props) {
  //Since we are using fragment as parent, we use the first child as ref on the DOM
  var domTarget = (0, _react.useRef)(null); //Source of the scroll, fallback to window in case of undefined

  var source = (0, _react.useRef)(props.source); //Tracking of tasks

  var status = ''; //settimeout ref for canceling

  var inTO = null;
  var outTO = null;
  var top = '_t_';
  var bottom = '_b_';
  var left = '_l_';
  var right = '_r_';
  var indexes = [-100, -90, -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  var cleanClasses = function cleanClasses(element) {
    //Clean all classes
    var classesX = indexes.map(function (index) {
      return 'inviewX' + (index > 0 ? right + index : (index === 0 ? '_' : left) + index * -1);
    });
    element.classList.remove.apply(element.classList, classesX);
    var classesY = indexes.map(function (index) {
      return 'inviewY' + (index > 0 ? bottom + index : (index === 0 ? '_' : top) + index * -1);
    });
    element.classList.remove.apply(element.classList, classesY);
  }; //Triggered when element enter the view


  var enterView = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(element, deltaX, deltaY) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              element.classList.add('inview'); //Execute custom function pass as prop (can be a promise)

              if (!props.onEnter) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return props.onEnter(element, deltaX, deltaY);

            case 4:
              status = 'in';

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function enterView(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }(); //Triggered when element leave the view (can be a promise)


  var leaveView = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(element) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              //Clean all progress classes
              cleanClasses(element); //Call whileinview with max delta to prevent speed scroll

              _context2.next = 3;
              return whileInView(element, -1, -1);

            case 3:
              //Remove inview class
              element.classList.remove('inview'); //Execute custom function pass as prop

              if (!props.onLeave) {
                _context2.next = 7;
                break;
              }

              _context2.next = 7;
              return props.onLeave(element);

            case 7:
              status = 'out';

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function leaveView(_x4) {
      return _ref2.apply(this, arguments);
    };
  }(); //Triggered while element is in the view


  var whileInView = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(element, deltaX, deltaY) {
      var attr;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              /*
              Add classes to indicate % of the view ditance
              ex : Vertical values = from bottom inviewY_b_100,inviewY_b_90,... to screen center inviewY_0 to top ...,inviewY_b_90,inviewY_t_100
              */
              cleanClasses(element); //Prepare an oject ot add as attribute

              attr = {};

              if (!props.ignoreX) {
                element.classList.add('inviewX' + (deltaX < 0 ? right : deltaX === 0 ? '_' : left) + (deltaX < 0 ? -deltaX : deltaX) * 100);
                attr.deltaX = deltaX;
              }

              if (!props.ignoreY) {
                element.classList.add('inviewY' + (deltaY < 0 ? top : deltaY === 0 ? '_' : bottom) + (deltaY < 0 ? -deltaY : deltaY) * 100);
                attr.deltaY = deltaY;
              } //Add the % from -1 to 1 as attribute


              element.setAttribute("delta", attr); //Execute custom function pass as prop

              if (!props.whileInView) {
                _context3.next = 8;
                break;
              }

              _context3.next = 8;
              return props.whileInView(element, deltaX, deltaY);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function whileInView(_x5, _x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }();

  var onScroll = (0, _react.useCallback)(function (e) {
    //The function on scrolling
    var target = domTarget.current;

    if (props.target === 'parent') {
      target = target.parentNode;
    } //view bounds


    var view = {
      width: window.innerWidth,
      height: window.innerHeight
    }; //Element bounds

    var bounds = target.getBoundingClientRect();

    if (bounds.top <= view.height - props.offsetY && bounds.top >= 0 + props.offsetY || props.ignoreY) {
      //Element is in view verticaly
      if (bounds.left <= view.width - props.offsetX && bounds.left >= 0 + props.offsetX || props.ignoreX) {
        //Element is in view horizontaly
        //Calculate % of distance from the middle of the screen (-1 to 1) for both axis
        //Calculated only if the axis is not ignored
        var progressX = 0;

        if (!props.ignoreX) {
          progressX = Math.round((bounds.left - view.width / 2) / (view.width / 2 - props.offsetX) * 10) / 10;
        }

        var progressY = 0;

        if (!props.ignoreY) {
          progressY = Math.round((bounds.top - view.height / 2) / (view.height / 2 - props.offsetY) * 10) / 10;
        } //Execute on scroll functions


        whileInView(domTarget.current, progressX, progressY); //Element is in view

        if (status !== 'animate' && status !== 'in') {
          //Execute only on enter
          status = 'animate';
          inTO = setTimeout(function () {
            enterView(domTarget.current);
          }, props.delayIn);
        }
      } else {
        //Element leave the view on left or right
        if (!props.animateOnce && status === 'in') {
          status = 'animate';
          outTO = setTimeout(function () {
            leaveView(domTarget.current);
          }, props.delayOut);
          return;
        }
      }
    } else {
      //Element leave the view on top or bottom
      if (!props.animateOnce && status === 'in') {
        status = 'animate';
        outTO = setTimeout(function () {
          leaveView(domTarget.current);
        }, props.delayOut);
        return;
      }
    }
  });
  (0, _react.useEffect)(function () {
    //Executed each time the target or the source change
    //Handle window fallback
    var scrollSource = source.current;

    if (scrollSource === undefined || scrollSource === null) {
      scrollSource = window;
    } //Add the listener


    scrollSource.addEventListener('scroll', onScroll);
    return function () {
      //On unmount, clear timeouts and remove listener
      clearTimeout(inTO);
      clearTimeout(outTO);
      scrollSource.removeEventListener('scroll', onScroll);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domTarget.current, source.current]);

  if (!props.children) {
    return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null);
  } //if there's only one child, transform it to an array so we can map in the render


  var children = props.children;

  if (!Array.isArray(props.children)) {
    children = [props.children];
  }

  return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, children && children.map(function (element, k) {
    if (k === 0) {
      //First child become the reference
      var Element = element.type;

      var elementProps = _objectSpread({
        key: k,
        ref: domTarget
      }, element.props);

      return /*#__PURE__*/_react["default"].createElement(Element, elementProps);
    } else {
      return element;
    }
  }));
};

ScrollSpy.propTypes = {
  spyid: _propTypes["default"].string,
  offsetX: _propTypes["default"].number,
  offsetY: _propTypes["default"].number,
  delayIn: _propTypes["default"].number,
  delayOut: _propTypes["default"].number,
  animateOnce: _propTypes["default"].bool,
  ignoreX: _propTypes["default"].bool,
  ignoreY: _propTypes["default"].bool,
  target: function target(props, propName, componentName) {
    if (props[propName] !== 'parent' && props[propName] instanceof HTMLElement) {
      return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Validation failed.');
    }
  }
};
ScrollSpy.defaultProps = {
  spyid: "",
  offsetX: 0,
  offsetY: 100,
  delayIn: 0,
  delayOut: 0,
  animateOnce: false,
  ignoreX: true,
  ignoreY: false,
  target: null
};
var _default = ScrollSpy;
exports["default"] = _default;