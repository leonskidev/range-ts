import { assertEquals, assertThrows } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { range } from "./mod.ts";

const arr = [1, 2, "hello", "world"];

Deno.test(
  "exclusive",
  () => {
    assertEquals(range`1..3`(arr), [2, "hello"]);
    assertEquals(range("1..3")(arr), [2, "hello"]);
  }
);

Deno.test(
  "inclusive",
  () => {
    assertEquals(range`1..=3`(arr), [2, "hello", "world"]);
    assertEquals(range("1..=3")(arr), [2, "hello", "world"]);
  }
);

Deno.test(
  "start_to_exclusive",
  () => {
    assertEquals(range`..3`(arr), [1, 2, "hello"]);
    assertEquals(range("..3")(arr), [1, 2, "hello"]);
  }
);

Deno.test(
  "start_to_inclusive",
  () => {
    assertEquals(range`..=3`(arr), [1, 2, "hello", "world"]);
    assertEquals(range("..=3")(arr), [1, 2, "hello", "world"]);
  }
);

Deno.test(
  "index_to_end",
  () => {
    assertEquals(range`1..`(arr), [2, "hello", "world"]);
    assertEquals(range("1..")(arr), [2, "hello", "world"]);
  }
);

Deno.test(
  "all_exclusive",
  () => {
    assertEquals(range`..`(arr), [1, 2, "hello", "world"]);
    assertEquals(range("..")(arr), [1, 2, "hello", "world"]);
  }
);

Deno.test(
  "all_inclusive",
  () => {
    assertEquals(range`..=`(arr), [1, 2, "hello", "world"]);
    assertEquals(range("..=")(arr), [1, 2, "hello", "world"]);
  }
);

Deno.test(
  "negative_from",
  () => {
    assertThrows(
      () => range`-1..3`(arr),
      RangeError,
      "start (-1) is less than 0"
    );
    assertThrows(
      () => range("-1..3")(arr),
      RangeError,
      "start (-1) is less than 0"
    );
  }
);

Deno.test(
  "negative_to",
  () => {
    assertThrows(
      () => range`1..-3`(arr),
      RangeError,
      "start (1) is greater than end (-3)"
    );
    assertThrows(
      () => range("1..-3")(arr),
      RangeError,
      "start (1) is greater than end (-3)"
    );
  }
);

Deno.test(
  "from_greater_than_to",
  () => {
    assertThrows(
      () => range`3..2`(arr),
      RangeError,
      "start (3) is greater than end (2)"
    );
    assertThrows(
      () => range("3..2")(arr),
      RangeError,
      "start (3) is greater than end (2)"
    );
  }
);