'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Component: Node
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Representation of an HTML element
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// http://www.w3.org/TR/html-markup/syntax.html#void-elements
var voidTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];

/**
 *
 */

var Node = function (_Component) {
  _inherits(Node, _Component);

  function Node() {
    _classCallCheck(this, Node);

    return _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).apply(this, arguments));
  }

  _createClass(Node, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.node !== this.props.node;
    }
  }, {
    key: 'render',
    value: function render() {
      var customRender = this.props.customRender;

      var Renderable = this.getRenderable();
      return !customRender ? Renderable : customRender(function (decorate) {
        return decorate(Renderable) || _react2.default.createElement(Renderable, Renderable.props);
      }, this.props.node.toJS());
    }
  }, {
    key: 'getRenderable',
    value: function getRenderable() {
      var _this2 = this;

      var _props = this.props,
          node = _props.node,
          update = _props.update,
          onHover = _props.onHover;


      var type = node.get('type');
      var name = node.get('name');
      var data = node.get('data');
      var attribs = node.get('attribs');
      var depth = node.get('depth');
      var children = node.get('children');

      var expanded = node.getIn(['state', 'expanded']);
      var selected = node.getIn(['state', 'selected']);
      var tailed = node.getIn(['state', 'tailed']);
      var unfocused = node.getIn(['state', 'unfocused']);

      var tagEventHandlers = {
        onMouseDown: function onMouseDown(e) {
          return update(e, _this2, 'triggerSelect', { tailed: false });
        }
      };
      if (onHover) {
        Object.assign(tagEventHandlers, {
          onMouseOver: function onMouseOver(e) {
            return update(e, _this2, 'toggleHover');
          },
          onMouseOut: function onMouseOut(e) {
            return update(e, _this2, 'toggleHover');
          }
        });
      }
      if (children && children.size && name !== 'html') {
        Object.assign(tagEventHandlers, {
          onDoubleClick: function onDoubleClick(e) {
            return update(e, _this2, 'toggleExpand');
          }
        });
      }

      // indentation
      var base = {
        paddingLeft: (depth + 1) * 10
      };

      var modifier = {
        selected: selected,
        unfocused: unfocused,
        tailed: tailed
      };

      // render: text + comments
      if (type === 'text' || type === 'comment') {
        return _react2.default.createElement(
          'div',
          { className: 'Node' },
          _react2.default.createElement(
            'div',
            _extends({
              className: (0, _classnames2.default)(['Node__Tag', 'Node__Head', modifier]),
              style: base
            }, tagEventHandlers),
            type === 'text' ? _react2.default.createElement(
              'span',
              { className: 'Node__Wrap' },
              '"',
              _react2.default.createElement(
                'span',
                { className: 'Node__Text' },
                data
              ),
              '"'
            ) : _react2.default.createElement(
              'span',
              { className: 'Node__Comment' },
              '<!--' + data + '-->'
            )
          )
        );
      }

      // format: single-line tag, entries without children or just one + self-closing tags (e.g. images)
      if (!children || children.size === 1 && children.getIn([0, 'type']) === 'text') {
        var content = children && children.getIn([0, 'data']) || voidTags.indexOf(name) === -1;
        if (typeof content === 'boolean' || content.length < 500) {
          // only include less than 500
          return _react2.default.createElement(
            'div',
            { className: 'Node' },
            _react2.default.createElement(
              'div',
              _extends({
                className: (0, _classnames2.default)(['Node__Tag', 'Node__Head', modifier]),
                style: base
              }, tagEventHandlers),
              _react2.default.createElement(
                'span',
                { className: 'Node__Container' },
                this.getOpenTag(!content),
                content && _react2.default.createElement(
                  'span',
                  { className: 'Node__Content' },
                  content
                ),
                content && this.getCloseTag()
              )
            )
          );
        }
      }

      // indentation
      var baseExpander = {
        left: base.paddingLeft - 12
      };

      // render: collapsed + extended content
      var head = _react2.default.createElement(
        'div',
        _extends({
          className: (0, _classnames2.default)(['Node__Tag', 'Node__Head', modifier]),
          style: base
        }, tagEventHandlers),
        name !== 'html' && _react2.default.createElement(
          'span',
          {
            className: 'Node__Expander',
            style: baseExpander,
            onMouseDown: function onMouseDown(e) {
              return update(e, _this2, 'toggleExpand');
            } },
          !expanded ? _react2.default.createElement(
            'span',
            null,
            '\u25B6'
          ) : _react2.default.createElement(
            'span',
            null,
            '\u25BC'
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'Node__Container' },
          this.getOpenTag(),
          !expanded && _react2.default.createElement(
            'span',
            null,
            '\u2026'
          ),
          !expanded && this.getCloseTag()
        )
      );

      // invoke head styling
      if (!selected && !unfocused) {
        Object.assign(tagEventHandlers, {
          onMouseOver: function onMouseOver(e) {
            return update(e, _this2, 'toggleHover', { tailed: true });
          },
          onMouseOut: function onMouseOut(e) {
            return update(e, _this2, 'toggleHover', { tailed: false });
          }
        });
      }

      return _react2.default.createElement(
        'div',
        { className: 'Node' },
        head,
        expanded && _react2.default.createElement(
          'div',
          { className: 'Node__Children' },
          children.map(function (child, i) {
            return _react2.default.createElement(Node, _extends({}, _this2.props, { node: child, key: i }));
          })
        ),
        expanded && _react2.default.createElement(
          'div',
          _extends({
            className: (0, _classnames2.default)(['Node__Tag', 'Node__Tail', modifier]),
            style: base
          }, tagEventHandlers, {
            onMouseDown: function onMouseDown(e) {
              return update(e, _this2, 'triggerSelect', { tailed: true });
            } }),
          this.getCloseTag()
        )
      );
    }
  }, {
    key: 'getOpenTag',
    value: function getOpenTag(selfclosing) {
      var node = this.props.node;

      var name = node.get('name');
      var attribs = node.get('attribs');
      return _react2.default.createElement(
        'span',
        { className: 'Node__Wrap' },
        '<',
        _react2.default.createElement(
          'span',
          { className: 'Node__Name' },
          name
        ),
        attribs && attribs.entrySeq().map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          var isLink = ['src', 'href'].indexOf(key) > -1;
          return _react2.default.createElement(
            'span',
            { className: 'Node__Wrap', key: key },
            '\xA0',
            _react2.default.createElement(
              'span',
              { className: 'Node__AttributeKey' },
              key
            ),
            '="',
            !isLink ? _react2.default.createElement(
              'span',
              { className: 'Node__AttributeValue' },
              value
            ) : _react2.default.createElement(
              'a',
              {
                className: (0, _classnames2.default)(['Node__AttributeValue'], {
                  link: true,
                  external: /^https?:/.test(value)
                }),
                href: value,
                target: '_blank' },
              value
            ),
            '"'
          );
        }),
        selfclosing && '/',
        '>'
      );
    }
  }, {
    key: 'getCloseTag',
    value: function getCloseTag() {
      var node = this.props.node;

      var name = node.get('name');
      return _react2.default.createElement(
        'span',
        { className: 'Node__Wrap' },
        '<',
        _react2.default.createElement(
          'span',
          { className: 'Node__Name' },
          '/' + name
        ),
        '>'
      );
    }
  }]);

  return Node;
}(_react.Component);

