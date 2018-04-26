"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverse = (root, visit) => {
    _traverse(root, null, visit);
};
function isCstNode(object) {
    return 'name' in object;
}
exports.isCstNode = isCstNode;
class TraverseContext {
    constructor({ node, parentCtx, }) {
        this.node = Object.assign({}, node);
        this.parentCtx = Object.assign({}, parentCtx);
    }
}
const _traverse = (root, ctx = new TraverseContext({ node: root }), visit) => {
    if (!isCstNode(root)) {
        // must be a token
        // make sure to give user a copy
        return visit(Object.assign({}, ctx));
    }
    // is a grammar rule node
    const { children } = root;
    Object.keys(children).forEach((key) => {
        const childType = children[key];
        if (!childType.length) {
            return;
        }
        childType.forEach((child) => {
            const childCtx = new TraverseContext({ node: child, parentCtx: ctx });
            const afterVisit = (transformedCtx) => {
                const nextCtx = transformedCtx
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
//# sourceMappingURL=helpers.js.map