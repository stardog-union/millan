import { SrsParser } from '../../srs/SrsParser';
import { fixtures } from './fixtures';

const parser = new SrsParser();

describe('srs parser', () => {
  it('parses a basic isolated SRS document', () => {
    const result = parser.parse(fixtures.valid.basicIsolated);
    expect(result).toMatchSnapshot();
  });

  it('parses a basic turtle + SRS document', () => {
    const result = parser.parse(fixtures.valid.basic);
    expect(result).toMatchSnapshot();
  });

  it('parses valid SRS documents with no errors', () => {
    const validDocuments = fixtures.valid;
    Object.keys(validDocuments).forEach((docKey) => {
      const { errors } = parser.parse(validDocuments[docKey]);

      if (errors.length > 0) {
        console.log('Error in', docKey);
      }

      expect(errors).toHaveLength(0);
    });
  });

  it('recognizes restricted SPARQL calls in the If clause', () => {
    const { errors } = parser.parse(
      fixtures.invalid.parse.unsupportedSPARQLInIfClause
    );
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe(
      'Token EXISTS cannot be used in Stardog Rules'
    );
  });
});

/**
    unionOptional:
      'PREFIX : <http://test.com/test/0.1/>\n' +
      'IF {\n' +
      '  ?x a :Product ; :price ?p .\n' +
      '  OPTIONAL {\n' +
      '     ?x :contains ?y \n' +
      '     { ?y a :OnSale  }\n' +
      '     UNION \n' +
      '     { ?y a :Discontinued }\n' +
      '  }\n' +
      '  OPTIONAL { ?x :producer ?producer } ' +
      '}\n' +
      ':FatherRule rdfs:comment "This rule defines fathers" ;\n' +
      '  a :MyRule .\n' +
      'THEN {\n' +
      '  ?x :specialPrice ?p ;\n' +
      '     :specialItem ?y ;\n' +
      '}\n' +
      'IF {\n' +
      '   ?x a <http://example.org/Male> , <http://example.org/Parent> .\n' +
      '}\n' +
      'THEN {\n' +
      '   ?x a <http://example.org/Father> .\n' +
      '}\n',
 */
