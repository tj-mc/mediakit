import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/mediakit.js',
        format: 'umd',
        name: 'mediakit'
    },
    plugins: [nodeResolve()]
};
