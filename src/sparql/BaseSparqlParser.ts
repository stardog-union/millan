import { sparqlTokenMap } from './tokens';
import {
  Parser,
  TokenType,
  IToken,
  Lexer,
  IParserConfig,
  IRecognitionException,
} from 'chevrotain';
import { IStardogParser } from '../helpers/types';

// @ts-ignore: debug logging
function log(...args) {
  // console.log(...args);
}

export const getRules = (context) => ({
  SparqlDoc: context.RULE('SparqlDoc', () => {
    log('SparqlDoc');
    context.SUBRULE(context.Prologue);
    context.OR([
      { ALT: () => context.SUBRULE(context.QueryUnit) },
      { ALT: () => context.SUBRULE(context.UpdateUnit) },
    ]);
  }),

  QueryUnit: context.RULE('QueryUnit', () => {
    log('QueryUnit');
    context.SUBRULE(context.Query);
  }),

  Query: context.RULE('Query', () => {
    log('Query');
    context.OR([
      { ALT: () => context.SUBRULE(context.SelectQuery) },
      { ALT: () => context.SUBRULE(context.ConstructQuery) },
      { ALT: () => context.SUBRULE(context.DescribeQuery) },
      { ALT: () => context.SUBRULE(context.AskQuery) },
    ]);
    context.SUBRULE(context.ValuesClause);
  }),

  Constant: context.RULE('Constant', () => {
    context.OR([
      { ALT: () => context.SUBRULE(context.iri) },
      { ALT: () => context.SUBRULE(context.RDFLiteral) },
      { ALT: () => context.SUBRULE(context.NumericLiteral) },
      { ALT: () => context.SUBRULE(context.BooleanLiteral) },
    ]);
  }),

  MaxLength: context.RULE('MaxLength', () => {
    context.CONSUME(sparqlTokenMap.MAX_LENGTH);
    context.CONSUME(sparqlTokenMap.INTEGER);
  }),

  UpdateUnit: context.RULE('UpdateUnit', () => {
    log('UpdateUnit');
    context.SUBRULE(context.Update);
  }),

  Prologue: context.RULE('Prologue', () => {
    log('Prologue');
    context.MANY(() =>
      context.OR([
        { ALT: () => context.SUBRULE(context.BaseDecl) },
        { ALT: () => context.SUBRULE(context.PrefixDecl) },
      ])
    );
  }),

  BaseDecl: context.RULE('BaseDecl', () => {
    log('BaseDecl');
    context.CONSUME(sparqlTokenMap.BASE);
    context.CONSUME(sparqlTokenMap.IRIREF);
  }),

  PrefixDecl: context.RULE('PrefixDecl', () => {
    log('PrefixDecl');
    context.CONSUME(sparqlTokenMap.PREFIX);
    context.CONSUME(sparqlTokenMap.PNAME_NS);
    context.CONSUME(sparqlTokenMap.IRIREF);
  }),

  SelectQuery: context.RULE('SelectQuery', () => {
    log('SelectQuery');
    context.SUBRULE(context.SelectClause);
    context.MANY(() => context.SUBRULE(context.DatasetClause));
    context.SUBRULE(context.WhereClause);
    context.SUBRULE(context.SolutionModifier);
  }),

  SubSelect: context.RULE('SubSelect', () => {
    log('SubSelect');
    context.SUBRULE(context.SelectClause);
    context.SUBRULE(context.WhereClause);
    context.SUBRULE(context.SolutionModifier);
    context.SUBRULE(context.ValuesClause);
  }),

  SelectClause: context.RULE('SelectClause', () => {
    log('SelectClause');
    context.CONSUME(sparqlTokenMap.SELECT);
    context.OPTION(() =>
      context.OR([
        { ALT: () => context.CONSUME(sparqlTokenMap.DISTINCT) },
        { ALT: () => context.CONSUME(sparqlTokenMap.REDUCED) },
      ])
    );
    context.OR1([
      {
        ALT: () => {
          context.AT_LEAST_ONE(() =>
            context.OR2([
              { ALT: () => context.SUBRULE(context.Var) },
              {
                ALT: () => {
                  context.CONSUME(sparqlTokenMap.LParen);
                  context.SUBRULE(context.Expression);
                  context.CONSUME(sparqlTokenMap.AS);
                  context.SUBRULE1(context.Var);
                  context.CONSUME(sparqlTokenMap.RParen);
                },
              },
            ])
          );
        },
      },
      { ALT: () => context.CONSUME(sparqlTokenMap.Star) },
    ]);
  }),

  ConstructQuery: context.RULE('ConstructQuery', () => {
    context.CONSUME(sparqlTokenMap.CONSTRUCT);
    context.OR([
      {
        ALT: () => {
          context.SUBRULE(context.ConstructTemplate);
          context.MANY(() => context.SUBRULE(context.DatasetClause));
          context.SUBRULE(context.WhereClause);
        },
      },
      {
        ALT: () => {
          context.MANY1(() => context.SUBRULE1(context.DatasetClause));
          context.CONSUME(sparqlTokenMap.WHERE);
          context.CONSUME(sparqlTokenMap.LCurly);
          context.OPTION(() => context.SUBRULE(context.TriplesTemplate));
          context.CONSUME(sparqlTokenMap.RCurly);
        },
      },
    ]);
    context.SUBRULE(context.SolutionModifier);
  }),

  DescribeQuery: context.RULE('DescribeQuery', () => {
    log('DescribeQuery');
    context.CONSUME(sparqlTokenMap.DESCRIBE);
    context.OR([
      {
        ALT: () => {
          context.AT_LEAST_ONE(() => context.SUBRULE(context.VarOrIri));
        },
      },
      { ALT: () => context.CONSUME(sparqlTokenMap.Star) },
    ]);
    context.MANY(() => context.SUBRULE(context.DatasetClause));
    context.OPTION(() => context.SUBRULE(context.WhereClause));
    context.SUBRULE(context.SolutionModifier);
  }),

  AskQuery: context.RULE('AskQuery', () => {
    log('AskQuery');
    context.CONSUME(sparqlTokenMap.ASK);
    context.MANY(() => context.SUBRULE(context.DatasetClause));
    context.SUBRULE(context.WhereClause);
    context.SUBRULE(context.SolutionModifier);
  }),

  DatasetClause: context.RULE('DatasetClause', () => {
    log('DatasetClause');
    context.CONSUME(sparqlTokenMap.FROM);
    context.OR([
      { ALT: () => context.SUBRULE(context.DefaultGraphClause) },
      { ALT: () => context.SUBRULE(context.NamedGraphClause) },
    ]);
  }),

  DefaultGraphClause: context.RULE('DefaultGraphClause', () => {
    log('DefaultGraphClause');
    context.SUBRULE(context.SourceSelector);
  }),

  NamedGraphClause: context.RULE('NamedGraphClause', () => {
    log('NamedGraphClause');
    context.CONSUME(sparqlTokenMap.NAMED);
    context.SUBRULE(context.SourceSelector);
  }),

  SourceSelector: context.RULE('SourceSelector', () => {
    log('SourceSelector');
    context.SUBRULE(context.iri);
  }),

  WhereClause: context.RULE('WhereClause', () => {
    log('WhereClause');
    context.OPTION(() => context.CONSUME(sparqlTokenMap.WHERE));
    context.SUBRULE(context.GroupGraphPattern);
  }),

  SolutionModifier: context.RULE('SolutionModifier', () => {
    log('SolutionModifier');
    context.OPTION(() => context.SUBRULE(context.GroupClause));
    context.OPTION1(() => context.SUBRULE(context.HavingClause));
    context.OPTION2(() => context.SUBRULE(context.OrderClause));
    context.OPTION3(() => context.SUBRULE(context.LimitOffsetClause));
  }),

  GroupClause: context.RULE('GroupClause', () => {
    log('GroupClause');
    context.CONSUME(sparqlTokenMap.GroupBy);
    context.AT_LEAST_ONE(() => context.SUBRULE(context.GroupCondition));
  }),

  GroupCondition: context.RULE('GroupCondition', () => {
    log('GroupCondition');
    context.OR([
      { ALT: () => context.SUBRULE(context.BuiltInCall) },
      { ALT: () => context.SUBRULE(context.FunctionCall) },
      {
        ALT: () => {
          context.CONSUME(sparqlTokenMap.LParen);
          context.SUBRULE(context.Expression);
          context.OPTION(() => {
            context.CONSUME(sparqlTokenMap.AS);
            context.SUBRULE(context.Var);
          });
          context.CONSUME(sparqlTokenMap.RParen);
        },
      },
      { ALT: () => context.SUBRULE1(context.Var) },
    ]);
  }),

  HavingClause: context.RULE('HavingClause', () => {
    log('HavingClause');
    context.CONSUME(sparqlTokenMap.HAVING);
    context.SUBRULE(context.HavingCondition);
  }),

  HavingCondition: context.RULE('HavingCondition', () => {
    log('HavingCondition');
    context.SUBRULE(context.Constraint);
  }),

  OrderClause: context.RULE('OrderClause', () => {
    log('OrderClause');
    context.CONSUME(sparqlTokenMap.OrderBy);
    context.AT_LEAST_ONE(() => context.SUBRULE(context.OrderCondition));
  }),

  OrderCondition: context.RULE('OrderCondition', () => {
    log('OrderCondition');
    context.OR([
      {
        ALT: () => {
          context.OR1([
            { ALT: () => context.CONSUME(sparqlTokenMap.ASC) },
            { ALT: () => context.CONSUME(sparqlTokenMap.DESC) },
          ]);
          context.SUBRULE(context.BrackettedExpression);
        },
      },
      { ALT: () => context.SUBRULE(context.Constraint) },
      { ALT: () => context.SUBRULE(context.Var) },
    ]);
  }),

  LimitOffsetClause: context.RULE('LimitOffsetClause', () => {
    log('LimitOffsetClause');
    context.OR([
      {
        ALT: () => {
          context.SUBRULE(context.LimitClause);
          context.OPTION(() => context.SUBRULE(context.OffsetClause));
        },
      },
      {
        ALT: () => {
          context.SUBRULE1(context.OffsetClause);
          context.OPTION1(() => context.SUBRULE1(context.LimitClause));
        },
      },
    ]);
  }),

  OffsetClause: context.RULE('OffsetClause', () => {
    log('OffsetClause');
    context.CONSUME(sparqlTokenMap.OFFSET);
    context.CONSUME(sparqlTokenMap.INTEGER);
  }),

  LimitClause: context.RULE('LimitClause', () => {
    log('LimitClause');
    context.CONSUME(sparqlTokenMap.LIMIT);
    context.CONSUME(sparqlTokenMap.INTEGER);
  }),

  ValuesClause: context.RULE('ValuesClause', () => {
    log('ValuesClause');
    context.OPTION(() => {
      context.CONSUME(sparqlTokenMap.VALUES);
      context.SUBRULE(context.DataBlock);
    });
  }),

  Update: context.RULE('Update', () => {
    log('Update');
    context.SUBRULE(context.Prologue);
    context.OPTION(() => {
      context.SUBRULE(context.Update1);
      context.OPTION1(() => {
        context.CONSUME(sparqlTokenMap.Semicolon);
        context.SUBRULE(context.Update);
      });
    });
  }),

  Update1: context.RULE('Update1', () => {
    log('Update1');
    context.OR([
      { ALT: () => context.SUBRULE(context.Load) },
      { ALT: () => context.SUBRULE(context.Clear) },
      { ALT: () => context.SUBRULE(context.Drop) },
      { ALT: () => context.SUBRULE(context.Add) },
      { ALT: () => context.SUBRULE(context.Move) },
      { ALT: () => context.SUBRULE(context.Copy) },
      { ALT: () => context.SUBRULE(context.Create) },
      { ALT: () => context.SUBRULE(context.InsertData) },
      { ALT: () => context.SUBRULE(context.DeleteData) },
      { ALT: () => context.SUBRULE(context.DeleteWhere) },
      { ALT: () => context.SUBRULE(context.Modify) },
    ]);
  }),

  Load: context.RULE('Load', () => {
    log('Load');
    context.CONSUME(sparqlTokenMap.LOAD);
    context.OPTION(() => context.CONSUME(sparqlTokenMap.SILENT));
    context.SUBRULE(context.iri);
    context.OPTION1(() => {
      context.CONSUME(sparqlTokenMap.INTO);
      context.SUBRULE(context.GraphRef);
    });
  }),

  Clear: context.RULE('Clear', () => {
    log('Clear');
    context.CONSUME(sparqlTokenMap.CLEAR);
    context.OPTION(() => context.CONSUME(sparqlTokenMap.SILENT));
    context.SUBRULE(context.GraphRefAll);
  }),

  Drop: context.RULE('Drop', () => {
    log('Drop');
    context.CONSUME(sparqlTokenMap.DROP);
    context.OPTION(() => context.CONSUME(sparqlTokenMap.SILENT));
    context.SUBRULE(context.GraphRefAll);
  }),

  Create: context.RULE('Create', () => {
    log('Create');
    context.CONSUME(sparqlTokenMap.CREATE);
    context.OPTION(() => context.CONSUME(sparqlTokenMap.SILENT));
    context.SUBRULE(context.GraphRefAll);
  }),

  Add: context.RULE('Add', () => {
    log('Add');
    context.CONSUME(sparqlTokenMap.ADD);
    context.OPTION(() => context.CONSUME(sparqlTokenMap.SILENT));
    context.SUBRULE(context.GraphOrDefault);
    context.CONSUME(sparqlTokenMap.TO);
    context.SUBRULE1(context.GraphOrDefault);
  }),

  Move: context.RULE('Move', () => {
    log('Move');
    context.CONSUME(sparqlTokenMap.MOVE);
    context.OPTION(() => context.CONSUME(sparqlTokenMap.SILENT));
    context.SUBRULE(context.GraphOrDefault);
    context.CONSUME(sparqlTokenMap.TO);
    context.SUBRULE1(context.GraphOrDefault);
  }),

  Copy: context.RULE('Copy', () => {
    log('Copy');
    context.CONSUME(sparqlTokenMap.COPY);
    context.OPTION(() => context.CONSUME(sparqlTokenMap.SILENT));
    context.SUBRULE(context.GraphOrDefault);
    context.CONSUME(sparqlTokenMap.TO);
    context.SUBRULE1(context.GraphOrDefault);
  }),

  InsertData: context.RULE('InsertData', () => {
    log('InsertData');
    context.CONSUME(sparqlTokenMap.INSERT_DATA);
    context.SUBRULE(context.QuadData);
  }),

  DeleteData: context.RULE('DeleteData', () => {
    log('DeleteData');
    context.CONSUME(sparqlTokenMap.DELETE_DATA);
    context.SUBRULE(context.QuadData);
  }),

  DeleteWhere: context.RULE('DeleteWhere', () => {
    log('DeleteWhere');
    context.CONSUME(sparqlTokenMap.DELETE_WHERE);
    context.SUBRULE(context.QuadPattern);
  }),

  Modify: context.RULE('Modify', () => {
    log('Modify');
    context.OPTION(() => {
      context.CONSUME(sparqlTokenMap.WITH);
      context.SUBRULE(context.iri);
    });
    context.OR([
      {
        ALT: () => {
          context.SUBRULE(context.DeleteClause);
          context.OPTION1(() => context.SUBRULE(context.InsertClause));
        },
      },
      { ALT: () => context.SUBRULE1(context.InsertClause) },
    ]);
    context.MANY(() => context.SUBRULE(context.UsingClause));
    context.CONSUME(sparqlTokenMap.WHERE);
    context.SUBRULE(context.GroupGraphPattern);
  }),

  DeleteClause: context.RULE('DeleteClause', () => {
    log('DeleteClause');
    context.CONSUME(sparqlTokenMap.DELETE);
    context.SUBRULE(context.QuadPattern);
  }),

  InsertClause: context.RULE('InsertClause', () => {
    log('InsertClause');
    context.CONSUME(sparqlTokenMap.INSERT);
    context.SUBRULE(context.QuadPattern);
  }),

  UsingClause: context.RULE('UsingClause', () => {
    log('UsingClause');
    context.CONSUME(sparqlTokenMap.USING);
    context.OR([
      { ALT: () => context.SUBRULE(context.iri) },
      {
        ALT: () => {
          context.CONSUME(sparqlTokenMap.NAMED);
          context.SUBRULE1(context.iri);
        },
      },
    ]);
  }),

  GraphOrDefault: context.RULE('GraphOrDefault', () => {
    log('GraphOrDefault');
    context.OR([
      { ALT: () => context.CONSUME(sparqlTokenMap.DEFAULT) },
      {
        ALT: () => {
          context.OPTION(() => context.CONSUME(sparqlTokenMap.GRAPH));
          context.SUBRULE(context.iri);
        },
      },
    ]);
  }),

  GraphRef: context.RULE('GraphRef', () => {
    log('GraphRef');
    context.CONSUME(sparqlTokenMap.GRAPH);
    context.SUBRULE(context.iri);
  }),

  GraphRefAll: context.RULE('GraphRefAll', () => {
    log('GraphRefAll');
    context.OR([
      { ALT: () => context.SUBRULE(context.GraphRef) },
      { ALT: () => context.CONSUME(sparqlTokenMap.DEFAULT) },
      { ALT: () => context.CONSUME(sparqlTokenMap.NAMED) },
      { ALT: () => context.CONSUME(sparqlTokenMap.ALL) },
    ]);
  }),

  QuadPattern: context.RULE('QuadPattern', () => {
    log('QuadPattern');
    context.CONSUME(sparqlTokenMap.LCurly);
    context.SUBRULE(context.Quads);
    context.CONSUME(sparqlTokenMap.RCurly);
  }),

  QuadData: context.RULE('QuadData', () => {
    log('QuadData');
    context.CONSUME(sparqlTokenMap.LCurly);
    context.SUBRULE(context.Quads);
    context.CONSUME(sparqlTokenMap.RCurly);
  }),

  Quads: context.RULE('Quads', () => {
    log('Quads');
    context.OPTION(() => context.SUBRULE(context.TriplesTemplate));
    context.MANY(() => {
      context.SUBRULE(context.QuadsNotTriples);
      context.OPTION1(() => context.CONSUME(sparqlTokenMap.Period));
      context.OPTION2(() => context.SUBRULE1(context.TriplesTemplate));
    });
  }),

  QuadsNotTriples: context.RULE('QuadsNotTriples', () => {
    log('QuadsNotTriples');
    context.CONSUME(sparqlTokenMap.GRAPH);
    context.SUBRULE(context.VarOrIri);
    context.CONSUME(sparqlTokenMap.LCurly);
    context.OPTION(() => context.SUBRULE(context.TriplesTemplate));
    context.CONSUME(sparqlTokenMap.RCurly);
  }),

  TriplesTemplate: context.RULE('TriplesTemplate', () => {
    log('TriplesTemplate');
    context.SUBRULE(context.TriplesSameSubject);
    context.OPTION(() => {
      context.CONSUME(sparqlTokenMap.Period);
      context.OPTION1(() => context.SUBRULE(context.TriplesTemplate));
    });
  }),

  GroupGraphPattern: context.RULE('GroupGraphPattern', () => {
    log('GroupGraphPattern');
    context.CONSUME(sparqlTokenMap.LCurly);
    context.OR([
      { ALT: () => context.SUBRULE(context.SubSelect) },
      { ALT: () => context.SUBRULE(context.GroupGraphPatternSub) },
    ]);
    context.CONSUME(sparqlTokenMap.RCurly);
  }),

  GroupGraphPatternSub: context.RULE('GroupGraphPatternSub', () => {
    log('GroupGraphPatternSub');
    context.OPTION(() => context.SUBRULE(context.TriplesBlock));
    context.MANY(() => {
      context.SUBRULE(context.GraphPatternNotTriples);
      context.OPTION1(() => context.CONSUME(sparqlTokenMap.Period));
      context.OPTION2(() => context.SUBRULE1(context.TriplesBlock));
    });
  }),

  TriplesBlock: context.RULE('TriplesBlock', () => {
    log('TriplesBlock');
    context.SUBRULE(context.TriplesSameSubjectPath);
    context.OPTION(() => {
      context.CONSUME(sparqlTokenMap.Period);
      context.OPTION1(() => context.SUBRULE(context.TriplesBlock));
    });
  }),

  GraphPatternNotTriples: context.RULE('GraphPatternNotTriples', () => {
    log('GraphPatternNotTriples');
    context.OR([
      { ALT: () => context.SUBRULE(context.GroupOrUnionGraphPattern) },
      { ALT: () => context.SUBRULE(context.OptionalGraphPattern) },
      { ALT: () => context.SUBRULE(context.MinusGraphPattern) },
      { ALT: () => context.SUBRULE(context.GraphGraphPattern) },
      { ALT: () => context.SUBRULE(context.ServiceGraphPattern) },
      { ALT: () => context.SUBRULE(context.Filter) },
      { ALT: () => context.SUBRULE(context.Bind) },
      { ALT: () => context.SUBRULE(context.InlineData) },
    ]);
  }),

  OptionalGraphPattern: context.RULE('OptionalGraphPattern', () => {
    log('OptionalGraphPattern');
    context.CONSUME(sparqlTokenMap.OPTIONAL);
    context.SUBRULE(context.GroupGraphPattern);
  }),

  GraphGraphPattern: context.RULE('GraphGraphPattern', () => {
    log('GraphGraphPattern');
    context.CONSUME(sparqlTokenMap.GRAPH);
    context.SUBRULE(context.VarOrIri);
    context.SUBRULE(context.GroupGraphPattern);
  }),

  ServiceGraphPattern: context.RULE('ServiceGraphPattern', () => {
    log('ServiceGraphPattern');
    context.CONSUME(sparqlTokenMap.SERVICE);
    context.OPTION(() => context.CONSUME(sparqlTokenMap.SILENT));
    context.SUBRULE(context.VarOrIri);
    context.SUBRULE(context.GroupGraphPattern);
  }),

  Bind: context.RULE('Bind', () => {
    log('Bind');
    context.CONSUME(sparqlTokenMap.BIND);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.AS);
    context.SUBRULE(context.Var);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  InlineData: context.RULE('InlineData', () => {
    log('InlineData');
    context.CONSUME(sparqlTokenMap.VALUES);
    context.SUBRULE(context.DataBlock);
  }),

  DataBlock: context.RULE('DataBlock', () => {
    log('DataBlock');
    context.OR([
      { ALT: () => context.SUBRULE(context.InlineDataOneVar) },
      { ALT: () => context.SUBRULE(context.InlineDataFull) },
    ]);
  }),

  InlineDataOneVar: context.RULE('InlineDataOneVar', () => {
    log('InlineDataOneVar');
    context.SUBRULE(context.Var);
    context.CONSUME(sparqlTokenMap.LCurly);
    context.MANY(() => context.SUBRULE(context.DataBlockValue));
    context.CONSUME(sparqlTokenMap.RCurly);
  }),

  InlineDataFull: context.RULE('InlineDataFull', () => {
    log('InlineDataFull');
    context.OR([
      { ALT: () => context.CONSUME(sparqlTokenMap.NIL) },
      {
        ALT: () => {
          context.CONSUME(sparqlTokenMap.LParen);
          context.MANY(() => context.SUBRULE(context.Var));
          context.CONSUME(sparqlTokenMap.RParen);
        },
      },
    ]);
    context.CONSUME(sparqlTokenMap.LCurly);
    context.MANY1(() =>
      context.OR1([
        {
          ALT: () => {
            context.CONSUME1(sparqlTokenMap.LParen);
            context.MANY2(() => context.SUBRULE(context.DataBlockValue));
            context.CONSUME1(sparqlTokenMap.RParen);
          },
        },
        { ALT: () => context.CONSUME1(sparqlTokenMap.NIL) },
      ])
    );
    context.CONSUME(sparqlTokenMap.RCurly);
  }),

  DataBlockValue: context.RULE('DataBlockValue', () => {
    log('DataBlockValue');
    context.OR([
      { ALT: () => context.SUBRULE(context.iri) },
      { ALT: () => context.SUBRULE(context.RDFLiteral) },
      { ALT: () => context.SUBRULE(context.NumericLiteral) },
      { ALT: () => context.SUBRULE(context.BooleanLiteral) },
      { ALT: () => context.CONSUME(sparqlTokenMap.UNDEF) },
    ]);
  }),

  MinusGraphPattern: context.RULE('MinusGraphPattern', () => {
    log('MinusGraphPattern');
    context.CONSUME(sparqlTokenMap.MINUS);
    context.SUBRULE(context.GroupGraphPattern);
  }),

  GroupOrUnionGraphPattern: context.RULE('GroupOrUnionGraphPattern', () => {
    log('GroupOrUnionGraphPattern');
    context.SUBRULE(context.GroupGraphPattern);
    context.MANY(() => {
      context.CONSUME(sparqlTokenMap.UNION);
      context.SUBRULE1(context.GroupGraphPattern);
    });
  }),

  Filter: context.RULE('Filter', () => {
    log('Filter');
    context.CONSUME(sparqlTokenMap.FILTER);
    context.SUBRULE(context.Constraint);
  }),

  Constraint: context.RULE('Constraint', () => {
    log('Constraint');
    context.OR([
      { ALT: () => context.SUBRULE(context.BrackettedExpression) },
      { ALT: () => context.SUBRULE(context.BuiltInCall) },
      { ALT: () => context.SUBRULE(context.FunctionCall) },
    ]);
  }),

  FunctionCall: context.RULE('FunctionCall', () => {
    log('FunctionCall');
    context.SUBRULE(context.iri);
    context.SUBRULE(context.ArgList);
  }),

  ArgList: context.RULE('ArgList', () => {
    log('ArgList');
    context.OR([
      { ALT: () => context.CONSUME(sparqlTokenMap.NIL) },
      {
        ALT: () => {
          context.CONSUME(sparqlTokenMap.LParen);
          context.OPTION(() => context.CONSUME(sparqlTokenMap.DISTINCT));
          context.SUBRULE(context.Expression);
          context.MANY(() => {
            context.CONSUME(sparqlTokenMap.Comma);
            context.SUBRULE1(context.Expression);
          });
          context.CONSUME(sparqlTokenMap.RParen);
        },
      },
    ]);
  }),

  ExpressionList: context.RULE('ExpressionList', () => {
    log('ExpressionList');
    context.OR([
      { ALT: () => context.CONSUME(sparqlTokenMap.NIL) },
      {
        ALT: () => {
          context.CONSUME(sparqlTokenMap.LParen);
          context.SUBRULE(context.Expression);
          context.MANY(() => {
            context.CONSUME(sparqlTokenMap.Comma);
            context.SUBRULE1(context.Expression);
          });
          context.CONSUME(sparqlTokenMap.RParen);
        },
      },
    ]);
  }),

  ConstructTemplate: context.RULE('ConstructTemplate', () => {
    log('ConstructTemplate');
    context.CONSUME(sparqlTokenMap.LCurly);
    context.OPTION(() => context.SUBRULE(context.ConstructTriples));
    context.CONSUME(sparqlTokenMap.RCurly);
  }),

  ConstructTriples: context.RULE('ConstructTriples', () => {
    log('ConstructTriples');
    context.SUBRULE(context.TriplesSameSubject);
    context.OPTION(() => {
      context.CONSUME(sparqlTokenMap.Period);
      context.OPTION1(() => context.SUBRULE(context.ConstructTriples));
    });
  }),

  TriplesSameSubject: context.RULE('TriplesSameSubject', () => {
    log('TriplesSameSubject');
    context.OR([
      {
        ALT: () => {
          context.SUBRULE(context.VarOrTerm);
          context.SUBRULE(context.PropertyListNotEmpty);
        },
      },
      {
        ALT: () => {
          context.SUBRULE(context.TriplesNode);
          context.SUBRULE(context.PropertyList);
        },
      },
    ]);
  }),

  PropertyList: context.RULE('PropertyList', () => {
    log('PropertyList');
    context.OPTION(() => context.SUBRULE(context.PropertyListNotEmpty));
  }),

  PropertyListNotEmpty: context.RULE('PropertyListNotEmpty', () => {
    log('PropertyListNotEmpty');

    context.SUBRULE(context.Verb);
    context.SUBRULE(context.ObjectList);
    context.MANY(() => {
      context.CONSUME(sparqlTokenMap.Semicolon);
      context.OPTION(() => {
        context.SUBRULE1(context.Verb);
        context.SUBRULE1(context.ObjectList);
      });
    });
  }),

  Verb: context.RULE('Verb', () => {
    log('Verb');
    context.OR([
      { ALT: () => context.SUBRULE(context.VarOrIri) },
      { ALT: () => context.CONSUME(sparqlTokenMap.A) },
    ]);
  }),

  ObjectList: context.RULE('ObjectList', () => {
    log('ObjectList');
    context.AT_LEAST_ONE_SEP({
      SEP: sparqlTokenMap.Comma,
      DEF: () => context.SUBRULE(context.Object),
    });
  }),

  Object: context.RULE('Object', () => {
    log('Object');
    context.SUBRULE(context.GraphNode);
  }),

  TriplesSameSubjectPath: context.RULE('TriplesSameSubjectPath', () => {
    log('TriplesSameSubjectPath');
    context.OR([
      {
        ALT: () => {
          context.SUBRULE(context.VarOrTerm);
          context.SUBRULE(context.PropertyListPathNotEmpty);
        },
      },
      {
        ALT: () => {
          context.SUBRULE(context.TriplesNodePath);
          context.SUBRULE(context.PropertyListPath);
        },
      },
    ]);
  }),

  PropertyListPath: context.RULE('PropertyListPath', () => {
    log('PropertyListPath');
    context.OPTION(() => context.SUBRULE(context.PropertyListPathNotEmpty));
  }),

  PropertyListPathNotEmpty: context.RULE('PropertyListPathNotEmpty', () => {
    log('PropertyListPathNotEmpty');
    context.OR([
      { ALT: () => context.SUBRULE(context.VerbPath) },
      { ALT: () => context.SUBRULE(context.VerbSimple) },
    ]);
    context.SUBRULE(context.ObjectListPath);

    context.MANY(() => {
      context.CONSUME(sparqlTokenMap.Semicolon);
      context.OPTION(() => {
        context.OR1([
          { ALT: () => context.SUBRULE1(context.VerbPath) },
          { ALT: () => context.SUBRULE1(context.VerbSimple) },
        ]);
        context.SUBRULE1(context.ObjectListPath);
      });
    });
  }),

  VerbPath: context.RULE('VerbPath', () => {
    log('VerbPath');
    context.SUBRULE(context.Path);
  }),

  VerbSimple: context.RULE('VerbSimple', () => {
    log('VerbSimple');
    context.SUBRULE(context.Var);
  }),

  ObjectListPath: context.RULE('ObjectListPath', () => {
    log('ObjectListPath');
    context.AT_LEAST_ONE_SEP({
      SEP: sparqlTokenMap.Comma,
      DEF: () => context.SUBRULE(context.ObjectPath),
    });
  }),

  ObjectPath: context.RULE('ObjectPath', () => {
    log('ObjectPath');
    context.SUBRULE(context.GraphNodePath);
  }),

  Path: context.RULE('Path', () => {
    log('Path');
    context.SUBRULE(context.PathAlternative);
  }),

  PathAlternative: context.RULE('PathAlternative', () => {
    log('PathAlternative');
    context.AT_LEAST_ONE_SEP({
      SEP: sparqlTokenMap.Pipe,
      DEF: () => context.SUBRULE(context.PathSequence),
    });
  }),

  PathSequence: context.RULE('PathSequence', () => {
    log('PathSequence');
    context.AT_LEAST_ONE_SEP({
      SEP: sparqlTokenMap.ForwardSlash,
      DEF: () => context.SUBRULE(context.PathEltOrInverse),
    });
  }),

  PathElt: context.RULE('PathElt', () => {
    log('PathElt');
    context.SUBRULE(context.PathPrimary);
    context.OPTION(() => context.SUBRULE(context.PathMod));
  }),

  PathEltOrInverse: context.RULE('PathEltOrInverse', () => {
    log('PathEltOrInverse');
    context.OPTION(() => context.CONSUME(sparqlTokenMap.Caret));
    context.SUBRULE(context.PathElt);
  }),

  PathMod: context.RULE('PathMod', () => {
    log('PathMod');
    context.OR([
      { ALT: () => context.CONSUME(sparqlTokenMap.QuestionMark) },
      { ALT: () => context.CONSUME(sparqlTokenMap.Star) },
      { ALT: () => context.CONSUME(sparqlTokenMap.Plus) },
    ]);
  }),

  PathPrimary: context.RULE('PathPrimary', () => {
    log('PathPrimary');
    context.OR([
      { ALT: () => context.SUBRULE(context.iri) },
      { ALT: () => context.CONSUME(sparqlTokenMap.A) },
      {
        ALT: () => {
          context.CONSUME(sparqlTokenMap.Bang);
          context.SUBRULE(context.PathNegatedPropertySet);
        },
      },
      {
        ALT: () => {
          context.CONSUME(sparqlTokenMap.LParen);
          context.SUBRULE(context.Path);
          context.CONSUME(sparqlTokenMap.RParen);
        },
      },
    ]);
  }),

  PathNegatedPropertySet: context.RULE('PathNegatedPropertySet', () => {
    log('PathNegatedPropertySet');
    context.OR([
      { ALT: () => context.SUBRULE(context.PathOneInPropertySet) },
      {
        ALT: () => {
          context.CONSUME(sparqlTokenMap.LParen);
          context.MANY_SEP({
            SEP: sparqlTokenMap.Pipe,
            DEF: () => context.SUBRULE1(context.PathOneInPropertySet),
          });
          context.CONSUME(sparqlTokenMap.RParen);
        },
      },
    ]);
  }),

  PathOneInPropertySet: context.RULE('PathOneInPropertySet', () => {
    log('PathOneInPropertySet');
    context.OPTION(() => context.CONSUME(sparqlTokenMap.Caret));
    context.OR([
      { ALT: () => context.SUBRULE(context.iri) },
      { ALT: () => context.CONSUME(sparqlTokenMap.A) },
    ]);
  }),

  Integer: context.RULE('Integer', () => {
    log('Integer');
    context.CONSUME(sparqlTokenMap.INTEGER);
  }),

  TriplesNode: context.RULE('TriplesNode', () => {
    log('TriplesNode');
    context.OR([
      { ALT: () => context.SUBRULE(context.Collection) },
      { ALT: () => context.SUBRULE(context.BlankNodePropertyList) },
    ]);
  }),

  BlankNodePropertyList: context.RULE('BlankNodePropertyList', () => {
    log('BlankNodePropertyList');
    context.CONSUME(sparqlTokenMap.LBracket);
    context.SUBRULE(context.PropertyListNotEmpty);
    context.CONSUME(sparqlTokenMap.RBracket);
  }),

  TriplesNodePath: context.RULE('TriplesNodePath', () => {
    log('TriplesNodePath');
    context.OR([
      { ALT: () => context.SUBRULE(context.CollectionPath) },
      { ALT: () => context.SUBRULE(context.BlankNodePropertyListPath) },
    ]);
  }),

  BlankNodePropertyListPath: context.RULE('BlankNodePropertyListPath', () => {
    log('BlankNodePropertyListPath');
    context.CONSUME(sparqlTokenMap.LBracket);
    context.SUBRULE(context.PropertyListPathNotEmpty);
    context.CONSUME(sparqlTokenMap.RBracket);
  }),

  Collection: context.RULE('Collection', () => {
    log('Collection');
    context.CONSUME(sparqlTokenMap.LParen);
    context.AT_LEAST_ONE(() => context.SUBRULE(context.GraphNode));
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  CollectionPath: context.RULE('CollectionPath', () => {
    log('CollectionPath');
    context.CONSUME(sparqlTokenMap.LParen);
    context.AT_LEAST_ONE(() => context.SUBRULE(context.GraphNodePath));
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  GraphNode: context.RULE('GraphNode', () => {
    log('GraphNode');
    context.OR([
      { ALT: () => context.SUBRULE(context.VarOrTerm) },
      { ALT: () => context.SUBRULE(context.TriplesNode) },
    ]);
  }),

  GraphNodePath: context.RULE('GraphNodePath', () => {
    log('GraphNodePath');
    context.OR([
      { ALT: () => context.SUBRULE(context.VarOrTerm) },
      { ALT: () => context.SUBRULE(context.TriplesNodePath) },
    ]);
  }),

  VarOrTerm: context.RULE('VarOrTerm', () => {
    log('VarOrTerm');
    context.OR([
      { ALT: () => context.SUBRULE(context.Var) },
      { ALT: () => context.SUBRULE(context.GraphTerm) },
    ]);
  }),

  VarOrIri: context.RULE('VarOrIri', () => {
    log('VarOrIri');
    context.OR([
      { ALT: () => context.SUBRULE(context.Var) },
      { ALT: () => context.SUBRULE(context.iri) },
    ]);
  }),

  Var: context.RULE('Var', () => {
    log('Var');
    context.OR([
      { ALT: () => context.CONSUME(sparqlTokenMap.VAR1) },
      { ALT: () => context.CONSUME(sparqlTokenMap.VAR2) },
    ]);
  }),

  GraphTerm: context.RULE('GraphTerm', () => {
    log('GraphTerm');
    context.OR([
      { ALT: () => context.SUBRULE(context.iri) },
      { ALT: () => context.SUBRULE(context.RDFLiteral) },
      { ALT: () => context.SUBRULE(context.NumericLiteral) },
      { ALT: () => context.SUBRULE(context.BooleanLiteral) },
      { ALT: () => context.SUBRULE(context.BlankNode) },
      { ALT: () => context.CONSUME(sparqlTokenMap.NIL) },
    ]);
  }),

  Expression: context.RULE('Expression', () => {
    log('Expression');
    context.SUBRULE(context.ConditionalOrExpression);
  }),

  ConditionalOrExpression: context.RULE('ConditionalOrExpression', () => {
    log('ConditionalOrExpression');
    context.AT_LEAST_ONE_SEP({
      SEP: sparqlTokenMap.LogicalOr,
      DEF: () => context.SUBRULE(context.ConditionalAndExpression),
    });
  }),

  ConditionalAndExpression: context.RULE('ConditionalAndExpression', () => {
    log('ConditionalAndExpression');
    context.AT_LEAST_ONE_SEP({
      SEP: sparqlTokenMap.LogicalAnd,
      DEF: () => context.SUBRULE(context.ValueLogical),
    });
  }),

  ValueLogical: context.RULE('ValueLogical', () => {
    log('ValueLogical');
    context.SUBRULE(context.RelationalExpression);
  }),

  RelationalExpression: context.RULE('RelationalExpression', () => {
    log('RelationalExpression');
    context.SUBRULE(context.NumericExpression);
    context.OPTION(() =>
      context.OR([
        {
          ALT: () => {
            context.OR1([
              { ALT: () => context.CONSUME(sparqlTokenMap.Equals) },
              { ALT: () => context.CONSUME(sparqlTokenMap.NotEquals) },
              { ALT: () => context.CONSUME(sparqlTokenMap.LessThan) },
              { ALT: () => context.CONSUME(sparqlTokenMap.GreaterThan) },
              { ALT: () => context.CONSUME(sparqlTokenMap.LessThanEquals) },
              { ALT: () => context.CONSUME(sparqlTokenMap.GreaterThanEquals) },
            ]);
            context.SUBRULE1(context.NumericExpression);
          },
        },
        {
          ALT: () => {
            context.CONSUME(sparqlTokenMap.IN);
            context.SUBRULE(context.ExpressionList);
          },
        },
        {
          ALT: () => {
            context.CONSUME(sparqlTokenMap.NOT_IN);
            context.SUBRULE1(context.ExpressionList);
          },
        },
      ])
    );
  }),

  NumericExpression: context.RULE('NumericExpression', () => {
    log('NumericExpression');
    context.SUBRULE(context.AdditiveExpression);
  }),

  AdditiveExpression: context.RULE('AdditiveExpression', () => {
    log('AdditiveExpression');
    context.SUBRULE(context.MultiplicativeExpression);
    context.MANY(() =>
      context.OR([
        {
          ALT: () => {
            context.OR1([
              { ALT: () => context.CONSUME(sparqlTokenMap.Plus) },
              { ALT: () => context.CONSUME(sparqlTokenMap.Minus) },
            ]);
            context.SUBRULE1(context.MultiplicativeExpression);
          },
        },
        {
          ALT: () => {
            context.OR2([
              { ALT: () => context.SUBRULE(context.NumericLiteralPositive) },
              { ALT: () => context.SUBRULE(context.NumericLiteralNegative) },
            ]);
            context.MANY1(() =>
              context.OR3([
                {
                  ALT: () => {
                    context.OR4([
                      { ALT: () => context.CONSUME(sparqlTokenMap.Star) },
                      {
                        ALT: () => context.CONSUME(sparqlTokenMap.ForwardSlash),
                      },
                    ]);
                    context.SUBRULE1(context.UnaryExpression);
                  },
                },
              ])
            );
          },
        },
      ])
    );
  }),

  MultiplicativeExpression: context.RULE('MultiplicativeExpression', () => {
    log('MultiplicativeExpression');
    context.SUBRULE(context.UnaryExpression);
    context.MANY(() =>
      context.OR([
        {
          ALT: () => {
            context.CONSUME(sparqlTokenMap.Star);
            context.SUBRULE1(context.UnaryExpression);
          },
        },
        {
          ALT: () => {
            context.CONSUME(sparqlTokenMap.ForwardSlash);
            context.SUBRULE2(context.UnaryExpression);
          },
        },
      ])
    );
  }),

  UnaryExpression: context.RULE('UnaryExpression', () => {
    log('UnaryExpression');
    context.OR([
      {
        ALT: () => {
          context.CONSUME(sparqlTokenMap.Bang);
          context.SUBRULE(context.PrimaryExpression);
        },
      },
      {
        ALT: () => {
          context.CONSUME(sparqlTokenMap.Plus);
          context.SUBRULE1(context.PrimaryExpression);
        },
      },
      {
        ALT: () => {
          context.CONSUME(sparqlTokenMap.Minus);
          context.SUBRULE2(context.PrimaryExpression);
        },
      },
      { ALT: () => context.SUBRULE3(context.PrimaryExpression) },
    ]);
  }),

  PrimaryExpression: context.RULE('PrimaryExpression', () => {
    log('PrimaryExpression');
    context.OR([
      { ALT: () => context.SUBRULE(context.BrackettedExpression) },
      { ALT: () => context.SUBRULE(context.BuiltInCall) },
      { ALT: () => context.SUBRULE(context.iriOrFunction) },
      { ALT: () => context.SUBRULE(context.RDFLiteral) },
      { ALT: () => context.SUBRULE(context.NumericLiteral) },
      { ALT: () => context.SUBRULE(context.BooleanLiteral) },
      { ALT: () => context.SUBRULE(context.Var) },
    ]);
  }),

  BrackettedExpression: context.RULE('BrackettedExpression', () => {
    log('BrackettedExpression');
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_STR: context.RULE('BuiltInCall_STR', () => {
    log('BuiltInCall_STR');
    context.CONSUME(sparqlTokenMap.STR);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_LANG: context.RULE('BuiltInCall_LANG', () => {
    log('BuiltInCall_LANG');
    context.CONSUME(sparqlTokenMap.LANG);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_LANGMATCHES: context.RULE('BuiltInCall_LANGMATCHES', () => {
    log('BuiltInCall_LANGMATCHES');
    context.CONSUME(sparqlTokenMap.LANGMATCHES);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.Comma);
    context.SUBRULE1(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_DATATYPE: context.RULE('BuiltInCall_DATATYPE', () => {
    log('BuiltInCall_DATATYPE');
    context.CONSUME(sparqlTokenMap.DATATYPE);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_BOUND: context.RULE('BuiltInCall_BOUND', () => {
    log('BuiltInCall_BOUND');
    context.CONSUME(sparqlTokenMap.BOUND);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Var);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_IRI: context.RULE('BuiltInCall_IRI', () => {
    log('BuiltInCall_IRI');
    context.CONSUME(sparqlTokenMap.IRI);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_URI: context.RULE('BuiltInCall_URI', () => {
    log('BuiltInCall_URI');
    context.CONSUME(sparqlTokenMap.URI);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_BNODE: context.RULE('BuiltInCall_BNODE', () => {
    log('BuiltInCall_BNODE');
    context.CONSUME(sparqlTokenMap.BNODE);
    context.OR([
      {
        ALT: () => {
          context.CONSUME(sparqlTokenMap.LParen);
          context.SUBRULE(context.Expression);
          context.CONSUME(sparqlTokenMap.RParen);
        },
      },
      { ALT: () => context.CONSUME(sparqlTokenMap.NIL) },
    ]);
  }),
  BuiltInCall_RAND: context.RULE('BuiltInCall_RAND', () => {
    log('BuiltInCall_RAND');
    context.CONSUME(sparqlTokenMap.RAND);
    context.CONSUME(sparqlTokenMap.NIL);
  }),
  BuiltInCall_ABS: context.RULE('BuiltInCall_ABS', () => {
    log('BuiltInCall_ABS');
    context.CONSUME(sparqlTokenMap.ABS);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_CEIL: context.RULE('BuiltInCall_CEIL', () => {
    log('BuiltInCall_CEIL');
    context.CONSUME(sparqlTokenMap.CEIL);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_FLOOR: context.RULE('BuiltInCall_FLOOR', () => {
    log('BuiltInCall_FLOOR');
    context.CONSUME(sparqlTokenMap.FLOOR);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_ROUND: context.RULE('BuiltInCall_ROUND', () => {
    log('BuiltInCall_ROUND');
    context.CONSUME(sparqlTokenMap.ROUND);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_CONCAT: context.RULE('BuiltInCall_CONCAT', () => {
    log('BuiltInCall_CONCAT');
    context.CONSUME(sparqlTokenMap.CONCAT);
    context.SUBRULE(context.ExpressionList);
  }),
  BuiltInCall_STRLEN: context.RULE('BuiltInCall_STRLEN', () => {
    log('BuiltInCall_STRLEN');
    context.CONSUME(sparqlTokenMap.STRLEN);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_UCASE: context.RULE('BuiltInCall_UCASE', () => {
    log('BuiltInCall_UCASE');
    context.CONSUME(sparqlTokenMap.UCASE);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_LCASE: context.RULE('BuiltInCall_LCASE', () => {
    log('BuiltInCall_LCASE');
    context.CONSUME(sparqlTokenMap.LCASE);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_ENCODE_FOR_URI: context.RULE('BuiltInCall_ENCODE_FOR_URI', () => {
    log('BuiltInCall_ENCODE_FOR_URI');
    context.CONSUME(sparqlTokenMap.ENCODE_FOR_URI);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),
  BuiltInCall_CONTAINS: context.RULE('BuiltInCall_CONTAINS', () => {
    log('BuiltInCall_CONTAINS');
    context.CONSUME(sparqlTokenMap.CONTAINS);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.Comma);
    context.SUBRULE1(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_STRSTARTS: context.RULE('BuiltInCall_STRSTARTS', () => {
    log('BuiltInCall_STRSTARTS');
    context.CONSUME(sparqlTokenMap.STRSTARTS);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.Comma);
    context.SUBRULE1(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_STRENDS: context.RULE('BuiltInCall_STRENDS', () => {
    log('BuiltInCall_STRENDS');
    context.CONSUME(sparqlTokenMap.STRENDS);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.Comma);
    context.SUBRULE1(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_STRBEFORE: context.RULE('BuiltInCall_STRBEFORE', () => {
    log('BuiltInCall_STRBEFORE');
    context.CONSUME(sparqlTokenMap.STRBEFORE);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.Comma);
    context.SUBRULE1(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_STRAFTER: context.RULE('BuiltInCall_STRAFTER', () => {
    log('BuiltInCall_STRAFTER');
    context.CONSUME(sparqlTokenMap.STRAFTER);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.Comma);
    context.SUBRULE1(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_YEAR: context.RULE('BuiltInCall_YEAR', () => {
    log('BuiltInCall_YEAR');
    context.CONSUME(sparqlTokenMap.YEAR);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_MONTH: context.RULE('BuiltInCall_MONTH', () => {
    log('BuiltInCall_MONTH');
    context.CONSUME(sparqlTokenMap.MONTH);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_DAY: context.RULE('BuiltInCall_DAY', () => {
    log('BuiltInCall_DAY');
    context.CONSUME(sparqlTokenMap.DAY);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_HOURS: context.RULE('BuiltInCall_HOURS', () => {
    log('BuiltInCall_HOURS');
    context.CONSUME(sparqlTokenMap.HOURS);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_MINUTES: context.RULE('BuiltInCall_MINUTES', () => {
    log('BuiltInCall_MINUTES');
    context.CONSUME(sparqlTokenMap.MINUTES);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_SECONDS: context.RULE('BuiltInCall_SECONDS', () => {
    log('BuiltInCall_SECONDS');
    context.CONSUME(sparqlTokenMap.SECONDS);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_TIMEZONE: context.RULE('BuiltInCall_TIMEZONE', () => {
    log('BuiltInCall_TIMEZONE');
    context.CONSUME(sparqlTokenMap.TIMEZONE);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_TZ: context.RULE('BuiltInCall_TZ', () => {
    log('BuiltInCall_TZ');
    context.CONSUME(sparqlTokenMap.TZ);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_NOW: context.RULE('BuiltInCall_NOW', () => {
    log('BuiltInCall_NOW');
    context.CONSUME(sparqlTokenMap.NOW);
    context.CONSUME(sparqlTokenMap.NIL);
  }),

  BuiltInCall_UUID: context.RULE('BuiltInCall_UUID', () => {
    log('BuiltInCall_UUID');
    context.CONSUME(sparqlTokenMap.UUID);
    context.CONSUME(sparqlTokenMap.NIL);
  }),

  BuiltInCall_STRUUID: context.RULE('BuiltInCall_STRUUID', () => {
    log('BuiltInCall_STRUUID');
    context.CONSUME(sparqlTokenMap.STRUUID);
    context.CONSUME(sparqlTokenMap.NIL);
  }),

  BuiltInCall_MD5: context.RULE('BuiltInCall_MD5', () => {
    log('BuiltInCall_MD5');
    context.CONSUME(sparqlTokenMap.MD5);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_SHA1: context.RULE('BuiltInCall_SHA1', () => {
    log('BuiltInCall_SHA1');
    context.CONSUME(sparqlTokenMap.SHA1);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_SHA256: context.RULE('BuiltInCall_SHA256', () => {
    log('BuiltInCall_SHA256');
    context.CONSUME(sparqlTokenMap.SHA256);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_SHA384: context.RULE('BuiltInCall_SHA384', () => {
    log('BuiltInCall_SHA384');
    context.CONSUME(sparqlTokenMap.SHA384);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_SHA512: context.RULE('BuiltInCall_SHA512', () => {
    log('BuiltInCall_SHA512');
    context.CONSUME(sparqlTokenMap.SHA512);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_COALESCE: context.RULE('BuiltInCall_COALESCE', () => {
    log('BuiltInCall_COALESCE');
    context.CONSUME(sparqlTokenMap.COALESCE);
    context.SUBRULE(context.ExpressionList);
  }),

  BuiltInCall_IF: context.RULE('BuiltInCall_IF', () => {
    log('BuiltInCall_IF');
    context.CONSUME(sparqlTokenMap.IF);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.Comma);
    context.SUBRULE1(context.Expression);
    context.CONSUME1(sparqlTokenMap.Comma);
    context.SUBRULE2(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_STRLANG: context.RULE('BuiltInCall_STRLANG', () => {
    log('BuiltInCall_STRLANG');
    context.CONSUME(sparqlTokenMap.STRLANG);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.Comma);
    context.SUBRULE1(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_STRDT: context.RULE('BuiltInCall_STRDT', () => {
    log('BuiltInCall_STRDT');
    context.CONSUME(sparqlTokenMap.STRDT);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.Comma);
    context.SUBRULE1(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_sameTerm: context.RULE('BuiltInCall_sameTerm', () => {
    log('BuiltInCall_sameTerm');
    context.CONSUME(sparqlTokenMap.sameTerm);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.Comma);
    context.SUBRULE1(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_isIRI: context.RULE('BuiltInCall_isIRI', () => {
    log('BuiltInCall_isIRI');
    context.CONSUME(sparqlTokenMap.isIRI);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_isURI: context.RULE('BuiltInCall_isURI', () => {
    log('BuiltInCall_isURI');
    context.CONSUME(sparqlTokenMap.isURI);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_isBlank: context.RULE('BuiltInCall_isBlank', () => {
    log('BuiltInCall_isBlank');
    context.CONSUME(sparqlTokenMap.isBlank);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_isLiteral: context.RULE('BuiltInCall_isLiteral', () => {
    log('BuiltInCall_isLiteral');
    context.CONSUME(sparqlTokenMap.isLiteral);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall_isNumeric: context.RULE('BuiltInCall_isNumeric', () => {
    log('BuiltInCall_isNumeric');
    context.CONSUME(sparqlTokenMap.isNumeric);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  BuiltInCall: context.RULE('BuiltInCall', () => {
    log('BuiltInCall');
    context.OR([
      { ALT: () => context.SUBRULE(context.Aggregate) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_STR) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_LANG) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_LANGMATCHES) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_DATATYPE) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_BOUND) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_IRI) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_URI) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_BNODE) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_RAND) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_ABS) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_CEIL) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_FLOOR) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_ROUND) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_CONCAT) },
      { ALT: () => context.SUBRULE(context.SubstringExpression) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_STRLEN) },
      { ALT: () => context.SUBRULE(context.StrReplaceExpression) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_UCASE) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_LCASE) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_ENCODE_FOR_URI) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_CONTAINS) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_STRSTARTS) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_STRENDS) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_STRBEFORE) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_STRAFTER) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_YEAR) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_MONTH) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_DAY) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_HOURS) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_MINUTES) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_SECONDS) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_TIMEZONE) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_TZ) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_NOW) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_UUID) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_STRUUID) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_MD5) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_SHA1) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_SHA256) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_SHA384) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_SHA512) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_COALESCE) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_IF) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_STRLANG) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_STRDT) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_sameTerm) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_isIRI) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_isURI) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_isBlank) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_isLiteral) },
      { ALT: () => context.SUBRULE(context.BuiltInCall_isNumeric) },
      { ALT: () => context.SUBRULE(context.RegexExpression) },
      { ALT: () => context.SUBRULE(context.ExistsFunction) },
      { ALT: () => context.SUBRULE(context.NotExistsFunction) },
    ]);
  }),

  RegexExpression: context.RULE('RegexExpression', () => {
    log('RegexExpression');
    context.CONSUME(sparqlTokenMap.REGEX);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.Comma);
    context.SUBRULE1(context.Expression);
    context.OPTION(() => {
      context.CONSUME1(sparqlTokenMap.Comma);
      context.SUBRULE2(context.Expression);
    });
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  SubstringExpression: context.RULE('SubstringExpression', () => {
    log('SubstringExpression');
    context.CONSUME(sparqlTokenMap.SUBSTR);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.Comma);
    context.SUBRULE1(context.Expression);
    context.OPTION(() => {
      context.CONSUME1(sparqlTokenMap.Comma);
      context.SUBRULE2(context.Expression);
    });
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  StrReplaceExpression: context.RULE('StrReplaceExpression', () => {
    log('StrReplaceExpression');
    context.CONSUME(sparqlTokenMap.REPLACE);
    context.CONSUME(sparqlTokenMap.LParen);
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.Comma);
    context.SUBRULE1(context.Expression);
    context.CONSUME1(sparqlTokenMap.Comma);
    context.SUBRULE2(context.Expression);
    context.OPTION(() => {
      context.CONSUME2(sparqlTokenMap.Comma);
      context.SUBRULE3(context.Expression);
    });
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  ExistsFunction: context.RULE('ExistsFunction', () => {
    log('ExistsFunction');
    context.CONSUME(sparqlTokenMap.EXISTS);
    context.SUBRULE(context.GroupGraphPattern);
  }),

  NotExistsFunction: context.RULE('NotExistsFunction', () => {
    log('NotExistsFunction');
    context.CONSUME(sparqlTokenMap.NOT_EXISTS);
    context.SUBRULE(context.GroupGraphPattern);
  }),

  Count: context.RULE('Count', () => {
    log('Count');
    context.CONSUME(sparqlTokenMap.COUNT);
    context.CONSUME1(sparqlTokenMap.LParen);
    context.OPTION(() => context.CONSUME2(sparqlTokenMap.DISTINCT));
    context.OR([
      { ALT: () => context.CONSUME3(sparqlTokenMap.Star) },
      { ALT: () => context.SUBRULE(context.Expression) },
    ]);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  Sum: context.RULE('Sum', () => {
    log('Sum');
    context.CONSUME(sparqlTokenMap.SUM);
    context.CONSUME1(sparqlTokenMap.LParen);
    context.OPTION(() => context.CONSUME2(sparqlTokenMap.DISTINCT));
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  Min: context.RULE('Min', () => {
    log('Min');
    context.CONSUME(sparqlTokenMap.MIN);
    context.CONSUME1(sparqlTokenMap.LParen);
    context.OPTION(() => context.CONSUME2(sparqlTokenMap.DISTINCT));
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  Max: context.RULE('Max', () => {
    log('Max');
    context.CONSUME(sparqlTokenMap.MAX);
    context.CONSUME1(sparqlTokenMap.LParen);
    context.OPTION(() => context.CONSUME2(sparqlTokenMap.DISTINCT));
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  Avg: context.RULE('Avg', () => {
    log('Avg');
    context.CONSUME(sparqlTokenMap.AVG);
    context.CONSUME1(sparqlTokenMap.LParen);
    context.OPTION(() => context.CONSUME2(sparqlTokenMap.DISTINCT));
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  Sample: context.RULE('Sample', () => {
    log('Sample');
    context.CONSUME(sparqlTokenMap.SAMPLE);
    context.CONSUME1(sparqlTokenMap.LParen);
    context.OPTION(() => context.CONSUME2(sparqlTokenMap.DISTINCT));
    context.SUBRULE(context.Expression);
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  GroupConcat: context.RULE('GroupConcat', () => {
    log('GroupConcat');
    context.CONSUME(sparqlTokenMap.GROUP_CONCAT);
    context.CONSUME1(sparqlTokenMap.LParen);
    context.OPTION(() => context.CONSUME2(sparqlTokenMap.DISTINCT));
    context.SUBRULE(context.Expression);
    context.OPTION1(() => {
      context.CONSUME(sparqlTokenMap.Semicolon);
      context.CONSUME(sparqlTokenMap.SEPARATOR);
      context.CONSUME(sparqlTokenMap.Equals);
      context.SUBRULE(context.String);
    });
    context.CONSUME(sparqlTokenMap.RParen);
  }),

  Aggregate: context.RULE('Aggregate', () => {
    log('Aggregate');
    context.OR([
      { ALT: () => context.SUBRULE(context.Count) },
      { ALT: () => context.SUBRULE(context.Sum) },
      { ALT: () => context.SUBRULE(context.Min) },
      { ALT: () => context.SUBRULE(context.Max) },
      { ALT: () => context.SUBRULE(context.Avg) },
      { ALT: () => context.SUBRULE(context.Sample) },
      { ALT: () => context.SUBRULE(context.GroupConcat) },
    ]);
  }),

  iriOrFunction: context.RULE('iriOrFunction', () => {
    log('iriOrFunction');
    context.SUBRULE(context.iri);
    context.OPTION(() => context.SUBRULE(context.ArgList));
  }),

  RDFLiteral: context.RULE('RDFLiteral', () => {
    log('RDFLiteral');
    context.SUBRULE(context.String);
    context.OPTION(() =>
      context.OR([
        { ALT: () => context.CONSUME(sparqlTokenMap.LANGTAG) },
        {
          ALT: () => {
            context.CONSUME(sparqlTokenMap.DoubleCaret);
            context.SUBRULE(context.iri);
          },
        },
      ])
    );
  }),

  NumericLiteral: context.RULE('NumericLiteral', () => {
    log('NumericLiteral');
    context.OR([
      { ALT: () => context.SUBRULE(context.NumericLiteralUnsigned) },
      { ALT: () => context.SUBRULE(context.NumericLiteralPositive) },
      { ALT: () => context.SUBRULE(context.NumericLiteralNegative) },
    ]);
  }),

  NumericLiteralUnsigned: context.RULE('NumericLiteralUnsigned', () => {
    log('NumericLiteralUnsigned');
    context.OR([
      { ALT: () => context.CONSUME(sparqlTokenMap.INTEGER) },
      { ALT: () => context.CONSUME(sparqlTokenMap.DECIMAL) },
      { ALT: () => context.CONSUME(sparqlTokenMap.DOUBLE) },
    ]);
  }),

  NumericLiteralPositive: context.RULE('NumericLiteralPositive', () => {
    log('NumericLiteralPositive');
    context.OR([
      { ALT: () => context.CONSUME(sparqlTokenMap.INTEGER_POSITIVE) },
      { ALT: () => context.CONSUME(sparqlTokenMap.DECIMAL_POSITIVE) },
      { ALT: () => context.CONSUME(sparqlTokenMap.DOUBLE_POSITIVE) },
    ]);
  }),

  NumericLiteralNegative: context.RULE('NumericLiteralNegative', () => {
    log('NumericLiteralNegative');
    context.OR([
      { ALT: () => context.CONSUME(sparqlTokenMap.INTEGER_NEGATIVE) },
      { ALT: () => context.CONSUME(sparqlTokenMap.DECIMAL_NEGATIVE) },
      { ALT: () => context.CONSUME(sparqlTokenMap.DOUBLE_NEGATIVE) },
    ]);
  }),

  BooleanLiteral: context.RULE('BooleanLiteral', () => {
    log('BooleanLiteral');
    context.OR([
      { ALT: () => context.CONSUME(sparqlTokenMap.TRUE) },
      { ALT: () => context.CONSUME(sparqlTokenMap.FALSE) },
    ]);
  }),

  String: context.RULE('String', () => {
    log('String');
    context.OR([
      { ALT: () => context.CONSUME(sparqlTokenMap.STRING_LITERAL1) },
      { ALT: () => context.CONSUME(sparqlTokenMap.STRING_LITERAL2) },
      { ALT: () => context.CONSUME(sparqlTokenMap.STRING_LITERAL_LONG1) },
      { ALT: () => context.CONSUME(sparqlTokenMap.STRING_LITERAL_LONG2) },
    ]);
  }),

  iri: context.RULE('iri', () => {
    log('iri');
    context.OR([
      { ALT: () => context.CONSUME(sparqlTokenMap.IRIREF) },
      { ALT: () => context.SUBRULE(context.PrefixedName) },
    ]);
  }),

  PrefixedName: context.RULE('PrefixedName', () => {
    log('PrefixedName');
    context.OR([
      { ALT: () => context.CONSUME(sparqlTokenMap.PNAME_LN) },
      { ALT: () => context.CONSUME(sparqlTokenMap.PNAME_NS) },
    ]);
  }),

  BlankNode: context.RULE('BlankNode', () => {
    log('BlankNode');
    context.OR([
      { ALT: () => context.CONSUME(sparqlTokenMap.BLANK_NODE_LABEL) },
      { ALT: () => context.CONSUME(sparqlTokenMap.ANON) },
    ]);
  }),
});

export class BaseSparqlParser extends Parser implements IStardogParser {
  private lexer: Lexer;

  public tokenize = (document: string): IToken[] =>
    this.lexer.tokenize(document).tokens;

  public parse = (document: string) => {
    this.input = this.lexer.tokenize(document).tokens;
    // @ts-ignore
    const cst = this.SparqlDoc();
    const errors: IRecognitionException[] = this.errors;
    return {
      errors,
      cst,
    };
  };

  constructor(
    options: {
      input?: IToken[];
      config?: Partial<IParserConfig>;
    } = {},
    tokenVocab: TokenType[]
  ) {
    super(options.input || [], tokenVocab, {
      recoveryEnabled: true,
      outputCst: true,
      ...options.config,
    });

    const rules = getRules(this);
    Object.keys(rules).forEach((ruleKey) => (this[ruleKey] = rules[ruleKey]));

    this.lexer = new Lexer(tokenVocab);
  }
}
