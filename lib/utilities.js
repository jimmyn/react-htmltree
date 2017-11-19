'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelector = getSelector;
exports.getDepth = getDepth;
exports.setDeep = setDeep;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * # Utilities
 *
 * Helper functions
 */

/**
 * [getSelector description]
 * @param  {Object} node     - [description]
 * @param  {Array}  selector - [description]
 * @return {String}          - [description]
 */
function getSelector(node) {
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [node.name];

  var parent = node.parent;
  if (parent) {
    var children = parent.children;
    var matches = children.filter(function (child) {
      return child.name === node.name;
    });
    if (matches.length > 1) {
      var i = 0;
      var l = matches.length;
      for (; i < l; i++) {
        if (matches[i] === node) {
          selector[0] = selector[0] + ':nth-of-type(' + (i + 1) + ')';
          break;
        }
      }
    }
    selector.unshift(parent.name);
  }
  return parent && parent.parent ? getSelector(parent, selector) : selector.join(' > ');
}

/**
 * [getDepth description]
 * @param  {Object} node - [description]
 * @return {Number}      - [description]
 */
function getDepth(node) {
  var level = 1; // level: 0
  while (node.parent) {
    level += 1;
    node = node.parent;
  }
  return level;
}

/**
 * Changes the the values in the nested collection
 * @param {Immutable.Map} map     - [description]
 * @param {Array}         listKey - [description]
 * @param {Array}         keyPath - [description]
 * @param {*|Function}    value   - [description]
 */
