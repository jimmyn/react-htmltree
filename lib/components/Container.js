'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _utilities = require('../utilities');

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Component: Container
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Update & delegation layer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var isBrowser = typeof HTMLElement !== 'undefined';

/**
 *
 */

var Container = function (_Component) {
  _inherits(Container, _Component);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this.state = {
      root: _this.getRoot(props),
      latest: null
    };
    return _this;
  }

  _createClass(Container, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.tree !== this.props.tree) {
        this.setState({
          root: this.getRoot(nextProps),
          latest: null
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onHover = _props.onHover,
          customRender = _props.customRender;
      var root = this.state.root;

      return _react2.default.createElement(
        'div',
        { className: 'Container' },
        _react2.default.createElement(
          'div',
          { className: 'Container__Nodes' },
          _react2.default.createElement(_Node2.default, {
            node: root,
            update: this.onUpdate.bind(this),
            onHover: onHover,
            customRender: customRender
          })
        ),
        _react2.default.createElement('input', {
          className: 'Container__Input',
          type: 'text',
          ref: 'input',
          onFocus: this.toggleFocus.bind(this),
          onBlur: this.toggleFocus.bind(this)
        })
      );
    }

    /**
     * Retrieve an immutable representation of the nodes (incl. extended/trimmed data)
     * @param  {Object}  props.tree                - [description]
     * @param  {Array}   props.defaultExpandedTags - [description]
     * @return {Object}                            - [description]
     */

  }, {
    key: 'getRoot',
    value: function getRoot(_ref) {
      var tree = _ref.tree,
          defaultExpandedTags = _ref.defaultExpandedTags;

      transformNodes(tree, [], true);
      return _immutable2.default.fromJS(tree[0]);

      // recursive enumeration
      function transformNodes(tree, keyPath, initial) {
        tree.forEach(function (node, i) {
          node.depth = (0, _utilities.getDepth)(node);
          node.selector = (0, _utilities.getSelector)(node.name ? node : node.parent);
          node.keyPath = initial ? keyPath : [].concat(_toConsumableArray(keyPath), ['children', i]);
          node.state = defaultExpandedTags.indexOf(node.name) > -1 ? { expanded: true } : {};
          if (node.children) {
            if (node.children.length) {
              node.children = node.children.filter(function (child) {
                return child.type !== 'text' || child.data.trim().length;
              });
              transformNodes(node.children, node.keyPath);
            } else {
              delete node.children;
            }
          }
          if (node.attribs && !Object.keys(node.attribs).length) {
            delete node.attribs;
          }
          delete node.parent;
          delete node.next;
          delete node.prev;
        });
      }
    }

    /**
     * [toggleFocus description]
     * @param  {Event} e - [description]
     */

  }, {
    key: 'toggleFocus',
    value: function toggleFocus(e) {
      var _this2 = this;

      e.preventDefault();
      e.stopPropagation();

      var latest = this.state.latest;


      if (e.type === 'focus') {
        return this.onUpdate(null, latest, 'toggleFocus', { selected: true, unfocused: false });
      }
      // === blur || delay to check upcoming click
      this.timeout = setTimeout(function () {
        return _this2.onUpdate(null, latest, 'toggleFocus', { selected: false, unfocused: true });
      }, 100);
    }

    /**
     * Reducer for different actions based on the type
     * @param  {String} type      - [description]
     * @param  {Object} component - [description]
     * @param  {Object} nextState - [description]
     */

    /**
     * Reducer for different actions based on the type
     * @param  {Event}          e         - [description]
     * @param  {ReactComponent} component - [description]
     * @param  {String}         type      - [description]
     * @param  {Object}         data      - [description]
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate(e, component, type, data) {
      var _context2;

      if (e && e.preventDefault) e.preventDefault();
      if (e && e.stopPropagation) e.stopPropagation();

      clearTimeout(this.timeout);

      var _props2 = this.props,
          origin = _props2.origin,
          onHover = _props2.onHover,
          onExpand = _props2.onExpand,
          onSelect = _props2.onSelect,
          onUnfocus = _props2.onUnfocus;
      var node = component.props.node;
      var _state = this.state,
          root = _state.root,
          latest = _state.latest;


      var name = node.get('name');
      var attribs = node.get('attribs');
      var selector = node.get('selector');

      var element = origin ? selector.match('>') ? origin.querySelectorAll(selector)[0] : origin : {
        // shallow representation
        tagName: name || node.get('type'),
        attributes: attribs && attribs.toJS(),
        selector: selector
      };

      var keyPath = [].concat(_toConsumableArray(node.get('keyPath').toJS()), ['state']);
      var updater = null; // toggle: (value) => !value

      switch (type) {
        case 'toggleHover':
          if (onHover && onHover.call(this, element, component) !== undefined) return;
          if (typeof data.tailed !== 'undefined') {
            keyPath = [].concat(_toConsumableArray(keyPath), ['tailed']);
            updater = function updater() {
              return data.tailed;
            };
            break;
          }
          return;

        case 'toggleExpand':
          if (onExpand && onExpand.call(this, element, component) !== undefined) return;
          // check: unfolding all children
          if (e.altKey && e.ctrlKey) {
            return this.setState({
              root: root.setIn([].concat(_toConsumableArray(node.get('keyPath').toJS())), (0, _utilities.setDeep)(node, 'children', ['state', 'expanded'], true))
            });
          }
          // TODO:
          // - fix [issue#1]('tailed')
          // console.log(node.toJSON(), data, e.target)
          keyPath = [].concat(_toConsumableArray(keyPath), ['expanded']);
          updater = function updater(expanded) {
            return !expanded;
          };
          break;

        case 'triggerSelect':
          if (latest) {
            var _context;

            this.refs.input.blur();
            var latestKeyPath = [].concat(_toConsumableArray(latest.props.node.get('keyPath').toJS()), ['state']);
            return this.setState({
              root: root.withMutations(function (map) {
                return map.setIn([].concat(_toConsumableArray(latestKeyPath), ['tailed']), false).setIn([].concat(_toConsumableArray(latestKeyPath), ['selected']), false).setIn([].concat(_toConsumableArray(latestKeyPath), ['unfocused']), false).setIn([].concat(_toConsumableArray(keyPath), ['tailed']), data.tailed);
              }),
              latest: component
            }, (_context = this.refs.input).focus.bind(_context));
          }
          return this.setState({
            root: root.setIn([].concat(_toConsumableArray(keyPath), ['tailed']), data.tailed),
            latest: component
          }, (_context2 = this.refs.input).focus.bind(_context2));

        case 'toggleFocus':
          if (data.selected) {
            if (onSelect && onSelect.call(this, element, component) !== undefined) return;
          } else {
            if (onUnfocus && onUnfocus.call(this, element, component) !== undefined) return;
          }
          return this.setState({
            root: root.withMutations(function (map) {
              return map.setIn([].concat(_toConsumableArray(keyPath), ['selected']), data.selected).setIn([].concat(_toConsumableArray(keyPath), ['unfocused']), data.unfocused);
            })
          });
      }

      this.setState({
        root: root.updateIn(keyPath, updater)
      });
    }
  }]);

  return Container;
}(_react.Component);

Container.propTypes = {
  tree: _propTypes2.default.array.isRequired,
  origin: _propTypes2.default.instanceOf(isBrowser && HTMLElement),
  defaultExpandedTags: _propTypes2.default.array.isRequired,
  customRender: _propTypes2.default.func,
  onHover: _propTypes2.default.func,
  onExpand: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  onUnfocus: _propTypes2.default.func
};
exports.default = Container;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ29udGFpbmVyLmpzeCJdLCJuYW1lcyI6WyJpc0Jyb3dzZXIiLCJIVE1MRWxlbWVudCIsIkNvbnRhaW5lciIsInByb3BzIiwic3RhdGUiLCJyb290IiwiZ2V0Um9vdCIsImxhdGVzdCIsIm5leHRQcm9wcyIsInRyZWUiLCJzZXRTdGF0ZSIsIm9uSG92ZXIiLCJjdXN0b21SZW5kZXIiLCJvblVwZGF0ZSIsInRvZ2dsZUZvY3VzIiwiZGVmYXVsdEV4cGFuZGVkVGFncyIsInRyYW5zZm9ybU5vZGVzIiwiZnJvbUpTIiwia2V5UGF0aCIsImluaXRpYWwiLCJmb3JFYWNoIiwibm9kZSIsImkiLCJkZXB0aCIsInNlbGVjdG9yIiwibmFtZSIsInBhcmVudCIsImluZGV4T2YiLCJleHBhbmRlZCIsImNoaWxkcmVuIiwibGVuZ3RoIiwiZmlsdGVyIiwiY2hpbGQiLCJ0eXBlIiwiZGF0YSIsInRyaW0iLCJhdHRyaWJzIiwiT2JqZWN0Iiwia2V5cyIsIm5leHQiLCJwcmV2IiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwic2VsZWN0ZWQiLCJ1bmZvY3VzZWQiLCJ0aW1lb3V0Iiwic2V0VGltZW91dCIsImNvbXBvbmVudCIsImNsZWFyVGltZW91dCIsIm9yaWdpbiIsIm9uRXhwYW5kIiwib25TZWxlY3QiLCJvblVuZm9jdXMiLCJnZXQiLCJlbGVtZW50IiwibWF0Y2giLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFnTmFtZSIsImF0dHJpYnV0ZXMiLCJ0b0pTIiwidXBkYXRlciIsImNhbGwiLCJ1bmRlZmluZWQiLCJ0YWlsZWQiLCJhbHRLZXkiLCJjdHJsS2V5Iiwic2V0SW4iLCJyZWZzIiwiaW5wdXQiLCJibHVyIiwibGF0ZXN0S2V5UGF0aCIsIndpdGhNdXRhdGlvbnMiLCJtYXAiLCJmb2N1cyIsInVwZGF0ZUluIiwicHJvcFR5cGVzIiwiYXJyYXkiLCJpc1JlcXVpcmVkIiwiaW5zdGFuY2VPZiIsImZ1bmMiXSwibWFwcGluZ3Mi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QyxPQUF2QjtBQURNLE9BQWQ7QUFHRDs7Ozs7O0FBN05rQjNELFMsQ0FDWjBFLFMsR0FBWTtBQUNqQm5FLFFBQU0sb0JBQVVvRSxLQUFWLENBQWdCQyxVQURMO0FBRWpCNUIsVUFBUSxvQkFBVTZCLFVBQVYsQ0FBcUIvRSxhQUFhQyxXQUFsQyxDQUZTO0FBR2pCYyx1QkFBcUIsb0JBQVU4RCxLQUFWLENBQWdCQyxVQUhwQjtBQUlqQmxFLGdCQUFjLG9CQUFVb0UsSUFKUDtBQUtqQnJFLFdBQVMsb0JBQVVxRSxJQUxGO0FBTWpCN0IsWUFBVSxvQkFBVTZCLElBTkg7QUFPakI1QixZQUFVLG9CQUFVNEIsSUFQSDtBQVFqQjNCLGFBQVcsb0JBQVUyQjtBQVJKLEM7a0JBREE5RSxTIiwiZmlsZSI6ImNvbXBvbmVudHMvQ29udGFpbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIENvbXBvbmVudDogQ29udGFpbmVyXG4gKlxuICogVXBkYXRlICYgZGVsZWdhdGlvbiBsYXllclxuICovXG5cbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBJbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHtnZXRTZWxlY3RvciwgZ2V0RGVwdGgsIHNldERlZXB9IGZyb20gJy4uL3V0aWxpdGllcyc7XG5pbXBvcnQgTm9kZSBmcm9tICcuL05vZGUnO1xuXG5jb25zdCBpc0Jyb3dzZXIgPSB0eXBlb2YgSFRNTEVsZW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdHJlZTogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgb3JpZ2luOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihpc0Jyb3dzZXIgJiYgSFRNTEVsZW1lbnQpLFxuICAgIGRlZmF1bHRFeHBhbmRlZFRhZ3M6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIGN1c3RvbVJlbmRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Ib3ZlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FeHBhbmQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblVuZm9jdXM6IFByb3BUeXBlcy5mdW5jXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHJvb3Q6IHRoaXMuZ2V0Um9vdChwcm9wcyksXG4gICAgICBsYXRlc3Q6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLnRyZWUgIT09IHRoaXMucHJvcHMudHJlZSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHJvb3Q6IHRoaXMuZ2V0Um9vdChuZXh0UHJvcHMpLFxuICAgICAgICBsYXRlc3Q6IG51bGxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7b25Ib3ZlciwgY3VzdG9tUmVuZGVyfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge3Jvb3R9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb250YWluZXJfX05vZGVzXCI+XG4gICAgICAgICAgPE5vZGVcbiAgICAgICAgICAgIG5vZGU9e3Jvb3R9XG4gICAgICAgICAgICB1cGRhdGU9ezo6dGhpcy5vblVwZGF0ZX1cbiAgICAgICAgICAgIG9uSG92ZXI9e29uSG92ZXJ9XG4gICAgICAgICAgICBjdXN0b21SZW5kZXI9e2N1c3RvbVJlbmRlcn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwiQ29udGFpbmVyX19JbnB1dFwiXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIHJlZj1cImlucHV0XCJcbiAgICAgICAgICBvbkZvY3VzPXs6OnRoaXMudG9nZ2xlRm9jdXN9XG4gICAgICAgICAgb25CbHVyPXs6OnRoaXMudG9nZ2xlRm9jdXN9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIGFuIGltbXV0YWJsZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgbm9kZXMgKGluY2wuIGV4dGVuZGVkL3RyaW1tZWQgZGF0YSlcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgcHJvcHMudHJlZSAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAgICogQHBhcmFtICB7QXJyYXl9ICAgcHJvcHMuZGVmYXVsdEV4cGFuZGVkVGFncyAtIFtkZXNjcmlwdGlvbl1cbiAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIGdldFJvb3Qoe3RyZWUsIGRlZmF1bHRFeHBhbmRlZFRhZ3N9KSB7XG4gICAgdHJhbnNmb3JtTm9kZXModHJlZSwgW10sIHRydWUpO1xuICAgIHJldHVybiBJbW11dGFibGUuZnJvbUpTKHRyZWVbMF0pO1xuXG4gICAgLy8gcmVjdXJzaXZlIGVudW1lcmF0aW9uXG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtTm9kZXModHJlZSwga2V5UGF0aCwgaW5pdGlhbCkge1xuICAgICAgdHJlZS5mb3JFYWNoKChub2RlLCBpKSA9PiB7XG4gICAgICAgIG5vZGUuZGVwdGggPSBnZXREZXB0aChub2RlKTtcbiAgICAgICAgbm9kZS5zZWxlY3RvciA9IGdldFNlbGVjdG9yKG5vZGUubmFtZSA/IG5vZGUgOiBub2RlLnBhcmVudCk7XG4gICAgICAgIG5vZGUua2V5UGF0aCA9IGluaXRpYWwgPyBrZXlQYXRoIDogWy4uLmtleVBhdGgsICdjaGlsZHJlbicsIGldO1xuICAgICAgICBub2RlLnN0YXRlID0gZGVmYXVsdEV4cGFuZGVkVGFncy5pbmRleE9mKG5vZGUubmFtZSkgPiAtMSA/IHtleHBhbmRlZDogdHJ1ZX0gOiB7fTtcbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuLmZpbHRlcihcbiAgICAgICAgICAgICAgY2hpbGQgPT4gY2hpbGQudHlwZSAhPT0gJ3RleHQnIHx8IGNoaWxkLmRhdGEudHJpbSgpLmxlbmd0aFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybU5vZGVzKG5vZGUuY2hpbGRyZW4sIG5vZGUua2V5UGF0aCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBub2RlLmNoaWxkcmVuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5hdHRyaWJzICYmICFPYmplY3Qua2V5cyhub2RlLmF0dHJpYnMpLmxlbmd0aCkge1xuICAgICAgICAgIGRlbGV0ZSBub2RlLmF0dHJpYnM7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIG5vZGUucGFyZW50O1xuICAgICAgICBkZWxldGUgbm9kZS5uZXh0O1xuICAgICAgICBkZWxldGUgbm9kZS5wcmV2O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFt0b2dnbGVGb2N1cyBkZXNjcmlwdGlvbl1cbiAgICogQHBhcmFtICB7RXZlbnR9IGUgLSBbZGVzY3JpcHRpb25dXG4gICAqL1xuICB0b2dnbGVGb2N1cyhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBjb25zdCB7bGF0ZXN0fSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAoZS50eXBlID09PSAnZm9jdXMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5vblVwZGF0ZShudWxsLCBsYXRlc3QsICd0b2dnbGVGb2N1cycsIHtzZWxlY3RlZDogdHJ1ZSwgdW5mb2N1c2VkOiBmYWxzZX0pO1xuICAgIH1cbiAgICAvLyA9PT0gYmx1ciB8fCBkZWxheSB0byBjaGVjayB1cGNvbWluZyBjbGlja1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMub25VcGRhdGUobnVsbCwgbGF0ZXN0LCAndG9nZ2xlRm9jdXMnLCB7c2VsZWN0ZWQ6IGZhbHNlLCB1bmZvY3VzZWQ6IHRydWV9KTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZHVjZXIgZm9yIGRpZmZlcmVudCBhY3Rpb25zIGJhc2VkIG9uIHRoZSB0eXBlXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdHlwZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIHtPYmplY3R9IGNvbXBvbmVudCAtIFtkZXNjcmlwdGlvbl1cbiAgICogQHBhcmFtICB7T2JqZWN0fSBuZXh0U3RhdGUgLSBbZGVzY3JpcHRpb25dXG4gICAqL1xuXG4gIC8qKlxuICAgKiBSZWR1Y2VyIGZvciBkaWZmZXJlbnQgYWN0aW9ucyBiYXNlZCBvbiB0aGUgdHlwZVxuICAgKiBAcGFyYW0gIHtFdmVudH0gICAgICAgICAgZSAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIHtSZWFjdENvbXBvbmVudH0gY29tcG9uZW50IC0gW2Rlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgdHlwZSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgZGF0YSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgb25VcGRhdGUoZSwgY29tcG9uZW50LCB0eXBlLCBkYXRhKSB7XG4gICAgaWYgKGUgJiYgZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChlICYmIGUuc3RvcFByb3BhZ2F0aW9uKSBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICBjb25zdCB7b3JpZ2luLCBvbkhvdmVyLCBvbkV4cGFuZCwgb25TZWxlY3QsIG9uVW5mb2N1c30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtub2RlfSA9IGNvbXBvbmVudC5wcm9wcztcbiAgICBjb25zdCB7cm9vdCwgbGF0ZXN0fSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBuYW1lID0gbm9kZS5nZXQoJ25hbWUnKTtcbiAgICBjb25zdCBhdHRyaWJzID0gbm9kZS5nZXQoJ2F0dHJpYnMnKTtcbiAgICBjb25zdCBzZWxlY3RvciA9IG5vZGUuZ2V0KCdzZWxlY3RvcicpO1xuXG4gICAgY29uc3QgZWxlbWVudCA9IG9yaWdpblxuICAgICAgPyBzZWxlY3Rvci5tYXRjaCgnPicpID8gb3JpZ2luLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpWzBdIDogb3JpZ2luXG4gICAgICA6IHtcbiAgICAgICAgICAvLyBzaGFsbG93IHJlcHJlc2VudGF0aW9uXG4gICAgICAgICAgdGFnTmFtZTogbmFtZSB8fCBub2RlLmdldCgndHlwZScpLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnMgJiYgYXR0cmlicy50b0pTKCksXG4gICAgICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yXG4gICAgICAgIH07XG5cbiAgICBsZXQga2V5UGF0aCA9IFsuLi5ub2RlLmdldCgna2V5UGF0aCcpLnRvSlMoKSwgJ3N0YXRlJ107XG4gICAgbGV0IHVwZGF0ZXIgPSBudWxsOyAvLyB0b2dnbGU6ICh2YWx1ZSkgPT4gIXZhbHVlXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3RvZ2dsZUhvdmVyJzpcbiAgICAgICAgaWYgKG9uSG92ZXIgJiYgb25Ib3Zlci5jYWxsKHRoaXMsIGVsZW1lbnQsIGNvbXBvbmVudCkgIT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEudGFpbGVkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGtleVBhdGggPSBbLi4ua2V5UGF0aCwgJ3RhaWxlZCddO1xuICAgICAgICAgIHVwZGF0ZXIgPSAoKSA9PiBkYXRhLnRhaWxlZDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGNhc2UgJ3RvZ2dsZUV4cGFuZCc6XG4gICAgICAgIGlmIChvbkV4cGFuZCAmJiBvbkV4cGFuZC5jYWxsKHRoaXMsIGVsZW1lbnQsIGNvbXBvbmVudCkgIT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICAvLyBjaGVjazogdW5mb2xkaW5nIGFsbCBjaGlsZHJlblxuICAgICAgICBpZiAoZS5hbHRLZXkgJiYgZS5jdHJsS2V5KSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcm9vdDogcm9vdC5zZXRJbihcbiAgICAgICAgICAgICAgWy4uLm5vZGUuZ2V0KCdrZXlQYXRoJykudG9KUygpXSxcbiAgICAgICAgICAgICAgc2V0RGVlcChub2RlLCAnY2hpbGRyZW4nLCBbJ3N0YXRlJywgJ2V4cGFuZGVkJ10sIHRydWUpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzpcbiAgICAgICAgLy8gLSBmaXggW2lzc3VlIzFdKCd0YWlsZWQnKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhub2RlLnRvSlNPTigpLCBkYXRhLCBlLnRhcmdldClcbiAgICAgICAga2V5UGF0aCA9IFsuLi5rZXlQYXRoLCAnZXhwYW5kZWQnXTtcbiAgICAgICAgdXBkYXRlciA9IGV4cGFuZGVkID0+ICFleHBhbmRlZDtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3RyaWdnZXJTZWxlY3QnOlxuICAgICAgICBpZiAobGF0ZXN0KSB7XG4gICAgICAgICAgdGhpcy5yZWZzLmlucHV0LmJsdXIoKTtcbiAgICAgICAgICBjb25zdCBsYXRlc3RLZXlQYXRoID0gWy4uLmxhdGVzdC5wcm9wcy5ub2RlLmdldCgna2V5UGF0aCcpLnRvSlMoKSwgJ3N0YXRlJ107XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJvb3Q6IHJvb3Qud2l0aE11dGF0aW9ucyhtYXAgPT5cbiAgICAgICAgICAgICAgICBtYXBcbiAgICAgICAgICAgICAgICAgIC5zZXRJbihbLi4ubGF0ZXN0S2V5UGF0aCwgJ3RhaWxlZCddLCBmYWxzZSlcbiAgICAgICAgICAgICAgICAgIC5zZXRJbihbLi4ubGF0ZXN0S2V5UGF0aCwgJ3NlbGVjdGVkJ10sIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgLnNldEluKFsuLi5sYXRlc3RLZXlQYXRoLCAndW5mb2N1c2VkJ10sIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgLnNldEluKFsuLi5rZXlQYXRoLCAndGFpbGVkJ10sIGRhdGEudGFpbGVkKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBsYXRlc3Q6IGNvbXBvbmVudFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDo6dGhpcy5yZWZzLmlucHV0LmZvY3VzXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICB7XG4gICAgICAgICAgICByb290OiByb290LnNldEluKFsuLi5rZXlQYXRoLCAndGFpbGVkJ10sIGRhdGEudGFpbGVkKSxcbiAgICAgICAgICAgIGxhdGVzdDogY29tcG9uZW50XG4gICAgICAgICAgfSxcbiAgICAgICAgICA6OnRoaXMucmVmcy5pbnB1dC5mb2N1c1xuICAgICAgICApO1xuXG4gICAgICBjYXNlICd0b2dnbGVGb2N1cyc6XG4gICAgICAgIGlmIChkYXRhLnNlbGVjdGVkKSB7XG4gICAgICAgICAgaWYgKG9uU2VsZWN0ICYmIG9uU2VsZWN0LmNhbGwodGhpcywgZWxlbWVudCwgY29tcG9uZW50KSAhPT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG9uVW5mb2N1cyAmJiBvblVuZm9jdXMuY2FsbCh0aGlzLCBlbGVtZW50LCBjb21wb25lbnQpICE9PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgcm9vdDogcm9vdC53aXRoTXV0YXRpb25zKG1hcCA9PlxuICAgICAgICAgICAgbWFwXG4gICAgICAgICAgICAgIC5zZXRJbihbLi4ua2V5UGF0aCwgJ3NlbGVjdGVkJ10sIGRhdGEuc2VsZWN0ZWQpXG4gICAgICAgICAgICAgIC5zZXRJbihbLi4ua2V5UGF0aCwgJ3VuZm9jdXNlZCddLCBkYXRhLnVuZm9jdXNlZClcbiAgICAgICAgICApXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcm9vdDogcm9vdC51cGRhdGVJbihrZXlQYXRoLCB1cGRhdGVyKVxuICAgIH0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
