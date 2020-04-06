const { smsTokenTypes, smsTokenMap } = require('../../sms/tokens');
import { Lexer } from 'chevrotain';
import { fixtures } from './fixtures';

const lexer = new Lexer(smsTokenTypes);

describe('sms lexer', () => {
  it('tokenizes a sql mapping', () => {
    const { tokens, errors } = lexer.tokenize(fixtures.sqlMapping);
    const sqlBlockIdx = tokens.findIndex((tkn) => {
      return tkn.tokenType.tokenName === smsTokenMap.SqlBlock.tokenName;
    });
    expect(errors).toHaveLength(0);
    expect(sqlBlockIdx).toBeTruthy();
    expect(tokens[sqlBlockIdx + 1].tokenType.tokenName).toBe(
      smsTokenMap.RCurly.tokenName
    );
    expect(tokens[sqlBlockIdx + 2].tokenType.tokenName).toBe(
      smsTokenMap.TO.tokenName
    );
  });
  it('successfully fails to tokenize a sql clause with a missing closing bracket, rather than hanging', () => {
    const { errors } = lexer.tokenize(fixtures.nonTerminatedSqlBlock);
    expect(errors).toBeDefined();
  });
  it('tokenizes a json mapping', () => {
    const { tokens, errors } = lexer.tokenize(fixtures.jsonMapping);
    const jsonBlockIdx = tokens.findIndex((tkn) => {
      return tkn.tokenType.tokenName === smsTokenMap.JsonBlock.tokenName;
    });
    expect(errors).toHaveLength(0);
    expect(jsonBlockIdx).toBeTruthy();
    expect(tokens[jsonBlockIdx + 1].tokenType.tokenName).toBe(
      smsTokenMap.TO.tokenName
    );
  });
  it('tokenizes a graphql mapping', () => {
    const { tokens, errors } = lexer.tokenize(fixtures.graphQlMapping);
    const graphQlBlockIdx = tokens.findIndex((tkn) => {
      return tkn.tokenType.tokenName === smsTokenMap.GraphQlBlock.tokenName;
    });
    expect(errors).toHaveLength(0);
    expect(graphQlBlockIdx).toBeTruthy();
    expect(tokens[graphQlBlockIdx + 1].tokenType.tokenName).toBe(
      smsTokenMap.RCurly.tokenName
    );
    expect(tokens[graphQlBlockIdx + 2].tokenType.tokenName).toBe(
      smsTokenMap.TO.tokenName
    );
  });
  describe('tokenizes a csv mapping', () => {
    it('with brace', () => {
      const { tokens, errors } = lexer.tokenize(fixtures.csvMapping.brace);
      const index = tokens.findIndex(
        (token) => token.tokenType.tokenName === smsTokenMap.Csv.tokenName
      );

      expect(errors).toHaveLength(0);
      expect(tokens[index].tokenType.tokenName).toBe(smsTokenMap.Csv.tokenName);
      expect(tokens[index + 1].tokenType.tokenName).toBe(
        smsTokenMap.LCurly.tokenName
      );
    });
    it('no brace', () => {
      const { tokens, errors } = lexer.tokenize(fixtures.csvMapping.no_brace);
      const index = tokens.findIndex(
        (token) => token.tokenType.tokenName === smsTokenMap.Csv.tokenName
      );

      expect(errors).toHaveLength(0);
      expect(tokens[index].tokenType.tokenName).toBe(smsTokenMap.Csv.tokenName);
      expect(tokens[index + 1].tokenType.tokenName).toBe(
        smsTokenMap.TO.tokenName
      );
    });
  });
});
