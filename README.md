This project has been created by ma2t.

# Installation Convoyeurs

## Description

Installation Convoyeurs is a small TypeScript learning project. The goal is to practice a set of type-system features that go beyond the basics — literal and union types, optional properties, narrowing an `unknown` value, private class fields enforcing invariants, idempotent operations, generics, and utility types — through a tiny model of a conveyor installation, the kind of domain a warehouse-automation control system would deal with.

The project is made of five files:

- **types.ts**: the data model. `Etat` is a union of three literal strings (`"posee" | "en_transit" | "retiree"`), `Charge` and `Machine` are interfaces describing a load and a conveyor station, linked by id rather than by direct reference.
- **parseEtat.ts**: turns an `unknown` value into a valid `Etat`, narrowing it through equality checks against the three literals and throwing if none match. Not wired into `index.ts` yet — it exists to practice `unknown` + narrowing in isolation.
- **trouver.ts**: a single generic function, `trouver<T extends { id: number }>`, used to look up either a `Machine` or a `Charge` by id without duplicating the search logic per type.
- **installation.ts**: the `Installation` class. Five machines in a line, held behind two private fields (`#machines`, `#charges`), with methods (`deposer`, `partir`, `arriver`, `retirer`) that each refuse an impossible transition by throwing, plus `etat()` and `compter()` to inspect the current state.
- **index.ts**: a scenario exercising the whole class — a deposit, a departure, an arrival, a duplicate arrival that is silently ignored, and a transfer refused because its destination is occupied — then prints the final state.

## How it works

```
          types.ts
         ┌────┴────────────┐
         │                  │
   parseEtat.ts      installation.ts ── trouver.ts
   (not wired into          │
    index.ts yet)           ▼
                          index.ts
                             │
                             ▼
                            tsc           (type-checks, then strips all the types away)
                             │
                             ▼
                         dist/*.js        (plain JavaScript, no TypeScript left)
                             │
                             ▼
                            node          (executes the JavaScript)
                             │
                             ▼
                       terminal output
```

`types.ts` has no dependency of its own. `installation.ts` depends on it for its data shapes and on `trouver.ts` for its internal lookups. `index.ts` sits on top and is the file that actually runs the scenario. `tsc` compiles every `.ts` file into a matching `.js` file in `dist/`, and `node` executes that compiled output.

## Instructions

You need Node.js and npm.

```
npm install       # installs typescript and @types/node
npm run build     # compiles src/ into dist/ with tsc
npm run start     # runs node dist/index.js
```

## Design choices

**`unknown` with narrowing, rather than `any` or a type assertion, in `parseEtat`.** An `any` would let a bad value flow through unchecked, and a type assertion (`valeur as Etat`) would just tell the compiler to trust a claim without verifying it. `unknown` forces an explicit check before the value can be treated as an `Etat` — the function fails loudly on invalid input instead of silently accepting it.

**One small file per responsibility instead of a single large one.** The project started as a single `installation.ts` file and was split once it grew past the type definitions, the parsing function and the class all mixed together. Keeping `types.ts` separate means the data model can be read on its own, without the transition logic around it.

**Guard clauses that throw, except for `arriver` on a duplicate call.** Every method starts with a series of `if (...) throw new Error(...)` checks before mutating anything — an impossible transition never leaves the installation in a half-updated state. `arriver` is the one exception: calling it again for a charge that already arrived returns `false` instead of throwing, because a duplicate "arrived" signal from a real sensor is expected, not an error condition.

**A generic `trouver<T extends { id: number }>` instead of two near-identical lookup functions.** `Installation` needs to find both a `Machine` and a `Charge` by id. Duplicating `.find((x) => x.id === id)` once per type would mean fixing the same logic twice for every future change; the generic constraint `{ id: number }` is just enough to let one function serve both call sites safely.

**`ReadonlyArray<Readonly<Machine>>` instead of a defensive copy.** Earlier TypeScript exercises returned a fresh copy of internal state (`[...this.#tasks]`) to protect it from external mutation at runtime. Here, `etat()` returns the real internal array, and `Readonly`/`ReadonlyArray` block mutation only at the type-checking level — no array is copied. It is a compile-time guarantee for code that goes through `tsc`, not a runtime one; it does not protect against code that bypasses the type checker entirely.

**`Record<Etat, number>` for `compter()` instead of a plain object.** Typing the return value as `Record<Etat, number>` forces the object literal to cover all three states of `Etat` — omitting one, or misspelling a key, is a compile-time error rather than a value that is silently `undefined` at runtime.
