export const regex = {
    or(...r) {
        return new RegExp(r.map(({ source }) => `(${source})`).join('|'));
    },
    and(...r) {
        return new RegExp(r.map(({ source }) => `(${source})`).join(''));
    },
    option(r) {
        return new RegExp(`(${r.source})?`);
    },
    many(r) {
        return new RegExp(`(${r.source})*`);
    },
};
