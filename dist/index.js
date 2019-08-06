'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".BarGauge_gauge_container__3XJws {\n  background: #f2f2f2;\n  position: relative;\n  height: 6px;\n  width: 100px;\n  border-radius: 2px;\n  overflow: hidden;\n}\n.BarGauge_bar_gauge_fill__1zoAm {\n  position: absolute;\n  background-image: linear-gradient(to right, #189bff , #002d4f 100px);\n  height: 100%;\n}";
var styles = {"gauge_container":"BarGauge_gauge_container__3XJws","bar_gauge_fill":"BarGauge_bar_gauge_fill__1zoAm"};
styleInject(css);

var BarGauge = function BarGauge(_ref) {
  var score = _ref.score;

  if (score >= 0 && score <= 100) {
    return React__default.createElement("div", {
      className: styles.gauge_container
    }, React__default.createElement("div", {
      className: styles.bar_gauge_fill,
      style: {
        width: "".concat(score, "%")
      }
    }));
  } else {
    return React__default.createElement("div", null, "Invalid Score");
  }
};

var css$1 = ".RadiusGauge_gauge_point__2LaQj {\n  text-anchor: middle;\n  opacity: 0.4;\n  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';\n  font-size: 11px;\n  font-weight: normal;\n  font-style: normal;\n  font-stretch: normal;\n  letter-spacing: -0.5px;\n  fill: '#000000';\n}\n\n.RadiusGauge_gauge_score__34K1I {\n  text-anchor: middle;\n  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';\n  font-size: 32px;\n  font-weight: bold;\n  font-style: normal;\n  font-stretch: normal;\n  letter-spacing: -0.5px;\n  fill: '#000000';\n}";
var styles$1 = {"gauge_point":"RadiusGauge_gauge_point__2LaQj","gauge_score":"RadiusGauge_gauge_score__34K1I"};
styleInject(css$1);

var version = "5.9.7";

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function bisector(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
}

function ascendingComparator(f) {
  return function(d, x) {
    return ascending(f(d), x);
  };
}

var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;

function pairs(array, f) {
  if (f == null) f = pair;
  var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
  while (i < n) pairs[i] = f(p, p = array[++i]);
  return pairs;
}

function pair(a, b) {
  return [a, b];
}

function cross(values0, values1, reduce) {
  var n0 = values0.length,
      n1 = values1.length,
      values = new Array(n0 * n1),
      i0,
      i1,
      i,
      value0;

  if (reduce == null) reduce = pair;

  for (i0 = i = 0; i0 < n0; ++i0) {
    for (value0 = values0[i0], i1 = 0; i1 < n1; ++i1, ++i) {
      values[i] = reduce(value0, values1[i1]);
    }
  }

  return values;
}

function descending(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function number(x) {
  return x === null ? NaN : +x;
}

function variance(values, valueof) {
  var n = values.length,
      m = 0,
      i = -1,
      mean = 0,
      value,
      delta,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  if (m > 1) return sum / (m - 1);
}

function deviation(array, f) {
  var v = variance(array, f);
  return v ? Math.sqrt(v) : v;
}

function extent(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  return [min, max];
}

var array = Array.prototype;

var slice = array.slice;
var map = array.map;

function constant(x) {
  return function() {
    return x;
  };
}

function identity(x) {
  return x;
}

function sequence(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function ticks(start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;

  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));
    while (++i < n) ticks[i] = (start + i) * step;
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));
    while (++i < n) ticks[i] = (start - i) / step;
  }

  if (reverse) ticks.reverse();

  return ticks;
}

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}

function thresholdSturges(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
}

function histogram() {
  var value = identity,
      domain = extent,
      threshold = thresholdSturges;

  function histogram(data) {
    var i,
        n = data.length,
        x,
        values = new Array(n);

    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }

    var xz = domain(values),
        x0 = xz[0],
        x1 = xz[1],
        tz = threshold(values, x0, x1);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      tz = tickStep(x0, x1, tz);
      tz = sequence(Math.ceil(x0 / tz) * tz, x1, tz); // exclusive
    }

    // Remove any thresholds outside the domain.
    var m = tz.length;
    while (tz[0] <= x0) tz.shift(), --m;
    while (tz[m - 1] > x1) tz.pop(), --m;

    var bins = new Array(m + 1),
        bin;

    // Initialize bins.
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    }

    // Assign data to bins by value, ignoring any outside the domain.
    for (i = 0; i < n; ++i) {
      x = values[i];
      if (x0 <= x && x <= x1) {
        bins[bisectRight(tz, x, 0, m)].push(data[i]);
      }
    }

    return bins;
  }

  histogram.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
  };

  histogram.domain = function(_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
  };

  histogram.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), histogram) : threshold;
  };

  return histogram;
}

function threshold(values, p, valueof) {
  if (valueof == null) valueof = number;
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}

function freedmanDiaconis(values, min, max) {
  values = map.call(values, number).sort(ascending);
  return Math.ceil((max - min) / (2 * (threshold(values, 0.75) - threshold(values, 0.25)) * Math.pow(values.length, -1 / 3)));
}

function scott(values, min, max) {
  return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
}

function max(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  return max;
}

function mean(values, valueof) {
  var n = values.length,
      m = n,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) sum += value;
      else --m;
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) sum += value;
      else --m;
    }
  }

  if (m) return sum / m;
}

function median(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      numbers = [];

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) {
        numbers.push(value);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) {
        numbers.push(value);
      }
    }
  }

  return threshold(numbers.sort(ascending), 0.5);
}

function merge(arrays) {
  var n = arrays.length,
      m,
      i = -1,
      j = 0,
      merged,
      array;

  while (++i < n) j += arrays[i].length;
  merged = new Array(j);

  while (--n >= 0) {
    array = arrays[n];
    m = array.length;
    while (--m >= 0) {
      merged[--j] = array[m];
    }
  }

  return merged;
}

function min(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  return min;
}

function permute(array, indexes) {
  var i = indexes.length, permutes = new Array(i);
  while (i--) permutes[i] = array[indexes[i]];
  return permutes;
}

function scan(values, compare) {
  if (!(n = values.length)) return;
  var n,
      i = 0,
      j = 0,
      xi,
      xj = values[j];

  if (compare == null) compare = ascending;

  while (++i < n) {
    if (compare(xi = values[i], xj) < 0 || compare(xj, xj) !== 0) {
      xj = xi, j = i;
    }
  }

  if (compare(xj, xj) === 0) return j;
}

function shuffle(array, i0, i1) {
  var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
      t,
      i;

  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m + i0];
    array[m + i0] = array[i + i0];
    array[i + i0] = t;
  }

  return array;
}

function sum(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (value = +values[i]) sum += value; // Note: zero and null are equivalent.
    }
  }

  else {
    while (++i < n) {
      if (value = +valueof(values[i], i, values)) sum += value;
    }
  }

  return sum;
}

function transpose(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
}

function length(d) {
  return d.length;
}

function zip() {
  return transpose(arguments);
}

var slice$1 = Array.prototype.slice;

function identity$1(x) {
  return x;
}

var top = 1,
    right = 2,
    bottom = 3,
    left = 4,
    epsilon = 1e-6;

function translateX(x) {
  return "translate(" + (x + 0.5) + ",0)";
}

function translateY(y) {
  return "translate(0," + (y + 0.5) + ")";
}

function number$1(scale) {
  return function(d) {
    return +scale(d);
  };
}

function center(scale) {
  var offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.
  if (scale.round()) offset = Math.round(offset);
  return function(d) {
    return +scale(d) + offset;
  };
}

function entering() {
  return !this.__axis;
}

function axis(orient, scale) {
  var tickArguments = [],
      tickValues = null,
      tickFormat = null,
      tickSizeInner = 6,
      tickSizeOuter = 6,
      tickPadding = 3,
      k = orient === top || orient === left ? -1 : 1,
      x = orient === left || orient === right ? "x" : "y",
      transform = orient === top || orient === bottom ? translateX : translateY;

  function axis(context) {
    var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
        format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity$1) : tickFormat,
        spacing = Math.max(tickSizeInner, 0) + tickPadding,
        range = scale.range(),
        range0 = +range[0] + 0.5,
        range1 = +range[range.length - 1] + 0.5,
        position = (scale.bandwidth ? center : number$1)(scale.copy()),
        selection = context.selection ? context.selection() : context,
        path = selection.selectAll(".domain").data([null]),
        tick = selection.selectAll(".tick").data(values, scale).order(),
        tickExit = tick.exit(),
        tickEnter = tick.enter().append("g").attr("class", "tick"),
        line = tick.select("line"),
        text = tick.select("text");

    path = path.merge(path.enter().insert("path", ".tick")
        .attr("class", "domain")
        .attr("stroke", "currentColor"));

    tick = tick.merge(tickEnter);

    line = line.merge(tickEnter.append("line")
        .attr("stroke", "currentColor")
        .attr(x + "2", k * tickSizeInner));

    text = text.merge(tickEnter.append("text")
        .attr("fill", "currentColor")
        .attr(x, k * spacing)
        .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

    if (context !== selection) {
      path = path.transition(context);
      tick = tick.transition(context);
      line = line.transition(context);
      text = text.transition(context);

      tickExit = tickExit.transition(context)
          .attr("opacity", epsilon)
          .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d) : this.getAttribute("transform"); });

      tickEnter
          .attr("opacity", epsilon)
          .attr("transform", function(d) { var p = this.parentNode.__axis; return transform(p && isFinite(p = p(d)) ? p : position(d)); });
    }

    tickExit.remove();

    path
        .attr("d", orient === left || orient == right
            ? (tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter : "M0.5," + range0 + "V" + range1)
            : (tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + ",0.5H" + range1));

    tick
        .attr("opacity", 1)
        .attr("transform", function(d) { return transform(position(d)); });

    line
        .attr(x + "2", k * tickSizeInner);

    text
        .attr(x, k * spacing)
        .text(format);

    selection.filter(entering)
        .attr("fill", "none")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");

    selection
        .each(function() { this.__axis = position; });
  }

  axis.scale = function(_) {
    return arguments.length ? (scale = _, axis) : scale;
  };

  axis.ticks = function() {
    return tickArguments = slice$1.call(arguments), axis;
  };

  axis.tickArguments = function(_) {
    return arguments.length ? (tickArguments = _ == null ? [] : slice$1.call(_), axis) : tickArguments.slice();
  };

  axis.tickValues = function(_) {
    return arguments.length ? (tickValues = _ == null ? null : slice$1.call(_), axis) : tickValues && tickValues.slice();
  };

  axis.tickFormat = function(_) {
    return arguments.length ? (tickFormat = _, axis) : tickFormat;
  };

  axis.tickSize = function(_) {
    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
  };

  axis.tickSizeInner = function(_) {
    return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
  };

  axis.tickSizeOuter = function(_) {
    return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
  };

  axis.tickPadding = function(_) {
    return arguments.length ? (tickPadding = +_, axis) : tickPadding;
  };

  return axis;
}

function axisTop(scale) {
  return axis(top, scale);
}

function axisRight(scale) {
  return axis(right, scale);
}

function axisBottom(scale) {
  return axis(bottom, scale);
}

function axisLeft(scale) {
  return axis(left, scale);
}

var noop = {value: function() {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

var xhtml = "http://www.w3.org/1999/xhtml";

var namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
}

function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function creator(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
}

function none() {}

function selector(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

function selection_select(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

function empty() {
  return [];
}

function selectorAll(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

function selection_selectAll(select) {
  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection(subgroups, parents);
}

function matcher(selector) {
  return function() {
    return this.matches(selector);
  };
}

function selection_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

function sparse(update) {
  return new Array(update.length);
}

function selection_enter() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

function constant$1(x) {
  return function() {
    return x;
  };
}

var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
      exit[i] = node;
    }
  }
}

function selection_data(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) { data[++j] = d; });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = constant$1(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

function selection_exit() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
}

function selection_join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

function selection_merge(selection) {

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection(merges, this._parents);
}

function selection_order() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}

function selection_sort(compare) {
  if (!compare) compare = ascending$1;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection(sortgroups, this._parents).order();
}

function ascending$1(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

function selection_nodes() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() { nodes[++i] = this; });
  return nodes;
}

function selection_node() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}

function selection_size() {
  var size = 0;
  this.each(function() { ++size; });
  return size;
}

function selection_empty() {
  return !this.node();
}

function selection_each(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}

function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function selection_attr(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
}

function defaultView(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

function selection_style(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}

function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

function selection_property(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
}

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

function selection_classed(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
}

function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

function selection_text(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
}

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

function selection_html(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
}

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function selection_raise() {
  return this.each(raise);
}

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function selection_lower() {
  return this.each(lower);
}

function selection_append(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}

function constantNull() {
  return null;
}

function selection_insert(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function selection_remove() {
  return this.each(remove);
}

function selection_cloneShallow() {
  return this.parentNode.insertBefore(this.cloneNode(false), this.nextSibling);
}

function selection_cloneDeep() {
  return this.parentNode.insertBefore(this.cloneNode(true), this.nextSibling);
}

function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

function selection_datum(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}

var filterEvents = {};

var event = null;

if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!("onmouseenter" in element)) {
    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
  }
}

function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function(event) {
    var related = event.relatedTarget;
    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
      listener.call(this, event);
    }
  };
}

function contextListener(listener, index, group) {
  return function(event1) {
    var event0 = event; // Events can be reentrant (e.g., focus).
    event = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      event = event0;
    }
  };
}

function parseTypenames$1(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function(d, i, group) {
    var on = this.__on, o, listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

function selection_on(typename, value, capture) {
  var typenames = parseTypenames$1(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
}

function customEvent(event1, listener, that, args) {
  var event0 = event;
  event1.sourceEvent = event;
  event = event1;
  try {
    return listener.apply(that, args);
  } finally {
    event = event0;
  }
}

function dispatchEvent(node, type, params) {
  var window = defaultView(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

function selection_dispatch(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}

var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: selection_select,
  selectAll: selection_selectAll,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  join: selection_join,
  merge: selection_merge,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch
};

function select(selector) {
  return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
}

function create(name) {
  return select(creator(name).call(document.documentElement));
}

var nextId = 0;

function local() {
  return new Local;
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function(node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};

function sourceEvent() {
  var current = event, source;
  while (source = current.sourceEvent) current = source;
  return current;
}

function point(node, event) {
  var svg = node.ownerSVGElement || node;

  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event.clientX, point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }

  var rect = node.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
}

function mouse(node) {
  var event = sourceEvent();
  if (event.changedTouches) event = event.changedTouches[0];
  return point(node, event);
}

function selectAll(selector) {
  return typeof selector === "string"
      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
      : new Selection([selector == null ? [] : selector], root);
}

function touch(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;

  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return point(node, touch);
    }
  }

  return null;
}

function touches(node, touches) {
  if (touches == null) touches = sourceEvent().touches;

  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = point(node, touches[i]);
  }

  return points;
}

function nopropagation() {
  event.stopImmediatePropagation();
}

function noevent() {
  event.preventDefault();
  event.stopImmediatePropagation();
}

function dragDisable(view) {
  var root = view.document.documentElement,
      selection = select(view).on("dragstart.drag", noevent, true);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", noevent, true);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
}

function yesdrag(view, noclick) {
  var root = view.document.documentElement,
      selection = select(view).on("dragstart.drag", null);
  if (noclick) {
    selection.on("click.drag", noevent, true);
    setTimeout(function() { selection.on("click.drag", null); }, 0);
  }
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}

function constant$2(x) {
  return function() {
    return x;
  };
}

function DragEvent(target, type, subject, id, active, x, y, dx, dy, dispatch) {
  this.target = target;
  this.type = type;
  this.subject = subject;
  this.identifier = id;
  this.active = active;
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this._ = dispatch;
}

DragEvent.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};

// Ignore right-click, since that should open the context menu.
function defaultFilter() {
  return !event.button;
}

function defaultContainer() {
  return this.parentNode;
}

function defaultSubject(d) {
  return d == null ? {x: event.x, y: event.y} : d;
}

function defaultTouchable() {
  return "ontouchstart" in this;
}

function drag() {
  var filter = defaultFilter,
      container = defaultContainer,
      subject = defaultSubject,
      touchable = defaultTouchable,
      gestures = {},
      listeners = dispatch("start", "drag", "end"),
      active = 0,
      mousedownx,
      mousedowny,
      mousemoving,
      touchending,
      clickDistance2 = 0;

  function drag(selection) {
    selection
        .on("mousedown.drag", mousedowned)
      .filter(touchable)
        .on("touchstart.drag", touchstarted)
        .on("touchmove.drag", touchmoved)
        .on("touchend.drag touchcancel.drag", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  function mousedowned() {
    if (touchending || !filter.apply(this, arguments)) return;
    var gesture = beforestart("mouse", container.apply(this, arguments), mouse, this, arguments);
    if (!gesture) return;
    select(event.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
    dragDisable(event.view);
    nopropagation();
    mousemoving = false;
    mousedownx = event.clientX;
    mousedowny = event.clientY;
    gesture("start");
  }

  function mousemoved() {
    noevent();
    if (!mousemoving) {
      var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
      mousemoving = dx * dx + dy * dy > clickDistance2;
    }
    gestures.mouse("drag");
  }

  function mouseupped() {
    select(event.view).on("mousemove.drag mouseup.drag", null);
    yesdrag(event.view, mousemoving);
    noevent();
    gestures.mouse("end");
  }

  function touchstarted() {
    if (!filter.apply(this, arguments)) return;
    var touches = event.changedTouches,
        c = container.apply(this, arguments),
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(touches[i].identifier, c, touch, this, arguments)) {
        nopropagation();
        gesture("start");
      }
    }
  }

  function touchmoved() {
    var touches = event.changedTouches,
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        noevent();
        gesture("drag");
      }
    }
  }

  function touchended() {
    var touches = event.changedTouches,
        n = touches.length, i, gesture;

    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        nopropagation();
        gesture("end");
      }
    }
  }

  function beforestart(id, container, point, that, args) {
    var p = point(container, id), s, dx, dy,
        sublisteners = listeners.copy();

    if (!customEvent(new DragEvent(drag, "beforestart", s, id, active, p[0], p[1], 0, 0, sublisteners), function() {
      if ((event.subject = s = subject.apply(that, args)) == null) return false;
      dx = s.x - p[0] || 0;
      dy = s.y - p[1] || 0;
      return true;
    })) return;

    return function gesture(type) {
      var p0 = p, n;
      switch (type) {
        case "start": gestures[id] = gesture, n = active++; break;
        case "end": delete gestures[id], --active; // nobreak
        case "drag": p = point(container, id), n = active; break;
      }
      customEvent(new DragEvent(drag, type, s, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], sublisteners), sublisteners.apply, sublisteners, [type, that, args]);
    };
  }

  drag.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$2(!!_), drag) : filter;
  };

  drag.container = function(_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : constant$2(_), drag) : container;
  };

  drag.subject = function(_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : constant$2(_), drag) : subject;
  };

  drag.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$2(!!_), drag) : touchable;
  };

  drag.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag : value;
  };

  drag.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
  };

  return drag;
}

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex3 = /^#([0-9a-f]{3})$/,
    reHex6 = /^#([0-9a-f]{6})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: function() {
    return this.rgb().hex();
  },
  toString: function() {
    return this.rgb() + "";
  }
});

function color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format])
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: function() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  },
  toString: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;

// https://observablehq.com/@mbostock/lab-and-rgb
var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r === g && g === b) x = z = y; else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

define(Lab, lab, extend(Color, {
  brighter: function(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new Rgb(
      lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
      lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * rad2deg;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * deg2rad;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}

define(Hcl, hcl, extend(Color, {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return hcl2lab(this).rgb();
  }
}));

var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Cubehelix, cubehelix, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new Rgb(
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));

function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

function basis$1(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

function basisClosed(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

function constant$3(x) {
  return function() {
    return x;
  };
}

function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$3(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant$3(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant$3(isNaN(a) ? b : a);
}

var interpolateRgb = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb$1(start, end) {
    var r = color((start = rgb(start)).r, (end = rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb$1.gamma = rgbGamma;

  return rgb$1;
})(1);

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = rgb(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(basis$1);
var rgbBasisClosed = rgbSpline(basisClosed);

function array$1(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = interpolateValue(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

function date(a, b) {
  var d = new Date;
  return a = +a, b -= a, function(t) {
    return d.setTime(a + b * t), d;
  };
}

function interpolateNumber(a, b) {
  return a = +a, b -= a, function(t) {
    return a + b * t;
  };
}

function object(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = interpolateValue(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

function interpolateString(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: interpolateNumber(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

function interpolateValue(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant$3(b)
      : (t === "number" ? interpolateNumber
      : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
      : b instanceof color ? interpolateRgb
      : b instanceof Date ? date
      : Array.isArray(b) ? array$1
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : interpolateNumber)(a, b);
}

function discrete(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

function hue$1(a, b) {
  var i = hue(+a, +b);
  return function(t) {
    var x = i(t);
    return x - 360 * Math.floor(x / 360);
  };
}

function interpolateRound(a, b) {
  return a = +a, b -= a, function(t) {
    return Math.round(a + b * t);
  };
}

var degrees = 180 / Math.PI;

var identity$2 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

var cssNode,
    cssRoot,
    cssView,
    svgNode;

function parseCss(value) {
  if (value === "none") return identity$2;
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return identity$2;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity$2;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

var rho = Math.SQRT2,
    rho2 = 2,
    rho4 = 4,
    epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
function interpolateZoom(p0, p1) {
  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

  // Special case for u0 ≅ u1.
  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;
    i = function(t) {
      return [
        ux0 + t * dx,
        uy0 + t * dy,
        w0 * Math.exp(rho * t * S)
      ];
    };
  }

  // General case.
  else {
    var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    i = function(t) {
      var s = t * S,
          coshr0 = cosh(r0),
          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
      return [
        ux0 + u * dx,
        uy0 + u * dy,
        w0 * coshr0 / cosh(rho * s + r0)
      ];
    };
  }

  i.duration = S * 1000;

  return i;
}

function hsl$1(hue) {
  return function(start, end) {
    var h = hue((start = hsl(start)).h, (end = hsl(end)).h),
        s = nogamma(start.s, end.s),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

var hsl$2 = hsl$1(hue);
var hslLong = hsl$1(nogamma);

function lab$1(start, end) {
  var l = nogamma((start = lab(start)).l, (end = lab(end)).l),
      a = nogamma(start.a, end.a),
      b = nogamma(start.b, end.b),
      opacity = nogamma(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}

function hcl$1(hue) {
  return function(start, end) {
    var h = hue((start = hcl(start)).h, (end = hcl(end)).h),
        c = nogamma(start.c, end.c),
        l = nogamma(start.l, end.l),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

var hcl$2 = hcl$1(hue);
var hclLong = hcl$1(nogamma);

function cubehelix$1(hue) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix$1(start, end) {
      var h = hue((start = cubehelix(start)).h, (end = cubehelix(end)).h),
          s = nogamma(start.s, end.s),
          l = nogamma(start.l, end.l),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix$1.gamma = cubehelixGamma;

    return cubehelix$1;
  })(1);
}

var cubehelix$2 = cubehelix$1(hue);
var cubehelixLong = cubehelix$1(nogamma);

function piecewise(interpolate, values) {
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n) I[i] = interpolate(v, v = values[++i]);
  return function(t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}

function quantize(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
}

var frame = 0, // is an animation frame pending?
    timeout = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

function timeout$1(callback, delay, time) {
  var t = new Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

function interval$1(callback, delay, time) {
  var t = new Timer, total = delay;
  if (delay == null) return t.restart(callback, delay, time), t;
  delay = +delay, time = time == null ? now() : +time;
  t.restart(function tick(elapsed) {
    elapsed += total;
    t.restart(tick, total += delay, time);
    callback(elapsed);
  }, delay, time);
  return t;
}

var emptyOn = dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

function schedule(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create$1(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}

function init(node, id) {
  var schedule = get$1(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function set$1(node, id) {
  var schedule = get$1(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}

function get$1(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}

function create$1(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = timer(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return timeout$1(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    timeout$1(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}

function interrupt(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
}

function selection_interrupt(name) {
  return this.each(function() {
    interrupt(this, name);
  });
}

function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = set$1(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule = set$1(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

function transition_tween(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = get$1(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = set$1(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return get$1(node, id).value[name];
  };
}

function interpolate(a, b) {
  var c;
  return (typeof b === "number" ? interpolateNumber
      : b instanceof color ? interpolateRgb
      : (c = color(b)) ? (b = c, interpolateRgb)
      : interpolateString)(a, b);
}

function attrRemove$1(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS$1(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant$1(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrConstantNS$1(fullname, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrFunction$1(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function attrFunctionNS$1(fullname, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function transition_attr(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)(fullname, i, tweenValue(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS$1 : attrRemove$1)(fullname)
      : (fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, i, value));
}

function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i(t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i(t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

function delayFunction(id, value) {
  return function() {
    init(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    init(this, id).delay = value;
  };
}

function transition_delay(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : get$1(this.node(), id).delay;
}

function durationFunction(id, value) {
  return function() {
    set$1(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    set$1(this, id).duration = value;
  };
}

function transition_duration(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : get$1(this.node(), id).duration;
}

function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    set$1(this, id).ease = value;
  };
}

function transition_ease(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : get$1(this.node(), id).ease;
}

function transition_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
}

function transition_merge(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Transition(merges, this._parents, this._name, this._id);
}

function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? init : set$1;
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

function transition_on(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? get$1(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
}

function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}

function transition_select(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id, i, subgroup, get$1(node, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, name, id);
}

function transition_selectAll(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = get$1(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new Transition(subgroups, parents, name, id);
}

var Selection$1 = selection.prototype.constructor;

function transition_selection() {
  return new Selection$1(this._groups, this._parents);
}

function styleNull(name, interpolate) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}

function styleRemove$1(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant$1(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function styleFunction$1(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        value1 = value(this),
        string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function styleMaybeRemove(id, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
  return function() {
    var schedule = set$1(this, id),
        on = schedule.on,
        listener = schedule.value[key] == null ? remove || (remove = styleRemove$1(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

    schedule.on = on1;
  };
}

function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this
      .styleTween(name, styleNull(name, i))
      .on("end.style." + name, styleRemove$1(name))
    : typeof value === "function" ? this
      .styleTween(name, styleFunction$1(name, i, tweenValue(this, "style." + name, value)))
      .each(styleMaybeRemove(this._id, name))
    : this
      .styleTween(name, styleConstant$1(name, i, value), priority)
      .on("end.style." + name, null);
}

function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i(t), priority);
  };
}

function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}

function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

function textConstant$1(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction$1(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

function transition_text(value) {
  return this.tween("text", typeof value === "function"
      ? textFunction$1(tweenValue(this, "text", value))
      : textConstant$1(value == null ? "" : value + ""));
}

function transition_transition() {
  var name = this._name,
      id0 = this._id,
      id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = get$1(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new Transition(groups, this._parents, name, id1);
}

function transition_end() {
  var on0, on1, that = this, id = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {value: reject},
        end = {value: function() { if (--size === 0) resolve(); }};

    that.each(function() {
      var schedule = set$1(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }

      schedule.on = on1;
    });
  });
}

var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function transition(name) {
  return selection().transition(name);
}

function newId() {
  return ++id;
}

var selection_prototype = selection.prototype;

Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  remove: transition_remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease,
  end: transition_end
};

function linear$1(t) {
  return +t;
}

function quadIn(t) {
  return t * t;
}

function quadOut(t) {
  return t * (2 - t);
}

function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}

function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

var exponent = 3;

var polyIn = (function custom(e) {
  e = +e;

  function polyIn(t) {
    return Math.pow(t, e);
  }

  polyIn.exponent = custom;

  return polyIn;
})(exponent);

var polyOut = (function custom(e) {
  e = +e;

  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }

  polyOut.exponent = custom;

  return polyOut;
})(exponent);

var polyInOut = (function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }

  polyInOut.exponent = custom;

  return polyInOut;
})(exponent);

var pi = Math.PI,
    halfPi = pi / 2;

function sinIn(t) {
  return 1 - Math.cos(t * halfPi);
}

function sinOut(t) {
  return Math.sin(t * halfPi);
}

function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}

function expIn(t) {
  return Math.pow(2, 10 * t - 10);
}

function expOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

function expInOut(t) {
  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
}

function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}

function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}

var b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}

function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}

function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}

var overshoot = 1.70158;

var backIn = (function custom(s) {
  s = +s;

  function backIn(t) {
    return t * t * ((s + 1) * t - s);
  }

  backIn.overshoot = custom;

  return backIn;
})(overshoot);

var backOut = (function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((s + 1) * t + s) + 1;
  }

  backOut.overshoot = custom;

  return backOut;
})(overshoot);

var backInOut = (function custom(s) {
  s = +s;

  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }

  backInOut.overshoot = custom;

  return backInOut;
})(overshoot);

var tau = 2 * Math.PI,
    amplitude = 1,
    period = 0.3;

var elasticIn = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticIn(t) {
    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
  }

  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
  elasticIn.period = function(p) { return custom(a, p); };

  return elasticIn;
})(amplitude, period);

var elasticOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticOut(t) {
    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
  }

  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticOut.period = function(p) { return custom(a, p); };

  return elasticOut;
})(amplitude, period);

var elasticInOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0
        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticInOut.period = function(p) { return custom(a, p); };

  return elasticInOut;
})(amplitude, period);

var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      return defaultTiming.time = now(), defaultTiming;
    }
  }
  return timing;
}

function selection_transition(name) {
  var id,
      timing;

  if (name instanceof Transition) {
    id = name._id, name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
}

selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;

var root$1 = [null];

function active(node, name) {
  var schedules = node.__transition,
      schedule,
      i;

  if (schedules) {
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).state > SCHEDULED && schedule.name === name) {
        return new Transition([[node]], root$1, name, +i);
      }
    }
  }

  return null;
}

function constant$4(x) {
  return function() {
    return x;
  };
}

function BrushEvent(target, type, selection) {
  this.target = target;
  this.type = type;
  this.selection = selection;
}

function nopropagation$1() {
  event.stopImmediatePropagation();
}

function noevent$1() {
  event.preventDefault();
  event.stopImmediatePropagation();
}

var MODE_DRAG = {name: "drag"},
    MODE_SPACE = {name: "space"},
    MODE_HANDLE = {name: "handle"},
    MODE_CENTER = {name: "center"};

var X = {
  name: "x",
  handles: ["e", "w"].map(type),
  input: function(x, e) { return x && [[x[0], e[0][1]], [x[1], e[1][1]]]; },
  output: function(xy) { return xy && [xy[0][0], xy[1][0]]; }
};

var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y, e) { return y && [[e[0][0], y[0]], [e[1][0], y[1]]]; },
  output: function(xy) { return xy && [xy[0][1], xy[1][1]]; }
};

var XY = {
  name: "xy",
  handles: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(type),
  input: function(xy) { return xy; },
  output: function(xy) { return xy; }
};

var cursors = {
  overlay: "crosshair",
  selection: "move",
  n: "ns-resize",
  e: "ew-resize",
  s: "ns-resize",
  w: "ew-resize",
  nw: "nwse-resize",
  ne: "nesw-resize",
  se: "nwse-resize",
  sw: "nesw-resize"
};

var flipX = {
  e: "w",
  w: "e",
  nw: "ne",
  ne: "nw",
  se: "sw",
  sw: "se"
};

var flipY = {
  n: "s",
  s: "n",
  nw: "sw",
  ne: "se",
  se: "ne",
  sw: "nw"
};

var signsX = {
  overlay: +1,
  selection: +1,
  n: null,
  e: +1,
  s: null,
  w: -1,
  nw: -1,
  ne: +1,
  se: +1,
  sw: -1
};

var signsY = {
  overlay: +1,
  selection: +1,
  n: -1,
  e: null,
  s: +1,
  w: null,
  nw: -1,
  ne: -1,
  se: +1,
  sw: +1
};

function type(t) {
  return {type: t};
}

// Ignore right-click, since that should open the context menu.
function defaultFilter$1() {
  return !event.button;
}

function defaultExtent() {
  var svg = this.ownerSVGElement || this;
  return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
}

// Like d3.local, but with the name “__brush” rather than auto-generated.
function local$1(node) {
  while (!node.__brush) if (!(node = node.parentNode)) return;
  return node.__brush;
}

function empty$1(extent) {
  return extent[0][0] === extent[1][0]
      || extent[0][1] === extent[1][1];
}

function brushSelection(node) {
  var state = node.__brush;
  return state ? state.dim.output(state.selection) : null;
}

function brushX() {
  return brush$1(X);
}

function brushY() {
  return brush$1(Y);
}

function brush() {
  return brush$1(XY);
}

function brush$1(dim) {
  var extent = defaultExtent,
      filter = defaultFilter$1,
      listeners = dispatch(brush, "start", "brush", "end"),
      handleSize = 6,
      touchending;

  function brush(group) {
    var overlay = group
        .property("__brush", initialize)
      .selectAll(".overlay")
      .data([type("overlay")]);

    overlay.enter().append("rect")
        .attr("class", "overlay")
        .attr("pointer-events", "all")
        .attr("cursor", cursors.overlay)
      .merge(overlay)
        .each(function() {
          var extent = local$1(this).extent;
          select(this)
              .attr("x", extent[0][0])
              .attr("y", extent[0][1])
              .attr("width", extent[1][0] - extent[0][0])
              .attr("height", extent[1][1] - extent[0][1]);
        });

    group.selectAll(".selection")
      .data([type("selection")])
      .enter().append("rect")
        .attr("class", "selection")
        .attr("cursor", cursors.selection)
        .attr("fill", "#777")
        .attr("fill-opacity", 0.3)
        .attr("stroke", "#fff")
        .attr("shape-rendering", "crispEdges");

    var handle = group.selectAll(".handle")
      .data(dim.handles, function(d) { return d.type; });

    handle.exit().remove();

    handle.enter().append("rect")
        .attr("class", function(d) { return "handle handle--" + d.type; })
        .attr("cursor", function(d) { return cursors[d.type]; });

    group
        .each(redraw)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
        .on("mousedown.brush touchstart.brush", started);
  }

  brush.move = function(group, selection) {
    if (group.selection) {
      group
          .on("start.brush", function() { emitter(this, arguments).beforestart().start(); })
          .on("interrupt.brush end.brush", function() { emitter(this, arguments).end(); })
          .tween("brush", function() {
            var that = this,
                state = that.__brush,
                emit = emitter(that, arguments),
                selection0 = state.selection,
                selection1 = dim.input(typeof selection === "function" ? selection.apply(this, arguments) : selection, state.extent),
                i = interpolateValue(selection0, selection1);

            function tween(t) {
              state.selection = t === 1 && empty$1(selection1) ? null : i(t);
              redraw.call(that);
              emit.brush();
            }

            return selection0 && selection1 ? tween : tween(1);
          });
    } else {
      group
          .each(function() {
            var that = this,
                args = arguments,
                state = that.__brush,
                selection1 = dim.input(typeof selection === "function" ? selection.apply(that, args) : selection, state.extent),
                emit = emitter(that, args).beforestart();

            interrupt(that);
            state.selection = selection1 == null || empty$1(selection1) ? null : selection1;
            redraw.call(that);
            emit.start().brush().end();
          });
    }
  };

  function redraw() {
    var group = select(this),
        selection = local$1(this).selection;

    if (selection) {
      group.selectAll(".selection")
          .style("display", null)
          .attr("x", selection[0][0])
          .attr("y", selection[0][1])
          .attr("width", selection[1][0] - selection[0][0])
          .attr("height", selection[1][1] - selection[0][1]);

      group.selectAll(".handle")
          .style("display", null)
          .attr("x", function(d) { return d.type[d.type.length - 1] === "e" ? selection[1][0] - handleSize / 2 : selection[0][0] - handleSize / 2; })
          .attr("y", function(d) { return d.type[0] === "s" ? selection[1][1] - handleSize / 2 : selection[0][1] - handleSize / 2; })
          .attr("width", function(d) { return d.type === "n" || d.type === "s" ? selection[1][0] - selection[0][0] + handleSize : handleSize; })
          .attr("height", function(d) { return d.type === "e" || d.type === "w" ? selection[1][1] - selection[0][1] + handleSize : handleSize; });
    }

    else {
      group.selectAll(".selection,.handle")
          .style("display", "none")
          .attr("x", null)
          .attr("y", null)
          .attr("width", null)
          .attr("height", null);
    }
  }

  function emitter(that, args) {
    return that.__brush.emitter || new Emitter(that, args);
  }

  function Emitter(that, args) {
    this.that = that;
    this.args = args;
    this.state = that.__brush;
    this.active = 0;
  }

  Emitter.prototype = {
    beforestart: function() {
      if (++this.active === 1) this.state.emitter = this, this.starting = true;
      return this;
    },
    start: function() {
      if (this.starting) this.starting = false, this.emit("start");
      return this;
    },
    brush: function() {
      this.emit("brush");
      return this;
    },
    end: function() {
      if (--this.active === 0) delete this.state.emitter, this.emit("end");
      return this;
    },
    emit: function(type) {
      customEvent(new BrushEvent(brush, type, dim.output(this.state.selection)), listeners.apply, listeners, [type, this.that, this.args]);
    }
  };

  function started() {
    if (event.touches) { if (event.changedTouches.length < event.touches.length) return noevent$1(); }
    else if (touchending) return;
    if (!filter.apply(this, arguments)) return;

    var that = this,
        type = event.target.__data__.type,
        mode = (event.metaKey ? type = "overlay" : type) === "selection" ? MODE_DRAG : (event.altKey ? MODE_CENTER : MODE_HANDLE),
        signX = dim === Y ? null : signsX[type],
        signY = dim === X ? null : signsY[type],
        state = local$1(that),
        extent = state.extent,
        selection = state.selection,
        W = extent[0][0], w0, w1,
        N = extent[0][1], n0, n1,
        E = extent[1][0], e0, e1,
        S = extent[1][1], s0, s1,
        dx,
        dy,
        moving,
        shifting = signX && signY && event.shiftKey,
        lockX,
        lockY,
        point0 = mouse(that),
        point = point0,
        emit = emitter(that, arguments).beforestart();

    if (type === "overlay") {
      state.selection = selection = [
        [w0 = dim === Y ? W : point0[0], n0 = dim === X ? N : point0[1]],
        [e0 = dim === Y ? E : w0, s0 = dim === X ? S : n0]
      ];
    } else {
      w0 = selection[0][0];
      n0 = selection[0][1];
      e0 = selection[1][0];
      s0 = selection[1][1];
    }

    w1 = w0;
    n1 = n0;
    e1 = e0;
    s1 = s0;

    var group = select(that)
        .attr("pointer-events", "none");

    var overlay = group.selectAll(".overlay")
        .attr("cursor", cursors[type]);

    if (event.touches) {
      group
          .on("touchmove.brush", moved, true)
          .on("touchend.brush touchcancel.brush", ended, true);
    } else {
      var view = select(event.view)
          .on("keydown.brush", keydowned, true)
          .on("keyup.brush", keyupped, true)
          .on("mousemove.brush", moved, true)
          .on("mouseup.brush", ended, true);

      dragDisable(event.view);
    }

    nopropagation$1();
    interrupt(that);
    redraw.call(that);
    emit.start();

    function moved() {
      var point1 = mouse(that);
      if (shifting && !lockX && !lockY) {
        if (Math.abs(point1[0] - point[0]) > Math.abs(point1[1] - point[1])) lockY = true;
        else lockX = true;
      }
      point = point1;
      moving = true;
      noevent$1();
      move();
    }

    function move() {
      var t;

      dx = point[0] - point0[0];
      dy = point[1] - point0[1];

      switch (mode) {
        case MODE_SPACE:
        case MODE_DRAG: {
          if (signX) dx = Math.max(W - w0, Math.min(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
          if (signY) dy = Math.max(N - n0, Math.min(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy;
          break;
        }
        case MODE_HANDLE: {
          if (signX < 0) dx = Math.max(W - w0, Math.min(E - w0, dx)), w1 = w0 + dx, e1 = e0;
          else if (signX > 0) dx = Math.max(W - e0, Math.min(E - e0, dx)), w1 = w0, e1 = e0 + dx;
          if (signY < 0) dy = Math.max(N - n0, Math.min(S - n0, dy)), n1 = n0 + dy, s1 = s0;
          else if (signY > 0) dy = Math.max(N - s0, Math.min(S - s0, dy)), n1 = n0, s1 = s0 + dy;
          break;
        }
        case MODE_CENTER: {
          if (signX) w1 = Math.max(W, Math.min(E, w0 - dx * signX)), e1 = Math.max(W, Math.min(E, e0 + dx * signX));
          if (signY) n1 = Math.max(N, Math.min(S, n0 - dy * signY)), s1 = Math.max(N, Math.min(S, s0 + dy * signY));
          break;
        }
      }

      if (e1 < w1) {
        signX *= -1;
        t = w0, w0 = e0, e0 = t;
        t = w1, w1 = e1, e1 = t;
        if (type in flipX) overlay.attr("cursor", cursors[type = flipX[type]]);
      }

      if (s1 < n1) {
        signY *= -1;
        t = n0, n0 = s0, s0 = t;
        t = n1, n1 = s1, s1 = t;
        if (type in flipY) overlay.attr("cursor", cursors[type = flipY[type]]);
      }

      if (state.selection) selection = state.selection; // May be set by brush.move!
      if (lockX) w1 = selection[0][0], e1 = selection[1][0];
      if (lockY) n1 = selection[0][1], s1 = selection[1][1];

      if (selection[0][0] !== w1
          || selection[0][1] !== n1
          || selection[1][0] !== e1
          || selection[1][1] !== s1) {
        state.selection = [[w1, n1], [e1, s1]];
        redraw.call(that);
        emit.brush();
      }
    }

    function ended() {
      nopropagation$1();
      if (event.touches) {
        if (event.touches.length) return;
        if (touchending) clearTimeout(touchending);
        touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
        group.on("touchmove.brush touchend.brush touchcancel.brush", null);
      } else {
        yesdrag(event.view, moving);
        view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
      }
      group.attr("pointer-events", "all");
      overlay.attr("cursor", cursors.overlay);
      if (state.selection) selection = state.selection; // May be set by brush.move (on start)!
      if (empty$1(selection)) state.selection = null, redraw.call(that);
      emit.end();
    }

    function keydowned() {
      switch (event.keyCode) {
        case 16: { // SHIFT
          shifting = signX && signY;
          break;
        }
        case 18: { // ALT
          if (mode === MODE_HANDLE) {
            if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
            if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
            mode = MODE_CENTER;
            move();
          }
          break;
        }
        case 32: { // SPACE; takes priority over ALT
          if (mode === MODE_HANDLE || mode === MODE_CENTER) {
            if (signX < 0) e0 = e1 - dx; else if (signX > 0) w0 = w1 - dx;
            if (signY < 0) s0 = s1 - dy; else if (signY > 0) n0 = n1 - dy;
            mode = MODE_SPACE;
            overlay.attr("cursor", cursors.selection);
            move();
          }
          break;
        }
        default: return;
      }
      noevent$1();
    }

    function keyupped() {
      switch (event.keyCode) {
        case 16: { // SHIFT
          if (shifting) {
            lockX = lockY = shifting = false;
            move();
          }
          break;
        }
        case 18: { // ALT
          if (mode === MODE_CENTER) {
            if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
            if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
            mode = MODE_HANDLE;
            move();
          }
          break;
        }
        case 32: { // SPACE
          if (mode === MODE_SPACE) {
            if (event.altKey) {
              if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
              if (signY) s0 = s1 - dy * signY, n0 = n1 + dy * signY;
              mode = MODE_CENTER;
            } else {
              if (signX < 0) e0 = e1; else if (signX > 0) w0 = w1;
              if (signY < 0) s0 = s1; else if (signY > 0) n0 = n1;
              mode = MODE_HANDLE;
            }
            overlay.attr("cursor", cursors[type]);
            move();
          }
          break;
        }
        default: return;
      }
      noevent$1();
    }
  }

  function initialize() {
    var state = this.__brush || {selection: null};
    state.extent = extent.apply(this, arguments);
    state.dim = dim;
    return state;
  }

  brush.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant$4([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), brush) : extent;
  };

  brush.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$4(!!_), brush) : filter;
  };

  brush.handleSize = function(_) {
    return arguments.length ? (handleSize = +_, brush) : handleSize;
  };

  brush.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? brush : value;
  };

  return brush;
}

var cos = Math.cos;
var sin = Math.sin;
var pi$1 = Math.PI;
var halfPi$1 = pi$1 / 2;
var tau$1 = pi$1 * 2;
var max$1 = Math.max;

function compareValue(compare) {
  return function(a, b) {
    return compare(
      a.source.value + a.target.value,
      b.source.value + b.target.value
    );
  };
}

function chord() {
  var padAngle = 0,
      sortGroups = null,
      sortSubgroups = null,
      sortChords = null;

  function chord(matrix) {
    var n = matrix.length,
        groupSums = [],
        groupIndex = sequence(n),
        subgroupIndex = [],
        chords = [],
        groups = chords.groups = new Array(n),
        subgroups = new Array(n * n),
        k,
        x,
        x0,
        dx,
        i,
        j;

    // Compute the sum.
    k = 0, i = -1; while (++i < n) {
      x = 0, j = -1; while (++j < n) {
        x += matrix[i][j];
      }
      groupSums.push(x);
      subgroupIndex.push(sequence(n));
      k += x;
    }

    // Sort groups…
    if (sortGroups) groupIndex.sort(function(a, b) {
      return sortGroups(groupSums[a], groupSums[b]);
    });

    // Sort subgroups…
    if (sortSubgroups) subgroupIndex.forEach(function(d, i) {
      d.sort(function(a, b) {
        return sortSubgroups(matrix[i][a], matrix[i][b]);
      });
    });

    // Convert the sum to scaling factor for [0, 2pi].
    // TODO Allow start and end angle to be specified?
    // TODO Allow padding to be specified as percentage?
    k = max$1(0, tau$1 - padAngle * n) / k;
    dx = k ? padAngle : tau$1 / n;

    // Compute the start and end angle for each group and subgroup.
    // Note: Opera has a bug reordering object literal properties!
    x = 0, i = -1; while (++i < n) {
      x0 = x, j = -1; while (++j < n) {
        var di = groupIndex[i],
            dj = subgroupIndex[di][j],
            v = matrix[di][dj],
            a0 = x,
            a1 = x += v * k;
        subgroups[dj * n + di] = {
          index: di,
          subindex: dj,
          startAngle: a0,
          endAngle: a1,
          value: v
        };
      }
      groups[di] = {
        index: di,
        startAngle: x0,
        endAngle: x,
        value: groupSums[di]
      };
      x += dx;
    }

    // Generate chords for each (non-empty) subgroup-subgroup link.
    i = -1; while (++i < n) {
      j = i - 1; while (++j < n) {
        var source = subgroups[j * n + i],
            target = subgroups[i * n + j];
        if (source.value || target.value) {
          chords.push(source.value < target.value
              ? {source: target, target: source}
              : {source: source, target: target});
        }
      }
    }

    return sortChords ? chords.sort(sortChords) : chords;
  }

  chord.padAngle = function(_) {
    return arguments.length ? (padAngle = max$1(0, _), chord) : padAngle;
  };

  chord.sortGroups = function(_) {
    return arguments.length ? (sortGroups = _, chord) : sortGroups;
  };

  chord.sortSubgroups = function(_) {
    return arguments.length ? (sortSubgroups = _, chord) : sortSubgroups;
  };

  chord.sortChords = function(_) {
    return arguments.length ? (_ == null ? sortChords = null : (sortChords = compareValue(_))._ = _, chord) : sortChords && sortChords._;
  };

  return chord;
}

var slice$2 = Array.prototype.slice;

function constant$5(x) {
  return function() {
    return x;
  };
}

var pi$2 = Math.PI,
    tau$2 = 2 * pi$2,
    epsilon$1 = 1e-6,
    tauEpsilon = tau$2 - epsilon$1;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon$1));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi$2 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon$1) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon$1 || Math.abs(this._y1 - y0) > epsilon$1) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau$2 + tau$2;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon$1) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi$2)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

function defaultSource(d) {
  return d.source;
}

function defaultTarget(d) {
  return d.target;
}

function defaultRadius(d) {
  return d.radius;
}

function defaultStartAngle(d) {
  return d.startAngle;
}

function defaultEndAngle(d) {
  return d.endAngle;
}

function ribbon() {
  var source = defaultSource,
      target = defaultTarget,
      radius = defaultRadius,
      startAngle = defaultStartAngle,
      endAngle = defaultEndAngle,
      context = null;

  function ribbon() {
    var buffer,
        argv = slice$2.call(arguments),
        s = source.apply(this, argv),
        t = target.apply(this, argv),
        sr = +radius.apply(this, (argv[0] = s, argv)),
        sa0 = startAngle.apply(this, argv) - halfPi$1,
        sa1 = endAngle.apply(this, argv) - halfPi$1,
        sx0 = sr * cos(sa0),
        sy0 = sr * sin(sa0),
        tr = +radius.apply(this, (argv[0] = t, argv)),
        ta0 = startAngle.apply(this, argv) - halfPi$1,
        ta1 = endAngle.apply(this, argv) - halfPi$1;

    if (!context) context = buffer = path();

    context.moveTo(sx0, sy0);
    context.arc(0, 0, sr, sa0, sa1);
    if (sa0 !== ta0 || sa1 !== ta1) { // TODO sr !== tr?
      context.quadraticCurveTo(0, 0, tr * cos(ta0), tr * sin(ta0));
      context.arc(0, 0, tr, ta0, ta1);
    }
    context.quadraticCurveTo(0, 0, sx0, sy0);
    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  ribbon.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant$5(+_), ribbon) : radius;
  };

  ribbon.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$5(+_), ribbon) : startAngle;
  };

  ribbon.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$5(+_), ribbon) : endAngle;
  };

  ribbon.source = function(_) {
    return arguments.length ? (source = _, ribbon) : source;
  };

  ribbon.target = function(_) {
    return arguments.length ? (target = _, ribbon) : target;
  };

  ribbon.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), ribbon) : context;
  };

  return ribbon;
}

var prefix = "$";

function Map() {}

Map.prototype = map$1.prototype = {
  constructor: Map,
  has: function(key) {
    return (prefix + key) in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function(key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function() {
    for (var property in this) if (property[0] === prefix) delete this[property];
  },
  keys: function() {
    var keys = [];
    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function() {
    var values = [];
    for (var property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function() {
    var entries = [];
    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
    return entries;
  },
  size: function() {
    var size = 0;
    for (var property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function() {
    for (var property in this) if (property[0] === prefix) return false;
    return true;
  },
  each: function(f) {
    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
  }
};

function map$1(object, f) {
  var map = new Map;

  // Copy constructor.
  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
        n = object.length,
        o;

    if (f == null) while (++i < n) map.set(i, object[i]);
    else while (++i < n) map.set(f(o = object[i], i, object), o);
  }

  // Convert object to map.
  else if (object) for (var key in object) map.set(key, object[key]);

  return map;
}

function nest() {
  var keys = [],
      sortKeys = [],
      sortValues,
      rollup,
      nest;

  function apply(array, depth, createResult, setResult) {
    if (depth >= keys.length) {
      if (sortValues != null) array.sort(sortValues);
      return rollup != null ? rollup(array) : array;
    }

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        value,
        valuesByKey = map$1(),
        values,
        result = createResult();

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
        values.push(value);
      } else {
        valuesByKey.set(keyValue, [value]);
      }
    }

    valuesByKey.each(function(values, key) {
      setResult(result, key, apply(values, depth, createResult, setResult));
    });

    return result;
  }

  function entries(map, depth) {
    if (++depth > keys.length) return map;
    var array, sortKey = sortKeys[depth - 1];
    if (rollup != null && depth >= keys.length) array = map.entries();
    else array = [], map.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
  }

  return nest = {
    object: function(array) { return apply(array, 0, createObject, setObject); },
    map: function(array) { return apply(array, 0, createMap, setMap); },
    entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
    key: function(d) { keys.push(d); return nest; },
    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
    sortValues: function(order) { sortValues = order; return nest; },
    rollup: function(f) { rollup = f; return nest; }
  };
}

function createObject() {
  return {};
}

function setObject(object, key, value) {
  object[key] = value;
}

function createMap() {
  return map$1();
}

function setMap(map, key, value) {
  map.set(key, value);
}

function Set() {}

var proto = map$1.prototype;

Set.prototype = set$2.prototype = {
  constructor: Set,
  has: proto.has,
  add: function(value) {
    value += "";
    this[prefix + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};

function set$2(object, f) {
  var set = new Set;

  // Copy constructor.
  if (object instanceof Set) object.each(function(value) { set.add(value); });

  // Otherwise, assume it’s an array.
  else if (object) {
    var i = -1, n = object.length;
    if (f == null) while (++i < n) set.add(object[i]);
    else while (++i < n) set.add(f(object[i], i, object));
  }

  return set;
}

function keys(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
}

function values(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
}

function entries(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
}

var array$2 = Array.prototype;

var slice$3 = array$2.slice;

function ascending$2(a, b) {
  return a - b;
}

function area(ring) {
  var i = 0, n = ring.length, area = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];
  while (++i < n) area += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
  return area;
}

function constant$6(x) {
  return function() {
    return x;
  };
}

function contains(ring, hole) {
  var i = -1, n = hole.length, c;
  while (++i < n) if (c = ringContains(ring, hole[i])) return c;
  return 0;
}

function ringContains(ring, point) {
  var x = point[0], y = point[1], contains = -1;
  for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
    var pi = ring[i], xi = pi[0], yi = pi[1], pj = ring[j], xj = pj[0], yj = pj[1];
    if (segmentContains(pi, pj, point)) return 0;
    if (((yi > y) !== (yj > y)) && ((x < (xj - xi) * (y - yi) / (yj - yi) + xi))) contains = -contains;
  }
  return contains;
}

function segmentContains(a, b, c) {
  var i; return collinear(a, b, c) && within(a[i = +(a[0] === b[0])], c[i], b[i]);
}

function collinear(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) === (c[0] - a[0]) * (b[1] - a[1]);
}

function within(p, q, r) {
  return p <= q && q <= r || r <= q && q <= p;
}

function noop$1() {}

var cases = [
  [],
  [[[1.0, 1.5], [0.5, 1.0]]],
  [[[1.5, 1.0], [1.0, 1.5]]],
  [[[1.5, 1.0], [0.5, 1.0]]],
  [[[1.0, 0.5], [1.5, 1.0]]],
  [[[1.0, 1.5], [0.5, 1.0]], [[1.0, 0.5], [1.5, 1.0]]],
  [[[1.0, 0.5], [1.0, 1.5]]],
  [[[1.0, 0.5], [0.5, 1.0]]],
  [[[0.5, 1.0], [1.0, 0.5]]],
  [[[1.0, 1.5], [1.0, 0.5]]],
  [[[0.5, 1.0], [1.0, 0.5]], [[1.5, 1.0], [1.0, 1.5]]],
  [[[1.5, 1.0], [1.0, 0.5]]],
  [[[0.5, 1.0], [1.5, 1.0]]],
  [[[1.0, 1.5], [1.5, 1.0]]],
  [[[0.5, 1.0], [1.0, 1.5]]],
  []
];

function contours() {
  var dx = 1,
      dy = 1,
      threshold = thresholdSturges,
      smooth = smoothLinear;

  function contours(values) {
    var tz = threshold(values);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      var domain = extent(values), start = domain[0], stop = domain[1];
      tz = tickStep(start, stop, tz);
      tz = sequence(Math.floor(start / tz) * tz, Math.floor(stop / tz) * tz, tz);
    } else {
      tz = tz.slice().sort(ascending$2);
    }

    return tz.map(function(value) {
      return contour(values, value);
    });
  }

  // Accumulate, smooth contour rings, assign holes to exterior rings.
  // Based on https://github.com/mbostock/shapefile/blob/v0.6.2/shp/polygon.js
  function contour(values, value) {
    var polygons = [],
        holes = [];

    isorings(values, value, function(ring) {
      smooth(ring, values, value);
      if (area(ring) > 0) polygons.push([ring]);
      else holes.push(ring);
    });

    holes.forEach(function(hole) {
      for (var i = 0, n = polygons.length, polygon; i < n; ++i) {
        if (contains((polygon = polygons[i])[0], hole) !== -1) {
          polygon.push(hole);
          return;
        }
      }
    });

    return {
      type: "MultiPolygon",
      value: value,
      coordinates: polygons
    };
  }

  // Marching squares with isolines stitched into rings.
  // Based on https://github.com/topojson/topojson-client/blob/v3.0.0/src/stitch.js
  function isorings(values, value, callback) {
    var fragmentByStart = new Array,
        fragmentByEnd = new Array,
        x, y, t0, t1, t2, t3;

    // Special case for the first row (y = -1, t2 = t3 = 0).
    x = y = -1;
    t1 = values[0] >= value;
    cases[t1 << 1].forEach(stitch);
    while (++x < dx - 1) {
      t0 = t1, t1 = values[x + 1] >= value;
      cases[t0 | t1 << 1].forEach(stitch);
    }
    cases[t1 << 0].forEach(stitch);

    // General case for the intermediate rows.
    while (++y < dy - 1) {
      x = -1;
      t1 = values[y * dx + dx] >= value;
      t2 = values[y * dx] >= value;
      cases[t1 << 1 | t2 << 2].forEach(stitch);
      while (++x < dx - 1) {
        t0 = t1, t1 = values[y * dx + dx + x + 1] >= value;
        t3 = t2, t2 = values[y * dx + x + 1] >= value;
        cases[t0 | t1 << 1 | t2 << 2 | t3 << 3].forEach(stitch);
      }
      cases[t1 | t2 << 3].forEach(stitch);
    }

    // Special case for the last row (y = dy - 1, t0 = t1 = 0).
    x = -1;
    t2 = values[y * dx] >= value;
    cases[t2 << 2].forEach(stitch);
    while (++x < dx - 1) {
      t3 = t2, t2 = values[y * dx + x + 1] >= value;
      cases[t2 << 2 | t3 << 3].forEach(stitch);
    }
    cases[t2 << 3].forEach(stitch);

    function stitch(line) {
      var start = [line[0][0] + x, line[0][1] + y],
          end = [line[1][0] + x, line[1][1] + y],
          startIndex = index(start),
          endIndex = index(end),
          f, g;
      if (f = fragmentByEnd[startIndex]) {
        if (g = fragmentByStart[endIndex]) {
          delete fragmentByEnd[f.end];
          delete fragmentByStart[g.start];
          if (f === g) {
            f.ring.push(end);
            callback(f.ring);
          } else {
            fragmentByStart[f.start] = fragmentByEnd[g.end] = {start: f.start, end: g.end, ring: f.ring.concat(g.ring)};
          }
        } else {
          delete fragmentByEnd[f.end];
          f.ring.push(end);
          fragmentByEnd[f.end = endIndex] = f;
        }
      } else if (f = fragmentByStart[endIndex]) {
        if (g = fragmentByEnd[startIndex]) {
          delete fragmentByStart[f.start];
          delete fragmentByEnd[g.end];
          if (f === g) {
            f.ring.push(end);
            callback(f.ring);
          } else {
            fragmentByStart[g.start] = fragmentByEnd[f.end] = {start: g.start, end: f.end, ring: g.ring.concat(f.ring)};
          }
        } else {
          delete fragmentByStart[f.start];
          f.ring.unshift(start);
          fragmentByStart[f.start = startIndex] = f;
        }
      } else {
        fragmentByStart[startIndex] = fragmentByEnd[endIndex] = {start: startIndex, end: endIndex, ring: [start, end]};
      }
    }
  }

  function index(point) {
    return point[0] * 2 + point[1] * (dx + 1) * 4;
  }

  function smoothLinear(ring, values, value) {
    ring.forEach(function(point) {
      var x = point[0],
          y = point[1],
          xt = x | 0,
          yt = y | 0,
          v0,
          v1 = values[yt * dx + xt];
      if (x > 0 && x < dx && xt === x) {
        v0 = values[yt * dx + xt - 1];
        point[0] = x + (value - v0) / (v1 - v0) - 0.5;
      }
      if (y > 0 && y < dy && yt === y) {
        v0 = values[(yt - 1) * dx + xt];
        point[1] = y + (value - v0) / (v1 - v0) - 0.5;
      }
    });
  }

  contours.contour = contour;

  contours.size = function(_) {
    if (!arguments.length) return [dx, dy];
    var _0 = Math.ceil(_[0]), _1 = Math.ceil(_[1]);
    if (!(_0 > 0) || !(_1 > 0)) throw new Error("invalid size");
    return dx = _0, dy = _1, contours;
  };

  contours.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant$6(slice$3.call(_)) : constant$6(_), contours) : threshold;
  };

  contours.smooth = function(_) {
    return arguments.length ? (smooth = _ ? smoothLinear : noop$1, contours) : smooth === smoothLinear;
  };

  return contours;
}

// TODO Optimize edge cases.
// TODO Optimize index calculation.
// TODO Optimize arguments.
function blurX(source, target, r) {
  var n = source.width,
      m = source.height,
      w = (r << 1) + 1;
  for (var j = 0; j < m; ++j) {
    for (var i = 0, sr = 0; i < n + r; ++i) {
      if (i < n) {
        sr += source.data[i + j * n];
      }
      if (i >= r) {
        if (i >= w) {
          sr -= source.data[i - w + j * n];
        }
        target.data[i - r + j * n] = sr / Math.min(i + 1, n - 1 + w - i, w);
      }
    }
  }
}

// TODO Optimize edge cases.
// TODO Optimize index calculation.
// TODO Optimize arguments.
function blurY(source, target, r) {
  var n = source.width,
      m = source.height,
      w = (r << 1) + 1;
  for (var i = 0; i < n; ++i) {
    for (var j = 0, sr = 0; j < m + r; ++j) {
      if (j < m) {
        sr += source.data[i + j * n];
      }
      if (j >= r) {
        if (j >= w) {
          sr -= source.data[i + (j - w) * n];
        }
        target.data[i + (j - r) * n] = sr / Math.min(j + 1, m - 1 + w - j, w);
      }
    }
  }
}

function defaultX(d) {
  return d[0];
}

function defaultY(d) {
  return d[1];
}

function defaultWeight() {
  return 1;
}

function density() {
  var x = defaultX,
      y = defaultY,
      weight = defaultWeight,
      dx = 960,
      dy = 500,
      r = 20, // blur radius
      k = 2, // log2(grid cell size)
      o = r * 3, // grid offset, to pad for blur
      n = (dx + o * 2) >> k, // grid width
      m = (dy + o * 2) >> k, // grid height
      threshold = constant$6(20);

  function density(data) {
    var values0 = new Float32Array(n * m),
        values1 = new Float32Array(n * m);

    data.forEach(function(d, i, data) {
      var xi = (+x(d, i, data) + o) >> k,
          yi = (+y(d, i, data) + o) >> k,
          wi = +weight(d, i, data);
      if (xi >= 0 && xi < n && yi >= 0 && yi < m) {
        values0[xi + yi * n] += wi;
      }
    });

    // TODO Optimize.
    blurX({width: n, height: m, data: values0}, {width: n, height: m, data: values1}, r >> k);
    blurY({width: n, height: m, data: values1}, {width: n, height: m, data: values0}, r >> k);
    blurX({width: n, height: m, data: values0}, {width: n, height: m, data: values1}, r >> k);
    blurY({width: n, height: m, data: values1}, {width: n, height: m, data: values0}, r >> k);
    blurX({width: n, height: m, data: values0}, {width: n, height: m, data: values1}, r >> k);
    blurY({width: n, height: m, data: values1}, {width: n, height: m, data: values0}, r >> k);

    var tz = threshold(values0);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      var stop = max(values0);
      tz = tickStep(0, stop, tz);
      tz = sequence(0, Math.floor(stop / tz) * tz, tz);
      tz.shift();
    }

    return contours()
        .thresholds(tz)
        .size([n, m])
      (values0)
        .map(transform);
  }

  function transform(geometry) {
    geometry.value *= Math.pow(2, -2 * k); // Density in points per square pixel.
    geometry.coordinates.forEach(transformPolygon);
    return geometry;
  }

  function transformPolygon(coordinates) {
    coordinates.forEach(transformRing);
  }

  function transformRing(coordinates) {
    coordinates.forEach(transformPoint);
  }

  // TODO Optimize.
  function transformPoint(coordinates) {
    coordinates[0] = coordinates[0] * Math.pow(2, k) - o;
    coordinates[1] = coordinates[1] * Math.pow(2, k) - o;
  }

  function resize() {
    o = r * 3;
    n = (dx + o * 2) >> k;
    m = (dy + o * 2) >> k;
    return density;
  }

  density.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant$6(+_), density) : x;
  };

  density.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant$6(+_), density) : y;
  };

  density.weight = function(_) {
    return arguments.length ? (weight = typeof _ === "function" ? _ : constant$6(+_), density) : weight;
  };

  density.size = function(_) {
    if (!arguments.length) return [dx, dy];
    var _0 = Math.ceil(_[0]), _1 = Math.ceil(_[1]);
    if (!(_0 >= 0) && !(_0 >= 0)) throw new Error("invalid size");
    return dx = _0, dy = _1, resize();
  };

  density.cellSize = function(_) {
    if (!arguments.length) return 1 << k;
    if (!((_ = +_) >= 1)) throw new Error("invalid cell size");
    return k = Math.floor(Math.log(_) / Math.LN2), resize();
  };

  density.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant$6(slice$3.call(_)) : constant$6(_), density) : threshold;
  };

  density.bandwidth = function(_) {
    if (!arguments.length) return Math.sqrt(r * (r + 1));
    if (!((_ = +_) >= 0)) throw new Error("invalid bandwidth");
    return r = Math.round((Math.sqrt(4 * _ * _ + 1) - 1) / 2), resize();
  };

  return density;
}

var EOL = {},
    EOF = {},
    QUOTE = 34,
    NEWLINE = 10,
    RETURN = 13;

function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + "]";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];

  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });

  return columns;
}

function pad(value, width) {
  var s = value + "", length = s.length;
  return length < width ? new Array(width - length + 1).join(0) + s : s;
}

function formatYear(year) {
  return year < 0 ? "-" + pad(-year, 6)
    : year > 9999 ? "+" + pad(year, 6)
    : pad(year, 4);
}

function formatDate(date) {
  var hours = date.getUTCHours(),
      minutes = date.getUTCMinutes(),
      seconds = date.getUTCSeconds(),
      milliseconds = date.getUTCMilliseconds();
  return isNaN(date) ? "Invalid Date"
      : formatYear(date.getUTCFullYear()) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2)
      + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z"
      : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z"
      : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z"
      : "");
}

function dsvFormat(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      DELIMITER = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }

  function parseRows(text, f) {
    var rows = [], // output rows
        N = text.length,
        I = 0, // current character index
        n = 0, // current line number
        t, // current token
        eof = N <= 0, // current token followed by EOF?
        eol = false; // current token followed by EOL?

    // Strip the trailing newline.
    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;

    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL;

      // Unescape quotes.
      var i, j = I, c;
      if (text.charCodeAt(j) === QUOTE) {
        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
        if ((i = I) >= N) eof = true;
        else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        return text.slice(j + 1, i - 1).replace(/""/g, "\"");
      }

      // Find next delimiter or newline.
      while (I < N) {
        if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        else if (c !== DELIMITER) continue;
        return text.slice(j, i);
      }

      // Return last token before EOF.
      return eof = true, text.slice(j, N);
    }

    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF) row.push(t), t = token();
      if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
    }

    return rows;
  }

  function preformatBody(rows, columns) {
    return rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    });
  }

  function format(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
  }

  function formatBody(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return preformatBody(rows, columns).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(value) {
    return value == null ? ""
        : value instanceof Date ? formatDate(value)
        : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\""
        : value;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatBody: formatBody,
    formatRows: formatRows
  };
}

var csv = dsvFormat(",");

var csvParse = csv.parse;
var csvParseRows = csv.parseRows;
var csvFormat = csv.format;
var csvFormatBody = csv.formatBody;
var csvFormatRows = csv.formatRows;

var tsv = dsvFormat("\t");

var tsvParse = tsv.parse;
var tsvParseRows = tsv.parseRows;
var tsvFormat = tsv.format;
var tsvFormatBody = tsv.formatBody;
var tsvFormatRows = tsv.formatRows;

function autoType(object) {
  for (var key in object) {
    var value = object[key].trim(), number;
    if (!value) value = null;
    else if (value === "true") value = true;
    else if (value === "false") value = false;
    else if (value === "NaN") value = NaN;
    else if (!isNaN(number = +value)) value = number;
    else if (/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/.test(value)) value = new Date(value);
    else continue;
    object[key] = value;
  }
  return object;
}

function responseBlob(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.blob();
}

function blob(input, init) {
  return fetch(input, init).then(responseBlob);
}

function responseArrayBuffer(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.arrayBuffer();
}

function buffer(input, init) {
  return fetch(input, init).then(responseArrayBuffer);
}

function responseText(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.text();
}

function text(input, init) {
  return fetch(input, init).then(responseText);
}

function dsvParse(parse) {
  return function(input, init, row) {
    if (arguments.length === 2 && typeof init === "function") row = init, init = undefined;
    return text(input, init).then(function(response) {
      return parse(response, row);
    });
  };
}

function dsv(delimiter, input, init, row) {
  if (arguments.length === 3 && typeof init === "function") row = init, init = undefined;
  var format = dsvFormat(delimiter);
  return text(input, init).then(function(response) {
    return format.parse(response, row);
  });
}

var csv$1 = dsvParse(csvParse);
var tsv$1 = dsvParse(tsvParse);

function image(input, init) {
  return new Promise(function(resolve, reject) {
    var image = new Image;
    for (var key in init) image[key] = init[key];
    image.onerror = reject;
    image.onload = function() { resolve(image); };
    image.src = input;
  });
}

function responseJson(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.json();
}

function json(input, init) {
  return fetch(input, init).then(responseJson);
}

function parser(type) {
  return function(input, init)  {
    return text(input, init).then(function(text) {
      return (new DOMParser).parseFromString(text, type);
    });
  };
}

var xml = parser("application/xml");

var html = parser("text/html");

var svg = parser("image/svg+xml");

function center$1(x, y) {
  var nodes;

  if (x == null) x = 0;
  if (y == null) y = 0;

  function force() {
    var i,
        n = nodes.length,
        node,
        sx = 0,
        sy = 0;

    for (i = 0; i < n; ++i) {
      node = nodes[i], sx += node.x, sy += node.y;
    }

    for (sx = sx / n - x, sy = sy / n - y, i = 0; i < n; ++i) {
      node = nodes[i], node.x -= sx, node.y -= sy;
    }
  }

  force.initialize = function(_) {
    nodes = _;
  };

  force.x = function(_) {
    return arguments.length ? (x = +_, force) : x;
  };

  force.y = function(_) {
    return arguments.length ? (y = +_, force) : y;
  };

  return force;
}

function constant$7(x) {
  return function() {
    return x;
  };
}

function jiggle() {
  return (Math.random() - 0.5) * 1e-6;
}

function tree_add(d) {
  var x = +this._x.call(null, d),
      y = +this._y.call(null, d);
  return add(this.cover(x, y), x, y, d);
}

function add(tree, x, y, d) {
  if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

  var parent,
      node = tree._root,
      leaf = {data: d},
      x0 = tree._x0,
      y0 = tree._y0,
      x1 = tree._x1,
      y1 = tree._y1,
      xm,
      ym,
      xp,
      yp,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return tree._root = leaf, tree;

  // Find the existing leaf for the new point, or add it.
  while (node.length) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  }

  // Is the new point is exactly coincident with the existing point?
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

  // Otherwise, split the leaf node until the old and new point are separated.
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));
  return parent[j] = node, parent[i] = leaf, tree;
}

function addAll(data) {
  var d, i, n = data.length,
      x,
      y,
      xz = new Array(n),
      yz = new Array(n),
      x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;

  // Compute the points and their extent.
  for (i = 0; i < n; ++i) {
    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
    xz[i] = x;
    yz[i] = y;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  // If there were no (valid) points, abort.
  if (x0 > x1 || y0 > y1) return this;

  // Expand the tree to cover the new points.
  this.cover(x0, y0).cover(x1, y1);

  // Add the new points.
  for (i = 0; i < n; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }

  return this;
}

function tree_cover(x, y) {
  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

  var x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1;

  // If the quadtree has no extent, initialize them.
  // Integer extent are necessary so that if we later double the extent,
  // the existing quadrant boundaries don’t change due to floating point error!
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x)) + 1;
    y1 = (y0 = Math.floor(y)) + 1;
  }

  // Otherwise, double repeatedly to cover.
  else {
    var z = x1 - x0,
        node = this._root,
        parent,
        i;

    while (x0 > x || x >= x1 || y0 > y || y >= y1) {
      i = (y < y0) << 1 | (x < x0);
      parent = new Array(4), parent[i] = node, node = parent, z *= 2;
      switch (i) {
        case 0: x1 = x0 + z, y1 = y0 + z; break;
        case 1: x0 = x1 - z, y1 = y0 + z; break;
        case 2: x1 = x0 + z, y0 = y1 - z; break;
        case 3: x0 = x1 - z, y0 = y1 - z; break;
      }
    }

    if (this._root && this._root.length) this._root = node;
  }

  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}

function tree_data() {
  var data = [];
  this.visit(function(node) {
    if (!node.length) do data.push(node.data); while (node = node.next)
  });
  return data;
}

function tree_extent(_) {
  return arguments.length
      ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1])
      : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
}

function Quad(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}

function tree_find(x, y, radius) {
  var data,
      x0 = this._x0,
      y0 = this._y0,
      x1,
      y1,
      x2,
      y2,
      x3 = this._x1,
      y3 = this._y1,
      quads = [],
      node = this._root,
      q,
      i;

  if (node) quads.push(new Quad(node, x0, y0, x3, y3));
  if (radius == null) radius = Infinity;
  else {
    x0 = x - radius, y0 = y - radius;
    x3 = x + radius, y3 = y + radius;
    radius *= radius;
  }

  while (q = quads.pop()) {

    // Stop searching if this quadrant can’t contain a closer node.
    if (!(node = q.node)
        || (x1 = q.x0) > x3
        || (y1 = q.y0) > y3
        || (x2 = q.x1) < x0
        || (y2 = q.y1) < y0) continue;

    // Bisect the current quadrant.
    if (node.length) {
      var xm = (x1 + x2) / 2,
          ym = (y1 + y2) / 2;

      quads.push(
        new Quad(node[3], xm, ym, x2, y2),
        new Quad(node[2], x1, ym, xm, y2),
        new Quad(node[1], xm, y1, x2, ym),
        new Quad(node[0], x1, y1, xm, ym)
      );

      // Visit the closest quadrant first.
      if (i = (y >= ym) << 1 | (x >= xm)) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    }

    // Visit this point. (Visiting coincident points isn’t necessary!)
    else {
      var dx = x - +this._x.call(null, node.data),
          dy = y - +this._y.call(null, node.data),
          d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x - d, y0 = y - d;
        x3 = x + d, y3 = y + d;
        data = node.data;
      }
    }
  }

  return data;
}

function tree_remove(d) {
  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

  var parent,
      node = this._root,
      retainer,
      previous,
      next,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      x,
      y,
      xm,
      ym,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return this;

  // Find the leaf node for the point.
  // While descending, also retain the deepest parent with a non-removed sibling.
  if (node.length) while (true) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
    if (!node.length) break;
    if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
  }

  // Find the point to remove.
  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
  if (next = node.next) delete node.next;

  // If there are multiple coincident points, remove just the point.
  if (previous) return (next ? previous.next = next : delete previous.next), this;

  // If this is the root point, remove it.
  if (!parent) return this._root = next, this;

  // Remove this leaf.
  next ? parent[i] = next : delete parent[i];

  // If the parent now contains exactly one leaf, collapse superfluous parents.
  if ((node = parent[0] || parent[1] || parent[2] || parent[3])
      && node === (parent[3] || parent[2] || parent[1] || parent[0])
      && !node.length) {
    if (retainer) retainer[j] = node;
    else this._root = node;
  }

  return this;
}

function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
  return this;
}

function tree_root() {
  return this._root;
}

function tree_size() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length) do ++size; while (node = node.next)
  });
  return size;
}

function tree_visit(callback) {
  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node) quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
    }
  }
  return this;
}

function tree_visitAfter(callback) {
  var quads = [], next = [], q;
  if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node;
    if (node.length) {
      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
    }
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
}

function defaultX$1(d) {
  return d[0];
}

function tree_x(_) {
  return arguments.length ? (this._x = _, this) : this._x;
}

function defaultY$1(d) {
  return d[1];
}

function tree_y(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}

function quadtree(nodes, x, y) {
  var tree = new Quadtree(x == null ? defaultX$1 : x, y == null ? defaultY$1 : y, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}

function Quadtree(x, y, x0, y0, x1, y1) {
  this._x = x;
  this._y = y;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = undefined;
}

function leaf_copy(leaf) {
  var copy = {data: leaf.data}, next = copy;
  while (leaf = leaf.next) next = next.next = {data: leaf.data};
  return copy;
}

var treeProto = quadtree.prototype = Quadtree.prototype;

treeProto.copy = function() {
  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
      node = this._root,
      nodes,
      child;

  if (!node) return copy;

  if (!node.length) return copy._root = leaf_copy(node), copy;

  nodes = [{source: node, target: copy._root = new Array(4)}];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length) nodes.push({source: child, target: node.target[i] = new Array(4)});
        else node.target[i] = leaf_copy(child);
      }
    }
  }

  return copy;
};

treeProto.add = tree_add;
treeProto.addAll = addAll;
treeProto.cover = tree_cover;
treeProto.data = tree_data;
treeProto.extent = tree_extent;
treeProto.find = tree_find;
treeProto.remove = tree_remove;
treeProto.removeAll = removeAll;
treeProto.root = tree_root;
treeProto.size = tree_size;
treeProto.visit = tree_visit;
treeProto.visitAfter = tree_visitAfter;
treeProto.x = tree_x;
treeProto.y = tree_y;

function x(d) {
  return d.x + d.vx;
}

function y(d) {
  return d.y + d.vy;
}

function collide(radius) {
  var nodes,
      radii,
      strength = 1,
      iterations = 1;

  if (typeof radius !== "function") radius = constant$7(radius == null ? 1 : +radius);

  function force() {
    var i, n = nodes.length,
        tree,
        node,
        xi,
        yi,
        ri,
        ri2;

    for (var k = 0; k < iterations; ++k) {
      tree = quadtree(nodes, x, y).visitAfter(prepare);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        ri = radii[node.index], ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }

    function apply(quad, x0, y0, x1, y1) {
      var data = quad.data, rj = quad.r, r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          var x = xi - data.x - data.vx,
              y = yi - data.y - data.vy,
              l = x * x + y * y;
          if (l < r * r) {
            if (x === 0) x = jiggle(), l += x * x;
            if (y === 0) y = jiggle(), l += y * y;
            l = (r - (l = Math.sqrt(l))) / l * strength;
            node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
            node.vy += (y *= l) * r;
            data.vx -= x * (r = 1 - r);
            data.vy -= y * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    }
  }

  function prepare(quad) {
    if (quad.data) return quad.r = radii[quad.data.index];
    for (var i = quad.r = 0; i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    radii = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant$7(+_), initialize(), force) : radius;
  };

  return force;
}

function index(d) {
  return d.index;
}

function find(nodeById, nodeId) {
  var node = nodeById.get(nodeId);
  if (!node) throw new Error("missing: " + nodeId);
  return node;
}

function link(links) {
  var id = index,
      strength = defaultStrength,
      strengths,
      distance = constant$7(30),
      distances,
      nodes,
      count,
      bias,
      iterations = 1;

  if (links == null) links = [];

  function defaultStrength(link) {
    return 1 / Math.min(count[link.source.index], count[link.target.index]);
  }

  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations; ++k) {
      for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {
        link = links[i], source = link.source, target = link.target;
        x = target.x + target.vx - source.x - source.vx || jiggle();
        y = target.y + target.vy - source.y - source.vy || jiggle();
        l = Math.sqrt(x * x + y * y);
        l = (l - distances[i]) / l * alpha * strengths[i];
        x *= l, y *= l;
        target.vx -= x * (b = bias[i]);
        target.vy -= y * b;
        source.vx += x * (b = 1 - b);
        source.vy += y * b;
      }
    }
  }

  function initialize() {
    if (!nodes) return;

    var i,
        n = nodes.length,
        m = links.length,
        nodeById = map$1(nodes, id),
        link;

    for (i = 0, count = new Array(n); i < m; ++i) {
      link = links[i], link.index = i;
      if (typeof link.source !== "object") link.source = find(nodeById, link.source);
      if (typeof link.target !== "object") link.target = find(nodeById, link.target);
      count[link.source.index] = (count[link.source.index] || 0) + 1;
      count[link.target.index] = (count[link.target.index] || 0) + 1;
    }

    for (i = 0, bias = new Array(m); i < m; ++i) {
      link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
    }

    strengths = new Array(m), initializeStrength();
    distances = new Array(m), initializeDistance();
  }

  function initializeStrength() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      strengths[i] = +strength(links[i], i, links);
    }
  }

  function initializeDistance() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      distances[i] = +distance(links[i], i, links);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };

  force.id = function(_) {
    return arguments.length ? (id = _, force) : id;
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant$7(+_), initializeStrength(), force) : strength;
  };

  force.distance = function(_) {
    return arguments.length ? (distance = typeof _ === "function" ? _ : constant$7(+_), initializeDistance(), force) : distance;
  };

  return force;
}

function x$1(d) {
  return d.x;
}

function y$1(d) {
  return d.y;
}

var initialRadius = 10,
    initialAngle = Math.PI * (3 - Math.sqrt(5));

function simulation(nodes) {
  var simulation,
      alpha = 1,
      alphaMin = 0.001,
      alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
      alphaTarget = 0,
      velocityDecay = 0.6,
      forces = map$1(),
      stepper = timer(step),
      event = dispatch("tick", "end");

  if (nodes == null) nodes = [];

  function step() {
    tick();
    event.call("tick", simulation);
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation);
    }
  }

  function tick(iterations) {
    var i, n = nodes.length, node;

    if (iterations === undefined) iterations = 1;

    for (var k = 0; k < iterations; ++k) {
      alpha += (alphaTarget - alpha) * alphaDecay;

      forces.each(function (force) {
        force(alpha);
      });

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        if (node.fx == null) node.x += node.vx *= velocityDecay;
        else node.x = node.fx, node.vx = 0;
        if (node.fy == null) node.y += node.vy *= velocityDecay;
        else node.y = node.fy, node.vy = 0;
      }
    }

    return simulation;
  }

  function initializeNodes() {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.index = i;
      if (node.fx != null) node.x = node.fx;
      if (node.fy != null) node.y = node.fy;
      if (isNaN(node.x) || isNaN(node.y)) {
        var radius = initialRadius * Math.sqrt(i), angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }

  function initializeForce(force) {
    if (force.initialize) force.initialize(nodes);
    return force;
  }

  initializeNodes();

  return simulation = {
    tick: tick,

    restart: function() {
      return stepper.restart(step), simulation;
    },

    stop: function() {
      return stepper.stop(), simulation;
    },

    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.each(initializeForce), simulation) : nodes;
    },

    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation) : alpha;
    },

    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
    },

    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
    },

    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
    },

    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
    },

    force: function(name, _) {
      return arguments.length > 1 ? ((_ == null ? forces.remove(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);
    },

    find: function(x, y, radius) {
      var i = 0,
          n = nodes.length,
          dx,
          dy,
          d2,
          node,
          closest;

      if (radius == null) radius = Infinity;
      else radius *= radius;

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        dx = x - node.x;
        dy = y - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius) closest = node, radius = d2;
      }

      return closest;
    },

    on: function(name, _) {
      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
    }
  };
}

function manyBody() {
  var nodes,
      node,
      alpha,
      strength = constant$7(-30),
      strengths,
      distanceMin2 = 1,
      distanceMax2 = Infinity,
      theta2 = 0.81;

  function force(_) {
    var i, n = nodes.length, tree = quadtree(nodes, x$1, y$1).visitAfter(accumulate);
    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    strengths = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
  }

  function accumulate(quad) {
    var strength = 0, q, c, weight = 0, x, y, i;

    // For internal nodes, accumulate forces from child quadrants.
    if (quad.length) {
      for (x = y = i = 0; i < 4; ++i) {
        if ((q = quad[i]) && (c = Math.abs(q.value))) {
          strength += q.value, weight += c, x += c * q.x, y += c * q.y;
        }
      }
      quad.x = x / weight;
      quad.y = y / weight;
    }

    // For leaf nodes, accumulate forces from coincident quadrants.
    else {
      q = quad;
      q.x = q.data.x;
      q.y = q.data.y;
      do strength += strengths[q.data.index];
      while (q = q.next);
    }

    quad.value = strength;
  }

  function apply(quad, x1, _, x2) {
    if (!quad.value) return true;

    var x = quad.x - node.x,
        y = quad.y - node.y,
        w = x2 - x1,
        l = x * x + y * y;

    // Apply the Barnes-Hut approximation if possible.
    // Limit forces for very close nodes; randomize direction if coincident.
    if (w * w / theta2 < l) {
      if (l < distanceMax2) {
        if (x === 0) x = jiggle(), l += x * x;
        if (y === 0) y = jiggle(), l += y * y;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
        node.vx += x * quad.value * alpha / l;
        node.vy += y * quad.value * alpha / l;
      }
      return true;
    }

    // Otherwise, process points directly.
    else if (quad.length || l >= distanceMax2) return;

    // Limit forces for very close nodes; randomize direction if coincident.
    if (quad.data !== node || quad.next) {
      if (x === 0) x = jiggle(), l += x * x;
      if (y === 0) y = jiggle(), l += y * y;
      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
    }

    do if (quad.data !== node) {
      w = strengths[quad.data.index] * alpha / l;
      node.vx += x * w;
      node.vy += y * w;
    } while (quad = quad.next);
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant$7(+_), initialize(), force) : strength;
  };

  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };

  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };

  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };

  return force;
}

function radial(radius, x, y) {
  var nodes,
      strength = constant$7(0.1),
      strengths,
      radiuses;

  if (typeof radius !== "function") radius = constant$7(+radius);
  if (x == null) x = 0;
  if (y == null) y = 0;

  function force(alpha) {
    for (var i = 0, n = nodes.length; i < n; ++i) {
      var node = nodes[i],
          dx = node.x - x || 1e-6,
          dy = node.y - y || 1e-6,
          r = Math.sqrt(dx * dx + dy * dy),
          k = (radiuses[i] - r) * strengths[i] * alpha / r;
      node.vx += dx * k;
      node.vy += dy * k;
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    radiuses = new Array(n);
    for (i = 0; i < n; ++i) {
      radiuses[i] = +radius(nodes[i], i, nodes);
      strengths[i] = isNaN(radiuses[i]) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _, initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant$7(+_), initialize(), force) : strength;
  };

  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant$7(+_), initialize(), force) : radius;
  };

  force.x = function(_) {
    return arguments.length ? (x = +_, force) : x;
  };

  force.y = function(_) {
    return arguments.length ? (y = +_, force) : y;
  };

  return force;
}

function x$2(x) {
  var strength = constant$7(0.1),
      nodes,
      strengths,
      xz;

  if (typeof x !== "function") x = constant$7(x == null ? 0 : +x);

  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    xz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(xz[i] = +x(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant$7(+_), initialize(), force) : strength;
  };

  force.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant$7(+_), initialize(), force) : x;
  };

  return force;
}

function y$2(y) {
  var strength = constant$7(0.1),
      nodes,
      strengths,
      yz;

  if (typeof y !== "function") y = constant$7(y == null ? 0 : +y);

  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    yz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(yz[i] = +y(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant$7(+_), initialize(), force) : strength;
  };

  force.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant$7(+_), initialize(), force) : y;
  };

  return force;
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimal(1.23) returns ["123", 0].
function formatDecimal(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

function exponent$1(x) {
  return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  return new FormatSpecifier(specifier);
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  this.fill = match[1] || " ";
  this.align = match[2] || ">";
  this.sign = match[3] || "-";
  this.symbol = match[4] || "";
  this.zero = !!match[5];
  this.width = match[6] && +match[6];
  this.comma = !!match[7];
  this.precision = match[8] && +match[8].slice(1);
  this.trim = !!match[9];
  this.type = match[10] || "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width == null ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (i0 > 0) { if (!+s[i]) break out; i0 = 0; } break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent;

function formatPrefixAuto(x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded(x, p) {
  var d = formatDecimal(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

var formatTypes = {
  "%": function(x, p) { return (x * 100).toFixed(p); },
  "b": function(x) { return Math.round(x).toString(2); },
  "c": function(x) { return x + ""; },
  "d": function(x) { return Math.round(x).toString(10); },
  "e": function(x, p) { return x.toExponential(p); },
  "f": function(x, p) { return x.toFixed(p); },
  "g": function(x, p) { return x.toPrecision(p); },
  "o": function(x) { return Math.round(x).toString(8); },
  "p": function(x, p) { return formatRounded(x * 100, p); },
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
  "x": function(x) { return Math.round(x).toString(16); }
};

function identity$3(x) {
  return x;
}

var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

function formatLocale(locale) {
  var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity$3,
      currency = locale.currency,
      decimal = locale.decimal,
      numerals = locale.numerals ? formatNumerals(locale.numerals) : identity$3,
      percent = locale.percent || "%";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision == null && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision == null ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Perform the initial formatting.
        var valueNegative = value < 0;
        value = formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = formatTrim(value);

        // If a negative value rounds to zero during formatting, treat as positive.
        if (valueNegative && +value === 0) valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent$1(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

var locale;
var format;
var formatPrefix;

defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  locale = formatLocale(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

function precisionFixed(step) {
  return Math.max(0, -exponent$1(Math.abs(step)));
}

function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent$1(value) / 3))) * 3 - exponent$1(Math.abs(step)));
}

function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent$1(max) - exponent$1(step)) + 1;
}

// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/

function adder() {
  return new Adder;
}

function Adder() {
  this.reset();
}

Adder.prototype = {
  constructor: Adder,
  reset: function() {
    this.s = // rounded value
    this.t = 0; // exact error
  },
  add: function(y) {
    add$1(temp, y, this.t);
    add$1(this, temp.s, this.s);
    if (this.s) this.t += temp.t;
    else this.s = temp.t;
  },
  valueOf: function() {
    return this.s;
  }
};

var temp = new Adder;

function add$1(adder, a, b) {
  var x = adder.s = a + b,
      bv = x - a,
      av = x - bv;
  adder.t = (a - av) + (b - bv);
}

var epsilon$2 = 1e-6;
var epsilon2$1 = 1e-12;
var pi$3 = Math.PI;
var halfPi$2 = pi$3 / 2;
var quarterPi = pi$3 / 4;
var tau$3 = pi$3 * 2;

var degrees$1 = 180 / pi$3;
var radians = pi$3 / 180;

var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos$1 = Math.cos;
var ceil = Math.ceil;
var exp = Math.exp;
var log = Math.log;
var pow = Math.pow;
var sin$1 = Math.sin;
var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
var sqrt = Math.sqrt;
var tan = Math.tan;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi$3 : Math.acos(x);
}

function asin(x) {
  return x > 1 ? halfPi$2 : x < -1 ? -halfPi$2 : Math.asin(x);
}

function haversin(x) {
  return (x = sin$1(x / 2)) * x;
}

function noop$2() {}

function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}

var streamObjectType = {
  Feature: function(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};

var streamGeometryType = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
  },
  LineString: function(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamLine(coordinates[i], stream, 0);
  },
  Polygon: function(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamPolygon(coordinates[i], stream);
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry(geometries[i], stream);
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1, n = coordinates.length;
  stream.polygonStart();
  while (++i < n) streamLine(coordinates[i], stream, 1);
  stream.polygonEnd();
}

function geoStream(object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
}

var areaRingSum = adder();

var areaSum = adder(),
    lambda00,
    phi00,
    lambda0,
    cosPhi0,
    sinPhi0;

var areaStream = {
  point: noop$2,
  lineStart: noop$2,
  lineEnd: noop$2,
  polygonStart: function() {
    areaRingSum.reset();
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    var areaRing = +areaRingSum;
    areaSum.add(areaRing < 0 ? tau$3 + areaRing : areaRing);
    this.lineStart = this.lineEnd = this.point = noop$2;
  },
  sphere: function() {
    areaSum.add(tau$3);
  }
};

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaRingEnd() {
  areaPoint(lambda00, phi00);
}

function areaPointFirst(lambda, phi) {
  areaStream.point = areaPoint;
  lambda00 = lambda, phi00 = phi;
  lambda *= radians, phi *= radians;
  lambda0 = lambda, cosPhi0 = cos$1(phi = phi / 2 + quarterPi), sinPhi0 = sin$1(phi);
}

function areaPoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  phi = phi / 2 + quarterPi; // half the angular distance from south pole

  // Spherical excess E for a spherical triangle with vertices: south pole,
  // previous point, current point.  Uses a formula derived from Cagnoli’s
  // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
  var dLambda = lambda - lambda0,
      sdLambda = dLambda >= 0 ? 1 : -1,
      adLambda = sdLambda * dLambda,
      cosPhi = cos$1(phi),
      sinPhi = sin$1(phi),
      k = sinPhi0 * sinPhi,
      u = cosPhi0 * cosPhi + k * cos$1(adLambda),
      v = k * sdLambda * sin$1(adLambda);
  areaRingSum.add(atan2(v, u));

  // Advance the previous points.
  lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
}

function area$1(object) {
  areaSum.reset();
  geoStream(object, areaStream);
  return areaSum * 2;
}

function spherical(cartesian) {
  return [atan2(cartesian[1], cartesian[0]), asin(cartesian[2])];
}

function cartesian(spherical) {
  var lambda = spherical[0], phi = spherical[1], cosPhi = cos$1(phi);
  return [cosPhi * cos$1(lambda), cosPhi * sin$1(lambda), sin$1(phi)];
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// TODO return a
function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}

function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}

// TODO return d
function cartesianNormalizeInPlace(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

var lambda0$1, phi0, lambda1, phi1, // bounds
    lambda2, // previous lambda-coordinate
    lambda00$1, phi00$1, // first point
    p0, // previous 3D point
    deltaSum = adder(),
    ranges,
    range;

var boundsStream = {
  point: boundsPoint,
  lineStart: boundsLineStart,
  lineEnd: boundsLineEnd,
  polygonStart: function() {
    boundsStream.point = boundsRingPoint;
    boundsStream.lineStart = boundsRingStart;
    boundsStream.lineEnd = boundsRingEnd;
    deltaSum.reset();
    areaStream.polygonStart();
  },
  polygonEnd: function() {
    areaStream.polygonEnd();
    boundsStream.point = boundsPoint;
    boundsStream.lineStart = boundsLineStart;
    boundsStream.lineEnd = boundsLineEnd;
    if (areaRingSum < 0) lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);
    else if (deltaSum > epsilon$2) phi1 = 90;
    else if (deltaSum < -epsilon$2) phi0 = -90;
    range[0] = lambda0$1, range[1] = lambda1;
  },
  sphere: function() {
    lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);
  }
};

function boundsPoint(lambda, phi) {
  ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
}

function linePoint(lambda, phi) {
  var p = cartesian([lambda * radians, phi * radians]);
  if (p0) {
    var normal = cartesianCross(p0, p),
        equatorial = [normal[1], -normal[0], 0],
        inflection = cartesianCross(equatorial, normal);
    cartesianNormalizeInPlace(inflection);
    inflection = spherical(inflection);
    var delta = lambda - lambda2,
        sign = delta > 0 ? 1 : -1,
        lambdai = inflection[0] * degrees$1 * sign,
        phii,
        antimeridian = abs(delta) > 180;
    if (antimeridian ^ (sign * lambda2 < lambdai && lambdai < sign * lambda)) {
      phii = inflection[1] * degrees$1;
      if (phii > phi1) phi1 = phii;
    } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign * lambda2 < lambdai && lambdai < sign * lambda)) {
      phii = -inflection[1] * degrees$1;
      if (phii < phi0) phi0 = phii;
    } else {
      if (phi < phi0) phi0 = phi;
      if (phi > phi1) phi1 = phi;
    }
    if (antimeridian) {
      if (lambda < lambda2) {
        if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
      } else {
        if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
      }
    } else {
      if (lambda1 >= lambda0$1) {
        if (lambda < lambda0$1) lambda0$1 = lambda;
        if (lambda > lambda1) lambda1 = lambda;
      } else {
        if (lambda > lambda2) {
          if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
        } else {
          if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
        }
      }
    }
  } else {
    ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
  }
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
  p0 = p, lambda2 = lambda;
}

function boundsLineStart() {
  boundsStream.point = linePoint;
}

function boundsLineEnd() {
  range[0] = lambda0$1, range[1] = lambda1;
  boundsStream.point = boundsPoint;
  p0 = null;
}

function boundsRingPoint(lambda, phi) {
  if (p0) {
    var delta = lambda - lambda2;
    deltaSum.add(abs(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
  } else {
    lambda00$1 = lambda, phi00$1 = phi;
  }
  areaStream.point(lambda, phi);
  linePoint(lambda, phi);
}

function boundsRingStart() {
  areaStream.lineStart();
}

function boundsRingEnd() {
  boundsRingPoint(lambda00$1, phi00$1);
  areaStream.lineEnd();
  if (abs(deltaSum) > epsilon$2) lambda0$1 = -(lambda1 = 180);
  range[0] = lambda0$1, range[1] = lambda1;
  p0 = null;
}

// Finds the left-right distance between two longitudes.
// This is almost the same as (lambda1 - lambda0 + 360°) % 360°, except that we want
// the distance between ±180° to be 360°.
function angle(lambda0, lambda1) {
  return (lambda1 -= lambda0) < 0 ? lambda1 + 360 : lambda1;
}

function rangeCompare(a, b) {
  return a[0] - b[0];
}

function rangeContains(range, x) {
  return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
}

function bounds(feature) {
  var i, n, a, b, merged, deltaMax, delta;

  phi1 = lambda1 = -(lambda0$1 = phi0 = Infinity);
  ranges = [];
  geoStream(feature, boundsStream);

  // First, sort ranges by their minimum longitudes.
  if (n = ranges.length) {
    ranges.sort(rangeCompare);

    // Then, merge any ranges that overlap.
    for (i = 1, a = ranges[0], merged = [a]; i < n; ++i) {
      b = ranges[i];
      if (rangeContains(a, b[0]) || rangeContains(a, b[1])) {
        if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
        if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
      } else {
        merged.push(a = b);
      }
    }

    // Finally, find the largest gap between the merged ranges.
    // The final bounding box will be the inverse of this gap.
    for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) {
      b = merged[i];
      if ((delta = angle(a[1], b[0])) > deltaMax) deltaMax = delta, lambda0$1 = b[0], lambda1 = a[1];
    }
  }

  ranges = range = null;

  return lambda0$1 === Infinity || phi0 === Infinity
      ? [[NaN, NaN], [NaN, NaN]]
      : [[lambda0$1, phi0], [lambda1, phi1]];
}

var W0, W1,
    X0, Y0, Z0,
    X1, Y1, Z1,
    X2, Y2, Z2,
    lambda00$2, phi00$2, // first point
    x0, y0, z0; // previous point

var centroidStream = {
  sphere: noop$2,
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  }
};

// Arithmetic mean of Cartesian vectors.
function centroidPoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos$1(phi);
  centroidPointCartesian(cosPhi * cos$1(lambda), cosPhi * sin$1(lambda), sin$1(phi));
}

function centroidPointCartesian(x, y, z) {
  ++W0;
  X0 += (x - X0) / W0;
  Y0 += (y - Y0) / W0;
  Z0 += (z - Z0) / W0;
}

function centroidLineStart() {
  centroidStream.point = centroidLinePointFirst;
}

function centroidLinePointFirst(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos$1(phi);
  x0 = cosPhi * cos$1(lambda);
  y0 = cosPhi * sin$1(lambda);
  z0 = sin$1(phi);
  centroidStream.point = centroidLinePoint;
  centroidPointCartesian(x0, y0, z0);
}

function centroidLinePoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos$1(phi),
      x = cosPhi * cos$1(lambda),
      y = cosPhi * sin$1(lambda),
      z = sin$1(phi),
      w = atan2(sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
  W1 += w;
  X1 += w * (x0 + (x0 = x));
  Y1 += w * (y0 + (y0 = y));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}

// See J. E. Brock, The Inertia Tensor for a Spherical Triangle,
// J. Applied Mechanics 42, 239 (1975).
function centroidRingStart() {
  centroidStream.point = centroidRingPointFirst;
}

function centroidRingEnd() {
  centroidRingPoint(lambda00$2, phi00$2);
  centroidStream.point = centroidPoint;
}

function centroidRingPointFirst(lambda, phi) {
  lambda00$2 = lambda, phi00$2 = phi;
  lambda *= radians, phi *= radians;
  centroidStream.point = centroidRingPoint;
  var cosPhi = cos$1(phi);
  x0 = cosPhi * cos$1(lambda);
  y0 = cosPhi * sin$1(lambda);
  z0 = sin$1(phi);
  centroidPointCartesian(x0, y0, z0);
}

function centroidRingPoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos$1(phi),
      x = cosPhi * cos$1(lambda),
      y = cosPhi * sin$1(lambda),
      z = sin$1(phi),
      cx = y0 * z - z0 * y,
      cy = z0 * x - x0 * z,
      cz = x0 * y - y0 * x,
      m = sqrt(cx * cx + cy * cy + cz * cz),
      w = asin(m), // line weight = angle
      v = m && -w / m; // area weight multiplier
  X2 += v * cx;
  Y2 += v * cy;
  Z2 += v * cz;
  W1 += w;
  X1 += w * (x0 + (x0 = x));
  Y1 += w * (y0 + (y0 = y));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}

function centroid(object) {
  W0 = W1 =
  X0 = Y0 = Z0 =
  X1 = Y1 = Z1 =
  X2 = Y2 = Z2 = 0;
  geoStream(object, centroidStream);

  var x = X2,
      y = Y2,
      z = Z2,
      m = x * x + y * y + z * z;

  // If the area-weighted ccentroid is undefined, fall back to length-weighted ccentroid.
  if (m < epsilon2$1) {
    x = X1, y = Y1, z = Z1;
    // If the feature has zero length, fall back to arithmetic mean of point vectors.
    if (W1 < epsilon$2) x = X0, y = Y0, z = Z0;
    m = x * x + y * y + z * z;
    // If the feature still has an undefined ccentroid, then return.
    if (m < epsilon2$1) return [NaN, NaN];
  }

  return [atan2(y, x) * degrees$1, asin(z / sqrt(m)) * degrees$1];
}

function constant$8(x) {
  return function() {
    return x;
  };
}

function compose(a, b) {

  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function(x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };

  return compose;
}

function rotationIdentity(lambda, phi) {
  return [abs(lambda) > pi$3 ? lambda + Math.round(-lambda / tau$3) * tau$3 : lambda, phi];
}

rotationIdentity.invert = rotationIdentity;

function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau$3) ? (deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma))
    : rotationLambda(deltaLambda))
    : (deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma)
    : rotationIdentity);
}

function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
    return lambda += deltaLambda, [lambda > pi$3 ? lambda - tau$3 : lambda < -pi$3 ? lambda + tau$3 : lambda, phi];
  };
}

function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}

function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = cos$1(deltaPhi),
      sinDeltaPhi = sin$1(deltaPhi),
      cosDeltaGamma = cos$1(deltaGamma),
      sinDeltaGamma = sin$1(deltaGamma);

  function rotation(lambda, phi) {
    var cosPhi = cos$1(phi),
        x = cos$1(lambda) * cosPhi,
        y = sin$1(lambda) * cosPhi,
        z = sin$1(phi),
        k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [
      atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
      asin(k * cosDeltaGamma + y * sinDeltaGamma)
    ];
  }

  rotation.invert = function(lambda, phi) {
    var cosPhi = cos$1(phi),
        x = cos$1(lambda) * cosPhi,
        y = sin$1(lambda) * cosPhi,
        z = sin$1(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [
      atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
      asin(k * cosDeltaPhi - x * sinDeltaPhi)
    ];
  };

  return rotation;
}

function rotation(rotate) {
  rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees$1, coordinates[1] *= degrees$1, coordinates;
  }

  forward.invert = function(coordinates) {
    coordinates = rotate.invert(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees$1, coordinates[1] *= degrees$1, coordinates;
  };

  return forward;
}

// Generates a circle centered at [0°, 0°], with a given radius and precision.
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = cos$1(radius),
      sinRadius = sin$1(radius),
      step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * tau$3;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * tau$3;
  }
  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = spherical([cosRadius, -sinRadius * cos$1(t), -sinRadius * sin$1(t)]);
    stream.point(point[0], point[1]);
  }
}

// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
function circleRadius(cosRadius, point) {
  point = cartesian(point), point[0] -= cosRadius;
  cartesianNormalizeInPlace(point);
  var radius = acos(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + tau$3 - epsilon$2) % tau$3;
}

function circle() {
  var center = constant$8([0, 0]),
      radius = constant$8(90),
      precision = constant$8(6),
      ring,
      rotate,
      stream = {point: point};

  function point(x, y) {
    ring.push(x = rotate(x, y));
    x[0] *= degrees$1, x[1] *= degrees$1;
  }

  function circle() {
    var c = center.apply(this, arguments),
        r = radius.apply(this, arguments) * radians,
        p = precision.apply(this, arguments) * radians;
    ring = [];
    rotate = rotateRadians(-c[0] * radians, -c[1] * radians, 0).invert;
    circleStream(stream, r, p, 1);
    c = {type: "Polygon", coordinates: [ring]};
    ring = rotate = null;
    return c;
  }

  circle.center = function(_) {
    return arguments.length ? (center = typeof _ === "function" ? _ : constant$8([+_[0], +_[1]]), circle) : center;
  };

  circle.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant$8(+_), circle) : radius;
  };

  circle.precision = function(_) {
    return arguments.length ? (precision = typeof _ === "function" ? _ : constant$8(+_), circle) : precision;
  };

  return circle;
}

function clipBuffer() {
  var lines = [],
      line;
  return {
    point: function(x, y) {
      line.push([x, y]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop$2,
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}

function pointEqual(a, b) {
  return abs(a[0] - b[0]) < epsilon$2 && abs(a[1] - b[1]) < epsilon$2;
}

function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}

// A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.
function clipRejoin(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;

  segments.forEach(function(segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n, p0 = segment[0], p1 = segment[n], x;

    // If the first and last points of a segment are coincident, then treat as a
    // closed ring. TODO if all rings are closed, then the winding order of the
    // exterior ring should be checked.
    if (pointEqual(p0, p1)) {
      stream.lineStart();
      for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
      stream.lineEnd();
      return;
    }

    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });

  if (!subject.length) return;

  clip.sort(compareIntersection);
  link$1(subject);
  link$1(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;
    while (current.v) if ((current = current.n) === start) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
}

function link$1(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;
  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}

var sum$1 = adder();

function longitude(point) {
  if (abs(point[0]) <= pi$3)
    return point[0];
  else
    return sign(point[0]) * ((abs(point[0]) + pi$3) % tau$3 - pi$3);
}

function polygonContains(polygon, point) {
  var lambda = longitude(point),
      phi = point[1],
      sinPhi = sin$1(phi),
      normal = [sin$1(lambda), -cos$1(lambda), 0],
      angle = 0,
      winding = 0;

  sum$1.reset();

  if (sinPhi === 1) phi = halfPi$2 + epsilon$2;
  else if (sinPhi === -1) phi = -halfPi$2 - epsilon$2;

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = longitude(point0),
        phi0 = point0[1] / 2 + quarterPi,
        sinPhi0 = sin$1(phi0),
        cosPhi0 = cos$1(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = longitude(point1),
          phi1 = point1[1] / 2 + quarterPi,
          sinPhi1 = sin$1(phi1),
          cosPhi1 = cos$1(phi1),
          delta = lambda1 - lambda0,
          sign = delta >= 0 ? 1 : -1,
          absDelta = sign * delta,
          antimeridian = absDelta > pi$3,
          k = sinPhi0 * sinPhi1;

      sum$1.add(atan2(k * sign * sin$1(absDelta), cosPhi0 * cosPhi1 + k * cos$1(absDelta)));
      angle += antimeridian ? delta + sign * tau$3 : delta;

      // Are the longitudes either side of the point’s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = cartesianCross(cartesian(point0), cartesian(point1));
        cartesianNormalizeInPlace(arc);
        var intersection = cartesianCross(normal, arc);
        cartesianNormalizeInPlace(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (angle < -epsilon$2 || angle < epsilon$2 && sum$1 < -epsilon$2) ^ (winding & 1);
}

function clip(pointVisible, clipLine, interpolate, start) {
  return function(sink) {
    var line = clipLine(sink),
        ringBuffer = clipBuffer(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = merge(segments);
        var startInside = polygonContains(polygon, start);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          clipRejoin(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      if (pointVisible(lambda, phi)) sink.point(lambda, phi);
    }

    function pointLine(lambda, phi) {
      line.point(lambda, phi);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      ringSink.point(lambda, phi);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();

      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i, n = ringSegments.length, m,
          segment,
          point;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) return;

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
}

function validSegment(segment) {
  return segment.length > 1;
}

// Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi$2 - epsilon$2 : halfPi$2 - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - halfPi$2 - epsilon$2 : halfPi$2 - b[1]);
}

var clipAntimeridian = clip(
  function() { return true; },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-pi$3, -halfPi$2]
);

// Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.
function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      clean; // no intersections

  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? pi$3 : -pi$3,
          delta = abs(lambda1 - lambda0);
      if (abs(delta - pi$3) < epsilon$2) { // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi$2 : -halfPi$2);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= pi$3) { // line crosses antimeridian
        if (abs(lambda0 - sign0) < epsilon$2) lambda0 -= sign0 * epsilon$2; // handle degeneracies
        if (abs(lambda1 - sign1) < epsilon$2) lambda1 -= sign1 * epsilon$2;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = sin$1(lambda0 - lambda1);
  return abs(sinLambda0Lambda1) > epsilon$2
      ? atan((sin$1(phi0) * (cosPhi1 = cos$1(phi1)) * sin$1(lambda1)
          - sin$1(phi1) * (cosPhi0 = cos$1(phi0)) * sin$1(lambda0))
          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
      : (phi0 + phi1) / 2;
}

function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * halfPi$2;
    stream.point(-pi$3, phi);
    stream.point(0, phi);
    stream.point(pi$3, phi);
    stream.point(pi$3, 0);
    stream.point(pi$3, -phi);
    stream.point(0, -phi);
    stream.point(-pi$3, -phi);
    stream.point(-pi$3, 0);
    stream.point(-pi$3, phi);
  } else if (abs(from[0] - to[0]) > epsilon$2) {
    var lambda = from[0] < to[0] ? pi$3 : -pi$3;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}

function clipCircle(radius) {
  var cr = cos$1(radius),
      delta = 6 * radians,
      smallRadius = cr > 0,
      notHemisphere = abs(cr) > epsilon$2; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    circleStream(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return cos$1(lambda) * cos$1(phi) > cr;
  }

  // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.
  function clipLine(stream) {
    var point0, // previous point
        c0, // code for previous point
        v0, // visibility of previous point
        v00, // visibility of first point
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius
              ? v ? 0 : code(lambda, phi)
              : v ? code(lambda + (lambda < 0 ? pi$3 : -pi$3), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        // Handle degeneracies.
        // TODO ignore if not clipping polygons.
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || pointEqual(point0, point2) || pointEqual(point1, point2)) {
            point1[0] += epsilon$2;
            point1[1] += epsilon$2;
            v = visible(point1[0], point1[1]);
          }
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            // outside going in
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1]);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
            }
          }
        }
        if (v && (!point0 || !pointEqual(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | ((v00 && v0) << 1);
      }
    };
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b, two) {
    var pa = cartesian(a),
        pb = cartesian(b);

    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
    var n1 = [1, 0, 0], // normal
        n2 = cartesianCross(pa, pb),
        n2n2 = cartesianDot(n2, n2),
        n1n2 = n2[0], // cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;

    // Two polar points.
    if (!determinant) return !two && a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = cartesianCross(n1, n2),
        A = cartesianScale(n1, c1),
        B = cartesianScale(n2, c2);
    cartesianAddInPlace(A, B);

    // Solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = cartesianDot(A, u),
        uu = cartesianDot(u, u),
        t2 = w * w - uu * (cartesianDot(A, A) - 1);

    if (t2 < 0) return;

    var t = sqrt(t2),
        q = cartesianScale(u, (-w - t) / uu);
    cartesianAddInPlace(q, A);
    q = spherical(q);

    if (!two) return q;

    // Two intersection points.
    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;

    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

    var delta = lambda1 - lambda0,
        polar = abs(delta - pi$3) < epsilon$2,
        meridian = polar || delta < epsilon$2;

    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;

    // Check that the first point is between a and b.
    if (meridian
        ? polar
          ? phi0 + phi1 > 0 ^ q[1] < (abs(q[0] - lambda0) < epsilon$2 ? phi0 : phi1)
          : phi0 <= q[1] && q[1] <= phi1
        : delta > pi$3 ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = cartesianScale(u, (-w + t) / uu);
      cartesianAddInPlace(q1, A);
      return [q, spherical(q1)];
    }
  }

  // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.
  function code(lambda, phi) {
    var r = smallRadius ? radius : pi$3 - radius,
        code = 0;
    if (lambda < -r) code |= 1; // left
    else if (lambda > r) code |= 2; // right
    if (phi < -r) code |= 4; // below
    else if (phi > r) code |= 8; // above
    return code;
  }

  return clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi$3, radius - pi$3]);
}

function clipLine(a, b, x0, y0, x1, y1) {
  var ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
  return true;
}

var clipMax = 1e9, clipMin = -clipMax;

// TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipRectangle(x0, y0, x1, y1) {

  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null
        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
        || comparePoint(from, to) < 0 ^ direction > 0) {
      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return abs(p[0] - x0) < epsilon$2 ? direction > 0 ? 0 : 3
        : abs(p[0] - x1) < epsilon$2 ? direction > 0 ? 2 : 1
        : abs(p[1] - y0) < epsilon$2 ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  return function(stream) {
    var activeStream = stream,
        bufferStream = clipBuffer(),
        segments,
        polygon,
        ring,
        x__, y__, v__, // first point
        x_, y_, v_, // previous point
        first,
        clean;

    var clipStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: polygonStart,
      polygonEnd: polygonEnd
    };

    function point(x, y) {
      if (visible(x, y)) activeStream.point(x, y);
    }

    function polygonInside() {
      var winding = 0;

      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding; }
          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding; }
        }
      }

      return winding;
    }

    // Buffer geometry within a polygon and then clip it en masse.
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }

    function polygonEnd() {
      var startInside = polygonInside(),
          cleanInside = clean && startInside,
          visible = (segments = merge(segments)).length;
      if (cleanInside || visible) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible) {
          clipRejoin(segments, compareIntersection, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }

    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }

    // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.
    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) ring.push([x, y]);
      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) activeStream.point(x, y);
        else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
          if (clipLine(a, b, x0, y0, x1, y1)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }

    return clipStream;
  };
}

function extent$1() {
  var x0 = 0,
      y0 = 0,
      x1 = 960,
      y1 = 500,
      cache,
      cacheStream,
      clip;

  return clip = {
    stream: function(stream) {
      return cache && cacheStream === stream ? cache : cache = clipRectangle(x0, y0, x1, y1)(cacheStream = stream);
    },
    extent: function(_) {
      return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], cache = cacheStream = null, clip) : [[x0, y0], [x1, y1]];
    }
  };
}

var lengthSum = adder(),
    lambda0$2,
    sinPhi0$1,
    cosPhi0$1;

var lengthStream = {
  sphere: noop$2,
  point: noop$2,
  lineStart: lengthLineStart,
  lineEnd: noop$2,
  polygonStart: noop$2,
  polygonEnd: noop$2
};

function lengthLineStart() {
  lengthStream.point = lengthPointFirst;
  lengthStream.lineEnd = lengthLineEnd;
}

function lengthLineEnd() {
  lengthStream.point = lengthStream.lineEnd = noop$2;
}

function lengthPointFirst(lambda, phi) {
  lambda *= radians, phi *= radians;
  lambda0$2 = lambda, sinPhi0$1 = sin$1(phi), cosPhi0$1 = cos$1(phi);
  lengthStream.point = lengthPoint;
}

function lengthPoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  var sinPhi = sin$1(phi),
      cosPhi = cos$1(phi),
      delta = abs(lambda - lambda0$2),
      cosDelta = cos$1(delta),
      sinDelta = sin$1(delta),
      x = cosPhi * sinDelta,
      y = cosPhi0$1 * sinPhi - sinPhi0$1 * cosPhi * cosDelta,
      z = sinPhi0$1 * sinPhi + cosPhi0$1 * cosPhi * cosDelta;
  lengthSum.add(atan2(sqrt(x * x + y * y), z));
  lambda0$2 = lambda, sinPhi0$1 = sinPhi, cosPhi0$1 = cosPhi;
}

function length$1(object) {
  lengthSum.reset();
  geoStream(object, lengthStream);
  return +lengthSum;
}

var coordinates = [null, null],
    object$1 = {type: "LineString", coordinates: coordinates};

function distance(a, b) {
  coordinates[0] = a;
  coordinates[1] = b;
  return length$1(object$1);
}

var containsObjectType = {
  Feature: function(object, point) {
    return containsGeometry(object.geometry, point);
  },
  FeatureCollection: function(object, point) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) if (containsGeometry(features[i].geometry, point)) return true;
    return false;
  }
};

var containsGeometryType = {
  Sphere: function() {
    return true;
  },
  Point: function(object, point) {
    return containsPoint(object.coordinates, point);
  },
  MultiPoint: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsPoint(coordinates[i], point)) return true;
    return false;
  },
  LineString: function(object, point) {
    return containsLine(object.coordinates, point);
  },
  MultiLineString: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsLine(coordinates[i], point)) return true;
    return false;
  },
  Polygon: function(object, point) {
    return containsPolygon(object.coordinates, point);
  },
  MultiPolygon: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsPolygon(coordinates[i], point)) return true;
    return false;
  },
  GeometryCollection: function(object, point) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) if (containsGeometry(geometries[i], point)) return true;
    return false;
  }
};

function containsGeometry(geometry, point) {
  return geometry && containsGeometryType.hasOwnProperty(geometry.type)
      ? containsGeometryType[geometry.type](geometry, point)
      : false;
}

function containsPoint(coordinates, point) {
  return distance(coordinates, point) === 0;
}

function containsLine(coordinates, point) {
  var ao, bo, ab;
  for (var i = 0, n = coordinates.length; i < n; i++) {
    bo = distance(coordinates[i], point);
    if (bo === 0) return true;
    if (i > 0) {
      ab = distance(coordinates[i], coordinates[i - 1]);
      if (
        ab > 0 &&
        ao <= ab &&
        bo <= ab &&
        (ao + bo - ab) * (1 - Math.pow((ao - bo) / ab, 2)) < epsilon2$1 * ab
      )
        return true;
    }
    ao = bo;
  }
  return false;
}

function containsPolygon(coordinates, point) {
  return !!polygonContains(coordinates.map(ringRadians), pointRadians(point));
}

function ringRadians(ring) {
  return ring = ring.map(pointRadians), ring.pop(), ring;
}

function pointRadians(point) {
  return [point[0] * radians, point[1] * radians];
}

function contains$1(object, point) {
  return (object && containsObjectType.hasOwnProperty(object.type)
      ? containsObjectType[object.type]
      : containsGeometry)(object, point);
}

function graticuleX(y0, y1, dy) {
  var y = sequence(y0, y1 - epsilon$2, dy).concat(y1);
  return function(x) { return y.map(function(y) { return [x, y]; }); };
}

function graticuleY(x0, x1, dx) {
  var x = sequence(x0, x1 - epsilon$2, dx).concat(x1);
  return function(y) { return x.map(function(x) { return [x, y]; }); };
}

function graticule() {
  var x1, x0, X1, X0,
      y1, y0, Y1, Y0,
      dx = 10, dy = dx, DX = 90, DY = 360,
      x, y, X, Y,
      precision = 2.5;

  function graticule() {
    return {type: "MultiLineString", coordinates: lines()};
  }

  function lines() {
    return sequence(ceil(X0 / DX) * DX, X1, DX).map(X)
        .concat(sequence(ceil(Y0 / DY) * DY, Y1, DY).map(Y))
        .concat(sequence(ceil(x0 / dx) * dx, x1, dx).filter(function(x) { return abs(x % DX) > epsilon$2; }).map(x))
        .concat(sequence(ceil(y0 / dy) * dy, y1, dy).filter(function(y) { return abs(y % DY) > epsilon$2; }).map(y));
  }

  graticule.lines = function() {
    return lines().map(function(coordinates) { return {type: "LineString", coordinates: coordinates}; });
  };

  graticule.outline = function() {
    return {
      type: "Polygon",
      coordinates: [
        X(X0).concat(
        Y(Y1).slice(1),
        X(X1).reverse().slice(1),
        Y(Y0).reverse().slice(1))
      ]
    };
  };

  graticule.extent = function(_) {
    if (!arguments.length) return graticule.extentMinor();
    return graticule.extentMajor(_).extentMinor(_);
  };

  graticule.extentMajor = function(_) {
    if (!arguments.length) return [[X0, Y0], [X1, Y1]];
    X0 = +_[0][0], X1 = +_[1][0];
    Y0 = +_[0][1], Y1 = +_[1][1];
    if (X0 > X1) _ = X0, X0 = X1, X1 = _;
    if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
    return graticule.precision(precision);
  };

  graticule.extentMinor = function(_) {
    if (!arguments.length) return [[x0, y0], [x1, y1]];
    x0 = +_[0][0], x1 = +_[1][0];
    y0 = +_[0][1], y1 = +_[1][1];
    if (x0 > x1) _ = x0, x0 = x1, x1 = _;
    if (y0 > y1) _ = y0, y0 = y1, y1 = _;
    return graticule.precision(precision);
  };

  graticule.step = function(_) {
    if (!arguments.length) return graticule.stepMinor();
    return graticule.stepMajor(_).stepMinor(_);
  };

  graticule.stepMajor = function(_) {
    if (!arguments.length) return [DX, DY];
    DX = +_[0], DY = +_[1];
    return graticule;
  };

  graticule.stepMinor = function(_) {
    if (!arguments.length) return [dx, dy];
    dx = +_[0], dy = +_[1];
    return graticule;
  };

  graticule.precision = function(_) {
    if (!arguments.length) return precision;
    precision = +_;
    x = graticuleX(y0, y1, 90);
    y = graticuleY(x0, x1, precision);
    X = graticuleX(Y0, Y1, 90);
    Y = graticuleY(X0, X1, precision);
    return graticule;
  };

  return graticule
      .extentMajor([[-180, -90 + epsilon$2], [180, 90 - epsilon$2]])
      .extentMinor([[-180, -80 - epsilon$2], [180, 80 + epsilon$2]]);
}

function graticule10() {
  return graticule()();
}

function interpolate$1(a, b) {
  var x0 = a[0] * radians,
      y0 = a[1] * radians,
      x1 = b[0] * radians,
      y1 = b[1] * radians,
      cy0 = cos$1(y0),
      sy0 = sin$1(y0),
      cy1 = cos$1(y1),
      sy1 = sin$1(y1),
      kx0 = cy0 * cos$1(x0),
      ky0 = cy0 * sin$1(x0),
      kx1 = cy1 * cos$1(x1),
      ky1 = cy1 * sin$1(x1),
      d = 2 * asin(sqrt(haversin(y1 - y0) + cy0 * cy1 * haversin(x1 - x0))),
      k = sin$1(d);

  var interpolate = d ? function(t) {
    var B = sin$1(t *= d) / k,
        A = sin$1(d - t) / k,
        x = A * kx0 + B * kx1,
        y = A * ky0 + B * ky1,
        z = A * sy0 + B * sy1;
    return [
      atan2(y, x) * degrees$1,
      atan2(z, sqrt(x * x + y * y)) * degrees$1
    ];
  } : function() {
    return [x0 * degrees$1, y0 * degrees$1];
  };

  interpolate.distance = d;

  return interpolate;
}

function identity$4(x) {
  return x;
}

var areaSum$1 = adder(),
    areaRingSum$1 = adder(),
    x00,
    y00,
    x0$1,
    y0$1;

var areaStream$1 = {
  point: noop$2,
  lineStart: noop$2,
  lineEnd: noop$2,
  polygonStart: function() {
    areaStream$1.lineStart = areaRingStart$1;
    areaStream$1.lineEnd = areaRingEnd$1;
  },
  polygonEnd: function() {
    areaStream$1.lineStart = areaStream$1.lineEnd = areaStream$1.point = noop$2;
    areaSum$1.add(abs(areaRingSum$1));
    areaRingSum$1.reset();
  },
  result: function() {
    var area = areaSum$1 / 2;
    areaSum$1.reset();
    return area;
  }
};

function areaRingStart$1() {
  areaStream$1.point = areaPointFirst$1;
}

function areaPointFirst$1(x, y) {
  areaStream$1.point = areaPoint$1;
  x00 = x0$1 = x, y00 = y0$1 = y;
}

function areaPoint$1(x, y) {
  areaRingSum$1.add(y0$1 * x - x0$1 * y);
  x0$1 = x, y0$1 = y;
}

function areaRingEnd$1() {
  areaPoint$1(x00, y00);
}

var x0$2 = Infinity,
    y0$2 = x0$2,
    x1 = -x0$2,
    y1 = x1;

var boundsStream$1 = {
  point: boundsPoint$1,
  lineStart: noop$2,
  lineEnd: noop$2,
  polygonStart: noop$2,
  polygonEnd: noop$2,
  result: function() {
    var bounds = [[x0$2, y0$2], [x1, y1]];
    x1 = y1 = -(y0$2 = x0$2 = Infinity);
    return bounds;
  }
};

function boundsPoint$1(x, y) {
  if (x < x0$2) x0$2 = x;
  if (x > x1) x1 = x;
  if (y < y0$2) y0$2 = y;
  if (y > y1) y1 = y;
}

// TODO Enforce positive area for exterior, negative area for interior?

var X0$1 = 0,
    Y0$1 = 0,
    Z0$1 = 0,
    X1$1 = 0,
    Y1$1 = 0,
    Z1$1 = 0,
    X2$1 = 0,
    Y2$1 = 0,
    Z2$1 = 0,
    x00$1,
    y00$1,
    x0$3,
    y0$3;

var centroidStream$1 = {
  point: centroidPoint$1,
  lineStart: centroidLineStart$1,
  lineEnd: centroidLineEnd$1,
  polygonStart: function() {
    centroidStream$1.lineStart = centroidRingStart$1;
    centroidStream$1.lineEnd = centroidRingEnd$1;
  },
  polygonEnd: function() {
    centroidStream$1.point = centroidPoint$1;
    centroidStream$1.lineStart = centroidLineStart$1;
    centroidStream$1.lineEnd = centroidLineEnd$1;
  },
  result: function() {
    var centroid = Z2$1 ? [X2$1 / Z2$1, Y2$1 / Z2$1]
        : Z1$1 ? [X1$1 / Z1$1, Y1$1 / Z1$1]
        : Z0$1 ? [X0$1 / Z0$1, Y0$1 / Z0$1]
        : [NaN, NaN];
    X0$1 = Y0$1 = Z0$1 =
    X1$1 = Y1$1 = Z1$1 =
    X2$1 = Y2$1 = Z2$1 = 0;
    return centroid;
  }
};

function centroidPoint$1(x, y) {
  X0$1 += x;
  Y0$1 += y;
  ++Z0$1;
}

function centroidLineStart$1() {
  centroidStream$1.point = centroidPointFirstLine;
}

function centroidPointFirstLine(x, y) {
  centroidStream$1.point = centroidPointLine;
  centroidPoint$1(x0$3 = x, y0$3 = y);
}

function centroidPointLine(x, y) {
  var dx = x - x0$3, dy = y - y0$3, z = sqrt(dx * dx + dy * dy);
  X1$1 += z * (x0$3 + x) / 2;
  Y1$1 += z * (y0$3 + y) / 2;
  Z1$1 += z;
  centroidPoint$1(x0$3 = x, y0$3 = y);
}

function centroidLineEnd$1() {
  centroidStream$1.point = centroidPoint$1;
}

function centroidRingStart$1() {
  centroidStream$1.point = centroidPointFirstRing;
}

function centroidRingEnd$1() {
  centroidPointRing(x00$1, y00$1);
}

function centroidPointFirstRing(x, y) {
  centroidStream$1.point = centroidPointRing;
  centroidPoint$1(x00$1 = x0$3 = x, y00$1 = y0$3 = y);
}

function centroidPointRing(x, y) {
  var dx = x - x0$3,
      dy = y - y0$3,
      z = sqrt(dx * dx + dy * dy);

  X1$1 += z * (x0$3 + x) / 2;
  Y1$1 += z * (y0$3 + y) / 2;
  Z1$1 += z;

  z = y0$3 * x - x0$3 * y;
  X2$1 += z * (x0$3 + x);
  Y2$1 += z * (y0$3 + y);
  Z2$1 += z * 3;
  centroidPoint$1(x0$3 = x, y0$3 = y);
}

function PathContext(context) {
  this._context = context;
}

PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x, y);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x, y);
        break;
      }
      default: {
        this._context.moveTo(x + this._radius, y);
        this._context.arc(x, y, this._radius, 0, tau$3);
        break;
      }
    }
  },
  result: noop$2
};

var lengthSum$1 = adder(),
    lengthRing,
    x00$2,
    y00$2,
    x0$4,
    y0$4;

var lengthStream$1 = {
  point: noop$2,
  lineStart: function() {
    lengthStream$1.point = lengthPointFirst$1;
  },
  lineEnd: function() {
    if (lengthRing) lengthPoint$1(x00$2, y00$2);
    lengthStream$1.point = noop$2;
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length = +lengthSum$1;
    lengthSum$1.reset();
    return length;
  }
};

function lengthPointFirst$1(x, y) {
  lengthStream$1.point = lengthPoint$1;
  x00$2 = x0$4 = x, y00$2 = y0$4 = y;
}

function lengthPoint$1(x, y) {
  x0$4 -= x, y0$4 -= y;
  lengthSum$1.add(sqrt(x0$4 * x0$4 + y0$4 * y0$4));
  x0$4 = x, y0$4 = y;
}

function PathString() {
  this._string = [];
}

PathString.prototype = {
  _radius: 4.5,
  _circle: circle$1(4.5),
  pointRadius: function(_) {
    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._string.push("M", x, ",", y);
        this._point = 1;
        break;
      }
      case 1: {
        this._string.push("L", x, ",", y);
        break;
      }
      default: {
        if (this._circle == null) this._circle = circle$1(this._radius);
        this._string.push("M", x, ",", y, this._circle);
        break;
      }
    }
  },
  result: function() {
    if (this._string.length) {
      var result = this._string.join("");
      this._string = [];
      return result;
    } else {
      return null;
    }
  }
};

function circle$1(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
      + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
      + "z";
}

function index$1(projection, context) {
  var pointRadius = 4.5,
      projectionStream,
      contextStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      geoStream(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }

  path.area = function(object) {
    geoStream(object, projectionStream(areaStream$1));
    return areaStream$1.result();
  };

  path.measure = function(object) {
    geoStream(object, projectionStream(lengthStream$1));
    return lengthStream$1.result();
  };

  path.bounds = function(object) {
    geoStream(object, projectionStream(boundsStream$1));
    return boundsStream$1.result();
  };

  path.centroid = function(object) {
    geoStream(object, projectionStream(centroidStream$1));
    return centroidStream$1.result();
  };

  path.projection = function(_) {
    return arguments.length ? (projectionStream = _ == null ? (projection = null, identity$4) : (projection = _).stream, path) : projection;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new PathString) : new PathContext(context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  return path.projection(projection).context(context);
}

function transform(methods) {
  return {
    stream: transformer(methods)
  };
}

function transformer(methods) {
  return function(stream) {
    var s = new TransformStream;
    for (var key in methods) s[key] = methods[key];
    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x, y) { this.stream.point(x, y); },
  sphere: function() { this.stream.sphere(); },
  lineStart: function() { this.stream.lineStart(); },
  lineEnd: function() { this.stream.lineEnd(); },
  polygonStart: function() { this.stream.polygonStart(); },
  polygonEnd: function() { this.stream.polygonEnd(); }
};

function fit(projection, fitBounds, object) {
  var clip = projection.clipExtent && projection.clipExtent();
  projection.scale(150).translate([0, 0]);
  if (clip != null) projection.clipExtent(null);
  geoStream(object, projection.stream(boundsStream$1));
  fitBounds(boundsStream$1.result());
  if (clip != null) projection.clipExtent(clip);
  return projection;
}

function fitExtent(projection, extent, object) {
  return fit(projection, function(b) {
    var w = extent[1][0] - extent[0][0],
        h = extent[1][1] - extent[0][1],
        k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
        x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
        y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitSize(projection, size, object) {
  return fitExtent(projection, [[0, 0], size], object);
}

function fitWidth(projection, width, object) {
  return fit(projection, function(b) {
    var w = +width,
        k = w / (b[1][0] - b[0][0]),
        x = (w - k * (b[1][0] + b[0][0])) / 2,
        y = -k * b[0][1];
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitHeight(projection, height, object) {
  return fit(projection, function(b) {
    var h = +height,
        k = h / (b[1][1] - b[0][1]),
        x = -k * b[0][0],
        y = (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

var maxDepth = 16, // maximum depth of subdivision
    cosMinDistance = cos$1(30 * radians); // cos(minimum angular distance)

function resample(project, delta2) {
  return +delta2 ? resample$1(project, delta2) : resampleNone(project);
}

function resampleNone(project) {
  return transformer({
    point: function(x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}

function resample$1(project, delta2) {

  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = sqrt(a * a + b * b + c * c),
          phi2 = asin(c /= m),
          lambda2 = abs(abs(c) - 1) < epsilon$2 || abs(lambda0 - lambda1) < epsilon$2 ? (lambda0 + lambda1) / 2 : atan2(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 // perpendicular projected distance
          || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
        lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = cartesian([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }

    return resampleStream;
  };
}

var transformRadians = transformer({
  point: function(x, y) {
    this.stream.point(x * radians, y * radians);
  }
});

function transformRotate(rotate) {
  return transformer({
    point: function(x, y) {
      var r = rotate(x, y);
      return this.stream.point(r[0], r[1]);
    }
  });
}

function scaleTranslate(k, dx, dy) {
  function transform(x, y) {
    return [dx + k * x, dy - k * y];
  }
  transform.invert = function(x, y) {
    return [(x - dx) / k, (dy - y) / k];
  };
  return transform;
}

function scaleTranslateRotate(k, dx, dy, alpha) {
  var cosAlpha = cos$1(alpha),
      sinAlpha = sin$1(alpha),
      a = cosAlpha * k,
      b = sinAlpha * k,
      ai = cosAlpha / k,
      bi = sinAlpha / k,
      ci = (sinAlpha * dy - cosAlpha * dx) / k,
      fi = (sinAlpha * dx + cosAlpha * dy) / k;
  function transform(x, y) {
    return [a * x - b * y + dx, dy - b * x - a * y];
  }
  transform.invert = function(x, y) {
    return [ai * x - bi * y + ci, fi - bi * x - ai * y];
  };
  return transform;
}

function projection(project) {
  return projectionMutator(function() { return project; })();
}

function projectionMutator(projectAt) {
  var project,
      k = 150, // scale
      x = 480, y = 250, // translate
      lambda = 0, phi = 0, // center
      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, // pre-rotate
      alpha = 0, // post-rotate
      theta = null, preclip = clipAntimeridian, // pre-clip angle
      x0 = null, y0, x1, y1, postclip = identity$4, // post-clip extent
      delta2 = 0.5, // precision
      projectResample,
      projectTransform,
      projectRotateTransform,
      cache,
      cacheStream;

  function projection(point) {
    return projectRotateTransform(point[0] * radians, point[1] * radians);
  }

  function invert(point) {
    point = projectRotateTransform.invert(point[0], point[1]);
    return point && [point[0] * degrees$1, point[1] * degrees$1];
  }

  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };

  projection.preclip = function(_) {
    return arguments.length ? (preclip = _, theta = undefined, reset()) : preclip;
  };

  projection.postclip = function(_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };

  projection.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees$1;
  };

  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$4) : clipRectangle(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function(_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees$1, phi * degrees$1];
  };

  projection.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees$1, deltaPhi * degrees$1, deltaGamma * degrees$1];
  };

  projection.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * radians, recenter()) : alpha * degrees$1;
  };

  projection.precision = function(_) {
    return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
  };

  projection.fitExtent = function(extent, object) {
    return fitExtent(projection, extent, object);
  };

  projection.fitSize = function(size, object) {
    return fitSize(projection, size, object);
  };

  projection.fitWidth = function(width, object) {
    return fitWidth(projection, width, object);
  };

  projection.fitHeight = function(height, object) {
    return fitHeight(projection, height, object);
  };

  function recenter() {
    var center = scaleTranslateRotate(k, 0, 0, alpha).apply(null, project(lambda, phi)),
        transform = (alpha ? scaleTranslateRotate : scaleTranslate)(k, x - center[0], y - center[1], alpha);
    rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = compose(project, transform);
    projectRotateTransform = compose(rotate, projectTransform);
    projectResample = resample(projectTransform, delta2);
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return recenter();
  };
}

function conicProjection(projectAt) {
  var phi0 = 0,
      phi1 = pi$3 / 3,
      m = projectionMutator(projectAt),
      p = m(phi0, phi1);

  p.parallels = function(_) {
    return arguments.length ? m(phi0 = _[0] * radians, phi1 = _[1] * radians) : [phi0 * degrees$1, phi1 * degrees$1];
  };

  return p;
}

function cylindricalEqualAreaRaw(phi0) {
  var cosPhi0 = cos$1(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, sin$1(phi) / cosPhi0];
  }

  forward.invert = function(x, y) {
    return [x / cosPhi0, asin(y * cosPhi0)];
  };

  return forward;
}

function conicEqualAreaRaw(y0, y1) {
  var sy0 = sin$1(y0), n = (sy0 + sin$1(y1)) / 2;

  // Are the parallels symmetrical around the Equator?
  if (abs(n) < epsilon$2) return cylindricalEqualAreaRaw(y0);

  var c = 1 + sy0 * (2 * n - sy0), r0 = sqrt(c) / n;

  function project(x, y) {
    var r = sqrt(c - 2 * n * sin$1(y)) / n;
    return [r * sin$1(x *= n), r0 - r * cos$1(x)];
  }

  project.invert = function(x, y) {
    var r0y = r0 - y;
    return [atan2(x, abs(r0y)) / n * sign(r0y), asin((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
  };

  return project;
}

function conicEqualArea() {
  return conicProjection(conicEqualAreaRaw)
      .scale(155.424)
      .center([0, 33.6442]);
}

function albers() {
  return conicEqualArea()
      .parallels([29.5, 45.5])
      .scale(1070)
      .translate([480, 250])
      .rotate([96, 0])
      .center([-0.6, 38.7]);
}

// The projections must have mutually exclusive clip regions on the sphere,
// as this will avoid emitting interleaving lines and polygons.
function multiplex(streams) {
  var n = streams.length;
  return {
    point: function(x, y) { var i = -1; while (++i < n) streams[i].point(x, y); },
    sphere: function() { var i = -1; while (++i < n) streams[i].sphere(); },
    lineStart: function() { var i = -1; while (++i < n) streams[i].lineStart(); },
    lineEnd: function() { var i = -1; while (++i < n) streams[i].lineEnd(); },
    polygonStart: function() { var i = -1; while (++i < n) streams[i].polygonStart(); },
    polygonEnd: function() { var i = -1; while (++i < n) streams[i].polygonEnd(); }
  };
}

// A composite projection for the United States, configured by default for
// 960×500. The projection also works quite well at 960×600 if you change the
// scale to 1285 and adjust the translate accordingly. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
function albersUsa() {
  var cache,
      cacheStream,
      lower48 = albers(), lower48Point,
      alaska = conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, // EPSG:3338
      hawaii = conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, // ESRI:102007
      point, pointStream = {point: function(x, y) { point = [x, y]; }};

  function albersUsa(coordinates) {
    var x = coordinates[0], y = coordinates[1];
    return point = null,
        (lower48Point.point(x, y), point)
        || (alaskaPoint.point(x, y), point)
        || (hawaiiPoint.point(x, y), point);
  }

  albersUsa.invert = function(coordinates) {
    var k = lower48.scale(),
        t = lower48.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;
    return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska
        : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii
        : lower48).invert(coordinates);
  };

  albersUsa.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
  };

  albersUsa.precision = function(_) {
    if (!arguments.length) return lower48.precision();
    lower48.precision(_), alaska.precision(_), hawaii.precision(_);
    return reset();
  };

  albersUsa.scale = function(_) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function(_) {
    if (!arguments.length) return lower48.translate();
    var k = lower48.scale(), x = +_[0], y = +_[1];

    lower48Point = lower48
        .translate(_)
        .clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]])
        .stream(pointStream);

    alaskaPoint = alaska
        .translate([x - 0.307 * k, y + 0.201 * k])
        .clipExtent([[x - 0.425 * k + epsilon$2, y + 0.120 * k + epsilon$2], [x - 0.214 * k - epsilon$2, y + 0.234 * k - epsilon$2]])
        .stream(pointStream);

    hawaiiPoint = hawaii
        .translate([x - 0.205 * k, y + 0.212 * k])
        .clipExtent([[x - 0.214 * k + epsilon$2, y + 0.166 * k + epsilon$2], [x - 0.115 * k - epsilon$2, y + 0.234 * k - epsilon$2]])
        .stream(pointStream);

    return reset();
  };

  albersUsa.fitExtent = function(extent, object) {
    return fitExtent(albersUsa, extent, object);
  };

  albersUsa.fitSize = function(size, object) {
    return fitSize(albersUsa, size, object);
  };

  albersUsa.fitWidth = function(width, object) {
    return fitWidth(albersUsa, width, object);
  };

  albersUsa.fitHeight = function(height, object) {
    return fitHeight(albersUsa, height, object);
  };

  function reset() {
    cache = cacheStream = null;
    return albersUsa;
  }

  return albersUsa.scale(1070);
}

function azimuthalRaw(scale) {
  return function(x, y) {
    var cx = cos$1(x),
        cy = cos$1(y),
        k = scale(cx * cy);
    return [
      k * cy * sin$1(x),
      k * sin$1(y)
    ];
  }
}

function azimuthalInvert(angle) {
  return function(x, y) {
    var z = sqrt(x * x + y * y),
        c = angle(z),
        sc = sin$1(c),
        cc = cos$1(c);
    return [
      atan2(x * sc, z * cc),
      asin(z && y * sc / z)
    ];
  }
}

var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
  return sqrt(2 / (1 + cxcy));
});

azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z) {
  return 2 * asin(z / 2);
});

function azimuthalEqualArea() {
  return projection(azimuthalEqualAreaRaw)
      .scale(124.75)
      .clipAngle(180 - 1e-3);
}

var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
  return (c = acos(c)) && c / sin$1(c);
});

azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
  return z;
});

function azimuthalEquidistant() {
  return projection(azimuthalEquidistantRaw)
      .scale(79.4188)
      .clipAngle(180 - 1e-3);
}

function mercatorRaw(lambda, phi) {
  return [lambda, log(tan((halfPi$2 + phi) / 2))];
}

mercatorRaw.invert = function(x, y) {
  return [x, 2 * atan(exp(y)) - halfPi$2];
};

function mercator() {
  return mercatorProjection(mercatorRaw)
      .scale(961 / tau$3);
}

function mercatorProjection(project) {
  var m = projection(project),
      center = m.center,
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      x0 = null, y0, x1, y1; // clip extent

  m.scale = function(_) {
    return arguments.length ? (scale(_), reclip()) : scale();
  };

  m.translate = function(_) {
    return arguments.length ? (translate(_), reclip()) : translate();
  };

  m.center = function(_) {
    return arguments.length ? (center(_), reclip()) : center();
  };

  m.clipExtent = function(_) {
    return arguments.length ? ((_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1])), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  function reclip() {
    var k = pi$3 * scale(),
        t = m(rotation(m.rotate()).invert([0, 0]));
    return clipExtent(x0 == null
        ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw
        ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]]
        : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
  }

  return reclip();
}

function tany(y) {
  return tan((halfPi$2 + y) / 2);
}

function conicConformalRaw(y0, y1) {
  var cy0 = cos$1(y0),
      n = y0 === y1 ? sin$1(y0) : log(cy0 / cos$1(y1)) / log(tany(y1) / tany(y0)),
      f = cy0 * pow(tany(y0), n) / n;

  if (!n) return mercatorRaw;

  function project(x, y) {
    if (f > 0) { if (y < -halfPi$2 + epsilon$2) y = -halfPi$2 + epsilon$2; }
    else { if (y > halfPi$2 - epsilon$2) y = halfPi$2 - epsilon$2; }
    var r = f / pow(tany(y), n);
    return [r * sin$1(n * x), f - r * cos$1(n * x)];
  }

  project.invert = function(x, y) {
    var fy = f - y, r = sign(n) * sqrt(x * x + fy * fy);
    return [atan2(x, abs(fy)) / n * sign(fy), 2 * atan(pow(f / r, 1 / n)) - halfPi$2];
  };

  return project;
}

function conicConformal() {
  return conicProjection(conicConformalRaw)
      .scale(109.5)
      .parallels([30, 30]);
}

function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}

equirectangularRaw.invert = equirectangularRaw;

function equirectangular() {
  return projection(equirectangularRaw)
      .scale(152.63);
}

function conicEquidistantRaw(y0, y1) {
  var cy0 = cos$1(y0),
      n = y0 === y1 ? sin$1(y0) : (cy0 - cos$1(y1)) / (y1 - y0),
      g = cy0 / n + y0;

  if (abs(n) < epsilon$2) return equirectangularRaw;

  function project(x, y) {
    var gy = g - y, nx = n * x;
    return [gy * sin$1(nx), g - gy * cos$1(nx)];
  }

  project.invert = function(x, y) {
    var gy = g - y;
    return [atan2(x, abs(gy)) / n * sign(gy), g - sign(n) * sqrt(x * x + gy * gy)];
  };

  return project;
}

function conicEquidistant() {
  return conicProjection(conicEquidistantRaw)
      .scale(131.154)
      .center([0, 13.9389]);
}

var A1 = 1.340264,
    A2 = -0.081106,
    A3 = 0.000893,
    A4 = 0.003796,
    M = sqrt(3) / 2,
    iterations = 12;

function equalEarthRaw(lambda, phi) {
  var l = asin(M * sin$1(phi)), l2 = l * l, l6 = l2 * l2 * l2;
  return [
    lambda * cos$1(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))),
    l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))
  ];
}

equalEarthRaw.invert = function(x, y) {
  var l = y, l2 = l * l, l6 = l2 * l2 * l2;
  for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
    fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y;
    fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
    l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
    if (abs(delta) < epsilon2$1) break;
  }
  return [
    M * x * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / cos$1(l),
    asin(sin$1(l) / M)
  ];
};

function equalEarth() {
  return projection(equalEarthRaw)
      .scale(177.158);
}

function gnomonicRaw(x, y) {
  var cy = cos$1(y), k = cos$1(x) * cy;
  return [cy * sin$1(x) / k, sin$1(y) / k];
}

gnomonicRaw.invert = azimuthalInvert(atan);

function gnomonic() {
  return projection(gnomonicRaw)
      .scale(144.049)
      .clipAngle(60);
}

function scaleTranslate$1(kx, ky, tx, ty) {
  return kx === 1 && ky === 1 && tx === 0 && ty === 0 ? identity$4 : transformer({
    point: function(x, y) {
      this.stream.point(x * kx + tx, y * ky + ty);
    }
  });
}

function identity$5() {
  var k = 1, tx = 0, ty = 0, sx = 1, sy = 1, transform = identity$4, // scale, translate and reflect
      x0 = null, y0, x1, y1, // clip extent
      postclip = identity$4,
      cache,
      cacheStream,
      projection;

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return projection = {
    stream: function(stream) {
      return cache && cacheStream === stream ? cache : cache = transform(postclip(cacheStream = stream));
    },
    postclip: function(_) {
      return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
    },
    clipExtent: function(_) {
      return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$4) : clipRectangle(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
    },
    scale: function(_) {
      return arguments.length ? (transform = scaleTranslate$1((k = +_) * sx, k * sy, tx, ty), reset()) : k;
    },
    translate: function(_) {
      return arguments.length ? (transform = scaleTranslate$1(k * sx, k * sy, tx = +_[0], ty = +_[1]), reset()) : [tx, ty];
    },
    reflectX: function(_) {
      return arguments.length ? (transform = scaleTranslate$1(k * (sx = _ ? -1 : 1), k * sy, tx, ty), reset()) : sx < 0;
    },
    reflectY: function(_) {
      return arguments.length ? (transform = scaleTranslate$1(k * sx, k * (sy = _ ? -1 : 1), tx, ty), reset()) : sy < 0;
    },
    fitExtent: function(extent, object) {
      return fitExtent(projection, extent, object);
    },
    fitSize: function(size, object) {
      return fitSize(projection, size, object);
    },
    fitWidth: function(width, object) {
      return fitWidth(projection, width, object);
    },
    fitHeight: function(height, object) {
      return fitHeight(projection, height, object);
    }
  };
}

function naturalEarth1Raw(lambda, phi) {
  var phi2 = phi * phi, phi4 = phi2 * phi2;
  return [
    lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4))),
    phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)))
  ];
}

naturalEarth1Raw.invert = function(x, y) {
  var phi = y, i = 25, delta;
  do {
    var phi2 = phi * phi, phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4))) - y) /
        (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 0.005916 * 11 * phi4)));
  } while (abs(delta) > epsilon$2 && --i > 0);
  return [
    x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (0.003971 - 0.001529 * phi2)))),
    phi
  ];
};

function naturalEarth1() {
  return projection(naturalEarth1Raw)
      .scale(175.295);
}

function orthographicRaw(x, y) {
  return [cos$1(y) * sin$1(x), sin$1(y)];
}

orthographicRaw.invert = azimuthalInvert(asin);

function orthographic() {
  return projection(orthographicRaw)
      .scale(249.5)
      .clipAngle(90 + epsilon$2);
}

function stereographicRaw(x, y) {
  var cy = cos$1(y), k = 1 + cos$1(x) * cy;
  return [cy * sin$1(x) / k, sin$1(y) / k];
}

stereographicRaw.invert = azimuthalInvert(function(z) {
  return 2 * atan(z);
});

function stereographic() {
  return projection(stereographicRaw)
      .scale(250)
      .clipAngle(142);
}

function transverseMercatorRaw(lambda, phi) {
  return [log(tan((halfPi$2 + phi) / 2)), -lambda];
}

transverseMercatorRaw.invert = function(x, y) {
  return [-y, 2 * atan(exp(x)) - halfPi$2];
};

function transverseMercator() {
  var m = mercatorProjection(transverseMercatorRaw),
      center = m.center,
      rotate = m.rotate;

  m.center = function(_) {
    return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
  };

  m.rotate = function(_) {
    return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
  };

  return rotate([0, 0, 90])
      .scale(159.155);
}

function defaultSeparation(a, b) {
  return a.parent === b.parent ? 1 : 2;
}

function meanX(children) {
  return children.reduce(meanXReduce, 0) / children.length;
}

function meanXReduce(x, c) {
  return x + c.x;
}

function maxY(children) {
  return 1 + children.reduce(maxYReduce, 0);
}

function maxYReduce(y, c) {
  return Math.max(y, c.y);
}

function leafLeft(node) {
  var children;
  while (children = node.children) node = children[0];
  return node;
}

function leafRight(node) {
  var children;
  while (children = node.children) node = children[children.length - 1];
  return node;
}

function cluster() {
  var separation = defaultSeparation,
      dx = 1,
      dy = 1,
      nodeSize = false;

  function cluster(root) {
    var previousNode,
        x = 0;

    // First walk, computing the initial x & y values.
    root.eachAfter(function(node) {
      var children = node.children;
      if (children) {
        node.x = meanX(children);
        node.y = maxY(children);
      } else {
        node.x = previousNode ? x += separation(node, previousNode) : 0;
        node.y = 0;
        previousNode = node;
      }
    });

    var left = leafLeft(root),
        right = leafRight(root),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2;

    // Second walk, normalizing x & y to the desired size.
    return root.eachAfter(nodeSize ? function(node) {
      node.x = (node.x - root.x) * dx;
      node.y = (root.y - node.y) * dy;
    } : function(node) {
      node.x = (node.x - x0) / (x1 - x0) * dx;
      node.y = (1 - (root.y ? node.y / root.y : 1)) * dy;
    });
  }

  cluster.separation = function(x) {
    return arguments.length ? (separation = x, cluster) : separation;
  };

  cluster.size = function(x) {
    return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], cluster) : (nodeSize ? null : [dx, dy]);
  };

  cluster.nodeSize = function(x) {
    return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], cluster) : (nodeSize ? [dx, dy] : null);
  };

  return cluster;
}

function count(node) {
  var sum = 0,
      children = node.children,
      i = children && children.length;
  if (!i) sum = 1;
  else while (--i >= 0) sum += children[i].value;
  node.value = sum;
}

function node_count() {
  return this.eachAfter(count);
}

function node_each(callback) {
  var node = this, current, next = [node], children, i, n;
  do {
    current = next.reverse(), next = [];
    while (node = current.pop()) {
      callback(node), children = node.children;
      if (children) for (i = 0, n = children.length; i < n; ++i) {
        next.push(children[i]);
      }
    }
  } while (next.length);
  return this;
}

function node_eachBefore(callback) {
  var node = this, nodes = [node], children, i;
  while (node = nodes.pop()) {
    callback(node), children = node.children;
    if (children) for (i = children.length - 1; i >= 0; --i) {
      nodes.push(children[i]);
    }
  }
  return this;
}

function node_eachAfter(callback) {
  var node = this, nodes = [node], next = [], children, i, n;
  while (node = nodes.pop()) {
    next.push(node), children = node.children;
    if (children) for (i = 0, n = children.length; i < n; ++i) {
      nodes.push(children[i]);
    }
  }
  while (node = next.pop()) {
    callback(node);
  }
  return this;
}

function node_sum(value) {
  return this.eachAfter(function(node) {
    var sum = +value(node.data) || 0,
        children = node.children,
        i = children && children.length;
    while (--i >= 0) sum += children[i].value;
    node.value = sum;
  });
}

function node_sort(compare) {
  return this.eachBefore(function(node) {
    if (node.children) {
      node.children.sort(compare);
    }
  });
}

function node_path(end) {
  var start = this,
      ancestor = leastCommonAncestor(start, end),
      nodes = [start];
  while (start !== ancestor) {
    start = start.parent;
    nodes.push(start);
  }
  var k = nodes.length;
  while (end !== ancestor) {
    nodes.splice(k, 0, end);
    end = end.parent;
  }
  return nodes;
}

function leastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = a.ancestors(),
      bNodes = b.ancestors(),
      c = null;
  a = aNodes.pop();
  b = bNodes.pop();
  while (a === b) {
    c = a;
    a = aNodes.pop();
    b = bNodes.pop();
  }
  return c;
}

function node_ancestors() {
  var node = this, nodes = [node];
  while (node = node.parent) {
    nodes.push(node);
  }
  return nodes;
}

function node_descendants() {
  var nodes = [];
  this.each(function(node) {
    nodes.push(node);
  });
  return nodes;
}

function node_leaves() {
  var leaves = [];
  this.eachBefore(function(node) {
    if (!node.children) {
      leaves.push(node);
    }
  });
  return leaves;
}

function node_links() {
  var root = this, links = [];
  root.each(function(node) {
    if (node !== root) { // Don’t include the root’s parent, if any.
      links.push({source: node.parent, target: node});
    }
  });
  return links;
}

function hierarchy(data, children) {
  var root = new Node(data),
      valued = +data.value && (root.value = data.value),
      node,
      nodes = [root],
      child,
      childs,
      i,
      n;

  if (children == null) children = defaultChildren;

  while (node = nodes.pop()) {
    if (valued) node.value = +node.data.value;
    if ((childs = children(node.data)) && (n = childs.length)) {
      node.children = new Array(n);
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = node.children[i] = new Node(childs[i]));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }

  return root.eachBefore(computeHeight);
}

function node_copy() {
  return hierarchy(this).eachBefore(copyData);
}

function defaultChildren(d) {
  return d.children;
}

function copyData(node) {
  node.data = node.data.data;
}

function computeHeight(node) {
  var height = 0;
  do node.height = height;
  while ((node = node.parent) && (node.height < ++height));
}

function Node(data) {
  this.data = data;
  this.depth =
  this.height = 0;
  this.parent = null;
}

Node.prototype = hierarchy.prototype = {
  constructor: Node,
  count: node_count,
  each: node_each,
  eachAfter: node_eachAfter,
  eachBefore: node_eachBefore,
  sum: node_sum,
  sort: node_sort,
  path: node_path,
  ancestors: node_ancestors,
  descendants: node_descendants,
  leaves: node_leaves,
  links: node_links,
  copy: node_copy
};

var slice$4 = Array.prototype.slice;

function shuffle$1(array) {
  var m = array.length,
      t,
      i;

  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function enclose(circles) {
  var i = 0, n = (circles = shuffle$1(slice$4.call(circles))).length, B = [], p, e;

  while (i < n) {
    p = circles[i];
    if (e && enclosesWeak(e, p)) ++i;
    else e = encloseBasis(B = extendBasis(B, p)), i = 0;
  }

  return e;
}

function extendBasis(B, p) {
  var i, j;

  if (enclosesWeakAll(p, B)) return [p];

  // If we get here then B must have at least one element.
  for (i = 0; i < B.length; ++i) {
    if (enclosesNot(p, B[i])
        && enclosesWeakAll(encloseBasis2(B[i], p), B)) {
      return [B[i], p];
    }
  }

  // If we get here then B must have at least two elements.
  for (i = 0; i < B.length - 1; ++i) {
    for (j = i + 1; j < B.length; ++j) {
      if (enclosesNot(encloseBasis2(B[i], B[j]), p)
          && enclosesNot(encloseBasis2(B[i], p), B[j])
          && enclosesNot(encloseBasis2(B[j], p), B[i])
          && enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)) {
        return [B[i], B[j], p];
      }
    }
  }

  // If we get here then something is very wrong.
  throw new Error;
}

function enclosesNot(a, b) {
  var dr = a.r - b.r, dx = b.x - a.x, dy = b.y - a.y;
  return dr < 0 || dr * dr < dx * dx + dy * dy;
}

function enclosesWeak(a, b) {
  var dr = a.r - b.r + 1e-6, dx = b.x - a.x, dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

function enclosesWeakAll(a, B) {
  for (var i = 0; i < B.length; ++i) {
    if (!enclosesWeak(a, B[i])) {
      return false;
    }
  }
  return true;
}

function encloseBasis(B) {
  switch (B.length) {
    case 1: return encloseBasis1(B[0]);
    case 2: return encloseBasis2(B[0], B[1]);
    case 3: return encloseBasis3(B[0], B[1], B[2]);
  }
}

function encloseBasis1(a) {
  return {
    x: a.x,
    y: a.y,
    r: a.r
  };
}

function encloseBasis2(a, b) {
  var x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x21 = x2 - x1, y21 = y2 - y1, r21 = r2 - r1,
      l = Math.sqrt(x21 * x21 + y21 * y21);
  return {
    x: (x1 + x2 + x21 / l * r21) / 2,
    y: (y1 + y2 + y21 / l * r21) / 2,
    r: (l + r1 + r2) / 2
  };
}

function encloseBasis3(a, b, c) {
  var x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x3 = c.x, y3 = c.y, r3 = c.r,
      a2 = x1 - x2,
      a3 = x1 - x3,
      b2 = y1 - y2,
      b3 = y1 - y3,
      c2 = r2 - r1,
      c3 = r3 - r1,
      d1 = x1 * x1 + y1 * y1 - r1 * r1,
      d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2,
      d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3,
      ab = a3 * b2 - a2 * b3,
      xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1,
      xb = (b3 * c2 - b2 * c3) / ab,
      ya = (a3 * d2 - a2 * d3) / (ab * 2) - y1,
      yb = (a2 * c3 - a3 * c2) / ab,
      A = xb * xb + yb * yb - 1,
      B = 2 * (r1 + xa * xb + ya * yb),
      C = xa * xa + ya * ya - r1 * r1,
      r = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
  return {
    x: x1 + xa + xb * r,
    y: y1 + ya + yb * r,
    r: r
  };
}

function place(b, a, c) {
  var dx = b.x - a.x, x, a2,
      dy = b.y - a.y, y, b2,
      d2 = dx * dx + dy * dy;
  if (d2) {
    a2 = a.r + c.r, a2 *= a2;
    b2 = b.r + c.r, b2 *= b2;
    if (a2 > b2) {
      x = (d2 + b2 - a2) / (2 * d2);
      y = Math.sqrt(Math.max(0, b2 / d2 - x * x));
      c.x = b.x - x * dx - y * dy;
      c.y = b.y - x * dy + y * dx;
    } else {
      x = (d2 + a2 - b2) / (2 * d2);
      y = Math.sqrt(Math.max(0, a2 / d2 - x * x));
      c.x = a.x + x * dx - y * dy;
      c.y = a.y + x * dy + y * dx;
    }
  } else {
    c.x = a.x + c.r;
    c.y = a.y;
  }
}

function intersects(a, b) {
  var dr = a.r + b.r - 1e-6, dx = b.x - a.x, dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

function score(node) {
  var a = node._,
      b = node.next._,
      ab = a.r + b.r,
      dx = (a.x * b.r + b.x * a.r) / ab,
      dy = (a.y * b.r + b.y * a.r) / ab;
  return dx * dx + dy * dy;
}

function Node$1(circle) {
  this._ = circle;
  this.next = null;
  this.previous = null;
}

function packEnclose(circles) {
  if (!(n = circles.length)) return 0;

  var a, b, c, n, aa, ca, i, j, k, sj, sk;

  // Place the first circle.
  a = circles[0], a.x = 0, a.y = 0;
  if (!(n > 1)) return a.r;

  // Place the second circle.
  b = circles[1], a.x = -b.r, b.x = a.r, b.y = 0;
  if (!(n > 2)) return a.r + b.r;

  // Place the third circle.
  place(b, a, c = circles[2]);

  // Initialize the front-chain using the first three circles a, b and c.
  a = new Node$1(a), b = new Node$1(b), c = new Node$1(c);
  a.next = c.previous = b;
  b.next = a.previous = c;
  c.next = b.previous = a;

  // Attempt to place each remaining circle…
  pack: for (i = 3; i < n; ++i) {
    place(a._, b._, c = circles[i]), c = new Node$1(c);

    // Find the closest intersecting circle on the front-chain, if any.
    // “Closeness” is determined by linear distance along the front-chain.
    // “Ahead” or “behind” is likewise determined by linear distance.
    j = b.next, k = a.previous, sj = b._.r, sk = a._.r;
    do {
      if (sj <= sk) {
        if (intersects(j._, c._)) {
          b = j, a.next = b, b.previous = a, --i;
          continue pack;
        }
        sj += j._.r, j = j.next;
      } else {
        if (intersects(k._, c._)) {
          a = k, a.next = b, b.previous = a, --i;
          continue pack;
        }
        sk += k._.r, k = k.previous;
      }
    } while (j !== k.next);

    // Success! Insert the new circle c between a and b.
    c.previous = a, c.next = b, a.next = b.previous = b = c;

    // Compute the new closest circle pair to the centroid.
    aa = score(a);
    while ((c = c.next) !== b) {
      if ((ca = score(c)) < aa) {
        a = c, aa = ca;
      }
    }
    b = a.next;
  }

  // Compute the enclosing circle of the front chain.
  a = [b._], c = b; while ((c = c.next) !== b) a.push(c._); c = enclose(a);

  // Translate the circles to put the enclosing circle around the origin.
  for (i = 0; i < n; ++i) a = circles[i], a.x -= c.x, a.y -= c.y;

  return c.r;
}

function siblings(circles) {
  packEnclose(circles);
  return circles;
}

function optional(f) {
  return f == null ? null : required(f);
}

function required(f) {
  if (typeof f !== "function") throw new Error;
  return f;
}

function constantZero() {
  return 0;
}

function constant$9(x) {
  return function() {
    return x;
  };
}

function defaultRadius$1(d) {
  return Math.sqrt(d.value);
}

function index$2() {
  var radius = null,
      dx = 1,
      dy = 1,
      padding = constantZero;

  function pack(root) {
    root.x = dx / 2, root.y = dy / 2;
    if (radius) {
      root.eachBefore(radiusLeaf(radius))
          .eachAfter(packChildren(padding, 0.5))
          .eachBefore(translateChild(1));
    } else {
      root.eachBefore(radiusLeaf(defaultRadius$1))
          .eachAfter(packChildren(constantZero, 1))
          .eachAfter(packChildren(padding, root.r / Math.min(dx, dy)))
          .eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
    }
    return root;
  }

  pack.radius = function(x) {
    return arguments.length ? (radius = optional(x), pack) : radius;
  };

  pack.size = function(x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], pack) : [dx, dy];
  };

  pack.padding = function(x) {
    return arguments.length ? (padding = typeof x === "function" ? x : constant$9(+x), pack) : padding;
  };

  return pack;
}

function radiusLeaf(radius) {
  return function(node) {
    if (!node.children) {
      node.r = Math.max(0, +radius(node) || 0);
    }
  };
}

function packChildren(padding, k) {
  return function(node) {
    if (children = node.children) {
      var children,
          i,
          n = children.length,
          r = padding(node) * k || 0,
          e;

      if (r) for (i = 0; i < n; ++i) children[i].r += r;
      e = packEnclose(children);
      if (r) for (i = 0; i < n; ++i) children[i].r -= r;
      node.r = e + r;
    }
  };
}

function translateChild(k) {
  return function(node) {
    var parent = node.parent;
    node.r *= k;
    if (parent) {
      node.x = parent.x + k * node.x;
      node.y = parent.y + k * node.y;
    }
  };
}

function roundNode(node) {
  node.x0 = Math.round(node.x0);
  node.y0 = Math.round(node.y0);
  node.x1 = Math.round(node.x1);
  node.y1 = Math.round(node.y1);
}

function treemapDice(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
      node,
      i = -1,
      n = nodes.length,
      k = parent.value && (x1 - x0) / parent.value;

  while (++i < n) {
    node = nodes[i], node.y0 = y0, node.y1 = y1;
    node.x0 = x0, node.x1 = x0 += node.value * k;
  }
}

function partition() {
  var dx = 1,
      dy = 1,
      padding = 0,
      round = false;

  function partition(root) {
    var n = root.height + 1;
    root.x0 =
    root.y0 = padding;
    root.x1 = dx;
    root.y1 = dy / n;
    root.eachBefore(positionNode(dy, n));
    if (round) root.eachBefore(roundNode);
    return root;
  }

  function positionNode(dy, n) {
    return function(node) {
      if (node.children) {
        treemapDice(node, node.x0, dy * (node.depth + 1) / n, node.x1, dy * (node.depth + 2) / n);
      }
      var x0 = node.x0,
          y0 = node.y0,
          x1 = node.x1 - padding,
          y1 = node.y1 - padding;
      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
      node.x0 = x0;
      node.y0 = y0;
      node.x1 = x1;
      node.y1 = y1;
    };
  }

  partition.round = function(x) {
    return arguments.length ? (round = !!x, partition) : round;
  };

  partition.size = function(x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], partition) : [dx, dy];
  };

  partition.padding = function(x) {
    return arguments.length ? (padding = +x, partition) : padding;
  };

  return partition;
}

var keyPrefix$1 = "$", // Protect against keys like “__proto__”.
    preroot = {depth: -1},
    ambiguous = {};

function defaultId(d) {
  return d.id;
}

function defaultParentId(d) {
  return d.parentId;
}

function stratify() {
  var id = defaultId,
      parentId = defaultParentId;

  function stratify(data) {
    var d,
        i,
        n = data.length,
        root,
        parent,
        node,
        nodes = new Array(n),
        nodeId,
        nodeKey,
        nodeByKey = {};

    for (i = 0; i < n; ++i) {
      d = data[i], node = nodes[i] = new Node(d);
      if ((nodeId = id(d, i, data)) != null && (nodeId += "")) {
        nodeKey = keyPrefix$1 + (node.id = nodeId);
        nodeByKey[nodeKey] = nodeKey in nodeByKey ? ambiguous : node;
      }
    }

    for (i = 0; i < n; ++i) {
      node = nodes[i], nodeId = parentId(data[i], i, data);
      if (nodeId == null || !(nodeId += "")) {
        if (root) throw new Error("multiple roots");
        root = node;
      } else {
        parent = nodeByKey[keyPrefix$1 + nodeId];
        if (!parent) throw new Error("missing: " + nodeId);
        if (parent === ambiguous) throw new Error("ambiguous: " + nodeId);
        if (parent.children) parent.children.push(node);
        else parent.children = [node];
        node.parent = parent;
      }
    }

    if (!root) throw new Error("no root");
    root.parent = preroot;
    root.eachBefore(function(node) { node.depth = node.parent.depth + 1; --n; }).eachBefore(computeHeight);
    root.parent = null;
    if (n > 0) throw new Error("cycle");

    return root;
  }

  stratify.id = function(x) {
    return arguments.length ? (id = required(x), stratify) : id;
  };

  stratify.parentId = function(x) {
    return arguments.length ? (parentId = required(x), stratify) : parentId;
  };

  return stratify;
}

function defaultSeparation$1(a, b) {
  return a.parent === b.parent ? 1 : 2;
}

// function radialSeparation(a, b) {
//   return (a.parent === b.parent ? 1 : 2) / a.depth;
// }

// This function is used to traverse the left contour of a subtree (or
// subforest). It returns the successor of v on this contour. This successor is
// either given by the leftmost child of v or by the thread of v. The function
// returns null if and only if v is on the highest level of its subtree.
function nextLeft(v) {
  var children = v.children;
  return children ? children[0] : v.t;
}

// This function works analogously to nextLeft.
function nextRight(v) {
  var children = v.children;
  return children ? children[children.length - 1] : v.t;
}

// Shifts the current subtree rooted at w+. This is done by increasing
// prelim(w+) and mod(w+) by shift.
function moveSubtree(wm, wp, shift) {
  var change = shift / (wp.i - wm.i);
  wp.c -= change;
  wp.s += shift;
  wm.c += change;
  wp.z += shift;
  wp.m += shift;
}

// All other shifts, applied to the smaller subtrees between w- and w+, are
// performed by this function. To prepare the shifts, we have to adjust
// change(w+), shift(w+), and change(w-).
function executeShifts(v) {
  var shift = 0,
      change = 0,
      children = v.children,
      i = children.length,
      w;
  while (--i >= 0) {
    w = children[i];
    w.z += shift;
    w.m += shift;
    shift += w.s + (change += w.c);
  }
}

// If vi-’s ancestor is a sibling of v, returns vi-’s ancestor. Otherwise,
// returns the specified (default) ancestor.
function nextAncestor(vim, v, ancestor) {
  return vim.a.parent === v.parent ? vim.a : ancestor;
}

function TreeNode(node, i) {
  this._ = node;
  this.parent = null;
  this.children = null;
  this.A = null; // default ancestor
  this.a = this; // ancestor
  this.z = 0; // prelim
  this.m = 0; // mod
  this.c = 0; // change
  this.s = 0; // shift
  this.t = null; // thread
  this.i = i; // number
}

TreeNode.prototype = Object.create(Node.prototype);

function treeRoot(root) {
  var tree = new TreeNode(root, 0),
      node,
      nodes = [tree],
      child,
      children,
      i,
      n;

  while (node = nodes.pop()) {
    if (children = node._.children) {
      node.children = new Array(n = children.length);
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = node.children[i] = new TreeNode(children[i], i));
        child.parent = node;
      }
    }
  }

  (tree.parent = new TreeNode(null, 0)).children = [tree];
  return tree;
}

// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
function tree() {
  var separation = defaultSeparation$1,
      dx = 1,
      dy = 1,
      nodeSize = null;

  function tree(root) {
    var t = treeRoot(root);

    // Compute the layout using Buchheim et al.’s algorithm.
    t.eachAfter(firstWalk), t.parent.m = -t.z;
    t.eachBefore(secondWalk);

    // If a fixed node size is specified, scale x and y.
    if (nodeSize) root.eachBefore(sizeNode);

    // If a fixed tree size is specified, scale x and y based on the extent.
    // Compute the left-most, right-most, and depth-most nodes for extents.
    else {
      var left = root,
          right = root,
          bottom = root;
      root.eachBefore(function(node) {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
        if (node.depth > bottom.depth) bottom = node;
      });
      var s = left === right ? 1 : separation(left, right) / 2,
          tx = s - left.x,
          kx = dx / (right.x + s + tx),
          ky = dy / (bottom.depth || 1);
      root.eachBefore(function(node) {
        node.x = (node.x + tx) * kx;
        node.y = node.depth * ky;
      });
    }

    return root;
  }

  // Computes a preliminary x-coordinate for v. Before that, FIRST WALK is
  // applied recursively to the children of v, as well as the function
  // APPORTION. After spacing out the children by calling EXECUTE SHIFTS, the
  // node v is placed to the midpoint of its outermost children.
  function firstWalk(v) {
    var children = v.children,
        siblings = v.parent.children,
        w = v.i ? siblings[v.i - 1] : null;
    if (children) {
      executeShifts(v);
      var midpoint = (children[0].z + children[children.length - 1].z) / 2;
      if (w) {
        v.z = w.z + separation(v._, w._);
        v.m = v.z - midpoint;
      } else {
        v.z = midpoint;
      }
    } else if (w) {
      v.z = w.z + separation(v._, w._);
    }
    v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
  }

  // Computes all real x-coordinates by summing up the modifiers recursively.
  function secondWalk(v) {
    v._.x = v.z + v.parent.m;
    v.m += v.parent.m;
  }

  // The core of the algorithm. Here, a new subtree is combined with the
  // previous subtrees. Threads are used to traverse the inside and outside
  // contours of the left and right subtree up to the highest common level. The
  // vertices used for the traversals are vi+, vi-, vo-, and vo+, where the
  // superscript o means outside and i means inside, the subscript - means left
  // subtree and + means right subtree. For summing up the modifiers along the
  // contour, we use respective variables si+, si-, so-, and so+. Whenever two
  // nodes of the inside contours conflict, we compute the left one of the
  // greatest uncommon ancestors using the function ANCESTOR and call MOVE
  // SUBTREE to shift the subtree and prepare the shifts of smaller subtrees.
  // Finally, we add a new thread (if necessary).
  function apportion(v, w, ancestor) {
    if (w) {
      var vip = v,
          vop = v,
          vim = w,
          vom = vip.parent.children[0],
          sip = vip.m,
          sop = vop.m,
          sim = vim.m,
          som = vom.m,
          shift;
      while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
        vom = nextLeft(vom);
        vop = nextRight(vop);
        vop.a = v;
        shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
        if (shift > 0) {
          moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
          sip += shift;
          sop += shift;
        }
        sim += vim.m;
        sip += vip.m;
        som += vom.m;
        sop += vop.m;
      }
      if (vim && !nextRight(vop)) {
        vop.t = vim;
        vop.m += sim - sop;
      }
      if (vip && !nextLeft(vom)) {
        vom.t = vip;
        vom.m += sip - som;
        ancestor = v;
      }
    }
    return ancestor;
  }

  function sizeNode(node) {
    node.x *= dx;
    node.y = node.depth * dy;
  }

  tree.separation = function(x) {
    return arguments.length ? (separation = x, tree) : separation;
  };

  tree.size = function(x) {
    return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], tree) : (nodeSize ? null : [dx, dy]);
  };

  tree.nodeSize = function(x) {
    return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], tree) : (nodeSize ? [dx, dy] : null);
  };

  return tree;
}

function treemapSlice(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
      node,
      i = -1,
      n = nodes.length,
      k = parent.value && (y1 - y0) / parent.value;

  while (++i < n) {
    node = nodes[i], node.x0 = x0, node.x1 = x1;
    node.y0 = y0, node.y1 = y0 += node.value * k;
  }
}

var phi = (1 + Math.sqrt(5)) / 2;

function squarifyRatio(ratio, parent, x0, y0, x1, y1) {
  var rows = [],
      nodes = parent.children,
      row,
      nodeValue,
      i0 = 0,
      i1 = 0,
      n = nodes.length,
      dx, dy,
      value = parent.value,
      sumValue,
      minValue,
      maxValue,
      newRatio,
      minRatio,
      alpha,
      beta;

  while (i0 < n) {
    dx = x1 - x0, dy = y1 - y0;

    // Find the next non-empty node.
    do sumValue = nodes[i1++].value; while (!sumValue && i1 < n);
    minValue = maxValue = sumValue;
    alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
    beta = sumValue * sumValue * alpha;
    minRatio = Math.max(maxValue / beta, beta / minValue);

    // Keep adding nodes while the aspect ratio maintains or improves.
    for (; i1 < n; ++i1) {
      sumValue += nodeValue = nodes[i1].value;
      if (nodeValue < minValue) minValue = nodeValue;
      if (nodeValue > maxValue) maxValue = nodeValue;
      beta = sumValue * sumValue * alpha;
      newRatio = Math.max(maxValue / beta, beta / minValue);
      if (newRatio > minRatio) { sumValue -= nodeValue; break; }
      minRatio = newRatio;
    }

    // Position and record the row orientation.
    rows.push(row = {value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1)});
    if (row.dice) treemapDice(row, x0, y0, x1, value ? y0 += dy * sumValue / value : y1);
    else treemapSlice(row, x0, y0, value ? x0 += dx * sumValue / value : x1, y1);
    value -= sumValue, i0 = i1;
  }

  return rows;
}

var squarify = (function custom(ratio) {

  function squarify(parent, x0, y0, x1, y1) {
    squarifyRatio(ratio, parent, x0, y0, x1, y1);
  }

  squarify.ratio = function(x) {
    return custom((x = +x) > 1 ? x : 1);
  };

  return squarify;
})(phi);

function index$3() {
  var tile = squarify,
      round = false,
      dx = 1,
      dy = 1,
      paddingStack = [0],
      paddingInner = constantZero,
      paddingTop = constantZero,
      paddingRight = constantZero,
      paddingBottom = constantZero,
      paddingLeft = constantZero;

  function treemap(root) {
    root.x0 =
    root.y0 = 0;
    root.x1 = dx;
    root.y1 = dy;
    root.eachBefore(positionNode);
    paddingStack = [0];
    if (round) root.eachBefore(roundNode);
    return root;
  }

  function positionNode(node) {
    var p = paddingStack[node.depth],
        x0 = node.x0 + p,
        y0 = node.y0 + p,
        x1 = node.x1 - p,
        y1 = node.y1 - p;
    if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
    if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
    node.x0 = x0;
    node.y0 = y0;
    node.x1 = x1;
    node.y1 = y1;
    if (node.children) {
      p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
      x0 += paddingLeft(node) - p;
      y0 += paddingTop(node) - p;
      x1 -= paddingRight(node) - p;
      y1 -= paddingBottom(node) - p;
      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
      tile(node, x0, y0, x1, y1);
    }
  }

  treemap.round = function(x) {
    return arguments.length ? (round = !!x, treemap) : round;
  };

  treemap.size = function(x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], treemap) : [dx, dy];
  };

  treemap.tile = function(x) {
    return arguments.length ? (tile = required(x), treemap) : tile;
  };

  treemap.padding = function(x) {
    return arguments.length ? treemap.paddingInner(x).paddingOuter(x) : treemap.paddingInner();
  };

  treemap.paddingInner = function(x) {
    return arguments.length ? (paddingInner = typeof x === "function" ? x : constant$9(+x), treemap) : paddingInner;
  };

  treemap.paddingOuter = function(x) {
    return arguments.length ? treemap.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x) : treemap.paddingTop();
  };

  treemap.paddingTop = function(x) {
    return arguments.length ? (paddingTop = typeof x === "function" ? x : constant$9(+x), treemap) : paddingTop;
  };

  treemap.paddingRight = function(x) {
    return arguments.length ? (paddingRight = typeof x === "function" ? x : constant$9(+x), treemap) : paddingRight;
  };

  treemap.paddingBottom = function(x) {
    return arguments.length ? (paddingBottom = typeof x === "function" ? x : constant$9(+x), treemap) : paddingBottom;
  };

  treemap.paddingLeft = function(x) {
    return arguments.length ? (paddingLeft = typeof x === "function" ? x : constant$9(+x), treemap) : paddingLeft;
  };

  return treemap;
}

function binary(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
      i, n = nodes.length,
      sum, sums = new Array(n + 1);

  for (sums[0] = sum = i = 0; i < n; ++i) {
    sums[i + 1] = sum += nodes[i].value;
  }

  partition(0, n, parent.value, x0, y0, x1, y1);

  function partition(i, j, value, x0, y0, x1, y1) {
    if (i >= j - 1) {
      var node = nodes[i];
      node.x0 = x0, node.y0 = y0;
      node.x1 = x1, node.y1 = y1;
      return;
    }

    var valueOffset = sums[i],
        valueTarget = (value / 2) + valueOffset,
        k = i + 1,
        hi = j - 1;

    while (k < hi) {
      var mid = k + hi >>> 1;
      if (sums[mid] < valueTarget) k = mid + 1;
      else hi = mid;
    }

    if ((valueTarget - sums[k - 1]) < (sums[k] - valueTarget) && i + 1 < k) --k;

    var valueLeft = sums[k] - valueOffset,
        valueRight = value - valueLeft;

    if ((x1 - x0) > (y1 - y0)) {
      var xk = (x0 * valueRight + x1 * valueLeft) / value;
      partition(i, k, valueLeft, x0, y0, xk, y1);
      partition(k, j, valueRight, xk, y0, x1, y1);
    } else {
      var yk = (y0 * valueRight + y1 * valueLeft) / value;
      partition(i, k, valueLeft, x0, y0, x1, yk);
      partition(k, j, valueRight, x0, yk, x1, y1);
    }
  }
}

function sliceDice(parent, x0, y0, x1, y1) {
  (parent.depth & 1 ? treemapSlice : treemapDice)(parent, x0, y0, x1, y1);
}

var resquarify = (function custom(ratio) {

  function resquarify(parent, x0, y0, x1, y1) {
    if ((rows = parent._squarify) && (rows.ratio === ratio)) {
      var rows,
          row,
          nodes,
          i,
          j = -1,
          n,
          m = rows.length,
          value = parent.value;

      while (++j < m) {
        row = rows[j], nodes = row.children;
        for (i = row.value = 0, n = nodes.length; i < n; ++i) row.value += nodes[i].value;
        if (row.dice) treemapDice(row, x0, y0, x1, y0 += (y1 - y0) * row.value / value);
        else treemapSlice(row, x0, y0, x0 += (x1 - x0) * row.value / value, y1);
        value -= row.value;
      }
    } else {
      parent._squarify = rows = squarifyRatio(ratio, parent, x0, y0, x1, y1);
      rows.ratio = ratio;
    }
  }

  resquarify.ratio = function(x) {
    return custom((x = +x) > 1 ? x : 1);
  };

  return resquarify;
})(phi);

function area$2(polygon) {
  var i = -1,
      n = polygon.length,
      a,
      b = polygon[n - 1],
      area = 0;

  while (++i < n) {
    a = b;
    b = polygon[i];
    area += a[1] * b[0] - a[0] * b[1];
  }

  return area / 2;
}

function centroid$1(polygon) {
  var i = -1,
      n = polygon.length,
      x = 0,
      y = 0,
      a,
      b = polygon[n - 1],
      c,
      k = 0;

  while (++i < n) {
    a = b;
    b = polygon[i];
    k += c = a[0] * b[1] - b[0] * a[1];
    x += (a[0] + b[0]) * c;
    y += (a[1] + b[1]) * c;
  }

  return k *= 3, [x / k, y / k];
}

// Returns the 2D cross product of AB and AC vectors, i.e., the z-component of
// the 3D cross product in a quadrant I Cartesian coordinate system (+x is
// right, +y is up). Returns a positive value if ABC is counter-clockwise,
// negative if clockwise, and zero if the points are collinear.
function cross$1(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
}

function lexicographicOrder(a, b) {
  return a[0] - b[0] || a[1] - b[1];
}

// Computes the upper convex hull per the monotone chain algorithm.
// Assumes points.length >= 3, is sorted by x, unique in y.
// Returns an array of indices into points in left-to-right order.
function computeUpperHullIndexes(points) {
  var n = points.length,
      indexes = [0, 1],
      size = 2;

  for (var i = 2; i < n; ++i) {
    while (size > 1 && cross$1(points[indexes[size - 2]], points[indexes[size - 1]], points[i]) <= 0) --size;
    indexes[size++] = i;
  }

  return indexes.slice(0, size); // remove popped points
}

function hull(points) {
  if ((n = points.length) < 3) return null;

  var i,
      n,
      sortedPoints = new Array(n),
      flippedPoints = new Array(n);

  for (i = 0; i < n; ++i) sortedPoints[i] = [+points[i][0], +points[i][1], i];
  sortedPoints.sort(lexicographicOrder);
  for (i = 0; i < n; ++i) flippedPoints[i] = [sortedPoints[i][0], -sortedPoints[i][1]];

  var upperIndexes = computeUpperHullIndexes(sortedPoints),
      lowerIndexes = computeUpperHullIndexes(flippedPoints);

  // Construct the hull polygon, removing possible duplicate endpoints.
  var skipLeft = lowerIndexes[0] === upperIndexes[0],
      skipRight = lowerIndexes[lowerIndexes.length - 1] === upperIndexes[upperIndexes.length - 1],
      hull = [];

  // Add upper hull in right-to-l order.
  // Then add lower hull in left-to-right order.
  for (i = upperIndexes.length - 1; i >= 0; --i) hull.push(points[sortedPoints[upperIndexes[i]][2]]);
  for (i = +skipLeft; i < lowerIndexes.length - skipRight; ++i) hull.push(points[sortedPoints[lowerIndexes[i]][2]]);

  return hull;
}

function contains$2(polygon, point) {
  var n = polygon.length,
      p = polygon[n - 1],
      x = point[0], y = point[1],
      x0 = p[0], y0 = p[1],
      x1, y1,
      inside = false;

  for (var i = 0; i < n; ++i) {
    p = polygon[i], x1 = p[0], y1 = p[1];
    if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside;
    x0 = x1, y0 = y1;
  }

  return inside;
}

function length$2(polygon) {
  var i = -1,
      n = polygon.length,
      b = polygon[n - 1],
      xa,
      ya,
      xb = b[0],
      yb = b[1],
      perimeter = 0;

  while (++i < n) {
    xa = xb;
    ya = yb;
    b = polygon[i];
    xb = b[0];
    yb = b[1];
    xa -= xb;
    ya -= yb;
    perimeter += Math.sqrt(xa * xa + ya * ya);
  }

  return perimeter;
}

function defaultSource$1() {
  return Math.random();
}

var uniform = (function sourceRandomUniform(source) {
  function randomUniform(min, max) {
    min = min == null ? 0 : +min;
    max = max == null ? 1 : +max;
    if (arguments.length === 1) max = min, min = 0;
    else max -= min;
    return function() {
      return source() * max + min;
    };
  }

  randomUniform.source = sourceRandomUniform;

  return randomUniform;
})(defaultSource$1);

var normal = (function sourceRandomNormal(source) {
  function randomNormal(mu, sigma) {
    var x, r;
    mu = mu == null ? 0 : +mu;
    sigma = sigma == null ? 1 : +sigma;
    return function() {
      var y;

      // If available, use the second previously-generated uniform random.
      if (x != null) y = x, x = null;

      // Otherwise, generate a new x and y.
      else do {
        x = source() * 2 - 1;
        y = source() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);

      return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
    };
  }

  randomNormal.source = sourceRandomNormal;

  return randomNormal;
})(defaultSource$1);

var logNormal = (function sourceRandomLogNormal(source) {
  function randomLogNormal() {
    var randomNormal = normal.source(source).apply(this, arguments);
    return function() {
      return Math.exp(randomNormal());
    };
  }

  randomLogNormal.source = sourceRandomLogNormal;

  return randomLogNormal;
})(defaultSource$1);

var irwinHall = (function sourceRandomIrwinHall(source) {
  function randomIrwinHall(n) {
    return function() {
      for (var sum = 0, i = 0; i < n; ++i) sum += source();
      return sum;
    };
  }

  randomIrwinHall.source = sourceRandomIrwinHall;

  return randomIrwinHall;
})(defaultSource$1);

var bates = (function sourceRandomBates(source) {
  function randomBates(n) {
    var randomIrwinHall = irwinHall.source(source)(n);
    return function() {
      return randomIrwinHall() / n;
    };
  }

  randomBates.source = sourceRandomBates;

  return randomBates;
})(defaultSource$1);

var exponential$1 = (function sourceRandomExponential(source) {
  function randomExponential(lambda) {
    return function() {
      return -Math.log(1 - source()) / lambda;
    };
  }

  randomExponential.source = sourceRandomExponential;

  return randomExponential;
})(defaultSource$1);

function initRange(domain, range) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}

function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.interpolator(domain); break;
    default: this.interpolator(interpolator).domain(domain); break;
  }
  return this;
}

var array$3 = Array.prototype;

var map$2 = array$3.map;
var slice$5 = array$3.slice;

var implicit = {name: "implicit"};

function ordinal() {
  var index = map$1(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    var key = d + "", i = index.get(key);
    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }
    return range[(i - 1) % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = map$1();
    var i = -1, n = _.length, d, key;
    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice$5.call(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };

  initRange.apply(scale, arguments);

  return scale;
}

function band() {
  var scale = ordinal().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      range = [0, 1],
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = range[1] < range[0],
        start = range[reverse - 0],
        stop = range[1 - reverse];
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = sequence(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? (range = [+_[0], +_[1]], rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = [+_[0], +_[1]], round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band(domain(), range)
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return initRange.apply(rescale(), arguments);
}

function pointish(scale) {
  var copy = scale.copy;

  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;

  scale.copy = function() {
    return pointish(copy());
  };

  return scale;
}

function point$1() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}

function constant$a(x) {
  return function() {
    return x;
  };
}

function number$2(x) {
  return +x;
}

var unit = [0, 1];

function identity$6(x) {
  return x;
}

function normalize(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constant$a(isNaN(b) ? NaN : 0.5);
}

function clamper(domain) {
  var a = domain[0], b = domain[domain.length - 1], t;
  if (a > b) t = a, a = b, b = t;
  return function(x) { return Math.max(a, Math.min(b, x)); };
}

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = bisectRight(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function transformer$1() {
  var domain = unit,
      range = unit,
      interpolate = interpolateValue,
      transform,
      untransform,
      unknown,
      clamp = identity$6,
      piecewise,
      output,
      input;

  function rescale() {
    piecewise = Math.min(domain.length, range.length) > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }

  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = map$2.call(_, number$2), clamp === identity$6 || (clamp = clamper(domain)), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice$5.call(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = slice$5.call(_), interpolate = interpolateRound, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? clamper(domain) : identity$6, scale) : clamp !== identity$6;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous(transform, untransform) {
  return transformer$1()(transform, untransform);
}

function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain(),
        i0 = 0,
        i1 = d.length - 1,
        start = d[i0],
        stop = d[i1],
        step;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }

    step = tickIncrement(start, stop, count);

    if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
      step = tickIncrement(start, stop, count);
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
      step = tickIncrement(start, stop, count);
    }

    if (step > 0) {
      d[i0] = Math.floor(start / step) * step;
      d[i1] = Math.ceil(stop / step) * step;
      domain(d);
    } else if (step < 0) {
      d[i0] = Math.ceil(start * step) / step;
      d[i1] = Math.floor(stop * step) / step;
      domain(d);
    }

    return scale;
  };

  return scale;
}

function linear$2() {
  var scale = continuous(identity$6, identity$6);

  scale.copy = function() {
    return copy(scale, linear$2());
  };

  initRange.apply(scale, arguments);

  return linearish(scale);
}

function identity$7(domain) {
  var unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : x;
  }

  scale.invert = scale;

  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = map$2.call(_, number$2), scale) : domain.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return identity$7(domain).unknown(unknown);
  };

  domain = arguments.length ? map$2.call(domain, number$2) : [0, 1];

  return linearish(scale);
}

function nice(domain, interval) {
  domain = domain.slice();

  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}

function transformLog(x) {
  return Math.log(x);
}

function transformExp(x) {
  return Math.exp(x);
}

function transformLogn(x) {
  return -Math.log(-x);
}

function transformExpn(x) {
  return -Math.exp(-x);
}

function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}

function powp(base) {
  return base === 10 ? pow10
      : base === Math.E ? Math.exp
      : function(x) { return Math.pow(base, x); };
}

function logp(base) {
  return base === Math.E ? Math.log
      : base === 10 && Math.log10
      || base === 2 && Math.log2
      || (base = Math.log(base), function(x) { return Math.log(x) / base; });
}

function reflect(f) {
  return function(x) {
    return -f(-x);
  };
}

function loggish(transform) {
  var scale = transform(transformLog, transformExp),
      domain = scale.domain,
      base = 10,
      logs,
      pows;

  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }
    return scale;
  }

  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = function(count) {
    var d = domain(),
        u = d[0],
        v = d[d.length - 1],
        r;

    if (r = v < u) i = u, u = v, v = i;

    var i = logs(u),
        j = logs(v),
        p,
        k,
        t,
        n = count == null ? 10 : +count,
        z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.round(i) - 1, j = Math.round(j) + 1;
      if (u > 0) for (; i < j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i < j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
    } else {
      z = ticks(i, j, Math.min(j - i, n)).map(pows);
    }

    return r ? z.reverse() : z;
  };

  scale.tickFormat = function(count, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = format(specifier);
    if (count === Infinity) return specifier;
    if (count == null) count = 10;
    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
    return function(d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = function() {
    return domain(nice(domain(), {
      floor: function(x) { return pows(Math.floor(logs(x))); },
      ceil: function(x) { return pows(Math.ceil(logs(x))); }
    }));
  };

  return scale;
}

function log$1() {
  var scale = loggish(transformer$1()).domain([1, 10]);

  scale.copy = function() {
    return copy(scale, log$1()).base(scale.base());
  };

  initRange.apply(scale, arguments);

  return scale;
}

function transformSymlog(c) {
  return function(x) {
    return Math.sign(x) * Math.log1p(Math.abs(x / c));
  };
}

function transformSymexp(c) {
  return function(x) {
    return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
  };
}

function symlogish(transform) {
  var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));

  scale.constant = function(_) {
    return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
  };

  return linearish(scale);
}

function symlog() {
  var scale = symlogish(transformer$1());

  scale.copy = function() {
    return copy(scale, symlog()).constant(scale.constant());
  };

  return initRange.apply(scale, arguments);
}

function transformPow(exponent) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}

function transformSqrt(x) {
  return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}

function transformSquare(x) {
  return x < 0 ? -x * x : x * x;
}

function powish(transform) {
  var scale = transform(identity$6, identity$6),
      exponent = 1;

  function rescale() {
    return exponent === 1 ? transform(identity$6, identity$6)
        : exponent === 0.5 ? transform(transformSqrt, transformSquare)
        : transform(transformPow(exponent), transformPow(1 / exponent));
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };

  return linearish(scale);
}

function pow$1() {
  var scale = powish(transformer$1());

  scale.copy = function() {
    return copy(scale, pow$1()).exponent(scale.exponent());
  };

  initRange.apply(scale, arguments);

  return scale;
}

function sqrt$1() {
  return pow$1.apply(null, arguments).exponent(0.5);
}

function quantile() {
  var domain = [],
      range = [],
      thresholds = [],
      unknown;

  function rescale() {
    var i = 0, n = Math.max(1, range.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = threshold(domain, i / n);
    return scale;
  }

  function scale(x) {
    return isNaN(x = +x) ? unknown : range[bisectRight(thresholds, x)];
  }

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain[0],
      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
    ];
  };

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(ascending);
    return rescale();
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice$5.call(_), rescale()) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.quantiles = function() {
    return thresholds.slice();
  };

  scale.copy = function() {
    return quantile()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return initRange.apply(scale, arguments);
}

function quantize$1() {
  var x0 = 0,
      x1 = 1,
      n = 1,
      domain = [0.5],
      range = [0, 1],
      unknown;

  function scale(x) {
    return x <= x ? range[bisectRight(domain, x, 0, n)] : unknown;
  }

  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    return scale;
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
  };

  scale.range = function(_) {
    return arguments.length ? (n = (range = slice$5.call(_)).length - 1, rescale()) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN]
        : i < 1 ? [x0, domain[0]]
        : i >= n ? [domain[n - 1], x1]
        : [domain[i - 1], domain[i]];
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : scale;
  };

  scale.thresholds = function() {
    return domain.slice();
  };

  scale.copy = function() {
    return quantize$1()
        .domain([x0, x1])
        .range(range)
        .unknown(unknown);
  };

  return initRange.apply(linearish(scale), arguments);
}

function threshold$1() {
  var domain = [0.5],
      range = [0, 1],
      unknown,
      n = 1;

  function scale(x) {
    return x <= x ? range[bisectRight(domain, x, 0, n)] : unknown;
  }

  scale.domain = function(_) {
    return arguments.length ? (domain = slice$5.call(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice$5.call(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return [domain[i - 1], domain[i]];
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return threshold$1()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return initRange.apply(scale, arguments);
}

var t0$1 = new Date,
    t1$1 = new Date;

function newInterval(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = new Date(+date)), date;
  }

  interval.floor = interval;

  interval.ceil = function(date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = function(date) {
    var d0 = interval(date),
        d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = function(date, step) {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = function(start, stop, step) {
    var range = [], previous;
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range;
  };

  interval.filter = function(test) {
    return newInterval(function(date) {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, function(date, step) {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } else while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
        }
      }
    });
  };

  if (count) {
    interval.count = function(start, end) {
      t0$1.setTime(+start), t1$1.setTime(+end);
      floori(t0$1), floori(t1$1);
      return Math.floor(count(t0$1, t1$1));
    };

    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? function(d) { return field(d) % step === 0; }
              : function(d) { return interval.count(0, d) % step === 0; });
    };
  }

  return interval;
}

var millisecond = newInterval(function() {
  // noop
}, function(date, step) {
  date.setTime(+date + step);
}, function(start, end) {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = function(k) {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return newInterval(function(date) {
    date.setTime(Math.floor(date / k) * k);
  }, function(date, step) {
    date.setTime(+date + step * k);
  }, function(start, end) {
    return (end - start) / k;
  });
};
var milliseconds = millisecond.range;

var durationSecond = 1e3;
var durationMinute = 6e4;
var durationHour = 36e5;
var durationDay = 864e5;
var durationWeek = 6048e5;

var second = newInterval(function(date) {
  date.setTime(date - date.getMilliseconds());
}, function(date, step) {
  date.setTime(+date + step * durationSecond);
}, function(start, end) {
  return (end - start) / durationSecond;
}, function(date) {
  return date.getUTCSeconds();
});
var seconds = second.range;

var minute = newInterval(function(date) {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
}, function(date, step) {
  date.setTime(+date + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date) {
  return date.getMinutes();
});
var minutes = minute.range;

var hour = newInterval(function(date) {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
}, function(date, step) {
  date.setTime(+date + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date) {
  return date.getHours();
});
var hours = hour.range;

var day = newInterval(function(date) {
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setDate(date.getDate() + step);
}, function(start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
}, function(date) {
  return date.getDate() - 1;
});
var days = day.range;

function weekday(i) {
  return newInterval(function(date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}

var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);

var sundays = sunday.range;
var mondays = monday.range;
var tuesdays = tuesday.range;
var wednesdays = wednesday.range;
var thursdays = thursday.range;
var fridays = friday.range;
var saturdays = saturday.range;

var month = newInterval(function(date) {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setMonth(date.getMonth() + step);
}, function(start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date) {
  return date.getMonth();
});
var months = month.range;

var year = newInterval(function(date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date) {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
year.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step * k);
  });
};
var years = year.range;

var utcMinute = newInterval(function(date) {
  date.setUTCSeconds(0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date) {
  return date.getUTCMinutes();
});
var utcMinutes = utcMinute.range;

var utcHour = newInterval(function(date) {
  date.setUTCMinutes(0, 0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date) {
  return date.getUTCHours();
});
var utcHours = utcHour.range;

var utcDay = newInterval(function(date) {
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / durationDay;
}, function(date) {
  return date.getUTCDate() - 1;
});
var utcDays = utcDay.range;

function utcWeekday(i) {
  return newInterval(function(date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function(start, end) {
    return (end - start) / durationWeek;
  });
}

var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);

var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

var utcMonth = newInterval(function(date) {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCMonth(date.getUTCMonth() + step);
}, function(start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date) {
  return date.getUTCMonth();
});
var utcMonths = utcMonth.range;

var utcYear = newInterval(function(date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date) {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};
var utcYears = utcYear.range;

function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newYear(y) {
  return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale$1(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear$1,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };

  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };

  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, newDate) {
    return function(string) {
      var d = newYear(1900),
          i = parseSpecifier(d, specifier, string += "", 0),
          week, day$1;
      if (i != string.length) return null;

      // If a UNIX timestamp is specified, return it.
      if ("Q" in d) return new Date(d.Q);

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newYear(d.y)), day$1 = week.getUTCDay();
          week = day$1 > 4 || day$1 === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = newDate(newYear(d.y)), day$1 = week.getDay();
          week = day$1 > 4 || day$1 === 0 ? monday.ceil(week) : monday(week);
          week = day.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day$1 = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$1 + 5) % 7 : d.w + d.U * 7 - (day$1 + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      return newDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", localDate);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier, utcDate);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads = {"-": "", "_": " ", "0": "0"},
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\^$*+?|[\]().{}]/g;

function pad$1(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  var map = {}, i = -1, n = names.length;
  while (++i < n) map[names[i].toLowerCase()] = i;
  return map;
}

function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}

function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = (+n[0]) * 1000, i + n[0].length) : -1;
}

function formatDayOfMonth(d, p) {
  return pad$1(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad$1(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad$1(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad$1(1 + day.count(year(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad$1(d.getMilliseconds(), p, 3);
}

function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}

function formatMonthNumber(d, p) {
  return pad$1(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad$1(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad$1(d.getSeconds(), p, 2);
}

function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}

function formatWeekNumberSunday(d, p) {
  return pad$1(sunday.count(year(d), d), p, 2);
}

function formatWeekNumberISO(d, p) {
  var day = d.getDay();
  d = (day >= 4 || day === 0) ? thursday(d) : thursday.ceil(d);
  return pad$1(thursday.count(year(d), d) + (year(d).getDay() === 4), p, 2);
}

function formatWeekdayNumberSunday(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad$1(monday.count(year(d), d), p, 2);
}

function formatYear$1(d, p) {
  return pad$1(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad$1(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad$1(z / 60 | 0, "0", 2)
      + pad$1(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad$1(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad$1(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad$1(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad$1(1 + utcDay.count(utcYear(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad$1(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}

function formatUTCMonthNumber(d, p) {
  return pad$1(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad$1(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad$1(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function formatUTCWeekNumberSunday(d, p) {
  return pad$1(utcSunday.count(utcYear(d), d), p, 2);
}

function formatUTCWeekNumberISO(d, p) {
  var day = d.getUTCDay();
  d = (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
  return pad$1(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}

function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad$1(utcMonday.count(utcYear(d), d), p, 2);
}

function formatUTCYear(d, p) {
  return pad$1(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad$1(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}

function formatUnixTimestamp(d) {
  return +d;
}

function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1000);
}

var locale$1;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;

defaultLocale$1({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale$1(definition) {
  locale$1 = formatLocale$1(definition);
  timeFormat = locale$1.format;
  timeParse = locale$1.parse;
  utcFormat = locale$1.utcFormat;
  utcParse = locale$1.utcParse;
  return locale$1;
}

var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

function formatIsoNative(date) {
  return date.toISOString();
}

var formatIso = Date.prototype.toISOString
    ? formatIsoNative
    : utcFormat(isoSpecifier);

function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}

var parseIso = +new Date("2000-01-01T00:00:00.000Z")
    ? parseIsoNative
    : utcParse(isoSpecifier);

var durationSecond$1 = 1000,
    durationMinute$1 = durationSecond$1 * 60,
    durationHour$1 = durationMinute$1 * 60,
    durationDay$1 = durationHour$1 * 24,
    durationWeek$1 = durationDay$1 * 7,
    durationMonth = durationDay$1 * 30,
    durationYear = durationDay$1 * 365;

function date$1(t) {
  return new Date(t);
}

function number$3(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(year, month, week, day, hour, minute, second, millisecond, format) {
  var scale = continuous(identity$6, identity$6),
      invert = scale.invert,
      domain = scale.domain;

  var formatMillisecond = format(".%L"),
      formatSecond = format(":%S"),
      formatMinute = format("%I:%M"),
      formatHour = format("%I %p"),
      formatDay = format("%a %d"),
      formatWeek = format("%b %d"),
      formatMonth = format("%B"),
      formatYear = format("%Y");

  var tickIntervals = [
    [second,  1,      durationSecond$1],
    [second,  5,  5 * durationSecond$1],
    [second, 15, 15 * durationSecond$1],
    [second, 30, 30 * durationSecond$1],
    [minute,  1,      durationMinute$1],
    [minute,  5,  5 * durationMinute$1],
    [minute, 15, 15 * durationMinute$1],
    [minute, 30, 30 * durationMinute$1],
    [  hour,  1,      durationHour$1  ],
    [  hour,  3,  3 * durationHour$1  ],
    [  hour,  6,  6 * durationHour$1  ],
    [  hour, 12, 12 * durationHour$1  ],
    [   day,  1,      durationDay$1   ],
    [   day,  2,  2 * durationDay$1   ],
    [  week,  1,      durationWeek$1  ],
    [ month,  1,      durationMonth ],
    [ month,  3,  3 * durationMonth ],
    [  year,  1,      durationYear  ]
  ];

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond
        : minute(date) < date ? formatSecond
        : hour(date) < date ? formatMinute
        : day(date) < date ? formatHour
        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
        : year(date) < date ? formatMonth
        : formatYear)(date);
  }

  function tickInterval(interval, start, stop, step) {
    if (interval == null) interval = 10;

    // If a desired tick count is specified, pick a reasonable tick interval
    // based on the extent of the domain and a rough estimate of tick size.
    // Otherwise, assume interval is already a time interval and use it.
    if (typeof interval === "number") {
      var target = Math.abs(stop - start) / interval,
          i = bisector(function(i) { return i[2]; }).right(tickIntervals, target);
      if (i === tickIntervals.length) {
        step = tickStep(start / durationYear, stop / durationYear, interval);
        interval = year;
      } else if (i) {
        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        step = i[1];
        interval = i[0];
      } else {
        step = Math.max(tickStep(start, stop, interval), 1);
        interval = millisecond;
      }
    }

    return step == null ? interval : interval.every(step);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(map$2.call(_, number$3)) : domain().map(date$1);
  };

  scale.ticks = function(interval, step) {
    var d = domain(),
        t0 = d[0],
        t1 = d[d.length - 1],
        r = t1 < t0,
        t;
    if (r) t = t0, t0 = t1, t1 = t;
    t = tickInterval(interval, t0, t1, step);
    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
    return r ? t.reverse() : t;
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function(interval, step) {
    var d = domain();
    return (interval = tickInterval(interval, d[0], d[d.length - 1], step))
        ? domain(nice(d, interval))
        : scale;
  };

  scale.copy = function() {
    return copy(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format));
  };

  return scale;
}

function time() {
  return initRange.apply(calendar(year, month, sunday, day, hour, minute, second, millisecond, timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
}

function utcTime() {
  return initRange.apply(calendar(utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, millisecond, utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
}

function transformer$2() {
  var x0 = 0,
      x1 = 1,
      t0,
      t1,
      k10,
      transform,
      interpolator = identity$6,
      clamp = false,
      unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? (t0 = transform(x0 = +_[0]), t1 = transform(x1 = +_[1]), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t) {
    transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
    return scale;
  };
}

function copy$1(source, target) {
  return target
      .domain(source.domain())
      .interpolator(source.interpolator())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function sequential() {
  var scale = linearish(transformer$2()(identity$6));

  scale.copy = function() {
    return copy$1(scale, sequential());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialLog() {
  var scale = loggish(transformer$2()).domain([1, 10]);

  scale.copy = function() {
    return copy$1(scale, sequentialLog()).base(scale.base());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialSymlog() {
  var scale = symlogish(transformer$2());

  scale.copy = function() {
    return copy$1(scale, sequentialSymlog()).constant(scale.constant());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialPow() {
  var scale = powish(transformer$2());

  scale.copy = function() {
    return copy$1(scale, sequentialPow()).exponent(scale.exponent());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialSqrt() {
  return sequentialPow.apply(null, arguments).exponent(0.5);
}

function sequentialQuantile() {
  var domain = [],
      interpolator = identity$6;

  function scale(x) {
    if (!isNaN(x = +x)) return interpolator((bisectRight(domain, x) - 1) / (domain.length - 1));
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(ascending);
    return scale;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.copy = function() {
    return sequentialQuantile(interpolator).domain(domain);
  };

  return initInterpolator.apply(scale, arguments);
}

function transformer$3() {
  var x0 = 0,
      x1 = 0.5,
      x2 = 1,
      t0,
      t1,
      t2,
      k10,
      k21,
      interpolator = identity$6,
      transform,
      clamp = false,
      unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : (x = 0.5 + ((x = +transform(x)) - t1) * (x < t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? (t0 = transform(x0 = +_[0]), t1 = transform(x1 = +_[1]), t2 = transform(x2 = +_[2]), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), scale) : [x0, x1, x2];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t) {
    transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1);
    return scale;
  };
}

function diverging() {
  var scale = linearish(transformer$3()(identity$6));

  scale.copy = function() {
    return copy$1(scale, diverging());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingLog() {
  var scale = loggish(transformer$3()).domain([0.1, 1, 10]);

  scale.copy = function() {
    return copy$1(scale, divergingLog()).base(scale.base());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingSymlog() {
  var scale = symlogish(transformer$3());

  scale.copy = function() {
    return copy$1(scale, divergingSymlog()).constant(scale.constant());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingPow() {
  var scale = powish(transformer$3());

  scale.copy = function() {
    return copy$1(scale, divergingPow()).exponent(scale.exponent());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingSqrt() {
  return divergingPow.apply(null, arguments).exponent(0.5);
}

function colors(specifier) {
  var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
  while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
  return colors;
}

var category10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

var Accent = colors("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");

var Dark2 = colors("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");

var Paired = colors("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");

var Pastel1 = colors("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");

var Pastel2 = colors("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");

var Set1 = colors("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");

var Set2 = colors("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");

var Set3 = colors("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");

function ramp(scheme) {
  return rgbBasis(scheme[scheme.length - 1]);
}

var scheme = new Array(3).concat(
  "d8b365f5f5f55ab4ac",
  "a6611adfc27d80cdc1018571",
  "a6611adfc27df5f5f580cdc1018571",
  "8c510ad8b365f6e8c3c7eae55ab4ac01665e",
  "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e",
  "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e",
  "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e",
  "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30",
  "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30"
).map(colors);

var BrBG = ramp(scheme);

var scheme$1 = new Array(3).concat(
  "af8dc3f7f7f77fbf7b",
  "7b3294c2a5cfa6dba0008837",
  "7b3294c2a5cff7f7f7a6dba0008837",
  "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837",
  "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837",
  "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837",
  "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837",
  "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b",
  "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b"
).map(colors);

var PRGn = ramp(scheme$1);

var scheme$2 = new Array(3).concat(
  "e9a3c9f7f7f7a1d76a",
  "d01c8bf1b6dab8e1864dac26",
  "d01c8bf1b6daf7f7f7b8e1864dac26",
  "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221",
  "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221",
  "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221",
  "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221",
  "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419",
  "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419"
).map(colors);

var PiYG = ramp(scheme$2);

var scheme$3 = new Array(3).concat(
  "998ec3f7f7f7f1a340",
  "5e3c99b2abd2fdb863e66101",
  "5e3c99b2abd2f7f7f7fdb863e66101",
  "542788998ec3d8daebfee0b6f1a340b35806",
  "542788998ec3d8daebf7f7f7fee0b6f1a340b35806",
  "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806",
  "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806",
  "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08",
  "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08"
).map(colors);

var PuOr = ramp(scheme$3);

var scheme$4 = new Array(3).concat(
  "ef8a62f7f7f767a9cf",
  "ca0020f4a58292c5de0571b0",
  "ca0020f4a582f7f7f792c5de0571b0",
  "b2182bef8a62fddbc7d1e5f067a9cf2166ac",
  "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac",
  "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac",
  "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac",
  "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061",
  "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061"
).map(colors);

var RdBu = ramp(scheme$4);

var scheme$5 = new Array(3).concat(
  "ef8a62ffffff999999",
  "ca0020f4a582bababa404040",
  "ca0020f4a582ffffffbababa404040",
  "b2182bef8a62fddbc7e0e0e09999994d4d4d",
  "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d",
  "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d",
  "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d",
  "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a",
  "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a"
).map(colors);

var RdGy = ramp(scheme$5);

var scheme$6 = new Array(3).concat(
  "fc8d59ffffbf91bfdb",
  "d7191cfdae61abd9e92c7bb6",
  "d7191cfdae61ffffbfabd9e92c7bb6",
  "d73027fc8d59fee090e0f3f891bfdb4575b4",
  "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4",
  "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4",
  "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4",
  "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695",
  "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695"
).map(colors);

var RdYlBu = ramp(scheme$6);

var scheme$7 = new Array(3).concat(
  "fc8d59ffffbf91cf60",
  "d7191cfdae61a6d96a1a9641",
  "d7191cfdae61ffffbfa6d96a1a9641",
  "d73027fc8d59fee08bd9ef8b91cf601a9850",
  "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
  "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
  "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
  "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
  "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
).map(colors);

var RdYlGn = ramp(scheme$7);

var scheme$8 = new Array(3).concat(
  "fc8d59ffffbf99d594",
  "d7191cfdae61abdda42b83ba",
  "d7191cfdae61ffffbfabdda42b83ba",
  "d53e4ffc8d59fee08be6f59899d5943288bd",
  "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd",
  "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd",
  "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd",
  "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2",
  "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2"
).map(colors);

var Spectral = ramp(scheme$8);

var scheme$9 = new Array(3).concat(
  "e5f5f999d8c92ca25f",
  "edf8fbb2e2e266c2a4238b45",
  "edf8fbb2e2e266c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b"
).map(colors);

var BuGn = ramp(scheme$9);

var scheme$a = new Array(3).concat(
  "e0ecf49ebcda8856a7",
  "edf8fbb3cde38c96c688419d",
  "edf8fbb3cde38c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b"
).map(colors);

var BuPu = ramp(scheme$a);

var scheme$b = new Array(3).concat(
  "e0f3dba8ddb543a2ca",
  "f0f9e8bae4bc7bccc42b8cbe",
  "f0f9e8bae4bc7bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081"
).map(colors);

var GnBu = ramp(scheme$b);

var scheme$c = new Array(3).concat(
  "fee8c8fdbb84e34a33",
  "fef0d9fdcc8afc8d59d7301f",
  "fef0d9fdcc8afc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000"
).map(colors);

var OrRd = ramp(scheme$c);

var scheme$d = new Array(3).concat(
  "ece2f0a6bddb1c9099",
  "f6eff7bdc9e167a9cf02818a",
  "f6eff7bdc9e167a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636"
).map(colors);

var PuBuGn = ramp(scheme$d);

var scheme$e = new Array(3).concat(
  "ece7f2a6bddb2b8cbe",
  "f1eef6bdc9e174a9cf0570b0",
  "f1eef6bdc9e174a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858"
).map(colors);

var PuBu = ramp(scheme$e);

var scheme$f = new Array(3).concat(
  "e7e1efc994c7dd1c77",
  "f1eef6d7b5d8df65b0ce1256",
  "f1eef6d7b5d8df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f"
).map(colors);

var PuRd = ramp(scheme$f);

var scheme$g = new Array(3).concat(
  "fde0ddfa9fb5c51b8a",
  "feebe2fbb4b9f768a1ae017e",
  "feebe2fbb4b9f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a"
).map(colors);

var RdPu = ramp(scheme$g);

var scheme$h = new Array(3).concat(
  "edf8b17fcdbb2c7fb8",
  "ffffcca1dab441b6c4225ea8",
  "ffffcca1dab441b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58"
).map(colors);

var YlGnBu = ramp(scheme$h);

var scheme$i = new Array(3).concat(
  "f7fcb9addd8e31a354",
  "ffffccc2e69978c679238443",
  "ffffccc2e69978c67931a354006837",
  "ffffccd9f0a3addd8e78c67931a354006837",
  "ffffccd9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529"
).map(colors);

var YlGn = ramp(scheme$i);

var scheme$j = new Array(3).concat(
  "fff7bcfec44fd95f0e",
  "ffffd4fed98efe9929cc4c02",
  "ffffd4fed98efe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506"
).map(colors);

var YlOrBr = ramp(scheme$j);

var scheme$k = new Array(3).concat(
  "ffeda0feb24cf03b20",
  "ffffb2fecc5cfd8d3ce31a1c",
  "ffffb2fecc5cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026"
).map(colors);

var YlOrRd = ramp(scheme$k);

var scheme$l = new Array(3).concat(
  "deebf79ecae13182bd",
  "eff3ffbdd7e76baed62171b5",
  "eff3ffbdd7e76baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
).map(colors);

var Blues = ramp(scheme$l);

var scheme$m = new Array(3).concat(
  "e5f5e0a1d99b31a354",
  "edf8e9bae4b374c476238b45",
  "edf8e9bae4b374c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b"
).map(colors);

var Greens = ramp(scheme$m);

var scheme$n = new Array(3).concat(
  "f0f0f0bdbdbd636363",
  "f7f7f7cccccc969696525252",
  "f7f7f7cccccc969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000"
).map(colors);

var Greys = ramp(scheme$n);

var scheme$o = new Array(3).concat(
  "efedf5bcbddc756bb1",
  "f2f0f7cbc9e29e9ac86a51a3",
  "f2f0f7cbc9e29e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d"
).map(colors);

var Purples = ramp(scheme$o);

var scheme$p = new Array(3).concat(
  "fee0d2fc9272de2d26",
  "fee5d9fcae91fb6a4acb181d",
  "fee5d9fcae91fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d"
).map(colors);

var Reds = ramp(scheme$p);

var scheme$q = new Array(3).concat(
  "fee6cefdae6be6550d",
  "feeddefdbe85fd8d3cd94701",
  "feeddefdbe85fd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704"
).map(colors);

var Oranges = ramp(scheme$q);

var cubehelix$3 = cubehelixLong(cubehelix(300, 0.5, 0.0), cubehelix(-240, 0.5, 1.0));

var warm = cubehelixLong(cubehelix(-100, 0.75, 0.35), cubehelix(80, 1.50, 0.8));

var cool = cubehelixLong(cubehelix(260, 0.75, 0.35), cubehelix(80, 1.50, 0.8));

var c = cubehelix();

function rainbow(t) {
  if (t < 0 || t > 1) t -= Math.floor(t);
  var ts = Math.abs(t - 0.5);
  c.h = 360 * t - 100;
  c.s = 1.5 - 1.5 * ts;
  c.l = 0.8 - 0.9 * ts;
  return c + "";
}

var c$1 = rgb(),
    pi_1_3 = Math.PI / 3,
    pi_2_3 = Math.PI * 2 / 3;

function sinebow(t) {
  var x;
  t = (0.5 - t) * Math.PI;
  c$1.r = 255 * (x = Math.sin(t)) * x;
  c$1.g = 255 * (x = Math.sin(t + pi_1_3)) * x;
  c$1.b = 255 * (x = Math.sin(t + pi_2_3)) * x;
  return c$1 + "";
}

function ramp$1(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

var viridis = ramp$1(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));

var magma = ramp$1(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));

var inferno = ramp$1(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));

var plasma = ramp$1(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

function constant$b(x) {
  return function constant() {
    return x;
  };
}

var abs$1 = Math.abs;
var atan2$1 = Math.atan2;
var cos$2 = Math.cos;
var max$2 = Math.max;
var min$1 = Math.min;
var sin$2 = Math.sin;
var sqrt$2 = Math.sqrt;

var epsilon$3 = 1e-12;
var pi$4 = Math.PI;
var halfPi$3 = pi$4 / 2;
var tau$4 = 2 * pi$4;

function acos$1(x) {
  return x > 1 ? 0 : x < -1 ? pi$4 : Math.acos(x);
}

function asin$1(x) {
  return x >= 1 ? halfPi$3 : x <= -1 ? -halfPi$3 : Math.asin(x);
}

function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = y32 * x10 - x32 * y10;
  if (t * t < epsilon$3) return;
  t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / sqrt$2(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * sqrt$2(max$2(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

function arc() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = constant$b(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null;

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - halfPi$3,
        a1 = endAngle.apply(this, arguments) - halfPi$3,
        da = abs$1(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > epsilon$3)) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > tau$4 - epsilon$3) {
      context.moveTo(r1 * cos$2(a0), r1 * sin$2(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon$3) {
        context.moveTo(r0 * cos$2(a1), r0 * sin$2(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > epsilon$3) && (padRadius ? +padRadius.apply(this, arguments) : sqrt$2(r0 * r0 + r1 * r1)),
          rc = min$1(abs$1(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > epsilon$3) {
        var p0 = asin$1(rp / r0 * sin$2(ap)),
            p1 = asin$1(rp / r1 * sin$2(ap));
        if ((da0 -= p0 * 2) > epsilon$3) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > epsilon$3) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * cos$2(a01),
          y01 = r1 * sin$2(a01),
          x10 = r0 * cos$2(a10),
          y10 = r0 * sin$2(a10);

      // Apply rounded corners?
      if (rc > epsilon$3) {
        var x11 = r1 * cos$2(a11),
            y11 = r1 * sin$2(a11),
            x00 = r0 * cos$2(a00),
            y00 = r0 * sin$2(a00),
            oc;

        // Restrict the corner radius according to the sector angle.
        if (da < pi$4 && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
          var ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / sin$2(acos$1((ax * bx + ay * by) / (sqrt$2(ax * ax + ay * ay) * sqrt$2(bx * bx + by * by))) / 2),
              lc = sqrt$2(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = min$1(rc, (r0 - lc) / (kc - 1));
          rc1 = min$1(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > epsilon$3)) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > epsilon$3) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2$1(t0.y01, t0.x01), atan2$1(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, atan2$1(t0.y01, t0.x01), atan2$1(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, atan2$1(t0.cy + t0.y11, t0.cx + t0.x11), atan2$1(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, atan2$1(t1.y11, t1.x11), atan2$1(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > epsilon$3) || !(da0 > epsilon$3)) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > epsilon$3) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2$1(t0.y01, t0.x01), atan2$1(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, atan2$1(t0.y01, t0.x01), atan2$1(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, atan2$1(t0.cy + t0.y11, t0.cx + t0.x11), atan2$1(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, atan2$1(t1.y11, t1.x11), atan2$1(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi$4 / 2;
    return [cos$2(a) * r, sin$2(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant$b(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant$b(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant$b(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant$b(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$b(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$b(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$b(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
}

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

function curveLinear(context) {
  return new Linear(context);
}

function x$3(p) {
  return p[0];
}

function y$3(p) {
  return p[1];
}

function line() {
  var x = x$3,
      y = y$3,
      defined = constant$b(true),
      context = null,
      curve = curveLinear,
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x(d, i, data), +y(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant$b(+_), line) : x;
  };

  line.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant$b(+_), line) : y;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$b(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

function area$3() {
  var x0 = x$3,
      x1 = null,
      y0 = constant$b(0),
      y1 = y$3,
      defined = constant$b(true),
      context = null,
      curve = curveLinear,
      output = null;

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$b(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$b(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$b(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$b(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$b(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$b(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$b(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
}

function descending$1(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function identity$8(d) {
  return d;
}

function pie() {
  var value = identity$8,
      sortValues = descending$1,
      sort = null,
      startAngle = constant$b(0),
      endAngle = constant$b(tau$4),
      padAngle = constant$b(0);

  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(tau$4, Math.max(-tau$4, endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$b(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$b(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$b(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$b(+_), pie) : padAngle;
  };

  return pie;
}

var curveRadialLinear = curveRadial(curveLinear);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}

function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return l;
}

function lineRadial$1() {
  return lineRadial(line().curve(curveRadialLinear));
}

function areaRadial() {
  var a = area$3().curve(curveRadialLinear),
      c = a.curve,
      x0 = a.lineX0,
      x1 = a.lineX1,
      y0 = a.lineY0,
      y1 = a.lineY1;

  a.angle = a.x, delete a.x;
  a.startAngle = a.x0, delete a.x0;
  a.endAngle = a.x1, delete a.x1;
  a.radius = a.y, delete a.y;
  a.innerRadius = a.y0, delete a.y0;
  a.outerRadius = a.y1, delete a.y1;
  a.lineStartAngle = function() { return lineRadial(x0()); }, delete a.lineX0;
  a.lineEndAngle = function() { return lineRadial(x1()); }, delete a.lineX1;
  a.lineInnerRadius = function() { return lineRadial(y0()); }, delete a.lineY0;
  a.lineOuterRadius = function() { return lineRadial(y1()); }, delete a.lineY1;

  a.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return a;
}

function pointRadial(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}

var slice$6 = Array.prototype.slice;

function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link$2(curve) {
  var source = linkSource,
      target = linkTarget,
      x = x$3,
      y = y$3,
      context = null;

  function link() {
    var buffer, argv = slice$6.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = path();
    curve(context, +x.apply(this, (argv[0] = s, argv)), +y.apply(this, argv), +x.apply(this, (argv[0] = t, argv)), +y.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant$b(+_), link) : x;
  };

  link.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant$b(+_), link) : y;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}

function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}

function curveRadial$1(context, x0, y0, x1, y1) {
  var p0 = pointRadial(x0, y0),
      p1 = pointRadial(x0, y0 = (y0 + y1) / 2),
      p2 = pointRadial(x1, y0),
      p3 = pointRadial(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link$2(curveHorizontal);
}

function linkVertical() {
  return link$2(curveVertical);
}

function linkRadial() {
  var l = link$2(curveRadial$1);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}

var circle$2 = {
  draw: function(context, size) {
    var r = Math.sqrt(size / pi$4);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau$4);
  }
};

var cross$2 = {
  draw: function(context, size) {
    var r = Math.sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};

var tan30 = Math.sqrt(1 / 3),
    tan30_2 = tan30 * 2;

var diamond = {
  draw: function(context, size) {
    var y = Math.sqrt(size / tan30_2),
        x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};

var ka = 0.89081309152928522810,
    kr = Math.sin(pi$4 / 10) / Math.sin(7 * pi$4 / 10),
    kx = Math.sin(tau$4 / 10) * kr,
    ky = -Math.cos(tau$4 / 10) * kr;

var star = {
  draw: function(context, size) {
    var r = Math.sqrt(size * ka),
        x = kx * r,
        y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var a = tau$4 * i / 5,
          c = Math.cos(a),
          s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
};

var square = {
  draw: function(context, size) {
    var w = Math.sqrt(size),
        x = -w / 2;
    context.rect(x, x, w, w);
  }
};

var sqrt3 = Math.sqrt(3);

var triangle = {
  draw: function(context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};

var c$2 = -0.5,
    s = Math.sqrt(3) / 2,
    k = 1 / Math.sqrt(12),
    a = (k / 2 + 1) * 3;

var wye = {
  draw: function(context, size) {
    var r = Math.sqrt(size / a),
        x0 = r / 2,
        y0 = r * k,
        x1 = x0,
        y1 = r * k + r,
        x2 = -x1,
        y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c$2 * x0 - s * y0, s * x0 + c$2 * y0);
    context.lineTo(c$2 * x1 - s * y1, s * x1 + c$2 * y1);
    context.lineTo(c$2 * x2 - s * y2, s * x2 + c$2 * y2);
    context.lineTo(c$2 * x0 + s * y0, c$2 * y0 - s * x0);
    context.lineTo(c$2 * x1 + s * y1, c$2 * y1 - s * x1);
    context.lineTo(c$2 * x2 + s * y2, c$2 * y2 - s * x2);
    context.closePath();
  }
};

var symbols = [
  circle$2,
  cross$2,
  diamond,
  square,
  star,
  triangle,
  wye
];

function symbol() {
  var type = constant$b(circle$2),
      size = constant$b(64),
      context = null;

  function symbol() {
    var buffer;
    if (!context) context = buffer = path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant$b(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant$b(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
}

function noop$3() {}

function point$2(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point$2(this, this._x1, this._y1); // proceed
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basis$2(context) {
  return new Basis(context);
}

function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: noop$3,
  areaEnd: noop$3,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basisClosed$1(context) {
  return new BasisClosed(context);
}

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
      case 3: this._point = 4; // proceed
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basisOpen(context) {
  return new BasisOpen(context);
}

function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

var bundle = (function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
})(0.85);

function point$3(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point$3(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // proceed
      default: point$3(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinal = (function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: noop$3,
  areaEnd: noop$3,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$3(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalClosed = (function custom(tension) {

  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$3(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalOpen = (function custom(tension) {

  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function point$4(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > epsilon$3) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > epsilon$3) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // proceed
      default: point$4(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRom = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: noop$3,
  areaEnd: noop$3,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$4(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomClosed = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$4(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomOpen = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop$3,
  areaEnd: noop$3,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

function linearClosed(context) {
  return new LinearClosed(context);
}

function sign$1(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign$1(s0) + sign$1(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point$5(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point$5(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point$5(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point$5(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}

function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}

function natural(context) {
  return new Natural(context);
}

function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = this._x * (1 - this._t) + x * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    this._x = x, this._y = y;
  }
};

function step(context) {
  return new Step(context, 0.5);
}

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}

function none$1(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}

function none$2(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}

function stackValue(d, key) {
  return d[key];
}

function stack() {
  var keys = constant$b([]),
      order = none$2,
      offset = none$1,
      value = stackValue;

  function stack(data) {
    var kz = keys.apply(this, arguments),
        i,
        m = data.length,
        n = kz.length,
        sz = new Array(n),
        oz;

    for (i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [0, +value(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }

    for (i = 0, oz = order(sz); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant$b(slice$6.call(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$b(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none$2 : typeof _ === "function" ? _ : constant$b(slice$6.call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none$1 : _, stack) : offset;
  };

  return stack;
}

function expand(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  none$1(series, order);
}

function diverging$1(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = yp;
      }
    }
  }
}

function silhouette(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  none$1(series, order);
}

function wiggle(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  none$1(series, order);
}

function appearance(series) {
  var peaks = series.map(peak);
  return none$2(series).sort(function(a, b) { return peaks[a] - peaks[b]; });
}

function peak(series) {
  var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
  while (++i < n) if ((vi = +series[i][1]) > vj) vj = vi, j = i;
  return j;
}

function ascending$3(series) {
  var sums = series.map(sum$2);
  return none$2(series).sort(function(a, b) { return sums[a] - sums[b]; });
}

function sum$2(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}

function descending$2(series) {
  return ascending$3(series).reverse();
}

function insideOut(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(sum$2),
      order = appearance(series),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
}

function reverse(series) {
  return none$2(series).reverse();
}

function constant$c(x) {
  return function() {
    return x;
  };
}

function x$4(d) {
  return d[0];
}

function y$4(d) {
  return d[1];
}

function RedBlackTree() {
  this._ = null; // root node
}

function RedBlackNode(node) {
  node.U = // parent node
  node.C = // color - true for red, false for black
  node.L = // left node
  node.R = // right node
  node.P = // previous node
  node.N = null; // next node
}

RedBlackTree.prototype = {
  constructor: RedBlackTree,

  insert: function(after, node) {
    var parent, grandpa, uncle;

    if (after) {
      node.P = after;
      node.N = after.N;
      if (after.N) after.N.P = node;
      after.N = node;
      if (after.R) {
        after = after.R;
        while (after.L) after = after.L;
        after.L = node;
      } else {
        after.R = node;
      }
      parent = after;
    } else if (this._) {
      after = RedBlackFirst(this._);
      node.P = null;
      node.N = after;
      after.P = after.L = node;
      parent = after;
    } else {
      node.P = node.N = null;
      this._ = node;
      parent = null;
    }
    node.L = node.R = null;
    node.U = parent;
    node.C = true;

    after = node;
    while (parent && parent.C) {
      grandpa = parent.U;
      if (parent === grandpa.L) {
        uncle = grandpa.R;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.R) {
            RedBlackRotateLeft(this, parent);
            after = parent;
            parent = after.U;
          }
          parent.C = false;
          grandpa.C = true;
          RedBlackRotateRight(this, grandpa);
        }
      } else {
        uncle = grandpa.L;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.L) {
            RedBlackRotateRight(this, parent);
            after = parent;
            parent = after.U;
          }
          parent.C = false;
          grandpa.C = true;
          RedBlackRotateLeft(this, grandpa);
        }
      }
      parent = after.U;
    }
    this._.C = false;
  },

  remove: function(node) {
    if (node.N) node.N.P = node.P;
    if (node.P) node.P.N = node.N;
    node.N = node.P = null;

    var parent = node.U,
        sibling,
        left = node.L,
        right = node.R,
        next,
        red;

    if (!left) next = right;
    else if (!right) next = left;
    else next = RedBlackFirst(right);

    if (parent) {
      if (parent.L === node) parent.L = next;
      else parent.R = next;
    } else {
      this._ = next;
    }

    if (left && right) {
      red = next.C;
      next.C = node.C;
      next.L = left;
      left.U = next;
      if (next !== right) {
        parent = next.U;
        next.U = node.U;
        node = next.R;
        parent.L = node;
        next.R = right;
        right.U = next;
      } else {
        next.U = parent;
        parent = next;
        node = next.R;
      }
    } else {
      red = node.C;
      node = next;
    }

    if (node) node.U = parent;
    if (red) return;
    if (node && node.C) { node.C = false; return; }

    do {
      if (node === this._) break;
      if (node === parent.L) {
        sibling = parent.R;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateLeft(this, parent);
          sibling = parent.R;
        }
        if ((sibling.L && sibling.L.C)
            || (sibling.R && sibling.R.C)) {
          if (!sibling.R || !sibling.R.C) {
            sibling.L.C = false;
            sibling.C = true;
            RedBlackRotateRight(this, sibling);
            sibling = parent.R;
          }
          sibling.C = parent.C;
          parent.C = sibling.R.C = false;
          RedBlackRotateLeft(this, parent);
          node = this._;
          break;
        }
      } else {
        sibling = parent.L;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateRight(this, parent);
          sibling = parent.L;
        }
        if ((sibling.L && sibling.L.C)
          || (sibling.R && sibling.R.C)) {
          if (!sibling.L || !sibling.L.C) {
            sibling.R.C = false;
            sibling.C = true;
            RedBlackRotateLeft(this, sibling);
            sibling = parent.L;
          }
          sibling.C = parent.C;
          parent.C = sibling.L.C = false;
          RedBlackRotateRight(this, parent);
          node = this._;
          break;
        }
      }
      sibling.C = true;
      node = parent;
      parent = parent.U;
    } while (!node.C);

    if (node) node.C = false;
  }
};

function RedBlackRotateLeft(tree, node) {
  var p = node,
      q = node.R,
      parent = p.U;

  if (parent) {
    if (parent.L === p) parent.L = q;
    else parent.R = q;
  } else {
    tree._ = q;
  }

  q.U = parent;
  p.U = q;
  p.R = q.L;
  if (p.R) p.R.U = p;
  q.L = p;
}

function RedBlackRotateRight(tree, node) {
  var p = node,
      q = node.L,
      parent = p.U;

  if (parent) {
    if (parent.L === p) parent.L = q;
    else parent.R = q;
  } else {
    tree._ = q;
  }

  q.U = parent;
  p.U = q;
  p.L = q.R;
  if (p.L) p.L.U = p;
  q.R = p;
}

function RedBlackFirst(node) {
  while (node.L) node = node.L;
  return node;
}

function createEdge(left, right, v0, v1) {
  var edge = [null, null],
      index = edges.push(edge) - 1;
  edge.left = left;
  edge.right = right;
  if (v0) setEdgeEnd(edge, left, right, v0);
  if (v1) setEdgeEnd(edge, right, left, v1);
  cells[left.index].halfedges.push(index);
  cells[right.index].halfedges.push(index);
  return edge;
}

function createBorderEdge(left, v0, v1) {
  var edge = [v0, v1];
  edge.left = left;
  return edge;
}

function setEdgeEnd(edge, left, right, vertex) {
  if (!edge[0] && !edge[1]) {
    edge[0] = vertex;
    edge.left = left;
    edge.right = right;
  } else if (edge.left === right) {
    edge[1] = vertex;
  } else {
    edge[0] = vertex;
  }
}

// Liang–Barsky line clipping.
function clipEdge(edge, x0, y0, x1, y1) {
  var a = edge[0],
      b = edge[1],
      ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (!(t0 > 0) && !(t1 < 1)) return true; // TODO Better check?

  if (t0 > 0) edge[0] = [ax + t0 * dx, ay + t0 * dy];
  if (t1 < 1) edge[1] = [ax + t1 * dx, ay + t1 * dy];
  return true;
}

function connectEdge(edge, x0, y0, x1, y1) {
  var v1 = edge[1];
  if (v1) return true;

  var v0 = edge[0],
      left = edge.left,
      right = edge.right,
      lx = left[0],
      ly = left[1],
      rx = right[0],
      ry = right[1],
      fx = (lx + rx) / 2,
      fy = (ly + ry) / 2,
      fm,
      fb;

  if (ry === ly) {
    if (fx < x0 || fx >= x1) return;
    if (lx > rx) {
      if (!v0) v0 = [fx, y0];
      else if (v0[1] >= y1) return;
      v1 = [fx, y1];
    } else {
      if (!v0) v0 = [fx, y1];
      else if (v0[1] < y0) return;
      v1 = [fx, y0];
    }
  } else {
    fm = (lx - rx) / (ry - ly);
    fb = fy - fm * fx;
    if (fm < -1 || fm > 1) {
      if (lx > rx) {
        if (!v0) v0 = [(y0 - fb) / fm, y0];
        else if (v0[1] >= y1) return;
        v1 = [(y1 - fb) / fm, y1];
      } else {
        if (!v0) v0 = [(y1 - fb) / fm, y1];
        else if (v0[1] < y0) return;
        v1 = [(y0 - fb) / fm, y0];
      }
    } else {
      if (ly < ry) {
        if (!v0) v0 = [x0, fm * x0 + fb];
        else if (v0[0] >= x1) return;
        v1 = [x1, fm * x1 + fb];
      } else {
        if (!v0) v0 = [x1, fm * x1 + fb];
        else if (v0[0] < x0) return;
        v1 = [x0, fm * x0 + fb];
      }
    }
  }

  edge[0] = v0;
  edge[1] = v1;
  return true;
}

function clipEdges(x0, y0, x1, y1) {
  var i = edges.length,
      edge;

  while (i--) {
    if (!connectEdge(edge = edges[i], x0, y0, x1, y1)
        || !clipEdge(edge, x0, y0, x1, y1)
        || !(Math.abs(edge[0][0] - edge[1][0]) > epsilon$4
            || Math.abs(edge[0][1] - edge[1][1]) > epsilon$4)) {
      delete edges[i];
    }
  }
}

function createCell(site) {
  return cells[site.index] = {
    site: site,
    halfedges: []
  };
}

function cellHalfedgeAngle(cell, edge) {
  var site = cell.site,
      va = edge.left,
      vb = edge.right;
  if (site === vb) vb = va, va = site;
  if (vb) return Math.atan2(vb[1] - va[1], vb[0] - va[0]);
  if (site === va) va = edge[1], vb = edge[0];
  else va = edge[0], vb = edge[1];
  return Math.atan2(va[0] - vb[0], vb[1] - va[1]);
}

function cellHalfedgeStart(cell, edge) {
  return edge[+(edge.left !== cell.site)];
}

function cellHalfedgeEnd(cell, edge) {
  return edge[+(edge.left === cell.site)];
}

function sortCellHalfedges() {
  for (var i = 0, n = cells.length, cell, halfedges, j, m; i < n; ++i) {
    if ((cell = cells[i]) && (m = (halfedges = cell.halfedges).length)) {
      var index = new Array(m),
          array = new Array(m);
      for (j = 0; j < m; ++j) index[j] = j, array[j] = cellHalfedgeAngle(cell, edges[halfedges[j]]);
      index.sort(function(i, j) { return array[j] - array[i]; });
      for (j = 0; j < m; ++j) array[j] = halfedges[index[j]];
      for (j = 0; j < m; ++j) halfedges[j] = array[j];
    }
  }
}

function clipCells(x0, y0, x1, y1) {
  var nCells = cells.length,
      iCell,
      cell,
      site,
      iHalfedge,
      halfedges,
      nHalfedges,
      start,
      startX,
      startY,
      end,
      endX,
      endY,
      cover = true;

  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = cells[iCell]) {
      site = cell.site;
      halfedges = cell.halfedges;
      iHalfedge = halfedges.length;

      // Remove any dangling clipped edges.
      while (iHalfedge--) {
        if (!edges[halfedges[iHalfedge]]) {
          halfedges.splice(iHalfedge, 1);
        }
      }

      // Insert any border edges as necessary.
      iHalfedge = 0, nHalfedges = halfedges.length;
      while (iHalfedge < nHalfedges) {
        end = cellHalfedgeEnd(cell, edges[halfedges[iHalfedge]]), endX = end[0], endY = end[1];
        start = cellHalfedgeStart(cell, edges[halfedges[++iHalfedge % nHalfedges]]), startX = start[0], startY = start[1];
        if (Math.abs(endX - startX) > epsilon$4 || Math.abs(endY - startY) > epsilon$4) {
          halfedges.splice(iHalfedge, 0, edges.push(createBorderEdge(site, end,
              Math.abs(endX - x0) < epsilon$4 && y1 - endY > epsilon$4 ? [x0, Math.abs(startX - x0) < epsilon$4 ? startY : y1]
              : Math.abs(endY - y1) < epsilon$4 && x1 - endX > epsilon$4 ? [Math.abs(startY - y1) < epsilon$4 ? startX : x1, y1]
              : Math.abs(endX - x1) < epsilon$4 && endY - y0 > epsilon$4 ? [x1, Math.abs(startX - x1) < epsilon$4 ? startY : y0]
              : Math.abs(endY - y0) < epsilon$4 && endX - x0 > epsilon$4 ? [Math.abs(startY - y0) < epsilon$4 ? startX : x0, y0]
              : null)) - 1);
          ++nHalfedges;
        }
      }

      if (nHalfedges) cover = false;
    }
  }

  // If there weren’t any edges, have the closest site cover the extent.
  // It doesn’t matter which corner of the extent we measure!
  if (cover) {
    var dx, dy, d2, dc = Infinity;

    for (iCell = 0, cover = null; iCell < nCells; ++iCell) {
      if (cell = cells[iCell]) {
        site = cell.site;
        dx = site[0] - x0;
        dy = site[1] - y0;
        d2 = dx * dx + dy * dy;
        if (d2 < dc) dc = d2, cover = cell;
      }
    }

    if (cover) {
      var v00 = [x0, y0], v01 = [x0, y1], v11 = [x1, y1], v10 = [x1, y0];
      cover.halfedges.push(
        edges.push(createBorderEdge(site = cover.site, v00, v01)) - 1,
        edges.push(createBorderEdge(site, v01, v11)) - 1,
        edges.push(createBorderEdge(site, v11, v10)) - 1,
        edges.push(createBorderEdge(site, v10, v00)) - 1
      );
    }
  }

  // Lastly delete any cells with no edges; these were entirely clipped.
  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = cells[iCell]) {
      if (!cell.halfedges.length) {
        delete cells[iCell];
      }
    }
  }
}

var circlePool = [];

var firstCircle;

function Circle() {
  RedBlackNode(this);
  this.x =
  this.y =
  this.arc =
  this.site =
  this.cy = null;
}

function attachCircle(arc) {
  var lArc = arc.P,
      rArc = arc.N;

  if (!lArc || !rArc) return;

  var lSite = lArc.site,
      cSite = arc.site,
      rSite = rArc.site;

  if (lSite === rSite) return;

  var bx = cSite[0],
      by = cSite[1],
      ax = lSite[0] - bx,
      ay = lSite[1] - by,
      cx = rSite[0] - bx,
      cy = rSite[1] - by;

  var d = 2 * (ax * cy - ay * cx);
  if (d >= -epsilon2$2) return;

  var ha = ax * ax + ay * ay,
      hc = cx * cx + cy * cy,
      x = (cy * ha - ay * hc) / d,
      y = (ax * hc - cx * ha) / d;

  var circle = circlePool.pop() || new Circle;
  circle.arc = arc;
  circle.site = cSite;
  circle.x = x + bx;
  circle.y = (circle.cy = y + by) + Math.sqrt(x * x + y * y); // y bottom

  arc.circle = circle;

  var before = null,
      node = circles._;

  while (node) {
    if (circle.y < node.y || (circle.y === node.y && circle.x <= node.x)) {
      if (node.L) node = node.L;
      else { before = node.P; break; }
    } else {
      if (node.R) node = node.R;
      else { before = node; break; }
    }
  }

  circles.insert(before, circle);
  if (!before) firstCircle = circle;
}

function detachCircle(arc) {
  var circle = arc.circle;
  if (circle) {
    if (!circle.P) firstCircle = circle.N;
    circles.remove(circle);
    circlePool.push(circle);
    RedBlackNode(circle);
    arc.circle = null;
  }
}

var beachPool = [];

function Beach() {
  RedBlackNode(this);
  this.edge =
  this.site =
  this.circle = null;
}

function createBeach(site) {
  var beach = beachPool.pop() || new Beach;
  beach.site = site;
  return beach;
}

function detachBeach(beach) {
  detachCircle(beach);
  beaches.remove(beach);
  beachPool.push(beach);
  RedBlackNode(beach);
}

function removeBeach(beach) {
  var circle = beach.circle,
      x = circle.x,
      y = circle.cy,
      vertex = [x, y],
      previous = beach.P,
      next = beach.N,
      disappearing = [beach];

  detachBeach(beach);

  var lArc = previous;
  while (lArc.circle
      && Math.abs(x - lArc.circle.x) < epsilon$4
      && Math.abs(y - lArc.circle.cy) < epsilon$4) {
    previous = lArc.P;
    disappearing.unshift(lArc);
    detachBeach(lArc);
    lArc = previous;
  }

  disappearing.unshift(lArc);
  detachCircle(lArc);

  var rArc = next;
  while (rArc.circle
      && Math.abs(x - rArc.circle.x) < epsilon$4
      && Math.abs(y - rArc.circle.cy) < epsilon$4) {
    next = rArc.N;
    disappearing.push(rArc);
    detachBeach(rArc);
    rArc = next;
  }

  disappearing.push(rArc);
  detachCircle(rArc);

  var nArcs = disappearing.length,
      iArc;
  for (iArc = 1; iArc < nArcs; ++iArc) {
    rArc = disappearing[iArc];
    lArc = disappearing[iArc - 1];
    setEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
  }

  lArc = disappearing[0];
  rArc = disappearing[nArcs - 1];
  rArc.edge = createEdge(lArc.site, rArc.site, null, vertex);

  attachCircle(lArc);
  attachCircle(rArc);
}

function addBeach(site) {
  var x = site[0],
      directrix = site[1],
      lArc,
      rArc,
      dxl,
      dxr,
      node = beaches._;

  while (node) {
    dxl = leftBreakPoint(node, directrix) - x;
    if (dxl > epsilon$4) node = node.L; else {
      dxr = x - rightBreakPoint(node, directrix);
      if (dxr > epsilon$4) {
        if (!node.R) {
          lArc = node;
          break;
        }
        node = node.R;
      } else {
        if (dxl > -epsilon$4) {
          lArc = node.P;
          rArc = node;
        } else if (dxr > -epsilon$4) {
          lArc = node;
          rArc = node.N;
        } else {
          lArc = rArc = node;
        }
        break;
      }
    }
  }

  createCell(site);
  var newArc = createBeach(site);
  beaches.insert(lArc, newArc);

  if (!lArc && !rArc) return;

  if (lArc === rArc) {
    detachCircle(lArc);
    rArc = createBeach(lArc.site);
    beaches.insert(newArc, rArc);
    newArc.edge = rArc.edge = createEdge(lArc.site, newArc.site);
    attachCircle(lArc);
    attachCircle(rArc);
    return;
  }

  if (!rArc) { // && lArc
    newArc.edge = createEdge(lArc.site, newArc.site);
    return;
  }

  // else lArc !== rArc
  detachCircle(lArc);
  detachCircle(rArc);

  var lSite = lArc.site,
      ax = lSite[0],
      ay = lSite[1],
      bx = site[0] - ax,
      by = site[1] - ay,
      rSite = rArc.site,
      cx = rSite[0] - ax,
      cy = rSite[1] - ay,
      d = 2 * (bx * cy - by * cx),
      hb = bx * bx + by * by,
      hc = cx * cx + cy * cy,
      vertex = [(cy * hb - by * hc) / d + ax, (bx * hc - cx * hb) / d + ay];

  setEdgeEnd(rArc.edge, lSite, rSite, vertex);
  newArc.edge = createEdge(lSite, site, null, vertex);
  rArc.edge = createEdge(site, rSite, null, vertex);
  attachCircle(lArc);
  attachCircle(rArc);
}

function leftBreakPoint(arc, directrix) {
  var site = arc.site,
      rfocx = site[0],
      rfocy = site[1],
      pby2 = rfocy - directrix;

  if (!pby2) return rfocx;

  var lArc = arc.P;
  if (!lArc) return -Infinity;

  site = lArc.site;
  var lfocx = site[0],
      lfocy = site[1],
      plby2 = lfocy - directrix;

  if (!plby2) return lfocx;

  var hl = lfocx - rfocx,
      aby2 = 1 / pby2 - 1 / plby2,
      b = hl / plby2;

  if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;

  return (rfocx + lfocx) / 2;
}

function rightBreakPoint(arc, directrix) {
  var rArc = arc.N;
  if (rArc) return leftBreakPoint(rArc, directrix);
  var site = arc.site;
  return site[1] === directrix ? site[0] : Infinity;
}

var epsilon$4 = 1e-6;
var epsilon2$2 = 1e-12;
var beaches;
var cells;
var circles;
var edges;

function triangleArea(a, b, c) {
  return (a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]);
}

function lexicographic(a, b) {
  return b[1] - a[1]
      || b[0] - a[0];
}

function Diagram(sites, extent) {
  var site = sites.sort(lexicographic).pop(),
      x,
      y,
      circle;

  edges = [];
  cells = new Array(sites.length);
  beaches = new RedBlackTree;
  circles = new RedBlackTree;

  while (true) {
    circle = firstCircle;
    if (site && (!circle || site[1] < circle.y || (site[1] === circle.y && site[0] < circle.x))) {
      if (site[0] !== x || site[1] !== y) {
        addBeach(site);
        x = site[0], y = site[1];
      }
      site = sites.pop();
    } else if (circle) {
      removeBeach(circle.arc);
    } else {
      break;
    }
  }

  sortCellHalfedges();

  if (extent) {
    var x0 = +extent[0][0],
        y0 = +extent[0][1],
        x1 = +extent[1][0],
        y1 = +extent[1][1];
    clipEdges(x0, y0, x1, y1);
    clipCells(x0, y0, x1, y1);
  }

  this.edges = edges;
  this.cells = cells;

  beaches =
  circles =
  edges =
  cells = null;
}

Diagram.prototype = {
  constructor: Diagram,

  polygons: function() {
    var edges = this.edges;

    return this.cells.map(function(cell) {
      var polygon = cell.halfedges.map(function(i) { return cellHalfedgeStart(cell, edges[i]); });
      polygon.data = cell.site.data;
      return polygon;
    });
  },

  triangles: function() {
    var triangles = [],
        edges = this.edges;

    this.cells.forEach(function(cell, i) {
      if (!(m = (halfedges = cell.halfedges).length)) return;
      var site = cell.site,
          halfedges,
          j = -1,
          m,
          s0,
          e1 = edges[halfedges[m - 1]],
          s1 = e1.left === site ? e1.right : e1.left;

      while (++j < m) {
        s0 = s1;
        e1 = edges[halfedges[j]];
        s1 = e1.left === site ? e1.right : e1.left;
        if (s0 && s1 && i < s0.index && i < s1.index && triangleArea(site, s0, s1) < 0) {
          triangles.push([site.data, s0.data, s1.data]);
        }
      }
    });

    return triangles;
  },

  links: function() {
    return this.edges.filter(function(edge) {
      return edge.right;
    }).map(function(edge) {
      return {
        source: edge.left.data,
        target: edge.right.data
      };
    });
  },

  find: function(x, y, radius) {
    var that = this, i0, i1 = that._found || 0, n = that.cells.length, cell;

    // Use the previously-found cell, or start with an arbitrary one.
    while (!(cell = that.cells[i1])) if (++i1 >= n) return null;
    var dx = x - cell.site[0], dy = y - cell.site[1], d2 = dx * dx + dy * dy;

    // Traverse the half-edges to find a closer cell, if any.
    do {
      cell = that.cells[i0 = i1], i1 = null;
      cell.halfedges.forEach(function(e) {
        var edge = that.edges[e], v = edge.left;
        if ((v === cell.site || !v) && !(v = edge.right)) return;
        var vx = x - v[0], vy = y - v[1], v2 = vx * vx + vy * vy;
        if (v2 < d2) d2 = v2, i1 = v.index;
      });
    } while (i1 !== null);

    that._found = i0;

    return radius == null || d2 <= radius * radius ? cell.site : null;
  }
};

function voronoi() {
  var x = x$4,
      y = y$4,
      extent = null;

  function voronoi(data) {
    return new Diagram(data.map(function(d, i) {
      var s = [Math.round(x(d, i, data) / epsilon$4) * epsilon$4, Math.round(y(d, i, data) / epsilon$4) * epsilon$4];
      s.index = i;
      s.data = d;
      return s;
    }), extent);
  }

  voronoi.polygons = function(data) {
    return voronoi(data).polygons();
  };

  voronoi.links = function(data) {
    return voronoi(data).links();
  };

  voronoi.triangles = function(data) {
    return voronoi(data).triangles();
  };

  voronoi.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant$c(+_), voronoi) : x;
  };

  voronoi.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant$c(+_), voronoi) : y;
  };

  voronoi.extent = function(_) {
    return arguments.length ? (extent = _ == null ? null : [[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]], voronoi) : extent && [[extent[0][0], extent[0][1]], [extent[1][0], extent[1][1]]];
  };

  voronoi.size = function(_) {
    return arguments.length ? (extent = _ == null ? null : [[0, 0], [+_[0], +_[1]]], voronoi) : extent && [extent[1][0] - extent[0][0], extent[1][1] - extent[0][1]];
  };

  return voronoi;
}

function constant$d(x) {
  return function() {
    return x;
  };
}

function ZoomEvent(target, type, transform) {
  this.target = target;
  this.type = type;
  this.transform = transform;
}

function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}

Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};

var identity$9 = new Transform(1, 0, 0);

transform$1.prototype = Transform.prototype;

function transform$1(node) {
  return node.__zoom || identity$9;
}

function nopropagation$2() {
  event.stopImmediatePropagation();
}

function noevent$2() {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// Ignore right-click, since that should open the context menu.
function defaultFilter$2() {
  return !event.button;
}

function defaultExtent$1() {
  var e = this, w, h;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    w = e.width.baseVal.value;
    h = e.height.baseVal.value;
  } else {
    w = e.clientWidth;
    h = e.clientHeight;
  }
  return [[0, 0], [w, h]];
}

function defaultTransform() {
  return this.__zoom || identity$9;
}

function defaultWheelDelta() {
  return -event.deltaY * (event.deltaMode ? 120 : 1) / 500;
}

function defaultTouchable$1() {
  return "ontouchstart" in this;
}

function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
      dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
      dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
      dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}

function zoom() {
  var filter = defaultFilter$2,
      extent = defaultExtent$1,
      constrain = defaultConstrain,
      wheelDelta = defaultWheelDelta,
      touchable = defaultTouchable$1,
      scaleExtent = [0, Infinity],
      translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
      duration = 250,
      interpolate = interpolateZoom,
      gestures = [],
      listeners = dispatch("start", "zoom", "end"),
      touchstarting,
      touchending,
      touchDelay = 500,
      wheelDelay = 150,
      clickDistance2 = 0;

  function zoom(selection) {
    selection
        .property("__zoom", defaultTransform)
        .on("wheel.zoom", wheeled)
        .on("mousedown.zoom", mousedowned)
        .on("dblclick.zoom", dblclicked)
      .filter(touchable)
        .on("touchstart.zoom", touchstarted)
        .on("touchmove.zoom", touchmoved)
        .on("touchend.zoom touchcancel.zoom", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  zoom.transform = function(collection, transform) {
    var selection = collection.selection ? collection.selection() : collection;
    selection.property("__zoom", defaultTransform);
    if (collection !== selection) {
      schedule(collection, transform);
    } else {
      selection.interrupt().each(function() {
        gesture(this, arguments)
            .start()
            .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
            .end();
      });
    }
  };

  zoom.scaleBy = function(selection, k) {
    zoom.scaleTo(selection, function() {
      var k0 = this.__zoom.k,
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    });
  };

  zoom.scaleTo = function(selection, k) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t0 = this.__zoom,
          p0 = centroid(e),
          p1 = t0.invert(p0),
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    });
  };

  zoom.translateBy = function(selection, x, y) {
    zoom.transform(selection, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments), translateExtent);
    });
  };

  zoom.translateTo = function(selection, x, y) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t = this.__zoom,
          p = centroid(e);
      return constrain(identity$9.translate(p[0], p[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e, translateExtent);
    });
  };

  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
  }

  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
  }

  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }

  function schedule(transition, transform, center) {
    transition
        .on("start.zoom", function() { gesture(this, arguments).start(); })
        .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).end(); })
        .tween("zoom", function() {
          var that = this,
              args = arguments,
              g = gesture(that, args),
              e = extent.apply(that, args),
              p = center || centroid(e),
              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
              a = that.__zoom,
              b = typeof transform === "function" ? transform.apply(that, args) : transform,
              i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
          return function(t) {
            if (t === 1) t = b; // Avoid rounding error on end.
            else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
            g.zoom(null, t);
          };
        });
  }

  function gesture(that, args) {
    for (var i = 0, n = gestures.length, g; i < n; ++i) {
      if ((g = gestures[i]).that === that) {
        return g;
      }
    }
    return new Gesture(that, args);
  }

  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.index = -1;
    this.active = 0;
    this.extent = extent.apply(that, args);
  }

  Gesture.prototype = {
    start: function() {
      if (++this.active === 1) {
        this.index = gestures.push(this) - 1;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        gestures.splice(this.index, 1);
        this.index = -1;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      customEvent(new ZoomEvent(zoom, type, this.that.__zoom), listeners.apply, listeners, [type, this.that, this.args]);
    }
  };

  function wheeled() {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, arguments),
        t = this.__zoom,
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
        p = mouse(this);

    // If the mouse is in the same location as before, reuse it.
    // If there were recent wheel events, reset the wheel idle timeout.
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    }

    // If this wheel event won’t trigger a transform change, ignore it.
    else if (t.k === k) return;

    // Otherwise, capture the mouse point and location at the start.
    else {
      g.mouse = [p, t.invert(p)];
      interrupt(this);
      g.start();
    }

    noevent$2();
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }

  function mousedowned() {
    if (touchending || !filter.apply(this, arguments)) return;
    var g = gesture(this, arguments),
        v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
        p = mouse(this),
        x0 = event.clientX,
        y0 = event.clientY;

    dragDisable(event.view);
    nopropagation$2();
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt(this);
    g.start();

    function mousemoved() {
      noevent$2();
      if (!g.moved) {
        var dx = event.clientX - x0, dy = event.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = mouse(g.that), g.mouse[1]), g.extent, translateExtent));
    }

    function mouseupped() {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event.view, g.moved);
      noevent$2();
      g.end();
    }
  }

  function dblclicked() {
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom,
        p0 = mouse(this),
        p1 = t0.invert(p0),
        k1 = t0.k * (event.shiftKey ? 0.5 : 2),
        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, arguments), translateExtent);

    noevent$2();
    if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0);
    else select(this).call(zoom.transform, t1);
  }

  function touchstarted() {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, arguments),
        touches = event.changedTouches,
        started,
        n = touches.length, i, t, p;

    nopropagation$2();
    for (i = 0; i < n; ++i) {
      t = touches[i], p = touch(this, touches, t.identifier);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true;
      else if (!g.touch1) g.touch1 = p;
    }

    // If this is a dbltap, reroute to the (optional) dblclick.zoom handler.
    if (touchstarting) {
      touchstarting = clearTimeout(touchstarting);
      if (!g.touch1) {
        g.end();
        p = select(this).on("dblclick.zoom");
        if (p) p.apply(this, arguments);
        return;
      }
    }

    if (started) {
      touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
      interrupt(this);
      g.start();
    }
  }

  function touchmoved() {
    var g = gesture(this, arguments),
        touches = event.changedTouches,
        n = touches.length, i, t, p, l;

    noevent$2();
    if (touchstarting) touchstarting = clearTimeout(touchstarting);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = touch(this, touches, t.identifier);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1],
          p1 = g.touch1[0], l1 = g.touch1[1],
          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    }
    else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;
    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }

  function touchended() {
    var g = gesture(this, arguments),
        touches = event.changedTouches,
        n = touches.length, i, t;

    nopropagation$2();
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else g.end();
  }

  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant$d(+_), zoom) : wheelDelta;
  };

  zoom.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$d(!!_), zoom) : filter;
  };

  zoom.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$d(!!_), zoom) : touchable;
  };

  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant$d([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };

  zoom.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };

  zoom.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };

  zoom.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
  };

  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };

  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };

  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };

  zoom.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };

  return zoom;
}



var d3Core = /*#__PURE__*/Object.freeze({
  version: version,
  cluster: cluster,
  hierarchy: hierarchy,
  pack: index$2,
  packSiblings: siblings,
  packEnclose: enclose,
  partition: partition,
  stratify: stratify,
  tree: tree,
  treemap: index$3,
  treemapBinary: binary,
  treemapDice: treemapDice,
  treemapSlice: treemapSlice,
  treemapSliceDice: sliceDice,
  treemapSquarify: squarify,
  treemapResquarify: resquarify,
  bisect: bisectRight,
  bisectRight: bisectRight,
  bisectLeft: bisectLeft,
  ascending: ascending,
  bisector: bisector,
  cross: cross,
  descending: descending,
  deviation: deviation,
  extent: extent,
  histogram: histogram,
  thresholdFreedmanDiaconis: freedmanDiaconis,
  thresholdScott: scott,
  thresholdSturges: thresholdSturges,
  max: max,
  mean: mean,
  median: median,
  merge: merge,
  min: min,
  pairs: pairs,
  permute: permute,
  quantile: threshold,
  range: sequence,
  scan: scan,
  shuffle: shuffle,
  sum: sum,
  ticks: ticks,
  tickIncrement: tickIncrement,
  tickStep: tickStep,
  transpose: transpose,
  variance: variance,
  zip: zip,
  brush: brush,
  brushX: brushX,
  brushY: brushY,
  brushSelection: brushSelection,
  chord: chord,
  ribbon: ribbon,
  nest: nest,
  set: set$2,
  map: map$1,
  keys: keys,
  values: values,
  entries: entries,
  color: color,
  rgb: rgb,
  hsl: hsl,
  lab: lab,
  hcl: hcl,
  lch: lch,
  gray: gray,
  cubehelix: cubehelix,
  contours: contours,
  contourDensity: density,
  dispatch: dispatch,
  drag: drag,
  dragDisable: dragDisable,
  dragEnable: yesdrag,
  dsvFormat: dsvFormat,
  csvParse: csvParse,
  csvParseRows: csvParseRows,
  csvFormat: csvFormat,
  csvFormatBody: csvFormatBody,
  csvFormatRows: csvFormatRows,
  tsvParse: tsvParse,
  tsvParseRows: tsvParseRows,
  tsvFormat: tsvFormat,
  tsvFormatBody: tsvFormatBody,
  tsvFormatRows: tsvFormatRows,
  autoType: autoType,
  easeLinear: linear$1,
  easeQuad: quadInOut,
  easeQuadIn: quadIn,
  easeQuadOut: quadOut,
  easeQuadInOut: quadInOut,
  easeCubic: cubicInOut,
  easeCubicIn: cubicIn,
  easeCubicOut: cubicOut,
  easeCubicInOut: cubicInOut,
  easePoly: polyInOut,
  easePolyIn: polyIn,
  easePolyOut: polyOut,
  easePolyInOut: polyInOut,
  easeSin: sinInOut,
  easeSinIn: sinIn,
  easeSinOut: sinOut,
  easeSinInOut: sinInOut,
  easeExp: expInOut,
  easeExpIn: expIn,
  easeExpOut: expOut,
  easeExpInOut: expInOut,
  easeCircle: circleInOut,
  easeCircleIn: circleIn,
  easeCircleOut: circleOut,
  easeCircleInOut: circleInOut,
  easeBounce: bounceOut,
  easeBounceIn: bounceIn,
  easeBounceOut: bounceOut,
  easeBounceInOut: bounceInOut,
  easeBack: backInOut,
  easeBackIn: backIn,
  easeBackOut: backOut,
  easeBackInOut: backInOut,
  easeElastic: elasticOut,
  easeElasticIn: elasticIn,
  easeElasticOut: elasticOut,
  easeElasticInOut: elasticInOut,
  blob: blob,
  buffer: buffer,
  dsv: dsv,
  csv: csv$1,
  tsv: tsv$1,
  image: image,
  json: json,
  text: text,
  xml: xml,
  html: html,
  svg: svg,
  forceCenter: center$1,
  forceCollide: collide,
  forceLink: link,
  forceManyBody: manyBody,
  forceRadial: radial,
  forceSimulation: simulation,
  forceX: x$2,
  forceY: y$2,
  formatDefaultLocale: defaultLocale,
  get format () { return format; },
  get formatPrefix () { return formatPrefix; },
  formatLocale: formatLocale,
  formatSpecifier: formatSpecifier,
  precisionFixed: precisionFixed,
  precisionPrefix: precisionPrefix,
  precisionRound: precisionRound,
  geoArea: area$1,
  geoBounds: bounds,
  geoCentroid: centroid,
  geoCircle: circle,
  geoClipAntimeridian: clipAntimeridian,
  geoClipCircle: clipCircle,
  geoClipExtent: extent$1,
  geoClipRectangle: clipRectangle,
  geoContains: contains$1,
  geoDistance: distance,
  geoGraticule: graticule,
  geoGraticule10: graticule10,
  geoInterpolate: interpolate$1,
  geoLength: length$1,
  geoPath: index$1,
  geoAlbers: albers,
  geoAlbersUsa: albersUsa,
  geoAzimuthalEqualArea: azimuthalEqualArea,
  geoAzimuthalEqualAreaRaw: azimuthalEqualAreaRaw,
  geoAzimuthalEquidistant: azimuthalEquidistant,
  geoAzimuthalEquidistantRaw: azimuthalEquidistantRaw,
  geoConicConformal: conicConformal,
  geoConicConformalRaw: conicConformalRaw,
  geoConicEqualArea: conicEqualArea,
  geoConicEqualAreaRaw: conicEqualAreaRaw,
  geoConicEquidistant: conicEquidistant,
  geoConicEquidistantRaw: conicEquidistantRaw,
  geoEqualEarth: equalEarth,
  geoEqualEarthRaw: equalEarthRaw,
  geoEquirectangular: equirectangular,
  geoEquirectangularRaw: equirectangularRaw,
  geoGnomonic: gnomonic,
  geoGnomonicRaw: gnomonicRaw,
  geoIdentity: identity$5,
  geoProjection: projection,
  geoProjectionMutator: projectionMutator,
  geoMercator: mercator,
  geoMercatorRaw: mercatorRaw,
  geoNaturalEarth1: naturalEarth1,
  geoNaturalEarth1Raw: naturalEarth1Raw,
  geoOrthographic: orthographic,
  geoOrthographicRaw: orthographicRaw,
  geoStereographic: stereographic,
  geoStereographicRaw: stereographicRaw,
  geoTransverseMercator: transverseMercator,
  geoTransverseMercatorRaw: transverseMercatorRaw,
  geoRotation: rotation,
  geoStream: geoStream,
  geoTransform: transform,
  axisTop: axisTop,
  axisRight: axisRight,
  axisBottom: axisBottom,
  axisLeft: axisLeft,
  interpolate: interpolateValue,
  interpolateArray: array$1,
  interpolateBasis: basis$1,
  interpolateBasisClosed: basisClosed,
  interpolateDate: date,
  interpolateDiscrete: discrete,
  interpolateHue: hue$1,
  interpolateNumber: interpolateNumber,
  interpolateObject: object,
  interpolateRound: interpolateRound,
  interpolateString: interpolateString,
  interpolateTransformCss: interpolateTransformCss,
  interpolateTransformSvg: interpolateTransformSvg,
  interpolateZoom: interpolateZoom,
  interpolateRgb: interpolateRgb,
  interpolateRgbBasis: rgbBasis,
  interpolateRgbBasisClosed: rgbBasisClosed,
  interpolateHsl: hsl$2,
  interpolateHslLong: hslLong,
  interpolateLab: lab$1,
  interpolateHcl: hcl$2,
  interpolateHclLong: hclLong,
  interpolateCubehelix: cubehelix$2,
  interpolateCubehelixLong: cubehelixLong,
  piecewise: piecewise,
  quantize: quantize,
  path: path,
  polygonArea: area$2,
  polygonCentroid: centroid$1,
  polygonHull: hull,
  polygonContains: contains$2,
  polygonLength: length$2,
  quadtree: quadtree,
  randomUniform: uniform,
  randomNormal: normal,
  randomLogNormal: logNormal,
  randomBates: bates,
  randomIrwinHall: irwinHall,
  randomExponential: exponential$1,
  scaleBand: band,
  scalePoint: point$1,
  scaleIdentity: identity$7,
  scaleLinear: linear$2,
  scaleLog: log$1,
  scaleSymlog: symlog,
  scaleOrdinal: ordinal,
  scaleImplicit: implicit,
  scalePow: pow$1,
  scaleSqrt: sqrt$1,
  scaleQuantile: quantile,
  scaleQuantize: quantize$1,
  scaleThreshold: threshold$1,
  scaleTime: time,
  scaleUtc: utcTime,
  scaleSequential: sequential,
  scaleSequentialLog: sequentialLog,
  scaleSequentialPow: sequentialPow,
  scaleSequentialSqrt: sequentialSqrt,
  scaleSequentialSymlog: sequentialSymlog,
  scaleSequentialQuantile: sequentialQuantile,
  scaleDiverging: diverging,
  scaleDivergingLog: divergingLog,
  scaleDivergingPow: divergingPow,
  scaleDivergingSqrt: divergingSqrt,
  scaleDivergingSymlog: divergingSymlog,
  tickFormat: tickFormat,
  schemeCategory10: category10,
  schemeAccent: Accent,
  schemeDark2: Dark2,
  schemePaired: Paired,
  schemePastel1: Pastel1,
  schemePastel2: Pastel2,
  schemeSet1: Set1,
  schemeSet2: Set2,
  schemeSet3: Set3,
  interpolateBrBG: BrBG,
  schemeBrBG: scheme,
  interpolatePRGn: PRGn,
  schemePRGn: scheme$1,
  interpolatePiYG: PiYG,
  schemePiYG: scheme$2,
  interpolatePuOr: PuOr,
  schemePuOr: scheme$3,
  interpolateRdBu: RdBu,
  schemeRdBu: scheme$4,
  interpolateRdGy: RdGy,
  schemeRdGy: scheme$5,
  interpolateRdYlBu: RdYlBu,
  schemeRdYlBu: scheme$6,
  interpolateRdYlGn: RdYlGn,
  schemeRdYlGn: scheme$7,
  interpolateSpectral: Spectral,
  schemeSpectral: scheme$8,
  interpolateBuGn: BuGn,
  schemeBuGn: scheme$9,
  interpolateBuPu: BuPu,
  schemeBuPu: scheme$a,
  interpolateGnBu: GnBu,
  schemeGnBu: scheme$b,
  interpolateOrRd: OrRd,
  schemeOrRd: scheme$c,
  interpolatePuBuGn: PuBuGn,
  schemePuBuGn: scheme$d,
  interpolatePuBu: PuBu,
  schemePuBu: scheme$e,
  interpolatePuRd: PuRd,
  schemePuRd: scheme$f,
  interpolateRdPu: RdPu,
  schemeRdPu: scheme$g,
  interpolateYlGnBu: YlGnBu,
  schemeYlGnBu: scheme$h,
  interpolateYlGn: YlGn,
  schemeYlGn: scheme$i,
  interpolateYlOrBr: YlOrBr,
  schemeYlOrBr: scheme$j,
  interpolateYlOrRd: YlOrRd,
  schemeYlOrRd: scheme$k,
  interpolateBlues: Blues,
  schemeBlues: scheme$l,
  interpolateGreens: Greens,
  schemeGreens: scheme$m,
  interpolateGreys: Greys,
  schemeGreys: scheme$n,
  interpolatePurples: Purples,
  schemePurples: scheme$o,
  interpolateReds: Reds,
  schemeReds: scheme$p,
  interpolateOranges: Oranges,
  schemeOranges: scheme$q,
  interpolateCubehelixDefault: cubehelix$3,
  interpolateRainbow: rainbow,
  interpolateWarm: warm,
  interpolateCool: cool,
  interpolateSinebow: sinebow,
  interpolateViridis: viridis,
  interpolateMagma: magma,
  interpolateInferno: inferno,
  interpolatePlasma: plasma,
  create: create,
  creator: creator,
  local: local,
  matcher: matcher,
  mouse: mouse,
  namespace: namespace,
  namespaces: namespaces,
  clientPoint: point,
  select: select,
  selectAll: selectAll,
  selection: selection,
  selector: selector,
  selectorAll: selectorAll,
  style: styleValue,
  touch: touch,
  touches: touches,
  window: defaultView,
  get event () { return event; },
  customEvent: customEvent,
  arc: arc,
  area: area$3,
  line: line,
  pie: pie,
  areaRadial: areaRadial,
  radialArea: areaRadial,
  lineRadial: lineRadial$1,
  radialLine: lineRadial$1,
  pointRadial: pointRadial,
  linkHorizontal: linkHorizontal,
  linkVertical: linkVertical,
  linkRadial: linkRadial,
  symbol: symbol,
  symbols: symbols,
  symbolCircle: circle$2,
  symbolCross: cross$2,
  symbolDiamond: diamond,
  symbolSquare: square,
  symbolStar: star,
  symbolTriangle: triangle,
  symbolWye: wye,
  curveBasisClosed: basisClosed$1,
  curveBasisOpen: basisOpen,
  curveBasis: basis$2,
  curveBundle: bundle,
  curveCardinalClosed: cardinalClosed,
  curveCardinalOpen: cardinalOpen,
  curveCardinal: cardinal,
  curveCatmullRomClosed: catmullRomClosed,
  curveCatmullRomOpen: catmullRomOpen,
  curveCatmullRom: catmullRom,
  curveLinearClosed: linearClosed,
  curveLinear: curveLinear,
  curveMonotoneX: monotoneX,
  curveMonotoneY: monotoneY,
  curveNatural: natural,
  curveStep: step,
  curveStepAfter: stepAfter,
  curveStepBefore: stepBefore,
  stack: stack,
  stackOffsetExpand: expand,
  stackOffsetDiverging: diverging$1,
  stackOffsetNone: none$1,
  stackOffsetSilhouette: silhouette,
  stackOffsetWiggle: wiggle,
  stackOrderAppearance: appearance,
  stackOrderAscending: ascending$3,
  stackOrderDescending: descending$2,
  stackOrderInsideOut: insideOut,
  stackOrderNone: none$2,
  stackOrderReverse: reverse,
  timeInterval: newInterval,
  timeMillisecond: millisecond,
  timeMilliseconds: milliseconds,
  utcMillisecond: millisecond,
  utcMilliseconds: milliseconds,
  timeSecond: second,
  timeSeconds: seconds,
  utcSecond: second,
  utcSeconds: seconds,
  timeMinute: minute,
  timeMinutes: minutes,
  timeHour: hour,
  timeHours: hours,
  timeDay: day,
  timeDays: days,
  timeWeek: sunday,
  timeWeeks: sundays,
  timeSunday: sunday,
  timeSundays: sundays,
  timeMonday: monday,
  timeMondays: mondays,
  timeTuesday: tuesday,
  timeTuesdays: tuesdays,
  timeWednesday: wednesday,
  timeWednesdays: wednesdays,
  timeThursday: thursday,
  timeThursdays: thursdays,
  timeFriday: friday,
  timeFridays: fridays,
  timeSaturday: saturday,
  timeSaturdays: saturdays,
  timeMonth: month,
  timeMonths: months,
  timeYear: year,
  timeYears: years,
  utcMinute: utcMinute,
  utcMinutes: utcMinutes,
  utcHour: utcHour,
  utcHours: utcHours,
  utcDay: utcDay,
  utcDays: utcDays,
  utcWeek: utcSunday,
  utcWeeks: utcSundays,
  utcSunday: utcSunday,
  utcSundays: utcSundays,
  utcMonday: utcMonday,
  utcMondays: utcMondays,
  utcTuesday: utcTuesday,
  utcTuesdays: utcTuesdays,
  utcWednesday: utcWednesday,
  utcWednesdays: utcWednesdays,
  utcThursday: utcThursday,
  utcThursdays: utcThursdays,
  utcFriday: utcFriday,
  utcFridays: utcFridays,
  utcSaturday: utcSaturday,
  utcSaturdays: utcSaturdays,
  utcMonth: utcMonth,
  utcMonths: utcMonths,
  utcYear: utcYear,
  utcYears: utcYears,
  timeFormatDefaultLocale: defaultLocale$1,
  get timeFormat () { return timeFormat; },
  get timeParse () { return timeParse; },
  get utcFormat () { return utcFormat; },
  get utcParse () { return utcParse; },
  timeFormatLocale: formatLocale$1,
  isoFormat: formatIso,
  isoParse: parseIso,
  now: now,
  timer: timer,
  timerFlush: timerFlush,
  timeout: timeout$1,
  interval: interval$1,
  transition: transition,
  active: active,
  interrupt: interrupt,
  voronoi: voronoi,
  zoom: zoom,
  zoomTransform: transform$1,
  zoomIdentity: identity$9
});

var RadiusGauge = function RadiusGauge(_ref) {
  var width = _ref.width,
      height = _ref.height,
      score = _ref.score;
  var cx = 150;
  var cy = 103;
  var radius = 103;
  var angleScale = linear$2().domain([0, 1]).range([0, 180]);

  if (score >= 0 && score <= 1) {
    return React__default.createElement("svg", {
      width: width,
      height: height,
      transform: 'translate(-26, 20)'
    }, React__default.createElement("defs", null, React__default.createElement("linearGradient", {
      id: 'gaugeGradient',
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "0%",
      spreadMethod: "pad"
    }, React__default.createElement("stop", {
      offset: "0%",
      stopColor: "#189bff",
      stopOpacity: 1
    }), React__default.createElement("stop", {
      offset: "100%",
      stopColor: "#002d4f",
      stopOpacity: 1
    }))), React__default.createElement("g", {
      transform: 'translate(0, 20)'
    }, React__default.createElement("path", {
      d: "M 50,160 A ".concat(radius, " ").concat(radius, " 0 1 1 250 160"),
      fill: 'none',
      stroke: 'url(#gaugeGradient)',
      strokeWidth: '10'
    })), React__default.createElement("path", {
      transform: "translate(75, 150) rotate(".concat(angleScale(score), ", 75, 3.1)"),
      fill: "#189BFF",
      fillRule: "evenodd",
      d: "M1.605 4.5l64.83 2.434A3.437 3.437 0 0 0 70 3.5 3.437 3.437 0 0 0 66.434.066L1.605 2.5a1 1 0 0 0 0 1.998z"
    }), React__default.createElement("g", {
      transform: 'translate(0, 55)',
      className: styles$1.gauge_point
    }, React__default.createElement("text", {
      x: cx - Math.round(120 * Math.cos(0)),
      y: cy - Math.round(120 * Math.sin(0))
    }, "0"), React__default.createElement("text", {
      x: cx - Math.round(120 * Math.cos(Math.PI / 4)),
      y: cy - Math.round(120 * Math.sin(Math.PI / 4))
    }, "0.25"), React__default.createElement("text", {
      x: cx + Math.round(120 * Math.cos(Math.PI / 2)),
      y: cy - Math.round(120 * Math.sin(Math.PI / 2))
    }, "0.5"), React__default.createElement("text", {
      x: cx + Math.round(120 * Math.cos(Math.PI / 4)),
      y: cy - Math.round(120 * Math.sin(Math.PI / 4))
    }, "0.75"), React__default.createElement("text", {
      x: cx + Math.round(120 * Math.cos(0)),
      y: cy - Math.round(120 * Math.sin(0))
    }, "1.0")), React__default.createElement("g", {
      transform: 'translate(150, 200)',
      className: styles$1.gauge_score
    }, React__default.createElement("text", null, "".concat(score).slice(0, 4))));
  } else {
    return React__default.createElement("div", null, "Invalid Score");
  }
};

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var scc = stronglyConnectedComponents;

function stronglyConnectedComponents(adjList) {
  var numVertices = adjList.length;
  var index = new Array(numVertices);
  var lowValue = new Array(numVertices);
  var active = new Array(numVertices);
  var child = new Array(numVertices);
  var scc = new Array(numVertices);
  var sccLinks = new Array(numVertices);
  
  //Initialize tables
  for(var i=0; i<numVertices; ++i) {
    index[i] = -1;
    lowValue[i] = 0;
    active[i] = false;
    child[i] = 0;
    scc[i] = -1;
    sccLinks[i] = [];
  }

  // The strongConnect function
  var count = 0;
  var components = [];
  var sccAdjList = [];

  function strongConnect(v) {
    // To avoid running out of stack space, this emulates the recursive behaviour of the normal algorithm, effectively using T as the call stack.
    var S = [v], T = [v];
    index[v] = lowValue[v] = count;
    active[v] = true;
    count += 1;
    while(T.length > 0) {
      v = T[T.length-1];
      var e = adjList[v];
      if (child[v] < e.length) { // If we're not done iterating over the children, first try finishing that.
        for(var i=child[v]; i<e.length; ++i) { // Start where we left off.
          var u = e[i];
          if(index[u] < 0) {
            index[u] = lowValue[u] = count;
            active[u] = true;
            count += 1;
            S.push(u);
            T.push(u);
            break // First recurse, then continue here (with the same child!).
            // There is a slight change to Tarjan's algorithm here.
            // Normally, after having recursed, we set lowValue like we do for an active child (although some variants of the algorithm do it slightly differently).
            // Here, we only do so if the child we recursed on is still active.
            // The reasoning is that if it is no longer active, it must have had a lowValue equal to its own index, which means that it is necessarily higher than our lowValue.
          } else if (active[u]) {
            lowValue[v] = Math.min(lowValue[v], lowValue[u])|0;
          }
          if (scc[u] >= 0) {
            // Node v is not yet assigned an scc, but once it is that scc can apparently reach scc[u].
            sccLinks[v].push(scc[u]);
          }
        }
        child[v] = i; // Remember where we left off.
      } else { // If we're done iterating over the children, check whether we have an scc.
        if(lowValue[v] === index[v]) { // TODO: It /might/ be true that T is always a prefix of S (at this point!!!), and if so, this could be used here.
          var component = [];
          var links = [], linkCount = 0;
          for(var i=S.length-1; i>=0; --i) {
            var w = S[i];
            active[w] = false;
            component.push(w);
            links.push(sccLinks[w]);
            linkCount += sccLinks[w].length;
            scc[w] = components.length;
            if(w === v) {
              S.length = i;
              break
            }
          }
          components.push(component);
          var allLinks = new Array(linkCount);
          for(var i=0; i<links.length; i++) {
            for(var j=0; j<links[i].length; j++) {
              allLinks[--linkCount] = links[i][j];
            }
          }
          sccAdjList.push(allLinks);
        }
        T.pop(); // Now we're finished exploring this particular node (normally corresponds to the return statement)
      }
    }
  }

  //Run strong connect starting from each vertex
  for(var i=0; i<numVertices; ++i) {
    if(index[i] < 0) {
      strongConnect(i);
    }
  }
  
  // Compact sccAdjList
  var newE;
  for(var i=0; i<sccAdjList.length; i++) {
    var e = sccAdjList[i];
    if (e.length === 0) continue
    e.sort(function (a,b) { return a-b; });
    newE = [e[0]];
    for(var j=1; j<e.length; j++) {
      if (e[j] !== e[j-1]) {
        newE.push(e[j]);
      }
    }
    sccAdjList[i] = newE;
  }  

  return {components: components, adjacencyList: sccAdjList}
}

var johnson = function findCircuits(edges) {
    var circuits = []; // Output

    var stack = [];
    var blocked = [];
    var B = {};
    var Ak = [];
    var s;

    function unblock(u) {
        blocked[u] = false;
        if(B.hasOwnProperty(u)) {
            Object.keys(B[u]).forEach(function(w) {
                delete B[u][w];
                if(blocked[w]) {unblock(w);}
            });
        }
    }

    function circuit(v) {
        var found = false;

        stack.push(v);
        blocked[v] = true;

        // L1
        var i;
        var w;
        for(i = 0; i < Ak[v].length; i++) {
            w = Ak[v][i];
            if(w === s) {
                output(s, stack);
                found = true;
            } else if(!blocked[w]) {
                found = circuit(w);
            }
        }

        // L2
        if(found) {
            unblock(v);
        } else {
            for(i = 0; i < Ak[v].length; i++) {
                w = Ak[v][i];
                var entry = B[w];

                if(!entry) {
                    entry = {};
                    B[w] = entry;
                }

                entry[w] = true;
            }
        }
        stack.pop();
        return found;
    }

    function output(start, stack) {
        var cycle = [].concat(stack).concat(start);
        circuits.push(cycle);
    }

    function subgraph(minId) {
      // Remove edges with indice smaller than minId
        for(var i = 0; i < edges.length; i++) {
            if(i < minId) edges[i] = [];
            edges[i] = edges[i].filter(function(i) {
                return i >= minId;
            });
        }
    }

    function adjacencyStructureSCC(from) {
      // Make subgraph starting from vertex minId
        subgraph(from);
        var g = edges;

      // Find strongly connected components using Tarjan algorithm
        var sccs = scc(g);

      // Filter out trivial connected components (ie. made of one node)
        var ccs = sccs.components.filter(function(scc) {
            return scc.length > 1;
        });

      // Find least vertex
        var leastVertex = Infinity;
        var leastVertexComponent;
        for(var i = 0; i < ccs.length; i++) {
            for(var j = 0; j < ccs[i].length; j++) {
                if(ccs[i][j] < leastVertex) {
                    leastVertex = ccs[i][j];
                    leastVertexComponent = i;
                }
            }
        }

        var cc = ccs[leastVertexComponent];

        if(!cc) return false;

      // Return the adjacency list of first component
        var adjList = edges.map(function(l, index) {
            if(cc.indexOf(index) === -1) return [];
            return l.filter(function(i) {
                return cc.indexOf(i) !== -1;
            });
        });

        return {
            leastVertex: leastVertex,
            adjList: adjList
        };
    }

    s = 0;
    var n = edges.length;
    while(s < n) {
        // find strong component with least vertex in
        // subgraph starting from vertex `s`
        var p = adjacencyStructureSCC(s);

        // Its least vertex
        s = p.leastVertex;
        // Its adjacency list
        Ak = p.adjList;

        if(Ak) {
            for(var i = 0; i < Ak.length; i++) {
                for(var j = 0; j < Ak[i].length; j++) {
                    var vertexId = Ak[i][j];
                    blocked[+vertexId] = false;
                    B[vertexId] = {};
                }
            }
            circuit(s);
            s = s + 1;
        } else {
            s = n;
        }

    }

    return circuits;
};

// For a given link, return the target node's depth
function targetDepth(d) {
  return d.target.depth;
}

// The depth of a node when the nodeAlign (align) is set to 'left'
function left$1(node) {
  return node.depth;
}

// The depth of a node when the nodeAlign (align) is set to 'right'
function right$1(node, n) {
  return n - 1 - node.height;
}

// The depth of a node when the nodeAlign (align) is set to 'justify'
function justify(node, n) {
  return node.sourceLinks.length ? node.depth : n - 1;
}

// The depth of a node when the nodeAlign (align) is set to 'center'
function center$2(node) {
  return node.targetLinks.length ? node.depth : node.sourceLinks.length ? min(node.sourceLinks, targetDepth) - 1 : 0;
}

// returns a function, using the parameter given to the sankey setting
function constant$e(x) {
  return function () {
    return x;
  };
}

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/// https://github.com/tomshanley/d3-sankeyCircular-circular

// sort links' breadth (ie top to bottom in a column), based on their source nodes' breadths
function ascendingSourceBreadth(a, b) {
  return ascendingBreadth(a.source, b.source) || a.index - b.index;
}

// sort links' breadth (ie top to bottom in a column), based on their target nodes' breadths
function ascendingTargetBreadth(a, b) {
  return ascendingBreadth(a.target, b.target) || a.index - b.index;
}

// sort nodes' breadth (ie top to bottom in a column)
// if both nodes have circular links, or both don't have circular links, then sort by the top (y0) of the node
// else push nodes that have top circular links to the top, and nodes that have bottom circular links to the bottom
function ascendingBreadth(a, b) {
  if (a.partOfCycle === b.partOfCycle) {
    return a.y0 - b.y0;
  } else {
    if (a.circularLinkType === 'top' || b.circularLinkType === 'bottom') {
      return -1;
    } else {
      return 1;
    }
  }
}

// return the value of a node or link
function value(d) {
  return d.value;
}

// return the vertical center of a node
function nodeCenter(node) {
  return (node.y0 + node.y1) / 2;
}

// return the vertical center of a link's source node
function linkSourceCenter(link) {
  return nodeCenter(link.source);
}

// return the vertical center of a link's target node
function linkTargetCenter(link) {
  return nodeCenter(link.target);
}

// Return the default value for ID for node, d.index
function defaultId$1(d) {
  return d.index;
}

// Return the default object the graph's nodes, graph.nodes
function defaultNodes(graph) {
  return graph.nodes;
}

// Return the default object the graph's nodes, graph.links
function defaultLinks(graph) {
  return graph.links;
}

// Return the node from the collection that matches the provided ID, or throw an error if no match
function find$1(nodeById, id) {
  var node = nodeById.get(id);
  if (!node) throw new Error('missing: ' + id);
  return node;
}

function getNodeID(node, id) {
  return id(node);
}

// The main sankeyCircular functions

// Some constants for circular link calculations
var verticalMargin = 25;
var baseRadius = 10;
var scale = 0.3; //Possibly let user control this, although anything over 0.5 starts to get too cramped

function sankeyCircular () {
  // Set the default values
  var x0 = 0,
      y0 = 0,
      x1 = 1,
      y1 = 1,
      // extent
  dx = 24,
      // nodeWidth
  py,
      // nodePadding, for vertical postioning
  id = defaultId$1,
      align = justify,
      nodes = defaultNodes,
      links = defaultLinks,
      iterations = 32,
      circularLinkGap = 2,
      paddingRatio,
      sortNodes = null;

  function sankeyCircular() {
    var graph = {
      nodes: nodes.apply(null, arguments),
      links: links.apply(null, arguments)

      // Process the graph's nodes and links, setting their positions

      // 1.  Associate the nodes with their respective links, and vice versa
    };computeNodeLinks(graph);

    // 2.  Determine which links result in a circular path in the graph
    identifyCircles(graph, id, sortNodes);

    // 4. Calculate the nodes' values, based on the values of the incoming and outgoing links
    computeNodeValues(graph);

    // 5.  Calculate the nodes' depth based on the incoming and outgoing links
    //     Sets the nodes':
    //     - depth:  the depth in the graph
    //     - column: the depth (0, 1, 2, etc), as is relates to visual position from left to right
    //     - x0, x1: the x coordinates, as is relates to visual position from left to right
    computeNodeDepths(graph);

    // 3.  Determine how the circular links will be drawn,
    //     either travelling back above the main chart ("top")
    //     or below the main chart ("bottom")
    selectCircularLinkTypes(graph, id);

    // 6.  Calculate the nodes' and links' vertical position within their respective column
    //     Also readjusts sankeyCircular size if circular links are needed, and node x's
    computeNodeBreadths(graph, iterations, id);
    computeLinkBreadths(graph);

    // 7.  Sort links per node, based on the links' source/target nodes' breadths
    // 8.  Adjust nodes that overlap links that span 2+ columns
    var linkSortingIterations = 4; //Possibly let user control this number, like the iterations over node placement
    for (var iteration = 0; iteration < linkSortingIterations; iteration++) {

      sortSourceLinks(graph, y1, id);
      sortTargetLinks(graph, y1, id);
      resolveNodeLinkOverlaps(graph, y0, y1, id);
      sortSourceLinks(graph, y1, id);
      sortTargetLinks(graph, y1, id);
    }

    // 8.1  Adjust node and link positions back to fill height of chart area if compressed
    fillHeight(graph, y0, y1);

    // 9. Calculate visually appealling path for the circular paths, and create the "d" string
    addCircularPathData(graph, circularLinkGap, y1, id);

    return graph;
  } // end of sankeyCircular function


  // Set the sankeyCircular parameters
  // nodeID, nodeAlign, nodeWidth, nodePadding, nodes, links, size, extent, iterations, nodePaddingRatio, circularLinkGap
  sankeyCircular.nodeId = function (_) {
    return arguments.length ? (id = typeof _ === 'function' ? _ : constant$e(_), sankeyCircular) : id;
  };

  sankeyCircular.nodeAlign = function (_) {
    return arguments.length ? (align = typeof _ === 'function' ? _ : constant$e(_), sankeyCircular) : align;
  };

  sankeyCircular.nodeWidth = function (_) {
    return arguments.length ? (dx = +_, sankeyCircular) : dx;
  };

  sankeyCircular.nodePadding = function (_) {
    return arguments.length ? (py = +_, sankeyCircular) : py;
  };

  sankeyCircular.nodes = function (_) {
    return arguments.length ? (nodes = typeof _ === 'function' ? _ : constant$e(_), sankeyCircular) : nodes;
  };

  sankeyCircular.links = function (_) {
    return arguments.length ? (links = typeof _ === 'function' ? _ : constant$e(_), sankeyCircular) : links;
  };

  sankeyCircular.size = function (_) {
    return arguments.length ? (x0 = y0 = 0, x1 = +_[0], y1 = +_[1], sankeyCircular) : [x1 - x0, y1 - y0];
  };

  sankeyCircular.extent = function (_) {
    return arguments.length ? (x0 = +_[0][0], x1 = +_[1][0], y0 = +_[0][1], y1 = +_[1][1], sankeyCircular) : [[x0, y0], [x1, y1]];
  };

  sankeyCircular.iterations = function (_) {
    return arguments.length ? (iterations = +_, sankeyCircular) : iterations;
  };

  sankeyCircular.circularLinkGap = function (_) {
    return arguments.length ? (circularLinkGap = +_, sankeyCircular) : circularLinkGap;
  };

  sankeyCircular.nodePaddingRatio = function (_) {
    return arguments.length ? (paddingRatio = +_, sankeyCircular) : paddingRatio;
  };

  sankeyCircular.sortNodes = function (_) {
    return arguments.length ? (sortNodes = _, sankeyCircular) : sortNodes;
  };

  sankeyCircular.update = function (graph) {
    // 5.  Calculate the nodes' depth based on the incoming and outgoing links
    //     Sets the nodes':
    //     - depth:  the depth in the graph
    //     - column: the depth (0, 1, 2, etc), as is relates to visual position from left to right
    //     - x0, x1: the x coordinates, as is relates to visual position from left to right
    // computeNodeDepths(graph)

    // 3.  Determine how the circular links will be drawn,
    //     either travelling back above the main chart ("top")
    //     or below the main chart ("bottom")
    selectCircularLinkTypes(graph, id);

    // 6.  Calculate the nodes' and links' vertical position within their respective column
    //     Also readjusts sankeyCircular size if circular links are needed, and node x's
    // computeNodeBreadths(graph, iterations, id)
    computeLinkBreadths(graph);

    // Force position of circular link type based on position
    graph.links.forEach(function (link) {
      if (link.circular) {
        link.circularLinkType = link.y0 + link.y1 < y1 ? 'top' : 'bottom';

        link.source.circularLinkType = link.circularLinkType;
        link.target.circularLinkType = link.circularLinkType;
      }
    });

    sortSourceLinks(graph, y1, id, false); // Sort links but do not move nodes
    sortTargetLinks(graph, y1, id);

    // 7.  Sort links per node, based on the links' source/target nodes' breadths
    // 8.  Adjust nodes that overlap links that span 2+ columns
    // var linkSortingIterations = 4; //Possibly let user control this number, like the iterations over node placement
    // for (var iteration = 0; iteration < linkSortingIterations; iteration++) {
    //
    //   sortSourceLinks(graph, y1, id)
    //   sortTargetLinks(graph, y1, id)
    //   resolveNodeLinkOverlaps(graph, y0, y1, id)
    //   sortSourceLinks(graph, y1, id)
    //   sortTargetLinks(graph, y1, id)
    //
    // }

    // 8.1  Adjust node and link positions back to fill height of chart area if compressed
    // fillHeight(graph, y0, y1)

    // 9. Calculate visually appealling path for the circular paths, and create the "d" string
    addCircularPathData(graph, circularLinkGap, y1, id);
    return graph;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks(graph) {
    graph.nodes.forEach(function (node, i) {
      node.index = i;
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    var nodeById = map$1(graph.nodes, id);
    graph.links.forEach(function (link, i) {
      link.index = i;
      var source = link.source;
      var target = link.target;
      if ((typeof source === "undefined" ? "undefined" : _typeof$1(source)) !== 'object') {
        source = link.source = find$1(nodeById, source);
      }
      if ((typeof target === "undefined" ? "undefined" : _typeof$1(target)) !== 'object') {
        target = link.target = find$1(nodeById, target);
      }
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
    return graph;
  }

  // Compute the value (size) and cycleness of each node by summing the associated links.
  function computeNodeValues(graph) {
    graph.nodes.forEach(function (node) {
      node.partOfCycle = false;
      node.value = Math.max(sum(node.sourceLinks, value), sum(node.targetLinks, value));
      node.sourceLinks.forEach(function (link) {
        if (link.circular) {
          node.partOfCycle = true;
          node.circularLinkType = link.circularLinkType;
        }
      });
      node.targetLinks.forEach(function (link) {
        if (link.circular) {
          node.partOfCycle = true;
          node.circularLinkType = link.circularLinkType;
        }
      });
    });
  }

  function getCircleMargins(graph) {
    var totalTopLinksWidth = 0,
        totalBottomLinksWidth = 0,
        totalRightLinksWidth = 0,
        totalLeftLinksWidth = 0;

    var maxColumn = max(graph.nodes, function (node) {
      return node.column;
    });

    graph.links.forEach(function (link) {
      if (link.circular) {
        if (link.circularLinkType == 'top') {
          totalTopLinksWidth = totalTopLinksWidth + link.width;
        } else {
          totalBottomLinksWidth = totalBottomLinksWidth + link.width;
        }

        if (link.target.column == 0) {
          totalLeftLinksWidth = totalLeftLinksWidth + link.width;
        }

        if (link.source.column == maxColumn) {
          totalRightLinksWidth = totalRightLinksWidth + link.width;
        }
      }
    });

    //account for radius of curves and padding between links
    totalTopLinksWidth = totalTopLinksWidth > 0 ? totalTopLinksWidth + verticalMargin + baseRadius : totalTopLinksWidth;
    totalBottomLinksWidth = totalBottomLinksWidth > 0 ? totalBottomLinksWidth + verticalMargin + baseRadius : totalBottomLinksWidth;
    totalRightLinksWidth = totalRightLinksWidth > 0 ? totalRightLinksWidth + verticalMargin + baseRadius : totalRightLinksWidth;
    totalLeftLinksWidth = totalLeftLinksWidth > 0 ? totalLeftLinksWidth + verticalMargin + baseRadius : totalLeftLinksWidth;

    return { "top": totalTopLinksWidth, "bottom": totalBottomLinksWidth, "left": totalLeftLinksWidth, "right": totalRightLinksWidth };
  }

  // Update the x0, y0, x1 and y1 for the sankeyCircular, to allow space for any circular links
  function scaleSankeySize(graph, margin) {

    var maxColumn = max(graph.nodes, function (node) {
      return node.column;
    });

    var currentWidth = x1 - x0;
    var currentHeight = y1 - y0;

    var newWidth = currentWidth + margin.right + margin.left;
    var newHeight = currentHeight + margin.top + margin.bottom;

    var scaleX = currentWidth / newWidth;
    var scaleY = currentHeight / newHeight;

    x0 = x0 * scaleX + margin.left;
    x1 = margin.right == 0 ? x1 : x1 * scaleX;
    y0 = y0 * scaleY + margin.top;
    y1 = y1 * scaleY;

    graph.nodes.forEach(function (node) {
      node.x0 = x0 + node.column * ((x1 - x0 - dx) / maxColumn);
      node.x1 = node.x0 + dx;
    });

    return scaleY;
  }

  // Iteratively assign the depth for each node.
  // Nodes are assigned the maximum depth of incoming neighbors plus one;
  // nodes with no incoming links are assigned depth zero, while
  // nodes with no outgoing links are assigned the maximum depth.
  function computeNodeDepths(graph) {
    var nodes, next, x;

    for (nodes = graph.nodes, next = [], x = 0; nodes.length; ++x, nodes = next, next = []) {
      nodes.forEach(function (node) {
        node.depth = x;
        node.sourceLinks.forEach(function (link) {
          if (next.indexOf(link.target) < 0 && !link.circular) {
            next.push(link.target);
          }
        });
      });
    }

    for (nodes = graph.nodes, next = [], x = 0; nodes.length; ++x, nodes = next, next = []) {
      nodes.forEach(function (node) {
        node.height = x;
        node.targetLinks.forEach(function (link) {
          if (next.indexOf(link.source) < 0 && !link.circular) {
            next.push(link.source);
          }
        });
      });
    }

    // assign column numbers, and get max value
    graph.nodes.forEach(function (node) {
      node.column = Math.floor(align.call(null, node, x));
    });
  }

  // Assign nodes' breadths, and then shift nodes that overlap (resolveCollisions)
  function computeNodeBreadths(graph, iterations, id) {
    var columns = nest().key(function (d) {
      return d.column;
    }).sortKeys(ascending).entries(graph.nodes).map(function (d) {
      return d.values;
    });

    initializeNodeBreadth(id);
    resolveCollisions();

    for (var alpha = 1, n = iterations; n > 0; --n) {
      relaxLeftAndRight(alpha *= 0.99, id);
      resolveCollisions();
    }

    function initializeNodeBreadth(id) {

      //override py if nodePadding has been set
      if (paddingRatio) {
        var padding = Infinity;
        columns.forEach(function (nodes) {
          var thisPadding = y1 * paddingRatio / (nodes.length + 1);
          padding = thisPadding < padding ? thisPadding : padding;
        });
        py = padding;
      }

      var ky = min(columns, function (nodes) {
        return (y1 - y0 - (nodes.length - 1) * py) / sum(nodes, value);
      });

      //calculate the widths of the links
      ky = ky * scale;

      graph.links.forEach(function (link) {
        link.width = link.value * ky;
      });

      //determine how much to scale down the chart, based on circular links
      var margin = getCircleMargins(graph);
      var ratio = scaleSankeySize(graph, margin);

      //re-calculate widths
      ky = ky * ratio;

      graph.links.forEach(function (link) {
        link.width = link.value * ky;
      });

      columns.forEach(function (nodes) {
        var nodesLength = nodes.length;
        nodes.forEach(function (node, i) {
          if (node.depth == columns.length - 1 && nodesLength == 1) {
            node.y0 = y1 / 2 - node.value * ky;
            node.y1 = node.y0 + node.value * ky;
          } else if (node.depth == 0 && nodesLength == 1) {
            node.y0 = y1 / 2 - node.value * ky;
            node.y1 = node.y0 + node.value * ky;
          } else if (node.partOfCycle) {
            if (numberOfNonSelfLinkingCycles(node, id) == 0) {
              node.y0 = y1 / 2 + i;
              node.y1 = node.y0 + node.value * ky;
            } else if (node.circularLinkType == 'top') {
              node.y0 = y0 + i;
              node.y1 = node.y0 + node.value * ky;
            } else {
              node.y0 = y1 - node.value * ky - i;
              node.y1 = node.y0 + node.value * ky;
            }
          } else {
            if (margin.top == 0 || margin.bottom == 0) {
              node.y0 = (y1 - y0) / nodesLength * i;
              node.y1 = node.y0 + node.value * ky;
            } else {
              node.y0 = (y1 - y0) / 2 - nodesLength / 2 + i;
              node.y1 = node.y0 + node.value * ky;
            }
          }
        });
      });
    }

    // For each node in each column, check the node's vertical position in relation to its targets and sources vertical position
    // and shift up/down to be closer to the vertical middle of those targets and sources
    function relaxLeftAndRight(alpha, id) {
      var columnsLength = columns.length;

      columns.forEach(function (nodes) {
        var n = nodes.length;
        var depth = nodes[0].depth;

        nodes.forEach(function (node) {
          // check the node is not an orphan
          var nodeHeight;
          if (node.sourceLinks.length || node.targetLinks.length) {
            if (node.partOfCycle && numberOfNonSelfLinkingCycles(node, id) > 0) ; else if (depth == 0 && n == 1) {
              nodeHeight = node.y1 - node.y0;

              node.y0 = y1 / 2 - nodeHeight / 2;
              node.y1 = y1 / 2 + nodeHeight / 2;
            } else if (depth == columnsLength - 1 && n == 1) {
              nodeHeight = node.y1 - node.y0;

              node.y0 = y1 / 2 - nodeHeight / 2;
              node.y1 = y1 / 2 + nodeHeight / 2;
            } else {
              var avg = 0;

              var avgTargetY = mean(node.sourceLinks, linkTargetCenter);
              var avgSourceY = mean(node.targetLinks, linkSourceCenter);

              if (avgTargetY && avgSourceY) {
                avg = (avgTargetY + avgSourceY) / 2;
              } else {
                avg = avgTargetY || avgSourceY;
              }

              var dy = (avg - nodeCenter(node)) * alpha;
              // positive if it node needs to move down
              node.y0 += dy;
              node.y1 += dy;
            }
          }
        });
      });
    }

    // For each column, check if nodes are overlapping, and if so, shift up/down
    function resolveCollisions() {
      columns.forEach(function (nodes) {
        var node,
            dy,
            y = y0,
            n = nodes.length,
            i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingBreadth);

        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y - node.y0;

          if (dy > 0) {
            node.y0 += dy;
            node.y1 += dy;
          }
          y = node.y1 + py;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y - py - y1;
        if (dy > 0) {
          y = node.y0 -= dy, node.y1 -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y1 + py - y;
            if (dy > 0) node.y0 -= dy, node.y1 -= dy;
            y = node.y0;
          }
        }
      });
    }
  }

  // Assign the links y0 and y1 based on source/target nodes position,
  // plus the link's relative position to other links to the same node
  function computeLinkBreadths(graph) {
    graph.nodes.forEach(function (node) {
      node.sourceLinks.sort(ascendingTargetBreadth);
      node.targetLinks.sort(ascendingSourceBreadth);
    });
    graph.nodes.forEach(function (node) {
      var y0 = node.y0;
      var y1 = y0;

      // start from the bottom of the node for cycle links
      var y0cycle = node.y1;
      var y1cycle = y0cycle;

      node.sourceLinks.forEach(function (link) {
        if (link.circular) {
          link.y0 = y0cycle - link.width / 2;
          y0cycle = y0cycle - link.width;
        } else {
          link.y0 = y0 + link.width / 2;
          y0 += link.width;
        }
      });
      node.targetLinks.forEach(function (link) {
        if (link.circular) {
          link.y1 = y1cycle - link.width / 2;
          y1cycle = y1cycle - link.width;
        } else {
          link.y1 = y1 + link.width / 2;
          y1 += link.width;
        }
      });
    });
  }

  return sankeyCircular;
}

/// /////////////////////////////////////////////////////////////////////////////////
// Cycle functions
// portion of code to detect circular links based on Colin Fergus' bl.ock https://gist.github.com/cfergus/3956043

// Identify circles in the link objects
function identifyCircles(graph, id, sortNodes) {
  var circularLinkID = 0;
  if (sortNodes === null) {

    // Building adjacency graph
    var adjList = [];
    for (var i = 0; i < graph.links.length; i++) {
      var link = graph.links[i];
      var source = link.source.index;
      var target = link.target.index;
      if (!adjList[source]) adjList[source] = [];
      if (!adjList[target]) adjList[target] = [];

      // Add links if not already in set
      if (adjList[source].indexOf(target) === -1) adjList[source].push(target);
    }

    // Find all elementary circuits
    var cycles = johnson(adjList);

    // Sort by circuits length
    cycles.sort(function (a, b) {
      return a.length - b.length;
    });

    var circularLinks = {};
    for (i = 0; i < cycles.length; i++) {
      var cycle = cycles[i];
      var last = cycle.slice(-2);
      if (!circularLinks[last[0]]) circularLinks[last[0]] = {};
      circularLinks[last[0]][last[1]] = true;
    }

    graph.links.forEach(function (link) {
      var target = link.target.index;
      var source = link.source.index;
      // If self-linking or a back-edge
      if (target === source || circularLinks[source] && circularLinks[source][target]) {
        link.circular = true;
        link.circularLinkID = circularLinkID;
        circularLinkID = circularLinkID + 1;
      } else {
        link.circular = false;
      }
    });
  } else {
    graph.links.forEach(function (link) {
      if (link.source[sortNodes] < link.target[sortNodes]) {
        link.circular = false;
      } else {
        link.circular = true;
        link.circularLinkID = circularLinkID;
        circularLinkID = circularLinkID + 1;
      }
    });
  }
}

// Assign a circular link type (top or bottom), based on:
// - if the source/target node already has circular links, then use the same type
// - if not, choose the type with fewer links
function selectCircularLinkTypes(graph, id) {
  var numberOfTops = 0;
  var numberOfBottoms = 0;
  graph.links.forEach(function (link) {
    if (link.circular) {
      // if either souce or target has type already use that
      if (link.source.circularLinkType || link.target.circularLinkType) {
        // default to source type if available
        link.circularLinkType = link.source.circularLinkType ? link.source.circularLinkType : link.target.circularLinkType;
      } else {
        link.circularLinkType = numberOfTops < numberOfBottoms ? 'top' : 'bottom';
      }

      if (link.circularLinkType == 'top') {
        numberOfTops = numberOfTops + 1;
      } else {
        numberOfBottoms = numberOfBottoms + 1;
      }

      graph.nodes.forEach(function (node) {
        if (getNodeID(node, id) == getNodeID(link.source, id) || getNodeID(node, id) == getNodeID(link.target, id)) {
          node.circularLinkType = link.circularLinkType;
        }
      });
    }
  });

  //correct self-linking links to be same direction as node
  graph.links.forEach(function (link) {
    if (link.circular) {
      //if both source and target node are same type, then link should have same type
      if (link.source.circularLinkType == link.target.circularLinkType) {
        link.circularLinkType = link.source.circularLinkType;
      }
      //if link is selflinking, then link should have same type as node
      if (selfLinking(link, id)) {
        link.circularLinkType = link.source.circularLinkType;
      }
    }
  });
}

// Return the angle between a straight line between the source and target of the link, and the vertical plane of the node
function linkAngle(link) {
  var adjacent = Math.abs(link.y1 - link.y0);
  var opposite = Math.abs(link.target.x0 - link.source.x1);

  return Math.atan(opposite / adjacent);
}

// Check if two circular links potentially overlap
function circularLinksCross(link1, link2) {
  if (link1.source.column < link2.target.column) {
    return false;
  } else if (link1.target.column > link2.source.column) {
    return false;
  } else {
    return true;
  }
}

// Return the number of circular links for node, not including self linking links
function numberOfNonSelfLinkingCycles(node, id) {
  var sourceCount = 0;
  node.sourceLinks.forEach(function (l) {
    sourceCount = l.circular && !selfLinking(l, id) ? sourceCount + 1 : sourceCount;
  });

  var targetCount = 0;
  node.targetLinks.forEach(function (l) {
    targetCount = l.circular && !selfLinking(l, id) ? targetCount + 1 : targetCount;
  });

  return sourceCount + targetCount;
}

// Check if a circular link is the only circular link for both its source and target node
function onlyCircularLink(link) {
  var nodeSourceLinks = link.source.sourceLinks;
  var sourceCount = 0;
  nodeSourceLinks.forEach(function (l) {
    sourceCount = l.circular ? sourceCount + 1 : sourceCount;
  });

  var nodeTargetLinks = link.target.targetLinks;
  var targetCount = 0;
  nodeTargetLinks.forEach(function (l) {
    targetCount = l.circular ? targetCount + 1 : targetCount;
  });

  if (sourceCount > 1 || targetCount > 1) {
    return false;
  } else {
    return true;
  }
}

// creates vertical buffer values per set of top/bottom links
function calcVerticalBuffer(links, circularLinkGap, id) {
  links.sort(sortLinkColumnAscending);
  links.forEach(function (link, i) {
    var buffer = 0;

    if (selfLinking(link, id) && onlyCircularLink(link)) {
      link.circularPathData.verticalBuffer = buffer + link.width / 2;
    } else {
      var j = 0;
      for (j; j < i; j++) {
        if (circularLinksCross(links[i], links[j])) {
          var bufferOverThisLink = links[j].circularPathData.verticalBuffer + links[j].width / 2 + circularLinkGap;
          buffer = bufferOverThisLink > buffer ? bufferOverThisLink : buffer;
        }
      }

      link.circularPathData.verticalBuffer = buffer + link.width / 2;
    }
  });

  return links;
}

// calculate the optimum path for a link to reduce overlaps
function addCircularPathData(graph, circularLinkGap, y1, id) {
  //var baseRadius = 10
  var buffer = 5;
  //var verticalMargin = 25

  var minY = min(graph.links, function (link) {
    return link.source.y0;
  });

  // create object for circular Path Data
  graph.links.forEach(function (link) {
    if (link.circular) {
      link.circularPathData = {};
    }
  });

  // calc vertical offsets per top/bottom links
  var topLinks = graph.links.filter(function (l) {
    return l.circularLinkType == 'top';
  });
  /* topLinks = */calcVerticalBuffer(topLinks, circularLinkGap, id);

  var bottomLinks = graph.links.filter(function (l) {
    return l.circularLinkType == 'bottom';
  });
  /* bottomLinks = */calcVerticalBuffer(bottomLinks, circularLinkGap, id);

  // add the base data for each link
  graph.links.forEach(function (link) {
    if (link.circular) {
      link.circularPathData.arcRadius = link.width + baseRadius;
      link.circularPathData.leftNodeBuffer = buffer;
      link.circularPathData.rightNodeBuffer = buffer;
      link.circularPathData.sourceWidth = link.source.x1 - link.source.x0;
      link.circularPathData.sourceX = link.source.x0 + link.circularPathData.sourceWidth;
      link.circularPathData.targetX = link.target.x0;
      link.circularPathData.sourceY = link.y0;
      link.circularPathData.targetY = link.y1;

      // for self linking paths, and that the only circular link in/out of that node
      if (selfLinking(link, id) && onlyCircularLink(link)) {
        link.circularPathData.leftSmallArcRadius = baseRadius + link.width / 2;
        link.circularPathData.leftLargeArcRadius = baseRadius + link.width / 2;
        link.circularPathData.rightSmallArcRadius = baseRadius + link.width / 2;
        link.circularPathData.rightLargeArcRadius = baseRadius + link.width / 2;

        if (link.circularLinkType == 'bottom') {
          link.circularPathData.verticalFullExtent = link.source.y1 + verticalMargin + link.circularPathData.verticalBuffer;
          link.circularPathData.verticalLeftInnerExtent = link.circularPathData.verticalFullExtent - link.circularPathData.leftLargeArcRadius;
          link.circularPathData.verticalRightInnerExtent = link.circularPathData.verticalFullExtent - link.circularPathData.rightLargeArcRadius;
        } else {
          // top links
          link.circularPathData.verticalFullExtent = link.source.y0 - verticalMargin - link.circularPathData.verticalBuffer;
          link.circularPathData.verticalLeftInnerExtent = link.circularPathData.verticalFullExtent + link.circularPathData.leftLargeArcRadius;
          link.circularPathData.verticalRightInnerExtent = link.circularPathData.verticalFullExtent + link.circularPathData.rightLargeArcRadius;
        }
      } else {
        // else calculate normally
        // add left extent coordinates, based on links with same source column and circularLink type
        var thisColumn = link.source.column;
        var thisCircularLinkType = link.circularLinkType;
        var sameColumnLinks = graph.links.filter(function (l) {
          return l.source.column == thisColumn && l.circularLinkType == thisCircularLinkType;
        });

        if (link.circularLinkType == 'bottom') {
          sameColumnLinks.sort(sortLinkSourceYDescending);
        } else {
          sameColumnLinks.sort(sortLinkSourceYAscending);
        }

        var radiusOffset = 0;
        sameColumnLinks.forEach(function (l, i) {
          if (l.circularLinkID == link.circularLinkID) {
            link.circularPathData.leftSmallArcRadius = baseRadius + link.width / 2 + radiusOffset;
            link.circularPathData.leftLargeArcRadius = baseRadius + link.width / 2 + i * circularLinkGap + radiusOffset;
          }
          radiusOffset = radiusOffset + l.width;
        });

        // add right extent coordinates, based on links with same target column and circularLink type
        thisColumn = link.target.column;
        sameColumnLinks = graph.links.filter(function (l) {
          return l.target.column == thisColumn && l.circularLinkType == thisCircularLinkType;
        });
        if (link.circularLinkType == 'bottom') {
          sameColumnLinks.sort(sortLinkTargetYDescending);
        } else {
          sameColumnLinks.sort(sortLinkTargetYAscending);
        }

        radiusOffset = 0;
        sameColumnLinks.forEach(function (l, i) {
          if (l.circularLinkID == link.circularLinkID) {
            link.circularPathData.rightSmallArcRadius = baseRadius + link.width / 2 + radiusOffset;
            link.circularPathData.rightLargeArcRadius = baseRadius + link.width / 2 + i * circularLinkGap + radiusOffset;
          }
          radiusOffset = radiusOffset + l.width;
        });

        // bottom links
        if (link.circularLinkType == 'bottom') {
          link.circularPathData.verticalFullExtent = Math.max(y1, link.source.y1, link.target.y1) + verticalMargin + link.circularPathData.verticalBuffer;
          link.circularPathData.verticalLeftInnerExtent = link.circularPathData.verticalFullExtent - link.circularPathData.leftLargeArcRadius;
          link.circularPathData.verticalRightInnerExtent = link.circularPathData.verticalFullExtent - link.circularPathData.rightLargeArcRadius;
        } else {
          // top links
          link.circularPathData.verticalFullExtent = minY - verticalMargin - link.circularPathData.verticalBuffer;
          link.circularPathData.verticalLeftInnerExtent = link.circularPathData.verticalFullExtent + link.circularPathData.leftLargeArcRadius;
          link.circularPathData.verticalRightInnerExtent = link.circularPathData.verticalFullExtent + link.circularPathData.rightLargeArcRadius;
        }
      }

      // all links
      link.circularPathData.leftInnerExtent = link.circularPathData.sourceX + link.circularPathData.leftNodeBuffer;
      link.circularPathData.rightInnerExtent = link.circularPathData.targetX - link.circularPathData.rightNodeBuffer;
      link.circularPathData.leftFullExtent = link.circularPathData.sourceX + link.circularPathData.leftLargeArcRadius + link.circularPathData.leftNodeBuffer;
      link.circularPathData.rightFullExtent = link.circularPathData.targetX - link.circularPathData.rightLargeArcRadius - link.circularPathData.rightNodeBuffer;
    }

    if (link.circular) {
      link.path = createCircularPathString(link);
    } else {
      var normalPath = linkHorizontal().source(function (d) {
        var x = d.source.x0 + (d.source.x1 - d.source.x0);
        var y = d.y0;
        return [x, y];
      }).target(function (d) {
        var x = d.target.x0;
        var y = d.y1;
        return [x, y];
      });
      link.path = normalPath(link);
    }
  });
}

// create a d path using the addCircularPathData
function createCircularPathString(link) {
  var pathString = '';
  // 'pathData' is assigned a value but never used
  // var pathData = {}

  if (link.circularLinkType == 'top') {
    pathString =
    // start at the right of the source node
    'M' + link.circularPathData.sourceX + ' ' + link.circularPathData.sourceY + ' ' +
    // line right to buffer point
    'L' + link.circularPathData.leftInnerExtent + ' ' + link.circularPathData.sourceY + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.leftLargeArcRadius + ' ' + link.circularPathData.leftSmallArcRadius + ' 0 0 0 ' +
    // End of arc X //End of arc Y
    link.circularPathData.leftFullExtent + ' ' + (link.circularPathData.sourceY - link.circularPathData.leftSmallArcRadius) + ' ' + // End of arc X
    // line up to buffer point
    'L' + link.circularPathData.leftFullExtent + ' ' + link.circularPathData.verticalLeftInnerExtent + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.leftLargeArcRadius + ' ' + link.circularPathData.leftLargeArcRadius + ' 0 0 0 ' +
    // End of arc X //End of arc Y
    link.circularPathData.leftInnerExtent + ' ' + link.circularPathData.verticalFullExtent + ' ' + // End of arc X
    // line left to buffer point
    'L' + link.circularPathData.rightInnerExtent + ' ' + link.circularPathData.verticalFullExtent + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.rightLargeArcRadius + ' ' + link.circularPathData.rightLargeArcRadius + ' 0 0 0 ' +
    // End of arc X //End of arc Y
    link.circularPathData.rightFullExtent + ' ' + link.circularPathData.verticalRightInnerExtent + ' ' + // End of arc X
    // line down
    'L' + link.circularPathData.rightFullExtent + ' ' + (link.circularPathData.targetY - link.circularPathData.rightSmallArcRadius) + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.rightLargeArcRadius + ' ' + link.circularPathData.rightSmallArcRadius + ' 0 0 0 ' +
    // End of arc X //End of arc Y
    link.circularPathData.rightInnerExtent + ' ' + link.circularPathData.targetY + ' ' + // End of arc X
    // line to end
    'L' + link.circularPathData.targetX + ' ' + link.circularPathData.targetY;
  } else {
    // bottom path
    pathString =
    // start at the right of the source node
    'M' + link.circularPathData.sourceX + ' ' + link.circularPathData.sourceY + ' ' +
    // line right to buffer point
    'L' + link.circularPathData.leftInnerExtent + ' ' + link.circularPathData.sourceY + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.leftLargeArcRadius + ' ' + link.circularPathData.leftSmallArcRadius + ' 0 0 1 ' +
    // End of arc X //End of arc Y
    link.circularPathData.leftFullExtent + ' ' + (link.circularPathData.sourceY + link.circularPathData.leftSmallArcRadius) + ' ' + // End of arc X
    // line down to buffer point
    'L' + link.circularPathData.leftFullExtent + ' ' + link.circularPathData.verticalLeftInnerExtent + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.leftLargeArcRadius + ' ' + link.circularPathData.leftLargeArcRadius + ' 0 0 1 ' +
    // End of arc X //End of arc Y
    link.circularPathData.leftInnerExtent + ' ' + link.circularPathData.verticalFullExtent + ' ' + // End of arc X
    // line left to buffer point
    'L' + link.circularPathData.rightInnerExtent + ' ' + link.circularPathData.verticalFullExtent + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.rightLargeArcRadius + ' ' + link.circularPathData.rightLargeArcRadius + ' 0 0 1 ' +
    // End of arc X //End of arc Y
    link.circularPathData.rightFullExtent + ' ' + link.circularPathData.verticalRightInnerExtent + ' ' + // End of arc X
    // line up
    'L' + link.circularPathData.rightFullExtent + ' ' + (link.circularPathData.targetY + link.circularPathData.rightSmallArcRadius) + ' ' +
    // Arc around: Centre of arc X and  //Centre of arc Y
    'A' + link.circularPathData.rightLargeArcRadius + ' ' + link.circularPathData.rightSmallArcRadius + ' 0 0 1 ' +
    // End of arc X //End of arc Y
    link.circularPathData.rightInnerExtent + ' ' + link.circularPathData.targetY + ' ' + // End of arc X
    // line to end
    'L' + link.circularPathData.targetX + ' ' + link.circularPathData.targetY;
  }

  return pathString;
}

// sort links based on the distance between the source and tartget node columns
// if the same, then use Y position of the source node
function sortLinkColumnAscending(link1, link2) {
  if (linkColumnDistance(link1) == linkColumnDistance(link2)) {
    return link1.circularLinkType == 'bottom' ? sortLinkSourceYDescending(link1, link2) : sortLinkSourceYAscending(link1, link2);
  } else {
    return linkColumnDistance(link2) - linkColumnDistance(link1);
  }
}

// sort ascending links by their source vertical position, y0
function sortLinkSourceYAscending(link1, link2) {
  return link1.y0 - link2.y0;
}

// sort descending links by their source vertical position, y0
function sortLinkSourceYDescending(link1, link2) {
  return link2.y0 - link1.y0;
}

// sort ascending links by their target vertical position, y1
function sortLinkTargetYAscending(link1, link2) {
  return link1.y1 - link2.y1;
}

// sort descending links by their target vertical position, y1
function sortLinkTargetYDescending(link1, link2) {
  return link2.y1 - link1.y1;
}

// return the distance between the link's target and source node, in terms of the nodes' column
function linkColumnDistance(link) {
  return link.target.column - link.source.column;
}

// return the distance between the link's target and source node, in terms of the nodes' X coordinate
function linkXLength(link) {
  return link.target.x0 - link.source.x1;
}

// Return the Y coordinate on the longerLink path * which is perpendicular shorterLink's source.
// * approx, based on a straight line from target to source, when in fact the path is a bezier
function linkPerpendicularYToLinkSource(longerLink, shorterLink) {
  // get the angle for the longer link
  var angle = linkAngle(longerLink);

  // get the adjacent length to the other link's x position
  var heightFromY1ToPependicular = linkXLength(shorterLink) / Math.tan(angle);

  // add or subtract from longer link1's original y1, depending on the slope
  var yPerpendicular = incline(longerLink) == 'up' ? longerLink.y1 + heightFromY1ToPependicular : longerLink.y1 - heightFromY1ToPependicular;

  return yPerpendicular;
}

// Return the Y coordinate on the longerLink path * which is perpendicular shorterLink's source.
// * approx, based on a straight line from target to source, when in fact the path is a bezier
function linkPerpendicularYToLinkTarget(longerLink, shorterLink) {
  // get the angle for the longer link
  var angle = linkAngle(longerLink);

  // get the adjacent length to the other link's x position
  var heightFromY1ToPependicular = linkXLength(shorterLink) / Math.tan(angle);

  // add or subtract from longer link's original y1, depending on the slope
  var yPerpendicular = incline(longerLink) == 'up' ? longerLink.y1 - heightFromY1ToPependicular : longerLink.y1 + heightFromY1ToPependicular;

  return yPerpendicular;
}

// Move any nodes that overlap links which span 2+ columns
function resolveNodeLinkOverlaps(graph, y0, y1, id) {

  graph.links.forEach(function (link) {
    if (link.circular) {
      return;
    }

    if (link.target.column - link.source.column > 1) {
      var columnToTest = link.source.column + 1;
      var maxColumnToTest = link.target.column - 1;

      var i = 1;
      var numberOfColumnsToTest = maxColumnToTest - columnToTest + 1;

      for (i = 1; columnToTest <= maxColumnToTest; columnToTest++, i++) {
        graph.nodes.forEach(function (node) {
          if (node.column == columnToTest) {
            var t = i / (numberOfColumnsToTest + 1);

            // Find all the points of a cubic bezier curve in javascript
            // https://stackoverflow.com/questions/15397596/find-all-the-points-of-a-cubic-bezier-curve-in-javascript

            var B0_t = Math.pow(1 - t, 3);
            var B1_t = 3 * t * Math.pow(1 - t, 2);
            var B2_t = 3 * Math.pow(t, 2) * (1 - t);
            var B3_t = Math.pow(t, 3);

            var py_t = B0_t * link.y0 + B1_t * link.y0 + B2_t * link.y1 + B3_t * link.y1;

            var linkY0AtColumn = py_t - link.width / 2;
            var linkY1AtColumn = py_t + link.width / 2;
            var dy;

            // If top of link overlaps node, push node up
            if (linkY0AtColumn > node.y0 && linkY0AtColumn < node.y1) {

              dy = node.y1 - linkY0AtColumn + 10;
              dy = node.circularLinkType == 'bottom' ? dy : -dy;

              node = adjustNodeHeight(node, dy, y0, y1);

              // check if other nodes need to move up too
              graph.nodes.forEach(function (otherNode) {
                // don't need to check itself or nodes at different columns
                if (getNodeID(otherNode, id) == getNodeID(node, id) || otherNode.column != node.column) {
                  return;
                }
                if (nodesOverlap(node, otherNode)) {
                  adjustNodeHeight(otherNode, dy, y0, y1);
                }
              });
            } else if (linkY1AtColumn > node.y0 && linkY1AtColumn < node.y1) {
              // If bottom of link overlaps node, push node down
              dy = linkY1AtColumn - node.y0 + 10;

              node = adjustNodeHeight(node, dy, y0, y1);

              // check if other nodes need to move down too
              graph.nodes.forEach(function (otherNode) {
                // don't need to check itself or nodes at different columns
                if (getNodeID(otherNode, id) == getNodeID(node, id) || otherNode.column != node.column) {
                  return;
                }
                if (otherNode.y0 < node.y1 && otherNode.y1 > node.y1) {
                  adjustNodeHeight(otherNode, dy, y0, y1);
                }
              });
            } else if (linkY0AtColumn < node.y0 && linkY1AtColumn > node.y1) {
              // if link completely overlaps node
              dy = linkY1AtColumn - node.y0 + 10;

              node = adjustNodeHeight(node, dy, y0, y1);

              graph.nodes.forEach(function (otherNode) {
                // don't need to check itself or nodes at different columns
                if (getNodeID(otherNode, id) == getNodeID(node, id) || otherNode.column != node.column) {
                  return;
                }
                if (otherNode.y0 < node.y1 && otherNode.y1 > node.y1) {
                  adjustNodeHeight(otherNode, dy, y0, y1);
                }
              });
            }
          }
        });
      }
    }
  });
}

// check if two nodes overlap
function nodesOverlap(nodeA, nodeB) {
  // test if nodeA top partially overlaps nodeB
  if (nodeA.y0 > nodeB.y0 && nodeA.y0 < nodeB.y1) {
    return true;
  } else if (nodeA.y1 > nodeB.y0 && nodeA.y1 < nodeB.y1) {
    // test if nodeA bottom partially overlaps nodeB
    return true;
  } else if (nodeA.y0 < nodeB.y0 && nodeA.y1 > nodeB.y1) {
    // test if nodeA covers nodeB
    return true;
  } else {
    return false;
  }
}

// update a node, and its associated links, vertical positions (y0, y1)
function adjustNodeHeight(node, dy, sankeyY0, sankeyY1) {
  if (node.y0 + dy >= sankeyY0 && node.y1 + dy <= sankeyY1) {
    node.y0 = node.y0 + dy;
    node.y1 = node.y1 + dy;

    node.targetLinks.forEach(function (l) {
      l.y1 = l.y1 + dy;
    });

    node.sourceLinks.forEach(function (l) {
      l.y0 = l.y0 + dy;
    });
  }
  return node;
}

// sort and set the links' y0 for each node
function sortSourceLinks(graph, y1, id, moveNodes) {
  graph.nodes.forEach(function (node) {
    // move any nodes up which are off the bottom
    if (moveNodes && node.y + (node.y1 - node.y0) > y1) {
      node.y = node.y - (node.y + (node.y1 - node.y0) - y1);
    }

    var nodesSourceLinks = graph.links.filter(function (l) {
      return getNodeID(l.source, id) == getNodeID(node, id);
    });

    var nodeSourceLinksLength = nodesSourceLinks.length;

    // if more than 1 link then sort
    if (nodeSourceLinksLength > 1) {
      nodesSourceLinks.sort(function (link1, link2) {
        // if both are not circular...
        if (!link1.circular && !link2.circular) {
          // if the target nodes are the same column, then sort by the link's target y
          if (link1.target.column == link2.target.column) {
            return link1.y1 - link2.y1;
          } else if (!sameInclines(link1, link2)) {
            // if the links slope in different directions, then sort by the link's target y
            return link1.y1 - link2.y1;

            // if the links slope in same directions, then sort by any overlap
          } else {
            if (link1.target.column > link2.target.column) {
              var link2Adj = linkPerpendicularYToLinkTarget(link2, link1);
              return link1.y1 - link2Adj;
            }
            if (link2.target.column > link1.target.column) {
              var link1Adj = linkPerpendicularYToLinkTarget(link1, link2);
              return link1Adj - link2.y1;
            }
          }
        }

        // if only one is circular, the move top links up, or bottom links down
        if (link1.circular && !link2.circular) {
          return link1.circularLinkType == 'top' ? -1 : 1;
        } else if (link2.circular && !link1.circular) {
          return link2.circularLinkType == 'top' ? 1 : -1;
        }

        // if both links are circular...
        if (link1.circular && link2.circular) {
          // ...and they both loop the same way (both top)
          if (link1.circularLinkType === link2.circularLinkType && link1.circularLinkType == 'top') {
            // ...and they both connect to a target with same column, then sort by the target's y
            if (link1.target.column === link2.target.column) {
              return link1.target.y1 - link2.target.y1;
            } else {
              // ...and they connect to different column targets, then sort by how far back they
              return link2.target.column - link1.target.column;
            }
          } else if (link1.circularLinkType === link2.circularLinkType && link1.circularLinkType == 'bottom') {
            // ...and they both loop the same way (both bottom)
            // ...and they both connect to a target with same column, then sort by the target's y
            if (link1.target.column === link2.target.column) {
              return link2.target.y1 - link1.target.y1;
            } else {
              // ...and they connect to different column targets, then sort by how far back they
              return link1.target.column - link2.target.column;
            }
          } else {
            // ...and they loop around different ways, the move top up and bottom down
            return link1.circularLinkType == 'top' ? -1 : 1;
          }
        }
      });
    }

    // update y0 for links
    var ySourceOffset = node.y0;

    nodesSourceLinks.forEach(function (link) {
      link.y0 = ySourceOffset + link.width / 2;
      ySourceOffset = ySourceOffset + link.width;
    });

    // correct any circular bottom links so they are at the bottom of the node
    nodesSourceLinks.forEach(function (link, i) {
      if (link.circularLinkType == 'bottom') {
        var j = i + 1;
        var offsetFromBottom = 0;
        // sum the widths of any links that are below this link
        for (j; j < nodeSourceLinksLength; j++) {
          offsetFromBottom = offsetFromBottom + nodesSourceLinks[j].width;
        }
        link.y0 = node.y1 - offsetFromBottom - link.width / 2;
      }
    });
  });
}

// sort and set the links' y1 for each node
function sortTargetLinks(graph, y1, id) {
  graph.nodes.forEach(function (node) {
    var nodesTargetLinks = graph.links.filter(function (l) {
      return getNodeID(l.target, id) == getNodeID(node, id);
    });

    var nodesTargetLinksLength = nodesTargetLinks.length;

    if (nodesTargetLinksLength > 1) {
      nodesTargetLinks.sort(function (link1, link2) {
        // if both are not circular, the base on the source y position
        if (!link1.circular && !link2.circular) {
          if (link1.source.column == link2.source.column) {
            return link1.y0 - link2.y0;
          } else if (!sameInclines(link1, link2)) {
            return link1.y0 - link2.y0;
          } else {
            // get the angle of the link to the further source node (ie the smaller column)
            if (link2.source.column < link1.source.column) {
              var link2Adj = linkPerpendicularYToLinkSource(link2, link1);

              return link1.y0 - link2Adj;
            }
            if (link1.source.column < link2.source.column) {
              var link1Adj = linkPerpendicularYToLinkSource(link1, link2);

              return link1Adj - link2.y0;
            }
          }
        }

        // if only one is circular, the move top links up, or bottom links down
        if (link1.circular && !link2.circular) {
          return link1.circularLinkType == 'top' ? -1 : 1;
        } else if (link2.circular && !link1.circular) {
          return link2.circularLinkType == 'top' ? 1 : -1;
        }

        // if both links are circular...
        if (link1.circular && link2.circular) {
          // ...and they both loop the same way (both top)
          if (link1.circularLinkType === link2.circularLinkType && link1.circularLinkType == 'top') {
            // ...and they both connect to a target with same column, then sort by the target's y
            if (link1.source.column === link2.source.column) {
              return link1.source.y1 - link2.source.y1;
            } else {
              // ...and they connect to different column targets, then sort by how far back they
              return link1.source.column - link2.source.column;
            }
          } else if (link1.circularLinkType === link2.circularLinkType && link1.circularLinkType == 'bottom') {
            // ...and they both loop the same way (both bottom)
            // ...and they both connect to a target with same column, then sort by the target's y
            if (link1.source.column === link2.source.column) {
              return link1.source.y1 - link2.source.y1;
            } else {
              // ...and they connect to different column targets, then sort by how far back they
              return link2.source.column - link1.source.column;
            }
          } else {
            // ...and they loop around different ways, the move top up and bottom down
            return link1.circularLinkType == 'top' ? -1 : 1;
          }
        }
      });
    }

    // update y1 for links
    var yTargetOffset = node.y0;

    nodesTargetLinks.forEach(function (link) {
      link.y1 = yTargetOffset + link.width / 2;
      yTargetOffset = yTargetOffset + link.width;
    });

    // correct any circular bottom links so they are at the bottom of the node
    nodesTargetLinks.forEach(function (link, i) {
      if (link.circularLinkType == 'bottom') {
        var j = i + 1;
        var offsetFromBottom = 0;
        // sum the widths of any links that are below this link
        for (j; j < nodesTargetLinksLength; j++) {
          offsetFromBottom = offsetFromBottom + nodesTargetLinks[j].width;
        }
        link.y1 = node.y1 - offsetFromBottom - link.width / 2;
      }
    });
  });
}

// test if links both slope up, or both slope down
function sameInclines(link1, link2) {
  return incline(link1) == incline(link2);
}

// returns the slope of a link, from source to target
// up => slopes up from source to target
// down => slopes down from source to target
function incline(link) {
  return link.y0 - link.y1 > 0 ? 'up' : 'down';
}

// check if link is self linking, ie links a node to the same node
function selfLinking(link, id) {
  return getNodeID(link.source, id) == getNodeID(link.target, id);
}

function fillHeight(graph, y0, y1) {

  var nodes = graph.nodes;
  var links = graph.links;

  var top = false;
  var bottom = false;

  links.forEach(function (link) {
    if (link.circularLinkType == "top") {
      top = true;
    } else if (link.circularLinkType == "bottom") {
      bottom = true;
    }
  });

  if (top == false || bottom == false) {
    var minY0 = min(nodes, function (node) {
      return node.y0;
    });
    var maxY1 = max(nodes, function (node) {
      return node.y1;
    });
    var currentHeight = maxY1 - minY0;
    var chartHeight = y1 - y0;
    var ratio = chartHeight / currentHeight;

    nodes.forEach(function (node) {
      var nodeHeight = (node.y1 - node.y0) * ratio;
      node.y0 = (node.y0 - minY0) * ratio;
      node.y1 = node.y0 + nodeHeight;
    });

    links.forEach(function (link) {
      link.y0 = (link.y0 - minY0) * ratio;
      link.y1 = (link.y1 - minY0) * ratio;
      link.width = link.width * ratio;
    });
  }
}

var sankeyCircular$1 = /*#__PURE__*/Object.freeze({
  sankeyCircular: sankeyCircular,
  sankeyCenter: center$2,
  sankeyLeft: left$1,
  sankeyRight: right$1,
  sankeyJustify: justify
});

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$2 = _freeGlobal || freeSelf || Function('return this')();

var _root = root$2;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$2.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$3.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$4 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$4.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var DataView = _getNative(_root, 'DataView');

var _DataView = DataView;

/* Built-in method references that are verified to be native. */
var Map$1 = _getNative(_root, 'Map');

var _Map = Map$1;

/* Built-in method references that are verified to be native. */
var Promise$1 = _getNative(_root, 'Promise');

var _Promise = Promise$1;

/* Built-in method references that are verified to be native. */
var Set$1 = _getNative(_root, 'Set');

var _Set = Set$1;

/* Built-in method references that are verified to be native. */
var WeakMap = _getNative(_root, 'WeakMap');

var _WeakMap = WeakMap;

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = _baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (_Map && getTag(new _Map) != mapTag) ||
    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
    (_Set && getTag(new _Set) != setTag) ||
    (_WeakMap && getTag(new _WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

var _getTag = getTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$3.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$1 = '[object Map]',
    numberTag = '[object Number]',
    objectTag$1 = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag = '[object String]',
    weakMapTag$1 = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$1] = typedArrayTags[numberTag] =
typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] =
typedArrayTags[setTag$1] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag$1] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]',
    setTag$2 = '[object Set]';

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike_1(value) &&
      (isArray_1(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer_1(value) || isTypedArray_1(value) || isArguments_1(value))) {
    return !value.length;
  }
  var tag = _getTag(value);
  if (tag == mapTag$2 || tag == setTag$2) {
    return !value.size;
  }
  if (_isPrototype(value)) {
    return !_baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty$4.call(value, key)) {
      return false;
    }
  }
  return true;
}

var isEmpty_1 = isEmpty;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new _ListCache;
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$5.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$6.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;

var _Stack = Stack;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}

var _setCacheAdd = setCacheAdd;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new _MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;

var _SetCache = SetCache;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var _arraySome = arraySome;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new _SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!_arraySome(other, function(othValue, othIndex) {
            if (!_cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;

/** Built-in value references. */
var Uint8Array = _root.Uint8Array;

var _Uint8Array = Uint8Array;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    mapTag$3 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$3 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$2:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag$1:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag$1:
    case dateTag$1:
    case numberTag$1:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag$1:
      return object.name == other.name && object.message == other.message;

    case regexpTag$1:
    case stringTag$1:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag$3:
      var convert = _mapToArray;

    case setTag$3:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$1;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

var _equalByTag = equalByTag;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};

var _getSymbols = getSymbols;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex;

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$a.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$7.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys$1(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys$1;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$b.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$8.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    objectTag$2 = '[object Object]';

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag$1 : _getTag(object),
      othTag = othIsArr ? arrayTag$1 : _getTag(other);

  objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
  othTag = othTag == argsTag$2 ? objectTag$2 : othTag;

  var objIsObj = objTag == objectTag$2,
      othIsObj = othTag == objectTag$2,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack);
    return (objIsArr || isTypedArray_1(object))
      ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
    var objIsWrapped = objIsObj && hasOwnProperty$9.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$9.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new _Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack);
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return _baseIsEqual(value, other);
}

var isEqual_1 = isEqual;

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

var _baseFindIndex = baseFindIndex;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new _Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

var _baseIsMatch = baseIsMatch;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject_1(value);
}

var _isStrictComparable = isStrictComparable;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys_1(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, _isStrictComparable(value)];
  }
  return result;
}

var _getMatchData = getMatchData;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

var _matchesStrictComparable = matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = _getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || _baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches;

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$1);
}

var isSymbol_1 = isSymbol;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol_1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache;

var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize_1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = _memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }
  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }
  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = _castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get$2(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get$2;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = _castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = _toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_1(length) && _isIndex(key, length) &&
    (isArray_1(object) || isArguments_1(object));
}

var _hasPath = hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}

var hasIn_1 = hasIn;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get_1(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn_1(object, path)
      : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
  };
}

var _baseMatchesProperty = baseMatchesProperty;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity$a(value) {
  return value;
}

var identity_1 = identity$a;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return _baseGet(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}

var property_1 = property;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity_1;
  }
  if (typeof value == 'object') {
    return isArray_1(value)
      ? _baseMatchesProperty(value[0], value[1])
      : _baseMatches(value);
  }
  return property_1(value);
}

var _baseIteratee = baseIteratee;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol_1(value)) {
    return NAN;
  }
  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber;

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber_1(value);
  if (value === INFINITY$2 || value === -INFINITY$2) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

var toFinite_1 = toFinite;

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite_1(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

var toInteger_1 = toInteger;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger_1(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return _baseFindIndex(array, _baseIteratee(predicate), index);
}

var findIndex_1 = findIndex;

// Sankey Component Util
var strIdConvert = function strIdConvert(id) {
  return id.split(' ').join('_');
}; // Table Component Util

var tableHeaderConvert = function tableHeaderConvert(header) {
  return header.split('_').map(function (title) {
    return "".concat(title[0].toUpperCase()).concat(title.slice(1));
  }).join(' ');
}; // TimelineChart Component Util
function renderSVG(domObj, width, height) {
  if (!(domObj instanceof selection)) {
    throw new Error('domObj is not a d3.selection');
  }

  return domObj.append('svg').attr('width', width).attr('height', height);
}
function generateGroup(anchorEl, _ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$xOffset = _ref.xOffset,
      xOffset = _ref$xOffset === void 0 ? 0 : _ref$xOffset,
      _ref$yOffset = _ref.yOffset,
      yOffset = _ref$yOffset === void 0 ? 0 : _ref$yOffset;
  return anchorEl.append('g').attr('class', className).attr('transform', "translate(".concat(xOffset, ", ").concat(yOffset, ")"));
}
var getStartAndEndTime = function getStartAndEndTime(dataPoints) {
  if (!(dataPoints instanceof Array)) {
    throw new Error('datapoints should be a list');
  }

  var startTime = dataPoints[0].startTime;
  var endTime = 0;
  dataPoints.forEach(function (d) {
    if (!Date.parse(d.startTime) || !Date.parse(d.endTime)) {
      throw new Error('data point should have both startTime and endTime' + JSON.stringify(d));
    }

    if (Date.parse(d.startTime) < Date.parse(startTime)) {
      startTime = d.startTime;
    }

    if (Date.parse(d.endTime) > Date.parse(endTime)) {
      endTime = d.endTime;
    }
  });
  return {
    startTime: Date.parse(startTime),
    endTime: Date.parse(endTime)
  };
};
var circleDataFilter = function circleDataFilter(data) {
  return data.filter(function (d) {
    return Date.parse(d.endTime) - Date.parse(d.startTime) === 0;
  });
};
var rectDataFilter = function rectDataFilter(data) {
  return data.filter(function (d) {
    return Date.parse(d.endTime) - Date.parse(d.startTime) > 0;
  });
};
var labelList = function labelList(data) {
  var result = [];
  data.forEach(function (d) {
    var labelIdx = d.label.length - 1;
    result.push(d.label[labelIdx]);
  });
  return result;
};
var lineDataFormatConvert = function lineDataFormatConvert(data) {
  var x = data.xaxis,
      _data$data = _slicedToArray(data.data, 1),
      y = _data$data[0].data;

  return x.map(function (d, idx) {
    return {
      x: d,
      y: y[idx]
    };
  });
};

var sankeyData = {
  nodes: [{
    name: 'ECG'
  }, {
    name: 'elective'
  }, {
    name: 'MICU'
  }, {
    name: 'ECHO'
  }, {
    name: 'CMED'
  }, {
    name: 'VSURG'
  }, {
    name: 'urgent'
  }, {
    name: 'CSRU'
  }, {
    name: 'SURG'
  }, {
    name: 'MED'
  }, {
    name: 'CABG'
  }, {
    name: 'PCI'
  }, {
    name: 'died'
  }, {
    name: 'CSURG'
  }, {
    name: 'emergency'
  }, {
    name: 'CCU'
  }],
  links: [{
    source: 'emergency',
    target: 'CMED',
    value: 4463
  }, {
    source: 'emergency',
    target: 'MICU',
    value: 2958
  }, {
    source: 'emergency',
    target: 'CCU',
    value: 1607
  }, {
    source: 'emergency',
    target: 'SURG',
    value: 860
  }, {
    source: 'emergency',
    target: 'CSURG',
    value: 531
  }, {
    source: 'emergency',
    target: 'CABG',
    value: 469
  }, {
    source: 'emergency',
    target: 'VSURG',
    value: 357
  }, {
    source: 'elective',
    target: 'CSURG',
    value: 233
  }, {
    source: 'elective',
    target: 'ECG',
    value: 95
  }, {
    source: 'emergency',
    target: 'CSRU',
    value: 338
  }, {
    source: 'emergency',
    target: 'ECG',
    value: 63
  }, {
    source: 'VSURG',
    target: 'ECG',
    value: 340
  }, {
    source: 'VSURG',
    target: 'CSRU',
    value: 114
  }, {
    source: 'VSURG',
    target: 'ECHO',
    value: 67
  }, {
    source: 'ECG',
    target: 'ECHO',
    value: 8892
  }, {
    source: 'CCU',
    target: 'ECG',
    value: 2996
  }, {
    source: 'CCU',
    target: 'CMED',
    value: 1736
  }, {
    source: 'CCU',
    target: 'ECHO',
    value: 924
  }, {
    source: 'CCU',
    target: 'MED',
    value: 386
  }, {
    source: 'CSRU',
    target: 'ECG',
    value: 1626
  }, {
    source: 'CSRU',
    target: 'CABG',
    value: 1281
  }, {
    source: 'CSRU',
    target: 'CSURG',
    value: 1093
  }, {
    source: 'CSRU',
    target: 'ECHO',
    value: 459
  }, {
    source: 'ECG',
    target: 'died',
    value: 1175
  }, {
    source: 'ECHO',
    target: 'died',
    value: 413
  }, {
    source: 'MICU',
    target: 'died',
    value: 373
  }, {
    source: 'MED',
    target: 'died',
    value: 185
  }, {
    source: 'CCU',
    target: 'died',
    value: 134
  }, {
    source: 'ECG',
    target: 'PCI',
    value: 2
  }, {
    source: 'CMED',
    target: 'PCI',
    value: 1
  }, {
    source: 'PCI',
    target: 'CCU',
    value: 1
  }, {
    source: 'PCI',
    target: 'died',
    value: 1
  }, {
    source: 'PCI',
    target: 'ECHO',
    value: 1
  }, {
    source: 'urgent',
    target: 'CMED',
    value: 323
  }, {
    source: 'urgent',
    target: 'MED',
    value: 119
  }, {
    source: 'urgent',
    target: 'CCU',
    value: 66
  }, {
    source: 'urgent',
    target: 'MICU',
    value: 53
  }, {
    source: 'urgent',
    target: 'CSURG',
    value: 46
  }, {
    source: 'SURG',
    target: 'ECG',
    value: 561
  }, {
    source: 'SURG',
    target: 'ECHO',
    value: 144
  }, {
    source: 'SURG',
    target: 'MICU',
    value: 83
  }, {
    source: 'CSRU',
    target: 'ECG',
    value: 1626
  }, {
    source: 'CSRU',
    target: 'CABG',
    value: 1281
  }, {
    source: 'CSRU',
    target: 'CSURG',
    value: 1093
  }, {
    source: 'CSRU',
    target: 'ECHO',
    value: 459
  }]
};

var SankeyChart =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SankeyChart, _React$Component);

  function SankeyChart(props) {
    var _this;

    _classCallCheck(this, SankeyChart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SankeyChart).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "id", void 0);

    _defineProperty(_assertThisInitialized(_this), "getNodeName", function (node) {
      return node.name;
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedNode", function (selectedNode) {
      if (!_this.state.selectedNodes.includes(selectedNode)) {
        _this.setState({
          selectedNodes: _this.state.selectedNodes.concat(selectedNode)
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "highlightLink", function (id) {
      var d3 = _this.d3;

      for (var i = 0; i < id.length; i++) {
        var _id$i$split = id[i].split('X'),
            _id$i$split2 = _slicedToArray(_id$i$split, 2),
            source = _id$i$split2[0],
            target = _id$i$split2[1];

        var forwardPath = d3.select("#".concat(source, "X").concat(target));
        var reversePath = d3.select("#".concat(target, "X").concat(source));
        var sourceXPosition = document.getElementById(source).getBoundingClientRect().x;
        var targetXPosition = document.getElementById(target).getBoundingClientRect().x;

        if (targetXPosition > sourceXPosition) {
          forwardPath.style('opacity', 1).style('stroke', 'rgba(24, 155, 255, 0.4)');
        } else {
          reversePath.style('opacity', 1).style('stroke', 'rgba(255, 58, 31, 0.4)');
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "createLinkId", function (selectedNodes) {
      if (selectedNodes.length === 0) return null;
      var idCollection = [];

      for (var i = 0; i < selectedNodes.length; i++) {
        if (i === selectedNodes.length - 1) break;
        var id = "".concat(strIdConvert(selectedNodes[i]), "X").concat(strIdConvert(selectedNodes[i + 1]));
        idCollection.push(id);
      }

      return idCollection;
    });

    _defineProperty(_assertThisInitialized(_this), "renderPlaceholder", function () {
      return React__default.createElement("div", null, "No data is provided!");
    });

    _defineProperty(_assertThisInitialized(_this), "initializeSankey", function (d3, _ref) {
      var nodeWidth = _ref.nodeWidth,
          width = _ref.width,
          height = _ref.height,
          iterations = _ref.iterations,
          circularLinkGap = _ref.circularLinkGap;
      return d3.sankeyCircular().nodeWidth(nodeWidth).nodePaddingRatio(0.5).size([width, height]).nodeId(function (d) {
        return d.name;
      }).iterations(iterations).circularLinkGap(circularLinkGap);
    });

    _defineProperty(_assertThisInitialized(_this), "initializeSVG", function (d3, _ref2) {
      var width = _ref2.width,
          height = _ref2.height,
          margin = _ref2.margin;
      return _this.d3.select("div#chart_".concat(_this.id)).append('svg').attr('id', _this.id).attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
    });

    _defineProperty(_assertThisInitialized(_this), "initializeGroups", function (svg, _ref3) {
      var margin = _ref3.margin;
      var entireGroup = svg.append('g').attr('transform', "translate(".concat(margin.left, ", ").concat(margin.top, ")"));
      var nodeGroup = entireGroup.append('g').attr('class', 'nodes').attr('font-family', 'sans-serif').attr('font-size', 10).selectAll('g');
      var linkGroup = entireGroup.append('g').attr('class', 'links').attr('fill', 'none').selectAll('path');
      return [entireGroup, nodeGroup, linkGroup];
    });

    _defineProperty(_assertThisInitialized(_this), "processDataForSankey", function (sankey, data) {
      return sankey(data);
    });

    _defineProperty(_assertThisInitialized(_this), "renderNodes", function (nodeG, sankeyNodesData, _ref4) {
      var width = _ref4.width;
      var selectedNodes = _this.props.selectedNodes || [];

      var nodeColor = _this.d3.scaleSequential(_this.d3.interpolateCool).domain([0, width]); // Enter node g


      var node = nodeG.data(sankeyNodesData).enter().append('g'); // Render rect

      node.append('rect').attr('x', function (d) {
        return d.x0;
      }).attr('y', function (d) {
        return d.y0;
      }).attr('height', function (d) {
        return d.y1 - d.y0;
      }).attr('width', function (d) {
        return d.x1 - d.x0;
      }).attr('rx', 4).attr('ry', 4).attr('id', function (d) {
        return strIdConvert(d.name);
      }).style('fill', "#002d4f").style('cursor', "pointer"); // Render node name

      node.append('text').attr('x', function (d) {
        return (d.x0 + d.x1) / 2;
      }).attr('y', function (d) {
        return d.y0 - 12;
      }).attr('dy', '0.35em').attr('fill', 'rgba(0, 0, 0, 0.4)').attr('font-famliy', 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif').attr('text-anchor', 'middle').attr('font-size', '14').attr('font-weight', 'normal').attr('font-style', 'normal').attr('font-stretch', 'normal').attr('line-height', 'normal').attr('letter-spacing', '0.5px').text(function (d) {
        return d.name;
      });
      /*
      pr url:https://github.com/linewalks/Cardio_Demo_View/pull/52/files
      TODO: node tooltip 사용성이 확정되면 다시 기능 추가할것.
      Render node title
      node.append('title').text(d => `${d.name}\n${d.value}`)
      */

      return node;
    });

    _defineProperty(_assertThisInitialized(_this), "renderLinks", function (linkG, sankeyLinksData) {
      var selectedNodes = _this.props.selectedNodes || [];
      var link = linkG.data(sankeyLinksData).enter().append('g');
      link.append('path').attr('class', 'sankey-link').attr('id', function (d) {
        return "".concat(strIdConvert(d.source.name), "X").concat(strIdConvert(d.target.name));
      }).attr('d', function (link) {
        return link.path;
      }).style('stroke-width', function (d) {
        return Math.max(1, d.width);
      }).style('opacity', function (d) {
        var srcIndex = findIndex_1(selectedNodes, function (name) {
          return name === d.source.name;
        });
        var targetIndex = findIndex_1(selectedNodes, function (name) {
          return name === d.target.name;
        });

        if (targetIndex - srcIndex === 1) {
          return 1.0;
        } else {
          return 0.04;
        }
      }).style('stroke', '#000000');
      /*
      pr url:https://github.com/linewalks/Cardio_Demo_View/pull/52/files
      TODO: link tooltip 사용성이 확정되면 다시 기능 추가할것.
      link.append('title').text(d => {
        return `${d.source.name} → ${d.target.name}\n Count: ${d.value}`
      })
      */

      return link;
    });

    _defineProperty(_assertThisInitialized(_this), "attachEventHandlersToNode", function (d3, nodes, _ref5) {
      var onClick = _ref5.onClick;


      if (onClick) {
        nodes.on('click', function (data) {
          _this.getSelectedNode(_this.getNodeName(data));

          onClick(_this.state.selectedNodes);
        });
      }

      return nodes;
    });

    _defineProperty(_assertThisInitialized(_this), "attachEventHandlersToLink", function (d3, links, _ref6) {
      var onClick = _ref6.onClick;

      if (onClick) {
        links.on('click', function (data) {
          onClick(data);
        });
      }

      return links;
    });

    _defineProperty(_assertThisInitialized(_this), "renderSankey", function () {
      var d3 = _this.d3;
      var _this$props = _this.props,
          data = _this$props.data,
          options = _this$props.options,
          onNodeClick = _this$props.onNodeClick,
          onNodeHover = _this$props.onNodeHover,
          onLinkClick = _this$props.onLinkClick,
          onLinkHover = _this$props.onLinkHover;
      var height = options.height,
          width = options.width,
          margin = options.margin,
          nodeWidth = options.nodeWidth,
          nodePadding = options.nodePadding,
          iterations = options.iterations,
          circularLinkGap = options.circularLinkGap;
      _this.sankey = _this.initializeSankey(d3, {
        height: height,
        width: width,
        nodeWidth: nodeWidth,
        iterations: iterations,
        circularLinkGap: circularLinkGap
      });
      _this.svg = _this.initializeSVG(d3, {
        width: width,
        height: height,
        margin: margin
      }); // initialize entire group, link group, node group

      var _this$initializeGroup = _this.initializeGroups(_this.svg, {
        margin: margin
      }),
          _this$initializeGroup2 = _slicedToArray(_this$initializeGroup, 3),
          g = _this$initializeGroup2[0],
          nodeG = _this$initializeGroup2[1],
          linkG = _this$initializeGroup2[2];

      var sankeyData = _this.processDataForSankey(_this.sankey, data);

      var sankeyNodesData = sankeyData.nodes;
      var sankeyLinksData = sankeyData.links;

      var nodes = _this.renderNodes(nodeG, sankeyNodesData, {
        width: width
      });

      var links = _this.renderLinks(linkG, sankeyLinksData);

      if (onNodeClick) {
        nodes = _this.attachEventHandlersToNode(d3, nodes, {
          onClick: onNodeClick
        });
      } else {
        nodes.on('click', function (data) {
          _this.getSelectedNode(_this.getNodeName(data));
        });
      }

      links = _this.attachEventHandlersToNode(d3, links, {
        onClick: onLinkClick
      });
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      var data = _this.props.data;
      return isEmpty_1(data) ? null : _this.renderSankey();
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps, prevState) {
      if (!isEqual_1(prevState.selectedNodes, _this.state.selectedNodes)) {
        var LinkId = _this.createLinkId(_this.state.selectedNodes);

        _this.highlightLink(LinkId);
      }
    });

    _this.d3 = _objectSpread2({}, d3Core, {}, sankeyCircular$1);
    _this.id = props.id;
    _this.state = {
      selectedNodes: props.selectedNodes || []
    };
    return _this;
  }

  _createClass(SankeyChart, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          data = _this$props2.data,
          id = _this$props2.id;
      return isEmpty_1(data) ? this.renderPlaceholder() : React__default.createElement("div", {
        id: "chart_".concat(this.id)
      });
    }
  }]);

  return SankeyChart;
}(React__default.Component);

SankeyChart.defaultProps = {
  options: {
    height: 254,
    width: 1000,
    nodeWidth: 25,
    nodePadding: 20,
    iterations: 15,
    circularLinkGap: 1,
    margin: {
      top: 100,
      right: 100,
      bottom: 100,
      left: 100
    }
  },
  data: sankeyData
};

var css$2 = ".SelectedCard_wrap_1200__2Uu8v {\n  max-width: 1200px;\n  width: 1200px;\n  margin: 0 auto;\n  text-align: center;\n}\n\n.SelectedCard_arrow__1KwcE {\n  display: inline-block;\n  background-repeat: no-repeat;\n  background-position-x: 100%;\n  background-position-y: 15px;\n  padding-right: 18px;\n  margin-right: 8px;\n}\n\n.SelectedCard_card_contatiner__3DS8T {\n  display: inline-block;\n  border-radius: 25px;\n  box-shadow: 0 4px 10px 0 rgba(0, 45, 79, 0.16);\n  background-color: #002b4f;\n  padding: 11px 24px 10px;\n}\n\n.SelectedCard_card__15x9m {\n  color: #ffffff;\n  line-height: 1;\n  font-size: 20px;\n  font-weight: bold;\n  letter-spacing: -0.5px;\n}";
var styles$2 = {"wrap_1200":"SelectedCard_wrap_1200__2Uu8v","arrow":"SelectedCard_arrow__1KwcE","card_contatiner":"SelectedCard_card_contatiner__3DS8T","card":"SelectedCard_card__15x9m"};
styleInject(css$2);

var backgroundArrow = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICAgIDxwYXRoIGZpbGw9IiMwMDJENEYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTguNzA3IDEuNjM2bDQuNjU3IDQuNjU3YTEgMSAwIDAgMSAwIDEuNDE0bC00LjY1NyA0LjY1N0ExIDEgMCAwIDEgNyAxMS42NTdWMi4zNDNhMSAxIDAgMCAxIDEuNzA3LS43MDd6IiBvcGFjaXR5PSIuOCIvPgo8L3N2Zz4=';

var SelectedCard = function SelectedCard(_ref) {
  var selectedElement = _ref.selectedElement;
  return React__default.createElement("div", {
    className: styles$2.wrap_1200
  }, selectedElement.map(function (element, idx) {
    return React__default.createElement("article", {
      key: idx,
      className: styles$2.arrow,
      style: idx !== selectedElement.length - 1 ? {
        backgroundImage: "url(".concat(backgroundArrow, ")")
      } : null
    }, React__default.createElement("div", {
      className: styles$2.card_contatiner,
      key: idx
    }, React__default.createElement("span", {
      className: styles$2.card,
      key: idx
    }, element)));
  }));
};

var css$3 = ".SummaryCard_wrap_1200__3gB3b {\n  max-width: 1200px;\n  width: 1200px;\n  margin: 0 auto;\n}\n\n.SummaryCard_article__1Rb6Q {\n  width: 282px;\n  height: 170px;\n  border-radius: 10px;\n  box-shadow: 0 4px 10px 0 rgba(0, 45, 79, 0.16);\n  background-color: #ffffff;\n  font-size: 0;\n  display: inline-block;\n  text-align: center;\n  margin-right: 24px;\n}\n\n.SummaryCard_article__1Rb6Q:last-child {\n  margin-right: 0;\n}\n\n.SummaryCard_article__1Rb6Q > div {\n  position: relative;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  background-repeat: no-repeat;\n  background-position-x: 12px;\n  background-position-y: 52px;\n}\n\n.SummaryCard_summary_b_42__3hOVh {\n  font-size: 42px;\n  font-weight: bold;\n  letter-spacing: -0.5px;\n  color: #002d4f;\n}\n\n.SummaryCard_article__1Rb6Q dd {\n  display: block;\n  margin-inline-start: 40px;\n}\n\n.SummaryCard_article__1Rb6Q dl {\n  width: 100%;\n  text-align: right;\n  padding-right: 44px;\n}\n\n.SummaryCard_article__1Rb6Q dl,\n.SummaryCard_article__1Rb6Q dd {\n  margin: 0;\n}\n\n.SummaryCard_article__1Rb6Q dt {\n  color: rgba(0, 0, 0, 0.4);\n}\n\n.SummaryCard_article__1Rb6Q .SummaryCard_body_b_16__178_6 {\n  font-size: 16px;\n  font-weight: bold;\n  letter-spacing: -0.5px;\n}";
var styles$3 = {"wrap_1200":"SummaryCard_wrap_1200__3gB3b","article":"SummaryCard_article__1Rb6Q","summary_b_42":"SummaryCard_summary_b_42__3hOVh","body_b_16":"SummaryCard_body_b_16__178_6"};
styleInject(css$3);

var SummaryCard = function SummaryCard(_ref) {
  var data = _ref.data;
  var summaryData = Object.entries(data);

  if (summaryData.length === 0) {
    summaryData = [{
      "Event Occurrence": 0,
      "Number of Patients": 0,
      "Average Mortality Rate": 0.0,
      "Average Length of Stay": 0
    }];
  }

  return React__default.createElement("div", {
    className: styles$3.wrap_1200
  }, summaryData.map(function (_ref2, idx) {
    var _ref3 = _slicedToArray(_ref2, 2),
        name = _ref3[0],
        value = _ref3[1];

    return React__default.createElement("article", {
      key: idx,
      className: styles$3.article
    }, React__default.createElement("div", null, React__default.createElement("dl", null, React__default.createElement("dd", {
      className: styles$3.summary_b_42
    }, value), React__default.createElement("dt", {
      className: styles$3.body_b_16
    }, name))));
  }));
};

var css$4 = ".Table_table__3W-tG {\n  border-collapse: collapse;\n  border-spacing: 0;\n  width: 100%;\n}\n\n.Table_body_b_16__2HKYm {\n  font-weight: bold;\n  letter-spacing: -0.5px; \n}\n\n.Table_body_r_18__2hfAb {\n  font-size: 18px;\n}\n\n.Table_body_r_20__kuuAb {\n  font-size: 20px;\n}\n\n.Table_th__2UhMg {\n  padding: 28px 24px;\n  text-align: center;\n  background: #f2f2f2;\n  border-bottom: 2px solid #d4d4d4;\n  color: rgba(0, 0, 0, 0.7);\n  font-size: 16px;\n  font-family: \"Spoqa Han Sans\";\n}\n\n.Table_th__2UhMg:first-child {\n  border-radius: 10px 0 0 0; \n}\n\n.Table_th__2UhMg:last-child {\n  border-radius: 0 10px 0 0;\n}\n\n.Table_tr__3D6bR {\n  cursor: pointer;\n}\n/* https://stackoverflow.com/questions/17458582/nth-childeven-odd-selector-with-class */\n.Table_tr__3D6bR:nth-child(even) .Table_td__1_pu2 {\n  background: #ffffff;\n}\n\n.Table_tr__3D6bR:nth-child(odd) .Table_td__1_pu2 {\n  background: #fafafa;\n}\n/* after the first non-.parent, toggle colors */\ntr:not(.Table_tr__3D6bR) ~ .Table_tr__3D6bR:nth-child(odd) td {\n    background-color: #ffffff;\n}\ntr:not(.Table_tr__3D6bR) ~ .Table_tr__3D6bR:nth-child(even) td {\n    background-color: #fafafa;\n}\n\n/* after the second non-.parent, toggle again */\ntr:not(.Table_tr__3D6bR) ~ tr:not(.Table_tr__3D6bR) ~ .Table_tr__3D6bR:nth-child(odd) td {\n    background-color: #fafafa;\n}\ntr:not(.Table_tr__3D6bR) ~ tr:not(.Table_tr__3D6bR) ~ .Table_tr__3D6bR:nth-child(even) td {\n    background-color: #ffffff;\n}\n\n.Table_td__1_pu2 {\n  text-align: center;\n  font-size: 18px;\n  font-family: \"Spoqa Han Sans\";\n}\n\n.Table_td__1_pu2 > a > div, .Table_td__1_pu2 > div {\n  padding: 24px;\n}\n\n.Table_th__2UhMg:first-child, .Table_th__2UhMg:last-child, .Table_td__1_pu2:first-child, .Table_td__1_pu2:last-child {\n  white-space: nowrap;\n  width: 1%;\n}\n\n.Table_th__2UhMg:first-child, .Table_td__1_pu2:first-child {\n  padding-left: 50px;\n}\n\n.Table_th__2UhMg:last-child, .Table_td__1_pu2:last-child {\n  padding-right: 50px;\n}\n\n.Table_empty_table_grey_list__33788 {\n  padding: 80px;\n}\n\n.Table_empty_table_grey_list__33788 td {\n  margin: 0 auto;\n  text-align: center;\n  font-family: \"Spoqa Han Sans\";\n}\n\n.Table_empty_table_grey_list__33788 span {\n  margin: auto;\n  color: #161616;\n  display: block;\n  font-size: 20px;\n  opacity: 0.6;\n  font-family: \"Spoqa Han Sans\";\n}\n\n.Table_empty_table_grey_header__3mHSH {\n  font-size: 16px;\n  color: rgba(#000000, 0.36);\n  font-family: \"Spoqa Han Sans\";\n}";
var styles$4 = {"table":"Table_table__3W-tG","body_b_16":"Table_body_b_16__2HKYm","body_r_18":"Table_body_r_18__2hfAb","body_r_20":"Table_body_r_20__kuuAb","th":"Table_th__2UhMg","tr":"Table_tr__3D6bR","td":"Table_td__1_pu2","empty_table_grey_list":"Table_empty_table_grey_list__33788","empty_table_grey_header":"Table_empty_table_grey_header__3mHSH"};
styleInject(css$4);

var THead = function THead(_ref) {
  var headers = _ref.headers,
      subHeaders = _ref.subHeaders;

  var createHeader = function createHeader(headerData, subHeaderData) {
    if (isEmpty_1(subHeaderData)) {
      if (isEmpty_1(headerData)) {
        return React__default.createElement("tr", null, React__default.createElement("th", null));
      } else {
        return React__default.createElement("tr", null, headerData.map(function (header, idx) {
          return React__default.createElement("th", {
            key: header,
            className: styles$4.th
          }, tableHeaderConvert(header));
        }));
      }
    } else {
      return React__default.createElement("tr", null, headerData.map(function (header, idx) {
        if (idx === 0) {
          return React__default.createElement("th", {
            rowSpan: 2,
            key: idx,
            className: styles$4.th
          }, header);
        } else {
          var subHeaderColNum = subHeaders[header].length;
          return React__default.createElement("th", {
            colSpan: subHeaderColNum,
            key: idx,
            className: styles$4.th
          }, header);
        }
      }));
    }
  };

  var createSubHeader = function createSubHeader(subHeaderData) {
    var subTitleGroup = Object.values(subHeaderData).join().split(',');
    return React__default.createElement("tr", null, subTitleGroup.map(function (subTitle, idx) {
      return React__default.createElement("td", {
        key: idx
      }, subTitle);
    }));
  };

  return React__default.createElement("thead", {
    className: styles$4.body_b_16
  }, createHeader(headers, subHeaders), isEmpty_1(subHeaders) ? null : createSubHeader(subHeaders));
};

var visualAlert = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjkwIiBoZWlnaHQ9IjIzMCIgdmlld0JveD0iMCAwIDI5MCAyMzAiPgogICAgPGRlZnM+CiAgICAgICAgPHBhdGggaWQ9ImEiIGQ9Ik0yOTAgMjA1LjYxNEMyNjAuODI2IDE4NC4zMDYgMjA2LjgxMSAxNzAgMTQ1IDE3MGMtNjEuODExIDAtMTE1LjgyNiAxNC4zMDYtMTQ1IDM1LjYxNFYwaDI5MHYyMDUuNjE0eiIvPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYyIgeDE9IjM0LjcyNiUiIHgyPSIzNC43MjYlIiB5MT0iMCUiIHkyPSI4Ni44MDglIj4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzE4OUJGRiIvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNCMkRFRkYiIHN0b3Atb3BhY2l0eT0iMCIvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPHBhdGggaWQ9ImQiIGQ9Ik0yOSAwaDc2LjM3YTQgNCAwIDAgMSAyLjg3IDEuMjE1bDI1LjYzMSAyNi40MjJBNCA0IDAgMCAxIDEzNSAzMC40MjJWMTMxYTQgNCAwIDAgMS00IDRIMjlhNCA0IDAgMCAxLTQtNFY0YTQgNCAwIDAgMSA0LTR6Ii8+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJmIiB4MT0iNDIuMTI5JSIgeDI9IjQyLjEyOSUiIHkxPSIwJSIgeTI9IjEwMCUiPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMTg5QkZGIi8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMTMuMzY4JSIgc3RvcC1jb2xvcj0iIzE4OUJGRiIvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxODlCRkYiIHN0b3Atb3BhY2l0eT0iMCIvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPHBhdGggaWQ9ImUiIGQ9Ik0zMSAwaDczLjUyM2E2IDYgMCAwIDEgNC4zMDcgMS44MjJsMjQuNDc3IDI1LjIzM0E2IDYgMCAwIDEgMTM1IDMxLjIzM1YxMjlhNiA2IDAgMCAxLTYgNkgzMWE2IDYgMCAwIDEtNi02VjZhNiA2IDAgMCAxIDYtNnoiLz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSI0My40OCUiIHgyPSI0My40OCUiIHkxPSI1MCUiIHkyPSIyMDQuMzA4JSI+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNFQUY2RkYiLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMTg5QkZGIi8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8cGF0aCBpZD0iaiIgZD0iTTE1NyAxMzZjLTE1LjQ2NCAwLTI4LTEyLjUzNi0yOC0yOHMxMi41MzYtMjggMjgtMjggMjggMTIuNTM2IDI4IDI4LTEyLjUzNiAyOC0yOCAyOHptMC0yYzE0LjM2IDAgMjYtMTEuNjQgMjYtMjZzLTExLjY0LTI2LTI2LTI2LTI2IDExLjY0LTI2IDI2IDExLjY0IDI2IDI2IDI2em0wLTI3LjQxNGw4LjQ4NS04LjQ4NSAxLjQxNCAxLjQxNC04LjQ4NSA4LjQ4NSA4LjQ4NSA4LjQ4NS0xLjQxNCAxLjQxNC04LjQ4NS04LjQ4NS04LjQ4NSA4LjQ4NS0xLjQxNC0xLjQxNCA4LjQ4NS04LjQ4NS04LjQ4NS04LjQ4NSAxLjQxNC0xLjQxNCA4LjQ4NSA4LjQ4NXoiLz4KICAgICAgICA8ZmlsdGVyIGlkPSJpIiB3aWR0aD0iMTQ0LjYlIiBoZWlnaHQ9IjE0NC42JSIgeD0iLTIyLjMlIiB5PSItMjAuNSUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeT0iMSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIiBzdGREZXZpYXRpb249IjQiLz4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggaW49InNoYWRvd0JsdXJPdXRlcjEiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMC41Njk2MjAyNTMgMCAwIDAgMCAxIDAgMCAwIDAuMzk5MDExMTQ1IDAiLz4KICAgICAgICA8L2ZpbHRlcj4KICAgICAgICA8ZWxsaXBzZSBpZD0ibCIgY3g9IjE0NiIgY3k9IjI0MyIgcng9IjE0NSIgcnk9IjcyIi8+CiAgICAgICAgPGZpbHRlciBpZD0iayIgd2lkdGg9IjExNS45JSIgaGVpZ2h0PSIxMzEuOSUiIHg9Ii03LjklIiB5PSItMTguOCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeT0iLTQiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz4KICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSIgc3RkRGV2aWF0aW9uPSI3Ii8+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAuNDcxOTA4NzcxIDAgMCAwIDAgMC44MzIxNDQ0NzUgMCAwIDAgMC43MDEyNDAxNjYgMCIvPgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDI0KSI+CiAgICAgICAgICAgIDxtYXNrIGlkPSJiIiBmaWxsPSIjZmZmIj4KICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI2EiLz4KICAgICAgICAgICAgPC9tYXNrPgogICAgICAgICAgICA8ZyBtYXNrPSJ1cmwoI2IpIiBvcGFjaXR5PSIuNiI+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3NyA0MCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9InVybCgjYykiIGQ9Ik02IDI1aDczLjUyM2E2IDYgMCAwIDEgNC4zMDcgMS44MjJsMjQuNDc3IDI1LjIzM0E2IDYgMCAwIDEgMTEwIDU2LjIzM1YxNTRhNiA2IDAgMCAxLTYgNkg2YTYgNiAwIDAgMS02LTZWMzFhNiA2IDAgMCAxIDYtNnoiIG9wYWNpdHk9Ii41NTEiLz4KICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNkIi8+CiAgICAgICAgICAgICAgICAgICAgPG1hc2sgaWQ9ImgiIGZpbGw9IiNmZmYiPgogICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNlIi8+CiAgICAgICAgICAgICAgICAgICAgPC9tYXNrPgogICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0idXJsKCNmKSIgb3BhY2l0eT0iLjcyMiIgeGxpbms6aHJlZj0iI2UiLz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSJ1cmwoI2cpIiBkPSJNMTA2LjcyOC0xLjE2NGwyOC42ODYgMzAuNDc5YTEgMSAwIDAgMS0uNzI4IDEuNjg1SDEwOWE0IDQgMCAwIDEtNC00Vi0uNDc4YTEgMSAwIDAgMSAxLjcyOC0uNjg2eiIgbWFzaz0idXJsKCNoKSIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDxnIG1hc2s9InVybCgjYikiPgogICAgICAgICAgICAgICAgPHVzZSBmaWxsPSIjMDAwIiBmaWx0ZXI9InVybCgjaSkiIHhsaW5rOmhyZWY9IiNqIi8+CiAgICAgICAgICAgICAgICA8dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNqIi8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPGcgbWFzaz0idXJsKCNiKSIgb3BhY2l0eT0iLjIiPgogICAgICAgICAgICAgICAgPHVzZSBmaWxsPSIjMDAwIiBmaWx0ZXI9InVybCgjaykiIHhsaW5rOmhyZWY9IiNsIi8+CiAgICAgICAgICAgICAgICA8dXNlIGZpbGw9IiMxODlCRkYiIHhsaW5rOmhyZWY9IiNsIi8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICAgICAgPGNpcmNsZSBjeD0iMjM5IiBjeT0iMTUzIiByPSIxOCIgZmlsbD0iIzE4OUJGRiIgb3BhY2l0eT0iLjEwNyIvPgogICAgICAgIDxjaXJjbGUgY3g9Ijc4LjUiIGN5PSI1NC41IiByPSIxMC41IiBmaWxsPSIjMTg5QkZGIiBvcGFjaXR5PSIuMyIvPgogICAgICAgIDxjaXJjbGUgY3g9IjU4IiBjeT0iMjkiIHI9IjI5IiBmaWxsPSIjMTg5QkZGIiBvcGFjaXR5PSIuMTA3Ii8+CiAgICAgICAgPGNpcmNsZSBjeD0iMjU3IiBjeT0iMTI2IiByPSI3IiBmaWxsPSIjMTg5QkZGIiBvcGFjaXR5PSIuMjk5Ii8+CiAgICA8L2c+Cjwvc3ZnPg==';

var TBody = function TBody(_ref) {
  var headers = _ref.headers,
      rowData = _ref.rowData,
      wrapTd = _ref.wrapTd,
      appendRow = _ref.appendRow;

  var renderPlaceholder = function renderPlaceholder() {
    return React__default.createElement("tr", null, React__default.createElement("td", {
      colSpan: isEmpty_1(headers) ? 1 : headers.length
    }, React__default.createElement("img", {
      src: visualAlert,
      width: "290px",
      height: "230px"
    }), React__default.createElement("span", {
      className: styles$4.body_r_20
    }, "There is no data", React__default.createElement("br", null), "Please search again")));
  };

  var createBody = function createBody(rowsData) {
    return rowsData.map(function (data, idx) {
      return [React__default.createElement("tr", {
        key: idx,
        className: "".concat(styles$4.tr, " ").concat(styles$4.body_r_18)
      }, Object.values(data).map(function (row, idx) {
        return React__default.createElement("td", {
          className: styles$4.td,
          key: idx
        }, wrapTd ? wrapTd({
          data: data,
          label: headers[idx],
          text: row
        }) : React__default.createElement("div", null, row));
      })), appendRow ? appendRow(data, idx) : null];
    });
  };

  return React__default.createElement("tbody", {
    className: isEmpty_1(rowData) ? styles$4.empty_table_grey_list : null
  }, isEmpty_1(rowData) ? renderPlaceholder() : createBody(rowData));
};

var Table = function Table(_ref) {
  var data = _ref.data,
      wrapTh = _ref.wrapTh,
      wrapTd = _ref.wrapTd,
      appendRow = _ref.appendRow;

  if (isEmpty_1(data)) {
    return React__default.createElement("div", null, "There is no data", React__default.createElement("br", null), "Please search agains");
  } else {
    return React__default.createElement("table", {
      className: styles$4.table
    }, React__default.createElement(THead, _extends({}, data, {
      wrapTh: wrapTh
    })), React__default.createElement(TBody, _extends({}, data, {
      wrapTd: wrapTd,
      appendRow: appendRow
    })));
  }
};

var highcharts = createCommonjsModule(function (module) {
/*
 Highcharts JS v7.1.2 (2019-06-03)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(O,J){module.exports?(J["default"]=J,module.exports=O.document?J(O):J):(O.Highcharts&&O.Highcharts.error(16,!0),O.Highcharts=J(O));})("undefined"!==typeof window?window:commonjsGlobal,function(O){function J(a,E,H,B){a.hasOwnProperty(E)||(a[E]=B.apply(null,H));}var G={};J(G,"parts/Globals.js",[],function(){var a="undefined"===typeof O?"undefined"!==typeof window?window:{}:O,E=a.document,
H=a.navigator&&a.navigator.userAgent||"",B=E&&E.createElementNS&&!!E.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,h=/(edge|msie|trident)/i.test(H)&&!a.opera,e=-1!==H.indexOf("Firefox"),q=-1!==H.indexOf("Chrome"),t=e&&4>parseInt(H.split("Firefox/")[1],10);return {product:"Highcharts",version:"7.1.2",deg2rad:2*Math.PI/360,doc:E,hasBidiBug:t,hasTouch:E&&"undefined"!==typeof E.documentElement.ontouchstart,isMS:h,isWebKit:-1!==H.indexOf("AppleWebKit"),isFirefox:e,isChrome:q,isSafari:!q&&
-1!==H.indexOf("Safari"),isTouchDevice:/(Mobile|Android|Windows Phone)/.test(H),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:B,win:a,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[],dateFormats:{}}});J(G,"parts/Utilities.js",[G["parts/Globals.js"]],function(a){a.timers=[];var E=a.charts,H=a.doc,B=a.win;a.error=function(h,e,q){var t=a.isNumber(h)?"Highcharts error #"+h+": www.highcharts.com/errors/"+h:h,u=function(){if(e)throw Error(t);
B.console&&console.log(t);};q?a.fireEvent(q,"displayError",{code:h,message:t},u):u();};a.Fx=function(a,e,q){this.options=e;this.elem=a;this.prop=q;};a.Fx.prototype={dSetter:function(){var a=this.paths[0],e=this.paths[1],q=[],t=this.now,u=a.length,v;if(1===t)q=this.toD;else if(u===e.length&&1>t)for(;u--;)v=parseFloat(a[u]),q[u]=isNaN(v)?e[u]:t*parseFloat(e[u]-v)+v;else q=e;this.elem.attr("d",q,null,!0);},update:function(){var a=this.elem,e=this.prop,q=this.now,t=this.options.step;if(this[e+"Setter"])this[e+
"Setter"]();else a.attr?a.element&&a.attr(e,q,null,!0):a.style[e]=q+this.unit;t&&t.call(a,q,this);},run:function(h,e,q){var t=this,u=t.options,v=function(a){return v.stopped?!1:t.step(a)},n=B.requestAnimationFrame||function(a){setTimeout(a,13);},g=function(){for(var d=0;d<a.timers.length;d++)a.timers[d]()||a.timers.splice(d--,1);a.timers.length&&n(g);};h!==e||this.elem["forceAnimate:"+this.prop]?(this.startTime=+new Date,this.start=h,this.end=e,this.unit=q,this.now=this.start,this.pos=0,v.elem=this.elem,
v.prop=this.prop,v()&&1===a.timers.push(v)&&n(g)):(delete u.curAnim[this.prop],u.complete&&0===Object.keys(u.curAnim).length&&u.complete.call(this.elem));},step:function(h){var e=+new Date,q,t=this.options,u=this.elem,v=t.complete,n=t.duration,g=t.curAnim;u.attr&&!u.element?h=!1:h||e>=n+this.startTime?(this.now=this.end,this.pos=1,this.update(),q=g[this.prop]=!0,a.objectEach(g,function(a){!0!==a&&(q=!1);}),q&&v&&v.call(u),h=!1):(this.pos=t.easing((e-this.startTime)/n),this.now=this.start+(this.end-
this.start)*this.pos,this.update(),h=!0);return h},initPath:function(h,e,q){function t(a){var b,l;for(c=a.length;c--;)b="M"===a[c]||"L"===a[c],l=/[a-zA-Z]/.test(a[c+3]),b&&l&&a.splice(c+1,0,a[c+1],a[c+2],a[c+1],a[c+2]);}function u(a,d){for(;a.length<k;){a[0]=d[k-a.length];var l=a.slice(0,b);[].splice.apply(a,[0,0].concat(l));x&&(l=a.slice(a.length-b),[].splice.apply(a,[a.length,0].concat(l)),c--);}a[0]="M";}function v(a,c){for(var l=(k-a.length)/b;0<l&&l--;)p=a.slice().splice(a.length/K-b,b*K),p[0]=
c[k-b-l*b],m&&(p[b-6]=p[b-2],p[b-5]=p[b-1]),[].splice.apply(a,[a.length/K,0].concat(p)),x&&l--;}e=e||"";var n,g=h.startX,d=h.endX,m=-1<e.indexOf("C"),b=m?7:3,k,p,c;e=e.split(" ");q=q.slice();var x=h.isArea,K=x?2:1,w;m&&(t(e),t(q));if(g&&d){for(c=0;c<g.length;c++)if(g[c]===d[0]){n=c;break}else if(g[0]===d[d.length-g.length+c]){n=c;w=!0;break}else if(g[g.length-1]===d[d.length-g.length+c]){n=g.length-c;break}"undefined"===typeof n&&(e=[]);}e.length&&a.isNumber(n)&&(k=q.length+n*K*b,w?(u(e,q),v(q,e)):
(u(q,e),v(e,q)));return [e,q]},fillSetter:function(){a.Fx.prototype.strokeSetter.apply(this,arguments);},strokeSetter:function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0);}};a.merge=function(){var h,e=arguments,q,t={},u=function(e,n){"object"!==typeof e&&(e={});a.objectEach(n,function(g,d){!a.isObject(g,!0)||a.isClass(g)||a.isDOMElement(g)?e[d]=n[d]:e[d]=u(e[d]||{},g);});return e};!0===e[0]&&(t=e[1],e=Array.prototype.slice.call(e,2));q=e.length;for(h=0;h<
q;h++)t=u(t,e[h]);return t};a.pInt=function(a,e){return parseInt(a,e||10)};a.isString=function(a){return "string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return "[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(h,e){return !!h&&"object"===typeof h&&(!e||!a.isArray(h))};a.isDOMElement=function(h){return a.isObject(h)&&"number"===typeof h.nodeType};a.isClass=function(h){var e=h&&h.constructor;return !(!a.isObject(h,!0)||a.isDOMElement(h)||!e||!e.name||
"Object"===e.name)};a.isNumber=function(a){return "number"===typeof a&&!isNaN(a)&&Infinity>a&&-Infinity<a};a.erase=function(a,e){for(var h=a.length;h--;)if(a[h]===e){a.splice(h,1);break}};a.defined=function(a){return "undefined"!==typeof a&&null!==a};a.attr=function(h,e,q){var t;a.isString(e)?a.defined(q)?h.setAttribute(e,q):h&&h.getAttribute&&((t=h.getAttribute(e))||"class"!==e||(t=h.getAttribute(e+"Name"))):a.defined(e)&&a.isObject(e)&&a.objectEach(e,function(a,e){h.setAttribute(e,a);});return t};
a.splat=function(h){return a.isArray(h)?h:[h]};a.syncTimeout=function(a,e,q){if(e)return setTimeout(a,e,q);a.call(0,q);};a.clearTimeout=function(h){a.defined(h)&&clearTimeout(h);};a.extend=function(a,e){var h;a||(a={});for(h in e)a[h]=e[h];return a};a.pick=function(){var a=arguments,e,q,t=a.length;for(e=0;e<t;e++)if(q=a[e],"undefined"!==typeof q&&null!==q)return q};a.css=function(h,e){a.isMS&&!a.svg&&e&&"undefined"!==typeof e.opacity&&(e.filter="alpha(opacity\x3d"+100*e.opacity+")");a.extend(h.style,
e);};a.createElement=function(h,e,q,t,u){h=H.createElement(h);var v=a.css;e&&a.extend(h,e);u&&v(h,{padding:"0",border:"none",margin:"0"});q&&v(h,q);t&&t.appendChild(h);return h};a.extendClass=function(h,e){var q=function(){};q.prototype=new h;a.extend(q.prototype,e);return q};a.pad=function(a,e,q){return Array((e||2)+1-String(a).replace("-","").length).join(q||"0")+a};a.relativeLength=function(a,e,q){return /%$/.test(a)?e*parseFloat(a)/100+(q||0):parseFloat(a)};a.wrap=function(a,e,q){var h=a[e];a[e]=
function(){var a=Array.prototype.slice.call(arguments),e=arguments,n=this;n.proceed=function(){h.apply(n,arguments.length?arguments:e);};a.unshift(h);a=q.apply(this,a);n.proceed=null;return a};};a.datePropsToTimestamps=function(h){a.objectEach(h,function(e,q){a.isObject(e)&&"function"===typeof e.getTime?h[q]=e.getTime():(a.isObject(e)||a.isArray(e))&&a.datePropsToTimestamps(e);});};a.formatSingle=function(h,e,q){var t=/\.([0-9])/,u=a.defaultOptions.lang;/f$/.test(h)?(q=(q=h.match(t))?q[1]:-1,null!==e&&
(e=a.numberFormat(e,q,u.decimalPoint,-1<h.indexOf(",")?u.thousandsSep:""))):e=(q||a.time).dateFormat(h,e);return e};a.format=function(h,e,q){for(var t="{",u=!1,v,n,g,d,m=[],b;h;){t=h.indexOf(t);if(-1===t)break;v=h.slice(0,t);if(u){v=v.split(":");n=v.shift().split(".");d=n.length;b=e;for(g=0;g<d;g++)b&&(b=b[n[g]]);v.length&&(b=a.formatSingle(v.join(":"),b,q));m.push(b);}else m.push(v);h=h.slice(t+1);t=(u=!u)?"}":"{";}m.push(h);return m.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/
Math.LN10))};a.normalizeTickInterval=function(h,e,q,t,u){var v,n=h;q=a.pick(q,1);v=h/q;e||(e=u?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===t&&(1===q?e=e.filter(function(a){return 0===a%1}):.1>=q&&(e=[1/q])));for(t=0;t<e.length&&!(n=e[t],u&&n*q>=h||!u&&v<=(e[t]+(e[t+1]||e[t]))/2);t++);return n=a.correctFloat(n*q,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,e){var h=a.length,t,u;for(u=0;u<h;u++)a[u].safeI=u;a.sort(function(a,n){t=e(a,n);return 0===t?a.safeI-n.safeI:t});for(u=
0;u<h;u++)delete a[u].safeI;};a.arrayMin=function(a){for(var e=a.length,h=a[0];e--;)a[e]<h&&(h=a[e]);return h};a.arrayMax=function(a){for(var e=a.length,h=a[0];e--;)a[e]>h&&(h=a[e]);return h};a.destroyObjectProperties=function(h,e){a.objectEach(h,function(a,t){a&&a!==e&&a.destroy&&a.destroy();delete h[t];});};a.discardElement=function(h){var e=a.garbageBin;e||(e=a.createElement("div"));h&&e.appendChild(h);e.innerHTML="";};a.correctFloat=function(a,e){return parseFloat(a.toPrecision(e||14))};a.setAnimation=
function(h,e){e.renderer.globalAnimation=a.pick(h,e.options.chart.animation,!0);};a.animObject=function(h){return a.isObject(h)?a.merge(h):{duration:h?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(h,e,q,t){h=+h||0;e=+e;var u=a.defaultOptions.lang,v=(h.toString().split(".")[1]||"").split("e")[0].length,n,g,d=h.toString().split("e");-1===e?e=Math.min(v,20):a.isNumber(e)?e&&d[1]&&0>d[1]&&(n=e+ +d[1],0<=n?(d[0]=
(+d[0]).toExponential(n).split("e")[0],e=n):(d[0]=d[0].split(".")[0]||0,h=20>e?(d[0]*Math.pow(10,d[1])).toFixed(e):0,d[1]=0)):e=2;g=(Math.abs(d[1]?d[0]:h)+Math.pow(10,-Math.max(e,v)-1)).toFixed(e);v=String(a.pInt(g));n=3<v.length?v.length%3:0;q=a.pick(q,u.decimalPoint);t=a.pick(t,u.thousandsSep);h=(0>h?"-":"")+(n?v.substr(0,n)+t:"");h+=v.substr(n).replace(/(\d{3})(?=\d)/g,"$1"+t);e&&(h+=q+g.slice(-e));d[1]&&0!==+h&&(h+="e"+d[1]);return h};Math.easeInOutSine=function(a){return -.5*(Math.cos(Math.PI*
a)-1)};a.getStyle=function(h,e,q){if("width"===e)return Math.max(0,Math.min(h.offsetWidth,h.scrollWidth,h.getBoundingClientRect&&"none"===a.getStyle(h,"transform",!1)?Math.floor(h.getBoundingClientRect().width):Infinity)-a.getStyle(h,"padding-left")-a.getStyle(h,"padding-right"));if("height"===e)return Math.max(0,Math.min(h.offsetHeight,h.scrollHeight)-a.getStyle(h,"padding-top")-a.getStyle(h,"padding-bottom"));B.getComputedStyle||a.error(27,!0);if(h=B.getComputedStyle(h,void 0))h=h.getPropertyValue(e),
a.pick(q,"opacity"!==e)&&(h=a.pInt(h));return h};a.inArray=function(a,e,q){return e.indexOf(a,q)};a.find=Array.prototype.find?function(a,e){return a.find(e)}:function(a,e){var h,t=a.length;for(h=0;h<t;h++)if(e(a[h],h))return a[h]};a.keys=Object.keys;a.offset=function(a){var e=H.documentElement;a=a.parentElement||a.parentNode?a.getBoundingClientRect():{top:0,left:0};return {top:a.top+(B.pageYOffset||e.scrollTop)-(e.clientTop||0),left:a.left+(B.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}};a.stop=function(h,
e){for(var q=a.timers.length;q--;)a.timers[q].elem!==h||e&&e!==a.timers[q].prop||(a.timers[q].stopped=!0);};a.objectEach=function(a,e,q){for(var h in a)a.hasOwnProperty(h)&&e.call(q||a[h],a[h],h,a);};a.objectEach({map:"map",each:"forEach",grep:"filter",reduce:"reduce",some:"some"},function(h,e){a[e]=function(a){return Array.prototype[h].apply(a,[].slice.call(arguments,1))};});a.addEvent=function(h,e,q,t){void 0===t&&(t={});var u,v=h.addEventListener||a.addEventListenerPolyfill;u="function"===typeof h&&
h.prototype?h.prototype.protoEvents=h.prototype.protoEvents||{}:h.hcEvents=h.hcEvents||{};a.Point&&h instanceof a.Point&&h.series&&h.series.chart&&(h.series.chart.runTrackerClick=!0);v&&v.call(h,e,q,!1);u[e]||(u[e]=[]);u[e].push({fn:q,order:"number"===typeof t.order?t.order:Infinity});u[e].sort(function(a,g){return a.order-g.order});return function(){a.removeEvent(h,e,q);}};a.removeEvent=function(h,e,q){function t(n,g){var d=h.removeEventListener||a.removeEventListenerPolyfill;d&&d.call(h,n,g,!1);}
function u(n){var g,d;h.nodeName&&(e?(g={},g[e]=!0):g=n,a.objectEach(g,function(a,b){if(n[b])for(d=n[b].length;d--;)t(b,n[b][d].fn);}));}var v;["protoEvents","hcEvents"].forEach(function(a){var g=h[a];g&&(e?(v=g[e]||[],q?(g[e]=v.filter(function(a){return q!==a.fn}),t(e,q)):(u(g),g[e]=[])):(u(g),h[a]={}));});};a.fireEvent=function(h,e,q,t){var u,v;q=q||{};H.createEvent&&(h.dispatchEvent||h.fireEvent)?(u=H.createEvent("Events"),u.initEvent(e,!0,!0),a.extend(u,q),h.dispatchEvent?h.dispatchEvent(u):h.fireEvent(e,
u)):(q.target||a.extend(q,{preventDefault:function(){q.defaultPrevented=!0;},target:h,type:e}),function(a,g){void 0===a&&(a=[]);void 0===g&&(g=[]);var d=0,m=0,b=a.length+g.length;for(v=0;v<b;v++)!1===(a[d]?g[m]?a[d].order<=g[m].order?a[d++]:g[m++]:a[d++]:g[m++]).fn.call(h,q)&&q.preventDefault();}(h.protoEvents&&h.protoEvents[e],h.hcEvents&&h.hcEvents[e]));t&&!q.defaultPrevented&&t.call(h,q);};a.animate=function(h,e,q){var t,u="",v,n,g;a.isObject(q)||(g=arguments,q={duration:g[2],easing:g[3],complete:g[4]});
a.isNumber(q.duration)||(q.duration=400);q.easing="function"===typeof q.easing?q.easing:Math[q.easing]||Math.easeInOutSine;q.curAnim=a.merge(e);a.objectEach(e,function(d,g){a.stop(h,g);n=new a.Fx(h,q,g);v=null;"d"===g?(n.paths=n.initPath(h,h.d,e.d),n.toD=e.d,t=0,v=1):h.attr?t=h.attr(g):(t=parseFloat(a.getStyle(h,g))||0,"opacity"!==g&&(u="px"));v||(v=d);v&&v.match&&v.match("px")&&(v=v.replace(/px/g,""));n.run(t,v,u);});};a.seriesType=function(h,e,q,t,u){var v=a.getOptions(),n=a.seriesTypes;v.plotOptions[h]=
a.merge(v.plotOptions[e],q);n[h]=a.extendClass(n[e]||function(){},t);n[h].prototype.type=h;u&&(n[h].prototype.pointClass=a.extendClass(a.Point,u));return n[h]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),e=0;return function(){return "highcharts-"+a+"-"+e++}}();a.isFunction=function(a){return "function"===typeof a};B.jQuery&&(B.jQuery.fn.highcharts=function(){var h=[].slice.call(arguments);if(this[0])return h[0]?(new (a[a.isString(h[0])?h.shift():"Chart"])(this[0],h[0],h[1]),
this):E[a.attr(this[0],"data-highcharts-chart")]});});J(G,"parts/Color.js",[G["parts/Globals.js"]],function(a){var E=a.isNumber,H=a.merge,B=a.pInt;a.Color=function(h){if(!(this instanceof a.Color))return new a.Color(h);this.init(h);};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return [B(a[1]),B(a[2]),B(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
parse:function(a){return [B(a[1]),B(a[2]),B(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(h){var e,q,t,u;if((this.input=h=this.names[h&&h.toLowerCase?h.toLowerCase():""]||h)&&h.stops)this.stops=h.stops.map(function(e){return new a.Color(e[1])});else if(h&&h.charAt&&"#"===h.charAt()&&(e=h.length,h=parseInt(h.substr(1),16),7===e?q=[(h&16711680)>>16,(h&65280)>>8,h&255,1]:4===e&&(q=[(h&3840)>>4|(h&3840)>>8,(h&240)>>4|h&240,(h&15)<<4|h&15,1])),!q)for(t=this.parsers.length;t--&&!q;)u=
this.parsers[t],(e=u.regex.exec(h))&&(q=u.parse(e));this.rgba=q||[];},get:function(a){var e=this.input,h=this.rgba,t;this.stops?(t=H(e),t.stops=[].concat(t.stops),this.stops.forEach(function(e,h){t.stops[h]=[t.stops[h][0],e.get(a)];})):t=h&&E(h[0])?"rgb"===a||!a&&1===h[3]?"rgb("+h[0]+","+h[1]+","+h[2]+")":"a"===a?h[3]:"rgba("+h.join(",")+")":e;return t},brighten:function(a){var e,h=this.rgba;if(this.stops)this.stops.forEach(function(e){e.brighten(a);});else if(E(a)&&0!==a)for(e=0;3>e;e++)h[e]+=B(255*
a),0>h[e]&&(h[e]=0),255<h[e]&&(h[e]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,e){var h=this.rgba,t=a.rgba;t.length&&h&&h.length?(a=1!==t[3]||1!==h[3],e=(a?"rgba(":"rgb(")+Math.round(t[0]+(h[0]-t[0])*(1-e))+","+Math.round(t[1]+(h[1]-t[1])*(1-e))+","+Math.round(t[2]+(h[2]-t[2])*(1-e))+(a?","+(t[3]+(h[3]-t[3])*(1-e)):"")+")"):e=a.input||"none";return e}};a.color=function(h){return new a.Color(h)};});J(G,"parts/SvgRenderer.js",[G["parts/Globals.js"]],function(a){var E,
H,B=a.addEvent,h=a.animate,e=a.attr,q=a.charts,t=a.color,u=a.css,v=a.createElement,n=a.defined,g=a.deg2rad,d=a.destroyObjectProperties,m=a.doc,b=a.extend,k=a.erase,p=a.hasTouch,c=a.isArray,x=a.isFirefox,K=a.isMS,w=a.isObject,F=a.isString,C=a.isWebKit,l=a.merge,D=a.noop,A=a.objectEach,z=a.pick,I=a.pInt,f=a.removeEvent,r=a.splat,Q=a.stop,N=a.svg,L=a.SVG_NS,M=a.symbolSizes,R=a.win;E=a.SVGElement=function(){return this};b(E.prototype,{opacity:1,SVG_NS:L,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
init:function(y,f){this.element="span"===f?v(f):m.createElementNS(this.SVG_NS,f);this.renderer=y;a.fireEvent(this,"afterInit");},animate:function(y,f,b){var c=a.animObject(z(f,this.renderer.globalAnimation,!0));z(m.hidden,m.msHidden,m.webkitHidden,!1)&&(c.duration=0);0!==c.duration?(b&&(c.complete=b),h(this,y,c)):(this.attr(y,void 0,b),a.objectEach(y,function(a,y){c.step&&c.step.call(this,a,{prop:y,pos:1});},this));return this},complexColor:function(y,f,b){var r=this.renderer,d,p,k,g,S,L,m,x,e,D,w,
z=[],N;a.fireEvent(this.renderer,"complexColor",{args:arguments},function(){y.radialGradient?p="radialGradient":y.linearGradient&&(p="linearGradient");p&&(k=y[p],S=r.gradients,m=y.stops,D=b.radialReference,c(k)&&(y[p]=k={x1:k[0],y1:k[1],x2:k[2],y2:k[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===p&&D&&!n(k.gradientUnits)&&(g=k,k=l(k,r.getRadialAttr(D,g),{gradientUnits:"userSpaceOnUse"})),A(k,function(a,y){"id"!==y&&z.push(y,a);}),A(m,function(a){z.push(a);}),z=z.join(","),S[z]?w=S[z].attr("id"):
(k.id=w=a.uniqueKey(),S[z]=L=r.createElement(p).attr(k).add(r.defs),L.radAttr=g,L.stops=[],m.forEach(function(y){0===y[1].indexOf("rgba")?(d=a.color(y[1]),x=d.get("rgb"),e=d.get("a")):(x=y[1],e=1);y=r.createElement("stop").attr({offset:y[0],"stop-color":x,"stop-opacity":e}).add(L);L.stops.push(y);})),N="url("+r.url+"#"+w+")",b.setAttribute(f,N),b.gradient=z,y.toString=function(){return N});});},applyTextOutline:function(y){var f=this.element,b,c,r;-1!==y.indexOf("contrast")&&(y=y.replace(/contrast/g,
this.renderer.getContrast(f.style.fill)));y=y.split(" ");b=y[y.length-1];(c=y[0])&&"none"!==c&&a.svg&&(this.fakeTS=!0,y=[].slice.call(f.getElementsByTagName("tspan")),this.ySetter=this.xSetter,c=c.replace(/(^[\d\.]+)(.*?)$/g,function(a,y,f){return 2*y+f}),this.removeTextOutline(y),r=f.firstChild,y.forEach(function(a,y){0===y&&(a.setAttribute("x",f.getAttribute("x")),y=f.getAttribute("y"),a.setAttribute("y",y||0),null===y&&f.setAttribute("y",0));a=a.cloneNode(1);e(a,{"class":"highcharts-text-outline",
fill:b,stroke:b,"stroke-width":c,"stroke-linejoin":"round"});f.insertBefore(a,r);}));},removeTextOutline:function(a){for(var y=a.length,f;y--;)f=a[y],"highcharts-text-outline"===f.getAttribute("class")&&k(a,this.element.removeChild(f));},symbolCustomAttribs:"x y width height r start end innerR anchorX anchorY rounded".split(" "),attr:function(y,f,b,c){var r,k=this.element,l,p=this,d,g,L=this.symbolCustomAttribs;"string"===typeof y&&void 0!==f&&(r=y,y={},y[r]=f);"string"===typeof y?p=(this[y+"Getter"]||
this._defaultGetter).call(this,y,k):(A(y,function(f,b){d=!1;c||Q(this,b);this.symbolName&&-1!==a.inArray(b,L)&&(l||(this.symbolAttr(y),l=!0),d=!0);!this.rotation||"x"!==b&&"y"!==b||(this.doTransform=!0);d||(g=this[b+"Setter"]||this._defaultSetter,g.call(this,f,b,k),!this.styledMode&&this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(b)&&this.updateShadows(b,f,g));},this),this.afterSetters());b&&b.call(this);return p},afterSetters:function(){this.doTransform&&(this.updateTransform(),
this.doTransform=!1);},updateShadows:function(a,f,b){for(var y=this.shadows,c=y.length;c--;)b.call(y[c],"height"===a?Math.max(f-(y[c].cutHeight||0),0):"d"===a?this.d:f,a,y[c]);},addClass:function(a,f){var y=this.attr("class")||"";f||(a=(a||"").split(/ /g).reduce(function(a,f){-1===y.indexOf(f)&&a.push(f);return a},y?[y]:[]).join(" "));a!==y&&this.attr("class",a);return this},hasClass:function(a){return -1!==(this.attr("class")||"").split(" ").indexOf(a)},removeClass:function(a){return this.attr("class",
(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var y=this;"x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(f){y[f]=z(a[f],y[f]);});y.attr({d:y.renderer.symbols[y.symbolName](y.x,y.y,y.width,y.height,y)});},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,f){var y;f=f||a.strokeWidth||0;y=Math.round(f)%2/2;a.x=Math.floor(a.x||this.x||0)+y;a.y=Math.floor(a.y||this.y||0)+y;a.width=
Math.floor((a.width||this.width||0)-2*y);a.height=Math.floor((a.height||this.height||0)-2*y);n(a.strokeWidth)&&(a.strokeWidth=f);return a},css:function(a){var y=this.styles,f={},c=this.element,r,k="",l,p=!y,d=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);y&&A(a,function(a,b){a!==y[b]&&(f[b]=a,p=!0);});p&&(y&&(a=b(y,f)),a&&(null===a.width||"auto"===a.width?delete this.textWidth:"text"===c.nodeName.toLowerCase()&&a.width&&(r=this.textWidth=I(a.width))),this.styles=a,r&&!N&&this.renderer.forExport&&
delete a.width,c.namespaceURI===this.SVG_NS?(l=function(a,y){return "-"+y.toLowerCase()},A(a,function(a,y){-1===d.indexOf(y)&&(k+=y.replace(/([A-Z])/g,l)+":"+a+";");}),k&&e(c,"style",k)):u(c,a),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));return this},getStyle:function(a){return R.getComputedStyle(this.element||this,"").getPropertyValue(a)},strokeWidth:function(){if(!this.renderer.styledMode)return this["stroke-width"]||
0;var a=this.getStyle("stroke-width"),f;a.indexOf("px")===a.length-2?a=I(a):(f=m.createElementNS(L,"rect"),e(f,{width:a,"stroke-width":0}),this.element.parentNode.appendChild(f),a=f.getBBox().width,f.parentNode.removeChild(f));return a},on:function(a,f){var y=this,b=y.element;p&&"click"===a?(b.ontouchstart=function(a){y.touchEventFired=Date.now();a.preventDefault();f.call(b,a);},b.onclick=function(a){(-1===R.navigator.userAgent.indexOf("Android")||1100<Date.now()-(y.touchEventFired||0))&&f.call(b,
a);}):b["on"+a]=f;return this},setRadialReference:function(a){var y=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;y&&y.radAttr&&y.animate(this.renderer.getRadialAttr(a,y.radAttr));return this},translate:function(a,f){return this.attr({translateX:a,translateY:f})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,f=this.translateY||0,b=this.scaleX,c=this.scaleY,r=this.inverted,k=this.rotation,l=
this.matrix,p=this.element;r&&(a+=this.width,f+=this.height);a=["translate("+a+","+f+")"];n(l)&&a.push("matrix("+l.join(",")+")");r?a.push("rotate(90) scale(-1,1)"):k&&a.push("rotate("+k+" "+z(this.rotationOriginX,p.getAttribute("x"),0)+" "+z(this.rotationOriginY,p.getAttribute("y")||0)+")");(n(b)||n(c))&&a.push("scale("+z(b,1)+" "+z(c,1)+")");a.length&&p.setAttribute("transform",a.join(" "));},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,f,b){var y,
c,r,p,l={};c=this.renderer;r=c.alignedObjects;var d,g;if(a){if(this.alignOptions=a,this.alignByTranslate=f,!b||F(b))this.alignTo=y=b||"renderer",k(r,this),r.push(this),b=null;}else a=this.alignOptions,f=this.alignByTranslate,y=this.alignTo;b=z(b,c[y],c);y=a.align;c=a.verticalAlign;r=(b.x||0)+(a.x||0);p=(b.y||0)+(a.y||0);"right"===y?d=1:"center"===y&&(d=2);d&&(r+=(b.width-(a.width||0))/d);l[f?"translateX":"x"]=Math.round(r);"bottom"===c?g=1:"middle"===c&&(g=2);g&&(p+=(b.height-(a.height||0))/g);l[f?
"translateY":"y"]=Math.round(p);this[this.placed?"animate":"attr"](l);this.placed=!0;this.alignAttr=l;return this},getBBox:function(a,f){var y,c=this.renderer,r,k=this.element,l=this.styles,p,d=this.textStr,A,L=c.cache,m=c.cacheKeys,x=k.namespaceURI===this.SVG_NS,e;f=z(f,this.rotation);r=f*g;p=c.styledMode?k&&E.prototype.getStyle.call(k,"font-size"):l&&l.fontSize;n(d)&&(e=d.toString(),-1===e.indexOf("\x3c")&&(e=e.replace(/[0-9]/g,"0")),e+=["",f||0,p,this.textWidth,l&&l.textOverflow].join());e&&!a&&
(y=L[e]);if(!y){if(x||c.forExport){try{(A=this.fakeTS&&function(a){[].forEach.call(k.querySelectorAll(".highcharts-text-outline"),function(f){f.style.display=a;});})&&A("none"),y=k.getBBox?b({},k.getBBox()):{width:k.offsetWidth,height:k.offsetHeight},A&&A("");}catch(Y){}if(!y||0>y.width)y={width:0,height:0};}else y=this.htmlGetBBox();c.isSVG&&(a=y.width,c=y.height,x&&(y.height=c={"11px,17":14,"13px,20":16}[l&&l.fontSize+","+Math.round(c)]||c),f&&(y.width=Math.abs(c*Math.sin(r))+Math.abs(a*Math.cos(r)),
y.height=Math.abs(c*Math.cos(r))+Math.abs(a*Math.sin(r))));if(e&&0<y.height){for(;250<m.length;)delete L[m.shift()];L[e]||m.push(e);L[e]=y;}}return y},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var f=this;f.animate({opacity:0},{duration:a||150,complete:function(){f.attr({y:-9999});}});},add:function(a){var f=this.renderer,y=this.element,b;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;
void 0!==this.textStr&&f.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)b=this.zIndexSetter();b||(a?a.element:f.box).appendChild(y);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var f=a.parentNode;f&&f.removeChild(a);},destroy:function(){var a=this,f=a.element||{},b=a.renderer,c=b.isSVG&&"SPAN"===f.nodeName&&a.parentGroup,r=f.ownerSVGElement,l=a.clipPath;f.onclick=f.onmouseout=f.onmouseover=f.onmousemove=f.point=null;Q(a);l&&r&&([].forEach.call(r.querySelectorAll("[clip-path],[CLIP-PATH]"),
function(a){-1<a.getAttribute("clip-path").indexOf(l.element.id)&&a.removeAttribute("clip-path");}),a.clipPath=l.destroy());if(a.stops){for(r=0;r<a.stops.length;r++)a.stops[r]=a.stops[r].destroy();a.stops=null;}a.safeRemoveChild(f);for(b.styledMode||a.destroyShadows();c&&c.div&&0===c.div.childNodes.length;)f=c.parentGroup,a.safeRemoveChild(c.div),delete c.div,c=f;a.alignTo&&k(b.alignedObjects,a);A(a,function(f,y){delete a[y];});},shadow:function(a,f,b){var y=[],c,r,l=this.element,k,p,d,g;if(!a)this.destroyShadows();
else if(!this.shadows){p=z(a.width,3);d=(a.opacity||.15)/p;g=this.parentInverted?"(-1,-1)":"("+z(a.offsetX,1)+", "+z(a.offsetY,1)+")";for(c=1;c<=p;c++)r=l.cloneNode(0),k=2*p+1-2*c,e(r,{stroke:a.color||"#000000","stroke-opacity":d*c,"stroke-width":k,transform:"translate"+g,fill:"none"}),r.setAttribute("class",(r.getAttribute("class")||"")+" highcharts-shadow"),b&&(e(r,"height",Math.max(e(r,"height")-k,0)),r.cutHeight=k),f?f.element.appendChild(r):l.parentNode&&l.parentNode.insertBefore(r,l),y.push(r);
this.shadows=y;}return this},destroyShadows:function(){(this.shadows||[]).forEach(function(a){this.safeRemoveChild(a);},this);this.shadows=void 0;},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=z(this[a+"Value"],this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,f,b){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a=
"M 0 0");this[f]!==a&&(b.setAttribute(f,a),this[f]=a);},dashstyleSetter:function(a){var f,y=this["stroke-width"];"inherit"===y&&(y=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(f=a.length;f--;)a[f]=I(a[f])*y;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",
a);}},alignSetter:function(a){var f={left:"start",center:"middle",right:"end"};f[a]&&(this.alignValue=a,this.element.setAttribute("text-anchor",f[a]));},opacitySetter:function(a,f,b){this[f]=a;b.setAttribute(f,a);},titleSetter:function(a){var f=this.element.getElementsByTagName("title")[0];f||(f=m.createElementNS(this.SVG_NS,"title"),this.element.appendChild(f));f.firstChild&&f.removeChild(f.firstChild);f.appendChild(m.createTextNode(String(z(a,"")).replace(/<[^>]*>/g,"").replace(/&lt;/g,"\x3c").replace(/&gt;/g,
"\x3e")));},textSetter:function(a){a!==this.textStr&&(delete this.bBox,delete this.textPxLength,this.textStr=a,this.added&&this.renderer.buildText(this));},setTextPath:function(f,b){var y=this.element,c={textAnchor:"text-anchor"},r,k=!1,p,d=this.textPathWrapper,g=!d;b=l(!0,{enabled:!0,attributes:{dy:-5,startOffset:"50%",textAnchor:"middle"}},b);r=b.attributes;if(f&&b&&b.enabled){this.options&&this.options.padding&&(r.dx=-this.options.padding);d||(this.textPathWrapper=d=this.renderer.createElement("textPath"),
k=!0);p=d.element;(b=f.element.getAttribute("id"))||f.element.setAttribute("id",b=a.uniqueKey());if(g)for(f=y.getElementsByTagName("tspan");f.length;)f[0].setAttribute("y",0),p.appendChild(f[0]);k&&d.add({element:this.text?this.text.element:y});p.setAttributeNS("http://www.w3.org/1999/xlink","href",this.renderer.url+"#"+b);n(r.dy)&&(p.parentNode.setAttribute("dy",r.dy),delete r.dy);n(r.dx)&&(p.parentNode.setAttribute("dx",r.dx),delete r.dx);a.objectEach(r,function(a,f){p.setAttribute(c[f]||f,a);});
y.removeAttribute("transform");this.removeTextOutline.call(d,[].slice.call(y.getElementsByTagName("tspan")));this.text&&!this.renderer.styledMode&&this.attr({fill:"none","stroke-width":0});this.applyTextOutline=this.updateTransform=D;}else d&&(delete this.updateTransform,delete this.applyTextOutline,this.destroyTextPath(y,f));return this},destroyTextPath:function(a,f){var b;f.element.setAttribute("id","");for(b=this.textPathWrapper.element.childNodes;b.length;)a.firstChild.appendChild(b[0]);a.firstChild.removeChild(this.textPathWrapper.element);
delete f.textPathWrapper;},fillSetter:function(a,f,b){"string"===typeof a?b.setAttribute(f,a):a&&this.complexColor(a,f,b);},visibilitySetter:function(a,f,b){"inherit"===a?b.removeAttribute(f):this[f]!==a&&b.setAttribute(f,a);this[f]=a;},zIndexSetter:function(a,f){var b=this.renderer,y=this.parentGroup,c=(y||b).element||b.box,r,k=this.element,l=!1,p,b=c===b.box;r=this.added;var d;n(a)?(k.setAttribute("data-z-index",a),a=+a,this[f]===a&&(r=!1)):n(this[f])&&k.removeAttribute("data-z-index");this[f]=a;if(r){(a=
this.zIndex)&&y&&(y.handleZ=!0);f=c.childNodes;for(d=f.length-1;0<=d&&!l;d--)if(y=f[d],r=y.getAttribute("data-z-index"),p=!n(r),y!==k)if(0>a&&p&&!b&&!d)c.insertBefore(k,f[d]),l=!0;else if(I(r)<=a||p&&(!n(a)||0<=a))c.insertBefore(k,f[d+1]||null),l=!0;l||(c.insertBefore(k,f[b?3:0]||null),l=!0);}return l},_defaultSetter:function(a,f,b){b.setAttribute(f,a);}});E.prototype.yGetter=E.prototype.xGetter;E.prototype.translateXSetter=E.prototype.translateYSetter=E.prototype.rotationSetter=E.prototype.verticalAlignSetter=
E.prototype.rotationOriginXSetter=E.prototype.rotationOriginYSetter=E.prototype.scaleXSetter=E.prototype.scaleYSetter=E.prototype.matrixSetter=function(a,f){this[f]=a;this.doTransform=!0;};E.prototype["stroke-widthSetter"]=E.prototype.strokeSetter=function(a,f,b){this[f]=a;this.stroke&&this["stroke-width"]?(E.prototype.fillSetter.call(this,this.stroke,"stroke",b),b.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===f&&0===a&&this.hasStroke&&(b.removeAttribute("stroke"),
this.hasStroke=!1);};H=a.SVGRenderer=function(){this.init.apply(this,arguments);};b(H.prototype,{Element:E,SVG_NS:L,init:function(a,f,b,c,r,k,l){var y;y=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"});l||y.css(this.getStyle(c));c=y.element;a.appendChild(c);e(a,"dir","ltr");-1===a.innerHTML.indexOf("xmlns")&&e(c,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=c;this.boxWrapper=y;this.alignedObjects=[];this.url=(x||C)&&m.getElementsByTagName("base").length?R.location.href.split("#")[0].replace(/<[^>]*>/g,
"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(m.createTextNode("Created with Highcharts 7.1.2"));this.defs=this.createElement("defs").add();this.allowHTML=k;this.forExport=r;this.styledMode=l;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(f,b,!1);var p;x&&a.getBoundingClientRect&&(f=function(){u(a,{left:0,top:0});p=a.getBoundingClientRect();u(a,{left:Math.ceil(p.left)-p.left+"px",top:Math.ceil(p.top)-p.top+
"px"});},f(),this.unSubPixelFix=B(R,"resize",f));},definition:function(a){function f(a,c){var y;r(a).forEach(function(a){var r=b.createElement(a.tagName),k={};A(a,function(a,f){"tagName"!==f&&"children"!==f&&"textContent"!==f&&(k[f]=a);});r.attr(k);r.add(c||b.defs);a.textContent&&r.element.appendChild(m.createTextNode(a.textContent));f(a.children||[],r);y=r;});return y}var b=this;return f(a)},getStyle:function(a){return this.style=b({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a));},isHidden:function(){return !this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();d(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var f=new this.Element;f.init(this,a);return f},draw:D,getRadialAttr:function(a,f){return {cx:a[0]-a[2]/
2+f.cx*a[2],cy:a[1]-a[2]/2+f.cy*a[2],r:f.r*a[2]}},truncate:function(a,f,b,c,r,k,l){var y=this,p=a.rotation,d,g=c?1:0,A=(b||c).length,L=A,x=[],e=function(a){f.firstChild&&f.removeChild(f.firstChild);a&&f.appendChild(m.createTextNode(a));},n=function(k,p){p=p||k;if(void 0===x[p])if(f.getSubStringLength)try{x[p]=r+f.getSubStringLength(0,c?p+1:p);}catch(Z){}else y.getSpanWidth&&(e(l(b||c,k)),x[p]=r+y.getSpanWidth(a,f));return x[p]},D,w;a.rotation=0;D=n(f.textContent.length);if(w=r+D>k){for(;g<=A;)L=Math.ceil((g+
A)/2),c&&(d=l(c,L)),D=n(L,d&&d.length-1),g===A?g=A+1:D>k?A=L-1:g=L;0===A?e(""):b&&A===b.length-1||e(d||l(b||c,L));}c&&c.splice(0,L);a.actualWidth=D;a.rotation=p;return w},escapes:{"\x26":"\x26amp;","\x3c":"\x26lt;","\x3e":"\x26gt;","'":"\x26#39;",'"':"\x26quot;"},buildText:function(a){var f=a.element,b=this,c=b.forExport,r=z(a.textStr,"").toString(),y=-1!==r.indexOf("\x3c"),k=f.childNodes,p,l=e(f,"x"),d=a.styles,g=a.textWidth,x=d&&d.lineHeight,n=d&&d.textOutline,D=d&&"ellipsis"===d.textOverflow,w=
d&&"nowrap"===d.whiteSpace,Q=d&&d.fontSize,M,C,h=k.length,d=g&&!a.added&&this.box,F=function(a){var c;b.styledMode||(c=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:Q||b.style.fontSize||12);return x?I(x):b.fontMetrics(c,a.getAttribute("style")?a:f).h},R=function(a,f){A(b.escapes,function(b,c){f&&-1!==f.indexOf(b)||(a=a.toString().replace(new RegExp(b,"g"),c));});return a},v=function(a,f){var b;b=a.indexOf("\x3c");a=a.substring(b,a.indexOf("\x3e")-b);b=a.indexOf(f+"\x3d");if(-1!==b&&(b=b+f.length+
1,f=a.charAt(b),'"'===f||"'"===f))return a=a.substring(b+1),a.substring(0,a.indexOf(f))};M=[r,D,w,x,n,Q,g].join();if(M!==a.textCache){for(a.textCache=M;h--;)f.removeChild(k[h]);y||n||D||g||-1!==r.indexOf(" ")?(d&&d.appendChild(f),y?(r=b.styledMode?r.replace(/<(b|strong)>/g,'\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g,'\x3cspan class\x3d"highcharts-emphasized"\x3e'):r.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e'),
r=r.replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g)):r=[r],r=r.filter(function(a){return ""!==a}),r.forEach(function(r,y){var k,d=0,A=0;r=r.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");k=r.split("|||");k.forEach(function(r){if(""!==r||1===k.length){var x={},n=m.createElementNS(b.SVG_NS,"tspan"),z,M;(z=v(r,"class"))&&e(n,"class",z);if(z=v(r,"style"))z=z.replace(/(;| |^)color([ :])/,"$1fill$2"),e(n,"style",
z);(M=v(r,"href"))&&!c&&(e(n,"onclick",'location.href\x3d"'+M+'"'),e(n,"class","highcharts-anchor"),b.styledMode||u(n,{cursor:"pointer"}));r=R(r.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==r){n.appendChild(m.createTextNode(r));d?x.dx=0:y&&null!==l&&(x.x=l);e(n,x);f.appendChild(n);!d&&C&&(!N&&c&&u(n,{display:"block"}),e(n,"dy",F(n)));if(g){var h=r.replace(/([^\^])-/g,"$1- ").split(" "),x=!w&&(1<k.length||y||1<h.length);M=0;var I=F(n);if(D)p=b.truncate(a,n,r,void 0,0,Math.max(0,g-parseInt(Q||
12,10)),function(a,f){return a.substring(0,f)+"\u2026"});else if(x)for(;h.length;)h.length&&!w&&0<M&&(n=m.createElementNS(L,"tspan"),e(n,{dy:I,x:l}),z&&e(n,"style",z),n.appendChild(m.createTextNode(h.join(" ").replace(/- /g,"-"))),f.appendChild(n)),b.truncate(a,n,null,h,0===M?A:0,g,function(a,f){return h.slice(0,f).join(" ").replace(/- /g,"-")}),A=a.actualWidth,M++;}d++;}}});C=C||f.childNodes.length;}),D&&p&&a.attr("title",R(a.textStr,["\x26lt;","\x26gt;"])),d&&d.removeChild(f),n&&a.applyTextOutline&&
a.applyTextOutline(n)):f.appendChild(m.createTextNode(R(r)));}},getContrast:function(a){a=t(a).rgba;a[0]*=1;a[1]*=1.2;a[2]*=.5;return 459<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,f,c,r,k,d,p,g,A,L){var y=this.label(a,f,c,A,null,null,L,null,"button"),n=0,x=this.styledMode;y.attr(l({padding:8,r:2},k));if(!x){var m,e,D,w;k=l({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},k);m=k.style;delete k.style;d=l(k,{fill:"#e6e6e6"},d);
e=d.style;delete d.style;p=l(k,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},p);D=p.style;delete p.style;g=l(k,{style:{color:"#cccccc"}},g);w=g.style;delete g.style;}B(y.element,K?"mouseover":"mouseenter",function(){3!==n&&y.setState(1);});B(y.element,K?"mouseout":"mouseleave",function(){3!==n&&y.setState(n);});y.setState=function(a){1!==a&&(y.state=n=a);y.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||
0]);x||y.attr([k,d,p,g][a||0]).css([m,e,D,w][a||0]);};x||y.attr(k).css(b({cursor:"default"},m));return y.on("click",function(a){3!==n&&r.call(y,a);})},crispLine:function(a,f){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-f%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+f%2/2);return a},path:function(a){var f=this.styledMode?{}:{fill:"none"};c(a)?f.d=a:w(a)&&b(f,a);return this.createElement("path").attr(f)},circle:function(a,f,b){a=w(a)?a:void 0===a?{}:{x:a,y:f,r:b};f=this.createElement("circle");f.xSetter=
f.ySetter=function(a,f,b){b.setAttribute("c"+f,a);};return f.attr(a)},arc:function(a,f,b,c,r,k){w(a)?(c=a,f=c.y,b=c.r,a=c.x):c={innerR:c,start:r,end:k};a=this.symbol("arc",a,f,b,b,c);a.r=b;return a},rect:function(a,f,b,c,r,k){r=w(a)?a.r:r;var d=this.createElement("rect");a=w(a)?a:void 0===a?{}:{x:a,y:f,width:Math.max(b,0),height:Math.max(c,0)};this.styledMode||(void 0!==k&&(a.strokeWidth=k,a=d.crisp(a)),a.fill="none");r&&(a.r=r);d.rSetter=function(a,f,b){d.r=a;e(b,{rx:a,ry:a});};d.rGetter=function(){return d.r};
return d.attr(a)},setSize:function(a,f,b){var c=this.alignedObjects,r=c.length;this.width=a;this.height=f;for(this.boxWrapper.animate({width:a,height:f},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")});},duration:z(b,!0)?void 0:0});r--;)c[r].align();},g:function(a){var f=this.createElement("g");return a?f.attr({"class":"highcharts-"+a}):f},image:function(a,f,c,r,k,d){var p={preserveAspectRatio:"none"},l,y=function(a,f){a.setAttributeNS?a.setAttributeNS("http://www.w3.org/1999/xlink",
"href",f):a.setAttribute("hc-svg-href",f);},g=function(f){y(l.element,a);d.call(l,f);};1<arguments.length&&b(p,{x:f,y:c,width:r,height:k});l=this.createElement("image").attr(p);d?(y(l.element,"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"),p=new R.Image,B(p,"load",g),p.src=a,p.complete&&g({})):y(l.element,a);return l},symbol:function(a,f,c,r,k,d){var p=this,l,y=/^url\((.*?)\)$/,g=y.test(a),A=!g&&(this.symbols[a]?a:"circle"),L=A&&this.symbols[A],x=n(f)&&L&&L.call(this.symbols,
Math.round(f),Math.round(c),r,k,d),e,D;L?(l=this.path(x),p.styledMode||l.attr("fill","none"),b(l,{symbolName:A,x:f,y:c,width:r,height:k}),d&&b(l,d)):g&&(e=a.match(y)[1],l=this.image(e),l.imgwidth=z(M[e]&&M[e].width,d&&d.width),l.imgheight=z(M[e]&&M[e].height,d&&d.height),D=function(){l.attr({width:l.width,height:l.height});},["width","height"].forEach(function(a){l[a+"Setter"]=function(a,f){var b={},c=this["img"+f],r="width"===f?"translateX":"translateY";this[f]=a;n(c)&&(d&&"within"===d.backgroundSize&&
this.width&&this.height&&(c=Math.round(c*Math.min(this.width/this.imgwidth,this.height/this.imgheight))),this.element&&this.element.setAttribute(f,c),this.alignByTranslate||(b[r]=((this[f]||0)-c)/2,this.attr(b)));};}),n(f)&&l.attr({x:f,y:c}),l.isImg=!0,n(l.imgwidth)&&n(l.imgheight)?D():(l.attr({width:0,height:0}),v("img",{onload:function(){var a=q[p.chartIndex];0===this.width&&(u(this,{position:"absolute",top:"-999em"}),m.body.appendChild(this));M[e]={width:this.width,height:this.height};l.imgwidth=
this.width;l.imgheight=this.height;l.element&&D();this.parentNode&&this.parentNode.removeChild(this);p.imgCount--;if(!p.imgCount&&a&&a.onload)a.onload();},src:e}),this.imgCount++));return l},symbols:{circle:function(a,f,b,c){return this.arc(a+b/2,f+c/2,b/2,c/2,{start:.5*Math.PI,end:2.5*Math.PI,open:!1})},square:function(a,f,b,c){return ["M",a,f,"L",a+b,f,a+b,f+c,a,f+c,"Z"]},triangle:function(a,f,b,c){return ["M",a+b/2,f,"L",a+b,f+c,a,f+c,"Z"]},"triangle-down":function(a,f,b,c){return ["M",a,f,"L",a+b,
f,a+b/2,f+c,"Z"]},diamond:function(a,f,b,c){return ["M",a+b/2,f,"L",a+b,f+c/2,a+b/2,f+c,a,f+c/2,"Z"]},arc:function(a,f,b,c,r){var d=r.start,k=r.r||b,l=r.r||c||b,p=r.end-.001;b=r.innerR;c=z(r.open,.001>Math.abs(r.end-r.start-2*Math.PI));var y=Math.cos(d),g=Math.sin(d),A=Math.cos(p),p=Math.sin(p),d=.001>r.end-d-Math.PI?0:1;r=["M",a+k*y,f+l*g,"A",k,l,0,d,z(r.clockwise,1),a+k*A,f+l*p];n(b)&&r.push(c?"M":"L",a+b*A,f+b*p,"A",b,b,0,d,0,a+b*y,f+b*g);r.push(c?"":"Z");return r},callout:function(a,f,b,c,r){var d=
Math.min(r&&r.r||0,b,c),k=d+6,l=r&&r.anchorX;r=r&&r.anchorY;var p;p=["M",a+d,f,"L",a+b-d,f,"C",a+b,f,a+b,f,a+b,f+d,"L",a+b,f+c-d,"C",a+b,f+c,a+b,f+c,a+b-d,f+c,"L",a+d,f+c,"C",a,f+c,a,f+c,a,f+c-d,"L",a,f+d,"C",a,f,a,f,a+d,f];l&&l>b?r>f+k&&r<f+c-k?p.splice(13,3,"L",a+b,r-6,a+b+6,r,a+b,r+6,a+b,f+c-d):p.splice(13,3,"L",a+b,c/2,l,r,a+b,c/2,a+b,f+c-d):l&&0>l?r>f+k&&r<f+c-k?p.splice(33,3,"L",a,r+6,a-6,r,a,r-6,a,f+d):p.splice(33,3,"L",a,c/2,l,r,a,c/2,a,f+d):r&&r>c&&l>a+k&&l<a+b-k?p.splice(23,3,"L",l+6,f+
c,l,f+c+6,l-6,f+c,a+d,f+c):r&&0>r&&l>a+k&&l<a+b-k&&p.splice(3,3,"L",l-6,f,l,f-6,l+6,f,b-d,f);return p}},clipRect:function(f,b,c,r){var d=a.uniqueKey()+"-",l=this.createElement("clipPath").attr({id:d}).add(this.defs);f=this.rect(f,b,c,r,0).add(l);f.id=d;f.clipPath=l;f.count=0;return f},text:function(a,f,b,c){var r={};if(c&&(this.allowHTML||!this.forExport))return this.html(a,f,b);r.x=Math.round(f||0);b&&(r.y=Math.round(b));n(a)&&(r.text=a);a=this.createElement("text").attr(r);c||(a.xSetter=function(a,
f,b){var c=b.getElementsByTagName("tspan"),r,d=b.getAttribute(f),l;for(l=0;l<c.length;l++)r=c[l],r.getAttribute(f)===d&&r.setAttribute(f,a);b.setAttribute(f,a);});return a},fontMetrics:function(a,f){a=!this.styledMode&&/px/.test(a)||!R.getComputedStyle?a||f&&f.style&&f.style.fontSize||this.style&&this.style.fontSize:f&&E.prototype.getStyle.call(f,"font-size");a=/px/.test(a)?I(a):12;f=24>a?a+3:Math.round(1.2*a);return {h:f,b:Math.round(.8*f),f:a}},rotCorr:function(a,f,b){var c=a;f&&b&&(c=Math.max(c*
Math.cos(f*g),4));return {x:-a/3*Math.sin(f*g),y:c}},label:function(c,r,d,k,p,g,A,L,x){var y=this,e=y.styledMode,m=y.g("button"!==x&&"label"),D=m.text=y.text("",0,0,A).attr({zIndex:1}),w,z,N=0,M=3,Q=0,C,h,I,F,R,v={},K,t,q=/^url\((.*?)\)$/.test(k),u=e||q,S=function(){return e?w.strokeWidth()%2/2:(K?parseInt(K,10):0)%2/2},U,P,T;x&&m.addClass("highcharts-"+x);U=function(){var a=D.element.style,f={};z=(void 0===C||void 0===h||R)&&n(D.textStr)&&D.getBBox();m.width=(C||z.width||0)+2*M+Q;m.height=(h||z.height||
0)+2*M;t=M+Math.min(y.fontMetrics(a&&a.fontSize,D).b,z?z.height:Infinity);u&&(w||(m.box=w=y.symbols[k]||q?y.symbol(k):y.rect(),w.addClass(("button"===x?"":"highcharts-label-box")+(x?" highcharts-"+x+"-box":"")),w.add(m),a=S(),f.x=a,f.y=(L?-t:0)+a),f.width=Math.round(m.width),f.height=Math.round(m.height),w.attr(b(f,v)),v={});};P=function(){var a=Q+M,f;f=L?0:t;n(C)&&z&&("center"===R||"right"===R)&&(a+={center:.5,right:1}[R]*(C-z.width));if(a!==D.x||f!==D.y)D.attr("x",a),D.hasBoxWidthChanged&&(z=D.getBBox(!0),
U()),void 0!==f&&D.attr("y",f);D.x=a;D.y=f;};T=function(a,f){w?w.attr(a,f):v[a]=f;};m.onAdd=function(){D.add(m);m.attr({text:c||0===c?c:"",x:r,y:d});w&&n(p)&&m.attr({anchorX:p,anchorY:g});};m.widthSetter=function(f){C=a.isNumber(f)?f:null;};m.heightSetter=function(a){h=a;};m["text-alignSetter"]=function(a){R=a;};m.paddingSetter=function(a){n(a)&&a!==M&&(M=m.padding=a,P());};m.paddingLeftSetter=function(a){n(a)&&a!==Q&&(Q=a,P());};m.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==N&&(N=a,z&&m.attr({x:I}));};
m.textSetter=function(a){void 0!==a&&D.attr({text:a});U();P();};m["stroke-widthSetter"]=function(a,f){a&&(u=!0);K=this["stroke-width"]=a;T(f,a);};e?m.rSetter=function(a,f){T(f,a);}:m.strokeSetter=m.fillSetter=m.rSetter=function(a,f){"r"!==f&&("fill"===f&&a&&(u=!0),m[f]=a);T(f,a);};m.anchorXSetter=function(a,f){p=m.anchorX=a;T(f,Math.round(a)-S()-I);};m.anchorYSetter=function(a,f){g=m.anchorY=a;T(f,a-F);};m.xSetter=function(a){m.x=a;N&&(a-=N*((C||z.width)+2*M),m["forceAnimate:x"]=!0);I=Math.round(a);m.attr("translateX",
I);};m.ySetter=function(a){F=m.y=Math.round(a);m.attr("translateY",F);};var B=m.css;A={css:function(a){if(a){var f={};a=l(a);m.textProps.forEach(function(b){void 0!==a[b]&&(f[b]=a[b],delete a[b]);});D.css(f);"width"in f&&U();"fontSize"in f&&(U(),P());}return B.call(m,a)},getBBox:function(){return {width:z.width+2*M,height:z.height+2*M,x:z.x-M,y:z.y-M}},destroy:function(){f(m.element,"mouseenter");f(m.element,"mouseleave");D&&(D=D.destroy());w&&(w=w.destroy());E.prototype.destroy.call(m);m=y=U=P=T=null;}};
e||(A.shadow=function(a){a&&(U(),w&&w.shadow(a));return m});return b(m,A)}});a.Renderer=H;});J(G,"parts/Html.js",[G["parts/Globals.js"]],function(a){var E=a.attr,H=a.createElement,B=a.css,h=a.defined,e=a.extend,q=a.isFirefox,t=a.isMS,u=a.isWebKit,v=a.pick,n=a.pInt,g=a.SVGElement,d=a.SVGRenderer,m=a.win;e(g.prototype,{htmlCss:function(a){var b="SPAN"===this.element.tagName&&a&&"width"in a,d=v(b&&a.width,void 0),c;b&&(delete a.width,this.textWidth=d,c=!0);a&&"ellipsis"===a.textOverflow&&(a.whiteSpace=
"nowrap",a.overflow="hidden");this.styles=e(this.styles,a);B(this.element,a);c&&this.htmlUpdateTransform();return this},htmlGetBBox:function(){var a=this.element;return {x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,d=this.element,p=this.translateX||0,c=this.translateY||0,g=this.x||0,m=this.y||0,e=this.textAlign||"left",F={left:0,center:.5,right:1}[e],C=this.styles,l=C&&C.whiteSpace;B(d,{marginLeft:p,marginTop:c});
!a.styledMode&&this.shadows&&this.shadows.forEach(function(a){B(a,{marginLeft:p+1,marginTop:c+1});});this.inverted&&[].forEach.call(d.childNodes,function(b){a.invertChild(b,d);});if("SPAN"===d.tagName){var C=this.rotation,D=this.textWidth&&n(this.textWidth),A=[C,e,d.innerHTML,this.textWidth,this.textAlign].join(),z;(z=D!==this.oldTextWidth)&&!(z=D>this.oldTextWidth)&&((z=this.textPxLength)||(B(d,{width:"",whiteSpace:l||"nowrap"}),z=d.offsetWidth),z=z>D);z&&(/[ \-]/.test(d.textContent||d.innerText)||
"ellipsis"===d.style.textOverflow)?(B(d,{width:D+"px",display:"block",whiteSpace:l||"normal"}),this.oldTextWidth=D,this.hasBoxWidthChanged=!0):this.hasBoxWidthChanged=!1;A!==this.cTT&&(l=a.fontMetrics(d.style.fontSize,d).b,!h(C)||C===(this.oldRotation||0)&&e===this.oldAlign||this.setSpanRotation(C,F,l),this.getSpanCorrection(!h(C)&&this.textPxLength||d.offsetWidth,l,F,C,e));B(d,{left:g+(this.xCorr||0)+"px",top:m+(this.yCorr||0)+"px"});this.cTT=A;this.oldRotation=C;this.oldAlign=e;}}else this.alignOnAdd=
!0;},setSpanRotation:function(a,d,p){var b={},k=this.renderer.getTransformKey();b[k]=b.transform="rotate("+a+"deg)";b[k+(q?"Origin":"-origin")]=b.transformOrigin=100*d+"% "+p+"px";B(this.element,b);},getSpanCorrection:function(a,d,p){this.xCorr=-a*p;this.yCorr=-d;}});e(d.prototype,{getTransformKey:function(){return t&&!/Edge/.test(m.navigator.userAgent)?"-ms-transform":u?"-webkit-transform":q?"MozTransform":m.opera?"-o-transform":""},html:function(b,d,p){var c=this.createElement("span"),k=c.element,
m=c.renderer,n=m.isSVG,h=function(a,b){["opacity","visibility"].forEach(function(c){a[c+"Setter"]=function(d,l,f){var r=a.div?a.div.style:b;g.prototype[c+"Setter"].call(this,d,l,f);r&&(r[l]=d);};});a.addedSetters=!0;},C=a.charts[m.chartIndex],C=C&&C.styledMode;c.textSetter=function(a){a!==k.innerHTML&&(delete this.bBox,delete this.oldTextWidth);this.textStr=a;k.innerHTML=v(a,"");c.doTransform=!0;};n&&h(c,c.element.style);c.xSetter=c.ySetter=c.alignSetter=c.rotationSetter=function(a,b){"align"===b&&(b=
"textAlign");c[b]=a;c.doTransform=!0;};c.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1);};c.attr({text:b,x:Math.round(d),y:Math.round(p)}).css({position:"absolute"});C||c.css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize});k.style.whiteSpace="nowrap";c.css=c.htmlCss;n&&(c.add=function(a){var b,d=m.box.parentNode,l=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)l.push(a),a=a.parentGroup;l.reverse().forEach(function(a){function f(f,b){a[b]=
f;"translateX"===b?r.left=f+"px":r.top=f+"px";a.doTransform=!0;}var r,p=E(a.element,"class");p&&(p={className:p});b=a.div=a.div||H("div",p,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},b||d);r=b.style;e(a,{classSetter:function(a){return function(f){this.element.setAttribute("class",f);a.className=f;}}(b),on:function(){l[0].div&&c.on.apply({element:l[0].div},arguments);return a},translateXSetter:f,
translateYSetter:f});a.addedSetters||h(a);});}}else b=d;b.appendChild(k);c.added=!0;c.alignOnAdd&&c.htmlUpdateTransform();return c});return c}});});J(G,"parts/Time.js",[G["parts/Globals.js"]],function(a){var E=a.defined,H=a.extend,B=a.merge,h=a.pick,e=a.timeUnits,q=a.win;a.Time=function(a){this.update(a,!1);};a.Time.prototype={defaultOptions:{},update:function(a){var e=h(a&&a.useUTC,!0),v=this;this.options=a=B(!0,this.options||{},a);this.Date=a.Date||q.Date||Date;this.timezoneOffset=(this.useUTC=e)&&
a.timezoneOffset;this.getTimezoneOffset=this.timezoneOffsetFunction();(this.variableTimezone=!(e&&!a.getTimezoneOffset&&!a.timezone))||this.timezoneOffset?(this.get=function(a,g){var d=g.getTime(),m=d-v.getTimezoneOffset(g);g.setTime(m);a=g["getUTC"+a]();g.setTime(d);return a},this.set=function(a,g,d){var m;if("Milliseconds"===a||"Seconds"===a||"Minutes"===a&&0===g.getTimezoneOffset()%60)g["set"+a](d);else m=v.getTimezoneOffset(g),m=g.getTime()-m,g.setTime(m),g["setUTC"+a](d),a=v.getTimezoneOffset(g),
m=g.getTime()+a,g.setTime(m);}):e?(this.get=function(a,g){return g["getUTC"+a]()},this.set=function(a,g,d){return g["setUTC"+a](d)}):(this.get=function(a,g){return g["get"+a]()},this.set=function(a,g,d){return g["set"+a](d)});},makeTime:function(e,q,v,n,g,d){var m,b,k;this.useUTC?(m=this.Date.UTC.apply(0,arguments),b=this.getTimezoneOffset(m),m+=b,k=this.getTimezoneOffset(m),b!==k?m+=k-b:b-36E5!==this.getTimezoneOffset(m-36E5)||a.isSafari||(m-=36E5)):m=(new this.Date(e,q,h(v,1),h(n,0),h(g,0),h(d,0))).getTime();
return m},timezoneOffsetFunction:function(){var e=this,h=this.options,v=q.moment;if(!this.useUTC)return function(a){return 6E4*(new Date(a)).getTimezoneOffset()};if(h.timezone){if(v)return function(a){return 6E4*-v.tz(a,h.timezone).utcOffset()};a.error(25);}return this.useUTC&&h.getTimezoneOffset?function(a){return 6E4*h.getTimezoneOffset(a)}:function(){return 6E4*(e.timezoneOffset||0)}},dateFormat:function(e,h,v){if(!a.defined(h)||isNaN(h))return a.defaultOptions.lang.invalidDate||"";e=a.pick(e,"%Y-%m-%d %H:%M:%S");
var n=this,g=new this.Date(h),d=this.get("Hours",g),m=this.get("Day",g),b=this.get("Date",g),k=this.get("Month",g),p=this.get("FullYear",g),c=a.defaultOptions.lang,x=c.weekdays,q=c.shortWeekdays,w=a.pad,g=a.extend({a:q?q[m]:x[m].substr(0,3),A:x[m],d:w(b),e:w(b,2," "),w:m,b:c.shortMonths[k],B:c.months[k],m:w(k+1),o:k+1,y:p.toString().substr(2,2),Y:p,H:w(d),k:d,I:w(d%12||12),l:d%12||12,M:w(n.get("Minutes",g)),p:12>d?"AM":"PM",P:12>d?"am":"pm",S:w(g.getSeconds()),L:w(Math.floor(h%1E3),3)},a.dateFormats);
a.objectEach(g,function(a,b){for(;-1!==e.indexOf("%"+b);)e=e.replace("%"+b,"function"===typeof a?a.call(n,h):a);});return v?e.substr(0,1).toUpperCase()+e.substr(1):e},resolveDTLFormat:function(e){return a.isObject(e,!0)?e:(e=a.splat(e),{main:e[0],from:e[1],to:e[2]})},getTimeTicks:function(a,q,v,n){var g=this,d=[],m,b={},k;m=new g.Date(q);var p=a.unitRange,c=a.count||1,x;n=h(n,1);if(E(q)){g.set("Milliseconds",m,p>=e.second?0:c*Math.floor(g.get("Milliseconds",m)/c));p>=e.second&&g.set("Seconds",m,p>=
e.minute?0:c*Math.floor(g.get("Seconds",m)/c));p>=e.minute&&g.set("Minutes",m,p>=e.hour?0:c*Math.floor(g.get("Minutes",m)/c));p>=e.hour&&g.set("Hours",m,p>=e.day?0:c*Math.floor(g.get("Hours",m)/c));p>=e.day&&g.set("Date",m,p>=e.month?1:Math.max(1,c*Math.floor(g.get("Date",m)/c)));p>=e.month&&(g.set("Month",m,p>=e.year?0:c*Math.floor(g.get("Month",m)/c)),k=g.get("FullYear",m));p>=e.year&&g.set("FullYear",m,k-k%c);p===e.week&&(k=g.get("Day",m),g.set("Date",m,g.get("Date",m)-k+n+(k<n?-7:0)));k=g.get("FullYear",
m);n=g.get("Month",m);var K=g.get("Date",m),w=g.get("Hours",m);q=m.getTime();g.variableTimezone&&(x=v-q>4*e.month||g.getTimezoneOffset(q)!==g.getTimezoneOffset(v));q=m.getTime();for(m=1;q<v;)d.push(q),q=p===e.year?g.makeTime(k+m*c,0):p===e.month?g.makeTime(k,n+m*c):!x||p!==e.day&&p!==e.week?x&&p===e.hour&&1<c?g.makeTime(k,n,K,w+m*c):q+p*c:g.makeTime(k,n,K+m*c*(p===e.day?1:7)),m++;d.push(q);p<=e.hour&&1E4>d.length&&d.forEach(function(a){0===a%18E5&&"000000000"===g.dateFormat("%H%M%S%L",a)&&(b[a]="day");});}d.info=
H(a,{higherRanks:b,totalRange:p*c});return d}};});J(G,"parts/Options.js",[G["parts/Globals.js"]],function(a){var E=a.color,H=a.merge;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:a.Time.prototype.defaultOptions,chart:{styledMode:!1,borderRadius:0,colorCount:10,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",
plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",alignColumns:!0,layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",cursor:"pointer",fontSize:"12px",fontWeight:"bold",
textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",
second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',backgroundColor:E("#f7f7f7").setOpacity(.85).get(),borderWidth:1,shadow:!0,
style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"https://www.highcharts.com?credits",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(B){a.defaultOptions=H(!0,a.defaultOptions,B);a.time.update(H(a.defaultOptions.global,a.defaultOptions.time),!1);return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};
a.defaultPlotOptions=a.defaultOptions.plotOptions;a.time=new a.Time(H(a.defaultOptions.global,a.defaultOptions.time));a.dateFormat=function(B,h,e){return a.time.dateFormat(B,h,e)};});J(G,"parts/Tick.js",[G["parts/Globals.js"]],function(a){var E=a.correctFloat,H=a.defined,B=a.destroyObjectProperties,h=a.fireEvent,e=a.isNumber,q=a.merge,t=a.pick,u=a.deg2rad;a.Tick=function(a,e,g,d,m){this.axis=a;this.pos=e;this.type=g||"";this.isNewLabel=this.isNew=!0;this.parameters=m||{};this.tickmarkOffset=this.parameters.tickmarkOffset;
this.options=this.parameters.options;g||d||this.addLabel();};a.Tick.prototype={addLabel:function(){var e=this,n=e.axis,g=n.options,d=n.chart,m=n.categories,b=n.names,k=e.pos,p=t(e.options&&e.options.labels,g.labels),c=n.tickPositions,x=k===c[0],h=k===c[c.length-1],m=this.parameters.category||(m?t(m[k],b[k],k):k),w=e.label,c=c.info,F,C,l,D;n.isDatetimeAxis&&c&&(C=d.time.resolveDTLFormat(g.dateTimeLabelFormats[!g.grid&&c.higherRanks[k]||c.unitName]),F=C.main);e.isFirst=x;e.isLast=h;e.formatCtx={axis:n,
chart:d,isFirst:x,isLast:h,dateTimeLabelFormat:F,tickPositionInfo:c,value:n.isLog?E(n.lin2log(m)):m,pos:k};g=n.labelFormatter.call(e.formatCtx,this.formatCtx);if(D=C&&C.list)e.shortenLabel=function(){for(l=0;l<D.length;l++)if(w.attr({text:n.labelFormatter.call(a.extend(e.formatCtx,{dateTimeLabelFormat:D[l]}))}),w.getBBox().width<n.getSlotWidth(e)-2*t(p.padding,5))return;w.attr({text:""});};if(H(w))w&&w.textStr!==g&&(!w.textWidth||p.style&&p.style.width||w.styles.width||w.css({width:null}),w.attr({text:g}),
w.textPxLength=w.getBBox().width);else{if(e.label=w=H(g)&&p.enabled?d.renderer.text(g,0,0,p.useHTML).add(n.labelGroup):null)d.styledMode||w.css(q(p.style)),w.textPxLength=w.getBBox().width;e.rotation=0;}},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var e=this.axis,g=e.options.labels,d=a.x,m=e.chart.chartWidth,b=e.chart.spacing,k=t(e.labelLeft,Math.min(e.pos,b[3])),b=t(e.labelRight,Math.max(e.isRadial?0:e.pos+e.len,m-
b[1])),p=this.label,c=this.rotation,x={left:0,center:.5,right:1}[e.labelAlign||p.attr("align")],h=p.getBBox().width,w=e.getSlotWidth(this),F=w,C=1,l,D={};if(c||"justify"!==t(g.overflow,"justify"))0>c&&d-x*h<k?l=Math.round(d/Math.cos(c*u)-k):0<c&&d+x*h>b&&(l=Math.round((m-d)/Math.cos(c*u)));else if(m=d+(1-x)*h,d-x*h<k?F=a.x+F*(1-x)-k:m>b&&(F=b-a.x+F*x,C=-1),F=Math.min(w,F),F<w&&"center"===e.labelAlign&&(a.x+=C*(w-F-x*(w-Math.min(h,F)))),h>F||e.autoRotation&&(p.styles||{}).width)l=F;l&&(this.shortenLabel?
this.shortenLabel():(D.width=Math.floor(l),(g.style||{}).textOverflow||(D.textOverflow="ellipsis"),p.css(D)));},getPosition:function(e,n,g,d){var m=this.axis,b=m.chart,k=d&&b.oldChartHeight||b.chartHeight;e={x:e?a.correctFloat(m.translate(n+g,null,null,d)+m.transB):m.left+m.offset+(m.opposite?(d&&b.oldChartWidth||b.chartWidth)-m.right-m.left:0),y:e?k-m.bottom+m.offset-(m.opposite?m.height:0):a.correctFloat(k-m.translate(n+g,null,null,d)-m.transB)};e.y=Math.max(Math.min(e.y,1E5),-1E5);h(this,"afterGetPosition",
{pos:e});return e},getLabelPosition:function(a,e,g,d,m,b,k,p){var c=this.axis,x=c.transA,n=c.reversed,w=c.staggerLines,F=c.tickRotCorr||{x:0,y:0},C=m.y,l=d||c.reserveSpaceDefault?0:-c.labelOffset*("center"===c.labelAlign?.5:1),D={};H(C)||(C=0===c.side?g.rotation?-8:-g.getBBox().height:2===c.side?F.y+8:Math.cos(g.rotation*u)*(F.y-g.getBBox(!1,0).height/2));a=a+m.x+l+F.x-(b&&d?b*x*(n?-1:1):0);e=e+C-(b&&!d?b*x*(n?1:-1):0);w&&(g=k/(p||1)%w,c.opposite&&(g=w-g-1),e+=c.labelOffset/w*g);D.x=a;D.y=Math.round(e);
h(this,"afterGetLabelPosition",{pos:D,tickmarkOffset:b,index:k});return D},getMarkPath:function(a,e,g,d,m,b){return b.crispLine(["M",a,e,"L",a+(m?0:-g),e+(m?g:0)],d)},renderGridLine:function(a,e,g){var d=this.axis,m=d.options,b=this.gridLine,k={},p=this.pos,c=this.type,x=t(this.tickmarkOffset,d.tickmarkOffset),n=d.chart.renderer,w=c?c+"Grid":"grid",h=m[w+"LineWidth"],C=m[w+"LineColor"],m=m[w+"LineDashStyle"];b||(d.chart.styledMode||(k.stroke=C,k["stroke-width"]=h,m&&(k.dashstyle=m)),c||(k.zIndex=
1),a&&(e=0),this.gridLine=b=n.path().attr(k).addClass("highcharts-"+(c?c+"-":"")+"grid-line").add(d.gridGroup));if(b&&(g=d.getPlotLinePath({value:p+x,lineWidth:b.strokeWidth()*g,force:"pass",old:a})))b[a||this.isNew?"attr":"animate"]({d:g,opacity:e});},renderMark:function(a,e,g){var d=this.axis,m=d.options,b=d.chart.renderer,k=this.type,p=k?k+"Tick":"tick",c=d.tickSize(p),x=this.mark,n=!x,w=a.x;a=a.y;var h=t(m[p+"Width"],!k&&d.isXAxis?1:0),m=m[p+"Color"];c&&(d.opposite&&(c[0]=-c[0]),n&&(this.mark=
x=b.path().addClass("highcharts-"+(k?k+"-":"")+"tick").add(d.axisGroup),d.chart.styledMode||x.attr({stroke:m,"stroke-width":h})),x[n?"attr":"animate"]({d:this.getMarkPath(w,a,c[0],x.strokeWidth()*g,d.horiz,b),opacity:e}));},renderLabel:function(a,n,g,d){var m=this.axis,b=m.horiz,k=m.options,p=this.label,c=k.labels,x=c.step,m=t(this.tickmarkOffset,m.tickmarkOffset),h=!0,w=a.x;a=a.y;p&&e(w)&&(p.xy=a=this.getLabelPosition(w,a,p,b,c,m,d,x),this.isFirst&&!this.isLast&&!t(k.showFirstLabel,1)||this.isLast&&
!this.isFirst&&!t(k.showLastLabel,1)?h=!1:!b||c.step||c.rotation||n||0===g||this.handleOverflow(a),x&&d%x&&(h=!1),h&&e(a.y)?(a.opacity=g,p[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(p.attr("y",-9999),this.isNewLabel=!0));},render:function(e,n,g){var d=this.axis,m=d.horiz,b=this.pos,k=t(this.tickmarkOffset,d.tickmarkOffset),b=this.getPosition(m,b,k,n),k=b.x,p=b.y,d=m&&k===d.pos+d.len||!m&&p===d.pos?-1:1;g=t(g,1);this.isActive=!0;this.renderGridLine(n,g,d);this.renderMark(b,g,d);this.renderLabel(b,
n,g,e);this.isNew=!1;a.fireEvent(this,"afterRender");},destroy:function(){B(this,this.axis);}};});J(G,"parts/Axis.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,H=a.animObject,B=a.arrayMax,h=a.arrayMin,e=a.color,q=a.correctFloat,t=a.defaultOptions,u=a.defined,v=a.deg2rad,n=a.destroyObjectProperties,g=a.extend,d=a.fireEvent,m=a.format,b=a.getMagnitude,k=a.isArray,p=a.isNumber,c=a.isString,x=a.merge,K=a.normalizeTickInterval,w=a.objectEach,F=a.pick,C=a.removeEvent,l=a.seriesTypes,D=a.splat,A=
a.syncTimeout,z=a.Tick,I=function(){this.init.apply(this,arguments);};a.extend(I.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:{main:"%H:%M:%S.%L",range:!1},second:{main:"%H:%M:%S",range:!1},minute:{main:"%H:%M",range:!1},hour:{main:"%H:%M",range:!1},day:{main:"%e. %b"},week:{main:"%e. %b"},month:{main:"%b '%y"},year:{main:"%Y"}},endOnTick:!1,labels:{enabled:!0,indentation:10,x:0,style:{color:"#666666",cursor:"default",fontSize:"11px"}},maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",
minPadding:.01,showEmpty:!0,startOfWeek:1,startOnTick:!1,tickLength:10,tickPixelInterval:100,tickmarkPlacement:"between",tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,maxPadding:.05,minPadding:.05,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},startOnTick:!0,title:{rotation:270,
text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{color:"#000000",fontSize:"11px",fontWeight:"bold",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},margin:15,
title:{rotation:0}},init:function(f,b){var c=b.isX,r=this;r.chart=f;r.horiz=f.inverted&&!r.isZAxis?!c:c;r.isXAxis=c;r.coll=r.coll||(c?"xAxis":"yAxis");d(this,"init",{userOptions:b});r.opposite=b.opposite;r.side=b.side||(r.horiz?r.opposite?0:2:r.opposite?1:3);r.setOptions(b);var l=this.options,p=l.type;r.labelFormatter=l.labels.formatter||r.defaultLabelFormatter;r.userOptions=b;r.minPixelPadding=0;r.reversed=l.reversed;r.visible=!1!==l.visible;r.zoomEnabled=!1!==l.zoomEnabled;r.hasNames="category"===
p||!0===l.categories;r.categories=l.categories||r.hasNames;r.names||(r.names=[],r.names.keys={});r.plotLinesAndBandsGroups={};r.isLog="logarithmic"===p;r.isDatetimeAxis="datetime"===p;r.positiveValuesOnly=r.isLog&&!r.allowNegativeLog;r.isLinked=u(l.linkedTo);r.ticks={};r.labelEdge=[];r.minorTicks={};r.plotLinesAndBands=[];r.alternateBands={};r.len=0;r.minRange=r.userMinRange=l.minRange||l.maxZoom;r.range=l.range;r.offset=l.offset||0;r.stacks={};r.oldStacks={};r.stacksTouched=0;r.max=null;r.min=null;
r.crosshair=F(l.crosshair,D(f.options.tooltip.crosshairs)[c?0:1],!1);b=r.options.events;-1===f.axes.indexOf(r)&&(c?f.axes.splice(f.xAxis.length,0,r):f.axes.push(r),f[r.coll].push(r));r.series=r.series||[];f.inverted&&!r.isZAxis&&c&&void 0===r.reversed&&(r.reversed=!0);w(b,function(f,b){a.isFunction(f)&&E(r,b,f);});r.lin2log=l.linearToLogConverter||r.lin2log;r.isLog&&(r.val2lin=r.log2lin,r.lin2val=r.lin2log);d(this,"afterInit");},setOptions:function(a){this.options=x(this.defaultOptions,"yAxis"===this.coll&&
this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],x(t[this.coll],a));d(this,"afterSetOptions",{userOptions:a});},defaultLabelFormatter:function(){var f=this.axis,b=this.value,c=f.chart.time,d=f.categories,l=this.dateTimeLabelFormat,p=t.lang,k=p.numericSymbols,p=p.numericSymbolMagnitude||1E3,e=k&&k.length,g,A=f.options.labels.format,f=f.isLog?Math.abs(b):f.tickInterval;if(A)g=m(A,this,c);else if(d)g=
b;else if(l)g=c.dateFormat(l,b);else if(e&&1E3<=f)for(;e--&&void 0===g;)c=Math.pow(p,e+1),f>=c&&0===10*b%c&&null!==k[e]&&0!==b&&(g=a.numberFormat(b/c,-1)+k[e]);void 0===g&&(g=1E4<=Math.abs(b)?a.numberFormat(b,-1):a.numberFormat(b,-1,void 0,""));return g},getSeriesExtremes:function(){var a=this,b=a.chart,c;d(this,"getSeriesExtremes",null,function(){a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();a.series.forEach(function(f){if(f.visible||
!b.options.chart.ignoreHiddenSeries){var r=f.options,d=r.threshold,l,k;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=d&&(d=null);if(a.isXAxis)r=f.xData,r.length&&(c=f.getXExtremes(r),l=c.min,k=c.max,p(l)||l instanceof Date||(r=r.filter(p),c=f.getXExtremes(r),l=c.min,k=c.max),r.length&&(a.dataMin=Math.min(F(a.dataMin,l),l),a.dataMax=Math.max(F(a.dataMax,k),k)));else if(f.getExtremes(),k=f.dataMax,l=f.dataMin,u(l)&&u(k)&&(a.dataMin=Math.min(F(a.dataMin,l),l),a.dataMax=Math.max(F(a.dataMax,k),k)),u(d)&&
(a.threshold=d),!r.softThreshold||a.positiveValuesOnly)a.softThreshold=!1;}});});d(this,"afterGetSeriesExtremes");},translate:function(a,b,c,d,l,k){var f=this.linkedParent||this,r=1,e=0,g=d?f.oldTransA:f.transA;d=d?f.oldMin:f.min;var m=f.minPixelPadding;l=(f.isOrdinal||f.isBroken||f.isLog&&l)&&f.lin2val;g||(g=f.transA);c&&(r*=-1,e=f.len);f.reversed&&(r*=-1,e-=r*(f.sector||f.len));b?(a=(a*r+e-m)/g+d,l&&(a=f.lin2val(a))):(l&&(a=f.val2lin(a)),a=p(d)?r*(a-d)*g+e+r*m+(p(k)?g*k:0):void 0);return a},toPixels:function(a,
b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a){var f=this,b=f.chart,c=f.left,l=f.top,k=a.old,e=a.value,g=a.translatedValue,m=a.lineWidth,A=a.force,x,D,n,w,z=k&&b.oldChartHeight||b.chartHeight,h=k&&b.oldChartWidth||b.chartWidth,C,I=f.transB,q=function(a,f,b){if("pass"!==A&&a<f||a>b)A?a=Math.min(Math.max(f,a),b):C=!0;return a};a={value:e,lineWidth:m,old:k,force:A,acrossPanes:a.acrossPanes,
translatedValue:g};d(this,"getPlotLinePath",a,function(a){g=F(g,f.translate(e,null,null,k));g=Math.min(Math.max(-1E5,g),1E5);x=n=Math.round(g+I);D=w=Math.round(z-g-I);p(g)?f.horiz?(D=l,w=z-f.bottom,x=n=q(x,c,c+f.width)):(x=c,n=h-f.right,D=w=q(D,l,l+f.height)):(C=!0,A=!1);a.path=C&&!A?null:b.renderer.crispLine(["M",x,D,"L",n,w],m||1);});return a.path},getLinearTickPositions:function(a,b,c){var f,r=q(Math.floor(b/a)*a);c=q(Math.ceil(c/a)*a);var d=[],l;q(r+a)===r&&(l=20);if(this.single)return [b];for(b=
r;b<=c;){d.push(b);b=q(b+a,l);if(b===f)break;f=b;}return d},getMinorTickInterval:function(){var a=this.options;return !0===a.minorTicks?F(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,b=a.options,c=a.tickPositions,d=a.minorTickInterval,l=[],p=a.pointRangePadding||0,k=a.min-p,p=a.max+p,g=p-k;if(g&&g/d<a.len/3)if(a.isLog)this.paddedTicks.forEach(function(f,b,c){b&&l.push.apply(l,a.getLogTickPositions(d,c[b-1],c[b],!0));});else if(a.isDatetimeAxis&&
"auto"===this.getMinorTickInterval())l=l.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d),k,p,b.startOfWeek));else for(b=k+(c[0]-k)%d;b<=p&&b!==l[0];b+=d)l.push(b);0!==l.length&&a.trimTicks(l);return l},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,d,l,p,k,g,e,m,A;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(u(a.min)||u(a.max)?this.minRange=null:(this.series.forEach(function(a){e=a.xData;for(k=m=a.xIncrement?1:e.length-1;0<k;k--)if(g=e[k]-e[k-1],void 0===p||g<p)p=
g;}),this.minRange=Math.min(5*p,this.dataMax-this.dataMin)));c-b<this.minRange&&(l=this.dataMax-this.dataMin>=this.minRange,A=this.minRange,d=(A-c+b)/2,d=[b-d,F(a.min,b-d)],l&&(d[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=B(d),c=[b+A,F(a.max,b+A)],l&&(c[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),c=h(c),c-b<A&&(d[0]=c-A,d[1]=F(a.min,c-A),b=B(d)));this.min=b;this.max=c;},getClosest:function(){var a;this.categories?a=1:this.series.forEach(function(f){var b=f.closestPointRange,
c=f.visible||!f.chart.options.chart.ignoreHiddenSeries;!f.noSharedTooltip&&u(b)&&c&&(a=u(a)?Math.min(a,b):b);});return a},nameToX:function(a){var f=k(this.categories),b=f?this.categories:this.names,c=a.options.x,d;a.series.requireSorting=!1;u(c)||(c=!1===this.options.uniqueNames?a.series.autoIncrement():f?b.indexOf(a.name):F(b.keys[a.name],-1));-1===c?f||(d=b.length):d=c;void 0!==d&&(this.names[d]=a.name,this.names.keys[a.name]=d);return d},updateNames:function(){var a=this,b=this.names;0<b.length&&
(Object.keys(b.keys).forEach(function(a){delete b.keys[a];}),b.length=0,this.minRange=this.userMinRange,(this.series||[]).forEach(function(f){f.xIncrement=null;if(!f.points||f.isDirtyData)a.max=Math.max(a.max,f.xData.length-1),f.processData(),f.generatePoints();f.data.forEach(function(b,c){var r;b&&b.options&&void 0!==b.name&&(r=a.nameToX(b),void 0!==r&&r!==b.x&&(b.x=r,f.xData[c]=r));});}));},setAxisTranslation:function(a){var f=this,b=f.max-f.min,p=f.axisPointRange||0,k,g=0,e=0,A=f.linkedParent,m=!!f.categories,
x=f.transA,D=f.isXAxis;if(D||m||p)k=f.getClosest(),A?(g=A.minPointOffset,e=A.pointRangePadding):f.series.forEach(function(a){var b=m?1:D?F(a.options.pointRange,k,0):f.axisPointRange||0,r=a.options.pointPlacement;p=Math.max(p,b);if(!f.single||m)a=l.xrange&&a instanceof l.xrange?!D:D,g=Math.max(g,a&&c(r)?0:b/2),e=Math.max(e,a&&"on"===r?0:b);}),A=f.ordinalSlope&&k?f.ordinalSlope/k:1,f.minPointOffset=g*=A,f.pointRangePadding=e*=A,f.pointRange=Math.min(p,b),D&&(f.closestPointRange=k);a&&(f.oldTransA=x);
f.translationSlope=f.transA=x=f.staticScale||f.len/(b+e||1);f.transB=f.horiz?f.left:f.bottom;f.minPixelPadding=x*g;d(this,"afterSetAxisTranslation");},minFromRange:function(){return this.max-this.range},setTickInterval:function(f){var c=this,l=c.chart,k=c.options,g=c.isLog,e=c.isDatetimeAxis,A=c.isXAxis,m=c.isLinked,x=k.maxPadding,D=k.minPadding,n,w=k.tickInterval,z=k.tickPixelInterval,h=c.categories,C=p(c.threshold)?c.threshold:null,I=c.softThreshold,t,v,B;e||h||m||this.getTickAmount();v=F(c.userMin,
k.min);B=F(c.userMax,k.max);m?(c.linkedParent=l[c.coll][k.linkedTo],n=c.linkedParent.getExtremes(),c.min=F(n.min,n.dataMin),c.max=F(n.max,n.dataMax),k.type!==c.linkedParent.options.type&&a.error(11,1,l)):(!I&&u(C)&&(c.dataMin>=C?(n=C,D=0):c.dataMax<=C&&(t=C,x=0)),c.min=F(v,n,c.dataMin),c.max=F(B,t,c.dataMax));g&&(c.positiveValuesOnly&&!f&&0>=Math.min(c.min,F(c.dataMin,c.min))&&a.error(10,1,l),c.min=q(c.log2lin(c.min),15),c.max=q(c.log2lin(c.max),15));c.range&&u(c.max)&&(c.userMin=c.min=v=Math.max(c.dataMin,
c.minFromRange()),c.userMax=B=c.max,c.range=null);d(c,"foundExtremes");c.beforePadding&&c.beforePadding();c.adjustForMinRange();!(h||c.axisPointRange||c.usePercentage||m)&&u(c.min)&&u(c.max)&&(l=c.max-c.min)&&(!u(v)&&D&&(c.min-=l*D),!u(B)&&x&&(c.max+=l*x));p(k.softMin)&&!p(c.userMin)&&k.softMin<c.min&&(c.min=v=k.softMin);p(k.softMax)&&!p(c.userMax)&&k.softMax>c.max&&(c.max=B=k.softMax);p(k.floor)&&(c.min=Math.min(Math.max(c.min,k.floor),Number.MAX_VALUE));p(k.ceiling)&&(c.max=Math.max(Math.min(c.max,
k.ceiling),F(c.userMax,-Number.MAX_VALUE)));I&&u(c.dataMin)&&(C=C||0,!u(v)&&c.min<C&&c.dataMin>=C?c.min=c.options.minRange?Math.min(C,c.max-c.minRange):C:!u(B)&&c.max>C&&c.dataMax<=C&&(c.max=c.options.minRange?Math.max(C,c.min+c.minRange):C));c.tickInterval=c.min===c.max||void 0===c.min||void 0===c.max?1:m&&!w&&z===c.linkedParent.options.tickPixelInterval?w=c.linkedParent.tickInterval:F(w,this.tickAmount?(c.max-c.min)/Math.max(this.tickAmount-1,1):void 0,h?1:(c.max-c.min)*z/Math.max(c.len,z));A&&
!f&&c.series.forEach(function(a){a.processData(c.min!==c.oldMin||c.max!==c.oldMax);});c.setAxisTranslation(!0);c.beforeSetTickPositions&&c.beforeSetTickPositions();c.postProcessTickInterval&&(c.tickInterval=c.postProcessTickInterval(c.tickInterval));c.pointRange&&!w&&(c.tickInterval=Math.max(c.pointRange,c.tickInterval));f=F(k.minTickInterval,c.isDatetimeAxis&&c.closestPointRange);!w&&c.tickInterval<f&&(c.tickInterval=f);e||g||w||(c.tickInterval=K(c.tickInterval,null,b(c.tickInterval),F(k.allowDecimals,
!(.5<c.tickInterval&&5>c.tickInterval&&1E3<c.max&&9999>c.max)),!!this.tickAmount));this.tickAmount||(c.tickInterval=c.unsquish());this.setTickPositions();},setTickPositions:function(){var f=this.options,c,b=f.tickPositions;c=this.getMinorTickInterval();var l=f.tickPositioner,k=f.startOnTick,p=f.endOnTick;this.tickmarkOffset=this.categories&&"between"===f.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===c&&this.tickInterval?this.tickInterval/5:c;this.single=this.min===this.max&&
u(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==f.allowDecimals);this.tickPositions=c=b&&b.slice();!c&&(!this.ordinalPositions&&(this.max-this.min)/this.tickInterval>Math.max(2*this.len,200)?(c=[this.min,this.max],a.error(19,!1,this.chart)):c=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,f.units),this.min,this.max,f.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,
this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),c.length>this.len&&(c=[c[0],c.pop()],c[0]===c[1]&&(c.length=1)),this.tickPositions=c,l&&(l=l.apply(this,[this.min,this.max])))&&(this.tickPositions=c=l);this.paddedTicks=c.slice(0);this.trimTicks(c,k,p);this.isLinked||(this.single&&2>c.length&&!this.categories&&(this.min-=.5,this.max+=.5),b||l||this.adjustTickAmount());d(this,"afterSetTickPositions");},trimTicks:function(a,c,b){var f=a[0],l=a[a.length-1],k=this.minPointOffset||
0;d(this,"trimTicks");if(!this.isLinked){if(c&&-Infinity!==f)this.min=f;else for(;this.min-k>a[0];)a.shift();if(b)this.max=l;else for(;this.max+k<a[a.length-1];)a.pop();0===a.length&&u(f)&&!this.options.tickPositions&&a.push((l+f)/2);}},alignToOthers:function(){var a={},c,b=this.options;!1===this.chart.options.chart.alignTicks||!1===b.alignTicks||!1===b.startOnTick||!1===b.endOnTick||this.isLog||this.chart[this.coll].forEach(function(f){var b=f.options,b=[f.horiz?b.left:b.top,b.width,b.height,b.pane].join();
f.series.length&&(a[b]?c=!0:a[b]=1);});return c},getTickAmount:function(){var a=this.options,c=a.tickAmount,b=a.tickPixelInterval;!u(a.tickInterval)&&this.len<b&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(c=2);!c&&this.alignToOthers()&&(c=Math.ceil(this.len/b)+1);4>c&&(this.finalTickAmt=c,c=5);this.tickAmount=c;},adjustTickAmount:function(){var a=this.options,c=this.tickInterval,b=this.tickPositions,d=this.tickAmount,l=this.finalTickAmt,k=b&&b.length,p=F(this.threshold,this.softThreshold?
0:null),g;if(this.hasData()){if(k<d){for(g=this.min;b.length<d;)b.length%2||g===p?b.push(q(b[b.length-1]+c)):b.unshift(q(b[0]-c));this.transA*=(k-1)/(d-1);this.min=a.startOnTick?b[0]:Math.min(this.min,b[0]);this.max=a.endOnTick?b[b.length-1]:Math.max(this.max,b[b.length-1]);}else k>d&&(this.tickInterval*=2,this.setTickPositions());if(u(l)){for(c=a=b.length;c--;)(3===l&&1===c%2||2>=l&&0<c&&c<a-1)&&b.splice(c,1);this.finalTickAmt=void 0;}}},setScale:function(){var a=this.series.some(function(a){return a.isDirtyData||
a.isDirty||a.xAxis.isDirty}),c;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();(c=this.len!==this.oldAxisLength)||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=c||this.min!==this.oldMin||this.max!==
this.oldMax)):this.cleanStacks&&this.cleanStacks();d(this,"afterSetScale");},setExtremes:function(a,c,b,l,k){var f=this,p=f.chart;b=F(b,!0);f.series.forEach(function(a){delete a.kdTree;});k=g(k,{min:a,max:c});d(f,"setExtremes",k,function(){f.userMin=a;f.userMax=c;f.eventArgs=k;b&&p.redraw(l);});},zoom:function(a,c){var f=this.dataMin,b=this.dataMax,l=this.options,k=Math.min(f,F(l.min,f)),p=Math.max(b,F(l.max,b));a={newMin:a,newMax:c};d(this,"zoom",a,function(a){var c=a.newMin,d=a.newMax;if(c!==this.min||
d!==this.max)this.allowZoomOutside||(u(f)&&(c<k&&(c=k),c>p&&(c=p)),u(b)&&(d<k&&(d=k),d>p&&(d=p))),this.displayBtn=void 0!==c||void 0!==d,this.setExtremes(c,d,!1,void 0,{trigger:"zoom"});a.zoomed=!0;});return a.zoomed},setAxisSize:function(){var f=this.chart,c=this.options,b=c.offsets||[0,0,0,0],d=this.horiz,l=this.width=Math.round(a.relativeLength(F(c.width,f.plotWidth-b[3]+b[1]),f.plotWidth)),k=this.height=Math.round(a.relativeLength(F(c.height,f.plotHeight-b[0]+b[2]),f.plotHeight)),p=this.top=Math.round(a.relativeLength(F(c.top,
f.plotTop+b[0]),f.plotHeight,f.plotTop)),c=this.left=Math.round(a.relativeLength(F(c.left,f.plotLeft+b[3]),f.plotWidth,f.plotLeft));this.bottom=f.chartHeight-k-p;this.right=f.chartWidth-l-c;this.len=Math.max(d?l:k,0);this.pos=d?c:p;},getExtremes:function(){var a=this.isLog;return {min:a?q(this.lin2log(this.min)):this.min,max:a?q(this.lin2log(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var f=this.isLog,c=f?this.lin2log(this.min):
this.min,f=f?this.lin2log(this.max):this.max;null===a||-Infinity===a?a=c:Infinity===a?a=f:c>a?a=c:f<a&&(a=f);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){var f=(F(a,0)-90*this.side+720)%360;a={align:"center"};d(this,"autoLabelAlign",a,function(a){15<f&&165>f?a.align="right":195<f&&345>f&&(a.align="left");});return a.align},tickSize:function(a){var f=this.options,c=f[a+"Length"],b=F(f[a+"Width"],"tick"===a&&this.isXAxis&&!this.categories?1:0),l;b&&c&&("inside"===f[a+"Position"]&&(c=
-c),l=[c,b]);a={tickSize:l};d(this,"afterTickSize",a);return a.tickSize},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,c=this.horiz,b=this.tickInterval,d=b,l=this.len/(((this.categories?1:0)+this.max-this.min)/b),k,p=a.rotation,g=this.labelMetrics(),e,A=Number.MAX_VALUE,m,x=this.max-this.min,
D=function(a){var f=a/(l||1),f=1<f?Math.ceil(f):1;f*b>x&&Infinity!==a&&Infinity!==l&&(f=Math.ceil(x/b));return q(f*b)};c?(m=!a.staggerLines&&!a.step&&(u(p)?[p]:l<F(a.autoRotationLimit,80)&&a.autoRotation))&&m.forEach(function(a){var f;if(a===p||a&&-90<=a&&90>=a)e=D(Math.abs(g.h/Math.sin(v*a))),f=e+Math.abs(a/360),f<A&&(A=f,k=a,d=e);}):a.step||(d=D(g.h));this.autoRotation=m;this.labelRotation=F(k,p);return d},getSlotWidth:function(a){var f=this.chart,c=this.horiz,b=this.options.labels,d=Math.max(this.tickPositions.length-
(this.categories?0:1),1),l=f.margin[3];return a&&a.slotWidth||c&&2>(b.step||0)&&!b.rotation&&(this.staggerLines||1)*this.len/d||!c&&(b.style&&parseInt(b.style.width,10)||l&&l-f.spacing[3]||.33*f.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,d=this.tickPositions,l=this.ticks,k=this.options.labels,p=k&&k.style||{},g=this.horiz,e=this.getSlotWidth(),A=Math.max(1,Math.round(e-2*(k.padding||5))),m={},x=this.labelMetrics(),D=k.style&&k.style.textOverflow,n,w,z=0,C;c(k.rotation)||
(m.rotation=k.rotation||0);d.forEach(function(a){(a=l[a])&&a.label&&a.label.textPxLength>z&&(z=a.label.textPxLength);});this.maxLabelLength=z;if(this.autoRotation)z>A&&z>x.h?m.rotation=this.labelRotation:this.labelRotation=0;else if(e&&(n=A,!D))for(w="clip",A=d.length;!g&&A--;)if(C=d[A],C=l[C].label)C.styles&&"ellipsis"===C.styles.textOverflow?C.css({textOverflow:"clip"}):C.textPxLength>e&&C.css({width:e+"px"}),C.getBBox().height>this.len/d.length-(x.h-x.f)&&(C.specificTextOverflow="ellipsis");m.rotation&&
(n=z>.5*a.chartHeight?.33*a.chartHeight:z,D||(w="ellipsis"));if(this.labelAlign=k.align||this.autoLabelAlign(this.labelRotation))m.align=this.labelAlign;d.forEach(function(a){var f=(a=l[a])&&a.label,c=p.width,b={};f&&(f.attr(m),a.shortenLabel?a.shortenLabel():n&&!c&&"nowrap"!==p.whiteSpace&&(n<f.textPxLength||"SPAN"===f.element.tagName)?(b.width=n,D||(b.textOverflow=f.specificTextOverflow||w),f.css(b)):f.styles&&f.styles.width&&!b.width&&!c&&f.css({width:null}),delete f.specificTextOverflow,a.rotation=
m.rotation);},this);this.tickRotCorr=b.rotCorr(x.b,this.labelRotation||0,0!==this.side);},hasData:function(){return this.series.some(function(a){return a.hasData()})||this.options.showEmpty&&u(this.min)&&u(this.max)},addTitle:function(a){var f=this.chart.renderer,c=this.horiz,b=this.opposite,d=this.options.title,l,k=this.chart.styledMode;this.axisTitle||((l=d.textAlign)||(l=(c?{low:"left",middle:"center",high:"right"}:{low:b?"right":"left",middle:"center",high:b?"left":"right"})[d.align]),this.axisTitle=
f.text(d.text,0,0,d.useHTML).attr({zIndex:7,rotation:d.rotation||0,align:l}).addClass("highcharts-axis-title"),k||this.axisTitle.css(x(d.style)),this.axisTitle.add(this.axisGroup),this.axisTitle.isNew=!0);k||d.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0);},generateTick:function(a){var f=this.ticks;f[a]?f[a].addLabel():f[a]=new z(this,a);},getOffset:function(){var a=this,c=a.chart,b=c.renderer,l=a.options,k=a.tickPositions,p=a.ticks,g=a.horiz,e=
a.side,A=c.inverted&&!a.isZAxis?[1,0,3,2][e]:e,m,x,D=0,n,z=0,C=l.title,h=l.labels,I=0,q=c.axisOffset,c=c.clipOffset,K=[-1,1,1,-1][e],t=l.className,v=a.axisParent;m=a.hasData();a.showAxis=x=m||F(l.showEmpty,!0);a.staggerLines=a.horiz&&h.staggerLines;a.axisGroup||(a.gridGroup=b.g("grid").attr({zIndex:l.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(t||"")).add(v),a.axisGroup=b.g("axis").attr({zIndex:l.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(t||"")).add(v),
a.labelGroup=b.g("axis-labels").attr({zIndex:h.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(t||"")).add(v));m||a.isLinked?(k.forEach(function(c,b){a.generateTick(c,b);}),a.renderUnsquish(),a.reserveSpaceDefault=0===e||2===e||{1:"left",3:"right"}[e]===a.labelAlign,F(h.reserveSpace,"center"===a.labelAlign?!0:null,a.reserveSpaceDefault)&&k.forEach(function(a){I=Math.max(p[a].getLabelSize(),I);}),a.staggerLines&&(I*=a.staggerLines),a.labelOffset=I*(a.opposite?-1:1)):w(p,function(a,
c){a.destroy();delete p[c];});C&&C.text&&!1!==C.enabled&&(a.addTitle(x),x&&!1!==C.reserveSpace&&(a.titleOffset=D=a.axisTitle.getBBox()[g?"height":"width"],n=C.offset,z=u(n)?0:F(C.margin,g?5:10)));a.renderLine();a.offset=K*F(l.offset,q[e]?q[e]+(l.margin||0):0);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};b=0===e?-a.labelMetrics().h:2===e?a.tickRotCorr.y:0;z=Math.abs(I)+z;I&&(z=z-b+K*(g?F(h.y,a.tickRotCorr.y+8*K):h.x));a.axisTitleMargin=F(n,z);a.getMaxLabelDimensions&&(a.maxLabelDimensions=a.getMaxLabelDimensions(p,
k));g=this.tickSize("tick");q[e]=Math.max(q[e],a.axisTitleMargin+D+K*a.offset,z,k&&k.length&&g?g[0]+K*a.offset:0);l=l.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);c[A]=Math.max(c[A],l);d(this,"afterGetOffset");},getLinePath:function(a){var c=this.chart,b=this.opposite,f=this.offset,d=this.horiz,l=this.left+(b?this.width:0)+f,f=c.chartHeight-this.bottom-(b?this.height:0)+f;b&&(a*=-1);return c.renderer.crispLine(["M",d?this.left:l,d?f:this.top,"L",d?c.chartWidth-this.right:l,d?f:c.chartHeight-this.bottom],
a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.chart.styledMode||this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}));},getTitlePosition:function(){var a=this.horiz,c=this.left,b=this.top,l=this.len,k=this.options.title,p=a?c:b,e=this.opposite,g=this.offset,A=k.x||0,m=k.y||0,x=this.axisTitle,D=this.chart.renderer.fontMetrics(k.style&&k.style.fontSize,x),x=Math.max(x.getBBox(null,
0).height-D.h-1,0),l={low:p+(a?0:l),middle:p+l/2,high:p+(a?l:0)}[k.align],c=(a?b+this.height:c)+(a?1:-1)*(e?-1:1)*this.axisTitleMargin+[-x,x,D.f,-x][this.side],a={x:a?l+A:c+(e?this.width:0)+g+A,y:a?c+m-(e?this.height:0)+g:l+m};d(this,"afterGetTitlePosition",{titlePosition:a});return a},renderMinorTick:function(a){var c=this.chart.hasRendered&&p(this.oldMin),b=this.minorTicks;b[a]||(b[a]=new z(this,a,"minor"));c&&b[a].isNew&&b[a].render(null,!0);b[a].render(null,!1,1);},renderTick:function(a,c){var b=
this.isLinked,f=this.ticks,d=this.chart.hasRendered&&p(this.oldMin);if(!b||a>=this.min&&a<=this.max)f[a]||(f[a]=new z(this,a)),d&&f[a].isNew&&f[a].render(c,!0,-1),f[a].render(c);},render:function(){var c=this,b=c.chart,l=c.options,k=c.isLog,e=c.isLinked,g=c.tickPositions,m=c.axisTitle,x=c.ticks,D=c.minorTicks,n=c.alternateBands,C=l.stackLabels,h=l.alternateGridColor,I=c.tickmarkOffset,q=c.axisLine,F=c.showAxis,K=H(b.renderer.globalAnimation),t,v;c.labelEdge.length=0;c.overlap=!1;[x,D,n].forEach(function(a){w(a,
function(a){a.isActive=!1;});});if(c.hasData()||e)c.minorTickInterval&&!c.categories&&c.getMinorTickPositions().forEach(function(a){c.renderMinorTick(a);}),g.length&&(g.forEach(function(a,b){c.renderTick(a,b);}),I&&(0===c.min||c.single)&&(x[-1]||(x[-1]=new z(c,-1,null,!0)),x[-1].render(-1))),h&&g.forEach(function(f,l){v=void 0!==g[l+1]?g[l+1]+I:c.max-I;0===l%2&&f<c.max&&v<=c.max+(b.polar?-I:I)&&(n[f]||(n[f]=new a.PlotLineOrBand(c)),t=f+I,n[f].options={from:k?c.lin2log(t):t,to:k?c.lin2log(v):v,color:h},
n[f].render(),n[f].isActive=!0);}),c._addedPlotLB||((l.plotLines||[]).concat(l.plotBands||[]).forEach(function(a){c.addPlotBandOrLine(a);}),c._addedPlotLB=!0);[x,D,n].forEach(function(a){var c,f=[],l=K.duration;w(a,function(a,c){a.isActive||(a.render(c,!1,0),a.isActive=!1,f.push(c));});A(function(){for(c=f.length;c--;)a[f[c]]&&!a[f[c]].isActive&&(a[f[c]].destroy(),delete a[f[c]]);},a!==n&&b.hasRendered&&l?l:0);});q&&(q[q.isPlaced?"animate":"attr"]({d:this.getLinePath(q.strokeWidth())}),q.isPlaced=!0,q[F?
"show":"hide"](!0));m&&F&&(l=c.getTitlePosition(),p(l.y)?(m[m.isNew?"attr":"animate"](l),m.isNew=!1):(m.attr("y",-9999),m.isNew=!0));C&&C.enabled&&c.renderStackTotals();c.isDirty=!1;d(this,"afterRender");},redraw:function(){this.visible&&(this.render(),this.plotLinesAndBands.forEach(function(a){a.render();}));this.series.forEach(function(a){a.isDirty=!0;});},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var c=this,b=c.stacks,f=c.plotLinesAndBands,l;d(this,"destroy",
{keepEvents:a});a||C(c);w(b,function(a,c){n(a);b[c]=null;});[c.ticks,c.minorTicks,c.alternateBands].forEach(function(a){n(a);});if(f)for(a=f.length;a--;)f[a].destroy();"stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a){c[a]&&(c[a]=c[a].destroy());});for(l in c.plotLinesAndBandsGroups)c.plotLinesAndBandsGroups[l]=c.plotLinesAndBandsGroups[l].destroy();w(c,function(a,b){-1===c.keepProps.indexOf(b)&&delete c[b];});},drawCrosshair:function(a,
c){var b,f=this.crosshair,l=F(f.snap,!0),k,p=this.cross;d(this,"drawCrosshair",{e:a,point:c});a||(a=this.cross&&this.cross.e);if(this.crosshair&&!1!==(u(c)||!l)){l?u(c)&&(k=F(c.crosshairPos,this.isXAxis?c.plotX:this.len-c.plotY)):k=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos);u(k)&&(b=this.getPlotLinePath({value:c&&(this.isXAxis?c.x:F(c.stackY,c.y)),translatedValue:k})||null);if(!u(b)){this.hideCrosshair();return}l=this.categories&&!this.isRadial;p||(this.cross=p=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+
(l?"category ":"thin ")+f.className).attr({zIndex:F(f.zIndex,2)}).add(),this.chart.styledMode||(p.attr({stroke:f.color||(l?e("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":F(f.width,1)}).css({"pointer-events":"none"}),f.dashStyle&&p.attr({dashstyle:f.dashStyle})));p.show().attr({d:b});l&&!f.width&&p.attr({"stroke-width":this.transA});this.cross.e=a;}else this.hideCrosshair();d(this,"afterDrawCrosshair",{e:a,point:c});},hideCrosshair:function(){this.cross&&this.cross.hide();d(this,"afterHideCrosshair");}});
return a.Axis=I});J(G,"parts/DateTimeAxis.js",[G["parts/Globals.js"]],function(a){var E=a.Axis,H=a.getMagnitude,B=a.normalizeTickInterval,h=a.timeUnits;E.prototype.getTimeTicks=function(){return this.chart.time.getTimeTicks.apply(this.chart.time,arguments)};E.prototype.normalizeTimeTickInterval=function(a,q){var e=q||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],
["year",null]];q=e[e.length-1];var u=h[q[0]],v=q[1],n;for(n=0;n<e.length&&!(q=e[n],u=h[q[0]],v=q[1],e[n+1]&&a<=(u*v[v.length-1]+h[e[n+1][0]])/2);n++);u===h.year&&a<5*u&&(v=[1,2,5]);a=B(a/u,v,"year"===q[0]?Math.max(H(a/u),1):1);return {unitRange:u,count:a,unitName:q[0]}};});J(G,"parts/LogarithmicAxis.js",[G["parts/Globals.js"]],function(a){var E=a.Axis,H=a.getMagnitude,B=a.normalizeTickInterval,h=a.pick;E.prototype.getLogTickPositions=function(a,q,t,u){var e=this.options,n=this.len,g=[];u||(this._minorAutoInterval=
null);if(.5<=a)a=Math.round(a),g=this.getLinearTickPositions(a,q,t);else if(.08<=a)for(var n=Math.floor(q),d,m,b,k,p,e=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];n<t+1&&!p;n++)for(m=e.length,d=0;d<m&&!p;d++)b=this.log2lin(this.lin2log(n)*e[d]),b>q&&(!u||k<=t)&&void 0!==k&&g.push(k),k>t&&(p=!0),k=b;else q=this.lin2log(q),t=this.lin2log(t),a=u?this.getMinorTickInterval():e.tickInterval,a=h("auto"===a?null:a,this._minorAutoInterval,e.tickPixelInterval/(u?5:1)*(t-q)/((u?n/this.tickPositions.length:
n)||1)),a=B(a,null,H(a)),g=this.getLinearTickPositions(a,q,t).map(this.log2lin),u||(this._minorAutoInterval=a/5);u||(this.tickInterval=a);return g};E.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};E.prototype.lin2log=function(a){return Math.pow(10,a)};});J(G,"parts/PlotLineOrBand.js",[G["parts/Globals.js"],G["parts/Axis.js"]],function(a,E){var H=a.arrayMax,B=a.arrayMin,h=a.defined,e=a.destroyObjectProperties,q=a.erase,t=a.merge,u=a.pick;a.PlotLineOrBand=function(a,e){this.axis=a;e&&(this.options=
e,this.id=e.id);};a.PlotLineOrBand.prototype={render:function(){a.fireEvent(this,"render");var e=this,n=e.axis,g=n.horiz,d=e.options,m=d.label,b=e.label,k=d.to,p=d.from,c=d.value,x=h(p)&&h(k),q=h(c),w=e.svgElem,F=!w,C=[],l=d.color,D=u(d.zIndex,0),A=d.events,C={"class":"highcharts-plot-"+(x?"band ":"line ")+(d.className||"")},z={},I=n.chart.renderer,f=x?"bands":"lines";n.isLog&&(p=n.log2lin(p),k=n.log2lin(k),c=n.log2lin(c));n.chart.styledMode||(q?(C.stroke=l,C["stroke-width"]=d.width,d.dashStyle&&(C.dashstyle=
d.dashStyle)):x&&(l&&(C.fill=l),d.borderWidth&&(C.stroke=d.borderColor,C["stroke-width"]=d.borderWidth)));z.zIndex=D;f+="-"+D;(l=n.plotLinesAndBandsGroups[f])||(n.plotLinesAndBandsGroups[f]=l=I.g("plot-"+f).attr(z).add());F&&(e.svgElem=w=I.path().attr(C).add(l));if(q)C=n.getPlotLinePath({value:c,lineWidth:w.strokeWidth(),acrossPanes:d.acrossPanes});else if(x)C=n.getPlotBandPath(p,k,d);else return;(F||!w.d)&&C&&C.length?(w.attr({d:C}),A&&a.objectEach(A,function(a,c){w.on(c,function(a){A[c].apply(e,
[a]);});})):w&&(C?(w.show(!0),w.animate({d:C})):w.d&&(w.hide(),b&&(e.label=b=b.destroy())));m&&h(m.text)&&C&&C.length&&0<n.width&&0<n.height&&!C.isFlat?(m=t({align:g&&x&&"center",x:g?!x&&4:10,verticalAlign:!g&&x&&"middle",y:g?x?16:10:x?6:-4,rotation:g&&!x&&90},m),this.renderLabel(m,C,x,D)):b&&b.hide();return e},renderLabel:function(a,e,g,d){var m=this.label,b=this.axis.chart.renderer;m||(m={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(g?"band":"line")+"-label "+(a.className||
"")},m.zIndex=d,this.label=m=b.text(a.text,0,0,a.useHTML).attr(m).add(),this.axis.chart.styledMode||m.css(a.style));d=e.xBounds||[e[1],e[4],g?e[6]:e[1]];e=e.yBounds||[e[2],e[5],g?e[7]:e[2]];g=B(d);b=B(e);m.align(a,!1,{x:g,y:b,width:H(d)-g,height:H(e)-b});m.show(!0);},destroy:function(){q(this.axis.plotLinesAndBands,this);delete this.axis;e(this);}};a.extend(E.prototype,{getPlotBandPath:function(a,e){var g=this.getPlotLinePath({value:e,force:!0,acrossPanes:this.options.acrossPanes}),d=this.getPlotLinePath({value:a,
force:!0,acrossPanes:this.options.acrossPanes}),m=[],b=this.horiz,k=1,p;a=a<this.min&&e<this.min||a>this.max&&e>this.max;if(d&&g)for(a&&(p=d.toString()===g.toString(),k=0),a=0;a<d.length;a+=6)b&&g[a+1]===d[a+1]?(g[a+1]+=k,g[a+4]+=k):b||g[a+2]!==d[a+2]||(g[a+2]+=k,g[a+5]+=k),m.push("M",d[a+1],d[a+2],"L",d[a+4],d[a+5],g[a+4],g[a+5],g[a+1],g[a+2],"z"),m.isFlat=p;return m},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},
addPlotBandOrLine:function(e,n){var g=(new a.PlotLineOrBand(this,e)).render(),d=this.userOptions;g&&(n&&(d[n]=d[n]||[],d[n].push(e)),this.plotLinesAndBands.push(g));return g},removePlotBandOrLine:function(a){for(var e=this.plotLinesAndBands,g=this.options,d=this.userOptions,m=e.length;m--;)e[m].id===a&&e[m].destroy();[g.plotLines||[],d.plotLines||[],g.plotBands||[],d.plotBands||[]].forEach(function(b){for(m=b.length;m--;)b[m].id===a&&q(b,b[m]);});},removePlotBand:function(a){this.removePlotBandOrLine(a);},
removePlotLine:function(a){this.removePlotBandOrLine(a);}});});J(G,"parts/Tooltip.js",[G["parts/Globals.js"]],function(a){var E=a.doc,H=a.extend,B=a.format,h=a.isNumber,e=a.merge,q=a.pick,t=a.splat,u=a.syncTimeout,v=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments);};a.Tooltip.prototype={init:function(a,e){this.chart=a;this.options=e;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=e.split&&!a.inverted;this.shared=e.shared||this.split;this.outside=q(e.outside,!(!a.scrollablePixelsX&&
!a.scrollablePixelsY))&&!this.split;},cleanSplit:function(a){this.chart.series.forEach(function(e){var d=e&&e.tt;d&&(!d.isActive||a?e.tt=d.destroy():d.isActive=!1);});},applyFilter:function(){var a=this.chart;a.renderer.definition({tagName:"filter",id:"drop-shadow-"+a.index,opacity:.5,children:[{tagName:"feGaussianBlur","in":"SourceAlpha",stdDeviation:1},{tagName:"feOffset",dx:1,dy:1},{tagName:"feComponentTransfer",children:[{tagName:"feFuncA",type:"linear",slope:.3}]},{tagName:"feMerge",children:[{tagName:"feMergeNode"},
{tagName:"feMergeNode","in":"SourceGraphic"}]}]});a.renderer.definition({tagName:"style",textContent:".highcharts-tooltip-"+a.index+"{filter:url(#drop-shadow-"+a.index+")}"});},getLabel:function(){var e=this,g=this.chart.renderer,d=this.chart.styledMode,m=this.options,b,k;this.label||(this.outside&&(this.container=b=a.doc.createElement("div"),b.className="highcharts-tooltip-container",a.css(b,{position:"absolute",top:"1px",pointerEvents:m.style&&m.style.pointerEvents,zIndex:3}),a.doc.body.appendChild(b),
this.renderer=g=new a.Renderer(b,0,0)),this.split?this.label=g.g("tooltip"):(this.label=g.label("",0,0,m.shape||"callout",null,null,m.useHTML,null,"tooltip").attr({padding:m.padding,r:m.borderRadius}),d||this.label.attr({fill:m.backgroundColor,"stroke-width":m.borderWidth}).css(m.style).shadow(m.shadow)),d&&(this.applyFilter(),this.label.addClass("highcharts-tooltip-"+this.chart.index)),this.outside&&(k={x:this.label.xSetter,y:this.label.ySetter},this.label.xSetter=function(a,c){k[c].call(this.label,
e.distance);b.style.left=a+"px";},this.label.ySetter=function(a,c){k[c].call(this.label,e.distance);b.style.top=a+"px";}),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();e(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,e(!0,this.options,a));},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());this.renderer&&(this.renderer=this.renderer.destroy(),a.discardElement(this.container));
a.clearTimeout(this.hideTimer);a.clearTimeout(this.tooltipTimeout);},move:function(e,g,d,m){var b=this,k=b.now,p=!1!==b.options.animation&&!b.isHidden&&(1<Math.abs(e-k.x)||1<Math.abs(g-k.y)),c=b.followPointer||1<b.len;H(k,{x:p?(2*k.x+e)/3:e,y:p?(k.y+g)/2:g,anchorX:c?void 0:p?(2*k.anchorX+d)/3:d,anchorY:c?void 0:p?(k.anchorY+m)/2:m});b.getLabel().attr(k);p&&(a.clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){b&&b.move(e,g,d,m);},32));},hide:function(e){var g=this;a.clearTimeout(this.hideTimer);
e=q(e,this.options.hideDelay,500);this.isHidden||(this.hideTimer=u(function(){g.getLabel()[e?"fadeOut":"hide"]();g.isHidden=!0;},e));},getAnchor:function(a,e){var d=this.chart,g=d.pointer,b=d.inverted,k=d.plotTop,p=d.plotLeft,c=0,x=0,h,w;a=t(a);this.followPointer&&e?(void 0===e.chartX&&(e=g.normalize(e)),a=[e.chartX-d.plotLeft,e.chartY-k]):a[0].tooltipPos?a=a[0].tooltipPos:(a.forEach(function(a){h=a.series.yAxis;w=a.series.xAxis;c+=a.plotX+(!b&&w?w.left-p:0);x+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+
(!b&&h?h.top-k:0);}),c/=a.length,x/=a.length,a=[b?d.plotWidth-x:c,this.shared&&!b&&1<a.length&&e?e.chartY-k:b?d.plotHeight-c:x]);return a.map(Math.round)},getPosition:function(a,e,d){var g=this.chart,b=this.distance,k={},p=g.inverted&&d.h||0,c,x=this.outside,h=x?E.documentElement.clientWidth-2*b:g.chartWidth,w=x?Math.max(E.body.scrollHeight,E.documentElement.scrollHeight,E.body.offsetHeight,E.documentElement.offsetHeight,E.documentElement.clientHeight):g.chartHeight,n=g.pointer.chartPosition,C=["y",
w,e,(x?n.top-b:0)+d.plotY+g.plotTop,x?0:g.plotTop,x?w:g.plotTop+g.plotHeight],l=["x",h,a,(x?n.left-b:0)+d.plotX+g.plotLeft,x?0:g.plotLeft,x?h:g.plotLeft+g.plotWidth],D=!this.followPointer&&q(d.ttBelow,!g.inverted===!!d.negative),A=function(a,c,f,l,d,e){var g=f<l-b,A=l+b+f<c,m=l-b-f;l+=b;if(D&&A)k[a]=l;else if(!D&&g)k[a]=m;else if(g)k[a]=Math.min(e-f,0>m-p?m:m-p);else if(A)k[a]=Math.max(d,l+p+f>c?l:l+p);else return !1},z=function(a,c,f,l){var d;l<b||l>c-b?d=!1:k[a]=l<f/2?1:l>c-f/2?c-f-2:l-f/2;return d},
I=function(a){var b=C;C=l;l=b;c=a;},f=function(){!1!==A.apply(0,C)?!1!==z.apply(0,l)||c||(I(!0),f()):c?k.x=k.y=0:(I(!0),f());};(g.inverted||1<this.len)&&I();f();return k},defaultFormatter:function(a){var e=this.points||t(this),d;d=[a.tooltipFooterHeaderFormatter(e[0])];d=d.concat(a.bodyFormatter(e));d.push(a.tooltipFooterHeaderFormatter(e[0],!0));return d},refresh:function(e,g){var d=this.chart,m=this.options,b,k=e,p,c={},x,h=[];x=m.formatter||this.defaultFormatter;var c=this.shared,w=d.styledMode,
n=[];m.enabled&&(a.clearTimeout(this.hideTimer),this.followPointer=t(k)[0].series.tooltipOptions.followPointer,p=this.getAnchor(k,g),g=p[0],b=p[1],!c||k.series&&k.series.noSharedTooltip?c=k.getLabelConfig():(n=d.pointer.getActiveSeries(k),d.series.forEach(function(a){(a.options.inactiveOtherPoints||-1===n.indexOf(a))&&a.setState("inactive",!0);}),k.forEach(function(a){a.setState("hover");h.push(a.getLabelConfig());}),c={x:k[0].category,y:k[0].y},c.points=h,k=k[0]),this.len=h.length,x=x.call(c,this),
c=k.series,this.distance=q(c.tooltipOptions.distance,16),!1===x?this.hide():(d=this.getLabel(),this.isHidden&&d.attr({opacity:1}).show(),this.split?this.renderSplit(x,t(e)):(m.style.width&&!w||d.css({width:this.chart.spacingBox.width}),d.attr({text:x&&x.join?x.join(""):x}),d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+q(k.colorIndex,c.colorIndex)),w||d.attr({stroke:m.borderColor||k.color||c.color||"#666666"}),this.updatePosition({plotX:g,plotY:b,negative:k.negative,ttBelow:k.ttBelow,
h:p[2]||0})),this.isHidden=!1),a.fireEvent(this,"refresh"));},renderSplit:function(e,g){var d=this,m=[],b=this.chart,k=b.renderer,p=!0,c=this.options,x=0,h,w=this.getLabel(),n=b.plotTop;a.isString(e)&&(e=[!1,e]);e.slice(0,g.length+1).forEach(function(a,l){if(!1!==a&&""!==a){l=g[l-1]||{isHeader:!0,plotX:g[0].plotX,plotY:b.plotHeight};var e=l.series||d,A=e.tt,z=l.series||{},C="highcharts-color-"+q(l.colorIndex,z.colorIndex,"none");A||(A={padding:c.padding,r:c.borderRadius},b.styledMode||(A.fill=c.backgroundColor,
A["stroke-width"]=c.borderWidth),e.tt=A=k.label(null,null,null,(l.isHeader?c.headerShape:c.shape)||"callout",null,null,c.useHTML).addClass("highcharts-tooltip-box "+C).attr(A).add(w));A.isActive=!0;A.attr({text:a});b.styledMode||A.css(c.style).shadow(c.shadow).attr({stroke:c.borderColor||l.color||z.color||"#333333"});a=A.getBBox();z=a.width+A.strokeWidth();l.isHeader?(x=a.height,b.xAxis[0].opposite&&(h=!0,n-=x),z=Math.max(0,Math.min(l.plotX+b.plotLeft-z/2,b.chartWidth+(b.scrollablePixelsX?b.scrollablePixelsX-
b.marginRight:0)-z))):z=l.plotX+b.plotLeft-q(c.distance,16)-z;0>z&&(p=!1);a=(l.series&&l.series.yAxis&&l.series.yAxis.pos)+(l.plotY||0);a-=n;l.isHeader&&(a=h?-x:b.plotHeight+x);m.push({target:a,rank:l.isHeader?1:0,size:e.tt.getBBox().height+1,point:l,x:z,tt:A});}});this.cleanSplit();c.positioner&&m.forEach(function(a){var b=c.positioner.call(d,a.tt.getBBox().width,a.size,a.point);a.x=b.x;a.align=0;a.target=b.y;a.rank=q(b.rank,a.rank);});a.distribute(m,b.plotHeight+x);m.forEach(function(a){var l=a.point,
k=l.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:p||l.isHeader||c.positioner?a.x:l.plotX+b.plotLeft+d.distance,y:a.pos+n,anchorX:l.isHeader?l.plotX+b.plotLeft:l.plotX+k.xAxis.pos,anchorY:l.isHeader?b.plotTop+b.plotHeight/2:l.plotY+k.yAxis.pos});});},updatePosition:function(a){var e=this.chart,d=this.getLabel(),m=(this.options.positioner||this.getPosition).call(this,d.width,d.height,a),b=a.plotX+e.plotLeft;a=a.plotY+e.plotTop;var k;this.outside&&(k=(this.options.borderWidth||0)+2*
this.distance,this.renderer.setSize(d.width+k,d.height+k,!1),b+=e.pointer.chartPosition.left-m.x,a+=e.pointer.chartPosition.top-m.y);this.move(Math.round(m.x),Math.round(m.y||0),b,a);},getDateFormat:function(a,e,d,m){var b=this.chart.time,k=b.dateFormat("%m-%d %H:%M:%S.%L",e),p,c,g={millisecond:15,second:12,minute:9,hour:6,day:3},h="millisecond";for(c in v){if(a===v.week&&+b.dateFormat("%w",e)===d&&"00:00:00.000"===k.substr(6)){c="week";break}if(v[c]>a){c=h;break}if(g[c]&&k.substr(g[c])!=="01-01 00:00:00.000".substr(g[c]))break;
"week"!==c&&(h=c);}c&&(p=b.resolveDTLFormat(m[c]).main);return p},getXDateFormat:function(a,e,d){e=e.dateTimeLabelFormats;var g=d&&d.closestPointRange;return (g?this.getDateFormat(g,a.x,d.options.startOfWeek,e):e.day)||e.year},tooltipFooterHeaderFormatter:function(e,g){var d=g?"footer":"header",m=e.series,b=m.tooltipOptions,k=b.xDateFormat,p=m.xAxis,c=p&&"datetime"===p.options.type&&h(e.key),x=b[d+"Format"];g={isFooter:g,labelConfig:e};a.fireEvent(this,"headerFormatter",g,function(a){c&&!k&&(k=this.getXDateFormat(e,
b,p));c&&k&&(e.point&&e.point.tooltipDateKeys||["key"]).forEach(function(a){x=x.replace("{point."+a+"}","{point."+a+":"+k+"}");});m.chart.styledMode&&(x=this.styledModeFormat(x));a.text=B(x,{point:e,series:m},this.chart.time);});return g.text},bodyFormatter:function(a){return a.map(function(a){var d=a.series.tooltipOptions;return (d[(a.point.formatPrefix||"point")+"Formatter"]||a.point.tooltipFormatter).call(a.point,d[(a.point.formatPrefix||"point")+"Format"]||"")})},styledModeFormat:function(a){return a.replace('style\x3d"font-size: 10px"',
'class\x3d"highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,'class\x3d"highcharts-color-{$1.colorIndex}"')}};});J(G,"parts/Pointer.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,H=a.attr,B=a.charts,h=a.color,e=a.css,q=a.defined,t=a.extend,u=a.find,v=a.fireEvent,n=a.isNumber,g=a.isObject,d=a.offset,m=a.pick,b=a.splat,k=a.Tooltip;a.Pointer=function(a,c){this.init(a,c);};a.Pointer.prototype={init:function(a,c){this.options=c;this.chart=a;this.runChartClick=c.chart.events&&
!!c.chart.events.click;this.pinchDown=[];this.lastValidTouch={};k&&(a.tooltip=new k(a,c.tooltip),this.followTouchMove=m(c.tooltip.followTouchMove,!0));this.setDOMEvents();},zoomOption:function(a){var c=this.chart,b=c.options.chart,d=b.zoomType||"",c=c.inverted;/touch/.test(a.type)&&(d=m(b.pinchType,d));this.zoomX=a=/x/.test(d);this.zoomY=d=/y/.test(d);this.zoomHor=a&&!c||d&&c;this.zoomVert=d&&!c||a&&c;this.hasZoom=a||d;},normalize:function(a,c){var b;b=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:
a;c||(this.chartPosition=c=d(this.chart.container));return t(a,{chartX:Math.round(b.pageX-c.left),chartY:Math.round(b.pageY-c.top)})},getCoordinates:function(a){var c={xAxis:[],yAxis:[]};this.chart.axes.forEach(function(b){c[b.isXAxis?"xAxis":"yAxis"].push({axis:b,value:b.toValue(a[b.horiz?"chartX":"chartY"])});});return c},findNearestKDPoint:function(a,c,b){var d;a.forEach(function(a){var k=!(a.noSharedTooltip&&c)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(b,k);if((k=g(a,!0))&&!(k=
!g(d,!0)))var k=d.distX-a.distX,e=d.dist-a.dist,l=(a.series.group&&a.series.group.zIndex)-(d.series.group&&d.series.group.zIndex),k=0<(0!==k&&c?k:0!==e?e:0!==l?l:d.series.index>a.series.index?-1:1);k&&(d=a);});return d},getPointFromEvent:function(a){a=a.target;for(var c;a&&!c;)c=a.point,a=a.parentNode;return c},getChartCoordinatesFromPoint:function(a,c){var b=a.series,d=b.xAxis,b=b.yAxis,k=m(a.clientX,a.plotX),e=a.shapeArgs;if(d&&b)return c?{chartX:d.len+d.pos-k,chartY:b.len+b.pos-a.plotY}:{chartX:k+
d.pos,chartY:a.plotY+b.pos};if(e&&e.x&&e.y)return {chartX:e.x,chartY:e.y}},getHoverData:function(a,c,b,d,k,e){var p,l=[];d=!(!d||!a);var x=c&&!c.stickyTracking?[c]:b.filter(function(a){return a.visible&&!(!k&&a.directTouch)&&m(a.options.enableMouseTracking,!0)&&a.stickyTracking});c=(p=d?a:this.findNearestKDPoint(x,k,e))&&p.series;p&&(k&&!c.noSharedTooltip?(x=b.filter(function(a){return a.visible&&!(!k&&a.directTouch)&&m(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),x.forEach(function(a){var c=
u(a.points,function(a){return a.x===p.x&&!a.isNull});g(c)&&(a.chart.isBoosting&&(c=a.getPoint(c)),l.push(c));})):l.push(p));return {hoverPoint:p,hoverSeries:c,hoverPoints:l}},runPointActions:function(b,c){var d=this.chart,k=d.tooltip&&d.tooltip.options.enabled?d.tooltip:void 0,e=k?k.shared:!1,p=c||d.hoverPoint,g=p&&p.series||d.hoverSeries,g=this.getHoverData(p,g,d.series,"touchmove"!==b.type&&(!!c||g&&g.directTouch&&this.isDirectTouch),e,b),l=[],D,p=g.hoverPoint;D=g.hoverPoints;c=(g=g.hoverSeries)&&
g.tooltipOptions.followPointer;e=e&&g&&!g.noSharedTooltip;if(p&&(p!==d.hoverPoint||k&&k.isHidden)){(d.hoverPoints||[]).forEach(function(a){-1===D.indexOf(a)&&a.setState();});if(d.hoverSeries!==g)g.onMouseOver();l=this.getActiveSeries(D);d.series.forEach(function(a){(a.options.inactiveOtherPoints||-1===l.indexOf(a))&&a.setState("inactive",!0);});(D||[]).forEach(function(a){a.setState("hover");});d.hoverPoint&&d.hoverPoint.firePointEvent("mouseOut");if(!p.series)return;p.firePointEvent("mouseOver");d.hoverPoints=
D;d.hoverPoint=p;k&&k.refresh(e?D:p,b);}else c&&k&&!k.isHidden&&(p=k.getAnchor([{}],b),k.updatePosition({plotX:p[0],plotY:p[1]}));this.unDocMouseMove||(this.unDocMouseMove=E(d.container.ownerDocument,"mousemove",function(c){var b=B[a.hoverChartIndex];if(b)b.pointer.onDocumentMouseMove(c);}));d.axes.forEach(function(c){var d=m(c.crosshair.snap,!0),l=d?a.find(D,function(a){return a.series[c.coll]===c}):void 0;l||!d?c.drawCrosshair(b,l):c.hideCrosshair();});},getActiveSeries:function(a){var c=[],b;(a||[]).forEach(function(a){b=
a.series;c.push(b);b.linkedParent&&c.push(b.linkedParent);b.linkedSeries&&(c=c.concat(b.linkedSeries));b.navigatorSeries&&c.push(b.navigatorSeries);});return c},reset:function(a,c){var d=this.chart,k=d.hoverSeries,e=d.hoverPoint,p=d.hoverPoints,g=d.tooltip,l=g&&g.shared?p:e;a&&l&&b(l).forEach(function(c){c.series.isCartesian&&void 0===c.plotX&&(a=!1);});if(a)g&&l&&b(l).length&&(g.refresh(l),g.shared&&p?p.forEach(function(a){a.setState(a.state,!0);a.series.isCartesian&&(a.series.xAxis.crosshair&&a.series.xAxis.drawCrosshair(null,
a),a.series.yAxis.crosshair&&a.series.yAxis.drawCrosshair(null,a));}):e&&(e.setState(e.state,!0),d.axes.forEach(function(a){a.crosshair&&a.drawCrosshair(null,e);})));else{if(e)e.onMouseOut();p&&p.forEach(function(a){a.setState();});if(k)k.onMouseOut();g&&g.hide(c);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());d.axes.forEach(function(a){a.hideCrosshair();});this.hoverX=d.hoverPoints=d.hoverPoint=null;}},scaleGroups:function(a,c){var b=this.chart,d;b.series.forEach(function(k){d=a||k.getPlotBox();
k.xAxis&&k.xAxis.zoomEnabled&&k.group&&(k.group.attr(d),k.markerGroup&&(k.markerGroup.attr(d),k.markerGroup.clip(c?b.clipRect:null)),k.dataLabelsGroup&&k.dataLabelsGroup.attr(d));});b.clipRect.attr(c||b.clipBox);},dragStart:function(a){var c=this.chart;c.mouseIsDown=a.type;c.cancelClick=!1;c.mouseDownX=this.mouseDownX=a.chartX;c.mouseDownY=this.mouseDownY=a.chartY;},drag:function(a){var c=this.chart,b=c.options.chart,d=a.chartX,k=a.chartY,e=this.zoomHor,p=this.zoomVert,l=c.plotLeft,g=c.plotTop,m=c.plotWidth,
z=c.plotHeight,n,f=this.selectionMarker,r=this.mouseDownX,q=this.mouseDownY,t=b.panKey&&a[b.panKey+"Key"];f&&f.touch||(d<l?d=l:d>l+m&&(d=l+m),k<g?k=g:k>g+z&&(k=g+z),this.hasDragged=Math.sqrt(Math.pow(r-d,2)+Math.pow(q-k,2)),10<this.hasDragged&&(n=c.isInsidePlot(r-l,q-g),c.hasCartesianSeries&&(this.zoomX||this.zoomY)&&n&&!t&&!f&&(this.selectionMarker=f=c.renderer.rect(l,g,e?1:m,p?1:z,0).attr({"class":"highcharts-selection-marker",zIndex:7}).add(),c.styledMode||f.attr({fill:b.selectionMarkerFill||h("#335cad").setOpacity(.25).get()})),
f&&e&&(d-=r,f.attr({width:Math.abs(d),x:(0<d?0:d)+r})),f&&p&&(d=k-q,f.attr({height:Math.abs(d),y:(0<d?0:d)+q})),n&&!f&&b.panning&&c.pan(a,b.panning)));},drop:function(a){var c=this,b=this.chart,d=this.hasPinched;if(this.selectionMarker){var k={originalEvent:a,xAxis:[],yAxis:[]},p=this.selectionMarker,g=p.attr?p.attr("x"):p.x,l=p.attr?p.attr("y"):p.y,m=p.attr?p.attr("width"):p.width,A=p.attr?p.attr("height"):p.height,z;if(this.hasDragged||d)b.axes.forEach(function(b){if(b.zoomEnabled&&q(b.min)&&(d||
c[{xAxis:"zoomX",yAxis:"zoomY"}[b.coll]])){var f=b.horiz,e="touchend"===a.type?b.minPixelPadding:0,p=b.toValue((f?g:l)+e),f=b.toValue((f?g+m:l+A)-e);k[b.coll].push({axis:b,min:Math.min(p,f),max:Math.max(p,f)});z=!0;}}),z&&v(b,"selection",k,function(a){b.zoom(t(a,d?{animation:!1}:null));});n(b.index)&&(this.selectionMarker=this.selectionMarker.destroy());d&&this.scaleGroups();}b&&n(b.index)&&(e(b.container,{cursor:b._cursor}),b.cancelClick=10<this.hasDragged,b.mouseIsDown=this.hasDragged=this.hasPinched=
!1,this.pinchDown=[]);},onContainerMouseDown:function(a){a=this.normalize(a);2!==a.button&&(this.zoomOption(a),a.preventDefault&&a.preventDefault(),this.dragStart(a));},onDocumentMouseUp:function(b){B[a.hoverChartIndex]&&B[a.hoverChartIndex].pointer.drop(b);},onDocumentMouseMove:function(a){var c=this.chart,b=this.chartPosition;a=this.normalize(a,b);!b||this.inClass(a.target,"highcharts-tracker")||c.isInsidePlot(a.chartX-c.plotLeft,a.chartY-c.plotTop)||this.reset();},onContainerMouseLeave:function(b){var c=
B[a.hoverChartIndex];c&&(b.relatedTarget||b.toElement)&&(c.pointer.reset(),c.pointer.chartPosition=null);},onContainerMouseMove:function(b){var c=this.chart;q(a.hoverChartIndex)&&B[a.hoverChartIndex]&&B[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=c.index);b=this.normalize(b);b.preventDefault||(b.returnValue=!1);"mousedown"===c.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!c.isInsidePlot(b.chartX-c.plotLeft,b.chartY-c.plotTop)||c.openMenu||this.runPointActions(b);},
inClass:function(a,c){for(var b;a;){if(b=H(a,"class")){if(-1!==b.indexOf(c))return !0;if(-1!==b.indexOf("highcharts-container"))return !1}a=a.parentNode;}},onTrackerMouseOut:function(a){var c=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!c||!a||c.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+c.index)&&this.inClass(a,"highcharts-tracker")))c.onMouseOut();},onContainerClick:function(a){var c=this.chart,b=c.hoverPoint,d=c.plotLeft,
k=c.plotTop;a=this.normalize(a);c.cancelClick||(b&&this.inClass(a.target,"highcharts-tracker")?(v(b.series,"click",t(a,{point:b})),c.hoverPoint&&b.firePointEvent("click",a)):(t(a,this.getCoordinates(a)),c.isInsidePlot(a.chartX-d,a.chartY-k)&&v(c,"click",a)));},setDOMEvents:function(){var b=this,c=b.chart.container,d=c.ownerDocument;c.onmousedown=function(a){b.onContainerMouseDown(a);};c.onmousemove=function(a){b.onContainerMouseMove(a);};c.onclick=function(a){b.onContainerClick(a);};this.unbindContainerMouseLeave=
E(c,"mouseleave",b.onContainerMouseLeave);a.unbindDocumentMouseUp||(a.unbindDocumentMouseUp=E(d,"mouseup",b.onDocumentMouseUp));a.hasTouch&&(c.ontouchstart=function(a){b.onContainerTouchStart(a);},c.ontouchmove=function(a){b.onContainerTouchMove(a);},a.unbindDocumentTouchEnd||(a.unbindDocumentTouchEnd=E(d,"touchend",b.onDocumentTouchEnd)));},destroy:function(){var b=this;b.unDocMouseMove&&b.unDocMouseMove();this.unbindContainerMouseLeave();a.chartCount||(a.unbindDocumentMouseUp&&(a.unbindDocumentMouseUp=
a.unbindDocumentMouseUp()),a.unbindDocumentTouchEnd&&(a.unbindDocumentTouchEnd=a.unbindDocumentTouchEnd()));clearInterval(b.tooltipTimeout);a.objectEach(b,function(a,d){b[d]=null;});}};});J(G,"parts/TouchPointer.js",[G["parts/Globals.js"]],function(a){var E=a.charts,H=a.extend,B=a.noop,h=a.pick;H(a.Pointer.prototype,{pinchTranslate:function(a,h,t,u,v,n){this.zoomHor&&this.pinchTranslateDirection(!0,a,h,t,u,v,n);this.zoomVert&&this.pinchTranslateDirection(!1,a,h,t,u,v,n);},pinchTranslateDirection:function(a,
h,t,u,v,n,g,d){var e=this.chart,b=a?"x":"y",k=a?"X":"Y",p="chart"+k,c=a?"width":"height",x=e["plot"+(a?"Left":"Top")],q,w,F=d||1,C=e.inverted,l=e.bounds[a?"h":"v"],D=1===h.length,A=h[0][p],z=t[0][p],I=!D&&h[1][p],f=!D&&t[1][p],r;t=function(){!D&&20<Math.abs(A-I)&&(F=d||Math.abs(z-f)/Math.abs(A-I));w=(x-z)/F+A;q=e["plot"+(a?"Width":"Height")]/F;};t();h=w;h<l.min?(h=l.min,r=!0):h+q>l.max&&(h=l.max-q,r=!0);r?(z-=.8*(z-g[b][0]),D||(f-=.8*(f-g[b][1])),t()):g[b]=[z,f];C||(n[b]=w-x,n[c]=q);n=C?1/F:F;v[c]=
q;v[b]=h;u[C?a?"scaleY":"scaleX":"scale"+k]=F;u["translate"+k]=n*x+(z-n*A);},pinch:function(a){var e=this,t=e.chart,u=e.pinchDown,v=a.touches,n=v.length,g=e.lastValidTouch,d=e.hasZoom,m=e.selectionMarker,b={},k=1===n&&(e.inClass(a.target,"highcharts-tracker")&&t.runTrackerClick||e.runChartClick),p={};1<n&&(e.initiated=!0);d&&e.initiated&&!k&&a.preventDefault();[].map.call(v,function(a){return e.normalize(a)});"touchstart"===a.type?([].forEach.call(v,function(a,b){u[b]={chartX:a.chartX,chartY:a.chartY};}),
g.x=[u[0].chartX,u[1]&&u[1].chartX],g.y=[u[0].chartY,u[1]&&u[1].chartY],t.axes.forEach(function(a){if(a.zoomEnabled){var b=t.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,d=a.toPixels(Math.min(h(a.options.min,a.dataMin),a.dataMin)),k=a.toPixels(Math.max(h(a.options.max,a.dataMax),a.dataMax)),e=Math.max(d,k);b.min=Math.min(a.pos,Math.min(d,k)-c);b.max=Math.max(a.pos+a.len,e+c);}}),e.res=!0):e.followTouchMove&&1===n?this.runPointActions(e.normalize(a)):u.length&&(m||(e.selectionMarker=m=H({destroy:B,touch:!0},
t.plotBox)),e.pinchTranslate(u,v,b,m,p,g),e.hasPinched=d,e.scaleGroups(b,p),e.res&&(e.res=!1,this.reset(!1,0)));},touch:function(e,q){var t=this.chart,u,v;if(t.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=t.index;1===e.touches.length?(e=this.normalize(e),(v=t.isInsidePlot(e.chartX-t.plotLeft,e.chartY-t.plotTop))&&!t.openMenu?(q&&this.runPointActions(e),"touchmove"===e.type&&(q=this.pinchDown,u=q[0]?4<=Math.sqrt(Math.pow(q[0].chartX-e.chartX,2)+Math.pow(q[0].chartY-
e.chartY,2)):!1),h(u,!0)&&this.pinch(e)):q&&this.reset()):2===e.touches.length&&this.pinch(e);},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0);},onContainerTouchMove:function(a){this.touch(a);},onDocumentTouchEnd:function(e){E[a.hoverChartIndex]&&E[a.hoverChartIndex].pointer.drop(e);}});});J(G,"parts/MSPointer.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,H=a.charts,B=a.css,h=a.doc,e=a.extend,q=a.noop,t=a.Pointer,u=a.removeEvent,v=a.win,n=a.wrap;if(!a.hasTouch&&(v.PointerEvent||
v.MSPointerEvent)){var g={},d=!!v.PointerEvent,m=function(){var b=[];b.item=function(a){return this[a]};a.objectEach(g,function(a){b.push({pageX:a.pageX,pageY:a.pageY,target:a.target});});return b},b=function(b,d,c,e){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!H[a.hoverChartIndex]||(e(b),e=H[a.hoverChartIndex].pointer,e[d]({type:c,target:b.currentTarget,preventDefault:q,touches:m()}));};e(t.prototype,{onContainerPointerDown:function(a){b(a,"onContainerTouchStart","touchstart",
function(a){g[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget};});},onContainerPointerMove:function(a){b(a,"onContainerTouchMove","touchmove",function(a){g[a.pointerId]={pageX:a.pageX,pageY:a.pageY};g[a.pointerId].target||(g[a.pointerId].target=a.currentTarget);});},onDocumentPointerUp:function(a){b(a,"onDocumentTouchEnd","touchend",function(a){delete g[a.pointerId];});},batchMSEvents:function(a){a(this.chart.container,d?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,
d?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(h,d?"pointerup":"MSPointerUp",this.onDocumentPointerUp);}});n(t.prototype,"init",function(a,b,c){a.call(this,b,c);this.hasZoom&&B(b.container,{"-ms-touch-action":"none","touch-action":"none"});});n(t.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(E);});n(t.prototype,"destroy",function(a){this.batchMSEvents(u);a.call(this);});}});J(G,"parts/Legend.js",[G["parts/Globals.js"]],function(a){var E=
a.addEvent,H=a.css,B=a.discardElement,h=a.defined,e=a.fireEvent,q=a.isFirefox,t=a.marginNames,u=a.merge,v=a.pick,n=a.setAnimation,g=a.stableSort,d=a.win,m=a.wrap;a.Legend=function(a,d){this.init(a,d);};a.Legend.prototype={init:function(a,d){this.chart=a;this.setOptions(d);d.enabled&&(this.render(),E(this.chart,"endResize",function(){this.legend.positionCheckboxes();}),this.proximate?this.unchartrender=E(this.chart,"render",function(){this.legend.proximatePositions();this.legend.positionItems();}):this.unchartrender&&
this.unchartrender());},setOptions:function(a){var b=v(a.padding,8);this.options=a;this.chart.styledMode||(this.itemStyle=a.itemStyle,this.itemHiddenStyle=u(this.itemStyle,a.itemHiddenStyle));this.itemMarginTop=a.itemMarginTop||0;this.padding=b;this.initialItemY=b-5;this.symbolWidth=v(a.symbolWidth,16);this.pages=[];this.proximate="proximate"===a.layout&&!this.chart.inverted;},update:function(a,d){var b=this.chart;this.setOptions(u(!0,this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;
v(d,!0)&&b.redraw();e(this,"afterUpdate");},colorizeItem:function(a,d){a.legendGroup[d?"removeClass":"addClass"]("highcharts-legend-item-hidden");if(!this.chart.styledMode){var b=this.options,c=a.legendItem,k=a.legendLine,g=a.legendSymbol,m=this.itemHiddenStyle.color,b=d?b.itemStyle.color:m,h=d?a.color||m:m,n=a.options&&a.options.marker,l={fill:h};c&&c.css({fill:b,color:b});k&&k.attr({stroke:h});g&&(n&&g.isMarker&&(l=a.pointAttribs(),d||(l.stroke=l.fill=m)),g.attr(l));}e(this,"afterColorizeItem",{item:a,
visible:d});},positionItems:function(){this.allItems.forEach(this.positionItem,this);this.chart.isResizing||this.positionCheckboxes();},positionItem:function(a){var b=this.options,d=b.symbolPadding,b=!b.rtl,c=a._legendItemPos,e=c[0],c=c[1],g=a.checkbox;if((a=a.legendGroup)&&a.element)a[h(a.translateY)?"animate":"attr"]({translateX:b?e:this.legendWidth-e-2*d-4,translateY:c});g&&(g.x=e,g.y=c);},destroyItem:function(a){var b=a.checkbox;["legendItem","legendLine","legendSymbol","legendGroup"].forEach(function(b){a[b]&&
(a[b]=a[b].destroy());});b&&B(a.checkbox);},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy());}this.getAllItems().forEach(function(b){["legendItem","legendGroup"].forEach(a,b);});"clipRect up down pager nav box title group".split(" ").forEach(a,this);this.display=null;},positionCheckboxes:function(){var a=this.group&&this.group.alignAttr,d,e=this.clipHeight||this.legendHeight,c=this.titleHeight;a&&(d=a.translateY,this.allItems.forEach(function(b){var k=b.checkbox,g;k&&(g=d+c+k.y+(this.scrollOffset||
0)+3,H(k,{left:a.translateX+b.checkboxOffset+k.x-20+"px",top:g+"px",display:this.proximate||g>d-6&&g<d+e-6?"":"none"}));},this));},renderTitle:function(){var a=this.options,d=this.padding,e=a.title,c=0;e.text&&(this.title||(this.title=this.chart.renderer.label(e.text,d-3,d-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}),this.chart.styledMode||this.title.css(e.style),this.title.add(this.group)),e.width||this.title.css({width:this.maxLegendWidth+"px"}),a=this.title.getBBox(),c=a.height,
this.offsetWidth=a.width,this.contentGroup.attr({translateY:c}));this.titleHeight=c;},setText:function(b){var d=this.options;b.legendItem.attr({text:d.labelFormat?a.format(d.labelFormat,b,this.chart.time):d.labelFormatter.call(b)});},renderItem:function(a){var b=this.chart,d=b.renderer,c=this.options,e=this.symbolWidth,g=c.symbolPadding,m=this.itemStyle,h=this.itemHiddenStyle,n="horizontal"===c.layout?v(c.itemDistance,20):0,l=!c.rtl,D=a.legendItem,A=!a.series,z=!A&&a.series.drawLegendSymbol?a.series:
a,I=z.options,I=this.createCheckboxForItem&&I&&I.showCheckbox,n=e+g+n+(I?20:0),f=c.useHTML,r=a.options.className;D||(a.legendGroup=d.g("legend-item").addClass("highcharts-"+z.type+"-series highcharts-color-"+a.colorIndex+(r?" "+r:"")+(A?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=D=d.text("",l?e+g:-g,this.baseline||0,f),b.styledMode||D.css(u(a.visible?m:h)),D.attr({align:l?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(this.fontMetrics=d.fontMetrics(b.styledMode?
12:m.fontSize,D),this.baseline=this.fontMetrics.f+3+this.itemMarginTop,D.attr("y",this.baseline)),this.symbolHeight=c.symbolHeight||this.fontMetrics.f,z.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,D,f));I&&!a.checkbox&&this.createCheckboxForItem(a);this.colorizeItem(a,a.visible);!b.styledMode&&m.width||D.css({width:(c.itemWidth||this.widthOption||b.spacingBox.width)-n});this.setText(a);b=D.getBBox();a.itemWidth=a.checkboxOffset=c.itemWidth||a.legendItemWidth||b.width+n;this.maxItemWidth=
Math.max(this.maxItemWidth,a.itemWidth);this.totalItemWidth+=a.itemWidth;this.itemHeight=a.itemHeight=Math.round(a.legendItemHeight||b.height||this.symbolHeight);},layoutItem:function(a){var b=this.options,d=this.padding,c="horizontal"===b.layout,e=a.itemHeight,g=b.itemMarginBottom||0,m=this.itemMarginTop,h=c?v(b.itemDistance,20):0,n=this.maxLegendWidth,b=b.alignColumns&&this.totalItemWidth>n?this.maxItemWidth:a.itemWidth;c&&this.itemX-d+b>n&&(this.itemX=d,this.lastLineHeight&&(this.itemY+=m+this.lastLineHeight+
g),this.lastLineHeight=0);this.lastItemY=m+this.itemY+g;this.lastLineHeight=Math.max(e,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];c?this.itemX+=b:(this.itemY+=m+e+g,this.lastLineHeight=e);this.offsetWidth=this.widthOption||Math.max((c?this.itemX-d-(a.checkbox?0:h):b)+d,this.offsetWidth);},getAllItems:function(){var a=[];this.chart.series.forEach(function(b){var d=b&&b.options;b&&v(d.showInLegend,h(d.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===d.legendType?b.data:
b)));});e(this,"afterGetAllItems",{allItems:a});return a},getAlignment:function(){var a=this.options;return this.proximate?a.align.charAt(0)+"tv":a.floating?"":a.align.charAt(0)+a.verticalAlign.charAt(0)+a.layout.charAt(0)},adjustMargins:function(a,d){var b=this.chart,c=this.options,e=this.getAlignment(),k=void 0!==b.options.title.margin?b.titleOffset+b.options.title.margin:0;e&&[/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/].forEach(function(g,m){g.test(e)&&!h(a[m])&&(b[t[m]]=Math.max(b[t[m]],
b.legend[(m+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][m]*c[m%2?"x":"y"]+v(c.margin,12)+d[m]+(0===m&&(0===b.titleOffset?0:k))));});},proximatePositions:function(){var b=this.chart,d=[],e="left"===this.options.align;this.allItems.forEach(function(c){var k,g;g=e;var m;c.yAxis&&c.points&&(c.xAxis.options.reversed&&(g=!g),k=a.find(g?c.points:c.points.slice(0).reverse(),function(b){return a.isNumber(b.plotY)}),g=c.legendGroup.getBBox().height,m=c.yAxis.top-b.plotTop,c.visible?(k=k?k.plotY:c.yAxis.height,
k+=m-.3*g):k=m+c.yAxis.height,d.push({target:k,size:g,item:c}));},this);a.distribute(d,b.plotHeight);d.forEach(function(a){a.item._legendItemPos[1]=b.plotTop-b.spacing[0]+a.pos;});},render:function(){var b=this.chart,d=b.renderer,m=this.group,c,h,n,w=this.box,q=this.options,C=this.padding;this.itemX=C;this.itemY=this.initialItemY;this.lastItemY=this.offsetWidth=0;this.widthOption=a.relativeLength(q.width,b.spacingBox.width-C);c=b.spacingBox.width-2*C-q.x;-1<["rm","lm"].indexOf(this.getAlignment().substring(0,
2))&&(c/=2);this.maxLegendWidth=this.widthOption||c;m||(this.group=m=d.g("legend").attr({zIndex:7}).add(),this.contentGroup=d.g().attr({zIndex:1}).add(m),this.scrollGroup=d.g().add(this.contentGroup));this.renderTitle();c=this.getAllItems();g(c,function(a,b){return (a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});q.reversed&&c.reverse();this.allItems=c;this.display=h=!!c.length;this.itemHeight=this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;c.forEach(this.renderItem,
this);c.forEach(this.layoutItem,this);c=(this.widthOption||this.offsetWidth)+C;n=this.lastItemY+this.lastLineHeight+this.titleHeight;n=this.handleOverflow(n);n+=C;w||(this.box=w=d.rect().addClass("highcharts-legend-box").attr({r:q.borderRadius}).add(m),w.isNew=!0);b.styledMode||w.attr({stroke:q.borderColor,"stroke-width":q.borderWidth||0,fill:q.backgroundColor||"none"}).shadow(q.shadow);0<c&&0<n&&(w[w.isNew?"attr":"animate"](w.crisp.call({},{x:0,y:0,width:c,height:n},w.strokeWidth())),w.isNew=!1);
w[h?"show":"hide"]();b.styledMode&&"none"===m.getStyle("display")&&(c=n=0);this.legendWidth=c;this.legendHeight=n;h&&(d=b.spacingBox,/(lth|ct|rth)/.test(this.getAlignment())&&(w=d.y+b.titleOffset,d=u(d,{y:0<b.titleOffset?w+=b.options.title.margin:w})),m.align(u(q,{width:c,height:n,verticalAlign:this.proximate?"top":q.verticalAlign}),!0,d));this.proximate||this.positionItems();e(this,"afterRender");},handleOverflow:function(a){var b=this,d=this.chart,c=d.renderer,e=this.options,g=e.y,m=this.padding,
g=d.spacingBox.height+("top"===e.verticalAlign?-g:g)-m,h=e.maxHeight,n,l=this.clipRect,D=e.navigation,A=v(D.animation,!0),z=D.arrowSize||12,I=this.nav,f=this.pages,r,q=this.allItems,t=function(a){"number"===typeof a?l.attr({height:a}):l&&(b.clipRect=l.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+m+"px,9999px,"+(m+a)+"px,0)":"auto");},L=function(a){b[a]=c.circle(0,0,1.3*z).translate(z/2,z/2).add(I);d.styledMode||b[a].attr("fill","rgba(0,0,0,0.0001)");
return b[a]};"horizontal"!==e.layout||"middle"===e.verticalAlign||e.floating||(g/=2);h&&(g=Math.min(g,h));f.length=0;a>g&&!1!==D.enabled?(this.clipHeight=n=Math.max(g-20-this.titleHeight-m,0),this.currentPage=v(this.currentPage,1),this.fullHeight=a,q.forEach(function(a,b){var c=a._legendItemPos[1],d=Math.round(a.legendItem.getBBox().height),l=f.length;if(!l||c-f[l-1]>n&&(r||c)!==f[l-1])f.push(r||c),l++;a.pageIx=l-1;r&&(q[b-1].pageIx=l-1);b===q.length-1&&c+d-f[l-1]>n&&c!==r&&(f.push(c),a.pageIx=l);
c!==r&&(r=c);}),l||(l=b.clipRect=c.clipRect(0,m,9999,0),b.contentGroup.clip(l)),t(n),I||(this.nav=I=c.g().attr({zIndex:1}).add(this.group),this.up=c.symbol("triangle",0,0,z,z).add(I),L("upTracker").on("click",function(){b.scroll(-1,A);}),this.pager=c.text("",15,10).addClass("highcharts-legend-navigation"),d.styledMode||this.pager.css(D.style),this.pager.add(I),this.down=c.symbol("triangle-down",0,0,z,z).add(I),L("downTracker").on("click",function(){b.scroll(1,A);})),b.scroll(0),a=g):I&&(t(),this.nav=
I.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,d){var b=this.pages,c=b.length,e=this.currentPage+a;a=this.clipHeight;var k=this.options.navigation,g=this.pager,m=this.padding;e>c&&(e=c);0<e&&(void 0!==d&&n(d,this.chart),this.nav.attr({translateX:m,translateY:a+this.padding+7+this.titleHeight,visibility:"visible"}),[this.up,this.upTracker].forEach(function(a){a.attr({"class":1===e?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"});}),
g.attr({text:e+"/"+c}),[this.down,this.downTracker].forEach(function(a){a.attr({x:18+this.pager.getBBox().width,"class":e===c?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"});},this),this.chart.styledMode||(this.up.attr({fill:1===e?k.inactiveColor:k.activeColor}),this.upTracker.css({cursor:1===e?"default":"pointer"}),this.down.attr({fill:e===c?k.inactiveColor:k.activeColor}),this.downTracker.css({cursor:e===c?"default":"pointer"})),this.scrollOffset=-b[e-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),
this.currentPage=e,this.positionCheckboxes());}};a.LegendSymbolMixin={drawRectangle:function(a,d){var b=a.symbolHeight,c=a.options.squareSymbol;d.legendSymbol=this.chart.renderer.rect(c?(a.symbolWidth-b)/2:0,a.baseline-b+1,c?b:a.symbolWidth,b,v(a.options.symbolRadius,b/2)).addClass("highcharts-point").attr({zIndex:3}).add(d.legendGroup);},drawLineMarker:function(a){var b=this.options,d=b.marker,c=a.symbolWidth,e=a.symbolHeight,g=e/2,m=this.chart.renderer,h=this.legendGroup;a=a.baseline-Math.round(.3*
a.fontMetrics.b);var n={};this.chart.styledMode||(n={"stroke-width":b.lineWidth||0},b.dashStyle&&(n.dashstyle=b.dashStyle));this.legendLine=m.path(["M",0,a,"L",c,a]).addClass("highcharts-graph").attr(n).add(h);d&&!1!==d.enabled&&c&&(b=Math.min(v(d.radius,g),g),0===this.symbol.indexOf("url")&&(d=u(d,{width:e,height:e}),b=0),this.legendSymbol=d=m.symbol(this.symbol,c/2-b,a-b,2*b,2*b,d).addClass("highcharts-point").add(h),d.isMarker=!0);}};(/Trident\/7\.0/.test(d.navigator&&d.navigator.userAgent)||q)&&
m(a.Legend.prototype,"positionItem",function(a,d){var b=this,c=function(){d._legendItemPos&&a.call(b,d);};c();b.bubbleLegend||setTimeout(c);});});J(G,"parts/Chart.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,H=a.animate,B=a.animObject,h=a.attr,e=a.doc,q=a.Axis,t=a.createElement,u=a.defaultOptions,v=a.discardElement,n=a.charts,g=a.css,d=a.defined,m=a.extend,b=a.find,k=a.fireEvent,p=a.isNumber,c=a.isObject,x=a.isString,K=a.Legend,w=a.marginNames,F=a.merge,C=a.objectEach,l=a.Pointer,D=a.pick,
A=a.pInt,z=a.removeEvent,I=a.seriesTypes,f=a.splat,r=a.syncTimeout,Q=a.win,N=a.Chart=function(){this.getArgs.apply(this,arguments);};a.chart=function(a,b,c){return new N(a,b,c)};m(N.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(x(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1]);},init:function(b,f){var d,l=b.series,e=b.plotOptions||{};k(this,"init",{args:arguments},function(){b.series=null;d=F(u,b);C(d.plotOptions,function(a,b){c(a)&&(a.tooltip=e[b]&&
F(e[b].tooltip)||void 0);});d.tooltip.userOptions=b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;d.series=b.series=l;this.userOptions=b;var g=d.chart,m=g.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=f;this.isResizing=0;this.options=d;this.axes=[];this.series=[];this.time=b.time&&Object.keys(b.time).length?new a.Time(b.time):a.time;this.styledMode=g.styledMode;this.hasCartesianSeries=g.showAxes;var A=this;A.index=n.length;n.push(A);
a.chartCount++;m&&C(m,function(b,c){a.isFunction(b)&&E(A,c,b);});A.xAxis=[];A.yAxis=[];A.pointCount=A.colorCounter=A.symbolCounter=0;k(A,"afterInit");A.firstRender();});},initSeries:function(b){var c=this.options.chart;(c=I[b.type||c.type||c.defaultSeriesType])||a.error(17,!0,this);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].getName());},isInsidePlot:function(a,b,c){var f=c?b:a;a=c?a:b;return 0<=f&&f<=this.plotWidth&&
0<=a&&a<=this.plotHeight},redraw:function(b){k(this,"beforeRedraw");var c=this.axes,f=this.series,d=this.pointer,l=this.legend,e=this.userOptions.legend,g=this.isDirtyLegend,A,p,r=this.hasCartesianSeries,h=this.isDirtyBox,D,z=this.renderer,n=z.isHidden(),x=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(b,this);n&&this.temporaryDisplay();this.layOutTitles();for(b=f.length;b--;)if(D=f[b],D.options.stacking&&(A=!0,D.isDirty)){p=!0;break}if(p)for(b=f.length;b--;)D=f[b],D.options.stacking&&
(D.isDirty=!0);f.forEach(function(a){a.isDirty&&("point"===a.options.legendType?(a.updateTotals&&a.updateTotals(),g=!0):e&&(e.labelFormatter||e.labelFormat)&&(g=!0));a.isDirtyData&&k(a,"updatedData");});g&&l&&l.options.enabled&&(l.render(),this.isDirtyLegend=!1);A&&this.getStacks();r&&c.forEach(function(a){a.updateNames();a.setScale();});this.getMargins();r&&(c.forEach(function(a){a.isDirty&&(h=!0);}),c.forEach(function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,x.push(function(){k(a,"afterSetExtremes",
m(a.eventArgs,a.getExtremes()));delete a.eventArgs;}));(h||A)&&a.redraw();}));h&&this.drawChartBox();k(this,"predraw");f.forEach(function(a){(h||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1;});d&&d.reset(!0);z.draw();k(this,"redraw");k(this,"render");n&&this.temporaryDisplay(!0);x.forEach(function(a){a.call();});},get:function(a){function c(b){return b.id===a||b.options&&b.options.id===a}var f,d=this.series,l;f=b(this.axes,c)||b(this.series,c);for(l=0;!f&&l<d.length;l++)f=b(d[l].points||[],c);return f},
getAxes:function(){var a=this,b=this.options,c=b.xAxis=f(b.xAxis||{}),b=b.yAxis=f(b.yAxis||{});k(this,"getAxes");c.forEach(function(a,b){a.index=b;a.isX=!0;});b.forEach(function(a,b){a.index=b;});c.concat(b).forEach(function(b){new q(a,b);});k(this,"afterGetAxes");},getSelectedPoints:function(){var a=[];this.series.forEach(function(b){a=a.concat((b[b.hasGroupedData?"points":"data"]||[]).filter(function(a){return a.selected}));});return a},getSelectedSeries:function(){return this.series.filter(function(a){return a.selected})},
setTitle:function(a,b,c){var f=this,d=f.options,l=f.styledMode,e;e=d.title=F(!l&&{style:{color:"#333333",fontSize:d.isStock?"16px":"18px"}},d.title,a);d=d.subtitle=F(!l&&{style:{color:"#666666"}},d.subtitle,b);[["title",a,e],["subtitle",b,d]].forEach(function(a,b){var c=a[0],d=f[c],e=a[1];a=a[2];d&&e&&(f[c]=d=d.destroy());a&&!d&&(f[c]=f.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),f[c].update=function(a){f.setTitle(!b&&a,b&&a);},l||f[c].css(a.style));});
f.layOutTitles(c);},layOutTitles:function(a){var b=0,c,f=this.renderer,d=this.spacingBox;["title","subtitle"].forEach(function(a){var c=this[a],l=this.options[a];a="title"===a?-3:l.verticalAlign?0:b+2;var e;c&&(this.styledMode||(e=l.style.fontSize),e=f.fontMetrics(e,c).b,c.css({width:(l.width||d.width+l.widthAdjust)+"px"}).align(m({y:a+e},l),!1,"spacingBox"),l.floating||l.verticalAlign||(b=Math.ceil(b+c.getBBox(l.useHTML).height)));},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&
c&&(this.isDirtyBox=this.isDirtyLegend=c,this.hasRendered&&D(a,!0)&&this.isDirtyBox&&this.redraw());},getChartSize:function(){var b=this.options.chart,c=b.width,b=b.height,f=this.renderTo;d(c)||(this.containerWidth=a.getStyle(f,"width"));d(b)||(this.containerHeight=a.getStyle(f,"height"));this.chartWidth=Math.max(0,c||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(b,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400));},temporaryDisplay:function(b){var c=this.renderTo;
if(b)for(;c&&c.style;)c.hcOrigStyle&&(a.css(c,c.hcOrigStyle),delete c.hcOrigStyle),c.hcOrigDetached&&(e.body.removeChild(c),c.hcOrigDetached=!1),c=c.parentNode;else for(;c&&c.style;){e.body.contains(c)||c.parentNode||(c.hcOrigDetached=!0,e.body.appendChild(c));if("none"===a.getStyle(c,"display",!1)||c.hcOricDetached)c.hcOrigStyle={display:c.style.display,height:c.style.height,overflow:c.style.overflow},b={display:"block",overflow:"hidden"},c!==this.renderTo&&(b.height=0),a.css(c,b),c.offsetWidth||
c.style.setProperty("display","block","important");c=c.parentNode;if(c===e.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"");},getContainer:function(){var b,c=this.options,f=c.chart,d,l;b=this.renderTo;var r=a.uniqueKey(),D,z;b||(this.renderTo=b=f.renderTo);x(b)&&(this.renderTo=b=e.getElementById(b));b||a.error(13,!0,this);d=A(h(b,"data-highcharts-chart"));p(d)&&n[d]&&n[d].hasRendered&&n[d].destroy();h(b,"data-highcharts-chart",this.index);b.innerHTML="";
f.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();d=this.chartWidth;l=this.chartHeight;g(b,{overflow:"hidden"});this.styledMode||(D=m({position:"relative",overflow:"hidden",width:d+"px",height:l+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},f.style));this.container=b=t("div",{id:r},D,b);this._cursor=b.style.cursor;this.renderer=new (a[f.renderer]||a.Renderer)(b,d,l,null,f.forExport,c.exporting&&c.exporting.allowHTML,this.styledMode);
this.setClassName(f.className);if(this.styledMode)for(z in c.defs)this.renderer.definition(c.defs[z]);else this.renderer.setStyle(f.style);this.renderer.chartIndex=this.index;k(this,"afterGetContainer");},getMargins:function(a){var b=this.spacing,c=this.margin,f=this.titleOffset;this.resetMargins();f&&!d(c[0])&&(this.plotTop=Math.max(this.plotTop,f+this.options.title.margin+b[0]));this.legend&&this.legend.display&&this.legend.adjustMargins(c,b);k(this,"getMargins");a||this.getAxisMargins();},getAxisMargins:function(){var a=
this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&a.axes.forEach(function(a){a.visible&&a.getOffset();});w.forEach(function(f,l){d(c[l])||(a[f]+=b[l]);});a.setChartSize();},reflow:function(b){var c=this,f=c.options.chart,l=c.renderTo,g=d(f.width)&&d(f.height),k=f.width||a.getStyle(l,"width"),f=f.height||a.getStyle(l,"height"),l=b?b.target:Q;if(!g&&!c.isPrinting&&k&&f&&(l===Q||l===e)){if(k!==c.containerWidth||f!==c.containerHeight)a.clearTimeout(c.reflowTimeout),c.reflowTimeout=r(function(){c.container&&
c.setSize(void 0,void 0,!1);},b?100:0);c.containerWidth=k;c.containerHeight=f;}},setReflow:function(a){var b=this;!1===a||this.unbindReflow?!1===a&&this.unbindReflow&&(this.unbindReflow=this.unbindReflow()):(this.unbindReflow=E(Q,"resize",function(a){b.reflow(a);}),E(this,"destroy",this.unbindReflow));},setSize:function(b,c,f){var d=this,l=d.renderer,e;d.isResizing+=1;a.setAnimation(f,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;void 0!==b&&(d.options.chart.width=b);void 0!==c&&(d.options.chart.height=
c);d.getChartSize();d.styledMode||(e=l.globalAnimation,(e?H:g)(d.container,{width:d.chartWidth+"px",height:d.chartHeight+"px"},e));d.setChartSize(!0);l.setSize(d.chartWidth,d.chartHeight,f);d.axes.forEach(function(a){a.isDirty=!0;a.setScale();});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();d.getMargins();d.redraw(f);d.oldChartHeight=null;k(d,"resize");r(function(){d&&k(d,"endResize",null,function(){--d.isResizing;});},B(e).duration);},setChartSize:function(a){var b=this.inverted,c=this.renderer,
f=this.chartWidth,d=this.chartHeight,l=this.options.chart,e=this.spacing,g=this.clipOffset,m,A,p,r;this.plotLeft=m=Math.round(this.plotLeft);this.plotTop=A=Math.round(this.plotTop);this.plotWidth=p=Math.max(0,Math.round(f-m-this.marginRight));this.plotHeight=r=Math.max(0,Math.round(d-A-this.marginBottom));this.plotSizeX=b?r:p;this.plotSizeY=b?p:r;this.plotBorderWidth=l.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:e[3],y:e[0],width:f-e[3]-e[1],height:d-e[0]-e[2]};this.plotBox=c.plotBox={x:m,
y:A,width:p,height:r};f=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(f,g[3])/2);c=Math.ceil(Math.max(f,g[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(f,g[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(f,g[2])/2-c))};a||this.axes.forEach(function(a){a.setAxisSize();a.setAxisTranslation();});k(this,"afterSetChartSize",{skipAxes:a});},resetMargins:function(){k(this,"resetMargins");var a=this,b=a.options.chart;["margin","spacing"].forEach(function(f){var d=
b[f],l=c(d)?d:[d,d,d,d];["Top","Right","Bottom","Left"].forEach(function(c,d){a[f][d]=D(b[f+c],l[d]);});});w.forEach(function(b,c){a[b]=D(a.margin[c],a.spacing[c]);});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0];},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,f=this.chartHeight,d=this.chartBackground,l=this.plotBackground,e=this.plotBorder,g,m=this.styledMode,A=this.plotBGImage,p=a.backgroundColor,r=a.plotBackgroundColor,h=a.plotBackgroundImage,D,z=this.plotLeft,
n=this.plotTop,x=this.plotWidth,w=this.plotHeight,C=this.plotBox,I=this.clipRect,q=this.clipBox,t="animate";d||(this.chartBackground=d=b.rect().addClass("highcharts-background").add(),t="attr");if(m)g=D=d.strokeWidth();else{g=a.borderWidth||0;D=g+(a.shadow?8:0);p={fill:p||"none"};if(g||d["stroke-width"])p.stroke=a.borderColor,p["stroke-width"]=g;d.attr(p).shadow(a.shadow);}d[t]({x:D/2,y:D/2,width:c-D-g%2,height:f-D-g%2,r:a.borderRadius});t="animate";l||(t="attr",this.plotBackground=l=b.rect().addClass("highcharts-plot-background").add());
l[t](C);m||(l.attr({fill:r||"none"}).shadow(a.plotShadow),h&&(A?A.animate(C):this.plotBGImage=b.image(h,z,n,x,w).add()));I?I.animate({width:q.width,height:q.height}):this.clipRect=b.clipRect(q);t="animate";e||(t="attr",this.plotBorder=e=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());m||e.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});e[t](e.crisp({x:z,y:n,width:x,height:w},-e.strokeWidth()));this.isDirtyBox=!1;k(this,"afterDrawChartBox");},propFromSeries:function(){var a=
this,b=a.options.chart,c,f=a.options.series,d,l;["inverted","angular","polar"].forEach(function(e){c=I[b.type||b.defaultSeriesType];l=b[e]||c&&c.prototype[e];for(d=f&&f.length;!l&&d--;)(c=I[f[d].type])&&c.prototype[e]&&(l=!0);a[e]=l;});},linkSeries:function(){var a=this,b=a.series;b.forEach(function(a){a.linkedSeries.length=0;});b.forEach(function(b){var c=b.options.linkedTo;x(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=
D(b.options.visible,c.options.visible,b.visible));});k(this,"afterLinkSeries");},renderSeries:function(){this.series.forEach(function(a){a.translate();a.render();});},renderLabels:function(){var a=this,b=a.options.labels;b.items&&b.items.forEach(function(c){var f=m(b.style,c.style),d=A(f.left)+a.plotLeft,l=A(f.top)+a.plotTop+12;delete f.left;delete f.top;a.renderer.text(c.html,d,l).attr({zIndex:2}).css(f).add();});},render:function(){var a=this.axes,b=this.renderer,c=this.options,f=0,d,l,e;this.setTitle();
this.legend=new K(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;a.some(function(a){if(a.horiz&&a.visible&&a.options.labels.enabled&&a.series.length)return f=21,!0});d=this.plotHeight=Math.max(this.plotHeight-f,0);a.forEach(function(a){a.setScale();});this.getAxisMargins();l=1.1<c/this.plotWidth;e=1.05<d/this.plotHeight;if(l||e)a.forEach(function(a){(a.horiz&&l||!a.horiz&&e)&&a.setTickInterval(!0);}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&
a.forEach(function(a){a.visible&&a.render();});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0;},addCredits:function(a){var b=this;a=F(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(Q.location.href=a.href);}).attr({align:a.position.align,
zIndex:8}),b.styledMode||this.credits.css(a.style),this.credits.add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a);});},destroy:function(){var b=this,c=b.axes,f=b.series,d=b.container,l,e=d&&d.parentNode;k(b,"destroy");b.renderer.forExport?a.erase(n,b):n[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");z(b);for(l=c.length;l--;)c[l]=c[l].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(l=f.length;l--;)f[l]=
f[l].destroy();"title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy());});d&&(d.innerHTML="",z(d),e&&v(d));C(b,function(a,c){delete b[c];});},firstRender:function(){var b=this,c=b.options;if(!b.isReadyToRender||b.isReadyToRender()){b.getContainer();b.resetMargins();b.setChartSize();b.propFromSeries();b.getAxes();(a.isArray(c.series)?
c.series:[]).forEach(function(a){b.initSeries(a);});b.linkSeries();k(b,"beforeRender");l&&(b.pointer=new l(b,c));b.render();if(!b.renderer.imgCount&&b.onload)b.onload();b.temporaryDisplay(!0);}},onload:function(){this.callbacks.concat([this.callback]).forEach(function(a){a&&void 0!==this.index&&a.apply(this,[this]);},this);k(this,"load");k(this,"render");d(this.index)&&this.setReflow(this.options.chart.reflow);this.onload=null;}});});J(G,"parts/ScrollablePlotArea.js",[G["parts/Globals.js"]],function(a){var E=
a.addEvent,H=a.Chart;E(H,"afterSetChartSize",function(B){var h=this.options.chart.scrollablePlotArea,e=h&&h.minWidth,h=h&&h.minHeight,q;if(!this.renderer.forExport){if(e){if(this.scrollablePixelsX=e=Math.max(0,e-this.chartWidth))this.plotWidth+=e,this.inverted?this.clipBox.height+=e:this.clipBox.width+=e,q={1:{name:"right",value:e}};}else h&&(this.scrollablePixelsY=e=Math.max(0,h-this.chartHeight))&&(this.plotHeight+=e,this.inverted?this.clipBox.width+=e:this.clipBox.height+=e,q={2:{name:"bottom",
value:e}});q&&!B.skipAxes&&this.axes.forEach(function(e){q[e.side]?e.getPlotLinePath=function(){var h=q[e.side].name,t=this[h],n;this[h]=t-q[e.side].value;n=a.Axis.prototype.getPlotLinePath.apply(this,arguments);this[h]=t;return n}:(e.setAxisSize(),e.setAxisTranslation());});}});E(H,"render",function(){this.scrollablePixelsX||this.scrollablePixelsY?(this.setUpScrolling&&this.setUpScrolling(),this.applyFixed()):this.fixedDiv&&this.applyFixed();});H.prototype.setUpScrolling=function(){var B={WebkitOverflowScrolling:"touch",
overflowX:"hidden",overflowY:"hidden"};this.scrollablePixelsX&&(B.overflowX="auto");this.scrollablePixelsY&&(B.overflowY="auto");this.scrollingContainer=a.createElement("div",{className:"highcharts-scrolling"},B,this.renderTo);this.innerContainer=a.createElement("div",{className:"highcharts-inner-container"},null,this.scrollingContainer);this.innerContainer.appendChild(this.container);this.setUpScrolling=null;};H.prototype.moveFixedElements=function(){var a=this.container,h=this.fixedRenderer,e=".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-reset-zoom .highcharts-subtitle .highcharts-title .highcharts-legend-checkbox".split(" "),
q;this.scrollablePixelsX&&!this.inverted?q=".highcharts-yaxis":this.scrollablePixelsX&&this.inverted?q=".highcharts-xaxis":this.scrollablePixelsY&&!this.inverted?q=".highcharts-xaxis":this.scrollablePixelsY&&this.inverted&&(q=".highcharts-yaxis");e.push(q,q+"-labels");e.forEach(function(e){[].forEach.call(a.querySelectorAll(e),function(a){(a.namespaceURI===h.SVG_NS?h.box:h.box.parentNode).appendChild(a);a.style.pointerEvents="auto";});});};H.prototype.applyFixed=function(){var B,h,e=!this.fixedDiv,q=
this.options.chart.scrollablePlotArea;e?(this.fixedDiv=a.createElement("div",{className:"highcharts-fixed"},{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:2},null,!0),this.renderTo.insertBefore(this.fixedDiv,this.renderTo.firstChild),this.renderTo.style.overflow="visible",this.fixedRenderer=B=new a.Renderer(this.fixedDiv,this.chartWidth,this.chartHeight),this.scrollableMask=B.path().attr({fill:a.color(this.options.chart.backgroundColor||"#fff").setOpacity(a.pick(q.opacity,.85)).get(),
zIndex:-1}).addClass("highcharts-scrollable-mask").add(),this.moveFixedElements(),E(this,"afterShowResetZoom",this.moveFixedElements)):this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);B=this.chartWidth+(this.scrollablePixelsX||0);h=this.chartHeight+(this.scrollablePixelsY||0);a.stop(this.container);this.container.style.width=B+"px";this.container.style.height=h+"px";this.renderer.boxWrapper.attr({width:B,height:h,viewBox:[0,0,B,h].join(" ")});this.chartBackground.attr({width:B,height:h});
this.scrollablePixelsY&&(this.scrollingContainer.style.height=this.chartHeight+"px");e&&(q.scrollPositionX&&(this.scrollingContainer.scrollLeft=this.scrollablePixelsX*q.scrollPositionX),q.scrollPositionY&&(this.scrollingContainer.scrollTop=this.scrollablePixelsY*q.scrollPositionY));h=this.axisOffset;e=this.plotTop-h[0]-1;q=this.plotLeft-h[3]-1;B=this.plotTop+this.plotHeight+h[2]+1;h=this.plotLeft+this.plotWidth+h[1]+1;var t=this.plotLeft+this.plotWidth-(this.scrollablePixelsX||0),u=this.plotTop+this.plotHeight-
(this.scrollablePixelsY||0),e=this.scrollablePixelsX?["M",0,e,"L",this.plotLeft-1,e,"L",this.plotLeft-1,B,"L",0,B,"Z","M",t,e,"L",this.chartWidth,e,"L",this.chartWidth,B,"L",t,B,"Z"]:this.scrollablePixelsY?["M",q,0,"L",q,this.plotTop-1,"L",h,this.plotTop-1,"L",h,0,"Z","M",q,u,"L",q,this.chartHeight,"L",h,this.chartHeight,"L",h,u,"Z"]:["M",0,0];"adjustHeight"!==this.redrawTrigger&&this.scrollableMask.attr({d:e});};});J(G,"parts/Point.js",[G["parts/Globals.js"]],function(a){var E,H=a.extend,B=a.erase,
h=a.fireEvent,e=a.format,q=a.isArray,t=a.isNumber,u=a.pick,v=a.uniqueKey,n=a.defined,g=a.removeEvent;a.Point=E=function(){};a.Point.prototype={init:function(a,e,b){this.series=a;this.applyOptions(e,b);this.id=n(this.id)?this.id:v();this.resolveColor();a.chart.pointCount++;h(this,"afterInit");return this},resolveColor:function(){var a=this.series,e;e=a.chart.options.chart.colorCount;var b=a.chart.styledMode;b||this.options.color||(this.color=a.color);a.options.colorByPoint?(b||(e=a.options.colors||
a.chart.options.colors,this.color=this.color||e[a.colorCounter],e=e.length),b=a.colorCounter,a.colorCounter++,a.colorCounter===e&&(a.colorCounter=0)):b=a.colorIndex;this.colorIndex=u(this.colorIndex,b);},applyOptions:function(a,e){var b=this.series,d=b.options.pointValKey||b.pointValKey;a=E.prototype.optionsToObject.call(this,a);H(this,a);this.options=this.options?H(this.options,a):a;a.group&&delete this.group;a.dataLabels&&delete this.dataLabels;d&&(this.y=this[d]);if(this.isNull=u(this.isValid&&
!this.isValid(),null===this.x||!t(this.y,!0)))this.formatPrefix="null";this.selected&&(this.state="select");"name"in this&&void 0===e&&b.xAxis&&b.xAxis.hasNames&&(this.x=b.xAxis.nameToX(this));void 0===this.x&&b&&(this.x=void 0===e?b.autoIncrement(this):e);return this},setNestedProperty:function(d,e,b){b.split(".").reduce(function(b,d,c,g){b[d]=g.length-1===c?e:a.isObject(b[d],!0)?b[d]:{};return b[d]},d);return d},optionsToObject:function(d){var e={},b=this.series,g=b.options.keys,p=g||b.pointArrayMap||
["y"],c=p.length,h=0,n=0;if(t(d)||null===d)e[p[0]]=d;else if(q(d))for(!g&&d.length>c&&(b=typeof d[0],"string"===b?e.name=d[0]:"number"===b&&(e.x=d[0]),h++);n<c;)g&&void 0===d[h]||(0<p[n].indexOf(".")?a.Point.prototype.setNestedProperty(e,d[h],p[n]):e[p[n]]=d[h]),h++,n++;else"object"===typeof d&&(e=d,d.dataLabels&&(b._hasPointLabels=!0),d.marker&&(b._hasPointMarkers=!0));return e},getClassName:function(){return "highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":
"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,e=a.zones,a=a.zoneAxis||"y",b=0,g;for(g=e[b];this[a]>=g.value;)g=e[++b];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=g&&g.color&&!this.options.color?g.color:this.nonZonedColor;return g},
destroy:function(){var a=this.series.chart,e=a.hoverPoints,b;a.pointCount--;e&&(this.setState(),B(e,this),e.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel||this.dataLabels)g(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(b in this)this[b]=null;},destroyElements:function(a){var d=this,b=[],e,g;a=a||{graphic:1,dataLabel:1};a.graphic&&b.push("graphic","shadowGroup");a.dataLabel&&b.push("dataLabel","dataLabelUpper","connector");
for(g=b.length;g--;)e=b[g],d[e]&&(d[e]=d[e].destroy());["dataLabel","connector"].forEach(function(b){var c=b+"s";a[b]&&d[c]&&(d[c].forEach(function(a){a.element&&a.destroy();}),delete d[c]);});},getLabelConfig:function(){return {x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var d=this.series,b=d.tooltipOptions,g=u(b.valueDecimals,
""),p=b.valuePrefix||"",c=b.valueSuffix||"";d.chart.styledMode&&(a=d.chart.tooltip.styledModeFormat(a));(d.pointArrayMap||["y"]).forEach(function(b){b="{point."+b;if(p||c)a=a.replace(RegExp(b+"}","g"),p+b+"}"+c);a=a.replace(RegExp(b+"}","g"),b+":,."+g+"f}");});return e(a,{point:this,series:this.series},d.chart.time)},firePointEvent:function(a,e,b){var d=this,g=this.series.options;(g.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();"click"===a&&g.allowPointSelect&&
(b=function(a){d.select&&d.select(null,a.ctrlKey||a.metaKey||a.shiftKey);});h(this,a,e,b);},visible:!0};});J(G,"parts/Series.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,H=a.animObject,B=a.arrayMax,h=a.arrayMin,e=a.correctFloat,q=a.defaultOptions,t=a.defaultPlotOptions,u=a.defined,v=a.erase,n=a.extend,g=a.fireEvent,d=a.isArray,m=a.isNumber,b=a.isString,k=a.merge,p=a.objectEach,c=a.pick,x=a.removeEvent,K=a.splat,w=a.SVGElement,F=a.syncTimeout,C=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,
allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",enabledThreshold:2,radius:4,states:{normal:{animation:!0},hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},padding:5,style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},
verticalAlign:"bottom",x:0,y:0},cropThreshold:300,opacity:1,pointRange:0,softThreshold:!0,states:{normal:{animation:!0},hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{animation:{duration:0}},inactive:{animation:{duration:50},opacity:.2}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",
cropShoulder:1,init:function(b,d){g(this,"init",{options:d});var e=this,l,k=b.series,f;e.chart=b;e.options=d=e.setOptions(d);e.linkedSeries=[];e.bindAxes();n(e,{name:d.name,state:"",visible:!1!==d.visible,selected:!0===d.selected});l=d.events;p(l,function(b,c){!a.isFunction(b)||e.hcEvents&&e.hcEvents[c]&&e.hcEvents[c].some(function(a){return a.fn===b})||E(e,c,b);});if(l&&l.click||d.point&&d.point.events&&d.point.events.click||d.allowPointSelect)b.runTrackerClick=!0;e.getColor();e.getSymbol();e.parallelArrays.forEach(function(a){e[a+
"Data"]||(e[a+"Data"]=[]);});e.points||e.setData(d.data,!1);e.isCartesian&&(b.hasCartesianSeries=!0);k.length&&(f=k[k.length-1]);e._i=c(f&&f._i,-1)+1;b.orderSeries(this.insert(k));g(this,"afterInit");},insert:function(a){var b=this.options.index,d;if(m(b)){for(d=a.length;d--;)if(b>=c(a[d].options.index,a[d]._i)){a.splice(d+1,0,this);break}-1===d&&a.unshift(this);d+=1;}else a.push(this);return c(d,a.length-1)},bindAxes:function(){var b=this,c=b.options,d=b.chart,e;g(this,"bindAxes",null,function(){(b.axisTypes||
[]).forEach(function(l){d[l].forEach(function(a){e=a.options;if(c[l]===e.index||void 0!==c[l]&&c[l]===e.id||void 0===c[l]&&0===e.index)b.insert(a.series),b[l]=a,a.isDirty=!0;});b[l]||b.optionalAxis===l||a.error(18,!0,d);});});},updateParallelArrays:function(a,b){var c=a.series,d=arguments,e=m(b)?function(f){var d="y"===f&&c.toYData?c.toYData(a):a[f];c[f+"Data"][b]=d;}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2));};c.parallelArrays.forEach(e);},hasData:function(){return this.visible&&
void 0!==this.dataMax&&void 0!==this.dataMin||this.visible&&this.yData&&0<this.yData.length},autoIncrement:function(){var a=this.options,b=this.xIncrement,d,e=a.pointIntervalUnit,g=this.chart.time,b=c(b,a.pointStart,0);this.pointInterval=d=c(this.pointInterval,a.pointInterval,1);e&&(a=new g.Date(b),"day"===e?g.set("Date",a,g.get("Date",a)+d):"month"===e?g.set("Month",a,g.get("Month",a)+d):"year"===e&&g.set("FullYear",a,g.get("FullYear",a)+d),d=a.getTime()-b);this.xIncrement=b+d;return b},setOptions:function(a){var b=
this.chart,d=b.options,e=d.plotOptions,l=b.userOptions||{};a=k(a);var b=b.styledMode,f={plotOptions:e,userOptions:a};g(this,"setOptions",f);var m=l.plotOptions||{},p=f.plotOptions[this.type];this.userOptions=f.userOptions;l=k(p,e.series,l.plotOptions&&l.plotOptions[this.type],a);this.tooltipOptions=k(q.tooltip,q.plotOptions.series&&q.plotOptions.series.tooltip,q.plotOptions[this.type].tooltip,d.tooltip.userOptions,e.series&&e.series.tooltip,e[this.type].tooltip,a.tooltip);this.stickyTracking=c(a.stickyTracking,
m[this.type]&&m[this.type].stickyTracking,m.series&&m.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:l.stickyTracking);null===p.marker&&delete l.marker;this.zoneAxis=l.zoneAxis;d=this.zones=(l.zones||[]).slice();!l.negativeColor&&!l.negativeFillColor||l.zones||(e={value:l[this.zoneAxis+"Threshold"]||l.threshold||0,className:"highcharts-negative"},b||(e.color=l.negativeColor,e.fillColor=l.negativeFillColor),d.push(e));d.length&&u(d[d.length-1].value)&&d.push(b?{}:{color:this.color,
fillColor:this.fillColor});g(this,"afterSetOptions",{options:l});return l},getName:function(){return c(this.options.name,"Series "+(this.index+1))},getCyclic:function(a,b,d){var e,l=this.chart,f=this.userOptions,g=a+"Index",k=a+"Counter",m=d?d.length:c(l.options.chart[a+"Count"],l[a+"Count"]);b||(e=c(f[g],f["_"+g]),u(e)||(l.series.length||(l[k]=0),f["_"+g]=e=l[k]%m,l[k]+=1),d&&(b=d[e]));void 0!==e&&(this[g]=e);this[a]=b;},getColor:function(){this.chart.styledMode?this.getCyclic("color"):this.options.colorByPoint?
this.options.color=null:this.getCyclic("color",this.options.color||t[this.type].color,this.chart.options.colors);},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols);},findPointIndex:function(a,b){var c=a.id;a=a.x;var d=this.points,e,f;c&&(f=(c=this.chart.get(c))&&c.index,void 0!==f&&(e=!0));void 0===f&&m(a)&&(f=this.xData.indexOf(a,b));-1!==f&&void 0!==f&&this.cropped&&(f=f>=this.cropStart?f-this.cropStart:f);!e&&d[f]&&d[f].touched&&(f=void 0);return f},
drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,updateData:function(b){var c=this.options,d=this.points,e=[],l,f,g,k=this.requireSorting,p=b.length===d.length,h=!0;this.xIncrement=null;b.forEach(function(b,f){var h,A=a.defined(b)&&this.pointClass.prototype.optionsToObject.call({series:this},b)||{};h=A.x;if(A.id||m(h))if(h=this.findPointIndex(A,g),-1===h||void 0===h?e.push(b):d[h]&&b!==c.data[h]?(d[h].update(b,!1,null,!1),d[h].touched=!0,k&&(g=h+1)):d[h]&&(d[h].touched=!0),!p||f!==h||this.hasDerivedData)l=
!0;},this);if(l)for(b=d.length;b--;)(f=d[b])&&!f.touched&&f.remove(!1);else p?b.forEach(function(a,b){d[b].update&&a!==d[b].y&&d[b].update(a,!1,null,!1);}):h=!1;d.forEach(function(a){a&&(a.touched=!1);});if(!h)return !1;e.forEach(function(a){this.addPoint(a,!1,null,null,!1);},this);return !0},setData:function(e,g,k,p){var l=this,f=l.points,h=f&&f.length||0,A,n=l.options,D=l.chart,z=null,x=l.xAxis,w=n.turboThreshold,C=this.xData,q=this.yData,t=(A=l.pointArrayMap)&&A.length,u=n.keys,F=0,v=1,K;e=e||[];A=e.length;
g=c(g,!0);!1!==p&&A&&h&&!l.cropped&&!l.hasGroupedData&&l.visible&&!l.isSeriesBoosting&&(K=this.updateData(e));if(!K){l.xIncrement=null;l.colorCounter=0;this.parallelArrays.forEach(function(a){l[a+"Data"].length=0;});if(w&&A>w){for(k=0;null===z&&k<A;)z=e[k],k++;if(m(z))for(k=0;k<A;k++)C[k]=this.autoIncrement(),q[k]=e[k];else if(d(z))if(t)for(k=0;k<A;k++)z=e[k],C[k]=z[0],q[k]=z.slice(1,t+1);else for(u&&(F=u.indexOf("x"),v=u.indexOf("y"),F=0<=F?F:0,v=0<=v?v:1),k=0;k<A;k++)z=e[k],C[k]=z[F],q[k]=z[v];else a.error(12,
!1,D);}else for(k=0;k<A;k++)void 0!==e[k]&&(z={series:l},l.pointClass.prototype.applyOptions.apply(z,[e[k]]),l.updateParallelArrays(z,k));q&&b(q[0])&&a.error(14,!0,D);l.data=[];l.options.data=l.userOptions.data=e;for(k=h;k--;)f[k]&&f[k].destroy&&f[k].destroy();x&&(x.minRange=x.userMinRange);l.isDirty=D.isDirtyBox=!0;l.isDirtyData=!!f;k=!1;}"point"===n.legendType&&(this.processData(),this.generatePoints());g&&D.redraw(k);},processData:function(b){var c=this.xData,d=this.yData,e=c.length,l;l=0;var f,g,
k=this.xAxis,m,p=this.options;m=p.cropThreshold;var h=this.getExtremesFromAll||p.getExtremesFromAll,n=this.isCartesian,p=k&&k.val2lin,x=k&&k.isLog,w=this.requireSorting,C,q;if(n&&!this.isDirty&&!k.isDirty&&!this.yAxis.isDirty&&!b)return !1;k&&(b=k.getExtremes(),C=b.min,q=b.max);n&&this.sorted&&!h&&(!m||e>m||this.forceCrop)&&(c[e-1]<C||c[0]>q?(c=[],d=[]):this.yData&&(c[0]<C||c[e-1]>q)&&(l=this.cropData(this.xData,this.yData,C,q),c=l.xData,d=l.yData,l=l.start,f=!0));for(m=c.length||1;--m;)e=x?p(c[m])-
p(c[m-1]):c[m]-c[m-1],0<e&&(void 0===g||e<g)?g=e:0>e&&w&&(a.error(15,!1,this.chart),w=!1);this.cropped=f;this.cropStart=l;this.processedXData=c;this.processedYData=d;this.closestPointRange=g;},cropData:function(a,b,d,e,g){var f=a.length,l=0,k=f,m;g=c(g,this.cropShoulder);for(m=0;m<f;m++)if(a[m]>=d){l=Math.max(0,m-g);break}for(d=m;d<f;d++)if(a[d]>e){k=d+g;break}return {xData:a.slice(l,k),yData:b.slice(l,k),start:l,end:k}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,d,e=this.processedXData,
f=this.processedYData,k=this.pointClass,m=e.length,p=this.cropStart||0,h,x=this.hasGroupedData,a=a.keys,w,C=[],q;c||x||(c=[],c.length=b.length,c=this.data=c);a&&x&&(this.options.keys=!1);for(q=0;q<m;q++)h=p+q,x?(w=(new k).init(this,[e[q]].concat(K(f[q]))),w.dataGroup=this.groupMap[q],w.dataGroup.options&&(w.options=w.dataGroup.options,n(w,w.dataGroup.options),delete w.dataLabels)):(w=c[h])||void 0===b[h]||(c[h]=w=(new k).init(this,b[h],e[q])),w&&(w.index=h,C[q]=w);this.options.keys=a;if(c&&(m!==(d=
c.length)||x))for(q=0;q<d;q++)q!==p||x||(q+=m),c[q]&&(c[q].destroyElements(),c[q].plotX=void 0);this.data=c;this.points=C;g(this,"afterGeneratePoints");},getXExtremes:function(a){return {min:h(a),max:B(a)}},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,e,l=[],f=0;e=this.xAxis.getExtremes();var k=e.min,p=e.max,n,w,x=this.requireSorting?this.cropShoulder:0,q,C;a=a||this.stackedYData||this.processedYData||[];e=a.length;for(C=0;C<e;C++)if(w=c[C],q=a[C],n=(m(q,!0)||d(q))&&(!b.positiveValuesOnly||
q.length||0<q),w=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[C+x]||w)>=k&&(c[C-x]||w)<=p,n&&w)if(n=q.length)for(;n--;)"number"===typeof q[n]&&(l[f++]=q[n]);else l[f++]=q;this.dataMin=h(l);this.dataMax=B(l);g(this,"afterGetExtremes");},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,k=this.xAxis,p=k.categories,h=this.yAxis,f=this.points,r=f.length,n=!!this.modifyValue,w,q=this.pointPlacementToXValue(),
C=m(q),x=a.threshold,t=a.startFromThreshold?x:0,F,v,K,B,E=this.zoneAxis||"y",H=Number.MAX_VALUE;for(w=0;w<r;w++){var G=f[w],J=G.x;v=G.y;var V=G.low,O=b&&h.stacks[(this.negStacks&&v<(t?0:x)?"-":"")+this.stackKey],W,X;h.positiveValuesOnly&&null!==v&&0>=v&&(G.isNull=!0);G.plotX=F=e(Math.min(Math.max(-1E5,k.translate(J,0,0,0,1,q,"flags"===this.type)),1E5));b&&this.visible&&!G.isNull&&O&&O[J]&&(B=this.getStackIndicator(B,J,this.index),W=O[J],X=W.points[B.key]);d(X)&&(V=X[0],v=X[1],V===t&&B.key===O[J].base&&
(V=c(m(x)&&x,h.min)),h.positiveValuesOnly&&0>=V&&(V=null),G.total=G.stackTotal=W.total,G.percentage=W.total&&G.y/W.total*100,G.stackY=v,W.setOffset(this.pointXOffset||0,this.barW||0));G.yBottom=u(V)?Math.min(Math.max(-1E5,h.translate(V,0,1,0,1)),1E5):null;n&&(v=this.modifyValue(v,G));G.plotY=v="number"===typeof v&&Infinity!==v?Math.min(Math.max(-1E5,h.translate(v,0,1,0,1)),1E5):void 0;G.isInside=void 0!==v&&0<=v&&v<=h.len&&0<=F&&F<=k.len;G.clientX=C?e(k.translate(J,0,0,0,1,q)):F;G.negative=G[E]<(a[E+
"Threshold"]||x||0);G.category=p&&void 0!==p[G.x]?p[G.x]:G.x;G.isNull||(void 0!==K&&(H=Math.min(H,Math.abs(F-K))),K=F);G.zone=this.zones.length&&G.getZone();}this.closestPointRangePx=H;g(this,"afterTranslate");},getValidPoints:function(a,b,c){var d=this.chart;return (a||this.points||[]).filter(function(a){return b&&!d.isInsidePlot(a.plotX,a.plotY,d.inverted)?!1:c||!a.isNull})},getClipBox:function(a,b){var c=this.options,d=this.chart,e=d.inverted,f=this.xAxis,l=f&&this.yAxis;a&&!1===c.clip&&l?a=e?{y:-d.chartWidth+
l.len+l.pos,height:d.chartWidth,width:d.chartHeight,x:-d.chartHeight+f.len+f.pos}:{y:-l.pos,height:d.chartHeight,width:d.chartWidth,x:-f.pos}:(a=this.clipBox||d.clipBox,b&&(a.width=d.plotSizeX,a.x=0));return b?{width:a.width,x:a.x}:a},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,e=b.inverted,f=this.clipBox,l=this.getClipBox(a),g=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,l.height,c.xAxis,c.yAxis].join(),k=b[g],m=b[g+"m"];k||(a&&(l.width=0,e&&(l.x=b.plotSizeX+
(!1!==c.clip?0:b.plotTop)),b[g+"m"]=m=d.clipRect(e?b.plotSizeX+99:-99,e?-b.plotLeft:-b.plotTop,99,e?b.chartWidth:b.chartHeight)),b[g]=k=d.clipRect(l),k.count={length:0});a&&!k.count[this.index]&&(k.count[this.index]=!0,k.count.length+=1);if(!1!==c.clip||a)this.group.clip(a||f?k:b.clipRect),this.markerGroup.clip(m),this.sharedClipKey=g;a||(k.count[this.index]&&(delete k.count[this.index],--k.count.length),0===k.count.length&&g&&b[g]&&(f||(b[g]=b[g].destroy()),b[g+"m"]&&(b[g+"m"]=b[g+"m"].destroy())));},
animate:function(a){var b=this.chart,c=H(this.options.animation),d,e;a?this.setClip(c):(d=this.sharedClipKey,a=b[d],e=this.getClipBox(c,!0),a&&a.animate(e,c),b[d+"m"]&&b[d+"m"].animate({width:e.width+99,x:e.x-(b.inverted?0:99)},c),this.animate=null);},afterAnimate:function(){this.setClip();g(this,"afterAnimate");this.finishedAnimating=!0;},drawPoints:function(){var a=this.points,b=this.chart,d,e,g,f,k,m=this.options.marker,p,h,n,w=this[this.specialGroup]||this.markerGroup;d=this.xAxis;var q,x=c(m.enabled,
!d||d.isRadial?!0:null,this.closestPointRangePx>=m.enabledThreshold*m.radius);if(!1!==m.enabled||this._hasPointMarkers)for(d=0;d<a.length;d++)if(e=a[d],k=(f=e.graphic)?"animate":"attr",p=e.marker||{},h=!!e.marker,g=x&&void 0===p.enabled||p.enabled,n=!1!==e.isInside,g&&!e.isNull){g=c(p.symbol,this.symbol);q=this.markerAttribs(e,e.selected&&"select");f?f[n?"show":"hide"](!0).animate(q):n&&(0<q.width||e.hasImage)&&(e.graphic=f=b.renderer.symbol(g,q.x,q.y,q.width,q.height,h?p:m).add(w));if(f&&!b.styledMode)f[k](this.pointAttribs(e,
e.selected&&"select"));f&&f.addClass(e.getClassName(),!0);}else f&&(e.graphic=f.destroy());},markerAttribs:function(a,b){var d=this.options.marker,e=a.marker||{},l=e.symbol||d.symbol,f=c(e.radius,d.radius);b&&(d=d.states[b],b=e.states&&e.states[b],f=c(b&&b.radius,d&&d.radius,f+(d&&d.radiusPlus||0)));a.hasImage=l&&0===l.indexOf("url");a.hasImage&&(f=0);a={x:Math.floor(a.plotX)-f,y:a.plotY-f};f&&(a.width=a.height=2*f);return a},pointAttribs:function(a,b){var d=this.options.marker,e=a&&a.options,l=e&&
e.marker||{},f=this.color,g=e&&e.color,k=a&&a.color,e=c(l.lineWidth,d.lineWidth),m=a&&a.zone&&a.zone.color;a=1;f=g||m||k||f;g=l.fillColor||d.fillColor||f;f=l.lineColor||d.lineColor||f;b=b||"normal";d=d.states[b];b=l.states&&l.states[b]||{};e=c(b.lineWidth,d.lineWidth,e+c(b.lineWidthPlus,d.lineWidthPlus,0));g=b.fillColor||d.fillColor||g;f=b.lineColor||d.lineColor||f;a=c(b.opacity,d.opacity,a);return {stroke:f,"stroke-width":e,fill:g,opacity:a}},destroy:function(b){var c=this,d=c.chart,e=/AppleWebKit\/533/.test(C.navigator.userAgent),
l,f,k=c.data||[],m,h;g(c,"destroy");b||x(c);(c.axisTypes||[]).forEach(function(a){(h=c[a])&&h.series&&(v(h.series,c),h.isDirty=h.forceRedraw=!0);});c.legendItem&&c.chart.legend.destroyItem(c);for(f=k.length;f--;)(m=k[f])&&m.destroy&&m.destroy();c.points=null;a.clearTimeout(c.animationTimeout);p(c,function(a,b){a instanceof w&&!a.survive&&(l=e&&"group"===b?"hide":"destroy",a[l]());});d.hoverSeries===c&&(d.hoverSeries=null);v(d.series,c);d.orderSeries();p(c,function(a,d){b&&"hcEvents"===d||delete c[d];});},
getGraphPath:function(a,b,c){var d=this,e=d.options,f=e.step,l,g=[],k=[],m;a=a||d.points;(l=a.reversed)&&a.reverse();(f={right:1,center:2}[f]||f&&3)&&l&&(f=4-f);!e.connectNulls||b||c||(a=this.getValidPoints(a));a.forEach(function(l,p){var h=l.plotX,n=l.plotY,r=a[p-1];(l.leftCliff||r&&r.rightCliff)&&!c&&(m=!0);l.isNull&&!u(b)&&0<p?m=!e.connectNulls:l.isNull&&!b?m=!0:(0===p||m?p=["M",l.plotX,l.plotY]:d.getPointSpline?p=d.getPointSpline(a,l,p):f?(p=1===f?["L",r.plotX,n]:2===f?["L",(r.plotX+h)/2,r.plotY,
"L",(r.plotX+h)/2,n]:["L",h,r.plotY],p.push("L",h,n)):p=["L",h,n],k.push(l.x),f&&(k.push(l.x),2===f&&k.push(l.x)),g.push.apply(g,p),m=!1);});g.xMap=k;return d.graphPath=g},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),d=this.chart.styledMode,e=[["graph","highcharts-graph"]];d||e[0].push(b.lineColor||this.color||"#cccccc",b.dashStyle);e=a.getZonesGraphs(e);e.forEach(function(f,e){var l=f[0],g=a[l],k=g?"animate":"attr";g?(g.endX=a.preventGraphAnimation?
null:c.xMap,g.animate({d:c})):c.length&&(a[l]=g=a.chart.renderer.path(c).addClass(f[1]).attr({zIndex:1}).add(a.group));g&&!d&&(l={stroke:f[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},f[3]?l.dashstyle=f[3]:"square"!==b.linecap&&(l["stroke-linecap"]=l["stroke-linejoin"]="round"),g[k](l).shadow(2>e&&b.shadow));g&&(g.startX=c.xMap,g.isArea=c.isArea);});},getZonesGraphs:function(a){this.zones.forEach(function(b,c){c=["zone-graph-"+c,"highcharts-graph highcharts-zone-graph-"+c+" "+(b.className||
"")];this.chart.styledMode||c.push(b.color||this.color,b.dashStyle||this.options.dashStyle);a.push(c);},this);return a},applyZones:function(){var a=this,b=this.chart,d=b.renderer,e=this.zones,g,f,k=this.clips||[],m,p=this.graph,h=this.area,n=Math.max(b.chartWidth,b.chartHeight),w=this[(this.zoneAxis||"y")+"Axis"],q,x,C=b.inverted,t,u,v,F,K=!1;e.length&&(p||h)&&w&&void 0!==w.min?(x=w.reversed,t=w.horiz,p&&!this.showLine&&p.hide(),h&&h.hide(),q=w.getExtremes(),e.forEach(function(e,l){g=x?t?b.plotWidth:
0:t?0:w.toPixels(q.min)||0;g=Math.min(Math.max(c(f,g),0),n);f=Math.min(Math.max(Math.round(w.toPixels(c(e.value,q.max),!0)||0),0),n);K&&(g=f=w.toPixels(q.max));u=Math.abs(g-f);v=Math.min(g,f);F=Math.max(g,f);w.isXAxis?(m={x:C?F:v,y:0,width:u,height:n},t||(m.x=b.plotHeight-m.x)):(m={x:0,y:C?F:v,width:n,height:u},t&&(m.y=b.plotWidth-m.y));C&&d.isVML&&(m=w.isXAxis?{x:0,y:x?v:F,height:m.width,width:b.chartWidth}:{x:m.y-b.plotLeft-b.spacingBox.x,y:0,width:m.height,height:b.chartHeight});k[l]?k[l].animate(m):
k[l]=d.clipRect(m);p&&a["zone-graph-"+l].clip(k[l]);h&&a["zone-area-"+l].clip(k[l]);K=e.value>q.max;a.resetZones&&0===f&&(f=void 0);}),this.clips=k):a.visible&&(p&&p.show(!0),h&&h.show(!0));},invertGroups:function(a){function b(){["group","markerGroup"].forEach(function(b){c[b]&&(d.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a));});}var c=this,d=c.chart,e;c.xAxis&&(e=E(d,"resize",b),E(c,"destroy",e),b(),c.invertGroups=b);},
plotGroup:function(a,b,c,d,e){var f=this[a],l=!f;l&&(this[a]=f=this.chart.renderer.g().attr({zIndex:d||.1}).add(e));f.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(u(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(f.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);f.attr({visibility:c})[l?"attr":"animate"](this.getPlotBox());return f},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;
a.inverted&&(b=c,c=this.xAxis);return {translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,d=a.options,e=!!a.animate&&b.renderer.isSVG&&H(d.animation).duration,f=a.visible?"inherit":"hidden",k=d.zIndex,m=a.hasRendered,p=b.seriesGroup,h=b.inverted;g(this,"render");c=a.plotGroup("group","series",f,k,p);a.markerGroup=a.plotGroup("markerGroup","markers",f,k,p);e&&a.animate(!0);c.inverted=a.isCartesian||a.invertable?h:!1;a.drawGraph&&
(a.drawGraph(),a.applyZones());a.visible&&a.drawPoints();a.drawDataLabels&&a.drawDataLabels();a.redrawPoints&&a.redrawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(h);!1===d.clip||a.sharedClipKey||m||c.clip(b.clipRect);e&&a.animate();m||(a.animationTimeout=F(function(){a.afterAnimate();},e));a.isDirty=!1;a.hasRendered=!0;g(a,"afterRender");},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,d=this.group,e=this.xAxis,g=this.yAxis;d&&(a.inverted&&
d.attr({width:a.plotWidth,height:a.plotHeight}),d.animate({translateX:c(e&&e.left,a.plotLeft),translateY:c(g&&g.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree;},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,e=this.chart.inverted;return this.searchKDTree({clientX:e?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:e?d.len-a.chartX+d.pos:a.chartY-d.pos},b,a)},buildKDTree:function(a){function b(a,d,e){var f,g;if(g=a&&a.length)return f=c.kdAxisArray[d%
e],a.sort(function(a,b){return a[f]-b[f]}),g=Math.floor(g/2),{point:a[g],left:b(a.slice(0,g),d+1,e),right:b(a.slice(g+1),d+1,e)}}this.buildingKdTree=!0;var c=this,d=-1<c.options.findNearestPointBy.indexOf("y")?2:1;delete c.kdTree;F(function(){c.kdTree=b(c.getValidPoints(null,!c.directTouch),d,d);c.buildingKdTree=!1;},c.options.kdNow||a&&"touchstart"===a.type?0:1);},searchKDTree:function(a,b,c){function d(a,b,c,k){var m=b.point,p=e.kdAxisArray[c%k],h,n,r=m;n=u(a[f])&&u(m[f])?Math.pow(a[f]-m[f],2):null;
h=u(a[g])&&u(m[g])?Math.pow(a[g]-m[g],2):null;h=(n||0)+(h||0);m.dist=u(h)?Math.sqrt(h):Number.MAX_VALUE;m.distX=u(n)?Math.sqrt(n):Number.MAX_VALUE;p=a[p]-m[p];h=0>p?"left":"right";n=0>p?"right":"left";b[h]&&(h=d(a,b[h],c+1,k),r=h[l]<r[l]?h:m);b[n]&&Math.sqrt(p*p)<r[l]&&(a=d(a,b[n],c+1,k),r=a[l]<r[l]?a:r);return r}var e=this,f=this.kdAxisArray[0],g=this.kdAxisArray[1],l=b?"distX":"dist";b=-1<e.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree(c);if(this.kdTree)return d(a,
this.kdTree,b,b)},pointPlacementToXValue:function(){var a=this.options.pointPlacement;"between"===a&&(a=.5);m(a)&&(a*=c(this.options.pointRange||this.xAxis.pointRange));return a}});});J(G,"parts/Stacking.js",[G["parts/Globals.js"]],function(a){var E=a.Axis,H=a.Chart,B=a.correctFloat,h=a.defined,e=a.destroyObjectProperties,q=a.format,t=a.objectEach,u=a.pick,v=a.Series;a.StackItem=function(a,e,d,m,b){var g=a.chart.inverted;this.axis=a;this.isNegative=d;this.options=e;this.x=m;this.total=null;this.points=
{};this.stack=b;this.rightCliff=this.leftCliff=0;this.alignOptions={align:e.align||(g?d?"left":"right":"center"),verticalAlign:e.verticalAlign||(g?"middle":d?"bottom":"top"),y:u(e.y,g?4:d?14:-6),x:u(e.x,g?d?-6:6:0)};this.textAlign=e.textAlign||(g?d?"right":"left":"center");};a.StackItem.prototype={destroy:function(){e(this,this.axis);},render:function(a){var e=this.axis.chart,d=this.options,m=d.format,m=m?q(m,this,e.time):d.formatter.call(this);this.label?this.label.attr({text:m,visibility:"hidden"}):
this.label=e.renderer.text(m,null,null,d.useHTML).css(d.style).attr({align:this.textAlign,rotation:d.rotation,visibility:"hidden"}).add(a);this.label.labelrank=e.plotHeight;},setOffset:function(a,e,d,m){var b=this.axis,g=b.chart;m=b.translate(b.usePercentage?100:m?m:this.total,0,0,0,1);d=b.translate(d?d:0);d=h(m)&&Math.abs(m-d);a=g.xAxis[0].translate(this.x)+a;b=h(m)&&this.getStackBox(g,this,a,m,e,d,b);(e=this.label)&&b&&(e.align(this.alignOptions,null,b),b=e.alignAttr,e[!1===this.options.crop||g.isInsidePlot(b.x,
b.y)?"show":"hide"](!0));},getStackBox:function(a,e,d,m,b,k,p){var c=e.axis.reversed,g=a.inverted;a=p.height+p.pos-(g?a.plotLeft:a.plotTop);e=e.isNegative&&!c||!e.isNegative&&c;return {x:g?e?m:m-k:d,y:g?a-d-b:e?a-m-k:a-m,width:g?k:b,height:g?b:k}}};H.prototype.getStacks=function(){var a=this;a.yAxis.forEach(function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks);});a.series.forEach(function(e){!e.options.stacking||!0!==e.visible&&!1!==a.options.chart.ignoreHiddenSeries||(e.stackKey=e.type+u(e.options.stack,
""));});};E.prototype.buildStacks=function(){var a=this.series,e=u(this.options.reversedStacks,!0),d=a.length,m;if(!this.isXAxis){this.usePercentage=!1;for(m=d;m--;)a[e?m:d-m-1].setStackedPoints();for(m=0;m<d;m++)a[m].modifyStacks();}};E.prototype.renderStackTotals=function(){var a=this.chart,e=a.renderer,d=this.stacks,m=this.stackTotalGroup;m||(this.stackTotalGroup=m=e.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());m.translate(a.plotLeft,a.plotTop);t(d,function(a){t(a,function(a){a.render(m);});});};
E.prototype.resetStacks=function(){var a=this,e=a.stacks;a.isXAxis||t(e,function(d){t(d,function(e,b){e.touched<a.stacksTouched?(e.destroy(),delete d[b]):(e.total=null,e.cumulative=null);});});};E.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&(a=this.stacks=this.oldStacks),t(a,function(a){t(a,function(a){a.cumulative=a.total;});}));};v.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var e=this.processedXData,
g=this.processedYData,d=[],m=g.length,b=this.options,k=b.threshold,p=u(b.startFromThreshold&&k,0),c=b.stack,b=b.stacking,q=this.stackKey,t="-"+q,w=this.negStacks,v=this.yAxis,C=v.stacks,l=v.oldStacks,D,A,z,I,f,r,E;v.stacksTouched+=1;for(f=0;f<m;f++)r=e[f],E=g[f],D=this.getStackIndicator(D,r,this.index),I=D.key,z=(A=w&&E<(p?0:k))?t:q,C[z]||(C[z]={}),C[z][r]||(l[z]&&l[z][r]?(C[z][r]=l[z][r],C[z][r].total=null):C[z][r]=new a.StackItem(v,v.options.stackLabels,A,r,c)),z=C[z][r],null!==E?(z.points[I]=z.points[this.index]=
[u(z.cumulative,p)],h(z.cumulative)||(z.base=I),z.touched=v.stacksTouched,0<D.index&&!1===this.singleStacks&&(z.points[I][0]=z.points[this.index+","+r+",0"][0])):z.points[I]=z.points[this.index]=null,"percent"===b?(A=A?q:t,w&&C[A]&&C[A][r]?(A=C[A][r],z.total=A.total=Math.max(A.total,z.total)+Math.abs(E)||0):z.total=B(z.total+(Math.abs(E)||0))):z.total=B(z.total+(E||0)),z.cumulative=u(z.cumulative,p)+(E||0),null!==E&&(z.points[I].push(z.cumulative),d[f]=z.cumulative);"percent"===b&&(v.usePercentage=
!0);this.stackedYData=d;v.oldStacks={};}};v.prototype.modifyStacks=function(){var a=this,e=a.stackKey,d=a.yAxis.stacks,m=a.processedXData,b,k=a.options.stacking;a[k+"Stacker"]&&[e,"-"+e].forEach(function(e){for(var c=m.length,g,p;c--;)if(g=m[c],b=a.getStackIndicator(b,g,a.index,e),p=(g=d[e]&&d[e][g])&&g.points[b.key])a[k+"Stacker"](p,g,c);});};v.prototype.percentStacker=function(a,e,d){e=e.total?100/e.total:0;a[0]=B(a[0]*e);a[1]=B(a[1]*e);this.stackedYData[d]=a[1];};v.prototype.getStackIndicator=function(a,
e,d,m){!h(a)||a.x!==e||m&&a.key!==m?a={x:e,index:0,key:m}:a.index++;a.key=[d,e,a.index].join();return a};});J(G,"parts/Dynamics.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,H=a.animate,B=a.Axis,h=a.Chart,e=a.createElement,q=a.css,t=a.defined,u=a.erase,v=a.extend,n=a.fireEvent,g=a.isNumber,d=a.isObject,m=a.isArray,b=a.merge,k=a.objectEach,p=a.pick,c=a.Point,x=a.Series,K=a.seriesTypes,w=a.setAnimation,F=a.splat;a.cleanRecursively=function(b,c){var e={};k(b,function(g,l){if(d(b[l],!0)&&!b.nodeType&&
c[l])g=a.cleanRecursively(b[l],c[l]),Object.keys(g).length&&(e[l]=g);else if(d(b[l])||b[l]!==c[l])e[l]=b[l];});return e};v(h.prototype,{addSeries:function(a,b,c){var d,e=this;a&&(b=p(b,!0),n(e,"addSeries",{options:a},function(){d=e.initSeries(a);e.isDirtyLegend=!0;e.linkSeries();n(e,"afterAddSeries",{series:d});b&&e.redraw(c);}));return d},addAxis:function(a,c,d,e){var g=c?"xAxis":"yAxis",l=this.options;a=b(a,{index:this[g].length,isX:c});c=new B(this,a);l[g]=F(l[g]||{});l[g].push(a);p(d,!0)&&this.redraw(e);
return c},showLoading:function(a){var b=this,c=b.options,d=b.loadingDiv,g=c.loading,k=function(){d&&q(d,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"});};d||(b.loadingDiv=d=e("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=e("span",{className:"highcharts-loading-inner"},null,d),E(b,"redraw",k));d.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;b.styledMode||(q(d,v(g.style,{zIndex:10})),
q(b.loadingSpan,g.labelStyle),b.loadingShown||(q(d,{opacity:0,display:""}),H(d,{opacity:g.style.opacity||.5},{duration:g.showDuration||0})));b.loadingShown=!0;k();},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",this.styledMode||H(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){q(b,{display:"none"});}}));this.loadingShown=!1;},propsRequireDirtyBox:"backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireReflow:"margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),collectionsWithUpdate:"xAxis yAxis zAxis series colorAxis pane".split(" "),update:function(c,d,e,m){var l=this,h={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},f,r,w,q,x=[];n(l,"update",{options:c});c.isResponsiveOptions||
l.setResponsive(!1,!0);c=a.cleanRecursively(c,l.options);b(!0,l.userOptions,c);if(f=c.chart){b(!0,l.options.chart,f);"className"in f&&l.setClassName(f.className);"reflow"in f&&l.setReflow(f.reflow);if("inverted"in f||"polar"in f||"type"in f)l.propFromSeries(),r=!0;"alignTicks"in f&&(r=!0);k(f,function(a,b){-1!==l.propsRequireUpdateSeries.indexOf("chart."+b)&&(w=!0);-1!==l.propsRequireDirtyBox.indexOf(b)&&(l.isDirtyBox=!0);-1!==l.propsRequireReflow.indexOf(b)&&(q=!0);});!l.styledMode&&"style"in f&&
l.renderer.setStyle(f.style);}!l.styledMode&&c.colors&&(this.options.colors=c.colors);c.plotOptions&&b(!0,this.options.plotOptions,c.plotOptions);c.time&&this.time===a.time&&(this.time=new a.Time(c.time));k(c,function(a,b){if(l[b]&&"function"===typeof l[b].update)l[b].update(a,!1);else if("function"===typeof l[h[b]])l[h[b]](a);"chart"!==b&&-1!==l.propsRequireUpdateSeries.indexOf(b)&&(w=!0);});this.collectionsWithUpdate.forEach(function(a){var b;c[a]&&("series"===a&&(b=[],l[a].forEach(function(a,c){a.options.isInternal||
b.push(p(a.options.index,c));})),F(c[a]).forEach(function(c,d){(d=t(c.id)&&l.get(c.id)||l[a][b?b[d]:d])&&d.coll===a&&(d.update(c,!1),e&&(d.touched=!0));!d&&e&&l.collectionsWithInit[a]&&(l.collectionsWithInit[a][0].apply(l,[c].concat(l.collectionsWithInit[a][1]||[]).concat([!1])).touched=!0);}),e&&l[a].forEach(function(a){a.touched||a.options.isInternal?delete a.touched:x.push(a);}));});x.forEach(function(a){a.remove&&a.remove(!1);});r&&l.axes.forEach(function(a){a.update({},!1);});w&&l.series.forEach(function(a){a.update({},
!1);});c.loading&&b(!0,l.options.loading,c.loading);r=f&&f.width;f=f&&f.height;a.isString(f)&&(f=a.relativeLength(f,r||l.chartWidth));q||g(r)&&r!==l.chartWidth||g(f)&&f!==l.chartHeight?l.setSize(r,f,m):p(d,!0)&&l.redraw(m);n(l,"afterUpdate",{options:c,redraw:d,animation:m});},setSubtitle:function(a){this.setTitle(void 0,a);}});h.prototype.collectionsWithInit={xAxis:[h.prototype.addAxis,[!0]],yAxis:[h.prototype.addAxis,[!1]],series:[h.prototype.addSeries]};v(c.prototype,{update:function(a,b,c,e){function g(){l.applyOptions(a);
null===l.y&&k&&(l.graphic=k.destroy());d(a,!0)&&(k&&k.element&&a&&a.marker&&void 0!==a.marker.symbol&&(l.graphic=k.destroy()),a&&a.dataLabels&&l.dataLabel&&(l.dataLabel=l.dataLabel.destroy()),l.connector&&(l.connector=l.connector.destroy()));m=l.index;f.updateParallelArrays(l,m);n.data[m]=d(n.data[m],!0)||d(a,!0)?l.options:p(a,n.data[m]);f.isDirty=f.isDirtyData=!0;!f.fixedBox&&f.hasCartesianSeries&&(h.isDirtyBox=!0);"point"===n.legendType&&(h.isDirtyLegend=!0);b&&h.redraw(c);}var l=this,f=l.series,
k=l.graphic,m,h=f.chart,n=f.options;b=p(b,!0);!1===e?g():l.firePointEvent("update",{options:a},g);},remove:function(a,b){this.series.removePoint(this.series.data.indexOf(this),a,b);}});v(x.prototype,{addPoint:function(a,b,c,d,e){var g=this.options,f=this.data,l=this.chart,k=this.xAxis,k=k&&k.hasNames&&k.names,m=g.data,h,w=this.xData,q,x,C;b=p(b,!0);h={series:this};this.pointClass.prototype.applyOptions.apply(h,[a]);C=h.x;x=w.length;if(this.requireSorting&&C<w[x-1])for(q=!0;x&&w[x-1]>C;)x--;this.updateParallelArrays(h,
"splice",x,0,0);this.updateParallelArrays(h,x);k&&h.name&&(k[C]=h.name);m.splice(x,0,a);q&&(this.data.splice(x,0,null),this.processData());"point"===g.legendType&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(h,"shift"),m.shift()));!1!==e&&n(this,"addPoint",{point:h});this.isDirtyData=this.isDirty=!0;b&&l.redraw(d);},removePoint:function(a,b,c){var d=this,e=d.data,g=e[a],f=d.points,l=d.chart,k=function(){f&&f.length===e.length&&f.splice(a,1);e.splice(a,
1);d.options.data.splice(a,1);d.updateParallelArrays(g||{series:d},"splice",a,1);g&&g.destroy();d.isDirty=!0;d.isDirtyData=!0;b&&l.redraw();};w(c,l);b=p(b,!0);g?g.firePointEvent("remove",null,k):k();},remove:function(a,b,c,d){function e(){g.destroy(d);g.remove=null;f.isDirtyLegend=f.isDirtyBox=!0;f.linkSeries();p(a,!0)&&f.redraw(b);}var g=this,f=g.chart;!1!==c?n(g,"remove",null,e):e();},update:function(c,d){c=a.cleanRecursively(c,this.userOptions);n(this,"update",{options:c});var e=this,g=e.chart,l=e.userOptions,
k,f=e.initialType||e.type,m=c.type||l.type||g.options.chart.type,h=!(this.hasDerivedData||c.dataGrouping||m&&m!==this.type||void 0!==c.pointStart||c.pointInterval||c.pointIntervalUnit||c.keys),w=K[f].prototype,q,x=["group","markerGroup","dataLabelsGroup","transformGroup"],t=["navigatorSeries","baseSeries"],C=e.finishedAnimating&&{animation:!1},u={};h&&(t.push("data","isDirtyData","points","processedXData","processedYData","xIncrement","_hasPointMarkers","_hasPointLabels","mapMap","mapData","minY",
"maxY","minX","maxX"),!1!==c.visible&&t.push("area","graph"),e.parallelArrays.forEach(function(a){t.push(a+"Data");}),c.data&&this.setData(c.data,!1));c=b(l,C,{index:void 0===l.index?e.index:l.index,pointStart:p(l.pointStart,e.xData[0])},!h&&{data:e.options.data},c);t=x.concat(t);t.forEach(function(a){t[a]=e[a];delete e[a];});e.remove(!1,null,!1,!0);for(q in w)e[q]=void 0;K[m||f]?v(e,K[m||f].prototype):a.error(17,!0,g);t.forEach(function(a){e[a]=t[a];});e.init(g,c);h&&this.points&&(k=e.options,!1===
k.visible?(u.graphic=1,u.dataLabel=1):(k.marker&&!1===k.marker.enabled&&!e._hasPointMarkers&&(u.graphic=1),k.dataLabels&&!1===k.dataLabels.enabled&&!e._hasPointLabels&&(u.dataLabel=1)),this.points.forEach(function(a){a&&a.series&&(a.resolveColor(),Object.keys(u).length&&a.destroyElements(u),!1===k.showInLegend&&a.legendItem&&g.legend.destroyItem(a));},this));c.zIndex!==l.zIndex&&x.forEach(function(a){e[a]&&e[a].attr({zIndex:c.zIndex});});e.initialType=f;g.linkSeries();n(this,"afterUpdate");p(d,!0)&&
g.redraw(h?void 0:!1);},setName:function(a){this.name=this.options.name=this.userOptions.name=a;this.chart.isDirtyLegend=!0;}});v(B.prototype,{update:function(a,c){var d=this.chart,e=a&&a.events||{};a=b(this.userOptions,a);d.options[this.coll].indexOf&&(d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)]=a);k(d.options[this.coll].events,function(a,b){"undefined"===typeof e[b]&&(e[b]=void 0);});this.destroy(!0);this.init(d,v(a,{events:e}));d.isDirtyBox=!0;p(c,!0)&&d.redraw();},remove:function(a){for(var b=
this.chart,c=this.coll,d=this.series,e=d.length;e--;)d[e]&&d[e].remove(!1);u(b.axes,this);u(b[c],this);m(b.options[c])?b.options[c].splice(this.options.index,1):delete b.options[c];b[c].forEach(function(a,b){a.options.index=a.userOptions.index=b;});this.destroy();b.isDirtyBox=!0;p(a,!0)&&b.redraw();},setTitle:function(a,b){this.update({title:a},b);},setCategories:function(a,b){this.update({categories:a},b);}});});J(G,"parts/AreaSeries.js",[G["parts/Globals.js"]],function(a){var E=a.color,H=a.pick,B=a.Series,
h=a.seriesType;h("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(e){var h=[],t=[],u=this.xAxis,v=this.yAxis,n=v.stacks[this.stackKey],g={},d=this.index,m=v.series,b=m.length,k,p=H(v.options.reversedStacks,!0)?1:-1,c;e=e||this.points;if(this.options.stacking){for(c=0;c<e.length;c++)e[c].leftNull=e[c].rightNull=null,g[e[c].x]=e[c];a.objectEach(n,function(a,b){null!==a.total&&t.push(b);});t.sort(function(a,b){return a-b});k=m.map(function(a){return a.visible});t.forEach(function(a,
e){var m=0,q,x;if(g[a]&&!g[a].isNull)h.push(g[a]),[-1,1].forEach(function(l){var m=1===l?"rightNull":"leftNull",h=0,w=n[t[e+l]];if(w)for(c=d;0<=c&&c<b;)q=w.points[c],q||(c===d?g[a][m]=!0:k[c]&&(x=n[a].points[c])&&(h-=x[1]-x[0])),c+=p;g[a][1===l?"rightCliff":"leftCliff"]=h;});else{for(c=d;0<=c&&c<b;){if(q=n[a].points[c]){m=q[1];break}c+=p;}m=v.translate(m,0,1,0,1);h.push({isNull:!0,plotX:u.translate(a,0,0,0,1),x:a,plotY:m,yBottom:m});}});}return h},getGraphPath:function(e){var h=B.prototype.getGraphPath,
t=this.options,u=t.stacking,v=this.yAxis,n,g,d=[],m=[],b=this.index,k,p=v.stacks[this.stackKey],c=t.threshold,x=v.getThreshold(t.threshold),K,t=a.pick(t.connectNulls,"percent"===u),w=function(a,g,l){var h=e[a];a=u&&p[h.x].points[b];var n=h[l+"Null"]||0;l=h[l+"Cliff"]||0;var w,q,h=!0;l||n?(w=(n?a[0]:a[1])+l,q=a[0]+l,h=!!n):!u&&e[g]&&e[g].isNull&&(w=q=c);void 0!==w&&(m.push({plotX:k,plotY:null===w?x:v.getThreshold(w),isNull:h,isCliff:!0}),d.push({plotX:k,plotY:null===q?x:v.getThreshold(q),doCurve:!1}));};
e=e||this.points;u&&(e=this.getStackPoints(e));for(n=0;n<e.length;n++)if(g=e[n].isNull,k=H(e[n].rectPlotX,e[n].plotX),K=H(e[n].yBottom,x),!g||t)t||w(n,n-1,"left"),g&&!u&&t||(m.push(e[n]),d.push({x:n,plotX:k,plotY:K})),t||w(n,n+1,"right");n=h.call(this,m,!0,!0);d.reversed=!0;g=h.call(this,d,!0,!0);g.length&&(g[0]="L");g=n.concat(g);h=h.call(this,m,!1,t);g.xMap=n.xMap;this.areaPath=g;return h},drawGraph:function(){this.areaPath=[];B.prototype.drawGraph.apply(this);var a=this,h=this.areaPath,t=this.options,
u=[["area","highcharts-area",this.color,t.fillColor]];this.zones.forEach(function(e,h){u.push(["zone-area-"+h,"highcharts-area highcharts-zone-area-"+h+" "+e.className,e.color||a.color,e.fillColor||t.fillColor]);});u.forEach(function(e){var n=e[0],g=a[n],d=g?"animate":"attr",m={};g?(g.endX=a.preventGraphAnimation?null:h.xMap,g.animate({d:h})):(m.zIndex=0,g=a[n]=a.chart.renderer.path(h).addClass(e[1]).add(a.group),g.isArea=!0);a.chart.styledMode||(m.fill=H(e[3],E(e[2]).setOpacity(H(t.fillOpacity,.75)).get()));
g[d](m);g.startX=h.xMap;g.shiftUnit=t.step?2:1;});},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle});});J(G,"parts/SplineSeries.js",[G["parts/Globals.js"]],function(a){var E=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,B,h){var e=B.plotX,q=B.plotY,t=a[h-1];h=a[h+1];var u,v,n,g;if(t&&!t.isNull&&!1!==t.doCurve&&!B.isCliff&&h&&!h.isNull&&!1!==h.doCurve&&!B.isCliff){a=t.plotY;n=h.plotX;h=h.plotY;var d=0;u=(1.5*e+t.plotX)/2.5;v=(1.5*q+a)/2.5;n=(1.5*e+n)/2.5;g=(1.5*q+h)/2.5;n!==
u&&(d=(g-v)*(n-e)/(n-u)+q-g);v+=d;g+=d;v>a&&v>q?(v=Math.max(a,q),g=2*q-v):v<a&&v<q&&(v=Math.min(a,q),g=2*q-v);g>h&&g>q?(g=Math.max(h,q),v=2*q-g):g<h&&g<q&&(g=Math.min(h,q),v=2*q-g);B.rightContX=n;B.rightContY=g;}B=["C",E(t.rightContX,t.plotX),E(t.rightContY,t.plotY),E(u,e),E(v,q),e,q];t.rightContX=t.rightContY=null;return B}});});J(G,"parts/AreaSplineSeries.js",[G["parts/Globals.js"]],function(a){var E=a.seriesTypes.area.prototype,H=a.seriesType;H("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:E.getStackPoints,
getGraphPath:E.getGraphPath,drawGraph:E.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle});});J(G,"parts/ColumnSeries.js",[G["parts/Globals.js"]],function(a){var E=a.animObject,H=a.color,B=a.extend,h=a.defined,e=a.isNumber,q=a.merge,t=a.pick,u=a.Series,v=a.seriesType,n=a.svg;v("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},
dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){u.prototype.init.apply(this,arguments);var a=this,d=a.chart;d.hasRendered&&d.series.forEach(function(d){d.type===a.type&&(d.isDirty=!0);});},getColumnMetrics:function(){var a=this,d=a.options,e=a.xAxis,b=a.yAxis,k=e.options.reversedStacks,
k=e.reversed&&!k||!e.reversed&&k,h,c={},n=0;!1===d.grouping?n=1:a.chart.series.forEach(function(d){var e=d.options,g=d.yAxis,k;d.type!==a.type||!d.visible&&a.chart.options.chart.ignoreHiddenSeries||b.len!==g.len||b.pos!==g.pos||(e.stacking?(h=d.stackKey,void 0===c[h]&&(c[h]=n++),k=c[h]):!1!==e.grouping&&(k=n++),d.columnIndex=k);});var q=Math.min(Math.abs(e.transA)*(e.ordinalSlope||d.pointRange||e.closestPointRange||e.tickInterval||1),e.len),w=q*d.groupPadding,u=(q-2*w)/(n||1),d=Math.min(d.maxPointWidth||
e.len,t(d.pointWidth,u*(1-2*d.pointPadding)));a.columnMetrics={width:d,offset:(u-d)/2+(w+((a.columnIndex||0)+(k?1:0))*u-q/2)*(k?-1:1)};return a.columnMetrics},crispCol:function(a,d,e,b){var g=this.chart,m=this.borderWidth,c=-(m%2?.5:0),m=m%2?.5:1;g.inverted&&g.renderer.isVML&&(m+=1);this.options.crisp&&(e=Math.round(a+e)+c,a=Math.round(a)+c,e-=a);b=Math.round(d+b)+m;c=.5>=Math.abs(d)&&.5<b;d=Math.round(d)+m;b-=d;c&&b&&(--d,b+=1);return {x:a,y:d,width:e,height:b}},translate:function(){var a=this,d=
a.chart,e=a.options,b=a.dense=2>a.closestPointRange*a.xAxis.transA,b=a.borderWidth=t(e.borderWidth,b?0:1),k=a.yAxis,p=e.threshold,c=a.translatedThreshold=k.getThreshold(p),n=t(e.minPointLength,5),q=a.getColumnMetrics(),w=q.width,v=a.barW=Math.max(w,1+2*b),C=a.pointXOffset=q.offset,l=a.dataMin,D=a.dataMax;d.inverted&&(c-=.5);e.pointPadding&&(v=Math.ceil(v));u.prototype.translate.apply(a);a.points.forEach(function(b){var e=t(b.yBottom,c),g=999+Math.abs(e),f=w,g=Math.min(Math.max(-g,b.plotY),k.len+g),
m=b.plotX+C,q=v,x=Math.min(g,e),u,A=Math.max(g,e)-x;n&&Math.abs(A)<n&&(A=n,u=!k.reversed&&!b.negative||k.reversed&&b.negative,b.y===p&&a.dataMax<=p&&k.min<p&&l!==D&&(u=!u),x=Math.abs(x-c)>n?e-n:c-(u?n:0));h(b.options.pointWidth)&&(f=q=Math.ceil(b.options.pointWidth),m-=Math.round((f-w)/2));b.barX=m;b.pointWidth=f;b.tooltipPos=d.inverted?[k.len+k.pos-d.plotLeft-g,a.xAxis.len-m-q/2,A]:[m+q/2,g+k.pos-d.plotTop,A];b.shapeType=a.pointClass.prototype.shapeType||"rect";b.shapeArgs=a.crispCol.apply(a,b.isNull?
[m,c,q,0]:[m,x,q,A]);});},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data");},pointAttribs:function(a,d){var e=this.options,b,k=this.pointAttrToOptions||{};b=k.stroke||"borderColor";var g=k["stroke-width"]||"borderWidth",c=a&&a.color||this.color,h=a&&a[b]||e[b]||this.color||c,n=a&&a[g]||e[g]||this[g]||0,k=a&&a.dashStyle||e.dashStyle,w=t(e.opacity,1),u;a&&this.zones.length&&(u=a.getZone(),c=
a.options.color||u&&u.color||this.color,u&&(h=u.borderColor||h,k=u.dashStyle||k,n=u.borderWidth||n));d&&(a=q(e.states[d],a.options.states&&a.options.states[d]||{}),d=a.brightness,c=a.color||void 0!==d&&H(c).brighten(a.brightness).get()||c,h=a[b]||h,n=a[g]||n,k=a.dashStyle||k,w=t(a.opacity,w));b={fill:c,stroke:h,"stroke-width":n,opacity:w};k&&(b.dashstyle=k);return b},drawPoints:function(){var a=this,d=this.chart,m=a.options,b=d.renderer,k=m.animationLimit||250,h;a.points.forEach(function(c){var g=
c.graphic,p=g&&d.pointCount<k?"animate":"attr";if(e(c.plotY)&&null!==c.y){h=c.shapeArgs;g&&g.element.nodeName!==c.shapeType&&(g=g.destroy());if(g)g[p](q(h));else c.graphic=g=b[c.shapeType](h).add(c.group||a.group);if(m.borderRadius)g[p]({r:m.borderRadius});d.styledMode||g[p](a.pointAttribs(c,c.selected&&"select")).shadow(!1!==c.allowShadow&&m.shadow,null,m.stacking&&!m.borderRadius);g.addClass(c.getClassName(),!0);}else g&&(c.graphic=g.destroy());});},animate:function(a){var d=this,e=this.yAxis,b=d.options,
g=this.chart.inverted,h={},c=g?"translateX":"translateY",q;n&&(a?(h.scaleY=.001,a=Math.min(e.pos+e.len,Math.max(e.pos,e.toPixels(b.threshold))),g?h.translateX=a-e.len:h.translateY=a,d.clipBox&&d.setClip(),d.group.attr(h)):(q=d.group.attr(c),d.group.animate({scaleY:1},B(E(d.options.animation),{step:function(a,b){h[c]=q+b.pos*(e.pos-q);d.group.attr(h);}})),d.animate=null));},remove:function(){var a=this,d=a.chart;d.hasRendered&&d.series.forEach(function(d){d.type===a.type&&(d.isDirty=!0);});u.prototype.remove.apply(a,
arguments);}});});J(G,"parts/BarSeries.js",[G["parts/Globals.js"]],function(a){a=a.seriesType;a("bar","column",null,{inverted:!0});});J(G,"parts/ScatterSeries.js",[G["parts/Globals.js"]],function(a){var E=a.Series,H=a.seriesType;H("scatter","line",{lineWidth:0,findNearestPointBy:"xy",jitter:{x:0,y:0},marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 10px"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},
{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&E.prototype.drawGraph.call(this);},applyJitter:function(){var a=this,h=this.options.jitter,e=this.points.length;h&&this.points.forEach(function(q,t){["x","y"].forEach(function(u,v){var n,g="plot"+u.toUpperCase(),d,m;h[u]&&!q.isNull&&(n=a[u+"Axis"],m=h[u]*n.transA,n&&!n.isLog&&(d=Math.max(0,q[g]-m),n=Math.min(n.len,q[g]+m),v=1E4*
Math.sin(t+v*e),q[g]=d+(n-d)*(v-Math.floor(v)),"x"===u&&(q.clientX=q.plotX)));});});}});a.addEvent(E,"afterTranslate",function(){this.applyJitter&&this.applyJitter();});});J(G,"mixins/centered-series.js",[G["parts/Globals.js"]],function(a){var E=a.deg2rad,H=a.isNumber,B=a.pick,h=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,q=this.chart,t=2*(a.slicedOffset||0),u=q.plotWidth-2*t,q=q.plotHeight-2*t,v=a.center,v=[B(v[0],"50%"),B(v[1],"50%"),a.size||"100%",a.innerSize||0],
n=Math.min(u,q),g,d;for(g=0;4>g;++g)d=v[g],a=2>g||2===g&&/%$/.test(d),v[g]=h(d,[u,q,n,v[2]][g])+(a?t:0);v[3]>v[2]&&(v[3]=v[2]);return v},getStartAndEndRadians:function(a,h){a=H(a)?a:0;h=H(h)&&h>a&&360>h-a?h:a+360;return {start:E*(a+-90),end:E*(h+-90)}}};});J(G,"parts/PieSeries.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,H=a.CenteredSeriesMixin,B=a.defined,h=H.getStartAndEndRadians,e=a.merge,q=a.noop,t=a.pick,u=a.Point,v=a.Series,n=a.seriesType,g=a.setAnimation;n("pie","line",{center:[null,
null],clip:!1,colorByPoint:!0,dataLabels:{allowOverlap:!0,connectorPadding:5,distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},softConnector:!0,x:0,connectorShape:"fixedOffset",crookDistance:"70%"},ignoreHiddenPoint:!0,inactiveOtherPoints:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1}}},{isCartesian:!1,requireSorting:!1,
directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var d=this,b=d.points,e=d.startAngleRad;a||(b.forEach(function(a){var b=a.graphic,g=a.shapeArgs;b&&(b.attr({r:a.startR||d.center[3]/2,start:e,end:e}),b.animate({r:g.r,start:g.start,end:g.end},d.options.animation));}),d.animate=null);},hasData:function(){return !!this.processedXData.length},updateTotals:function(){var a,e=0,b=this.points,
g=b.length,h,c=this.options.ignoreHiddenPoint;for(a=0;a<g;a++)h=b[a],e+=c&&!h.visible?0:h.isNull?0:h.y;this.total=e;for(a=0;a<g;a++)h=b[a],h.percentage=0<e&&(h.visible||!c)?h.y/e*100:0,h.total=e;},generatePoints:function(){v.prototype.generatePoints.call(this);this.updateTotals();},getX:function(a,e,b){var d=this.center,g=this.radii?this.radii[b.index]:d[2]/2;return d[0]+(e?-1:1)*Math.cos(Math.asin(Math.max(Math.min((a-d[1])/(g+b.labelDistance),1),-1)))*(g+b.labelDistance)+(0<b.labelDistance?(e?-1:
1)*this.options.dataLabels.padding:0)},translate:function(d){this.generatePoints();var e=0,b=this.options,g=b.slicedOffset,p=g+(b.borderWidth||0),c,n,q=h(b.startAngle,b.endAngle),w=this.startAngleRad=q.start,q=(this.endAngleRad=q.end)-w,u=this.points,C,l,v=b.dataLabels.distance,b=b.ignoreHiddenPoint,A,z=u.length,B;d||(this.center=d=this.getCenter());for(A=0;A<z;A++){B=u[A];c=w+e*q;if(!b||B.visible)e+=B.percentage/100;n=w+e*q;B.shapeType="arc";B.shapeArgs={x:d[0],y:d[1],r:d[2]/2,innerR:d[3]/2,start:Math.round(1E3*
c)/1E3,end:Math.round(1E3*n)/1E3};B.labelDistance=t(B.options.dataLabels&&B.options.dataLabels.distance,v);B.labelDistance=a.relativeLength(B.labelDistance,B.shapeArgs.r);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,B.labelDistance);n=(n+c)/2;n>1.5*Math.PI?n-=2*Math.PI:n<-Math.PI/2&&(n+=2*Math.PI);B.slicedTranslation={translateX:Math.round(Math.cos(n)*g),translateY:Math.round(Math.sin(n)*g)};C=Math.cos(n)*d[2]/2;l=Math.sin(n)*d[2]/2;B.tooltipPos=[d[0]+.7*C,d[1]+.7*l];B.half=n<-Math.PI/
2||n>Math.PI/2?1:0;B.angle=n;c=Math.min(p,B.labelDistance/5);B.labelPosition={natural:{x:d[0]+C+Math.cos(n)*B.labelDistance,y:d[1]+l+Math.sin(n)*B.labelDistance},"final":{},alignment:0>B.labelDistance?"center":B.half?"right":"left",connectorPosition:{breakAt:{x:d[0]+C+Math.cos(n)*c,y:d[1]+l+Math.sin(n)*c},touchingSliceAt:{x:d[0]+C,y:d[1]+l}}};}},drawGraph:null,redrawPoints:function(){var a=this,g=a.chart,b=g.renderer,k,h,c,n,q=a.options.shadow;!q||a.shadowGroup||g.styledMode||(a.shadowGroup=b.g("shadow").attr({zIndex:-1}).add(a.group));
a.points.forEach(function(d){var m={};h=d.graphic;if(!d.isNull&&h){n=d.shapeArgs;k=d.getTranslate();if(!g.styledMode){var p=d.shadowGroup;q&&!p&&(p=d.shadowGroup=b.g("shadow").add(a.shadowGroup));p&&p.attr(k);c=a.pointAttribs(d,d.selected&&"select");}d.delayedRendering?(h.setRadialReference(a.center).attr(n).attr(k),g.styledMode||h.attr(c).attr({"stroke-linejoin":"round"}).shadow(q,p),d.delayedRendering=!1):(h.setRadialReference(a.center),g.styledMode||e(!0,m,c),e(!0,m,n,k),h.animate(m));h.attr({visibility:d.visible?
"inherit":"hidden"});h.addClass(d.getClassName());}else h&&(d.graphic=h.destroy());});},drawPoints:function(){var a=this.chart.renderer;this.points.forEach(function(d){d.graphic||(d.graphic=a[d.shapeType](d.shapeArgs).add(d.series.group),d.delayedRendering=!0);});},searchPoint:q,sortByAngle:function(a,e){a.sort(function(a,d){return void 0!==a.angle&&(d.angle-a.angle)*e});},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:H.getCenter,getSymbol:q},{init:function(){u.prototype.init.apply(this,
arguments);var a=this,e;a.name=t(a.name,"Slice");e=function(b){a.slice("select"===b.type);};E(a,"select",e);E(a,"unselect",e);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,e){var b=this,d=b.series,g=d.chart,c=d.options.ignoreHiddenPoint;e=t(e,c);a!==b.visible&&(b.visible=b.options.visible=a=void 0===a?!b.visible:a,d.options.data[d.data.indexOf(b)]=b.options,["graphic","dataLabel","connector","shadowGroup"].forEach(function(c){if(b[c])b[c][a?"show":"hide"](!0);}),
b.legendItem&&g.legend.colorizeItem(b,a),a||"hover"!==b.state||b.setState(""),c&&(d.isDirty=!0),e&&g.redraw());},slice:function(a,e,b){var d=this.series;g(b,d.chart);t(e,!0);this.sliced=this.options.sliced=B(a)?a:!this.sliced;d.options.data[d.data.indexOf(this)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate());},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var d=
this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(d.x,d.y,d.r+a,d.r+a,{innerR:this.shapeArgs.r-1,start:d.start,end:d.end})},connectorShapes:{fixedOffset:function(a,e,b){var d=e.breakAt;e=e.touchingSliceAt;return ["M",a.x,a.y].concat(b.softConnector?["C",a.x+("left"===a.alignment?-5:5),a.y,2*d.x-e.x,2*d.y-e.y,d.x,d.y]:["L",d.x,d.y]).concat(["L",e.x,e.y])},straight:function(a,e){e=e.touchingSliceAt;return ["M",a.x,a.y,"L",e.x,e.y]},crookedLine:function(d,e,b){e=
e.touchingSliceAt;var g=this.series,h=g.center[0],c=g.chart.plotWidth,m=g.chart.plotLeft,g=d.alignment,n=this.shapeArgs.r;b=a.relativeLength(b.crookDistance,1);b="left"===g?h+n+(c+m-h-n)*(1-b):m+(h-n)*b;h=["L",b,d.y];if("left"===g?b>d.x||b<e.x:b<d.x||b>e.x)h=[];return ["M",d.x,d.y].concat(h).concat(["L",e.x,e.y])}},getConnectorPath:function(){var a=this.labelPosition,e=this.series.options.dataLabels,b=e.connectorShape,g=this.connectorShapes;g[b]&&(b=g[b]);return b.call(this,{x:a.final.x,y:a.final.y,
alignment:a.alignment},a.connectorPosition,e)}});});J(G,"parts/DataLabels.js",[G["parts/Globals.js"]],function(a){var E=a.arrayMax,H=a.defined,B=a.extend,h=a.format,e=a.merge,q=a.noop,t=a.pick,u=a.relativeLength,v=a.Series,n=a.seriesTypes,g=a.stableSort,d=a.isArray,m=a.splat;a.distribute=function(b,d,e){function c(a,b){return a.target-b.target}var k,h=!0,m=b,p=[],n;n=0;var l=m.reducedLen||d;for(k=b.length;k--;)n+=b[k].size;if(n>l){g(b,function(a,b){return (b.rank||0)-(a.rank||0)});for(n=k=0;n<=l;)n+=
b[k].size,k++;p=b.splice(k-1,b.length);}g(b,c);for(b=b.map(function(a){return {size:a.size,targets:[a.target],align:t(a.align,.5)}});h;){for(k=b.length;k--;)h=b[k],n=(Math.min.apply(0,h.targets)+Math.max.apply(0,h.targets))/2,h.pos=Math.min(Math.max(0,n-h.size*h.align),d-h.size);k=b.length;for(h=!1;k--;)0<k&&b[k-1].pos+b[k-1].size>b[k].pos&&(b[k-1].size+=b[k].size,b[k-1].targets=b[k-1].targets.concat(b[k].targets),b[k-1].align=.5,b[k-1].pos+b[k-1].size>d&&(b[k-1].pos=d-b[k-1].size),b.splice(k,1),h=
!0);}m.push.apply(m,p);k=0;b.some(function(b){var c=0;if(b.targets.some(function(){m[k].pos=b.pos+c;if(Math.abs(m[k].pos-m[k].target)>e)return m.slice(0,k+1).forEach(function(a){delete a.pos;}),m.reducedLen=(m.reducedLen||d)-.1*d,m.reducedLen>.1*d&&a.distribute(m,d,e),!0;c+=m[k].size;k++;}))return !0});g(m,c);};v.prototype.drawDataLabels=function(){function b(a,b){var c=b.filter;return c?(b=c.operator,a=a[c.property],c=c.value,"\x3e"===b&&a>c||"\x3c"===b&&a<c||"\x3e\x3d"===b&&a>=c||"\x3c\x3d"===b&&a<=
c||"\x3d\x3d"===b&&a==c||"\x3d\x3d\x3d"===b&&a===c?!0:!1):!0}function g(a,b){var c=[],f;if(d(a)&&!d(b))c=a.map(function(a){return e(a,b)});else if(d(b)&&!d(a))c=b.map(function(b){return e(a,b)});else if(d(a)||d(b))for(f=Math.max(a.length,b.length);f--;)c[f]=e(a[f],b[f]);else c=e(a,b);return c}var p=this,c=p.chart,n=p.options,q=n.dataLabels,w=p.points,u,C=p.hasRendered||0,l,v=a.animObject(n.animation).duration,A=Math.min(v,200),z=!c.renderer.forExport&&t(q.defer,0<A),B=c.renderer,q=g(g(c.options.plotOptions&&
c.options.plotOptions.series&&c.options.plotOptions.series.dataLabels,c.options.plotOptions&&c.options.plotOptions[p.type]&&c.options.plotOptions[p.type].dataLabels),q);a.fireEvent(this,"drawDataLabels");if(d(q)||q.enabled||p._hasPointLabels)l=p.plotGroup("dataLabelsGroup","data-labels",z&&!C?"hidden":"inherit",q.zIndex||6),z&&(l.attr({opacity:+C}),C||setTimeout(function(){var a=p.dataLabelsGroup;a&&(p.visible&&l.show(!0),a[n.animation?"animate":"attr"]({opacity:1},{duration:A}));},v-A)),w.forEach(function(d){u=
m(g(q,d.dlOptions||d.options&&d.options.dataLabels));u.forEach(function(e,f){var g=e.enabled&&(!d.isNull||d.dataLabelOnNull)&&b(d,e),k,m,q,w,r=d.dataLabels?d.dataLabels[f]:d.dataLabel,u=d.connectors?d.connectors[f]:d.connector,x=!r;g&&(k=d.getLabelConfig(),m=t(e[d.formatPrefix+"Format"],e.format),k=H(m)?h(m,k,c.time):(e[d.formatPrefix+"Formatter"]||e.formatter).call(k,e),m=e.style,q=e.rotation,c.styledMode||(m.color=t(e.color,m.color,p.color,"#000000"),"contrast"===m.color&&(d.contrastColor=B.getContrast(d.color||
p.color),m.color=e.inside||0>t(e.distance,d.labelDistance)||n.stacking?d.contrastColor:"#000000"),n.cursor&&(m.cursor=n.cursor)),w={r:e.borderRadius||0,rotation:q,padding:e.padding,zIndex:1},c.styledMode||(w.fill=e.backgroundColor,w.stroke=e.borderColor,w["stroke-width"]=e.borderWidth),a.objectEach(w,function(a,b){void 0===a&&delete w[b];}));!r||g&&H(k)?g&&H(k)&&(r?w.text=k:(d.dataLabels=d.dataLabels||[],r=d.dataLabels[f]=q?B.text(k,0,-9999).addClass("highcharts-data-label"):B.label(k,0,-9999,e.shape,
null,null,e.useHTML,null,"data-label"),f||(d.dataLabel=r),r.addClass(" highcharts-data-label-color-"+d.colorIndex+" "+(e.className||"")+(e.useHTML?" highcharts-tracker":""))),r.options=e,r.attr(w),c.styledMode||r.css(m).shadow(e.shadow),r.added||r.add(l),e.textPath&&!e.useHTML&&r.setTextPath(d.getDataLabelPath&&d.getDataLabelPath(r)||d.graphic,e.textPath),p.alignDataLabel(d,r,e,null,x)):(d.dataLabel=d.dataLabel&&d.dataLabel.destroy(),d.dataLabels&&(1===d.dataLabels.length?delete d.dataLabels:delete d.dataLabels[f]),
f||delete d.dataLabel,u&&(d.connector=d.connector.destroy(),d.connectors&&(1===d.connectors.length?delete d.connectors:delete d.connectors[f])));});});a.fireEvent(this,"afterDrawDataLabels");};v.prototype.alignDataLabel=function(a,d,e,c,g){var b=this.chart,k=this.isCartesian&&b.inverted,h=t(a.dlBox&&a.dlBox.centerX,a.plotX,-9999),m=t(a.plotY,-9999),l=d.getBBox(),p,n=e.rotation,q=e.align,u=this.visible&&(a.series.forceDL||b.isInsidePlot(h,Math.round(m),k)||c&&b.isInsidePlot(h,k?c.x+1:c.y+c.height-1,k)),
f="justify"===t(e.overflow,"justify");if(u&&(p=b.renderer.fontMetrics(b.styledMode?void 0:e.style.fontSize,d).b,c=B({x:k?this.yAxis.len-m:h,y:Math.round(k?this.xAxis.len-h:m),width:0,height:0},c),B(e,{width:l.width,height:l.height}),n?(f=!1,h=b.renderer.rotCorr(p,n),h={x:c.x+e.x+c.width/2+h.x,y:c.y+e.y+{top:0,middle:.5,bottom:1}[e.verticalAlign]*c.height},d[g?"attr":"animate"](h).attr({align:q}),m=(n+720)%360,m=180<m&&360>m,"left"===q?h.y-=m?l.height:0:"center"===q?(h.x-=l.width/2,h.y-=l.height/2):
"right"===q&&(h.x-=l.width,h.y-=m?0:l.height),d.placed=!0,d.alignAttr=h):(d.align(e,null,c),h=d.alignAttr),f&&0<=c.height?a.isLabelJustified=this.justifyDataLabel(d,e,h,l,c,g):t(e.crop,!0)&&(u=b.isInsidePlot(h.x,h.y)&&b.isInsidePlot(h.x+l.width,h.y+l.height)),e.shape&&!n))d[g?"attr":"animate"]({anchorX:k?b.plotWidth-a.plotY:a.plotX,anchorY:k?b.plotHeight-a.plotX:a.plotY});u||(d.attr({y:-9999}),d.placed=!1);};v.prototype.justifyDataLabel=function(a,d,e,c,g,h){var b=this.chart,k=d.align,m=d.verticalAlign,
l,p,n=a.box?0:a.padding||0;l=e.x+n;0>l&&("right"===k?d.align="left":d.x=-l,p=!0);l=e.x+c.width-n;l>b.plotWidth&&("left"===k?d.align="right":d.x=b.plotWidth-l,p=!0);l=e.y+n;0>l&&("bottom"===m?d.verticalAlign="top":d.y=-l,p=!0);l=e.y+c.height-n;l>b.plotHeight&&("top"===m?d.verticalAlign="bottom":d.y=b.plotHeight-l,p=!0);p&&(a.placed=!h,a.align(d,null,g));return p};n.pie&&(n.pie.prototype.dataLabelPositioners={radialDistributionY:function(a){return a.top+a.distributeBox.pos},radialDistributionX:function(a,
d,e,c){return a.getX(e<d.top+2||e>d.bottom-2?c:e,d.half,d)},justify:function(a,d,e){return e[0]+(a.half?-1:1)*(d+a.labelDistance)},alignToPlotEdges:function(a,d,e,c){a=a.getBBox().width;return d?a+c:e-a-c},alignToConnectors:function(a,d,e,c){var b=0,g;a.forEach(function(a){g=a.dataLabel.getBBox().width;g>b&&(b=g);});return d?b+c:e-b-c}},n.pie.prototype.drawDataLabels=function(){var b=this,d=b.data,g,c=b.chart,h=b.options.dataLabels,m=h.connectorPadding,n,q=c.plotWidth,u=c.plotHeight,l=c.plotLeft,D=
Math.round(c.chartWidth/3),A,z=b.center,B=z[2]/2,f=z[1],r,G,N,L,M=[[],[]],J,y,S,U,P=[0,0,0,0],T=b.dataLabelPositioners,O;b.visible&&(h.enabled||b._hasPointLabels)&&(d.forEach(function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1);}),v.prototype.drawDataLabels.apply(b),d.forEach(function(a){a.dataLabel&&(a.visible?(M[a.half].push(a),a.dataLabel._pos=null,!H(h.style.width)&&!H(a.options.dataLabels&&
a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>D&&(a.dataLabel.css({width:.7*D}),a.dataLabel.shortened=!0)):(a.dataLabel=a.dataLabel.destroy(),a.dataLabels&&1===a.dataLabels.length&&delete a.dataLabels));}),M.forEach(function(d,e){var k,p,n=d.length,w=[],v;if(n)for(b.sortByAngle(d,e-.5),0<b.maxLabelDistance&&(k=Math.max(0,f-B-b.maxLabelDistance),p=Math.min(f+B+b.maxLabelDistance,c.plotHeight),d.forEach(function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,
f-B-a.labelDistance),a.bottom=Math.min(f+B+a.labelDistance,c.plotHeight),v=a.dataLabel.getBBox().height||21,a.distributeBox={target:a.labelPosition.natural.y-a.top+v/2,size:v,rank:a.y},w.push(a.distributeBox));}),k=p+v-k,a.distribute(w,k,k/5)),U=0;U<n;U++){g=d[U];N=g.labelPosition;r=g.dataLabel;S=!1===g.visible?"hidden":"inherit";y=k=N.natural.y;w&&H(g.distributeBox)&&(void 0===g.distributeBox.pos?S="hidden":(L=g.distributeBox.size,y=T.radialDistributionY(g)));delete g.positionIndex;if(h.justify)J=
T.justify(g,B,z);else switch(h.alignTo){case "connectors":J=T.alignToConnectors(d,e,q,l);break;case "plotEdges":J=T.alignToPlotEdges(r,e,q,l);break;default:J=T.radialDistributionX(b,g,y,k);}r._attr={visibility:S,align:N.alignment};r._pos={x:J+h.x+({left:m,right:-m}[N.alignment]||0),y:y+h.y-10};N.final.x=J;N.final.y=y;t(h.crop,!0)&&(G=r.getBBox().width,k=null,J-G<m&&1===e?(k=Math.round(G-J+m),P[3]=Math.max(k,P[3])):J+G>q-m&&0===e&&(k=Math.round(J+G-q+m),P[1]=Math.max(k,P[1])),0>y-L/2?P[0]=Math.max(Math.round(-y+
L/2),P[0]):y+L/2>u&&(P[2]=Math.max(Math.round(y+L/2-u),P[2])),r.sideOverflow=k);}}),0===E(P)||this.verifyDataLabelOverflow(P))&&(this.placeDataLabels(),this.points.forEach(function(a){O=e(h,a.options.dataLabels);if(n=t(O.connectorWidth,1)){var d;A=a.connector;if((r=a.dataLabel)&&r._pos&&a.visible&&0<a.labelDistance){S=r._attr.visibility;if(d=!A)a.connector=A=c.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+a.colorIndex+(a.className?" "+a.className:"")).add(b.dataLabelsGroup),
c.styledMode||A.attr({"stroke-width":n,stroke:O.connectorColor||a.color||"#666666"});A[d?"attr":"animate"]({d:a.getConnectorPath()});A.attr("visibility",S);}else A&&(a.connector=A.destroy());}}));},n.pie.prototype.placeDataLabels=function(){this.points.forEach(function(a){var b=a.dataLabel,d;b&&a.visible&&((d=b._pos)?(b.sideOverflow&&(b._attr.width=Math.max(b.getBBox().width-b.sideOverflow,0),b.css({width:b._attr.width+"px",textOverflow:(this.options.dataLabels.style||{}).textOverflow||"ellipsis"}),
b.shortened=!0),b.attr(b._attr),b[b.moved?"animate":"attr"](d),b.moved=!0):b&&b.attr({y:-9999}));delete a.distributeBox;},this);},n.pie.prototype.alignDataLabel=q,n.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,d=this.options,c=d.center,e=d.minSize||80,g,h=null!==d.size;h||(null!==c[0]?g=Math.max(b[2]-Math.max(a[1],a[3]),e):(g=Math.max(b[2]-a[1]-a[3],e),b[0]+=(a[3]-a[1])/2),null!==c[1]?g=Math.max(Math.min(g,b[2]-Math.max(a[0],a[2])),e):(g=Math.max(Math.min(g,b[2]-a[0]-a[2]),e),
b[1]+=(a[0]-a[2])/2),g<b[2]?(b[2]=g,b[3]=Math.min(u(d.innerSize||0,g),g),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):h=!0);return h});n.column&&(n.column.prototype.alignDataLabel=function(a,d,g,c,h){var b=this.chart.inverted,k=a.series,m=a.dlBox||a.shapeArgs,n=t(a.below,a.plotY>t(this.translatedThreshold,k.yAxis.len)),l=t(g.inside,!!this.options.stacking);m&&(c=e(m),0>c.y&&(c.height+=c.y,c.y=0),m=c.y+c.height-k.yAxis.len,0<m&&(c.height-=m),b&&(c={x:k.yAxis.len-c.y-c.height,y:k.xAxis.len-
c.x-c.width,width:c.height,height:c.width}),l||(b?(c.x+=n?0:c.width,c.width=0):(c.y+=n?c.height:0,c.height=0)));g.align=t(g.align,!b||l?"center":n?"right":"left");g.verticalAlign=t(g.verticalAlign,b||l?"middle":n?"top":"bottom");v.prototype.alignDataLabel.call(this,a,d,g,c,h);a.isLabelJustified&&a.contrastColor&&d.css({color:a.contrastColor});});});J(G,"modules/overlapping-datalabels.src.js",[G["parts/Globals.js"]],function(a){var E=a.Chart,G=a.isArray,B=a.objectEach,h=a.pick,e=a.addEvent,q=a.fireEvent;
e(E,"render",function(){var a=[];(this.labelCollectors||[]).forEach(function(e){a=a.concat(e());});(this.yAxis||[]).forEach(function(e){e.options.stackLabels&&!e.options.stackLabels.allowOverlap&&B(e.stacks,function(e){B(e,function(e){a.push(e.label);});});});(this.series||[]).forEach(function(e){var q=e.options.dataLabels;e.visible&&(!1!==q.enabled||e._hasPointLabels)&&e.points.forEach(function(e){e.visible&&(G(e.dataLabels)?e.dataLabels:e.dataLabel?[e.dataLabel]:[]).forEach(function(g){var d=g.options;
g.labelrank=h(d.labelrank,e.labelrank,e.shapeArgs&&e.shapeArgs.height);d.allowOverlap||a.push(g);});});});this.hideOverlappingLabels(a);});E.prototype.hideOverlappingLabels=function(a){var e=this,h=a.length,n=e.renderer,g,d,m,b,k,p,c=function(a,b,c,d,e,g,k,h){return !(e>a+c||e+k<a||g>b+d||g+h<b)};m=function(a){var b,c,d,e=a.box?0:a.padding||0;d=0;if(a&&(!a.alignAttr||a.placed))return b=a.alignAttr||{x:a.attr("x"),y:a.attr("y")},c=a.parentGroup,a.width||(d=a.getBBox(),a.width=d.width,a.height=d.height,
d=n.fontMetrics(null,a.element).h),{x:b.x+(c.translateX||0)+e,y:b.y+(c.translateY||0)+e-d,width:a.width-2*e,height:a.height-2*e}};for(d=0;d<h;d++)if(g=a[d])g.oldOpacity=g.opacity,g.newOpacity=1,g.absoluteBox=m(g);a.sort(function(a,b){return (b.labelrank||0)-(a.labelrank||0)});for(d=0;d<h;d++)for(p=(m=a[d])&&m.absoluteBox,g=d+1;g<h;++g)if(k=(b=a[g])&&b.absoluteBox,p&&k&&m!==b&&0!==m.newOpacity&&0!==b.newOpacity&&(k=c(p.x,p.y,p.width,p.height,k.x,k.y,k.width,k.height)))(m.labelrank<b.labelrank?m:b).newOpacity=
0;a.forEach(function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&(a.alignAttr&&a.placed?(c?a.show(!0):b=function(){a.hide();},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b),q(e,"afterHideOverlappingLabels")):a.attr({opacity:c})),a.isOld=!0);});};});J(G,"parts/Interaction.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,G=a.Chart,B=a.createElement,h=a.css,e=a.defaultOptions,q=a.defaultPlotOptions,t=a.extend,u=a.fireEvent,v=a.hasTouch,n=a.isObject,g=a.isArray,d=a.Legend,
m=a.merge,b=a.pick,k=a.Point,p=a.Series,c=a.seriesTypes,x=a.svg,J;J=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,d=function(a){var b=c.getPointFromEvent(a);void 0!==b&&(c.isDirectTouch=!0,b.onMouseOver(a));},e;a.points.forEach(function(a){e=g(a.dataLabels)?a.dataLabels:a.dataLabel?[a.dataLabel]:[];a.graphic&&(a.graphic.element.point=a);e.forEach(function(b){b.div?b.div.point=a:b.element.point=a;});});a._hasTracking||(a.trackerGroups.forEach(function(e){if(a[e]){a[e].addClass("highcharts-tracker").on("mouseover",
d).on("mouseout",function(a){c.onTrackerMouseOut(a);});if(v)a[e].on("touchstart",d);!b.styledMode&&a.options.cursor&&a[e].css(h).css({cursor:a.options.cursor});}}),a._hasTracking=!0);u(this,"afterDrawTracker");},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,g=a.chart,k=g.pointer,h=g.renderer,f=g.options.tooltip.snap,m=a.tracker,n,p=function(){if(g.hoverSeries!==a)a.onMouseOver();},q="rgba(192,192,192,"+(x?.0001:.002)+")";if(e&&!c)for(n=
e+1;n--;)"M"===d[n]&&d.splice(n+1,0,d[n+1]-f,d[n+2],"L"),(n&&"M"===d[n]||n===e)&&d.splice(n,0,"L",d[n-2]+f,d[n-1]);m?m.attr({d:d}):a.graph&&(a.tracker=h.path(d).attr({visibility:a.visible?"visible":"hidden",zIndex:2}).addClass(c?"highcharts-tracker-area":"highcharts-tracker-line").add(a.group),g.styledMode||a.tracker.attr({"stroke-linejoin":"round",stroke:q,fill:c?q:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*f)}),[a.tracker,a.markerGroup].forEach(function(a){a.addClass("highcharts-tracker").on("mouseover",
p).on("mouseout",function(a){k.onTrackerMouseOut(a);});b.cursor&&!g.styledMode&&a.css({cursor:b.cursor});if(v)a.on("touchstart",p);}));u(this,"afterDrawTracker");}};c.column&&(c.column.prototype.drawTracker=J.drawTrackerPoint);c.pie&&(c.pie.prototype.drawTracker=J.drawTrackerPoint);c.scatter&&(c.scatter.prototype.drawTracker=J.drawTrackerPoint);t(d.prototype,{setItemEvents:function(a,b,c){var d=this,e=d.chart.renderer.boxWrapper,g=a instanceof k,h="highcharts-legend-"+(g?"point":"series")+"-active",
n=d.chart.styledMode;(c?b:a.legendGroup).on("mouseover",function(){d.allItems.forEach(function(b){a!==b&&b.setState("inactive",!g);});a.setState("hover");a.visible&&e.addClass(h);n||b.css(d.options.itemHoverStyle);}).on("mouseout",function(){d.styledMode||b.css(m(a.visible?d.itemStyle:d.itemHiddenStyle));d.allItems.forEach(function(b){a!==b&&b.setState("",!g);});e.removeClass(h);a.setState();}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible();};e.removeClass(h);b={browserEvent:b};a.firePointEvent?
a.firePointEvent("legendItemClick",b,c):u(a,"legendItemClick",b,c);});},createCheckboxForItem:function(a){a.checkbox=B("input",{type:"checkbox",className:"highcharts-legend-checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);E(a.checkbox,"click",function(b){u(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select();});});}});t(G.prototype,{showResetZoom:function(){function a(){b.zoomOut();}var b=this,c=e.lang,d=b.options.chart.resetZoomButton,
g=d.theme,k=g.states,h="chart"===d.relativeTo||"spaceBox"===d.relativeTo?null:"plotBox";u(this,"beforeShowResetZoom",null,function(){b.resetZoomButton=b.renderer.button(c.resetZoom,null,null,a,g,k&&k.hover).attr({align:d.position.align,title:c.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(d.position,!1,h);});u(this,"afterShowResetZoom");},zoomOut:function(){u(this,"selection",{resetSelection:!0},this.zoom);},zoom:function(c){var d=this,e,g=d.pointer,k=!1,h=d.inverted?g.mouseDownX:g.mouseDownY,
m;!c||c.resetSelection?(d.axes.forEach(function(a){e=a.zoom();}),g.initiated=!1):c.xAxis.concat(c.yAxis).forEach(function(b){var c=b.axis,l=d.inverted?c.left:c.top,m=d.inverted?l+c.width:l+c.height,n=c.isXAxis,p=!1;if(!n&&h>=l&&h<=m||n||!a.defined(h))p=!0;g[n?"zoomX":"zoomY"]&&p&&(e=c.zoom(b.min,b.max),c.displayBtn&&(k=!0));});m=d.resetZoomButton;k&&!m?d.showResetZoom():!k&&n(m)&&(d.resetZoomButton=m.destroy());e&&d.redraw(b(d.options.chart.animation,c&&c.animation,100>d.pointCount));},pan:function(a,
b){var c=this,d=c.hoverPoints,e;u(this,"pan",{originalEvent:a},function(){d&&d.forEach(function(a){a.setState();});("xy"===b?[1,0]:[1]).forEach(function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,g=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",f=c[d],l=(b.pointRange||0)/2,k=b.reversed&&!c.inverted||!b.reversed&&c.inverted?-1:1,h=b.getExtremes(),m=b.toValue(f-g,!0)+l*k,k=b.toValue(f+b.len-g,!0)-l*k,n=k<m,f=n?k:m,m=n?m:k,k=Math.min(h.dataMin,l?h.min:b.toValue(b.toPixels(h.min)-b.minPixelPadding)),
l=Math.max(h.dataMax,l?h.max:b.toValue(b.toPixels(h.max)+b.minPixelPadding)),n=k-f;0<n&&(m+=n,f=k);n=m-l;0<n&&(m=l,f-=n);b.series.length&&f!==h.min&&m!==h.max&&(b.setExtremes(f,m,!1,!1,{trigger:"pan"}),e=!0);c[d]=g;});e&&c.redraw(!1);h(c.container,{cursor:"move"});});}});t(k.prototype,{select:function(a,c){var d=this,e=d.series,g=e.chart;a=b(a,!d.selected);d.firePointEvent(a?"select":"unselect",{accumulate:c},function(){d.selected=d.options.selected=a;e.options.data[e.data.indexOf(d)]=d.options;d.setState(a&&
"select");c||g.getSelectedPoints().forEach(function(a){var b=a.series;a.selected&&a!==d&&(a.selected=a.options.selected=!1,b.options.data[b.data.indexOf(a)]=a.options,a.setState(g.hoverPoints&&b.options.inactiveOtherPoints?"inactive":""),a.firePointEvent("unselect"));});});},onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this);},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");
this.series.options.inactiveOtherPoints||(a.hoverPoints||[]).forEach(function(a){a.setState();});a.hoverPoints=a.hoverPoint=null;},importEvents:function(){if(!this.hasImportedEvents){var b=this,c=m(b.series.options.point,b.options).events;b.events=c;a.objectEach(c,function(c,d){a.isFunction(c)&&E(b,d,c);});this.hasImportedEvents=!0;}},setState:function(a,c){var d=Math.floor(this.plotX),e=this.plotY,g=this.series,k=this.state,h=g.options.states[a||"normal"]||{},m=q[g.type].marker&&g.options.marker,f=m&&
!1===m.enabled,n=m&&m.states&&m.states[a||"normal"]||{},p=!1===n.enabled,w=g.stateMarkerGraphic,v=this.marker||{},x=g.chart,B=g.halo,y,E,F,G=m&&g.markerAttribs;a=a||"";if(!(a===this.state&&!c||this.selected&&"select"!==a||!1===h.enabled||a&&(p||f&&!1===n.enabled)||a&&v.states&&v.states[a]&&!1===v.states[a].enabled)){this.state=a;G&&(y=g.markerAttribs(this,a));if(this.graphic)k&&this.graphic.removeClass("highcharts-point-"+k),a&&this.graphic.addClass("highcharts-point-"+a),x.styledMode||(E=g.pointAttribs(this,
a),F=b(x.options.chart.animation,h.animation),g.options.inactiveOtherPoints&&((this.dataLabels||[]).forEach(function(a){a&&a.animate({opacity:E.opacity},F);}),this.connector&&this.connector.animate({opacity:E.opacity},F)),this.graphic.animate(E,F)),y&&this.graphic.animate(y,b(x.options.chart.animation,n.animation,m.animation)),w&&w.hide();else{if(a&&n){k=v.symbol||g.symbol;w&&w.currentSymbol!==k&&(w=w.destroy());if(w)w[c?"animate":"attr"]({x:y.x,y:y.y});else k&&(g.stateMarkerGraphic=w=x.renderer.symbol(k,
y.x,y.y,y.width,y.height).add(g.markerGroup),w.currentSymbol=k);!x.styledMode&&w&&w.attr(g.pointAttribs(this,a));}w&&(w[a&&x.isInsidePlot(d,e,x.inverted)?"show":"hide"](),w.element.point=this);}(a=h.halo)&&a.size?(B||(g.halo=B=x.renderer.path().add((this.graphic||w).parentGroup)),B.show()[c?"animate":"attr"]({d:this.haloPath(a.size)}),B.attr({"class":"highcharts-halo highcharts-color-"+b(this.colorIndex,g.colorIndex)+(this.className?" "+this.className:""),zIndex:-1}),B.point=this,x.styledMode||B.attr(t({fill:this.color||
g.color,"fill-opacity":a.opacity},a.attributes))):B&&B.point&&B.point.haloPath&&B.animate({d:B.point.haloPath(0)},null,B.hide);u(this,"afterSetState");}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});t(p.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&u(this,"mouseOver");this.setState("hover");a.hoverSeries=this;},onMouseOut:function(){var a=this.options,
b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&u(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();b.series.forEach(function(a){a.setState("",!0);});},setState:function(a,c){var d=this,e=d.options,g=d.graph,k=e.inactiveOtherPoints,h=e.states,m=e.lineWidth,f=e.opacity,n=b(h[a||"normal"]&&h[a||"normal"].animation,d.chart.options.chart.animation),e=0;a=a||"";if(d.state!==a&&([d.group,d.markerGroup,d.dataLabelsGroup].forEach(function(b){b&&
(d.state&&b.removeClass("highcharts-series-"+d.state),a&&b.addClass("highcharts-series-"+a));}),d.state=a,!d.chart.styledMode)){if(h[a]&&!1===h[a].enabled)return;a&&(m=h[a].lineWidth||m+(h[a].lineWidthPlus||0),f=b(h[a].opacity,f));if(g&&!g.dashstyle)for(h={"stroke-width":m},g.animate(h,n);d["zone-graph-"+e];)d["zone-graph-"+e].attr(h),e+=1;k||[d.group,d.markerGroup,d.dataLabelsGroup,d.labelBySeries].forEach(function(a){a&&a.animate({opacity:f},n);});}c&&k&&d.points&&d.points.forEach(function(b){b.setState&&
b.setState(a);});},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,g,k=d.options.chart.ignoreHiddenSeries,h=c.visible;g=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!h:a)?"show":"hide";["group","dataLabelsGroup","markerGroup","tracker","tt"].forEach(function(a){if(c[a])c[a][g]();});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&d.series.forEach(function(a){a.options.stacking&&
a.visible&&(a.isDirty=!0);});c.linkedSeries.forEach(function(b){b.setVisible(a,!1);});k&&(d.isDirtyBox=!0);u(c,g);!1!==b&&d.redraw();},show:function(){this.setVisible(!0);},hide:function(){this.setVisible(!1);},select:function(a){this.selected=a=this.options.selected=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);u(this,a?"select":"unselect");},drawTracker:J.drawTrackerGraph});});J(G,"parts/Responsive.js",[G["parts/Globals.js"]],function(a){var E=a.Chart,G=a.isArray,B=a.isObject,h=
a.pick,e=a.splat;E.prototype.setResponsive=function(e,h){var q=this.options.responsive,t=[],n=this.currentResponsive;!h&&q&&q.rules&&q.rules.forEach(function(g){void 0===g._id&&(g._id=a.uniqueKey());this.matchResponsiveRule(g,t,e);},this);h=a.merge.apply(0,t.map(function(e){return a.find(q.rules,function(a){return a._id===e}).chartOptions}));h.isResponsiveOptions=!0;t=t.toString()||void 0;t!==(n&&n.ruleIds)&&(n&&this.update(n.undoOptions,e,!0),t?(n=this.currentOptions(h),n.isResponsiveOptions=!0,this.currentResponsive=
{ruleIds:t,mergedOptions:h,undoOptions:n},this.update(h,e,!0)):this.currentResponsive=void 0);};E.prototype.matchResponsiveRule=function(a,e){var q=a.condition;(q.callback||function(){return this.chartWidth<=h(q.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=h(q.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=h(q.minWidth,0)&&this.chartHeight>=h(q.minHeight,0)}).call(this)&&e.push(a._id);};E.prototype.currentOptions=function(q){function t(n,g,d,m){var b;a.objectEach(n,function(a,n){if(!m&&-1<u.collectionsWithUpdate.indexOf(n))for(a=
e(a),d[n]=[],b=0;b<a.length;b++)g[n][b]&&(d[n][b]={},t(a[b],g[n][b],d[n][b],m+1));else B(a)?(d[n]=G(a)?[]:{},t(a,g[n]||{},d[n],m+1)):d[n]=h(g[n],null);});}var u=this,v={};t(q,this.options,v,0);return v};});J(G,"masters/highcharts.src.js",[G["parts/Globals.js"]],function(a){return a});G["masters/highcharts.src.js"]._modules=G;return G["masters/highcharts.src.js"]});

});

var highchartsReact_min = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t(React__default,highcharts);}("undefined"!=typeof self?self:commonjsGlobal,function(e,t){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n});},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,r){function n(e){return e&&e.__esModule?e:{default:e}}function o(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t);}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);}return e},s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n);}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),f=r(1),p=n(f),l=r(2),h=n(l),y=function(e){function t(e){a(this,t);var r=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.container=p.default.createRef(),r}return c(t,e),s(t,[{key:"createChart",value:function(){var e=this.props,t=e.highcharts||h.default,r=e.constructorType||"chart";t?t[r]?e.options?this.chart=t[r](this.container.current,e.options,e.callback?e.callback:void 0):console.warn('The "options" property was not passed.'):console.warn('The "constructorType" property is incorrect or some required module is not imported.'):console.warn('The "highcharts" property was not passed.');}},{key:"componentDidMount",value:function(){this.createChart();}},{key:"componentDidUpdate",value:function(){var e=this.props;if(!1!==e.allowChartUpdate)if(!e.immutable&&this.chart){var t;(t=this.chart).update.apply(t,[e.options].concat(o(e.updateArgs||[!0,!0])));}else this.createChart();}},{key:"componentWillUnmount",value:function(){this.chart&&(this.chart.destroy(),this.chart=null);}},{key:"render",value:function(){return p.default.createElement("div",u({},this.props.containerProps,{ref:this.container}))}}]),t}(p.default.PureComponent);t.default=y;},function(t,r){t.exports=e;},function(e,r){e.exports=t;}])});

});

var HighchartsReact = unwrapExports(highchartsReact_min);
var highchartsReact_min_1 = highchartsReact_min.HighchartsReact;

var LineChart =
/*#__PURE__*/
function (_Component) {
  _inherits(LineChart, _Component);

  function LineChart(props) {
    var _this;

    _classCallCheck(this, LineChart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LineChart).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "errorMessage", function (errorType) {
      var message;

      if (errorType === 'typeOfVariable') {
        message = React__default.createElement("h1", null, "type is invalid");
      }

      if (errorType === 'haveData') {
        message = React__default.createElement("h1", null, "No data is provided");
      }

      if (errorType === 'haveValidKey') {
        message = React__default.createElement("h1", null, "Object Key is invalid");
      }

      return React__default.createElement("div", null, message);
    });

    _defineProperty(_assertThisInitialized(_this), "renderLineChart", function (options) {
      return React__default.createElement(HighchartsReact, {
        highcharts: highcharts,
        options: options
      });
    });

    _this.options = {
      chart: {
        type: 'line',
        width: '1158',
        height: '408',
        backgroundColor: '#f7fafb'
      },
      title: {
        text: _this.props.title
      },
      series: _this.props.data,
      xAxis: {
        categories: _this.props.xAxisCategory,
        title: {
          text: _this.props.xAxisTitle,
          align: _this.props.xAxisTitleAlign
        },
        tickAmount: _this.props.xAxisTickAmount,
        tickInterval: _this.props.xAxisTickInterval
      },
      yAxis: {
        max: 1,
        title: {
          text: _this.props.yAxisTitle,
          align: _this.props.yAxisTitleAlign
        },
        tickAmount: _this.props.yAxisTickAmount,
        tickInterval: _this.props.yAxisTickInterval
      },
      legend: {
        enabled: false
      },
      tooltip: {
        backgroundColor: '#ffffff',
        opacity: 0.96,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#505050',
        padding: 8,
        formatter: function formatter() {
          return this.y;
        },
        style: {
          fontFamily: 'Spoqa Han Sans, Spoqa Han Sans JP, Sans-serif',
          fontSize: 16,
          fontWeight: 'bold',
          fontStyle: 'normal',
          fontStretch: 'normal',
          lineHeight: 'normal',
          letterSpacing: -0.5,
          color: '#202020'
        }
      },
      plotOptions: {
        series: {
          marker: {
            radius: 5,
            width: 10,
            height: 10
          },
          color: {
            linearGradient: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 1
            },
            stops: [[0, '#002d4f'], [1, '#189bff']]
          }
        }
      }
    };
    return _this;
  }

  _createClass(LineChart, [{
    key: "render",
    value: function render() {
      var data = this.props.data;

      if (isEmpty_1(data)) {
        return this.errorMessage('haveData');
      }

      if (!Array.isArray(data)) {
        return this.errorMessage('typeOfVariable');
      }

      return React__default.createElement("div", null, this.renderLineChart(this.options));
    }
  }]);

  return LineChart;
}(React.Component);

LineChart.defaultProps = {
  title: 'Line Chart',
  data: [],
  xAxisCategory: [],
  xAxisTitle: 'xAxis',
  xAxisTitleAlign: 'middle',
  yAxisTitle: 'yAxis',
  yAxisTitleAlign: 'middle'
};

var css$5 = ".Timeline_timelineChart__3-Cf0 {\n  position: relative;\n}\n\n/* xAxis */\n.Timeline_xAxis__1hoKI, .Timeline_overViewXAxis__1DOvh {\n  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';\n  font-size: 14px;\n  font-weight: normal;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: normal;\n  letter-spacing: -0.5px;\n  text-align: center;\n  color: rgba(0, 0, 0, 0.6);\n}\n/* labels */\n.Timeline_labels__38Ge3 text {\n  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';\n  font-size: 14px;\n  font-weight: normal;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: normal;\n  letter-spacing: -0.5px;\n  text-align: right;\n  fill: rgba(0, 0, 0, 0.6);\n}\n/* labels */\n.Timeline_labels__38Ge3 text:nth-child(n + 4) {\n  fill: rgba(0, 0, 0, 0.3);\n}\n.Timeline_verticalLineText__14s5V {\n  width: 61px;\n  height: 18px;\n  opacity: 0.8;\n  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';\n  font-size: 12px;\n  font-weight: bold;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: normal;\n  letter-spacing: -0.4px;\n  text-align: center;\n  fill: #000000;\n}\n/* overview axis style */\n.Timeline_overViewXAxisGrid__29xyk path {\n  fill: #003964;\n  opacity: 0.24;\n}\n\n/* tooltip  */\n.Timeline_tooltip__2qJdw {\n  position: absolute;\n  width: 184px;\n  height: 73.2px;\n  border-radius: 5px;\n  box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.1);\n  border: solid 1px #505050;\n  background-color: rgba(255, 255, 255, 0.8);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.Timeline_tooltip__2qJdw .Timeline_tooltipDay__2iE2o {\n  /* width: 152px; */\n  height: 20px;\n  opacity: 0.8;\n  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';\n  font-size: 14px;\n  font-weight: normal;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: normal;\n  letter-spacing: -0.5px;\n  color: #000000;\n}\n\n.Timeline_tooltip__2qJdw .Timeline_tooltipLabel__2cWHt {\n  /* width: 152px; */\n  height: 20px;\n  opacity: 0.8;\n  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';\n  font-size: 14px;\n  font-weight: bold;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: normal;\n  letter-spacing: -0.5px;\n  color: #000000;\n  margin-bottom: 5px\n}\n\n.Timeline_dot__QBZ1F {\n  height: 10px;\n  width: 10px;\n  background-color: #a5e2d7;\n  border-radius: 5px;\n  display: inline-block;\n}";
var styles$5 = {"timelineChart":"Timeline_timelineChart__3-Cf0","xAxis":"Timeline_xAxis__1hoKI","overViewXAxis":"Timeline_overViewXAxis__1DOvh","labels":"Timeline_labels__38Ge3","verticalLineText":"Timeline_verticalLineText__14s5V","overViewXAxisGrid":"Timeline_overViewXAxisGrid__29xyk","tooltip":"Timeline_tooltip__2qJdw","tooltipDay":"Timeline_tooltipDay__2iE2o","tooltipLabel":"Timeline_tooltipLabel__2cWHt","dot":"Timeline_dot__QBZ1F"};
styleInject(css$5);

var Timeline =
/*#__PURE__*/
function (_Component) {
  _inherits(Timeline, _Component);

  function Timeline() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Timeline);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Timeline)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "errorMessage", function (errorType) {
      var message;

      if (errorType === 'typeOfVariable') {
        message = 'type is invalid';
      }

      if (errorType === 'haveData') {
        message = 'No data is provided';
      }

      select(".".concat(styles$5.timelineChart)).append('div').text(message);
    });

    _defineProperty(_assertThisInitialized(_this), "renderTimeline", function (data) {
      var timelineData = data; // createFormattedSampledData()

      var xAxisHeight = 32; // Time legend (X-axis) height

      var yAxisWidth = 134; // Labels (Y-axis) width

      var overViewAxisHeight = 50;
      var height = 521; // Entire height

      var width = 1152; // Entire width

      var defaultPadding = 20;
      var xAxisWidth = width - yAxisWidth - defaultPadding;
      var svg = renderSVG(select(".".concat(styles$5.timelineChart)), width, height); // Create xAxis
      // 1. Get min, max time

      var _getStartAndEndTime = getStartAndEndTime(timelineData.map(function (d) {
        return d.dataPoints;
      }).flat()),
          startTime = _getStartAndEndTime.startTime,
          endTime = _getStartAndEndTime.endTime; // 2. Create x axis scale


      var xAxisScale = time().domain([startTime, endTime]).range([0, xAxisWidth]); // 3. Create xAxis

      var xAxis = axisTop(xAxisScale); // Create groups
      // 1. Entire timeline group

      var gTimeline = generateGroup(svg, {
        className: 'timeline'
      }); // 2. xAxis group

      var gXAxis = generateGroup(gTimeline, {
        className: styles$5.xAxis,
        xOffset: yAxisWidth + defaultPadding + 25,
        yOffset: xAxisHeight
      }); //  3. labels group

      var gLabels = generateGroup(gTimeline, {
        className: styles$5.labels,
        xOffset: 25,
        yOffset: 60
      });
      var labelStartYPosition = 0;
      var labelLastYPosition = 348; // Create y axis scale

      var yAxisScale = point$1().domain(labelList(timelineData)).range([labelStartYPosition, labelLastYPosition]); // Render elements
      // 1. x Axis

      gXAxis.call(xAxis);
      gXAxis.selectAll('.domain').attr('stroke', '#c4c4c4').attr('d', 'M0.5 0V0.5H998.5V-6');
      gXAxis.selectAll('.tick line').remove(); // 2. labels

      gLabels.selectAll('.label').data(timelineData).enter().append('text').text(function (d) {
        return d.label[d.label.length - 1];
      }).attr('x', yAxisWidth).attr('y', function (d) {
        return yAxisScale(d.label[d.label.length - 1]);
      }).attr('dx', -15).attr('dy', '.5ex').attr('text-anchor', 'end').attr('class', 'label'); // Creat Grid Group

      var gGrid = generateGroup(gTimeline, {
        className: 'grid',
        xOffset: yAxisWidth + defaultPadding + 25,
        yOffset: xAxisHeight
      }); // Create YAxis GridLines

      var yAxisGridHeight = height - xAxisHeight - 82;
      var yAxisGridLines = axisTop(xAxisScale).tickSize(-yAxisGridHeight).tickFormat(''); // Render YAxis Gridlines

      var gYAxisGrid = gGrid.append('g').attr('class', 'yAxisGrid').call(yAxisGridLines);
      gYAxisGrid.selectAll('.tick line').attr('stroke', '#e8e8e8').attr('stroke-dasharray', '2');
      gYAxisGrid.select('.domain').remove(); // Creat XAxis GridLines

      var xAxisGridLines = axisRight(yAxisScale).tickSize(xAxisWidth).tickFormat(''); // Render XAxis Gridlines

      var gXAxisGrid = gGrid.append('g').attr('class', 'xAxisGrid').attr('transform', 'translate(0, 23.5)').call(xAxisGridLines);
      gXAxisGrid.selectAll('.tick line').attr('stroke', '#e8e8e8');
      gXAxisGrid.select('.domain').remove(); // add vertical line

      var lineScale = time().domain([startTime, endTime]).range([yAxisWidth + defaultPadding + 25 - 1, width]);
      var verticalLineText = svg.append('text').attr('class', styles$5.verticalLineText).attr('y', 42);

      var mouseover = function mouseover() {
        focus.style('opacity', 1);
        verticalLineText.style('opacity', 1);
      };

      var mousemove = function mousemove(d, i, nodes) {
        var date = xAxisScale.invert(mouse(nodes[i])[0]);
        var linePositionX = Date.parse(date);
        focus.attr('x1', xAxisScale(linePositionX)).attr('x2', xAxisScale(linePositionX)).attr('y1', 32).attr('y2', 439).attr('stroke', '#58595a');
        verticalLineText.text(timeFormat('%Y.%m.%d')(lineScale.invert(mouse(nodes[i])[0]))).attr('x', xAxisScale(linePositionX));
      };

      var mouseout = function mouseout() {
        focus.style('opacity', 0);
        verticalLineText.style('opacity', 0);
      };

      var verticalLine = gTimeline.append('rect').style('fill', 'none').style('pointer-events', 'all').attr('x', 179).attr('y', 32).attr('width', xAxisWidth).attr('height', height - xAxisHeight - overViewAxisHeight).on('mouseover', mouseover).on('mousemove', mousemove).on('mouseout', mouseout); // Add color scale 

      var circleColorScale = ordinal().domain(labelList(timelineData)).range(['#00745e', '#faafa5', '#002d4f', '#a5a9ac', '#b5bbc0', '#c2cad0', '#cbd4da', '#d3dee6', '#dee6ec']);
      var rectColorScale = ordinal().domain(labelList(timelineData)).range(['#27b097', '#fa6b57', '#002d4f', '#a5a9ac', '#b5bbc0', '#c2cad0', '#cbd4da', '#d3dee6', '#dee6ec']);
      var legendColorScale = ordinal(Paired); // Add tooltip

      var tooltip = select(".".concat(styles$5.timelineChart)).append('div').attr('class', styles$5.tooltip).style('opacity', 0); //  Create Data Group

      var gData = generateGroup(gTimeline, {
        className: 'data',
        xOffset: yAxisWidth + defaultPadding + 25,
        yOffset: xAxisHeight
      }); //  Add Circle Group

      timelineData.forEach(function (data, idx) {
        gData.append('g').attr('class', function (d) {
          return "circles-".concat(idx);
        }).selectAll('circle').data(circleDataFilter(data.dataPoints)).enter().append('circle').attr('cx', function (d, i) {
          return xAxisScale(Date.parse(d.startTime));
        }).attr('cy', yAxisScale(data.label[data.label.length - 1]) + 23.5).attr('r', 7.5).attr('fill', circleColorScale(data.label[data.label.length - 1])).attr('clip-path', 'url(#clip)').on('mouseover', function (d, i, nodes) {
          var _d3$mouse = mouse(nodes[i]),
              _d3$mouse2 = _slicedToArray(_d3$mouse, 2),
              x = _d3$mouse2[0],
              y = _d3$mouse2[1];

          var label = data.label[data.label.length - 1];
          var tooltipDescription = "\n            <div>\n              <div class=".concat(styles$5.tooltipLabel, "><span class=").concat(styles$5.dot, "></span> ").concat(label, "</div>\n              <div class=").concat(styles$5.tooltipDay, ">").concat(timeFormat('%Y.%m.%d')(new Date(d.startTime)), " ~ ").concat(timeFormat('%Y.%m.%d')(new Date(d.endTime)), "</div>\n            </div>\n            ");
          tooltip.transition().duration(200).style('opacity', 1);
          tooltip.style('left', "".concat(x + 200, "px")).style('top', "".concat(y - 20, "px")).style('pointer-events', 'none').html(tooltipDescription);
        }).on('mouseout', function (d) {
          return tooltip.transition().duration(200).style('opacity', 0);
        });
      }); // Add Rect Group

      timelineData.forEach(function (data, idx) {
        gData.append('g').attr('class', "rects-".concat(idx)).selectAll('rect').data(rectDataFilter(data.dataPoints)).enter().append('rect').attr('x', function (d, i) {
          return xAxisScale(Date.parse(d.startTime));
        }).attr('y', yAxisScale(data.label[data.label.length - 1]) + 16).attr('height', 15).attr('width', function (d) {
          return xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime));
        }).attr('fill', rectColorScale(data.label[data.label.length - 1])).attr('clip-path', 'url(#clip)').on('mouseover', function (d, i, nodes) {
          var _d3$mouse3 = mouse(nodes[i]),
              _d3$mouse4 = _slicedToArray(_d3$mouse3, 2),
              x = _d3$mouse4[0],
              y = _d3$mouse4[1];

          var label = data.label[data.label.length - 1];
          var tooltipDescription = "\n            <div>\n              <div class=".concat(styles$5.tooltipLabel, "><span class=").concat(styles$5.dot, "></span> ").concat(label, "</div>\n              <div class=").concat(styles$5.tooltipDay, ">").concat(timeFormat('%Y.%m.%d')(new Date(d.startTime)), " ~ ").concat(timeFormat('%Y.%m.%d')(new Date(d.endTime)), "</div>\n            </div>\n            ");
          tooltip.transition().duration(200).style('opacity', 1);
          tooltip.style('left', "".concat(x + 200, "px")).style('top', "".concat(y - 20, "px")).style('pointer-events', 'none').html(tooltipDescription);
        }).on('mouseout', function (d) {
          return tooltip.transition().duration(200).style('opacity', 0);
        });
      }); // add clip (avoid displaying the circle and rect outside the chart area)

      var clip = gTimeline.append('defs').append('clipPath').attr('id', 'clip').append('rect').attr('x', 0).attr('y', 0).attr('width', xAxisWidth).attr('height', height - overViewAxisHeight - xAxisHeight * 2); // overviewAxis

      var gOverViewAxis = generateGroup(gTimeline, {
        className: 'overViewAxis',
        xOffset: yAxisWidth + defaultPadding + 25,
        yOffset: height - overViewAxisHeight - xAxisHeight
      });
      var overViewGrid = generateGroup(gOverViewAxis, {
        className: styles$5.overViewXAxisGrid,
        xOffset: 0,
        yOffset: 0
      }).call(axisTop(xAxisScale).tickSize(-overViewAxisHeight).tickFormat(''));
      overViewGrid.selectAll('.domain').attr('stroke', '#003964');
      overViewGrid.selectAll('.tick line').attr('stroke', 'none');
      var overViewXAxis = generateGroup(gOverViewAxis, {
        className: styles$5.overViewXAxis,
        xOffset: 0,
        yOffset: overViewAxisHeight + 10
      }).call(axisBottom(xAxisScale).tickPadding(0));
      overViewXAxis.selectAll('.domain').remove();
      overViewXAxis.selectAll('.tick line').remove();
      gTimeline.append('line').attr('x1', yAxisWidth + defaultPadding + 25).attr('x2', width).attr('y1', height - overViewAxisHeight - xAxisHeight).attr('y2', height - overViewAxisHeight - xAxisHeight).attr('stroke', '#003964');
      gTimeline.append('line').attr('x1', yAxisWidth + defaultPadding + 25).attr('x2', width).attr('y1', height - xAxisHeight).attr('y2', height - xAxisHeight).attr('stroke', '#003964'); // Add brush

      var brushLeftTopPositionX = 0;
      var brushLeftTopPositionY = 0;
      var brushRightTopPositionX = xAxisWidth;
      var brushRightTopPositionY = overViewAxisHeight;

      var brushed = function brushed() {
        var brushEvent = _this.props.brushEvent;
        var selection = event.selection;
        if (selection === null) return;

        var _selection = _slicedToArray(selection, 2),
            brushStart = _selection[0],
            brushEnd = _selection[1];

        var start = overViewXAxisScale.invert(brushStart);
        var end = overViewXAxisScale.invert(brushEnd);
        var time = {
          start: start,
          end: end
        };
        xAxisScale.domain([Date.parse(start), Date.parse(end)]);
        lineScale.domain([Date.parse(start), Date.parse(end)]);
        typeof brushEvent === "function" ? brushEvent(time) : null;
        gXAxis.transition().duration(500).call(xAxis);
        gXAxis.selectAll('.domain').attr('stroke', '#c4c4c4').attr('d', 'M0.5 0V0.5H998.5V-6');
        gXAxis.selectAll('.tick line').remove();
        gYAxisGrid.selectAll('tick').remove();
        var yAxisGridLines = axisTop(xAxisScale).tickSize(-yAxisGridHeight).tickFormat('');
        gYAxisGrid.transition().duration(500).call(yAxisGridLines);
        gYAxisGrid.selectAll('.tick line').attr('stroke', '#e8e8e8').attr('stroke-dasharray', '2');
        gYAxisGrid.select('.domain').remove();
        gData.selectAll('circle').transition().duration(500).attr('cx', function (d, i) {
          return xAxisScale(Date.parse(d.startTime));
        }).attr('clip-path', 'url(#clip)');
        gData.selectAll('rect').transition().duration(500).attr('x', function (d, i) {
          return xAxisScale(Date.parse(d.startTime));
        }).attr('width', function (d) {
          return xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime));
        }).attr('clip-path', 'url(#clip)');
      };

      var brush = brushX().extent([[brushLeftTopPositionX, brushLeftTopPositionY], [brushRightTopPositionX, brushRightTopPositionY]]).on('end', brushed);
      var overViewXAxisScale = time().domain([startTime, endTime]).range([0, xAxisWidth]);
      var gBrush = generateGroup(gOverViewAxis, {
        className: 'overViewXAxisBrush'
      });
      gBrush.call(brush); // add reset

      select('#reset').on('click', function () {
        var brushEvent = _this.props.brushEvent;
        xAxisScale.domain(overViewXAxisScale.domain());
        lineScale.domain(overViewXAxisScale.domain());
        gXAxis.selectAll('.domain').attr('stroke', '#c4c4c4').attr('d', 'M 0.5 0V0.5H998.5V-6');
        gXAxis.selectAll('.tick line').remove();
        var yAxisGridLines = axisTop(xAxisScale).tickSize(-yAxisGridHeight).tickFormat('');
        gYAxisGrid.transition().duration(500).call(yAxisGridLines);
        gYAxisGrid.selectAll('.tick line').attr('stroke', '#e8e8e8').attr('stroke-dasharray', '2');
        gYAxisGrid.select('.domain').remove();
        gXAxis.transition().duration(500).call(xAxis);
        gBrush.select('rect.selection').transition().duration(500).attr('width', 0);
        gData.selectAll('circle').transition().duration(500).attr('cx', function (d, i) {
          return xAxisScale(Date.parse(d.startTime));
        });
        gData.selectAll('rect').transition().duration(500).attr('x', function (d, i) {
          return xAxisScale(Date.parse(d.startTime));
        }).attr('width', function (d) {
          return xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime));
        });
        typeof brushEvent === "function" ? brushEvent() : null;
      });
      var focus = gTimeline.append('line').attr('class', 'focus').attr('fill', 'none').style('pointer-events', 'none');
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      var data = _this.props.data;

      if (isEmpty_1(data)) {
        return _this.errorMessage('haveData');
      }

      if (!Array.isArray(data)) {
        return _this.errorMessage('typeOfVariable');
      }

      return _this.renderTimeline(data);
    });

    return _this;
  }

  _createClass(Timeline, [{
    key: "render",
    value: function render() {
      return React__default.createElement("div", {
        className: styles$5.timelineChart
      });
    }
  }]);

  return Timeline;
}(React.Component);

var css$6 = ".LineMergeTimeline_timelineChart__K_r5D {\n  position: relative;\n}\n\n.LineMergeTimeline_title__23LoL {\n  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';\n  font-size: 14px;\n  font-weight: bold;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: normal;\n  letter-spacing: -0.5px;\n  text-align: center;\n  color: #000000;\n  opacity: 0.6;      \n}\n\n/* xAxis */\n.LineMergeTimeline_xAxis__1XWOw, .LineMergeTimeline_overViewXAxis__2OOtr {\n  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';\n  font-size: 14px;\n  font-weight: normal;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: normal;\n  letter-spacing: -0.5px;\n  text-align: center;\n  color: rgba(0, 0, 0, 0.6);\n}\n/* labels */\n.LineMergeTimeline_timelineLabels__3hBbH text, .LineMergeTimeline_gLineYAxis__2XLPB {\n  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';\n  font-size: 14px;\n  font-weight: normal;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: normal;\n  letter-spacing: -0.5px;\n  text-align: right;\n  fill: rgba(0, 0, 0, 0.3);\n  color: rgba(0, 0, 0, 0.3);\n}\n\n.LineMergeTimeline_verticalLineText__26Jw4 {\n  width: 61px;\n  height: 18px;\n  opacity: 0.8;\n  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';\n  font-size: 12px;\n  font-weight: bold;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: normal;\n  letter-spacing: -0.4px;\n  text-align: center;\n  fill: #000000;\n}\n/* overview axis style */\n.LineMergeTimeline_overViewXAxisGrid__KqAml path {\n  fill: #003964;\n  opacity: 0.24;\n}\n\n/* tooltip  */\n.LineMergeTimeline_tooltip__2eLDR {\n  position: absolute;\n  width: 184px;\n  height: 73.2px;\n  border-radius: 5px;\n  box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.1);\n  border: solid 1px #505050;\n  background-color: rgba(255, 255, 255, 0.8);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.LineMergeTimeline_tooltip__2eLDR .LineMergeTimeline_tooltipDay__2qZte {\n  /* width: 152px; */\n  height: 20px;\n  opacity: 0.8;\n  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';\n  font-size: 14px;\n  font-weight: normal;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: normal;\n  letter-spacing: -0.5px;\n  color: #000000;\n}\n\n.LineMergeTimeline_tooltip__2eLDR .LineMergeTimeline_tooltipLabel__KjfSB {\n  /* width: 152px; */\n  height: 20px;\n  opacity: 0.8;\n  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';\n  font-size: 14px;\n  font-weight: bold;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: normal;\n  letter-spacing: -0.5px;\n  color: #000000;\n  margin-bottom: 5px\n}\n\n.LineMergeTimeline_dot__3kjm_ {\n  height: 10px;\n  width: 10px;\n  background-color: #a5e2d7;\n  border-radius: 5px;\n  display: inline-block;\n}";
var styles$6 = {"timelineChart":"LineMergeTimeline_timelineChart__K_r5D","title":"LineMergeTimeline_title__23LoL","xAxis":"LineMergeTimeline_xAxis__1XWOw","overViewXAxis":"LineMergeTimeline_overViewXAxis__2OOtr","timelineLabels":"LineMergeTimeline_timelineLabels__3hBbH","gLineYAxis":"LineMergeTimeline_gLineYAxis__2XLPB","verticalLineText":"LineMergeTimeline_verticalLineText__26Jw4","overViewXAxisGrid":"LineMergeTimeline_overViewXAxisGrid__KqAml","tooltip":"LineMergeTimeline_tooltip__2eLDR","tooltipDay":"LineMergeTimeline_tooltipDay__2qZte","tooltipLabel":"LineMergeTimeline_tooltipLabel__KjfSB","dot":"LineMergeTimeline_dot__3kjm_"};
styleInject(css$6);

var LineMergeTimeline =
/*#__PURE__*/
function (_Component) {
  _inherits(LineMergeTimeline, _Component);

  function LineMergeTimeline(props) {
    var _this;

    _classCallCheck(this, LineMergeTimeline);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LineMergeTimeline).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "errorMessage", function (errorType) {
      var message;

      if (errorType === 'typeOfVariable') {
        message = 'type is invalid';
      }

      if (errorType === 'haveData') {
        message = 'No data is provided';
      }

      select(".".concat(styles$6.timelineChart)).append('div').text(message);
    });

    _defineProperty(_assertThisInitialized(_this), "createXAxis", function (xAxis) {
      var _this$options = _this.options,
          yAxisWidth = _this$options.yAxisWidth,
          xAxisHeight = _this$options.xAxisHeight; // Create xAxis
      // 1. Create xAxis group

      var gXAxis = generateGroup(select('.timeline'), {
        className: styles$6.xAxis,
        xOffset: yAxisWidth,
        yOffset: xAxisHeight
      }); // 2. Render xAxis

      gXAxis.call(xAxis);
      gXAxis.selectAll('.domain').attr('stroke', '#c4c4c4').attr('d', 'M0.5 0V0.5H962.5 V0.5');
      gXAxis.selectAll('.tick line').remove();
    });

    _defineProperty(_assertThisInitialized(_this), "createLineYAxis", function (lineYAxisScale) {
      var _this$options2 = _this.options,
          yAxisWidth = _this$options2.yAxisWidth,
          xAxisHeight = _this$options2.xAxisHeight; // 1. Create Line YAxis group

      var gLineYAxis = generateGroup(select('.timeline'), {
        className: styles$6.gLineYAxis,
        xOffset: yAxisWidth,
        yOffset: xAxisHeight
      }); // 2. Create Line YAxis

      var lineYAxis = axisLeft(lineYAxisScale).tickValues([0, 0.25, 0.5, 0.75, 1]).tickFormat(function (d) {
        return "".concat(d);
      }).tickPadding(17); // 3. Add LineTitle

      var lineTitle = select('.timeline').append('text').text('MACE Risk by Visit').attr('text-anchor', 'end').attr('dx', -23).attr('x', yAxisWidth).attr('y', xAxisHeight + 6).attr('class', styles$6.title); // 4. Render Line YAxis 

      gLineYAxis.call(lineYAxis);
      gLineYAxis.selectAll('.domain').remove();
      gLineYAxis.selectAll('.tick line').remove();
    });

    _defineProperty(_assertThisInitialized(_this), "createLineGrid", function (xAxisScale, lineYAxisScale) {
      var _this$options3 = _this.options,
          xAxisHeight = _this$options3.xAxisHeight,
          yAxisWidth = _this$options3.yAxisWidth,
          defaultPadding = _this$options3.defaultPadding,
          lineYAxisHeight = _this$options3.lineYAxisHeight; // 1. Creat  Entire LineGrid Group

      var gLineGrid = generateGroup(select('.timeline'), {
        className: 'gLineGrid',
        xOffset: yAxisWidth,
        yOffset: xAxisHeight
      }); // 2. Create Line YAxis GridLines

      var lineYAxisGridLines = axisTop(xAxisScale).tickSize(-lineYAxisHeight).tickFormat(''); // 3. Render Line YAxis Gridlines

      var gLineYAxisGrid = gLineGrid.append('g').attr('class', 'lineYAxisGrid').call(lineYAxisGridLines); // 4. CSS Line YAxis

      gLineYAxisGrid.selectAll('.tick line').attr('stroke', '#e8e8e8').attr('stroke-dasharray', '2');
      gLineYAxisGrid.select('.domain').remove(); // 1. Creat Line XAxis GridLines

      var lineXAxisGridLines = axisRight(lineYAxisScale).tickValues([0, 0.25, 0.5, 0.75, 1]).tickSize(_this.xAxisWidth + defaultPadding.right).tickFormat(''); // 2. Render Line XAxis Gridlines

      var gLineXAxisGrid = gLineGrid.append('g').attr('class', 'lineXAxisGrid').call(lineXAxisGridLines); // 3. CSS Line XAxis

      gLineXAxisGrid.selectAll('.tick line').attr('stroke', '#e8e8e8').attr('x2', _this.xAxisWidth);
      gLineXAxisGrid.select('.domain').remove();
    });

    _defineProperty(_assertThisInitialized(_this), "createVerticalLine", function (svg, xAxisScale, lineScale) {
      var _this$options4 = _this.options,
          xAxisHeight = _this$options4.xAxisHeight,
          yAxisWidth = _this$options4.yAxisWidth,
          defaultPadding = _this$options4.defaultPadding,
          height = _this$options4.height,
          overViewAxisHeight = _this$options4.overViewAxisHeight; // Create Entire Vertical Line      

      var focus = select('.timeline').append('line').attr('class', 'focus').attr('fill', 'none').style('pointer-events', 'none'); // 1. Create vertical line text

      var verticalLineText = svg.append('text').attr('class', styles$6.verticalLineText).attr('y', xAxisHeight); // 2. Create vertical line mouse event 

      var mouseover = function mouseover() {
        focus.style('opacity', 1);
        verticalLineText.style('opacity', 1);
      };

      var mousemove = function mousemove(d, i, nodes) {
        var date = xAxisScale.invert(mouse(nodes[i])[0]);
        var linePositionX = Date.parse(date);
        focus.attr('x1', xAxisScale(linePositionX)).attr('x2', xAxisScale(linePositionX)).attr('y1', xAxisHeight).attr('y2', height - xAxisHeight - overViewAxisHeight).attr('stroke', '#58595a');
        verticalLineText.text(timeFormat('%Y.%m.%d')(lineScale.invert(mouse(nodes[i])[0]))).attr('x', xAxisScale(linePositionX));
      };

      var mouseout = function mouseout() {
        focus.style('opacity', 0);
        verticalLineText.style('opacity', 0);
      }; // 3. Create Vertical Area and Add Mouse Event


      var verticalLine = select('.timeline').append('rect').style('fill', 'none').style('pointer-events', 'all').attr('x', yAxisWidth).attr('y', xAxisHeight).attr('width', _this.xAxisWidth).attr('height', height - xAxisHeight - overViewAxisHeight - defaultPadding.bottom).on('mouseover', mouseover).on('mousemove', mousemove).on('mouseout', mouseout);
    });

    _defineProperty(_assertThisInitialized(_this), "renderLineChart", function (svg, lineChartData, xAxisScale, lineYAxisScale, line) {
      var _this$options5 = _this.options,
          yAxisWidth = _this$options5.yAxisWidth,
          xAxisHeight = _this$options5.xAxisHeight,
          defaultPadding = _this$options5.defaultPadding,
          lineYAxisHeight = _this$options5.lineYAxisHeight; // Create Line Chart
      //  Create Line Color Gradient

      var defs = svg.append("defs");
      var gradient = defs.append("linearGradient").attr("id", "svgGradient").attr("x1", "0%").attr("x2", "0%").attr("y1", "0%").attr("y2", "100%");
      gradient.append("stop").attr('class', 'start').attr("offset", "0%").attr("stop-color", "#002d4f").attr("stop-opacity", 1);
      gradient.append("stop").attr('class', 'end').attr("offset", "100%").attr("stop-color", "#189bff").attr("stop-opacity", 1); //  Create Line Point Gradient

      var colorScale = linear$2().domain([defaultPadding.top, lineYAxisHeight]).range(["#002d4f", "#189bff"]); // 1. Create Line Chart group

      var gLine = generateGroup(select('.timeline'), {
        className: 'gLine',
        xOffset: yAxisWidth,
        yOffset: xAxisHeight
      }); // 2. Render Line Chart

      gLine.append('g').append("path").datum(lineChartData).attr("class", "line").attr("fill", "none").attr("stroke", "url(#svgGradient)").attr("stroke-width", 2).attr("d", line); // 3. Render Line Point

      gLine.append('g').selectAll(".lineDot").data(lineChartData).enter().append("circle").attr("class", "lineDot").attr('fill', function (d) {
        return colorScale(lineYAxisScale(d.y));
      }).attr("cx", function (d) {
        return xAxisScale(Date.parse(d.x));
      }).attr("cy", function (d) {
        return lineYAxisScale(d.y);
      }).attr("r", 5).on('mouseover', function (d) {
        var x = xAxisScale(Date.parse(d.x)) + yAxisWidth + 2.5;
        var y = lineYAxisScale(d.y);
        var label = d.y;
        var tooltip = select(".".concat(styles$6.tooltip));
        var tooltipDescription = "\n          <div>\n            <div><span class=".concat(styles$6.tooltipLabel, ">").concat(label, "</span></div>\n          </div>\n          ");
        tooltip.transition().duration(200).style('opacity', 1);
        tooltip.style('left', "".concat(x, "px")).style('top', "".concat(y, "px")).style('pointer-events', 'none').html(tooltipDescription);
      }).on('mouseout', function (d) {
        return select(".".concat(styles$6.tooltip)).transition().duration(200).style('opacity', 0);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "createTimelineLabel", function (timelineYAxisScale, timelineData) {
      var _this$options6 = _this.options,
          defaultPadding = _this$options6.defaultPadding,
          defaultMargin = _this$options6.defaultMargin,
          xAxisHeight = _this$options6.xAxisHeight,
          lineYAxisHeight = _this$options6.lineYAxisHeight,
          yAxisWidth = _this$options6.yAxisWidth; // 1. Create Timeline Label Group

      var gTimelineLabels = generateGroup(select('.timeline'), {
        className: styles$6.timelineLabels,
        xOffset: -defaultPadding.left,
        yOffset: xAxisHeight + lineYAxisHeight + defaultMargin.top + defaultPadding.top
      }); // 2. Render Timeline Label

      var timelineTitle = select('.timeline').append('text').text('Clinical Timeline').attr('text-anchor', 'end').attr('dx', -23).attr('x', yAxisWidth).attr('y', xAxisHeight + lineYAxisHeight + defaultMargin.top + 6).attr('class', styles$6.title);
      gTimelineLabels.selectAll('.timelineLabel').data(timelineData).enter().append('text').text(function (d) {
        return d.label[d.label.length - 1];
      }).attr('x', yAxisWidth).attr('y', function (d) {
        return timelineYAxisScale(d.label[d.label.length - 1]);
      }).attr('text-anchor', 'end').attr('class', 'timelineLabel');
    });

    _defineProperty(_assertThisInitialized(_this), "createTimelineXAxis", function (xAxis) {
      var _this$options7 = _this.options,
          yAxisWidth = _this$options7.yAxisWidth,
          xAxisHeight = _this$options7.xAxisHeight,
          lineYAxisHeight = _this$options7.lineYAxisHeight,
          defaultMargin = _this$options7.defaultMargin; // 1. Create Timeline XAxis Group

      var gTimelineXAxis = generateGroup(select('.timeline'), {
        className: 'timelineXAxis',
        xOffset: yAxisWidth,
        yOffset: xAxisHeight + lineYAxisHeight + defaultMargin.top
      }); // 2. Render Timeline XAxis

      gTimelineXAxis.call(xAxis);
      gTimelineXAxis.selectAll('.domain').attr('stroke', '#c4c4c4').attr('d', 'M0.5 0V0.5H962.5V0.5');
      gTimelineXAxis.selectAll('.tick').remove();
    });

    _defineProperty(_assertThisInitialized(_this), "createTimelineGrid", function (xAxisScale, timelineYAxisScale) {
      var _this$options8 = _this.options,
          yAxisWidth = _this$options8.yAxisWidth,
          xAxisHeight = _this$options8.xAxisHeight,
          lineYAxisHeight = _this$options8.lineYAxisHeight,
          defaultMargin = _this$options8.defaultMargin,
          height = _this$options8.height,
          defaultPadding = _this$options8.defaultPadding,
          overViewAxisHeight = _this$options8.overViewAxisHeight; // Creat Timeline Grid 
      // 1. Create Timeline Grid Group

      var gTimelineGrid = generateGroup(select('.timeline'), {
        className: 'gTimelineGrid',
        xOffset: yAxisWidth,
        yOffset: xAxisHeight + lineYAxisHeight + defaultMargin.top
      }); // 2. Create Timeline YAxis GridLines

      var timelineYAxisGridHeight = height - (xAxisHeight + lineYAxisHeight + defaultMargin.top + defaultPadding.bottom + overViewAxisHeight);
      var timelineYAxisGridLines = axisTop(xAxisScale).tickSize(-timelineYAxisGridHeight).tickFormat(''); // 3. Render Timeline YAxis Gridlines

      var gTimelineYAxisGrid = gTimelineGrid.append('g').attr('class', 'timelineYAxisGrid').call(timelineYAxisGridLines);
      gTimelineYAxisGrid.selectAll('.tick line').attr('stroke', '#e8e8e8').attr('stroke-dasharray', '2');
      gTimelineYAxisGrid.select('.domain').remove(); // 4.Creat Timeline XAxis GridLines

      var timelineXAxisGridLines = axisRight(timelineYAxisScale).tickSize(_this.xAxisWidth).tickFormat(''); // 5. Render Timeline XAxis Gridlines

      var gTimelineXAxisGrid = gTimelineGrid.append('g').attr('class', 'timelineXAxisGrid').attr('transform', "translate(0, ".concat(defaultPadding.top - 5, ")")).call(timelineXAxisGridLines);
      gTimelineXAxisGrid.selectAll('.tick line').attr('stroke', '#e8e8e8');
      gTimelineXAxisGrid.select('.domain').remove();
    });

    _defineProperty(_assertThisInitialized(_this), "renderTimelineChart", function (timelineData, xAxisScale, timelineYAxisScale) {
      var _this$options9 = _this.options,
          yAxisWidth = _this$options9.yAxisWidth,
          xAxisHeight = _this$options9.xAxisHeight,
          lineYAxisHeight = _this$options9.lineYAxisHeight,
          defaultMargin = _this$options9.defaultMargin; // Create Timeline Chart

      var circleColorScale = ordinal().domain(labelList(timelineData)).range(['#00745e', '#faafa5', '#002d4f', '#a5a9ac', '#b5bbc0', '#c2cad0', '#cbd4da', '#d3dee6', '#dee6ec']);
      var rectColorScale = ordinal().domain(labelList(timelineData)).range(['#27b097', '#fa6b57', '#002d4f', '#a5a9ac', '#b5bbc0', '#c2cad0', '#cbd4da', '#d3dee6', '#dee6ec']); // 1. Create Timeline Data Group

      var gTimelineData = generateGroup(select('.timeline'), {
        className: 'timelineData',
        xOffset: yAxisWidth,
        yOffset: xAxisHeight + lineYAxisHeight + defaultMargin.top * 2 - 2.5
      }); // 2. Render Timeline Circle 

      timelineData.forEach(function (data, idx) {
        gTimelineData.append('g').attr('class', function (d) {
          return "circles-".concat(idx);
        }).selectAll('circle').data(circleDataFilter(data.dataPoints)).enter().append('circle').attr('cx', function (d, i) {
          return xAxisScale(Date.parse(d.startTime));
        }).attr('cy', timelineYAxisScale(data.label[data.label.length - 1])).attr('r', 7.5).attr('fill', circleColorScale(data.label[data.label.length - 1])).attr('clip-path', 'url(#clip)').on('mouseover', function (d, i, nodes) {
          var _d3$mouse = mouse(nodes[i]),
              _d3$mouse2 = _slicedToArray(_d3$mouse, 2),
              x = _d3$mouse2[0],
              y = _d3$mouse2[1];

          var label = data.label[data.label.length - 1];
          var tooltip = select(".".concat(styles$6.tooltip));
          var tooltipDescription = "\n            <div>\n              <div class=".concat(styles$6.tooltipLabel, "><span class=").concat(styles$6.dot, "></span> ").concat(label, "</div>\n              <div class=").concat(styles$6.tooltipDay, ">").concat(timeFormat('%Y.%m.%d')(new Date(d.startTime)), " ~ ").concat(timeFormat('%Y.%m.%d')(new Date(d.endTime)), "</div>\n            </div>\n            ");
          tooltip.transition().duration(200).style('opacity', 1);
          tooltip.style('left', "".concat(x + yAxisWidth, "px")).style('top', "".concat(y + xAxisHeight + lineYAxisHeight + 7.5, "px")).style('pointer-events', 'none').html(tooltipDescription);
        }).on('mouseout', function (d) {
          return select(".".concat(styles$6.tooltip)).transition().duration(200).style('opacity', 0);
        });
      }); // Add Rect Group

      timelineData.forEach(function (data, idx) {
        gTimelineData.append('g').attr('class', "rects-".concat(idx)).selectAll('rect').data(rectDataFilter(data.dataPoints)).enter().append('rect').attr('x', function (d, i) {
          return xAxisScale(Date.parse(d.startTime));
        }).attr('y', timelineYAxisScale(data.label[data.label.length - 1]) - 7.5).attr('height', 15).attr('width', function (d) {
          return xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime));
        }).attr('fill', rectColorScale(data.label[data.label.length - 1])).attr('clip-path', 'url(#clip)').on('mouseover', function (d, i, nodes) {
          var _d3$mouse3 = mouse(nodes[i]),
              _d3$mouse4 = _slicedToArray(_d3$mouse3, 2),
              x = _d3$mouse4[0],
              y = _d3$mouse4[1];

          var label = data.label[data.label.length - 1];
          var tooltip = select(".".concat(styles$6.tooltip));
          var tooltipDescription = "\n            <div>\n              <div class=".concat(styles$6.tooltipLabel, "><span class=").concat(styles$6.dot, "></span> ").concat(label, "</div>\n              <div class=").concat(styles$6.tooltipDay, ">").concat(timeFormat('%Y.%m.%d')(new Date(d.startTime)), " ~ ").concat(timeFormat('%Y.%m.%d')(new Date(d.endTime)), "</div>\n            </div>\n            ");
          tooltip.transition().duration(200).style('opacity', 1);
          tooltip.style('left', "".concat(x + yAxisWidth, "px")).style('top', "".concat(y + xAxisHeight + lineYAxisHeight + 7.5, "px")).style('pointer-events', 'none').html(tooltipDescription);
        }).on('mouseout', function (d) {
          return select(".".concat(styles$6.tooltip)).transition().duration(200).style('opacity', 0);
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "createTimelineOverView", function (xAxisScale) {
      var _this$options10 = _this.options,
          defaultPadding = _this$options10.defaultPadding,
          yAxisWidth = _this$options10.yAxisWidth,
          height = _this$options10.height,
          overViewAxisHeight = _this$options10.overViewAxisHeight,
          width = _this$options10.width; // Create OverViewAxis 
      // 1. Create OverViewAxis Group

      var gOverViewAxis = generateGroup(select('.timeline'), {
        className: 'overViewAxis',
        xOffset: yAxisWidth,
        yOffset: height - overViewAxisHeight - defaultPadding.bottom + 10
      }); // 2. Render OverViewAxis Grid

      var overViewGrid = generateGroup(gOverViewAxis, {
        className: styles$6.overViewXAxisGrid,
        xOffset: 0,
        yOffset: 0
      }).call(axisTop(xAxisScale).tickSize(-overViewAxisHeight).tickFormat(''));
      overViewGrid.selectAll('.domain').attr('stroke', '#003964');
      overViewGrid.selectAll('.tick line').attr('stroke', 'none'); // 3. Render OverViewXAxis

      var overViewXAxis = generateGroup(gOverViewAxis, {
        className: styles$6.overViewXAxis,
        xOffset: 0,
        yOffset: overViewAxisHeight
      }).call(axisBottom(xAxisScale).tickPadding(17));
      overViewXAxis.selectAll('.domain').attr('stroke', '#003964').attr('d', 'M0.5 0V0.5H962.5V0.5');
      overViewXAxis.selectAll('.tick line').remove(); // 4. Render OverView Cover Line

      select('.timeline').append('line').attr('x1', yAxisWidth).attr('x2', width - defaultPadding.right).attr('y1', height - overViewAxisHeight - defaultPadding.bottom + 10).attr('y2', height - overViewAxisHeight - defaultPadding.bottom + 10).attr('stroke', '#003964');
      select('.timeline').append('line').attr('x1', yAxisWidth).attr('x2', width - defaultPadding.right).attr('y1', height - defaultPadding.bottom + 10).attr('y2', height - defaultPadding.bottom + 10).attr('stroke', '#003964');
    });

    _defineProperty(_assertThisInitialized(_this), "createBrush", function (xAxisScale, lineScale, xAxis, line, overViewXAxisScale) {
      var _this$options11 = _this.options,
          height = _this$options11.height,
          xAxisHeight = _this$options11.xAxisHeight,
          defaultPadding = _this$options11.defaultPadding,
          defaultMargin = _this$options11.defaultMargin,
          overViewAxisHeight = _this$options11.overViewAxisHeight,
          lineYAxisHeight = _this$options11.lineYAxisHeight; // Create Brush
      // 1. Create Brush point

      var brushLeftTopPositionX = 0;
      var brushLeftTopPositionY = 0;
      var brushRightTopPositionX = _this.xAxisWidth;
      var brushRightTopPositionY = overViewAxisHeight; // 2. Create Brush Funtion

      var brushed = function brushed() {
        var brushEvent = _this.props.brushEvent;
        var selection = event.selection;
        if (selection === null) return;

        var _selection = _slicedToArray(selection, 2),
            brushStart = _selection[0],
            brushEnd = _selection[1];

        var start = overViewXAxisScale.invert(brushStart);
        var end = overViewXAxisScale.invert(brushEnd);
        var time = {
          start: start,
          end: end
        };
        typeof brushEvent === "function" ? brushEvent(time) : null;
        xAxisScale.domain([Date.parse(start), Date.parse(end)]);
        lineScale.domain([Date.parse(start), Date.parse(end)]);
        select(".".concat(styles$6.xAxis)).transition().duration(500).call(xAxis);
        select(".".concat(styles$6.xAxis)).transition().duration(500).selectAll('.domain').attr('stroke', '#c4c4c4').attr('d', 'M0.5 0V0.5H962.5V0.5');
        select(".".concat(styles$6.xAxis)).transition().duration(500).selectAll('.tick line').remove(); // Line Chart Grid

        select('.lineYAxisGrid').selectAll('tick').remove();
        var lineYAxisGridLines = axisTop(xAxisScale).tickSize(-lineYAxisHeight).tickFormat('');
        select('.lineYAxisGrid').transition().duration(500).call(lineYAxisGridLines);
        select('.lineYAxisGrid').selectAll('.tick line').attr('stroke', '#e8e8e8').attr('stroke-dasharray', '2');
        select('.lineYAxisGrid').select('.domain').remove(); // Timeline Chart Grid

        select('.timelineYAxisGrid').selectAll('tick').remove();
        var timelineYAxisGridHeight = height - (xAxisHeight + lineYAxisHeight + defaultMargin.top + defaultPadding.bottom + overViewAxisHeight);
        var timelineYAxisGridLines = axisTop(xAxisScale).tickSize(-timelineYAxisGridHeight).tickFormat('');
        select('.timelineYAxisGrid').transition().duration(500).call(timelineYAxisGridLines);
        select('.timelineYAxisGrid').selectAll('.tick line').attr('stroke', '#e8e8e8').attr('stroke-dasharray', '2');
        select('.timelineYAxisGrid').select('.domain').remove(); // Line Chart Data Render

        select('.gLine').selectAll("path").transition().duration(500).attr('d', line).attr('clip-path', 'url(#clip)');
        select('.gLine').selectAll(".lineDot").transition().duration(500).attr('clip-path', 'url(#clip)').attr("cx", function (d) {
          return xAxisScale(Date.parse(d.x));
        }); // Timeline Data Render

        select('.timelineData').selectAll('circle').transition().duration(500).attr('cx', function (d, i) {
          return xAxisScale(Date.parse(d.startTime));
        }).attr('clip-path', 'url(#clip)');
        select('.timelineData').selectAll('rect').transition().duration(500).attr('x', function (d, i) {
          return xAxisScale(Date.parse(d.startTime));
        }).attr('width', function (d) {
          return xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime));
        }).attr('clip-path', 'url(#clip)');
      }; // Add Brush Event


      var brush = brushX().extent([[brushLeftTopPositionX, brushLeftTopPositionY], [brushRightTopPositionX, brushRightTopPositionY]]).on('end', brushed);
      var gBrush = generateGroup(select('.overViewAxis'), {
        className: 'overViewXAxisBrush'
      });
      gBrush.call(brush);
    });

    _defineProperty(_assertThisInitialized(_this), "addChartReset", function (id, xAxisScale, lineScale, overViewXAxisScale, line, xAxis) {
      var _this$options12 = _this.options,
          lineYAxisHeight = _this$options12.lineYAxisHeight,
          height = _this$options12.height,
          xAxisHeight = _this$options12.xAxisHeight,
          defaultMargin = _this$options12.defaultMargin,
          defaultPadding = _this$options12.defaultPadding,
          overViewAxisHeight = _this$options12.overViewAxisHeight;
      var brushEvent = _this.props.brushEvent;
      select("#".concat(id)).on('click', function () {
        // Initialize XAxisScale, VerticalLineScale
        xAxisScale.domain(overViewXAxisScale.domain());
        lineScale.domain(overViewXAxisScale.domain());
        select(".".concat(styles$6.xAxis)).transition().duration(500).call(xAxis);
        select(".".concat(styles$6.xAxis)).transition().duration(500).selectAll('.domain').attr('stroke', '#c4c4c4').attr('d', 'M0.5 0V0.5H962.5 V0.5');
        select(".".concat(styles$6.xAxis)).transition().duration(500).selectAll('.tick line').remove(); // Initialize Line Chart Grid

        var lineYAxisGridLines = axisTop(xAxisScale).tickSize(-lineYAxisHeight).tickFormat('');
        select('.lineYAxisGrid').transition().duration(500).call(lineYAxisGridLines);
        select('.lineYAxisGrid').selectAll('.tick line').attr('stroke', '#e8e8e8').attr('stroke-dasharray', '2');
        select('.lineYAxisGrid').select('.domain').remove();
        var timelineYAxisGridHeight = height - (xAxisHeight + lineYAxisHeight + defaultMargin.top + defaultPadding.bottom + overViewAxisHeight); // Initialize Timeline Grid

        var timelineYAxisGridLines = axisTop(xAxisScale).tickSize(-timelineYAxisGridHeight).tickFormat('');
        select('.timelineYAxisGrid').transition().duration(500).call(timelineYAxisGridLines);
        select('.timelineYAxisGrid').selectAll('.tick line').attr('stroke', '#e8e8e8').attr('stroke-dasharray', '2');
        select('.timelineYAxisGrid').select('.domain').remove(); // Initialize Line Chart Data

        select('.gLine').selectAll("path").transition().duration(500).attr('d', line);
        select('.gLine').selectAll(".lineDot").transition().duration(500).attr("cx", function (d) {
          return xAxisScale(Date.parse(d.x));
        }); // Initialize Timeline 

        select('.timelineData').selectAll('circle').transition().duration(500).attr('cx', function (d, i) {
          return xAxisScale(Date.parse(d.startTime));
        });
        select('.timelineData').selectAll('rect').transition().duration(500).attr('x', function (d, i) {
          return xAxisScale(Date.parse(d.startTime));
        }).attr('width', function (d) {
          return xAxisScale(Date.parse(d.endTime)) - xAxisScale(Date.parse(d.startTime));
        }); // Initialize Brush

        select('.overViewXAxisBrush').select('rect.selection').transition().duration(500).attr('width', 0);
        typeof brushEvent === "function" ? brushEvent() : null;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderLineMergeTimeline", function (timeData, lineData) {
      var timelineData = timeData;
      var lineChartData = lineDataFormatConvert(lineData);
      var _this$options13 = _this.options,
          width = _this$options13.width,
          height = _this$options13.height,
          overViewAxisHeight = _this$options13.overViewAxisHeight,
          yAxisWidth = _this$options13.yAxisWidth,
          startTime = _this$options13.startTime,
          endTime = _this$options13.endTime,
          lineYAxisHeight = _this$options13.lineYAxisHeight,
          defaultPadding = _this$options13.defaultPadding,
          labelStartYPosition = _this$options13.labelStartYPosition,
          labelLastYPosition = _this$options13.labelLastYPosition;
      var resetBtnId = _this.props.resetBtnId; // Create tooltip

      select(".".concat(styles$6.timelineChart)).append('div').attr('class', styles$6.tooltip).style('opacity', 0);
      var svg = renderSVG(select(".".concat(styles$6.timelineChart)), _this.options.width, _this.options.height); // Create Entire groups
      // 1. Entire timeline group

      var gTimeline = generateGroup(svg, {
        className: 'timeline'
      }); // Create Clip (avoid displaying the chart outside the chart area)

      var clip = gTimeline.append('defs').append('clipPath').attr('id', 'clip').append('rect').attr('x', 0).attr('y', -20).attr('width', _this.xAxisWidth).attr('height', height - overViewAxisHeight - defaultPadding.bottom); // Create XAxisScale

      var xAxisScale = time().domain([startTime, endTime]).range([0, _this.xAxisWidth]); // Create YAxisScale for LineChart

      var lineYAxisScale = linear$2().domain([0, 1]).range([lineYAxisHeight, defaultPadding.top]); // Create VerticalLine Scale

      var lineScale = time().domain([startTime, endTime]).range([yAxisWidth, width - defaultPadding.right]); // Create TimelineYAxis Scale

      var timelineYAxisScale = point$1().domain(labelList(timelineData)).range([labelStartYPosition, labelLastYPosition]); // Create OverViewXAxis Scale

      var overViewXAxisScale = time().domain([startTime, endTime]).range([0, _this.xAxisWidth]); // Create XAxis

      var xAxis = axisTop(xAxisScale).tickPadding(6); // Create LineChart Coordinate Generator

      var line$1 = line().x(function (d) {
        return xAxisScale(Date.parse(d.x));
      }) // set the x values for the line generator
      .y(function (d) {
        return lineYAxisScale(d.y);
      }); // set the y values for the line generator 

      _this.createXAxis(xAxis);

      _this.createLineYAxis(lineYAxisScale);

      _this.createLineGrid(xAxisScale, lineYAxisScale);

      _this.createVerticalLine(svg, xAxisScale, lineScale);

      _this.renderLineChart(svg, lineChartData, xAxisScale, lineYAxisScale, line$1);

      _this.createTimelineLabel(timelineYAxisScale, timelineData);

      _this.createTimelineXAxis(xAxis);

      _this.createTimelineGrid(xAxisScale, timelineYAxisScale);

      _this.renderTimelineChart(timelineData, xAxisScale, timelineYAxisScale);

      _this.createTimelineOverView(xAxisScale);

      _this.createBrush(xAxisScale, lineScale, xAxis, line$1, overViewXAxisScale);

      resetBtnId ? _this.addChartReset(resetBtnId, xAxisScale, lineScale, overViewXAxisScale, line$1, xAxis) : null; // TODO: Code Refactoring Module
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      var _this$props = _this.props,
          timeData = _this$props.timeData,
          lineData = _this$props.lineData;

      if (isEmpty_1(timeData) || isEmpty_1(lineData)) {
        return _this.errorMessage('haveData');
      }

      if (!Array.isArray(timeData) || !(lineData !== null && _typeof(lineData) === 'object')) {
        return _this.errorMessage('typeOfVariable');
      }

      return _this.renderLineMergeTimeline(timeData, lineData);
    });

    var _getStartAndEndTime = getStartAndEndTime(_this.props.timeData.map(function (d) {
      return d.dataPoints;
    }).flat()),
        _startTime = _getStartAndEndTime.startTime,
        _endTime = _getStartAndEndTime.endTime;

    _this.options = {
      width: _this.props.chartWidth || 1200,
      // 차트가 그려지는 전체 영역 넓이
      height: _this.props.chartHeight || 835,
      // 차트가 그려지는 전체 영영 높이
      xAxisHeight: 64,
      // 화면상단에서 x축까지의 거리
      yAxisWidth: 208,
      // 화면좌측에서 y축까지의 거리
      overViewAxisHeight: 50,
      // 차트 브러쉬 높이
      defaultPadding: {
        top: 42,
        // x축에서 처음 그리드 라인까지의 거리
        right: 30,
        // x축 오른쪽 끝과 차트 오른쪽 끝 사이의 거리
        left: 23,
        // 축에서 라벨까지의 거리
        bottom: 64 // 차트 전체높이에서 브러쉬 밑부분까지의 거리        

      },
      defaultMargin: {
        top: 40
      },
      startTime: _startTime,
      endTime: _endTime,
      lineYAxisHeight: 206,
      labelStartYPosition: 0,
      labelLastYPosition: 369
    };
    _this.xAxisWidth = _this.options.width - _this.options.yAxisWidth - _this.options.defaultPadding.right;
    return _this;
  }

  _createClass(LineMergeTimeline, [{
    key: "render",
    value: function render() {
      return React__default.createElement("div", {
        className: styles$6.timelineChart
      });
    }
  }]);

  return LineMergeTimeline;
}(React.Component);

exports.BarGauge = BarGauge;
exports.LineChart = LineChart;
exports.LineMergeTimeline = LineMergeTimeline;
exports.RadiusGauge = RadiusGauge;
exports.SankeyChart = SankeyChart;
exports.SelectedCard = SelectedCard;
exports.SummaryCard = SummaryCard;
exports.Table = Table;
exports.Timeline = Timeline;
