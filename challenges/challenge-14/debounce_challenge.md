# JavaScript Live Coding Challenge — Debounce

**Difficulty:** Medium  
**Target time:** 10–15 minutes

## Scenario

A search input triggers a function every time the user types. You want to avoid calling the function for every keystroke. Instead, call it only when the user has stopped typing for a specified amount of time.

## Task

Implement a function named `debounce(fn, delay)` that **returns a new function**.

When the returned function is called several times within `delay` milliseconds, only the **latest call** should cause `fn` to execute, after `delay` milliseconds have elapsed since that call.

## Requirements

1. Use plain JavaScript.
2. Use `setTimeout` and `clearTimeout` if needed.
3. Forward all arguments from the returned function to `fn`.
4. Do not invoke `fn` immediately; it should run only after the waiting period.
5. You do not need to support `cancel`, `flush`, or preserving `this`.

## Example

```js
const search = debounce((text) => {
  console.log("Searching:", text);
}, 500);

search("R");
search("Re");
search("Rea");
search("React");
```

If those four calls happen quickly, the expected console output is a **single** message, about 500 milliseconds after the last call:

```text
Searching: React
```

## Bonus test

If you call `search("A")` at `t = 0 ms`, `search("B")` at `t = 200 ms`, and `search("C")` at `t = 800 ms`, which messages should print, and when?

No solution is included. Try implementing it yourself in the starter file.
