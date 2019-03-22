import { ShaclParser } from '../../shacl/ShaclParser';

const fixture = `
ex:OtherPerson
  a :Thing .

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

describe('SHACL parser', () => {
  let parser: ShaclParser;

  beforeEach(() => {
    parser = new ShaclParser();
  });

  it('parses', () => {
    const { cst } = parser.parse(fixture);
    console.log(JSON.stringify(cst, null, 2));
    expect(true).toBe(true);
  });
});
