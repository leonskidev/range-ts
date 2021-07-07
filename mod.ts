interface Sliceable {
  slice(start?: number | undefined, end?: number | undefined): this;
}

export function range(
  range:
    | `..`
    | `${number}..`
    | `..${number}`
    | `..=${number}`
    | `${number}..${number}`
    | `${number}..=${number}`,
): <T extends Sliceable>(arr: T) => T {
  const r = /^(\d+)?\.\.(=)?(\d+)?$/.exec(range);
  if (!r) throw RangeError("invalid range");

  const s = r[1] ? Number(r[1]) : undefined;
  const e = r[3] ? Number(r[3]) + (r[2] ? 1 : 0) : undefined;

  if (s && e && s > e) throw RangeError("start is greater than end");

  return <T extends Sliceable>(arr: T): T => arr.slice(s, e);
}
