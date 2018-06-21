'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This file is part of antd-modal
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.antd-modal/blob/master/LICENSE

var _require = require('react'),
    Component = _require.Component,
    h = _require.createElement;

var AntDModal = require('antd/lib/modal');

var Save = function (_Component) {
  _inherits(Save, _Component);

  function Save(props) {
    _classCallCheck(this, Save);

    var _this = _possibleConstructorReturn(this, (Save.__proto__ || Object.getPrototypeOf(Save)).call(this, props));

    _this.state = {
      visible: true,
      saving: false
    };
    return _this;
  }

  _createClass(Save, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          saveText = _props.saveText,
          children = _props.children;
      var _state = this.state,
          visible = _state.visible,
          saving = _state.saving;


      return h(AntDModal, {
        title: title,
        okText: saveText,
        visible: visible,
        destroyOnClose: true,
        confirmLoading: saving,
        onOk: this.handleOk,
        onCancel: this.handleCancel,
        afterClose: this.handleClosed
      }, children);
    }
  }, {
    key: 'handleOk',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setState({ saving: true });
                _context.prev = 1;
                _context.next = 4;
                return this.props.handleSave(event);

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](1);
                return _context.abrupt('return', this.handleNotSaved(event));

              case 9:
                return _context.abrupt('return', this.handleSaved(event));

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 6]]);
      }));

      function handleOk(_x) {
        return _ref.apply(this, arguments);
      }

      return handleOk;
    }()
  }, {
    key: 'handleSaved',
    value: function handleSaved(event) {
      this.setState({
        visible: false,
        saving: false
      });
    }
  }, {
    key: 'handleNotSaved',
    value: function handleNotSaved(event) {
      this.setState({
        saving: false
      });
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel(event) {
      if (!this.state.saving) this.setState({ visible: false });
    }
  }, {
    key: 'handleClosed',
    value: function handleClosed() {
      this.props.handleClosed();
      this.setState({ visible: true });
    }
  }]);

  return Save;
}(Component);

module.exports = {
  Save: Save
};
