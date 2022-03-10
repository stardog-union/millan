# Millan

Millan is the [Stardog](https://www.stardog.com) whisperer -- a set of parsers
for languages used with Stardog (currently [SPARQL](https://en.wikipedia.org/wiki/SPARQL),
[Turtle](https://en.wikipedia.org/wiki/Turtle_(syntax)),
[TriG](https://en.wikipedia.org/wiki/TriG_(syntax)),
[Stardog Mapping Syntax 2 (SMS)](https://www.stardog.com/docs/#_stardog_mapping_syntax_2),
[Stardog Rules Syntax](https://www.stardog.com/docs/#_stardog_rules_syntax), the Turtle serialization of [SHACL](https://www.w3.org/TR/shacl/), and [GraphQL](https://graphql.github.io/graphql-spec/)).

## Features

- Error-tolerant parsing for W3C-compliant SPARQL and SPARQL with
[Stardog extensions](https://www.stardog.com/docs/#_path_queries).
- Error-tolerant parsing for W3C-compliant Turtle
- Error-tolerant parsing for W3C-compliant TriG
- Error-tolerant parsing for Stardog Mapping Syntax 2 (SMS)
- Error-tolerant parsing for Stardog Rules Syntax (SRS)
- Error-tolerant parsing for the Turtle serialization of the W3C Shapes Constraints Language (SHACL)
- Error-tolerant parsing for GraphQL (both the Facebook standard and with [Stardog's GraphQL extensions](https://www.stardog.com/docs/#_graphql_queries))
- Exported token matchers (regular expressions) and token sets for all of the
above languages
- Universally usable (both in nodejs and the browser), either as a single bundle or as only the specific parts you need
- Tested against W3C test suites
- Small and fast
- Written in [TypeScript](https://www.typescriptlang.org/), compiled to JS
(with type declarations provided TypeScript)
- Used in production at Stardog in support of [Stardog Studio](https://www.stardog.com/studio/)
language servers

## Installation

Simply run:

```bash
npm install --save millan
```

You can then import Millan in Node.js or in the browser, using any preferred
module format or bundler.

In Node/CommonJS:

```javascript
const millan = require('millan');
// or, if you only need some part of millan (e.g., only _one_ of the parsers):
const graphql = require('millan/dist/standalone/millan.graphql');
```

As an ES module:

```javascript
import * as millan from 'millan';
// or, if you only need some part of millan (e.g., only _one_ of the parsers):
import { StardogSparqlParser } from 'millan/dist/standalone/millan.sparql';
```

In the browser, importing everything at once:

```html
<script src="path/to/millan/millan.js"></script>
```

In the browser, importing only what is needed:

```html
<!-- Here, we first load any shared chunks needed by 'sms' (as indicated by the filename), then the SMS-related Javacript only -->
<script src="path/to/millan/dist/browser/millan.vendors~graphql~shacl~sms~sparql~srs~turtle.js"></script>
<script src="path/to/millan/dist/browser/millan.sms.js"></script>
```

When used in the browser via `script` tags, the API will be exposed on a global `millan` variable.

## Basic Usage

Import Millan or the specific parts of Millan that you need, e.g.:

```javascript
import { W3SpecSparqlParser } from 'millan';
```

Parsing a document requires a parser instance, so you should get one:

```javascript
const sparqlParser = new W3SpecSparqlParser();
```

Every parser instance has essentially the same API. They are all instances of the
Parser base class from [chevrotain](https://github.com/SAP/chevrotain), and they all implement the [IStardogParser](https://stardog-union.github.io/millan/interfaces/istardogparser.html) interface.

The two parser methods you'll use most often are `parse` and `tokenize`. Use
`tokenize` only when you want the parser instance to _lex_ (tokenize) the
provided text:

```javascript
sparqlParser.tokenize(`
  PREFIX : <http://example.org/ns#>
  SELECT *
  WHERE { ?x ?y ?z }
`);
```

Result:

```
[
  {
    "image": "PREFIX",
    "startOffset": 3,
    "endOffset": 8,
    "startLine": 2,
    "endLine": 2,
    "startColumn": 3,
    "endColumn": 8,
    "tokenTypeIdx": 43,
    "tokenType": {
      "PATTERN": {},
      "tokenTypeIdx": 43,
      "CATEGORIES": [],
      "categoryMatches": [],
      "categoryMatchesMap": {},
      "tokenName": "PREFIX",
      "isParent": false
    }
  },
  /* . . . */
]
```

Use `parse` when you want the full parsing experience. Note that, because
Millan's parsers are error-tolerant, the `parse` method returns an object
that contains both a [concrete syntax tree (CST)](https://sap.github.io/chevrotain/docs/guide/concrete_syntax_tree.html#ast-vs-cst)
_and_ an array of any errors:

```javascript
sparqlParser.parse(`
  PREFIX : <http://example.org/ns#>
  SELECT *
  WHERE { ?x ?y ?z }
`);
```

Result:

```
{
  "errors": [],
  "cst": {
    "name": "SparqlDoc",
    "children": {
      "Prologue": [
        {
          "name": "Prologue",
          "children": {
            "PrefixDecl": [
              {
                "name": "PrefixDecl",
                "children": {
                  "PREFIX": [
                    {
                      "image": "PREFIX",
                      "startOffset": 3,
                      "endOffset": 8,
                      "startLine": 2,
                      "endLine": 2,
                      "startColumn": 3,
                      "endColumn": 8,
                      "tokenTypeIdx": 43,
                      "tokenType": {
                        "PATTERN": {},
                        "tokenTypeIdx": 43,
                        "CATEGORIES": [],
                        "categoryMatches": [],
                        "categoryMatchesMap": {},
                        "tokenName": "PREFIX",
                        "isParent": false
                      }
                    }
                  ],
                  "PNAME_NS": [ /* . . . */ ],
                  /* . . . etc. . . . */
```

Helpfully, the `name` fields in the CSTs returned by Millan's parsers exactly
match, in _nearly_ every case (we've removed some redundancy), the names of the
rules in the official EBNF for the corresponding grammar (e.g., `SparqlDoc`,
`Prologue`, `PrefixDecl`, etc.).

When there are errors in parsing, Millan's parsers still return a best-effort
CST, as well as information including the spot where the error occurred, what
the parser expected to find at that spot, what the parser actually found in
that spot, the "context" (i.e., the position in the grammar's "rule stack"),
and more:

```javascript
sparqlParser.parse(`
  PREFIX : <http://example.org/ns#>
  SELECT 1
  WHERE { ?x ?y ?z }
`);
```

Result:

```
{
  "errors": [
    {
      "name": "NoViableAltException",
      "message": "Expecting: one of these possible Token sequences:\n  1. [?foo]\n  2. [?bar]\n  3. [LParen]\n  4. [Star]\nbut found: '1'",
      "token": {
        "image": "1",
        "startOffset": 47,
        "endOffset": 47,
        "startLine": 3,
        "endLine": 3,
        "startColumn": 10,
        "endColumn": 10,
        "tokenTypeIdx": 7,
        "tokenType": {
          "PATTERN": {},
          "tokenTypeIdx": 7,
          "CATEGORIES": [],
          "categoryMatches": [],
          "categoryMatchesMap": {},
          "tokenName": "INTEGER",
          "isParent": false
        }
      },
      "resyncedTokens": [],
      "context": {
        "ruleStack": [
          "SparqlDoc",
          "QueryUnit",
          "Query",
          "SelectQuery",
          "SelectClause"
        ],
        "ruleOccurrenceStack": [
          0,
          0,
          0,
          0,
          0
        ]
      }
    }
  ],
  "cst": {
    "name": "SparqlDoc",
    "children": {
      "Prologue": [
        {
          "name": "Prologue",
          "children": {
            "PrefixDecl": [
              {
                "name": "PrefixDecl",
                /* . . . etc. . . . */
```

## Full API

Check out our comprehensive [API docs](https://stardog-union.github.io/millan/) for more information.

## Contributing

### Prerequisites

- [Node.js](https://nodejs.org/) 8+.
- [Yarn](https://yarnpkg.com/en/) 1.0.0+.

### Installing

After cloning the repo, in the project's root, run:

```bash
yarn install
```

### Developing

All development-relevant code, including tests, is located in the repo's `src/`
directory. All of this code should be written in TypeScript. After making
changes, you will want to run our test scripts (run by Jest), like so:

```bash
yarn test
```

Stylistic conventions and formatting are enforced via `tslint` and `prettier`,
which means you don't really need to worry about those things yourself
(both the linter and `prettier` will check and format your code automatically
on any commit). If you'd like to force `prettier` to format your code (a la
`gofmt`), just run:

```bash
yarn format
```

To have the project run a lint check, tests, and compilation while you make
changes, simply run (and leave running):

```bash
yarn dev
```

### Pull Requests

The preferred way of making a pull request is as follows:

1. Create an issue for the PR, if there isn't one already.
2. Branch off of master with a branch name that begins with either 'feature/'
or 'bug/', and make the rest of the branch name include the issue number and
a brief description of the branch (e.g., `bug/104-turtle-prefix-error`).
3. Do your work on that branch, push the branch when it is ready, and create
a PR.

If you don't have contributor rights, you will need to fork the repo before
doing steps 2 and 3, and then submit the PR from your fork.

Be sure to run `yarn docs` before submitting your PR, so that our type docs are
updated accordingly.

## License

Copyright 2018 Stardog Union

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
