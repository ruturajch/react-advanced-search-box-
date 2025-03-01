// rollup.config.mjs
import { readFileSync } from 'fs';
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

const packageJson = JSON.parse(readFileSync('./package.json'));

export default [
    {
      input: "src/index.ts",
      output: [
        {
          file: packageJson.main,
          format: "cjs",
          sourcemap: true,
        },
        {
          file: packageJson.module,
          format: "esm",
          sourcemap: true,
        },
      ],
      plugins: [
        resolve({
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        }),
        commonjs(),
        typescript({
          tsconfig: "./tsconfig.json",
          exclude: ["**/*.test.*", "**/*.stories.*"],
          compilerOptions: {
            outDir: "dist",
            declaration: false,
          }
        }),
        postcss({ 
          extensions: [".css"], 
          inject: true, 
          extract: false 
        }),
      ],
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
    {
      input: "src/index.ts",
      output: [{ 
        file: "dist/index.d.ts", 
        format: "esm" 
      }],
      plugins: [dts()],
      external: [/\.css$/, /\.scss$/, /\.sass$/, /\.less$/, /\.styl$/],
    }
];