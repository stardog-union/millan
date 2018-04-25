import { join } from 'path';
import {
  getAllFileContents,
  toParseWithNoErrors,
  toParseWithErrors,
} from '../utils/main';

const allValidQueries = getAllFileContents(
  join(__dirname, 'fixtures', 'valid')
);
const allInvalidQueries = getAllFileContents(
  join(__dirname, 'fixtures', 'invalid')
);

expect.extend({
  toParseWithErrors,
  toParseWithNoErrors,
});

describe('update', () => {
  it('should pass valid path queries', () =>
    // @ts-ignore
    allValidQueries.forEach((file) => expect(file).toParseWithNoErrors()));
  it('should fail invalid path queries', () =>
    // @ts-ignore
    allInvalidQueries.forEach((file) => expect(file).toParseWithErrors()));
});
