import { StandardGraphQlParser } from '../../graphql/StandardGraphQlParser';

const parser = new StandardGraphQlParser();

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

describe('StandardGraphQlParser', () => {
  it('parses', () => {
    const { cst, errors } = parser.parse(basicFixture);
    console.log(JSON.stringify(cst, null, 2));
    console.log(JSON.stringify(errors, null, 2));
    expect(true).toBe(true);
  });
});
