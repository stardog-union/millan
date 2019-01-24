import { SrsParser } from '../../srs/SrsParser';
import { fixtures } from './fixtures';

const parser = new SrsParser();

describe('srs parser', () => {
  it('parses a basic isolated SRS document', () => {
    expect(parser.parse(fixtures.valid.basicIsolated)).toBeTruthy();
  });
});
