import { SparqlParser } from '../../SparqlParser';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';

const { parse } = new SparqlParser();

const parseFile = (path: string) =>
  parse(readFileSync(join(dirname(__filename), 'update', path), 'utf8'));

describe('update', () => {
  it('should pass general syntax tests', () => {
    expect(parseFile('delete.rq').errors.length).toBe(0);
  });
});
