import { SmsParser } from '../../sms/SmsParser';
import { tokenTypes } from '../../sms/tokens';
import { fixtures } from './fixtures';

const parser = new SmsParser({}, tokenTypes);

describe('SmsParser', () => {
  it('parses a sql mapping', () => {
    const { cst, errors } = parser.parse(fixtures.sqlMapping);
    expect(errors).toHaveLength(0);
  });
  it('parses a json mapping', () => {
    const { cst, errors } = parser.parse(fixtures.jsonMapping);
    expect(errors).toHaveLength(0);
  });
  it('parses a graphql mapping', () => {
    const { cst, errors } = parser.parse(fixtures.graphQlMapping);
    expect(errors).toHaveLength(0);
  });
  it('parses multiple json mappings with comments and prefixes', () => {
    const { cst, errors } = parser.parse(fixtures.multipleJsonWithComments);
    expect(errors).toHaveLength(0);
  });
  it('parses prefixDecls', () => {
    const { cst, errors } = parser.parse(fixtures.prefixDecls);
    expect(errors).toHaveLength(0);
  });
  it('parses comments', () => {
    const { cst, errors } = parser.parse(fixtures.comments);
    expect(errors).toHaveLength(0);
  });
});
