const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			sm: '320px',
			md: '480px',
			lg: '768px',
			xl: '1024px'
		},
		extend: {
			colors: {
				systemRed: {
					light: '#ff3b30',
					dark: '#ff453a'
				},
				systemBlue: {
					light: '#007aff',
					dark: '#0a84ff'
				},
				systemGray5: {
					light: 'rgb(229,229,234)',
					dark: 'rgb(44,44,46)'
				}
			}
		}
	},
	plugins: [
		plugin(({ addVariant }) => {
			addVariant('optional', '&:optional');
			addVariant('group-optional', ':merge(.group):optional &');
		})
	]
};

module.exports = config;
