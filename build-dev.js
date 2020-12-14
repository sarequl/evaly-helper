import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
module.exports = {
	input: 'svelte-src/index.js',
	output: {
		file: 'popup/dist/bundle.js',
		format: 'iife',
		name: 'app',
	},
	plugins: [
		svelte({
			compilerOptions: { dev: true },
			emitCss: true,
		}),
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
		}),
		commonjs(),
		postcss({
			extract: true,
			minimize: true,
			use: {
				sass: {
					includePaths: ['./svelte-src/theme', './node_modules'],
				},
				less: false,
				stylus: false,
			},
		}),
	],
	watch: {
		clearScreen: false,
	},
};
