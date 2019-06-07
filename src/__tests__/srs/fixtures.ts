// All fixtures in this file are taken from Stardog.

const ungeneratedFixtures = {
  valid: {
    basic:
      '@prefix : <http://example.org/> .\n' +
      '@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n' +
      'RULE :FatherRule\n' +
      'IF {\n' +
      '   ?x a <http://example.org/Male> , <http://example.org/Parent> .\n' +
      '}\n' +
      'THEN {\n' +
      '   ?x a <http://example.org/Father> .\n' +
      '}\n' +
      ':FatherRule rdfs:comment "This rule defines fathers" ;\n' +
      '  a :MyRule .',
    basicIsolated:
      'IF { ?x a <http://example.org/Male> . FILTER(?x NOT IN (<urn:a>, <urn:b>))}' +
      'THEN { ?x a <http://example.org/Father> . }',
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
      'THEN {\n' +
      '  ?x :specialPrice ?p ;\n' +
      '     :specialItem ?y ;\n' +
      '}\n' +
      ':FatherRule rdfs:comment "This rule defines fathers" ;\n' +
      '  a :MyRule .\n' +
      'IF {\n' +
      '   ?x a <http://example.org/Male> , <http://example.org/Parent> .\n' +
      '}\n' +
      'THEN {\n' +
      '   ?x a <http://example.org/Father> .\n' +
      '}\n',
    propertyPath: 'IF {\n' + '  ?a :b+ :c .\n' + '} THEN {\n' + '?a :c :d }',
    filterIn:
      'IF {\n' +
      '   ?x <urn:p> ?y . \n' +
      '   FILTER (?x IN (<urn:a>, <urn:b>, <urn:c>))\n' +
      '}\n' +
      'THEN {\n' +
      '   ?x a <urn:A> .\n' +
      '}',
    filterNotIn:
      'IF {\n' +
      '   ?x <urn:p> ?y . \n' +
      '   FILTER (?x NOT IN (<urn:a>, <urn:b>))\n' +
      '}\n' +
      'THEN {\n' +
      '   ?x a <urn:A> .\n' +
      '}',
    bindWithoutLiteralSubject:
      // Was previously failing: https://github.com/stardog-union/millan/issues/22
      'IF {\n' +
      '   ?t a :Triangle ;\n' +
      '   :base ?b ;\n' +
      '   :height ?h\n' +
      '   BIND(?b * ?h / 2 AS ?area)\n' +
      '}\n' +
      'THEN {' +
      '   ?t :area ?area\n' +
      '}',
  },
  invalid: {
    lex: {
      wrongBraceMatch:
        'IF {{\n' +
        '  ?X ?P ?Y. ?Y ?P ?Z\n' +
        '}\n' +
        'THEN {\n' +
        '  ?X ?P ?Z\n' +
        '}\n',
      wrongBraceMatch3:
        'IF {\n' +
        '  ?X ?P ?Y. ?Y ?P ?Z\n' +
        '\n' +
        'THEN {\n' + // one less }
        '  ?X ?P ?Z\n' +
        '}\n',
    },
    parse: {
      wrongBraceMatch2:
        'IF {\n' +
        '  ?X ?P ?Y. ?Y ?P ?Z\n' +
        '}}\n' +
        'THEN {\n' +
        '  ?X ?P ?Z\n' +
        '}\n',
      wrongBraceMatch4:
        'IF {\n' +
        '  ?X ?P ?Y. ?Y ?P ?Z\n' +
        '\n' +
        ' THEN \n' + // No } {
        '  ?X ?P ?Z\n' +
        '}\n',
      wrongKeyword:
        'IT {\n' + // IT
        '  ?X ?P ?Y. ?Y ?P ?Z\n' +
        '}\n' +
        'THEN {\n' +
        '  ?X ?P ?Z\n' +
        '}\n',

      wrongKeyword2:
        'IF {\n' +
        '  ?X ?P ?Y. ?Y ?P ?Z\n' +
        '}\n' +
        'THAN {\n' + // THAN
        '  ?X ?P ?Z\n' +
        '}\n',
      wrongPrefix:
        'PREFAX test: <http://test.com/test/0.1/>\n' + // PREFAX
        'IF {\n' +
        '  ?X test:hasSibling ?Y. ?Y rdf:type test:Man\n' +
        '}\n' +
        'THEN {\n' +
        '  ?X test:hasBrother ?Y\n' +
        '}\n',
      wrongPrefix2:
        'PREFIX test <http://test.com/test/0.1/>\n' + // Omit :
        'IF {\n' +
        '  ?X test:hasSibling ?Y. ?Y rdf:type test:Man\n' +
        '}\n' +
        'THEN {\n' +
        '  ?X test:hasBrother ?Y\n' +
        '}\n',
      wrongPrefix3:
        'PREFIX test: http://test.com/test/0.1/>\n' + // Omit <
        'IF {\n' +
        '  ?X test:hasSibling ?Y. ?Y rdf:type test:Man\n' +
        '}\n' +
        'THEN {\n' +
        '  ?X test:hasBrother ?Y\n' +
        '}\n',
      wrongPrefix4:
        'PREFIX test: <http://test.com/test/0.1/\n' + // Omit >
        'IF {\n' +
        '  ?X test:hasSibling ?Y. ?Y rdf:type test:Man\n' +
        '}\n' +
        'THEN {\n' +
        '  ?X test:hasBrother ?Y\n' +
        '}\n',
      noLiteralRuleSubjects:
        'IF {\n' +
        '   BIND ("literal" AS ?x)\n' +
        '}\n' +
        'THEN {\n' +
        '   ?x a owl:Thing .\n' +
        '}',
      noLiteralRuleSubjects2:
        'IF {\n' +
        '   BIND ("literal" AS ?x)\n' +
        '   BIND ("literal" AS ?y)\n' +
        '}\n' +
        'THEN {\n' +
        '   ?x a owl:Thing .\n' +
        '   ?y a owl:Thing .\n' +
        '}',
      noLiteralRuleSubjects3:
        'IF {\n' +
        '   "sLit" ?p "oLit"' +
        '}\n' +
        'THEN {\n' +
        '   ?s a owl:Thing .\n' +
        '}',
      noLiteralRuleSubjects4:
        'IF {\n' +
        '   ?s ?p ?o' +
        '}\n' +
        'THEN {\n' +
        '   "literal" a owl:Thing .\n' +
        '}',
      noLiteralRuleSubjects5:
        'IF {\n' +
        '   ?s ?p ?o' +
        '}\n' +
        'THEN {\n' +
        '   ?s a owl:Thing . "literal" a owl:Thing .\n' +
        '}',
      wrongIfContent:
        'PREFIX test: <http://test.com/test/0.1/>\n' +
        'IF {\n' +
        '   test:hasSibling ?Y. ?Y rdf:type test:Man\n' + // No subject
        '}\n' +
        'THEN {\n' +
        '  ?X test:hasBrother ?Y\n' +
        '}\n',
      wrongIfContent2:
        'PREFIX test: <http://test.com/test/0.1/>\n' +
        'IF {\n' +
        ' ?X  ?Y. ?Y rdf:type test:Man\n' + // No predicate
        '}\n' +
        'THEN {\n' +
        '  ?X test:hasBrother ?Y\n' +
        '}\n',
      wrongIfContent3:
        'PREFIX test: <http://test.com/test/0.1/>\n' +
        'IF {\n' +
        ' ?X test:hasSibling . ?Y rdf:type test:Man\n' + // No object
        '}\n' +
        'THEN {\n' +
        '  ?X test:hasBrother ?Y\n' +
        '}\n',
      wrongIfContent4:
        'PREFIX test: <http://test.com/test/0.1/>\n' +
        'IF {\n' +
        ' ?X test:hasSibling ?Y  ?Y rdf:type test:Man\n' + // No .
        '}\n' +
        'THEN {\n' +
        '  ?X test:hasBrother ?Y\n' +
        '}\n',
      wrongIfContent5:
        'PREFIX test: <http://test.com/test/0.1/>\n' +
        'IF {\n' +
        ' ?X test2:hasSibling ?Y . ?Y rdf:type test:Man\n' + // Undefined prefix
        '}\n' +
        'THEN {\n' +
        '  ?X test:hasBrother ?Y\n' +
        '}\n',
      wrongThenContent:
        'PREFIX test: <http://test.com/test/0.1/>\n' +
        'IF {\n' +
        ' ?X test:hasSibling ?Y. ?Y rdf:type test:Man\n' +
        '}\n' +
        'THEN {\n' +
        '  test:hasBrother ?Y\n' + // No subject
        '}\n',
      wrongThenContent2:
        'PREFIX test: <http://test.com/test/0.1/>\n' +
        'IF {\n' +
        ' ?X test:hasSibling ?Y. ?Y rdf:type test:Man\n' +
        '}\n' +
        'THEN {\n' +
        '  ?X ?Y\n' + // No predicate
        '}\n',
      wrongThenContent3:
        'PREFIX test: <http://test.com/test/0.1/>\n' +
        'IF {\n' +
        ' ?X test:hasSibling ?Y . ?Y rdf:type test:Man\n' +
        '}\n' +
        'THEN {\n' +
        '  ?X test:hasBrother \n' + // No object
        '}\n',
      wrongThenContent4:
        'PREFIX test: <http://test.com/test/0.1/>\n' +
        'IF {\n' +
        ' ?X test:hasSibling ?Y  ?Y rdf:type test:Man\n' +
        '}\n' +
        'THEN {\n' +
        '  ?X test:hasBrother ?Y ?Y test:hasSibling ?X\n' + // No .
        '}\n',
      wrongThenContent5:
        'PREFIX test: <http://test.com/test/0.1/>\n' +
        'IF {\n' +
        ' ?X test:hasSibling ?Y . ?Y rdf:type test:Man\n' +
        '}\n' +
        'THEN {\n' +
        '  ?X test22:hasBrother ?Y\n' + // Undefined prefix
        '}\n',
      wrongThenContent6:
        'PREFIX test: <http://test.com/test/0.1/>\n' +
        'IF {\n' +
        '?X a test:OldMan\n' +
        '}\n' +
        'THEN {\n' +
        '\n' + // Empty
        '}\n',
      wrongThenContent7:
        'PREFIX test: <http://test.com/test/0.1/>\n' +
        'IF {\n' +
        '?X a test:OldMan\n' +
        '}\n' +
        'THEN {\n' +
        '\t\n' + // Empty (Tab)
        '}\n',
      wrongThenContent8:
        'PREFIX test: <http://test.com/test/0.1/>\n' +
        'IF {\n' +
        ' ?X a test:OldMan\n' +
        '}\n' +
        'THEN {\n' +
        '  ?X test:age ?Y. FILTER (?Y > 50) .\n' + // Includes Filter
        '}\n',
      wrongThenContent9:
        'PREFIX test: <http://test.com/test/0.1/>\n' +
        'IF {\n' +
        ' ?X rdf:type test:GoodDeal\n' +
        '}\n' +
        'THEN {\n' +
        '  ?x test:price ?p .\n' +
        '  ?x test:discount ?discount \n' +
        '  BIND (?p - ?realprice AS ?discount) .\n' + // Includes Bind
        '}\n',
      unsupportedSPARQLInIfClause:
        'IF { ?x a <http://example.org/Male> . FILTER EXISTS {}}\n' +
        'THEN { ?x a <http://example.org/Father> . }',
    },
  },
};

