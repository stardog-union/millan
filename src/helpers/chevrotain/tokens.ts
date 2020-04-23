import { createToken, ITokenConfig } from 'chevrotain';

export const createKeyword = ({ name, pattern, ...props }: ITokenConfig) =>
  createToken({
    name,
    pattern: pattern || new RegExp(name, 'i'),
    ...props,
  });
