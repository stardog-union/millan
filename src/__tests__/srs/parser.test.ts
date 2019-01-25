import { SrsParser } from '../../srs/SrsParser';
import { fixtures } from './fixtures';

const parser = new SrsParser();

describe('srs parser', () => {
  it('parses a basic isolated SRS document', () => {
    const { errors, cst, ggpCst } = parser.parse(fixtures.valid.unionOptional);
    console.log(JSON.stringify(cst, null, 2));
    console.log(JSON.stringify(ggpCst, null, 2));
    expect(errors).toHaveLength(0);
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
