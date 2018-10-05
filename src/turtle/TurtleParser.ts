import { Parser } from 'chevrotain';
import { tokenTypes, tokenMap } from './tokens';

export class TurtleParser extends Parser {
  constructor() {
    super([], tokenTypes, {
      outputCst: true,
    });
    Parser.performSelfAnalysis(this);
  }
  turtleDoc = this.RULE('turtleDoc', () => {
    this.MANY(() => this.SUBRULE(this.statement));
  });

  statement = this.RULE('statement', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.directive) },
      { ALT: () => this.SUBRULE(this.triples) },
    ]);
    this.CONSUME(tokenMap.Period);
  });

  directive = this.RULE('directive', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.prefixID) },
      { ALT: () => this.SUBRULE(this.base) },
      { ALT: () => this.SUBRULE(this.sparqlPrefix) },
      { ALT: () => this.SUBRULE(this.sparqlBase) },
    ]);
  });

  prefixID = this.RULE('prefixID', () => {
    this.CONSUME(tokenMap.TTL_PREFIX);
    this.CONSUME(tokenMap.PNAME_NS);
    this.CONSUME(tokenMap.IRIREF);
    this.CONSUME(tokenMap.Period);
  });

  base = this.RULE('base', () => {
    this.CONSUME(tokenMap.TTL_BASE);
    this.CONSUME(tokenMap.IRIREF);
    this.CONSUME(tokenMap.Period);
  });

  sparqlBase = this.RULE('sparqlBase', () => {
    this.CONSUME(tokenMap.BASE);
    this.CONSUME(tokenMap.IRIREF);
  });

  sparqlPrefix = this.RULE('sparqlPrefix', () => {
    this.CONSUME(tokenMap.PREFIX);
    this.CONSUME(tokenMap.PNAME_NS);
    this.CONSUME(tokenMap.IRIREF);
  });

  triples = this.RULE('triples', () => {
    this.SUBRULE(this.subject);
    this.OR([
      { ALT: () => this.SUBRULE(this.predicateObjectList) },
      { ALT: () => this.SUBRULE(this.blankNodePropertyList) },
    ]);
    this.OPTION(() => this.SUBRULE1(this.predicateObjectList));
  });

  predicateObjectList = this.RULE('predicateObjectList', () => {
    this.SUBRULE(this.verb);
    this.SUBRULE(this.objectList);
    this.MANY(() => {
      this.CONSUME(tokenMap.Semicolon);
      this.OPTION(() => {
        this.SUBRULE1(this.verb);
        this.SUBRULE1(this.objectList);
      });
    });
  });

  subject = this.RULE('subject', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.iri) },
      { ALT: () => this.SUBRULE(this.BlankNode) },
      { ALT: () => this.SUBRULE(this.collection) },
    ]);
  });

  predicate = this.RULE('predicate', () => {
    this.SUBRULE(this.iri);
  });

  objectList = this.RULE('objectList', () => {
    this.SUBRULE(this.object);
    this.MANY(() => {
      this.CONSUME(tokenMap.Comma);
      this.SUBRULE1(this.object);
    });
  });

  verb = this.RULE('verb', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.predicate) },
      { ALT: () => this.CONSUME(tokenMap.A) },
    ]);
  });

  literal = this.RULE('literal', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.RDFLiteral) },
      { ALT: () => this.SUBRULE(this.NumericLiteral) },
      { ALT: () => this.SUBRULE(this.BooleanLiteral) },
    ]);
  });

  blankNodePropertyList = this.RULE('blankNodePropertyList', () => {
    this.CONSUME(tokenMap.LBracket);
    this.SUBRULE(this.predicateObjectList);
    this.CONSUME(tokenMap.RBracket);
  });

  object = this.RULE('object', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.iri) },
      { ALT: () => this.SUBRULE(this.BlankNode) },
      { ALT: () => this.SUBRULE(this.collection) },
      { ALT: () => this.SUBRULE(this.blankNodePropertyList) },
      { ALT: () => this.SUBRULE(this.literal) },
    ]);
  });

  collection = this.RULE('collection', () => {
    this.CONSUME(tokenMap.LParen);
    this.MANY(() => this.SUBRULE(this.object));
    this.CONSUME(tokenMap.RParen);
  });

  NumericLiteral = this.RULE('NumericLiteral', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.INTEGER) },
      { ALT: () => this.CONSUME(tokenMap.DECIMAL) },
      { ALT: () => this.CONSUME(tokenMap.DOUBLE) },
    ]);
  });

  RDFLiteral = this.RULE('RDFLiteral', () => {
    this.SUBRULE(this.String);
    this.OPTION(() => {
      this.OR([
        { ALT: () => this.CONSUME(tokenMap.LANGTAG) },
        {
          ALT: () => {
            this.CONSUME(tokenMap.DoubleCaret);
            this.SUBRULE(this.iri);
          },
        },
      ]);
    });
  });

  BooleanLiteral = this.RULE('BooleanLiteral', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.TRUE) },
      { ALT: () => this.CONSUME(tokenMap.FALSE) },
    ]);
  });

  String = this.RULE('String', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_QUOTE) },
      { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_SINGLE_QUOTE) },
      { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_LONG_SINGLE_QUOTE) },
      { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_LONG_QUOTE) },
    ]);
  });

  iri = this.RULE('iri', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.IRIREF) },
      { ALT: () => this.SUBRULE(this.PrefixedName) },
    ]);
  });

  PrefixedName = this.RULE('PrefixedName', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.PNAME_LN) },
      { ALT: () => this.CONSUME(tokenMap.PNAME_NS) },
    ]);
  });

  BlankNode = this.RULE('BlankNode', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.BLANK_NODE_LABEL) },
      { ALT: () => this.CONSUME(tokenMap.ANON) },
    ]);
  });
}
