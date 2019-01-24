import * as path from 'path';
import { SrsParser } from '../../srs/SrsParser';
import { fixtures } from './fixtures';
import { readDirAsync, readFileAsync } from '../utils';

const parser = new SrsParser();

describe('srs parser', () => {
  it('parses a basic isolated SRS document', () => {
    const result = parser.parse(fixtures.valid.basicIsolated);
    expect(result).toMatchSnapshot();
  });

  it('parses a basic turtle + SRS document', () => {
    const result = parser.parse(fixtures.valid.basic);
    expect(result).toMatchSnapshot();
  });

  it('parses valid SRS documents with no errors', () => {
    const validDocuments = fixtures.valid;
    Object.keys(validDocuments).forEach((docKey) => {
      const { errors } = parser.parse(validDocuments[docKey]);

      if (errors.length > 0) {
        console.log('Error in', docKey);
      }

      expect(errors).toHaveLength(0);
    });
  });

  it('recognizes restricted SPARQL calls in the If clause', () => {
    const { errors } = parser.parse(
      fixtures.invalid.parse.unsupportedSPARQLInIfClause
    );
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe(
      'Token EXISTS cannot be used in Stardog Rules.'
    );
  });

  it('recognizes restricted literals in the If clause', () => {
    const { errors } = parser.parse(
      fixtures.invalid.parse.noLiteralRuleSubjects
    );
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe(
      'Token STRING_LITERAL2 ("literal") cannot be used as a subject inside of a Bind in Stardog Rules Syntax.'
    );
  });

  it('recognizes restricted literals in the Then clause', () => {
    const { errors } = parser.parse(
      fixtures.invalid.parse.noLiteralRuleSubjects4
    );
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toBe(
      'Token STRING_LITERAL2 ("literal") cannot be used as a subject inside of a TriplesBlock in Stardog Rules Syntax.'
    );
  });

  it('catches errors in invalid SRS documents', () => {
    const invalidDocs = {
      // only pull wrongBraceMatch3 for now as wrongBraceMatch isn't catching errors
      wrongBraceMatch3: fixtures.invalid.lex.wrongBraceMatch3,
      ...fixtures.invalid.parse,
    };
    Object.keys(invalidDocs).forEach((key) => {
      const { errors, semanticErrors } = parser.parse(invalidDocs[key]);

      if (errors.length === 0 && semanticErrors.length === 0) {
        console.log('No errors caught in', key);
      }

      if (errors.length === 0) {
        expect(semanticErrors).not.toHaveLength(0);
      } else if (semanticErrors.length === 0) {
        expect(errors).not.toHaveLength(0);
      }
    });
  });

  it('produces no errors when parsing the w3 turtle test suite', async (done) => {
    const pathName = path.resolve(
      __dirname,
      '..',
      'turtle',
      'fixtures',
      'tests-ttl-w3c-20131121'
    );
    const files = (await readDirAsync(pathName)).filter((fileName) => {
      const ext = path.extname(fileName);
      if (
        fileName === 'manifest.ttl' ||
        fileName === 'turtle-syntax-bad-prefix-01.ttl' ||
        fileName === 'turtle-syntax-bad-prefix-02.ttl'
      ) {
        // In addition to the manifest, the two above turtle tests are skipped
        // for the SRS parser because the SRS parser assumes some default
        // namespaces, including the empty namespace.
        return false;
      }
      return ext === '.ttl' || ext === '.nt';
    });

    await Promise.all(
      files.map(async (fileName) => {
        const testDocument = await readFileAsync(
          path.resolve(pathName, fileName)
        );
        const { errors, semanticErrors } = parser.parse(testDocument);
        const isBad = fileName.search('-bad-') > -1;
        if (!isBad) {
          if (errors.length > 0 || semanticErrors.length > 0) {
            console.log(fileName);
          }
          expect(errors).toHaveLength(0);
          if (semanticErrors.length > 0) {
            console.log(JSON.stringify(semanticErrors, null, 2));
          }
          expect(semanticErrors).toHaveLength(0);
        } else {
          if (errors.length === 0 && semanticErrors.length === 0) {
            console.log(fileName);
          }
          expect(Boolean(errors.length || semanticErrors.length)).toBe(true);
        }
      })
    );
    done();
  });
});
