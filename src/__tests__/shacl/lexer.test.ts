import { Lexer } from 'chevrotain';
import { getShaclTokenTypes } from '../../shacl/tokens';

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
  it('lexes standard SHACL', () => {
    const lexer = new Lexer(
      getShaclTokenTypes({
        shacl: 'sh',
        xsd: 'xsd',
      })
    );
    expect(lexer.tokenize(fixture).tokens).toMatchSnapshot();
  });

  it('lexes non-standard SHACL', () => {
    const lexer = new Lexer(
      getShaclTokenTypes({
        shacl: 'nonStandardShacl',
        xsd: 'xsd',
      })
    );
    expect(
      lexer.tokenize(fixture.replace('sh:', 'nonStandardShacl:')).tokens
    ).toMatchSnapshot();
  });

  it('lexes with non-standard XSD namespace', () => {
    const lexer = new Lexer(
      getShaclTokenTypes({
        shacl: 'sh',
        xsd: 'nonStandardXsd',
      })
    );
    expect(
      lexer.tokenize(fixture.replace('xsd:', 'nonStandardXsd:')).tokens
    ).toMatchSnapshot();
  });
});
