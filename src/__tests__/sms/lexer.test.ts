import { Lexer } from 'chevrotain';
import { tokenTypes, tokenMap } from '../../sms/tokens';
import { fixtures } from './fixtures';

const lexer = new Lexer(tokenTypes);

describe('sms lexer', () => {
  it('tokenizes a sql mapping', () => {
    const { tokens, errors } = lexer.tokenize(fixtures.sqlMapping);
    const sqlBlockIdx = tokens.findIndex((tkn) => {
      return tkn.tokenType.tokenName === tokenMap.SqlBlock.tokenName;
    });
    expect(errors).toHaveLength(0);
    expect(sqlBlockIdx).toBeTruthy();
    expect(tokens[sqlBlockIdx + 1].tokenType.tokenName).toBe(
      tokenMap.RCurly.tokenName
    );
    expect(tokens[sqlBlockIdx + 2].tokenType.tokenName).toBe(
      tokenMap.TO.tokenName
    );
  });
  it('successfully fails to tokenize a sql clause with a missing closing bracket, rather than hanging', () => {
    const { errors } = lexer.tokenize(fixtures.nonTerminatedSqlBlock);
    expect(errors).toHaveLength(3);
  });
  it('tokenizes a json mapping', () => {
    const { tokens, errors } = lexer.tokenize(fixtures.jsonMapping);
    const jsonBlockIdx = tokens.findIndex((tkn) => {
      return tkn.tokenType.tokenName === tokenMap.JsonBlock.tokenName;
    });
    expect(errors).toHaveLength(0);
    expect(jsonBlockIdx).toBeTruthy();
    expect(tokens[jsonBlockIdx + 1].tokenType.tokenName).toBe(
      tokenMap.TO.tokenName
    );
  });
  it('tokenizes a graphql mapping', () => {
    const { tokens, errors } = lexer.tokenize(fixtures.graphQlMapping);
    const graphQlBlockIdx = tokens.findIndex((tkn) => {
      return tkn.tokenType.tokenName === tokenMap.GraphQlBlock.tokenName;
    });
    expect(errors).toHaveLength(0);
    expect(graphQlBlockIdx).toBeTruthy();
    expect(tokens[graphQlBlockIdx + 1].tokenType.tokenName).toBe(
      tokenMap.RCurly.tokenName
    );
    expect(tokens[graphQlBlockIdx + 2].tokenType.tokenName).toBe(
      tokenMap.TO.tokenName
    );
  });
});
