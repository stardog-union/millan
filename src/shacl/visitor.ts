import {
  ICstVisitor,
  CstNode,
  CstElement,
  IRecognitionException,
  IToken,
} from 'chevrotain';
import * as escapeStringRegexp from 'escape-string-regexp';
import { isCstNode } from 'helpers/cst';

export interface IShaclVisitor extends ICstVisitor<any, any> {
  triples(ctx: { [key: string]: CstNode | CstNode[] }): void;
  shaclShape(ctx: { [key: string]: CstNode | CstNode[] }): void;
  $resetState(): void;
  $validateShapes(prefixes?: {
    shacl?: string;
    xsd?: string;
  }): { validationErrors: any[] };
}

interface ShaclVisitorTreeItem {
  type: string;
  token: IToken;
}

interface ShaclShape {
  subject: ShaclVisitorTreeItem;
  types: ShaclVisitorTreeItem[];
  predicates: ShaclVisitorTreeItem[];
}

// Given a SHACL prefix, returns a RegExp that can be used for grabbing the
// local name (e.g., the 'NodeShape' in 'sh:NodeShape') from either a full
// SHACL IRI or a prefixed local name.
const getShaclLocalNameMatcher = (shaclPrefix: string) =>
  new RegExp(`(?:shacl#|${escapeStringRegexp(shaclPrefix)}:)(\\S+?)>?$`);

// Traverses the tree of descendants for a given CstNode until a token is
// found. Returns the "start" token for the CstNode (i.e., the earliest token
// encompassed by the CstNode). This is useful for diagnostics.
const getUnderlyingStartToken = (ctx: CstNode) => {
  let currentNode: any = ctx;
  while ((currentNode as CstNode).children) {
    const currentNodeKey = Object.keys((currentNode as CstNode).children)[0];
    currentNode = currentNode.children[currentNodeKey][0];
  }
  return currentNode;
};

// Grabs the local name (e.g., the 'NodeShape' in 'sh:NodeShape') from either
// a full SHACL IRI or a prefixed local name, if it is available.
const getLocalName = (iri: string, matcher: RegExp) => {
  const result = matcher.exec(iri);
  if (result) {
    return result[1];
  }
};

// Given an initial (possibly partially complete) `shape` object and an array
// of CstElements matching the `shaclRulePredicateObjectList` grammar rule,
// transforms the `shape` into a complete `ShaclShape` with associated SHACL
// types and predicates.
// NOTE: mutates `shape`!
const addPredicatesAndTypesToShape = (
  shape: ShaclShape,
  shaclRulePredicateObjectListNodes: CstElement[]
) => {
  shaclRulePredicateObjectListNodes.forEach((node: CstNode) => {
    const child = node.children[Object.keys(node.children)[0]][0] as CstNode;

    switch (child.name) {
      case 'shaclVerbShape': {
        const token = getUnderlyingStartToken(child);
        const verbTokenInsensitive = token.image.toLowerCase();
        const isTypeVerb =
          verbTokenInsensitive === 'a' ||
          verbTokenInsensitive === 'rdf:type' ||
          verbTokenInsensitive ===
            '<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>';

        if (!isTypeVerb) {
          return;
        }

        Object.keys(child.children).forEach((key) => {
          if (key !== 'shaclShapeType') {
            return;
          }

          const shapeTypeNode = child.children[key][0] as CstNode;

          if (shapeTypeNode.children.SHACL_NodeShape) {
            shape.types.push({
              type: 'NodeShape',
              token: getUnderlyingStartToken(shapeTypeNode),
            });
          } else if (shapeTypeNode.children.SHACL_PropertyShape) {
            shape.types.push({
              type: 'PropertyShape',
              token: getUnderlyingStartToken(shapeTypeNode),
            });
          }
        });
        break;
      }
      case 'shaclPredicateIRI': {
        if (child.children.SingleIriTakingPredicate) {
          shape.predicates.push({
            type: 'SingleIriTakingPredicate',
            token: getUnderlyingStartToken(child.children
              .SingleIriTakingPredicate[0] as CstNode),
          });
        } else if (child.children.ManyIriTakingPredicate) {
          shape.predicates.push({
            type: 'ManyIriTakingPredicate',
            token: getUnderlyingStartToken(child.children
              .ManyIriTakingPredicate[0] as CstNode),
          });
        }
        break;
      }
      case 'shaclNodeKind':
        shape.predicates.push({
          type: 'nodeKind',
          token: child.children.SHACL_nodeKind[0] as IToken,
        });
        break;
      case 'shaclTargetNode':
        shape.predicates.push({
          type: 'targetNode',
          token: child.children.SHACL_targetNode[0] as IToken,
        });
        break;
      case 'shaclPropertyPath':
        shape.predicates.push({
          type: 'path',
          token: child.children.SHACL_path[0] as IToken,
        });
        break;
      case 'shaclLiteralConstraint':
        shape.predicates.push({
          type: 'LiteralConstraint',
          token: getUnderlyingStartToken(child),
        });
        break;
      case 'shaclListTakingConstraint':
        shape.predicates.push({
          type: 'ListTakingConstraint',
          token: getUnderlyingStartToken(child),
        });
        break;
      case 'shaclShapeExpectingConstraint':
        shape.predicates.push({
          type: 'ShapeExpectingPredicate',
          token: child.children.ShapeExpectingPredicate[0] as IToken,
        });
        break;
      case 'shaclHasValueConstraint':
        shape.predicates.push({
          type: 'hasValue',
          token: child.children.SHACL_hasValue[0] as IToken,
        });
        break;
      default:
        console.log(
          `SHACL predicateObjectList with name ${child.name} not recognized.`
        );
    }
  });
};

