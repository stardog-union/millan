import { CstElement, CstNode } from 'chevrotain';
import { SparqlParser } from './SparqlParser';

export const traverse = (root: CstElement, visit) => {
  _traverse(root, null, visit);
};

export function isCstNode(object: CstElement): object is CstNode {
  return 'name' in object;
}

export const BaseCstVisitorWithDefaults = new SparqlParser().getBaseCstVisitorConstructorWithDefaults();
export class VariableValidationVisitor extends BaseCstVisitorWithDefaults {
  constructor() {
    super();

    this.validateVisitor();
  }
  QueryUnit(ctx) {}
  Var(ctx) {
    console.log(JSON.stringify(ctx, null, 2));
  }
}

const testQuery = `PREFIX fd: <http://www.element-22.com/ontology/foundation#>
PREFIX gu: <http://www.element-22.com/ontology/geographicunit#>
PREFIX wgs:      <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX geof:       <http://www.opengis.net/def/function/geosparql/>
PREFIX qudt:         <http://qudt.org/vocab/unit#>
PREFIX :   <http://www.element-22.com/ontology/party#> 
SELECT *
WHERE {
    { #pragma group.joins
        ?party a :NonIndividual ;
        fd:hasObjectId "172e7e8f-4656-4b54-803c-a22a6f1dcf03" ;
        :hasRegisteredName ?partyName;
        wgs:long ?partyLong ;
        wgs:lat ?partyLat ;
        :hasCityName ?partyCityName .
        OPTIONAL { ?party geo:asWKT ?wktParty . }
        ?competitor a :NonIndividual ;
        wgs:long ?competitorLong ;
        wgs:lat ?competitorLat ;
        :hasRegisteredName ?competitorName ;
        :hasCityName ?competitorCityName ;
        ^:isCompetitorOf ?party . 
    }
    
    {   ?distance geof:distance ( ?party ?competitor qudt:MileUSStatute ) . }
        
}`;
const { cst } = new SparqlParser().parse(testQuery);
const v = new VariableValidationVisitor();
v.visit(cst);

interface ITraverseContext {
  node: CstElement;
  parentCtx: TraverseContext;
  [s: string]: any;
}

class TraverseContext implements ITraverseContext {
  public node: CstElement;
  public parentCtx: TraverseContext;
  constructor({
    node,
    parentCtx,
  }: {
    node: CstElement;
    parentCtx?: TraverseContext;
  }) {
    this.node = { ...node };
    this.parentCtx = { ...parentCtx };
  }
}

const _traverse = (
  root: CstElement,
  ctx: TraverseContext = new TraverseContext({ node: root }),
  visit: (ctx: TraverseContext, next?: (nextCtx) => void) => void
) => {
  if (!isCstNode(root)) {
    // must be a token

    // make sure to give user a copy
    return visit({ ...ctx });
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
      const afterVisit = (transformedCtx?) => {
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
