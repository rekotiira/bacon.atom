"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require("ramda");

var R = _interopRequireWildcard(_ramda);

var _baconjs = require("baconjs");

var _baconjs2 = _interopRequireDefault(_baconjs);

var _partial = require("partial.lenses");

var L = _interopRequireWildcard(_partial);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function ignore() {}

function set(value) {
  this.modify(function () {
    return value;
  });
}

function getLens() {
  return L.get(this.mapper, this.parent.get());
}
function modifyLens(x2x) {
  this.parent.modify(L.modify(this.mapper, x2x));
}

function lens(l) {
  for (var _len = arguments.length, ls = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    ls[_key - 1] = arguments[_key];
  }

  var mapper = L.default.apply(undefined, [l].concat(ls));

  var atom = this.map(L.get(mapper)).skipDuplicates(R.equals);

  atom.parent = this;
  atom.mapper = mapper;
  atom.modify = modifyLens;
  atom.get = getLens;
  atom.set = set;
  atom.lens = lens;
  atom.view = lens;

  return atom;
}

function getRoot() {
  return this.value;
}
function modifyRoot(x2x) {
  this.bus.push(x2x);
}

exports.default = function (value) {
  var bus = _baconjs2.default.Bus();
  var atom = bus.scan(value, function (v, fn) {
    return atom.value = fn(v);
  }).skipDuplicates(R.equals);

  atom.subscribe(ignore);

  atom.value = value;
  atom.bus = bus;
  atom.modify = modifyRoot;
  atom.get = getRoot;
  atom.set = set;
  atom.lens = lens;
  atom.view = lens;

  return atom;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWNvbi5hdG9tLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztJQUFZLEM7O0FBQ1o7Ozs7QUFDQTs7SUFBZSxDOzs7Ozs7QUFFZixTQUFTLE1BQVQsR0FBa0IsQ0FBRTs7QUFFcEIsU0FBUyxHQUFULENBQWEsS0FBYixFQUFvQjtBQUFFLE9BQUssTUFBTCxDQUFZO0FBQUEsV0FBTSxLQUFOO0FBQUEsR0FBWjtBQUEwQjs7QUFFaEQsU0FBUyxPQUFULEdBQW1CO0FBQUUsU0FBTyxFQUFFLEdBQUYsQ0FBTSxLQUFLLE1BQVgsRUFBbUIsS0FBSyxNQUFMLENBQVksR0FBWixFQUFuQixDQUFQO0FBQThDO0FBQ25FLFNBQVMsVUFBVCxDQUFvQixHQUFwQixFQUF5QjtBQUFFLE9BQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsRUFBRSxNQUFGLENBQVMsS0FBSyxNQUFkLEVBQXNCLEdBQXRCLENBQW5CO0FBQWdEOztBQUUzRSxTQUFTLElBQVQsQ0FBYyxDQUFkLEVBQXdCO0FBQUEsb0NBQUosRUFBSTtBQUFKLE1BQUk7QUFBQTs7QUFDdEIsTUFBTSxTQVZPLENBVUUsMkJBQUUsQ0FBRixTQUFRLEVBQVIsRUFBZjs7QUFFQSxNQUFNLE9BQU8sS0FBSyxHQUFMLENBQVMsRUFBRSxHQUFGLENBQU0sTUFBTixDQUFULEVBQXdCLGNBQXhCLENBQXVDLEVBQUUsTUFBekMsQ0FBYjs7QUFFQSxPQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0EsT0FBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLE9BQUssTUFBTCxHQUFjLFVBQWQ7QUFDQSxPQUFLLEdBQUwsR0FBVyxPQUFYO0FBQ0EsT0FBSyxHQUFMLEdBQVcsR0FBWDtBQUNBLE9BQUssSUFBTCxHQUFZLElBQVo7QUFDQSxPQUFLLElBQUwsR0FBWSxJQUFaOztBQUVBLFNBQU8sSUFBUDtBQUNEOztBQUVELFNBQVMsT0FBVCxHQUFtQjtBQUFFLFNBQU8sS0FBSyxLQUFaO0FBQW1CO0FBQ3hDLFNBQVMsVUFBVCxDQUFvQixHQUFwQixFQUF5QjtBQUFFLE9BQUssR0FBTCxDQUFTLElBQVQsQ0FBYyxHQUFkO0FBQW9COztrQkFFaEMsaUJBQVM7QUFDdEIsTUFBTSxNQUFNLGtCQUFNLEdBQU4sRUFBWjtBQUNBLE1BQU0sT0FBTyxJQUFJLElBQUosQ0FBUyxLQUFULEVBQWdCLFVBQUMsQ0FBRCxFQUFJLEVBQUo7QUFBQSxXQUFXLEtBQUssS0FBTCxHQUFhLEdBQUcsQ0FBSCxDQUF4QjtBQUFBLEdBQWhCLEVBQStDLGNBQS9DLENBQThELEVBQUUsTUFBaEUsQ0FBYjs7QUFFQSxPQUFLLFNBQUwsQ0FBZSxNQUFmOztBQUVBLE9BQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxPQUFLLEdBQUwsR0FBVyxHQUFYO0FBQ0EsT0FBSyxNQUFMLEdBQWMsVUFBZDtBQUNBLE9BQUssR0FBTCxHQUFXLE9BQVg7QUFDQSxPQUFLLEdBQUwsR0FBVyxHQUFYO0FBQ0EsT0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUssSUFBTCxHQUFZLElBQVo7O0FBRUEsU0FBTyxJQUFQO0FBQ0QsQyIsImZpbGUiOiJiYWNvbi5hdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUiAgICBmcm9tIFwicmFtZGFcIlxuaW1wb3J0IEJhY29uICAgICBmcm9tIFwiYmFjb25qc1wiXG5pbXBvcnQgUCwgKiBhcyBMIGZyb20gXCJwYXJ0aWFsLmxlbnNlc1wiXG5cbmZ1bmN0aW9uIGlnbm9yZSgpIHt9XG5cbmZ1bmN0aW9uIHNldCh2YWx1ZSkgeyB0aGlzLm1vZGlmeSgoKSA9PiB2YWx1ZSkgfVxuXG5mdW5jdGlvbiBnZXRMZW5zKCkgeyByZXR1cm4gTC5nZXQodGhpcy5tYXBwZXIsIHRoaXMucGFyZW50LmdldCgpKSB9XG5mdW5jdGlvbiBtb2RpZnlMZW5zKHgyeCkgeyB0aGlzLnBhcmVudC5tb2RpZnkoTC5tb2RpZnkodGhpcy5tYXBwZXIsIHgyeCkpIH1cblxuZnVuY3Rpb24gbGVucyhsLCAuLi5scykge1xuICBjb25zdCBtYXBwZXIgPSBQKGwsIC4uLmxzKVxuXG4gIGNvbnN0IGF0b20gPSB0aGlzLm1hcChMLmdldChtYXBwZXIpKS5za2lwRHVwbGljYXRlcyhSLmVxdWFscylcblxuICBhdG9tLnBhcmVudCA9IHRoaXNcbiAgYXRvbS5tYXBwZXIgPSBtYXBwZXJcbiAgYXRvbS5tb2RpZnkgPSBtb2RpZnlMZW5zXG4gIGF0b20uZ2V0ID0gZ2V0TGVuc1xuICBhdG9tLnNldCA9IHNldFxuICBhdG9tLmxlbnMgPSBsZW5zXG4gIGF0b20udmlldyA9IGxlbnNcblxuICByZXR1cm4gYXRvbVxufVxuXG5mdW5jdGlvbiBnZXRSb290KCkgeyByZXR1cm4gdGhpcy52YWx1ZSB9XG5mdW5jdGlvbiBtb2RpZnlSb290KHgyeCkgeyB0aGlzLmJ1cy5wdXNoKHgyeCkgfVxuXG5leHBvcnQgZGVmYXVsdCB2YWx1ZSA9PiB7XG4gIGNvbnN0IGJ1cyA9IEJhY29uLkJ1cygpXG4gIGNvbnN0IGF0b20gPSBidXMuc2Nhbih2YWx1ZSwgKHYsIGZuKSA9PiBhdG9tLnZhbHVlID0gZm4odikpLnNraXBEdXBsaWNhdGVzKFIuZXF1YWxzKVxuXG4gIGF0b20uc3Vic2NyaWJlKGlnbm9yZSlcblxuICBhdG9tLnZhbHVlID0gdmFsdWVcbiAgYXRvbS5idXMgPSBidXNcbiAgYXRvbS5tb2RpZnkgPSBtb2RpZnlSb290XG4gIGF0b20uZ2V0ID0gZ2V0Um9vdFxuICBhdG9tLnNldCA9IHNldFxuICBhdG9tLmxlbnMgPSBsZW5zXG4gIGF0b20udmlldyA9IGxlbnNcblxuICByZXR1cm4gYXRvbVxufVxuIl19