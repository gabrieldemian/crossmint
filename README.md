## How to run
I used `bun` as an alternative to `yarn` and `npm`.

- Install dependencies `bun install`.
- Run a phase `bun run phases/1.ts`.

## My thought process
I tried to be as type-safe as possible, keeping repetitive string names under enums, and conditional logic into Generic Types.

## Project Structure
- Utility functions under `/lib.ts`
- Types under `/types.ts`
- Challenges under `/phases`
