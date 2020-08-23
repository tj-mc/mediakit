import resolve from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/mediakit.js',
            format: 'umd',
            name: 'mediakit'
        },
    ],
    plugins: [resolve(), nodePolyfills()]
};
