export const fixtures = {
  plainStringInTemplate: `
    mapping <spooky>
    from json {}
    to { ?s a :Thing }
    where { template('spooky') }
  `,
  emptyWhere: `
    mapping <spooky>
    from json {}
    to { ?s a :Thing }
    where {}
  `,
  var2: `
    mapping <spooky>
    from json {}
    to { $s a :Thing }
    where {}
  `,
};
