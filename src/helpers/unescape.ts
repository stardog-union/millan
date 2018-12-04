/*
Copyright ©2012–2018 Ruben Verborgh
With modifications Copyright ©2018 Stardog Union

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const escapeSequence = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\[uU]|\\(.)/g;
const escapeReplacements = {
  '\\': '\\',
  "'": "'",
  '"': '"',
  n: '\n',
  r: '\r',
  t: '\t',
  f: '\f',
  b: '\b',
  _: '_',
  '~': '~',
  '.': '.',
  '-': '-',
  '!': '!',
  $: '$',
  '&': '&',
  '(': '(',
  ')': ')',
  '*': '*',
  '+': '+',
  ',': ',',
  ';': ';',
  '=': '=',
  '/': '/',
  '?': '?',
  '#': '#',
  '@': '@',
  '%': '%',
};

export const unescapedStringLiteralQuote = /^"([^"\\\r\n]+)"/; // non-empty string without escape sequences
export const unescapedStringLiteralSingleQuote = /^'([^'\\\r\n]+)'/;
export const stringLiteralQuote = /^"((?:[^"\\\r\n]|\\.)*)"(?=[^"])/;
export const stringLiteralSingleQuote = /^'((?:[^'\\\r\n]|\\.)*)'(?=[^'])/;
export const stringLiteralLongQuote = /^"""([^"\\]*(?:(?:\\.|"(?!""))[^"\\]*)*)"""/;
export const stringLiteralLongSingleQuote = /^'''([^'\\]*(?:(?:\\.|'(?!''))[^'\\]*)*)'''/;

export const illegalIriChars = /[\x00-\x20<>\\"\{\}\|\^\`]/;
export const escapedIri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/;
export const unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/;

// Handle special unescaping needs related to the IRIREF rule and others.
export const unescape = (item: string) => {
  try {
    return item.replace(
      escapeSequence,
      (_, unicode4, unicode8, escapedChar) => {
        if (unicode4) {
          return String.fromCharCode(parseInt(unicode4, 16));
        } else if (unicode8) {
          let charCode = parseInt(unicode8, 16);
          if (charCode <= 0xffff) {
            return String.fromCharCode(charCode);
          }
          return String.fromCharCode(
            0xd800 + (charCode -= 0x10000) / 0x400,
            0xdc00 + (charCode & 0x3ff)
          );
        } else {
          const replacement = escapeReplacements[escapedChar];
          if (!replacement) {
            throw new Error();
          }
          return replacement;
        }
      }
    );
  } catch (error) {
    return null;
  }
};
