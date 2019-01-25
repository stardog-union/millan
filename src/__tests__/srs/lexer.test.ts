import { Lexer, Parser } from 'chevrotain';
import { multiModeLexerDefinition } from '../../srs/tokens';
import { fixtures } from './fixtures';

const lexer = new Lexer(multiModeLexerDefinition);

describe('srs lexer', () => {
  it('correctly lexes a basic isolated rule', () => {
    const { errors, tokens } = lexer.tokenize(fixtures.valid.basicIsolated);
    expect(errors).toHaveLength(0);
    expect(tokens[0].image).toBe('IF {');
    expect(tokens[0].tokenType.tokenName).toBe('If');
    expect(tokens.some((token) => token.tokenType.tokenName === 'EndIf')).toBe(
      true
    );
    expect(tokens.some((token) => token.tokenType.tokenName === 'Then')).toBe(
      true
    );
    expect(
      tokens.some((token) => token.tokenType.tokenName === 'EndThen')
    ).toBe(true);
  });

  it('correctly lexes a basic rule with surrounding Turtle', () => {
    const { errors, tokens } = lexer.tokenize(fixtures.valid.basic);
    expect(errors).toHaveLength(0);
    expect(tokens[0].image).toBe('@prefix');
    expect(tokens[0].tokenType.tokenName).toBe('TTL_PREFIX');
    expect(tokens.some((token) => token.tokenType.tokenName === 'If')).toBe(
      true
    );
    expect(tokens.some((token) => token.tokenType.tokenName === 'EndIf')).toBe(
      true
    );
    expect(tokens.some((token) => token.tokenType.tokenName === 'Then')).toBe(
      true
    );
    expect(
      tokens.some((token) => token.tokenType.tokenName === 'EndThen')
    ).toBe(true);
  });

  it('parses valid SRS documents with no errors', () => {
    const validDocuments = fixtures.valid;
    Object.keys(validDocuments).forEach((docKey) => {
      const cst = lexer.tokenize(validDocuments[docKey]);

      if (cst.errors.length > 0) {
        console.log('Error in', docKey);
      }

      expect(cst.errors).toHaveLength(0);
    });
  });

  it.skip('catches errors in invalid SRS documents', () => {
    const invalidLex = fixtures.invalid.lex;
    Object.keys(invalidLex).forEach((key) => {
      const { errors } = lexer.tokenize(invalidLex[key]);

      if (errors.length === 0) {
        console.log('No errors caught in', key);
      }

      expect(errors).not.toHaveLength(0);
    });
  });
});
