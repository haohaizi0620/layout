! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e(require("echarts")) : "function" == typeof define && define.amd ? define(["echarts"], e) : "object" == typeof exports ? exports.EchartsLayer = e(require("echarts")) : t.EchartsLayer = e(t.echarts)
}(window, function (t) {
    return function (t) {
        var e = {};

        function n(o) {
            if (e[o]) return e[o].exports;
            var r = e[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return t[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
        }
        return n.m = t, n.c = e, n.d = function (t, e, o) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: o
            })
        }, n.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, n.t = function (t, e) {
            if (1 & e && (t = n(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var o = Object.create(null);
            if (n.r(o), Object.defineProperty(o, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & e && "string" != typeof t)
                for (var r in t) n.d(o, r, function (e) {
                    return t[e]
                }.bind(null, r));
            return o
        }, n.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return n.d(e, "a", e), e
        }, n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "", n(n.s = 1)
    }([function (e, n) {
        e.exports = t
    }, function (t, e, n) {
        n(2);
        var o = n(6);
        t.exports = o
    }, function (t, e, n) {
        var o;
        void 0 === (o = function (t) {
            return n(0).registerCoordinateSystem("GLMap", n(3)), n(4), n(5), n(0).registerAction({
                type: "GLMapRoam",
                event: "GLMapRoam",
                update: "updateLayout"
            }, function (t, e) {}), {
                version: "1.0.0"
            }
        }.call(e, n, e, t)) || (t.exports = o)
    }, function (t, e, n) {
        var o;
        void 0 === (o = function (t) {
            var e = n(0);

            function o(t, e) {
                this._GLMap = t, this.dimensions = ["lng", "lat"], this._mapOffset = [0, 0], this._api = e
            }
            return o.prototype.dimensions = ["lng", "lat"], o.prototype.setMapOffset = function (t) {
                this._mapOffset = t
            }, o.prototype.getBMap = function () {
                return this._GLMap
            }, o.prototype.dataToPoint = function (t) {
                var e = this._GLMap.project(t),
                    n = this._mapOffset;
                return [e.x - n[0], e.y - n[1]]
            }, o.prototype.pointToData = function (t) {
                var e = this._mapOffset;
                return [(t = this._bmap.project([t[0] + e[0], t[1] + e[1]])).lng, t.lat]
            }, o.prototype.getViewRect = function () {
                var t = this._api;
                return new e.graphic.BoundingRect(0, 0, t.getWidth(), t.getHeight())
            }, o.prototype.getRoamTransform = function () {
                return e.matrix.create()
            }, o.dimensions = o.prototype.dimensions, o.create = function (t, n) {
                var r;
                t.eachComponent("GLMap", function (t) {
                    n.getZr().painter.getViewportRoot();
                    var i = e.glMap;
                    (r = new o(i, n)).setMapOffset(t.__mapOffset || [0, 0]), t.coordinateSystem = r
                }), t.eachSeries(function (t) {
                    "GLMap" === t.get("coordinateSystem") && (t.coordinateSystem = r)
                })
            }, o
        }.call(e, n, e, t)) || (t.exports = o)
    }, function (t, e, n) {
        var o;
        void 0 === (o = function (t) {
            return n(0).extendComponentModel({
                type: "GLMap",
                getBMap: function () {
                    return this.__GLMap
                },
                defaultOption: {
                    roam: !1
                }
            })
        }.call(e, n, e, t)) || (t.exports = o)
    }, function (t, e, n) {
        var o;
        void 0 === (o = function (t) {
            return n(0).extendComponentView({
                type: "GLMap",
                render: function (t, e, n) {
                    var o = !0,
                        r = echarts.glMap,
                        i = n.getZr().painter.getViewportRoot(),
                        a = t.coordinateSystem,
                        s = function (e, r) {
                            if (!o) {
                                var s = document.getElementsByClassName("mapboxgl-map")[0],
                                    p = [-parseInt(s.style.left, 10) || 0, -parseInt(s.style.top, 10) || 0];
                                i.style.left = p[0] + "px", i.style.top = p[1] + "px", a.setMapOffset(p), t.__mapOffset = p, n.dispatchAction({
                                    type: "GLMapRoam"
                                })
                            }
                        };

                    function p() {
                        o || n.dispatchAction({
                            type: "GLMapRoam"
                        })
                    }
                    r.off("move", this._oldMoveHandler), r.off("zoomend", this._oldZoomEndHandler), r.on("move", s), r.on("zoomend", p), this._oldMoveHandler = s, this._oldZoomEndHandler = p;
                    t.get("roam");
                    o = !1
                }
            })
        }.call(e, n, e, t)) || (t.exports = o)
    }, function (t, e) {
        function n(t) {
            const e = t.getCanvasContainer();
            this._container = document.createElement("div"), this._container.style.width = t.getCanvas().style.width, this._container.style.height = t.getCanvas().style.height, this._container.setAttribute("id", "echarts"), this._container.setAttribute("class", "echartMap"), this._map = t, e.appendChild(this._container), this.chart = echarts.init(this._container), echarts.glMap = t, this.resize()
        }
        n.prototype.remove = function () {
            var t = this;
            this._map._listeners.move.forEach(function (e) {
                "moveHandler" === e.name && t._map.off("move", e)
            }), this._map._listeners.move.forEach(function (e) {
                "zoomEndHandler" === e.name && t._map.off("zoomend", e)
            }), this.chart.clear(), this._container.parentNode && this._container.parentNode.removeChild(this._container), this._map = void 0
        }, n.prototype.resize = function () {
            const t = this;
            window.onresize = function () {
                t._container.style.width = t._map.getCanvas().style.width, t._container.style.height = t._map.getCanvas().style.height, t.chart.resize()
            }
        }, t.exports = n
    }])
});