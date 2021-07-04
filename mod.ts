export type Slicer = <T>(arr: T[]) => T[];

const RANGE_REGEX = /^([-+]?\d*)(\.{1,2}=?)([-+]?\d*)$/;

/**
 * Gets a range in an array using a [Rust](https://rust-lang.org)-like syntax.
 *
 * ## All
 *
 * You can get a copy of the whole array by using `..` (prefered) or `..=`.
 *
 * ```ts
 * const arr = [1, 2, "hello", "world"];
 * console.log("..:", range("..")(arr));
 * // ..: [ 1, 2, "hello", "world" ]
 * ```
 *
 * ## Exclusive
 *
 * You can get a copy of an exclusive range (from `a` to `b-1`) using `a..b`.
 *
 * ```ts
 * const arr = [1, 2, "hello", "world"];
 * console.log("1..3:", range("1..3")(arr));
 * // 1..3: [ 2, "hello" ]
 * ```
 *
 * ## Inclusive
 *
 * You can get a copy of an inclusive range (from `a` to `b`) using `a..=b`.
 *
 * ```ts
 * const arr = [1, 2, "hello", "world"];
 * console.log("1..=3:", range("1..=3")(arr));
 * // 1..=3: [ 2, "hello", "world" ]
 * ```
 *
 * ## Beginning to Exclusive
 *
 * You can get a copy of an inclusive range from the beginning (to `b-1`) using
 * `..b`.
 *
 * ```ts
 * const arr = [1, 2, "hello", "world"];
 * console.log("..3:", range("..3")(arr));
 * // ..3: [ 1, 2, "hello" ]
 * ```
 *
 * ## Beginning to Inclusive
 *
 * You can get a copy of an exclusive range from the beginning (to `b`) using
 * `..=b`.
 *
 * ```ts
 * const arr = [1, 2, "hello", "world"];
 * console.log("..=3:", range("..=3")(arr));
 * // ..=3: [ 2, "hello", "world" ]
 * ```
 *
 * ## To End
 *
 * You can get a copy of an inclusive range to the end (from `a`) using `a..`
 * (prefered) or `a..=`.
 *
 * ```ts
 * const arr = [1, 2, "hello", "world"];
 * console.log("1..:", range("1..")(arr));
 * // 1..: [ 2, "hello", "world" ]
 * ```
 *
 * @param range The range that should be copied.
 * @returns A function that can be called to find the given range on any array.
 */
export function range(range: string): Slicer {
  const exec = RANGE_REGEX.exec(range);
  if (!exec) throw SyntaxError("invalid range");

  const start = exec[1].length === 0 ? undefined : Number(exec[1]);
  let end = exec[3].length === 0 ? undefined : Number(exec[3]);

  if (end && exec[2].length === 3) end += 1;

  if (start) {
    if (end && start > end) {
      throw RangeError(`start (${start}) is greater than end (${end})`);
    }
    if (start < 0) throw RangeError(`start (${start}) is less than 0`);
  }

  return <T>(arr: T[]): T[] => {
    return arr.slice(start, end);
  };
}
