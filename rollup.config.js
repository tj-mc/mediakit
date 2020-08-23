import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import babel from "@rollup/plugin-babel";

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/mediakit.js',
            format: 'umd',
            name: 'mediakit'
        },
        {
            file: 'dist/mediakit.min.js',
            format: 'umd',
            name: 'mediakit',
            plugins: [terser()]
        },
    ],
    plugins: [resolve(), nodePolyfills(), babel({babelHelpers: 'bundled'})]
};
