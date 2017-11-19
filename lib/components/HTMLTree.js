'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _server = require('react-dom/server');

var _htmlparser = require('htmlparser2');

var _themes = require('../themes/');

var _themes2 = _interopRequireDefault(_themes);

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Component: HTMLTree
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Public interface of the component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var isBrowser = typeof HTMLElement !== 'undefined';
/**
 *
 */

var HTMLTree = function (_Component) {
  _inherits(HTMLTree, _Component);

  function HTMLTree() {
    _classCallCheck(this, HTMLTree);

    return _possibleConstructorReturn(this, (HTMLTree.__proto__ || Object.getPrototypeOf(HTMLTree)).apply(this, arguments));
  }

  _createClass(HTMLTree, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var source = this.props.source;
      // keep state of provided source and representation view in sync

      if (isBrowser && source instanceof HTMLElement) {
        var element = (0, _reactDom.findDOMNode)(this);
        this.observer = new MutationObserver(function (mutations) {
          var inception = mutations.some(function (mutation) {
            return element.contains(mutation.target);
          });
          if (!inception) {
            _this2.forceUpdate();
          }
        }).observe(source, {
          childList: true,
          subtree: true,
          attributes: true
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          source = _props.source,
          theme = _props.theme,
          defaultsAndEventHandlers = _objectWithoutProperties(_props, ['source', 'theme']);

      var origin = isBrowser && source instanceof HTMLElement && source;
      var tree = (0, _htmlparser.parseDOM)(
      /** sourceText **/
      origin ? source.outerHTML : _react2.default.isValidElement(source) ? (0, _server.renderToString)(source) : source.replace(/<!DOCTYPE(.|\n|\r)*?>/i, ''));

      var componentStyles = (0, _themes2.default)(theme);

      return _react2.default.createElement(
        'div',
        { className: 'HTMLTree' },
        _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: componentStyles } }),
        _react2.default.createElement(_Container2.default, _extends({ tree: tree, origin: origin || null }, defaultsAndEventHandlers))
      );
    }
  }]);

  return HTMLTree;
}(_react.Component);

