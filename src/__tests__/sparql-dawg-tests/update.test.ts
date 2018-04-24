import { SparqlParser } from '../../SparqlParser';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';

const { parse } = new SparqlParser({
  config: {
    maxLookahead: 200,
  },
});

const parseFile = (path: string) =>
  parse(readFileSync(join(dirname(__filename), 'update', path), 'utf8'));

describe('update', () => {
  it('should pass general syntax tests', () => {
    console.log(JSON.stringify(parseFile('delete.rq'), null, 2));
    expect(parseFile('delete.rq').errors.length).toBe(0);
  });
});