const upperLowerIfFixtures = ['IF', 'if', 'iF', 'If'].reduce(
  (accumulator, val, index) => ({
    ...accumulator,
    ['upperLowerIf' + index]:
      'PREFIX test: <http://test.com/test/0.1/>\n' +
      val +
      ' {\n' + // If
      ' ?X test:hasSibling ?Y . ?Y rdf:type test:Man\n' +
      '}\n' +
      'THEN {\n' +
      '  ?X test:hasBrother ?Y\n' +
      '}\n',
  }),
  {}
);

const upperLowerThenFixtures = () => {
  const c1 = ['T', 't'];
  const c2 = ['H', 'h'];
  const c3 = ['E', 'e'];
  const c4 = ['N', 'n'];
  const fixtures = {};
  const prefix = 'upperLowerThen';
  let count = 0;

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        for (let l = 0; l < 2; l++) {
          const str = c1[i] + c2[j] + c3[k] + c4[l];

          fixtures[`${prefix}${count}`] =
            'PREFIX test: <http://test.com/test/0.1/>\n' +
            'IF {\n' +
            ' ?X test:hasSibling ?Y . ?Y rdf:type test:Man\n' +
            '}\n' +
            str +
            ' {\n' + // Then
            '  ?X test:hasBrother ?Y\n' +
            '}\n';

          count++;
        }
      }
    }
  }

  return fixtures;
};

export const fixtures = {
  ...ungeneratedFixtures,
  valid: {
    ...ungeneratedFixtures.valid,
    ...upperLowerIfFixtures,
    ...upperLowerThenFixtures(),
  },
};
