const { graphQlTokens } = require('../../graphql/tokens');
import { Lexer } from 'chevrotain';

const lexer = new Lexer(graphQlTokens);

const basicFixture = `
query queryName($foo: TestInput, $site: TestEnum = RED) {
  testAlias: hasArgs(string: "testString")
  ... on Test {
    hasArgs(
      listEnum: [RED, GREEN, BLUE]
      int: 1
      listFloat: [1.23, 1.3e-1, -1.35384e+3]
      boolean: true
      id: 123
      object: $foo
      enum: $site
    )
  }
  test @include(if: true) {
    union {
      __typename
    }
  }
  ...frag
  ... @skip(if: false) {
    id
  }
  ... {
    id
  }
}

mutation mutationName {
  setString(value: "newString")
}

subscription subscriptionName {
  subscribeToTest(id: "anId") {
    ... on Test {
      id
    }
  }
}

fragment frag on Test {
  test @include(if: true) {
    union {
      __typename
    }
  }
}
`;

describe('GraphQL Tokenizer', () => {
  it('tokenizes', () => {
    const result = lexer.tokenize(basicFixture);
    console.log(JSON.stringify(result, null, 2));
  });
});
