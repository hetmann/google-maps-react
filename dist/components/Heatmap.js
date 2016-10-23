(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', '../lib/String'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('../lib/String'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.String);
    global.Heatmap = mod.exports;
  }
})(this, function (exports, _react, _String) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Heatmap = undefined;

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var evtNames = ['click', 'mouseover', 'recenter', 'drag', 'dragstart', 'dragend'];

  var wrappedPromise = function wrappedPromise() {
    var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
      wrappedPromise.resolve = resolve;
      wrappedPromise.reject = reject;
    });
    wrappedPromise.then = promise.then.bind(promise);
    wrappedPromise.catch = promise.catch.bind(promise);
    wrappedPromise.promise = promise;

    return wrappedPromise;
  };

  var Heatmap = exports.Heatmap = function (_React$Component) {
    _inherits(Heatmap, _React$Component);

    function Heatmap() {
      _classCallCheck(this, Heatmap);

      return _possibleConstructorReturn(this, (Heatmap.__proto__ || Object.getPrototypeOf(Heatmap)).apply(this, arguments));
    }

    _createClass(Heatmap, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.heatmapPromise = wrappedPromise();
        this.Heatmap();
      }

      // componentDidUpdate(prevProps) {
      //   if ((this.props.map !== prevProps.map) ||
      //     (this.props.position !== prevProps.position)) {
      //       this.Heatmap();
      //   }
      // }

    }, {
      key: 'componentWillUpdate',
      value: function componentWillUpdate(nextProps) {
        if (this.heatmap) {
          this.heatmap.setMap(null);
        }

        this.Heatmap();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.heatmap) {
          this.heatmap.setMap(null);
        }
      }
    }, {
      key: 'Heatmap',
      value: function Heatmap() {
        var _this2 = this;

        var _props = this.props;
        var map = _props.map;
        var google = _props.google;
        var position = _props.position;
        var positions = _props.positions;
        var mapCenter = _props.mapCenter;

        var rest = _objectWithoutProperties(_props, ['map', 'google', 'position', 'positions', 'mapCenter']);

        if (!google) {
          return null;
        }

        var pref = _extends({}, rest);
        this.heatmap = new google.maps.visualization.HeatmapLayer(pref);

        evtNames.forEach(function (e) {
          _this2.heatmap.addListener(e, _this2.handleEvent(e));
        });

        this.heatmap.setMap(map);
        this.heatmapPromise.resolve(this.heatmap);
      }
    }, {
      key: 'Heatmap',
      value: function Heatmap() {
        return this.heatmapPromise;
      }
    }, {
      key: 'handleEvent',
      value: function handleEvent(evt) {
        var _this3 = this;

        return function (e) {
          var evtName = 'on' + (0, _String.camelize)(evt);
          if (_this3.props[evtName]) {
            _this3.props[evtName](_this3.props, _this3.heatmap, e);
          }
        };
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return Heatmap;
  }(_react2.default.Component);

  Heatmap.propTypes = {
    position: _react.PropTypes.object,
    map: _react.PropTypes.object
  };

  evtNames.forEach(function (e) {
    return Heatmap.propTypes[e] = _react.PropTypes.func;
  });

  Heatmap.defaultProps = {
    name: 'Heatmap'
  };

  exports.default = Heatmap;
});