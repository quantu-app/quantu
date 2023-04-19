import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { internalIpV4 } from 'internal-ip';

export default defineConfig(async () => {
	const host = await internalIpV4();
	return {
		server: {
			host: '0.0.0.0',
			port: 3000,
			strictPort: true,
			hmr: {
				protocol: 'ws',
				host,
				port: 5183
			}
		},
		preview: {
			port: 3000
		},
		plugins: [sveltekit()]
	};
});
