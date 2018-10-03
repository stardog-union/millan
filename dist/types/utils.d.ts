export declare const regex: {
    or(...r: RegExp[]): RegExp;
    and(...r: RegExp[]): RegExp;
    option(r: RegExp): RegExp;
    many(r: RegExp): RegExp;
};
