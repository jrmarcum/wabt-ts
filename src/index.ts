/**
 * @module
 * **This project has moved to binaryang (`@jrmarcum/binaryang`).**
 *
 * `@jrmarcum/wabt-ts` is superseded by `@jrmarcum/binaryang`, which merges wabt-ts and binaryen-ts
 * into one package. **1.5.1 is the final release of this package.**
 *
 * ## Migrating
 *
 * The six tool subpaths keep their names — `./wat2wasm`, `./wasm2wat`, `./wasm-validate`,
 * `./wasm-objdump`, `./wasm-strip`, `./wasm2ts`. `./compat` becomes `./compat/wabt`.
 *
 * Two things MOVE rather than rename, and they are the ones you cannot guess:
 *
 * - This package shipped its **IR through the package root**. binaryang's root is deliberately
 *   narrow — with two IRs retained, a root barrel spanning both would surface 56 colliding type
 *   names — so the IR is now at `@jrmarcum/binaryang/ir/wabt-ts`.
 * - The **core vocabulary every tool's return value is expressed in** — `Result`, `ErrorList`,
 *   `formatErrors` — also reached consumers through the root. It is now at
 *   `@jrmarcum/binaryang/core/wabt-ts`.
 *
 * So anything importing values from `jsr:@jrmarcum/wabt-ts` directly needs a named subpath now.
 *
 * ```ts
 * // was
 * import { wat2wasm, Result } from 'jsr:@jrmarcum/wabt-ts';
 * // now
 * import { wat2wasm } from 'jsr:@jrmarcum/binaryang/wat2wasm';
 * import { Result } from 'jsr:@jrmarcum/binaryang/core/wabt-ts';
 * ```
 *
 * The CLI is now one entry point: `binaryang wat2wasm`, `binaryang wasm2wat`, … on Deno,
 * Node 22.18+ and Bun 1.4+.
 *
 * **Already using a pinned version? Nothing breaks.** Every published version keeps resolving —
 * JSR never deletes a version and nothing here is yanked. This package is archived, not withdrawn.
 *
 * ---
 *
 * wabt-ts — Native TypeScript port of WebAssembly/wabt.
 *
 * Provides WebAssembly tooling as idiomatic TypeScript modules with no binary
 * dependency. Runs natively on Deno (primary) and Bun (secondary).
 *
 * For CLI tools, import the named entry points directly:
 * - `jsr:@jrmarcum/wabt-ts/wat2wasm`
 * - `jsr:@jrmarcum/wabt-ts/wasm2wat`
 * - `jsr:@jrmarcum/wabt-ts/wasm-validate`
 * - `jsr:@jrmarcum/wabt-ts/wasm-objdump`
 * - `jsr:@jrmarcum/wabt-ts/wasm2ts`
 *
 * @example
 * ```ts
 * import { wat2wasm, wasm2wat } from "jsr:@jrmarcum/wabt-ts";
 * ```
 */

// Phase 1 — Core infrastructure
export * from './core/types.ts';
export * from './core/binary.ts';
export * from './core/result.ts';
export * from './core/feature.ts';
export * from './core/error.ts';
export * from './core/leb128.ts';
export * from './core/literal.ts';
export * from './core/opcode.ts';

// Phase 2 — IR layer
export * from './ir/ir.ts';
export * from './ir/ir-util.ts';
export * from './ir/expr-visitor.ts';
export * from './ir/generate-names.ts';
export * from './ir/resolve-names.ts';
export * from './ir/apply-names.ts';

// Phase 3 — Binary round-trip
export * from './reader/binary-reader.ts';
export * from './reader/binary-reader-ir.ts';
export * from './writer/binary-writer.ts';
export * from './writer/stream.ts';

// Phase 4 — WAT text format
export * from './parser/lexer-source.ts';
export * from './parser/wast-parser.ts';
export * from './writer/wat-writer.ts';

// Phase 5 — Validator
export * from './validator/validator.ts';
// `validateModule` takes this, so it has to be nameable from the package
// root; without it `deno doc` reports a public type referencing a private one.
export type { ValidateOptions } from './validator/shared-validator.ts';

// Phase 6 — CLI tool library API
export { wat2wasm } from './tools/wat2wasm.ts';
export type { Wat2WasmOptions, Wat2WasmResult } from './tools/wat2wasm.ts';
export { wasm2wat } from './tools/wasm2wat.ts';
export type { Wasm2WatOptions, Wasm2WatResult } from './tools/wasm2wat.ts';
export { wasmValidate } from './tools/wasm-validate.ts';
export type { WasmValidateOptions, WasmValidateResult } from './tools/wasm-validate.ts';
export { wasmObjdump } from './tools/wasm-objdump.ts';
export type { WasmObjdumpOptions, WasmObjdumpResult } from './tools/wasm-objdump.ts';
export { wasmStrip } from './tools/wasm-strip.ts';
export type { WasmStripOptions, WasmStripResult } from './tools/wasm-strip.ts';
