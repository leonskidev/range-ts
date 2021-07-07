import { assertEquals, assertThrows } from "./deps.ts";
import { range } from "./mod.ts";

const arr = [1, 2, "hello", "world"];

Deno.test(
  "exclusive",
  () => assertEquals(range("1..3")(arr), [2, "hello"]),
);

Deno.test(
  "inclusive",
  () => assertEquals(range("1..=3")(arr), [2, "hello", "world"]),
);

Deno.test(
  "start_to_exclusive",
  () => assertEquals(range("..3")(arr), [1, 2, "hello"]),
);

Deno.test(
  "index_to_end",
  () => assertEquals(range("1..")(arr), [2, "hello", "world"]),
);

Deno.test(
  "all_exclusive",
  () => assertEquals(range("..")(arr), [1, 2, "hello", "world"]),
);

Deno.test(
  "negative_start",
  () => {
    assertThrows(
      () => range("-1..3")(arr),
      RangeError,
      "invalid range",
    );
  },
);

Deno.test(
  "negative_end",
  () => {
    assertThrows(
      () => range("1..-3")(arr),
      RangeError,
      "invalid range",
    );
  },
);

Deno.test(
  "from_greater_than_to",
  () => {
    assertThrows(
      () => range("3..2")(arr),
      RangeError,
      "start is greater than end",
    );
  },
);
