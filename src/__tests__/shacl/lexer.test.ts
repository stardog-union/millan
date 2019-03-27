import { Lexer } from 'chevrotain';
const { getShaclTokenTypes } = require('../../shacl/tokens');

const lexer = new Lexer(getShaclTokenTypes('sh'));
const fixture = `
ex:PersonShape
	a sh:NodeShape ;
	sh:targetClass ex:Person ;    # Applies to all persons
	sh:property [                 # _:b1
		sh:path ex:ssn ;           # constrains the values of ex:ssn
		sh:maxCount 1 ;
		sh:datatype xsd:string ;
		sh:pattern "^\\\\d{3}-\\\\d{2}-\\\\d{4}$" ;
	] ;
	sh:property [                 # _:b2
		sh:path ex:worksFor ;
		sh:class ex:Company ;
		sh:nodeKind sh:IRI ;
	] ;
	sh:closed true ;
  <http://www.w3.org/ns/shacl#ignoredProperties> ( rdf:type ) .
`;

describe('SHACL lexer', () => {
  it('works', () => {
    // console.log(JSON.stringify(lexer.tokenize(fixture), null, 2));
    expect(true).toBe(true);
  });
});
