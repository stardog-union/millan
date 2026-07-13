const { smsTokenTypes, smsTokenMap } = require('../../sms/tokens');
import { Lexer } from 'chevrotain';
import { fixtures } from './fixtures';

const lexer = new Lexer(smsTokenTypes);

describe('sms lexer', () => {
  it('tokenizes a sql mapping', () => {
    const { tokens, errors } = lexer.tokenize(fixtures.sqlMapping);
    const sqlBlockIdx = tokens.findIndex((tkn) => {
      return tkn.tokenType.name === smsTokenMap.SqlBlock.name;
    });
    expect(errors).toHaveLength(0);
    expect(sqlBlockIdx).toBeTruthy();
    expect(tokens[sqlBlockIdx + 1].tokenType.name).toBe(
      smsTokenMap.RCurly.name
    );
    expect(tokens[sqlBlockIdx + 2].tokenType.name).toBe(smsTokenMap.TO.name);
  });
  it('successfully fails to tokenize a sql clause with a missing closing bracket, rather than hanging', () => {
    const { errors } = lexer.tokenize(fixtures.nonTerminatedSqlBlock);
    expect(errors).toBeDefined();
  });
  it('tokenizes a json mapping', () => {
    const { tokens, errors } = lexer.tokenize(fixtures.jsonMapping);
    const jsonBlockIdx = tokens.findIndex((tkn) => {
      return tkn.tokenType.name === smsTokenMap.JsonBlock.name;
    });
    expect(errors).toHaveLength(0);
    expect(jsonBlockIdx).toBeTruthy();
    expect(tokens[jsonBlockIdx + 1].tokenType.name).toBe(smsTokenMap.TO.name);
  });
  it('tokenizes a graphql mapping', () => {
    const { tokens, errors } = lexer.tokenize(fixtures.graphQlMapping);
    const graphQlBlockIdx = tokens.findIndex((tkn) => {
      return tkn.tokenType.name === smsTokenMap.GraphQlBlock.name;
    });
    expect(errors).toHaveLength(0);
    expect(graphQlBlockIdx).toBeTruthy();
    expect(tokens[graphQlBlockIdx + 1].tokenType.name).toBe(
      smsTokenMap.RCurly.name
    );
    expect(tokens[graphQlBlockIdx + 2].tokenType.name).toBe(
      smsTokenMap.TO.name
    );
  });
  describe('tokenizes a csv mapping', () => {
    it('with brace', () => {
      const { tokens, errors } = lexer.tokenize(fixtures.csvMapping.brace);
      const index = tokens.findIndex(
        (token) => token.tokenType.name === smsTokenMap.Csv.name
      );

      expect(errors).toHaveLength(0);
      expect(tokens[index].tokenType.name).toBe(smsTokenMap.Csv.name);
      expect(tokens[index + 1].tokenType.name).toBe(smsTokenMap.LCurly.name);
    });
    it('no brace', () => {
      const { tokens, errors } = lexer.tokenize(fixtures.csvMapping.no_brace);
      const index = tokens.findIndex(
        (token) => token.tokenType.name === smsTokenMap.Csv.name
      );

      expect(errors).toHaveLength(0);
      expect(tokens[index].tokenType.name).toBe(smsTokenMap.Csv.name);
      expect(tokens[index + 1].tokenType.name).toBe(smsTokenMap.TO.name);
    });
  });
});
