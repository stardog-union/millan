export const defaultNamespacesMap = Object.freeze(
  ['', 'rdf', 'rdfs', 'xsd', 'owl', 'stardog'].reduce(
    (namespacesMap, prefix) => ({
      ...namespacesMap,
      [prefix]: true,
    }),
    {}
  )
);
