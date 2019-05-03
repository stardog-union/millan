import {
  ICstVisitor,
  CstNode,
  CstElement,
  IRecognitionException,
} from 'chevrotain';
import escapeStringRegexp from 'escape-string-regexp';
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
  token: any; // TODO
}

interface ShaclShape {
  subject: ShaclVisitorTreeItem;
  types: ShaclVisitorTreeItem[];
  predicates: ShaclVisitorTreeItem[];
}

const getShaclLocalNameMatcher = (shaclPrefix: string) =>
  new RegExp(`(?:shacl#|${escapeStringRegexp(shaclPrefix)}:)(\\S+?)>?$`);

const getUnderlyingToken = (ctx: CstNode) => {
  let currentNode: any = ctx;

  while ((currentNode as CstNode).children) {
    const currentNodeKey = Object.keys((currentNode as CstNode).children)[0];
    currentNode = currentNode.children[currentNodeKey][0];
  }

  return currentNode;
};

const getLocalName = (iri: string, matcher: RegExp) => {
  const result = matcher.exec(iri);

  if (result) {
    return result[1];
  }
};

// NOTE: mutates `shape`
const addPredicatesAndTypesToShape = (
  shape: ShaclShape,
  shaclRulePredicateObjectListNodes: CstElement[]
) => {
  shaclRulePredicateObjectListNodes.forEach((node: CstNode) => {
    const child = node.children[Object.keys(node.children)[0]][0] as CstNode;

    switch (child.name) {
      case 'shaclVerbShape':
        const token = getUnderlyingToken(child);
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
              token: getUnderlyingToken(shapeTypeNode),
            });
          } else if (shapeTypeNode.children.SHACL_PropertyShape) {
            shape.types.push({
              type: 'PropertyShape',
              token: getUnderlyingToken(shapeTypeNode),
            });
          }
        });
        break;
      case 'shaclPredicateIRI':
        shape.predicates.push({
          type: 'IriTakingPredicate',
          token: child.children.IriTakingPredicate[0],
        });
        break;
      case 'shaclNodeKind':
        shape.predicates.push({
          type: 'nodeKind',
          token: child.children.SHACL_nodeKind[0],
        });
        break;
      case 'shaclTargetNode':
        shape.predicates.push({
          type: 'targetNode',
          token: child.children.SHACL_targetNode[0],
        });
        break;
      case 'shaclPropertyPath':
        shape.predicates.push({
          type: 'path',
          token: child.children.SHACL_path[0],
        });
        break;
      case 'shaclLiteralConstraint':
        shape.predicates.push({
          type: 'LiteralConstraint',
          token: getUnderlyingToken(child),
        });
        break;
      case 'shaclListTakingConstraint':
        shape.predicates.push({
          type: 'ListTakingConstraint',
          token: getUnderlyingToken(child),
        });
        break;
      case 'shaclShapeExpectingConstraint':
        shape.predicates.push({
          type: 'ShapeExpectingPredicate',
          token: child.children.ShapeExpectingPredicate[0],
        });
        break;
      case 'shaclHasValueConstraint':
        shape.predicates.push({
          type: 'hasValue',
          token: child.children.SHACL_hasValue[0],
        });
        break;
      default:
        console.log(
          `SHACL predicateObjectList with name ${child.name} not recognized.`
        );
    }
  });
};

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
      token: getUnderlyingToken(blankNodeNode),
    },
    types: [],
    predicates: [],
  };

  addPredicatesAndTypesToShape(shape, shaclRulePredicateObjectListNodes);

  return shape;
};

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
            token: getUnderlyingToken(ctx.subject[0]),
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
          if (!shape) {
            console.log(this.shapes);
          }
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
