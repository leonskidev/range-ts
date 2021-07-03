import { range } from "./mod.ts";

const arr = [1, 2, "hello", "world"];
console.log("arr:", arr);

console.log();

console.log("..:", range`..`(arr));
console.log("..=:", range`..=`(arr));

console.log();

console.log("1..3:", range`1..3`(arr));
console.log("1..=3:", range`1..=3`(arr));
console.log("..3:", range`..3`(arr));
console.log("..=3:", range`..=3`(arr));
console.log("1..:", range`1..`(arr));