// Utility method for constructing a `ShaclShape` from CstElements matching the
// `shaclShape` grammar rule.
const getShaclShapeFromBlankNodePropertyList = (ctx) => {
  const blankNodeNode = ctx.blankNodePropertyList[0];
  const predicateObjectListNode = blankNodeNode.children.predicateObjectList[0];
  const optionalPredicateObjectListNode = ctx.predicateObjectList
    ? ctx.predicateObjectList[0]
    : null;

  if (
    !isCstNode(predicateObjectListNode) &&
    !isCstNode(optionalPredicateObjectListNode)
  ) {
    return;
  }

  const shaclRulePredicateObjectListNodes =
    optionalPredicateObjectListNode &&
    optionalPredicateObjectListNode.children &&
    optionalPredicateObjectListNode.children.shaclRulePredicateObjectList
      ? [
          ...(predicateObjectListNode.children.shaclRulePredicateObjectList ||
            []),
          ...optionalPredicateObjectListNode.children
            .shaclRulePredicateObjectList,
        ]
      : predicateObjectListNode.children.shaclRulePredicateObjectList;

  if (!shaclRulePredicateObjectListNodes) {
    return;
  }

  const shape = {
    subject: {
      type: 'blankNodePropertyList',
      token: getUnderlyingStartToken(blankNodeNode),
    },
    types: [],
    predicates: [],
  };

  addPredicatesAndTypesToShape(shape, shaclRulePredicateObjectListNodes);

  return shape;
};

