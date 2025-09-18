import { defineConfig } from "tsup";

export default defineConfig({
  target: "esnext",
  format: ["cjs", "esm"],    // build both CJS and ESM
  splitting: true,           // enables code splitting for esm
  sourcemap: true,
  clean: true,
  dts: true,                 // generate typings
  cjsInterop: true,          // allows default import for CJS
});
