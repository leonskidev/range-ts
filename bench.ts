import { bench, runBenchmarks } from "./deps.ts";
import { range } from "./mod.ts";

const arr = [1, "hello", 2, "world", 3, "foo", 4, "bar"];

bench({
  name: "native",
  runs: 1000000,
  func(b) {
    b.start();
    arr.slice(1, 5);
    b.stop();
  },
});

bench({
  name: "range",
  runs: 1000000,
  func(b) {
    b.start();
    range("1..5")(arr);
    b.stop();
  },
});

const cached = range("1..5");

bench({
  name: "range_cached",
  runs: 1000000,
  func(b) {
    b.start();
    cached(arr);
    b.stop();
  },
});

runBenchmarks();