// Returns a new SHACL visitor that extends that given BaseVisitor. The SHACL
// visitor is capable of constructing ShaclShape objects from a given CST and
// then using those shapes to perform validations that cannot be performed in
// the initial parse of a SHACL document.
export const getShaclVisitor = (
  BaseVisitor: new (...args: any[]) => ICstVisitor<any, any>
): IShaclVisitor => {
  class ShaclVisitor extends BaseVisitor implements IShaclVisitor {
    private shapes: ShaclShape[];

    constructor() {
      super();
      this.validateVisitor();
      this.shapes = [];
    }

    // `triples` have two alternatives, one with a `subject` and one with a
    // `blankNodePropertyList`. This method constructs SHACL shapes for each
    // alternative.
    triples = (ctx: { [key: string]: CstNode | CstNode[] }) => {
      if (ctx.subject) {
        const predicateObjectListNode = ctx.predicateObjectList[0];

        if (!isCstNode(predicateObjectListNode)) {
          return;
        }

        const shaclRulePredicateObjectListNodes =
          predicateObjectListNode.children.shaclRulePredicateObjectList;

        if (!shaclRulePredicateObjectListNodes) {
          return;
        }

        const shape = {
          subject: {
            type:
              Object.keys(ctx.subject[0].children)[0] === 'collection'
                ? 'collection'
                : 'subject',
            token: getUnderlyingStartToken(ctx.subject[0]),
          },
          types: [],
          predicates: [],
        };

        addPredicatesAndTypesToShape(shape, shaclRulePredicateObjectListNodes);
        this.shapes.push(shape);
        this.visit(ctx.subject);
        this.visit(predicateObjectListNode);
      } else {
        const shape = getShaclShapeFromBlankNodePropertyList(ctx);

        if (!shape) {
          return;
        }

        this.shapes.push(shape);
        this.visit(ctx.blankNodePropertyList);
        if (ctx.predicateObjectList) {
          this.visit(ctx.predicateObjectList);
        }
      }
    };

    // Some SHACL shapes (e.g., nested PropertyShapes) are not matched
    // by the `triples` grammar rule; instead, they match `shapeShape`.
    shaclShape = (ctx: { [key: string]: CstNode | CstNode[] }) => {
      if (!ctx.blankNodePropertyList) {
        // Not an inline shape we need to traverse, just an identifier.
        return;
      }

      const shape = getShaclShapeFromBlankNodePropertyList(ctx);

      if (!shape) {
        return;
      }

      this.shapes.push(shape);
      this.visit(ctx.blankNodePropertyList);
    };

    $resetState = () => {
      this.shapes = [];
    };

    $validateShapes = ({ shacl: shaclPrefix }) => {
      const validationErrors: Pick<
        IRecognitionException,
        'name' | 'message' | 'token'
      >[] = [];
      const localNameMatcher = getShaclLocalNameMatcher(shaclPrefix);
      let bnodeCount = 0;

      const shapesConsolidatedBySubject = this.shapes.reduce(
        (consolidatedShapes, shape) => {
          const { image } = shape.subject.token;
          const subjectImage = image === '[' ? `bnode${++bnodeCount}` : image;

          if (!consolidatedShapes[subjectImage]) {
            consolidatedShapes[subjectImage] = {
              subjects: [shape.subject],
              types: shape.types,
              predicates: shape.predicates,
            };
          } else {
            const consolidatedShape = consolidatedShapes[subjectImage];
            consolidatedShapes[subjectImage] = {
              subjects: [...consolidatedShape.subjects, shape.subject],
              types: [...consolidatedShape.types, ...shape.types],
              predicates: [
                ...consolidatedShape.predicates,
                ...shape.predicates,
              ],
            };
          }

          return consolidatedShapes;
        },
        {}
      );

      Object.keys(shapesConsolidatedBySubject).forEach((subjectImage) => {
        const { subjects, types, predicates } = shapesConsolidatedBySubject[
          subjectImage
        ];
        let shapeType;

        types.forEach(({ type }) => {
          if (shapeType && type !== shapeType) {
            validationErrors.push({
              name: 'ShapeTypeError',
              message:
                'A SHACL shape can be at most one of NodeShape or PropertyShape.',
              token: subjects[0].token,
            });
          } else if (!shapeType) {
            shapeType = type;
          }
        });

        const pathPredicates = [];
        const nonPathPredicateMap = {};

        predicates.forEach((predicate) => {
          const { image } = predicate.token;
          const localName = getLocalName(image, localNameMatcher);
          const predicateImage = localName
            ? `${shaclPrefix}:${localName}`
            : image;

          if (predicateImage === `${shaclPrefix}:path`) {
            pathPredicates.push(predicate);
          } else {
            if (!nonPathPredicateMap[predicateImage]) {
              nonPathPredicateMap[predicateImage] = [];
            }
            nonPathPredicateMap[predicateImage].push(predicate);
          }
        });

        if (pathPredicates.length > 0) {
          if (shapeType === 'NodeShape') {
            validationErrors.push({
              name: 'ShapePropertyError',
              message:
                'SHACL instances of `NodeShape` cannot have a value for the `path` property.',
              token: pathPredicates[0].token,
            });
          } else {
            shapeType = 'PropertyShape';
          }

          if (pathPredicates.length > 1) {
            validationErrors.push({
              name: 'ShapePropertyError',
              message: 'A shape can have at most one value for sh:path.',
              token: pathPredicates[1].token,
            });
          }
        }

        if (shapeType === 'NodeShape') {
          [
            'minCount',
            'maxCount',
            'uniqueLang',
            'lessThan',
            'lessThanOrEquals',
            'qualifiedValueShape',
          ].forEach((image) => {
            const prefixedImage = `${shaclPrefix}:${image}`;
            if (nonPathPredicateMap[prefixedImage]) {
              validationErrors.push({
                name: 'ShapePropertyError',
                message: `A NodeShape cannot have any value for ${prefixedImage}.`,
                token: nonPathPredicateMap[prefixedImage][0].token,
              });
            }
          });
        } else {
          [
            'deactivated',
            'severity',
            'datatype',
            'nodeKind',
            'minCount',
            'maxCount',
            'minExclusive',
            'minInclusive',
            'maxExclusive',
            'maxInclusive',
            'minLength',
            'maxLength',
            'languageIn',
            'uniqueLang',
            'in',
          ].forEach((image) => {
            const prefixedImage = `${shaclPrefix}:${image}`;
            if (
              nonPathPredicateMap[prefixedImage] &&
              nonPathPredicateMap[prefixedImage].length > 1
            ) {
              validationErrors.push({
                name: 'ShapePropertyError',
                message: `A shape can have at most one value for ${prefixedImage}.`,
                token: nonPathPredicateMap[prefixedImage][1].token,
              });
            }
          });
        }
      });

      return { validationErrors };
    };
  }

  return new ShaclVisitor();
};
