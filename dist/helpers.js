"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverse = function (root, visit) {
    _traverse(root, null, visit);
};
function isCstNode(object) {
    return 'name' in object;
}
exports.isCstNode = isCstNode;
var TraverseContext = /** @class */ (function () {
    function TraverseContext(_a) {
        var node = _a.node, parentCtx = _a.parentCtx;
        this.node = __assign({}, node);
        this.parentCtx = __assign({}, parentCtx);
    }
    return TraverseContext;
}());
var _traverse = function (root, ctx, visit) {
    if (ctx === void 0) { ctx = new TraverseContext({ node: root }); }
    if (!isCstNode(root)) {
        // must be a token
        // make sure to give user a copy
        return visit(__assign({}, ctx));
    }
    // is a grammar rule node
    var children = root.children;
    Object.keys(children).forEach(function (key) {
        var childType = children[key];
        if (!childType.length) {
            return;
        }
        childType.forEach(function (child) {
            var childCtx = new TraverseContext({ node: child, parentCtx: ctx });
            var afterVisit = function (transformedCtx) {
                var nextCtx = transformedCtx
                    ? new TraverseContext({
                        node: transformedCtx.node,
                        parentCtx: transformedCtx.parentCtx,
                    })
                    : childCtx;
                _traverse(child, nextCtx, visit);
            };
            visit(childCtx, afterVisit);
        });
    });
};
