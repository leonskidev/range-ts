## Range

This adds a simple way to get slices of an array using a [Rust]-like syntax in a
function. Most use cases **should not** prefer to use this over the built-in
`Array.prototype.slice` method, this is just a fancy wrapper around that. But
this still does come in handy for some situations and is very flexable.

## Usage

Simply add range as a dependancy and use the exportend `range` function:

```ts
// don't forget to add a version when you use it
import { range } from "https://deno.land/x/range";

// a quick array for the example
const arr = [1, 2, "hello", "world"];
// getting values from index 1 to 2
range("1..3")(arr); // [ 2, "hello" ]
```

## Example

You can run the `example.ts` either by cloning the repo and running
`deno run example.ts` or by running
`deno run https://deno.land/x/range/example.ts`. The output should resemble
something like what you see below:

```ts
arr: [ 1, 2, "hello", "world" ]

..: [ 1, 2, "hello", "world" ]
..=: [ 1, 2, "hello", "world" ]

1..3: [ 2, "hello" ]
1..=3: [ 2, "hello", "world" ]
..3: [ 1, 2, "hello" ]
..=3: [ 1, 2, "hello", "world" ]
1..: [ 2, "hello", "world" ]
1..=: [ 2, "hello", "world" ]
```

## Tests

This module is fully tested by the the tests found in `test.ts`. Both errors and
successes are tested to make sure that the module doesn't regress. If you do
change anything, make sure that the tests pass and are modified as needed,
thanks.

[Rust]: https://rust-lang.org

## Range vs Native

As said at the top:

> _"Most use cases **should not** prefer to use this over the built-in
> `Array.prototype.slice` method, this is just a fancy wrapper around that."_

Let's see how you would implement the same thing using both methods:

```ts
// native
arr.slice(1, 3);
// ranges
range("1..3")(arr);
```

As you can see, the native method is not only shorter, but faster too:

```
benchmark native ... 
  1000000 runs avg: 0.001322ms
benchmark range ... 
  1000000 runs avg: 0.00161ms
```

If you want to run the benchmark yourself, you can either clone the repo and run
`deno run bench.ts` or run `deno run https://deno.land/x/range/bench.ts`.
