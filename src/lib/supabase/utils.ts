export function applySorting(query: any, sort: string) {
  const [column, direction] = sort.split(":");

  return query.order(column, {
    ascending: direction !== "desc" // default to ascending
  });
}

export function applyFilter(query: any, filter: string) {
  // Support multiple filters separated by commas
  if (filter.includes(",")) {
    const parts = filter.split(",");
    parts.forEach((f) => {
      query = applyFilter(query, f);
    });
    return query;
  }

  // Single filter case

  const ops = [
    { op: ">=", fn: "gte" },
    { op: "<=", fn: "lte" },
    { op: ">", fn: "gt" },
    { op: "<", fn: "lt" },
    { op: "~", fn: "ilike" },
    { op: "=", fn: "eq" },
  ];

  for (const { op, fn } of ops) {
    if (filter.includes(op)) {
      const [column, value] = filter.split(op);

      if (fn === "ilike") {
        return query.ilike(column, `%${value}%`);
      }

      return query[fn](column, value);
    }
  }

  return query;
}
