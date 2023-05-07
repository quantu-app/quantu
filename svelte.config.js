import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	optimizeDeps: {
		exclude: ['svelte-slate']
	},
	kit: {
		adapter: adapter()
	}
};

export default config;
