export * from './TurtleParser';
// Convenience imports/exports that aren't core functionality:
// NOTE: Tokens MUST be imported using CommonJS syntax; see here: https://github.com/SAP/chevrotain/issues/345
export const turtleTokens = require('./tokens');
