export function range(
  range:
    | `..`
    | `${number}..`
    | `..${number}`
    | `..=${number}`
    | `${number}..${number}`
    | `${number}..=${number}`,
): <T>(arr: ArrayLike<T>) => T[] {
  const r = /^(\d+)?\.\.(=)?(\d+)?$/.exec(range);
  if (!r) throw RangeError("invalid range");

  const s = r[1] ? Number(r[1]) : 0;
  const e = r[3] ? Number(r[3]) + (r[2] ? 1 : 0) : undefined;

  if (s && e && s > e) throw RangeError("start is greater than end");

  return <T>(arr: ArrayLike<T>): T[] => {
    const inner = [];
    for (let i = s; i < (e ?? arr.length); i++) inner.push(arr[i]);
    return inner;
  };
}