function setDeep(map, listKey, keyPath, value) {
  if (!Array.isArray(listKey)) {
    listKey = [listKey];
  }
  var change = typeof value === 'function' ? 'updateIn' : 'setIn';
  var subPaths = getPaths(map, listKey, keyPath);
  return map.withMutations(function (map) {
    subPaths.forEach(function (keyPath) {
      return map[change](keyPath, value);
    });
  });

  function getPaths(map, listKeys, keyPath) {
    var overview = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [keyPath];

    var list = map.getIn(listKeys);
    if (list) {
      var size = list.size;
      for (var i = 0; i < size; i++) {
        overview.push([].concat(_toConsumableArray(listKeys), [i], _toConsumableArray(keyPath)));
        getPaths(map, [].concat(_toConsumableArray(listKeys), [i, listKeys[0]]), keyPath, overview);
      }
    }
    return overview;
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxpdGllcy5qcyJdLCJuYW1lcyI6WyJnZXRTZWxlY3RvciIsImdldERlcHRoIiwic2V0RGVlcCIsIm5vZGUiLCJzZWxlY3RvciIsIm5hbWUiLCJwYXJlbnQiLCJjaGlsZHJlbiIsIm1hdGNoZXMiLCJmaWx0ZXIiLCJjaGlsZCIsImxlbmd0aCIsImkiLCJsIiwidW5zaGlmdCIsImpvaW4iLCJsZXZlbCIsIm1hcCIsImxpc3RLZXkiLCJrZXlQYXRoIiwidmFsdWUiLCJBcnJheSIsImlzQXJyYXkiLCJjaGFuZ2UiLCJzdWJQYXRocyIsImdldFBhdGhzIiwid2l0aE11dGF0aW9ucyIsImZvckVhY2giLCJsaXN0S2V5cyIsIm92ZXJ2aWV3IiwibGlzdCIsImdldEluIiwic2l6ZSIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7O1FBWWdCQSxXLEdBQUFBLFc7UUF5QkFDLFEsR0FBQUEsUTtRQWdCQUMsTyxHQUFBQSxPOzs7O0FBckRoQjs7Ozs7O0FBTUE7Ozs7OztBQU1PLFNBQVNGLFdBQVQsQ0FBcUJHLElBQXJCLEVBQW1EO0FBQUEsTUFBeEJDLFFBQXdCLHVFQUFiLENBQUNELEtBQUtFLElBQU4sQ0FBYTs7QUFDeEQsTUFBTUMsU0FBU0gsS0FBS0csTUFBcEI7QUFDQSxNQUFJQSxNQUFKLEVBQVk7QUFDVixRQUFNQyxXQUFXRCxPQUFPQyxRQUF4QjtBQUNBLFFBQU1DLFVBQVVELFNBQVNFLE1BQVQsQ0FBZ0I7QUFBQSxhQUFTQyxNQUFNTCxJQUFOLEtBQWVGLEtBQUtFLElBQTdCO0FBQUEsS0FBaEIsQ0FBaEI7QUFDQSxRQUFJRyxRQUFRRyxNQUFSLEdBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLFVBQUlDLElBQUksQ0FBUjtBQUNBLFVBQU1DLElBQUlMLFFBQVFHLE1BQWxCO0FBQ0EsYUFBT0MsSUFBSUMsQ0FBWCxFQUFjRCxHQUFkLEVBQW1CO0FBQ2pCLFlBQUlKLFFBQVFJLENBQVIsTUFBZVQsSUFBbkIsRUFBeUI7QUFDdkJDLG1CQUFTLENBQVQsSUFBaUJBLFNBQVMsQ0FBVCxDQUFqQixzQkFBNENRLElBQUksQ0FBaEQ7QUFDQTtBQUNEO0FBQ0Y7QUFDRjtBQUNEUixhQUFTVSxPQUFULENBQWlCUixPQUFPRCxJQUF4QjtBQUNEO0FBQ0QsU0FBT0MsVUFBVUEsT0FBT0EsTUFBakIsR0FBMEJOLFlBQVlNLE1BQVosRUFBb0JGLFFBQXBCLENBQTFCLEdBQTBEQSxTQUFTVyxJQUFULENBQWMsS0FBZCxDQUFqRTtBQUNEOztBQUVEOzs7OztBQUtPLFNBQVNkLFFBQVQsQ0FBa0JFLElBQWxCLEVBQXdCO0FBQzdCLE1BQUlhLFFBQVEsQ0FBWixDQUQ2QixDQUNkO0FBQ2YsU0FBT2IsS0FBS0csTUFBWixFQUFvQjtBQUNsQlUsYUFBUyxDQUFUO0FBQ0FiLFdBQU9BLEtBQUtHLE1BQVo7QUFDRDtBQUNELFNBQU9VLEtBQVA7QUFDRDs7QUFFRDs7Ozs7OztBQU9PLFNBQVNkLE9BQVQsQ0FBaUJlLEdBQWpCLEVBQXNCQyxPQUF0QixFQUErQkMsT0FBL0IsRUFBd0NDLEtBQXhDLEVBQStDO0FBQ3BELE1BQUksQ0FBQ0MsTUFBTUMsT0FBTixDQUFjSixPQUFkLENBQUwsRUFBNkI7QUFDM0JBLGNBQVUsQ0FBQ0EsT0FBRCxDQUFWO0FBQ0Q7QUFDRCxNQUFNSyxTQUFTLE9BQU9ILEtBQVAsS0FBaUIsVUFBakIsR0FBOEIsVUFBOUIsR0FBMkMsT0FBMUQ7QUFDQSxNQUFNSSxXQUFXQyxTQUFTUixHQUFULEVBQWNDLE9BQWQsRUFBdUJDLE9BQXZCLENBQWpCO0FBQ0EsU0FBT0YsSUFBSVMsYUFBSixDQUFrQixlQUFPO0FBQzlCRixhQUFTRyxPQUFULENBQWlCO0FBQUEsYUFBV1YsSUFBSU0sTUFBSixFQUFZSixPQUFaLEVBQXFCQyxLQUFyQixDQUFYO0FBQUEsS0FBakI7QUFDRCxHQUZNLENBQVA7O0FBSUEsV0FBU0ssUUFBVCxDQUFrQlIsR0FBbEIsRUFBdUJXLFFBQXZCLEVBQWlDVCxPQUFqQyxFQUFnRTtBQUFBLFFBQXRCVSxRQUFzQix1RUFBWCxDQUFDVixPQUFELENBQVc7O0FBQzlELFFBQU1XLE9BQU9iLElBQUljLEtBQUosQ0FBVUgsUUFBVixDQUFiO0FBQ0EsUUFBSUUsSUFBSixFQUFVO0FBQ1IsVUFBTUUsT0FBT0YsS0FBS0UsSUFBbEI7QUFDQSxXQUFLLElBQUlwQixJQUFJLENBQWIsRUFBZ0JBLElBQUlvQixJQUFwQixFQUEwQnBCLEdBQTFCLEVBQStCO0FBQzdCaUIsaUJBQVNJLElBQVQsOEJBQWtCTCxRQUFsQixJQUE0QmhCLENBQTVCLHNCQUFrQ08sT0FBbEM7QUFDQU0saUJBQVNSLEdBQVQsK0JBQWtCVyxRQUFsQixJQUE0QmhCLENBQTVCLEVBQStCZ0IsU0FBUyxDQUFULENBQS9CLElBQTZDVCxPQUE3QyxFQUFzRFUsUUFBdEQ7QUFDRDtBQUNGO0FBQ0QsV0FBT0EsUUFBUDtBQUNEO0FBQ0YiLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIFV0aWxpdGllc1xuICpcbiAqIEhlbHBlciBmdW5jdGlvbnNcbiAqL1xuXG4vKipcbiAqIFtnZXRTZWxlY3RvciBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gbm9kZSAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheX0gIHNlbGVjdG9yIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbGVjdG9yKG5vZGUsIHNlbGVjdG9yID0gW25vZGUubmFtZV0pIHtcbiAgY29uc3QgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XG4gIGlmIChwYXJlbnQpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IHBhcmVudC5jaGlsZHJlbjtcbiAgICBjb25zdCBtYXRjaGVzID0gY2hpbGRyZW4uZmlsdGVyKGNoaWxkID0+IGNoaWxkLm5hbWUgPT09IG5vZGUubmFtZSk7XG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgbGV0IGkgPSAwO1xuICAgICAgY29uc3QgbCA9IG1hdGNoZXMubGVuZ3RoO1xuICAgICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKG1hdGNoZXNbaV0gPT09IG5vZGUpIHtcbiAgICAgICAgICBzZWxlY3RvclswXSA9IGAke3NlbGVjdG9yWzBdfTpudGgtb2YtdHlwZSgke2kgKyAxfSlgO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHNlbGVjdG9yLnVuc2hpZnQocGFyZW50Lm5hbWUpO1xuICB9XG4gIHJldHVybiBwYXJlbnQgJiYgcGFyZW50LnBhcmVudCA/IGdldFNlbGVjdG9yKHBhcmVudCwgc2VsZWN0b3IpIDogc2VsZWN0b3Iuam9pbignID4gJyk7XG59XG5cbi8qKlxuICogW2dldERlcHRoIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSBub2RlIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7TnVtYmVyfSAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVwdGgobm9kZSkge1xuICBsZXQgbGV2ZWwgPSAxOyAvLyBsZXZlbDogMFxuICB3aGlsZSAobm9kZS5wYXJlbnQpIHtcbiAgICBsZXZlbCArPSAxO1xuICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgfVxuICByZXR1cm4gbGV2ZWw7XG59XG5cbi8qKlxuICogQ2hhbmdlcyB0aGUgdGhlIHZhbHVlcyBpbiB0aGUgbmVzdGVkIGNvbGxlY3Rpb25cbiAqIEBwYXJhbSB7SW1tdXRhYmxlLk1hcH0gbWFwICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSB7QXJyYXl9ICAgICAgICAgbGlzdEtleSAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSB7QXJyYXl9ICAgICAgICAga2V5UGF0aCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSB7KnxGdW5jdGlvbn0gICAgdmFsdWUgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldERlZXAobWFwLCBsaXN0S2V5LCBrZXlQYXRoLCB2YWx1ZSkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobGlzdEtleSkpIHtcbiAgICBsaXN0S2V5ID0gW2xpc3RLZXldO1xuICB9XG4gIGNvbnN0IGNoYW5nZSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/ICd1cGRhdGVJbicgOiAnc2V0SW4nO1xuICBjb25zdCBzdWJQYXRocyA9IGdldFBhdGhzKG1hcCwgbGlzdEtleSwga2V5UGF0aCk7XG4gIHJldHVybiBtYXAud2l0aE11dGF0aW9ucyhtYXAgPT4ge1xuICAgIHN1YlBhdGhzLmZvckVhY2goa2V5UGF0aCA9PiBtYXBbY2hhbmdlXShrZXlQYXRoLCB2YWx1ZSkpO1xuICB9KTtcblxuICBmdW5jdGlvbiBnZXRQYXRocyhtYXAsIGxpc3RLZXlzLCBrZXlQYXRoLCBvdmVydmlldyA9IFtrZXlQYXRoXSkge1xuICAgIGNvbnN0IGxpc3QgPSBtYXAuZ2V0SW4obGlzdEtleXMpO1xuICAgIGlmIChsaXN0KSB7XG4gICAgICBjb25zdCBzaXplID0gbGlzdC5zaXplO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgb3ZlcnZpZXcucHVzaChbLi4ubGlzdEtleXMsIGksIC4uLmtleVBhdGhdKTtcbiAgICAgICAgZ2V0UGF0aHMobWFwLCBbLi4ubGlzdEtleXMsIGksIGxpc3RLZXlzWzBdXSwga2V5UGF0aCwgb3ZlcnZpZXcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3ZlcnZpZXc7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
