"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regex = {
    or: function () {
        var r = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            r[_i] = arguments[_i];
        }
        return new RegExp(r.map(function (_a) {
            var source = _a.source;
            return "(" + source + ")";
        }).join('|'));
    },
    and: function () {
        var r = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            r[_i] = arguments[_i];
        }
        return new RegExp(r.map(function (_a) {
            var source = _a.source;
            return "(" + source + ")";
        }).join(''));
    },
    option: function (r) {
        return new RegExp("(" + r.source + ")?");
    },
    many: function (r) {
        return new RegExp("(" + r.source + ")*");
    },
};