HTMLTree.defaultProps = {
  theme: 'chrome-devtools',
  defaultExpandedTags: ['html', 'body']
};
HTMLTree.propTypes = {
  source: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node, _propTypes2.default.instanceOf(isBrowser ? HTMLElement : Object)]).isRequired,
  theme: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
  defaultExpandedTags: _propTypes2.default.array.isRequired,
  customRender: _propTypes2.default.func,
  onHover: _propTypes2.default.func,
  onExpand: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  onUnfocus: _propTypes2.default.func
};
exports.default = HTMLTree;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvSFRNTFRyZWUuanN4Il0sIm5hbWVzIjpbImlzQnJvd3NlciIsIkhUTUxFbGVtZW50IiwiSFRNTFRyZWUiLCJzb3VyY2UiLCJwcm9wcyIsImVsZW1lbnQiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJpbmNlcHRpb24iLCJtdXRhdGlvbnMiLCJzb21lIiwiY29udGFpbnMiLCJtdXRhdGlvbiIsInRhcmdldCIsImZvcmNlVXBkYXRlIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJhdHRyaWJ1dGVzIiwiZGlzY29ubmVjdCIsInRoZW1lIiwiZGVmYXVsdHNBbmRFdmVudEhhbmRsZXJzIiwib3JpZ2luIiwidHJlZSIsIm91dGVySFRNTCIsImlzVmFsaWRFbGVtZW50IiwicmVwbGFjZSIsImNvbXBvbmVudFN0eWxlcyIsIl9faHRtbCIsImRlZmF1bHRQcm9wcyIsImRlZmF1bHRFeHBhbmRlZFRhZ3MiLCJwcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJub2RlIiwiaW5zdGFuY2VPZiIsIk9iamVjdCIsImlzUmVxdWlyZWQiLCJvYmplY3QiLCJhcnJheSIsImN1c3RvbVJlbmRlciIsImZ1bmMiLCJvbkhvdmVyIiwib25FeHBhbmQiLCJvblNlbGVjdCIsIm9uVW5mb2N1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU1BOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7K2VBYkE7Ozs7OztBQWVBLElBQU1BLFlBQVksT0FBT0MsV0FBUCxLQUF1QixXQUF6QztBQUNBOzs7O0lBR3FCQyxROzs7Ozs7Ozs7Ozt3Q0FxQkM7QUFBQTs7QUFBQSxVQUNYQyxNQURXLEdBQ0QsS0FBS0MsS0FESixDQUNYRCxNQURXO0FBRWxCOztBQUNBLFVBQUlILGFBQWFHLGtCQUFrQkYsV0FBbkMsRUFBZ0Q7QUFDOUMsWUFBTUksVUFBVSwyQkFBWSxJQUFaLENBQWhCO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQixJQUFJQyxnQkFBSixDQUFxQixxQkFBYTtBQUNoRCxjQUFNQyxZQUFZQyxVQUFVQyxJQUFWLENBQWU7QUFBQSxtQkFBWUwsUUFBUU0sUUFBUixDQUFpQkMsU0FBU0MsTUFBMUIsQ0FBWjtBQUFBLFdBQWYsQ0FBbEI7QUFDQSxjQUFJLENBQUNMLFNBQUwsRUFBZ0I7QUFDZCxtQkFBS00sV0FBTDtBQUNEO0FBQ0YsU0FMZSxFQUtiQyxPQUxhLENBS0xaLE1BTEssRUFLRztBQUNqQmEscUJBQVcsSUFETTtBQUVqQkMsbUJBQVMsSUFGUTtBQUdqQkMsc0JBQVk7QUFISyxTQUxILENBQWhCO0FBVUQ7QUFDRjs7OzJDQUVzQjtBQUNyQixVQUFJLEtBQUtaLFFBQVQsRUFBbUI7QUFDakIsYUFBS0EsUUFBTCxDQUFjYSxVQUFkO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQUEsbUJBQzhDLEtBQUtmLEtBRG5EO0FBQUEsVUFDQUQsTUFEQSxVQUNBQSxNQURBO0FBQUEsVUFDUWlCLEtBRFIsVUFDUUEsS0FEUjtBQUFBLFVBQ2tCQyx3QkFEbEI7O0FBR1AsVUFBTUMsU0FBU3RCLGFBQWFHLGtCQUFrQkYsV0FBL0IsSUFBOENFLE1BQTdEO0FBQ0EsVUFBTW9CLE9BQU87QUFDWDtBQUNBRCxlQUNJbkIsT0FBT3FCLFNBRFgsR0FFSSxnQkFBTUMsY0FBTixDQUFxQnRCLE1BQXJCLElBQ0UsNEJBQWVBLE1BQWYsQ0FERixHQUVFQSxPQUFPdUIsT0FBUCxDQUFlLHdCQUFmLEVBQXlDLEVBQXpDLENBTkssQ0FBYjs7QUFTQSxVQUFNQyxrQkFBa0Isc0JBQVVQLEtBQVYsQ0FBeEI7O0FBRUEsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLFVBQWY7QUFDRSxpREFBTyx5QkFBeUIsRUFBQ1EsUUFBUUQsZUFBVCxFQUFoQyxHQURGO0FBRUUsc0VBQVcsTUFBTUosSUFBakIsRUFBdUIsUUFBUUQsVUFBVSxJQUF6QyxJQUFtREQsd0JBQW5EO0FBRkYsT0FERjtBQU1EOzs7Ozs7QUFsRWtCbkIsUSxDQUNaMkIsWSxHQUFlO0FBQ3BCVCxTQUFPLGlCQURhO0FBRXBCVSx1QkFBcUIsQ0FBQyxNQUFELEVBQVMsTUFBVDtBQUZELEM7QUFESDVCLFEsQ0FNWjZCLFMsR0FBWTtBQUNqQjVCLFVBQVEsb0JBQVU2QixTQUFWLENBQW9CLENBQzFCLG9CQUFVQyxNQURnQixFQUUxQixvQkFBVUMsSUFGZ0IsRUFHMUIsb0JBQVVDLFVBQVYsQ0FBcUJuQyxZQUFZQyxXQUFaLEdBQTBCbUMsTUFBL0MsQ0FIMEIsQ0FBcEIsRUFJTEMsVUFMYztBQU1qQmpCLFNBQU8sb0JBQVVZLFNBQVYsQ0FBb0IsQ0FBQyxvQkFBVUMsTUFBWCxFQUFtQixvQkFBVUssTUFBN0IsQ0FBcEIsRUFBMERELFVBTmhEO0FBT2pCUCx1QkFBcUIsb0JBQVVTLEtBQVYsQ0FBZ0JGLFVBUHBCO0FBUWpCRyxnQkFBYyxvQkFBVUMsSUFSUDtBQVNqQkMsV0FBUyxvQkFBVUQsSUFURjtBQVVqQkUsWUFBVSxvQkFBVUYsSUFWSDtBQVdqQkcsWUFBVSxvQkFBVUgsSUFYSDtBQVlqQkksYUFBVyxvQkFBVUo7QUFaSixDO2tCQU5BdkMsUSIsImZpbGUiOiJjb21wb25lbnRzL0hUTUxUcmVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIENvbXBvbmVudDogSFRNTFRyZWVcbiAqXG4gKiBQdWJsaWMgaW50ZXJmYWNlIG9mIHRoZSBjb21wb25lbnRcbiAqL1xuXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtyZW5kZXJUb1N0cmluZ30gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQge3BhcnNlRE9NfSBmcm9tICdodG1scGFyc2VyMic7XG5cbmltcG9ydCBnZXRTdHlsZXMgZnJvbSAnLi4vdGhlbWVzLyc7XG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vQ29udGFpbmVyJztcblxuY29uc3QgaXNCcm93c2VyID0gdHlwZW9mIEhUTUxFbGVtZW50ICE9PSAndW5kZWZpbmVkJztcbi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRNTFRyZWUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRoZW1lOiAnY2hyb21lLWRldnRvb2xzJyxcbiAgICBkZWZhdWx0RXhwYW5kZWRUYWdzOiBbJ2h0bWwnLCAnYm9keSddXG4gIH07XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBzb3VyY2U6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoaXNCcm93c2VyID8gSFRNTEVsZW1lbnQgOiBPYmplY3QpXG4gICAgXSkuaXNSZXF1aXJlZCxcbiAgICB0aGVtZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm9iamVjdF0pLmlzUmVxdWlyZWQsXG4gICAgZGVmYXVsdEV4cGFuZGVkVGFnczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgY3VzdG9tUmVuZGVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkhvdmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkV4cGFuZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uVW5mb2N1czogUHJvcFR5cGVzLmZ1bmNcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7c291cmNlfSA9IHRoaXMucHJvcHM7XG4gICAgLy8ga2VlcCBzdGF0ZSBvZiBwcm92aWRlZCBzb3VyY2UgYW5kIHJlcHJlc2VudGF0aW9uIHZpZXcgaW4gc3luY1xuICAgIGlmIChpc0Jyb3dzZXIgJiYgc291cmNlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBmaW5kRE9NTm9kZSh0aGlzKTtcbiAgICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xuICAgICAgICBjb25zdCBpbmNlcHRpb24gPSBtdXRhdGlvbnMuc29tZShtdXRhdGlvbiA9PiBlbGVtZW50LmNvbnRhaW5zKG11dGF0aW9uLnRhcmdldCkpO1xuICAgICAgICBpZiAoIWluY2VwdGlvbikge1xuICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSkub2JzZXJ2ZShzb3VyY2UsIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtzb3VyY2UsIHRoZW1lLCAuLi5kZWZhdWx0c0FuZEV2ZW50SGFuZGxlcnN9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG9yaWdpbiA9IGlzQnJvd3NlciAmJiBzb3VyY2UgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBzb3VyY2U7XG4gICAgY29uc3QgdHJlZSA9IHBhcnNlRE9NKFxuICAgICAgLyoqIHNvdXJjZVRleHQgKiovXG4gICAgICBvcmlnaW5cbiAgICAgICAgPyBzb3VyY2Uub3V0ZXJIVE1MXG4gICAgICAgIDogUmVhY3QuaXNWYWxpZEVsZW1lbnQoc291cmNlKVxuICAgICAgICAgID8gcmVuZGVyVG9TdHJpbmcoc291cmNlKVxuICAgICAgICAgIDogc291cmNlLnJlcGxhY2UoLzwhRE9DVFlQRSgufFxcbnxcXHIpKj8+L2ksICcnKVxuICAgICk7XG5cbiAgICBjb25zdCBjb21wb25lbnRTdHlsZXMgPSBnZXRTdHlsZXModGhlbWUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiSFRNTFRyZWVcIj5cbiAgICAgICAgPHN0eWxlIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOiBjb21wb25lbnRTdHlsZXN9fSAvPlxuICAgICAgICA8Q29udGFpbmVyIHRyZWU9e3RyZWV9IG9yaWdpbj17b3JpZ2luIHx8IG51bGx9IHsuLi5kZWZhdWx0c0FuZEV2ZW50SGFuZGxlcnN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
