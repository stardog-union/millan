import { createToken, ITokenConfig } from 'chevrotain';

const createKeyword = ({ name, pattern, ...props }: ITokenConfig) =>
  createToken({
    name,
    pattern: pattern || new RegExp(name, 'i'),
    ...props,
  });

export default {
  createKeyword,
};