Node.propTypes = {
  node: _propTypes2.default.object.isRequired,
  update: _propTypes2.default.func.isRequired,
  onHover: _propTypes2.default.func,
  customRenderer: _propTypes2.default.func
};
exports.default = Node;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTm9kZS5qc3giXSwibmFtZXMiOlsidm9pZFRhZ3MiLCJOb2RlIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwibm9kZSIsInByb3BzIiwiY3VzdG9tUmVuZGVyIiwiUmVuZGVyYWJsZSIsImdldFJlbmRlcmFibGUiLCJkZWNvcmF0ZSIsInRvSlMiLCJ1cGRhdGUiLCJvbkhvdmVyIiwidHlwZSIsImdldCIsIm5hbWUiLCJkYXRhIiwiYXR0cmlicyIsImRlcHRoIiwiY2hpbGRyZW4iLCJleHBhbmRlZCIsImdldEluIiwic2VsZWN0ZWQiLCJ0YWlsZWQiLCJ1bmZvY3VzZWQiLCJ0YWdFdmVudEhhbmRsZXJzIiwib25Nb3VzZURvd24iLCJlIiwiT2JqZWN0IiwiYXNzaWduIiwib25Nb3VzZU92ZXIiLCJvbk1vdXNlT3V0Iiwic2l6ZSIsIm9uRG91YmxlQ2xpY2siLCJiYXNlIiwicGFkZGluZ0xlZnQiLCJtb2RpZmllciIsImNvbnRlbnQiLCJpbmRleE9mIiwibGVuZ3RoIiwiZ2V0T3BlblRhZyIsImdldENsb3NlVGFnIiwiYmFzZUV4cGFuZGVyIiwibGVmdCIsImhlYWQiLCJtYXAiLCJjaGlsZCIsImkiLCJzZWxmY2xvc2luZyIsImVudHJ5U2VxIiwia2V5IiwidmFsdWUiLCJpc0xpbmsiLCJsaW5rIiwiZXh0ZXJuYWwiLCJ0ZXN0IiwicHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJjdXN0b21SZW5kZXJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBTUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OytlQVJBOzs7Ozs7QUFVQTtBQUNBLElBQU1BLFdBQVcsQ0FDZixNQURlLEVBRWYsTUFGZSxFQUdmLElBSGUsRUFJZixLQUplLEVBS2YsU0FMZSxFQU1mLE9BTmUsRUFPZixJQVBlLEVBUWYsS0FSZSxFQVNmLE9BVGUsRUFVZixRQVZlLEVBV2YsTUFYZSxFQVlmLFVBWmUsRUFhZixNQWJlLEVBY2YsT0FkZSxF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QUE7QUFBQSxnQkFBTSxXQUFVLG9CQUFoQjtBQUFzQ0E7QUFBdEMsYUFGRjtBQUFBO0FBR0csYUFBQ0UsTUFBRCxHQUNDO0FBQUE7QUFBQSxnQkFBTSxXQUFVLHNCQUFoQjtBQUF3Q0Q7QUFBeEMsYUFERCxHQUdDO0FBQUE7QUFBQTtBQUNFLDJCQUFXLDBCQUFXLENBQUMsc0JBQUQsQ0FBWCxFQUFxQztBQUM5Q0Usd0JBQU0sSUFEd0M7QUFFOUNDLDRCQUFVLFdBQVdDLElBQVgsQ0FBZ0JKLEtBQWhCO0FBRm9DLGlCQUFyQyxDQURiO0FBS0Usc0JBQU1BLEtBTFI7QUFNRSx3QkFBTyxRQU5UO0FBT0dBO0FBUEgsYUFOSjtBQUFBO0FBQUEsV0FERjtBQW1CRCxTQXJCRCxDQUpKO0FBMEJHSCx1QkFBZSxHQTFCbEI7QUFBQTtBQUFBLE9BREY7QUErQkQ7OztrQ0FFYTtBQUFBLFVBQ0w1QyxJQURLLEdBQ0csS0FBS0MsS0FEUixDQUNMRCxJQURLOztBQUVaLFVBQU1XLE9BQU9YLEtBQUtVLEdBQUwsQ0FBUyxNQUFULENBQWI7QUFDQSxhQUNFO0FBQUE7QUFBQSxVQUFNLFdBQVUsWUFBaEI7QUFBQTtBQUVFO0FBQUE7QUFBQSxZQUFNLFdBQVUsWUFBaEI7QUFBQSxnQkFBa0NDO0FBQWxDLFNBRkY7QUFBQTtBQUFBLE9BREY7QUFPRDs7Ozs7O0FBak5rQmQsSSxDQUNadUQsUyxHQUFZO0FBQ2pCcEQsUUFBTSxvQkFBVXFELE1BQVYsQ0FBaUJDLFVBRE47QUFFakIvQyxVQUFRLG9CQUFVZ0QsSUFBVixDQUFlRCxVQUZOO0FBR2pCOUMsV0FBUyxvQkFBVStDLElBSEY7QUFJakJDLGtCQUFnQixvQkFBVUQ7QUFKVCxDO2tCQURBMUQsSSIsImZpbGUiOiJjb21wb25lbnRzL05vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICMgQ29tcG9uZW50OiBOb2RlXG4gKlxuICogUmVwcmVzZW50YXRpb24gb2YgYW4gSFRNTCBlbGVtZW50XG4gKi9cblxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWwtbWFya3VwL3N5bnRheC5odG1sI3ZvaWQtZWxlbWVudHNcbmNvbnN0IHZvaWRUYWdzID0gW1xuICAnYXJlYScsXG4gICdiYXNlJyxcbiAgJ2JyJyxcbiAgJ2NvbCcsXG4gICdjb21tYW5kJyxcbiAgJ2VtYmVkJyxcbiAgJ2hyJyxcbiAgJ2ltZycsXG4gICdpbnB1dCcsXG4gICdrZXlnZW4nLFxuICAnbGluaycsXG4gICdtZW51aXRlbScsXG4gICdtZXRhJyxcbiAgJ3BhcmFtJyxcbiAgJ3NvdXJjZScsXG4gICd0cmFjaycsXG4gICd3YnInXG5dO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG5vZGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICB1cGRhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25Ib3ZlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY3VzdG9tUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jXG4gIH07XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgcmV0dXJuIG5leHRQcm9wcy5ub2RlICE9PSB0aGlzLnByb3BzLm5vZGU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2N1c3RvbVJlbmRlcn0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IFJlbmRlcmFibGUgPSB0aGlzLmdldFJlbmRlcmFibGUoKTtcbiAgICByZXR1cm4gIWN1c3RvbVJlbmRlclxuICAgICAgPyBSZW5kZXJhYmxlXG4gICAgICA6IGN1c3RvbVJlbmRlcihkZWNvcmF0ZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGRlY29yYXRlKFJlbmRlcmFibGUpIHx8IDxSZW5kZXJhYmxlIHsuLi5SZW5kZXJhYmxlLnByb3BzfSAvPjtcbiAgICAgICAgfSwgdGhpcy5wcm9wcy5ub2RlLnRvSlMoKSk7XG4gIH1cblxuICBnZXRSZW5kZXJhYmxlKCkge1xuICAgIGNvbnN0IHtub2RlLCB1cGRhdGUsIG9uSG92ZXJ9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHR5cGUgPSBub2RlLmdldCgndHlwZScpO1xuICAgIGNvbnN0IG5hbWUgPSBub2RlLmdldCgnbmFtZScpO1xuICAgIGNvbnN0IGRhdGEgPSBub2RlLmdldCgnZGF0YScpO1xuICAgIGNvbnN0IGF0dHJpYnMgPSBub2RlLmdldCgnYXR0cmlicycpO1xuICAgIGNvbnN0IGRlcHRoID0gbm9kZS5nZXQoJ2RlcHRoJyk7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBub2RlLmdldCgnY2hpbGRyZW4nKTtcblxuICAgIGNvbnN0IGV4cGFuZGVkID0gbm9kZS5nZXRJbihbJ3N0YXRlJywgJ2V4cGFuZGVkJ10pO1xuICAgIGNvbnN0IHNlbGVjdGVkID0gbm9kZS5nZXRJbihbJ3N0YXRlJywgJ3NlbGVjdGVkJ10pO1xuICAgIGNvbnN0IHRhaWxlZCA9IG5vZGUuZ2V0SW4oWydzdGF0ZScsICd0YWlsZWQnXSk7XG4gICAgY29uc3QgdW5mb2N1c2VkID0gbm9kZS5nZXRJbihbJ3N0YXRlJywgJ3VuZm9jdXNlZCddKTtcblxuICAgIGNvbnN0IHRhZ0V2ZW50SGFuZGxlcnMgPSB7XG4gICAgICBvbk1vdXNlRG93bjogZSA9PiB1cGRhdGUoZSwgdGhpcywgJ3RyaWdnZXJTZWxlY3QnLCB7dGFpbGVkOiBmYWxzZX0pXG4gICAgfTtcbiAgICBpZiAob25Ib3Zlcikge1xuICAgICAgT2JqZWN0LmFzc2lnbih0YWdFdmVudEhhbmRsZXJzLCB7XG4gICAgICAgIG9uTW91c2VPdmVyOiBlID0+IHVwZGF0ZShlLCB0aGlzLCAndG9nZ2xlSG92ZXInKSxcbiAgICAgICAgb25Nb3VzZU91dDogZSA9PiB1cGRhdGUoZSwgdGhpcywgJ3RvZ2dsZUhvdmVyJylcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4uc2l6ZSAmJiBuYW1lICE9PSAnaHRtbCcpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGFnRXZlbnRIYW5kbGVycywge1xuICAgICAgICBvbkRvdWJsZUNsaWNrOiBlID0+IHVwZGF0ZShlLCB0aGlzLCAndG9nZ2xlRXhwYW5kJylcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGluZGVudGF0aW9uXG4gICAgY29uc3QgYmFzZSA9IHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAoZGVwdGggKyAxKSAqIDEwXG4gICAgfTtcblxuICAgIGNvbnN0IG1vZGlmaWVyID0ge1xuICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkLFxuICAgICAgdW5mb2N1c2VkOiB1bmZvY3VzZWQsXG4gICAgICB0YWlsZWRcbiAgICB9O1xuXG4gICAgLy8gcmVuZGVyOiB0ZXh0ICsgY29tbWVudHNcbiAgICBpZiAodHlwZSA9PT0gJ3RleHQnIHx8IHR5cGUgPT09ICdjb21tZW50Jykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJOb2RlXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFsnTm9kZV9fVGFnJywgJ05vZGVfX0hlYWQnLCBtb2RpZmllcl0pfVxuICAgICAgICAgICAgc3R5bGU9e2Jhc2V9XG4gICAgICAgICAgICB7Li4udGFnRXZlbnRIYW5kbGVyc30+XG4gICAgICAgICAgICB7dHlwZSA9PT0gJ3RleHQnID8gKFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJOb2RlX19XcmFwXCI+XG4gICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzc05hbWU9XCJOb2RlX19UZXh0XCI+e2RhdGF9PC9zcGFuPlwiXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIk5vZGVfX0NvbW1lbnRcIj57YDwhLS0ke2RhdGF9LS0+YH08L3NwYW4+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gZm9ybWF0OiBzaW5nbGUtbGluZSB0YWcsIGVudHJpZXMgd2l0aG91dCBjaGlsZHJlbiBvciBqdXN0IG9uZSArIHNlbGYtY2xvc2luZyB0YWdzIChlLmcuIGltYWdlcylcbiAgICBpZiAoIWNoaWxkcmVuIHx8IChjaGlsZHJlbi5zaXplID09PSAxICYmIGNoaWxkcmVuLmdldEluKFswLCAndHlwZSddKSA9PT0gJ3RleHQnKSkge1xuICAgICAgY29uc3QgY29udGVudCA9IChjaGlsZHJlbiAmJiBjaGlsZHJlbi5nZXRJbihbMCwgJ2RhdGEnXSkpIHx8IHZvaWRUYWdzLmluZGV4T2YobmFtZSkgPT09IC0xO1xuICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnYm9vbGVhbicgfHwgY29udGVudC5sZW5ndGggPCA1MDApIHtcbiAgICAgICAgLy8gb25seSBpbmNsdWRlIGxlc3MgdGhhbiA1MDBcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIk5vZGVcIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFsnTm9kZV9fVGFnJywgJ05vZGVfX0hlYWQnLCBtb2RpZmllcl0pfVxuICAgICAgICAgICAgICBzdHlsZT17YmFzZX1cbiAgICAgICAgICAgICAgey4uLnRhZ0V2ZW50SGFuZGxlcnN9PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJOb2RlX19Db250YWluZXJcIj5cbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRPcGVuVGFnKCFjb250ZW50KX1cbiAgICAgICAgICAgICAgICB7Y29udGVudCAmJiA8c3BhbiBjbGFzc05hbWU9XCJOb2RlX19Db250ZW50XCI+e2NvbnRlbnR9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICB7Y29udGVudCAmJiB0aGlzLmdldENsb3NlVGFnKCl9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGluZGVudGF0aW9uXG4gICAgY29uc3QgYmFzZUV4cGFuZGVyID0ge1xuICAgICAgbGVmdDogYmFzZS5wYWRkaW5nTGVmdCAtIDEyXG4gICAgfTtcblxuICAgIC8vIHJlbmRlcjogY29sbGFwc2VkICsgZXh0ZW5kZWQgY29udGVudFxuICAgIGNvbnN0IGhlYWQgPSAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhbJ05vZGVfX1RhZycsICdOb2RlX19IZWFkJywgbW9kaWZpZXJdKX1cbiAgICAgICAgc3R5bGU9e2Jhc2V9XG4gICAgICAgIHsuLi50YWdFdmVudEhhbmRsZXJzfT5cbiAgICAgICAge25hbWUgIT09ICdodG1sJyAmJiAoXG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIk5vZGVfX0V4cGFuZGVyXCJcbiAgICAgICAgICAgIHN0eWxlPXtiYXNlRXhwYW5kZXJ9XG4gICAgICAgICAgICBvbk1vdXNlRG93bj17ZSA9PiB1cGRhdGUoZSwgdGhpcywgJ3RvZ2dsZUV4cGFuZCcpfT5cbiAgICAgICAgICAgIHshZXhwYW5kZWQgPyA8c3Bhbj4mIzk2NTQ7PC9zcGFuPiA6IDxzcGFuPiYjOTY2MDs8L3NwYW4+fVxuICAgICAgICAgICAgey8qKiAn4pa2JyA6ICfilrwnICoqL31cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICl9XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIk5vZGVfX0NvbnRhaW5lclwiPlxuICAgICAgICAgIHt0aGlzLmdldE9wZW5UYWcoKX1cbiAgICAgICAgICB7IWV4cGFuZGVkICYmIDxzcGFuPiZoZWxsaXA7PC9zcGFuPn1cbiAgICAgICAgICB7IWV4cGFuZGVkICYmIHRoaXMuZ2V0Q2xvc2VUYWcoKX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIC8vIGludm9rZSBoZWFkIHN0eWxpbmdcbiAgICBpZiAoIXNlbGVjdGVkICYmICF1bmZvY3VzZWQpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGFnRXZlbnRIYW5kbGVycywge1xuICAgICAgICBvbk1vdXNlT3ZlcjogZSA9PiB1cGRhdGUoZSwgdGhpcywgJ3RvZ2dsZUhvdmVyJywge3RhaWxlZDogdHJ1ZX0pLFxuICAgICAgICBvbk1vdXNlT3V0OiBlID0+IHVwZGF0ZShlLCB0aGlzLCAndG9nZ2xlSG92ZXInLCB7dGFpbGVkOiBmYWxzZX0pXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJOb2RlXCI+XG4gICAgICAgIHtoZWFkfVxuICAgICAgICB7ZXhwYW5kZWQgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiTm9kZV9fQ2hpbGRyZW5cIj5cbiAgICAgICAgICAgIHtjaGlsZHJlbi5tYXAoKGNoaWxkLCBpKSA9PiA8Tm9kZSB7Li4udGhpcy5wcm9wc30gbm9kZT17Y2hpbGR9IGtleT17aX0gLz4pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICB7ZXhwYW5kZWQgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhbJ05vZGVfX1RhZycsICdOb2RlX19UYWlsJywgbW9kaWZpZXJdKX1cbiAgICAgICAgICAgIHN0eWxlPXtiYXNlfVxuICAgICAgICAgICAgey4uLnRhZ0V2ZW50SGFuZGxlcnN9XG4gICAgICAgICAgICBvbk1vdXNlRG93bj17ZSA9PiB1cGRhdGUoZSwgdGhpcywgJ3RyaWdnZXJTZWxlY3QnLCB7dGFpbGVkOiB0cnVlfSl9PlxuICAgICAgICAgICAge3RoaXMuZ2V0Q2xvc2VUYWcoKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBnZXRPcGVuVGFnKHNlbGZjbG9zaW5nKSB7XG4gICAgY29uc3Qge25vZGV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuYW1lID0gbm9kZS5nZXQoJ25hbWUnKTtcbiAgICBjb25zdCBhdHRyaWJzID0gbm9kZS5nZXQoJ2F0dHJpYnMnKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiTm9kZV9fV3JhcFwiPlxuICAgICAgICAmbHQ7XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIk5vZGVfX05hbWVcIj57bmFtZX08L3NwYW4+XG4gICAgICAgIHthdHRyaWJzICYmXG4gICAgICAgICAgYXR0cmlicy5lbnRyeVNlcSgpLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc0xpbmsgPSBbJ3NyYycsICdocmVmJ10uaW5kZXhPZihrZXkpID4gLTE7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJOb2RlX19XcmFwXCIga2V5PXtrZXl9PlxuICAgICAgICAgICAgICAgICZuYnNwO1xuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIk5vZGVfX0F0dHJpYnV0ZUtleVwiPntrZXl9PC9zcGFuPj1cIlxuICAgICAgICAgICAgICAgIHshaXNMaW5rID8gKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiTm9kZV9fQXR0cmlidXRlVmFsdWVcIj57dmFsdWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoWydOb2RlX19BdHRyaWJ1dGVWYWx1ZSddLCB7XG4gICAgICAgICAgICAgICAgICAgICAgbGluazogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbDogL15odHRwcz86Ly50ZXN0KHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgaHJlZj17dmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgICAgICAgICAgICB7dmFsdWV9XG4gICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgKX1cIlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICB7c2VsZmNsb3NpbmcgJiYgJy8nfVxuICAgICAgICAmZ3Q7XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxuXG4gIGdldENsb3NlVGFnKCkge1xuICAgIGNvbnN0IHtub2RlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmFtZSA9IG5vZGUuZ2V0KCduYW1lJyk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIk5vZGVfX1dyYXBcIj5cbiAgICAgICAgJmx0O1xuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJOb2RlX19OYW1lXCI+e2AvJHtuYW1lfWB9PC9zcGFuPlxuICAgICAgICAmZ3Q7XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
