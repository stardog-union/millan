import { SmsParser } from '../../sms/SmsParser';
import { fixtures } from './fixtures';

const parser = new SmsParser({});

describe('SmsParser', () => {
  it('parses a sql mapping', () => {
    const { errors } = parser.parse(fixtures.sqlMapping);
    expect(errors).toHaveLength(0);
  });
  it('parses a json mapping', () => {
    const { errors } = parser.parse(fixtures.jsonMapping);
    expect(errors).toHaveLength(0);
  });
  it('parses a graphql mapping', () => {
    const { errors } = parser.parse(fixtures.graphQlMapping);
    expect(errors).toHaveLength(0);
  });
  describe('parses the csv clause', () => {
    it('with brace', () => {
      const { errors } = parser.parse(fixtures.csvMapping.brace);
      expect(errors).toHaveLength(0);
    });
    it('no brace', () => {
      const { errors } = parser.parse(fixtures.csvMapping.no_brace);
      expect(errors).toHaveLength(0);
    });
  });
  it('parses multiple json mappings with comments and prefixes', () => {
    const { errors } = parser.parse(fixtures.multipleJsonWithComments);
    expect(errors).toHaveLength(0);
  });
  it('parses prefixDecls', () => {
    const { errors } = parser.parse(fixtures.prefixDecls);
    expect(errors).toHaveLength(0);
  });
  it('parses comments', () => {
    const { errors } = parser.parse(fixtures.comments);
    expect(errors).toHaveLength(0);
  });
  it('parses valid bind inputs', () => {
    const { errors } = parser.parse(fixtures.bind);
    expect(errors).toHaveLength(0);
  });
});
