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
				// System Colors
				systemRed: {
					light: 'rgb(255,59,48)',
					dark: 'rgb(255,69,58)'
				},
				systemOrange: {
					light: 'rgb(255,149,0)',
					dark: 'rgb(255,159,10)'
				},
				systemYellow: {
					light: 'rgb(255,204,0)',
					dark: 'rgb(255,214,10)'
				},
				systemGreen: {
					light: 'rgb(52,199,89)',
					dark: 'rgb(48,209,88)'
				},
				// skip systemMint & systemTeal
				systemCyan: {
					light: 'rgb(50,173,230)',
					dark: 'rgb(100,210,255)'
				},
				systemBlue: {
					light: 'rgb(0,122,255)',
					dark: 'rgb(10,132,255)'
				},
				systemBlue2: {
					light: 'rgb(0,113,232)',
					dark: 'rgb(6,109,218)'
				},
				systemIndigo: {
					light: 'rgb(88,86,214)',
					dark: 'rgb(94,92,230)'
				},
				systemPurple: {
					light: 'rgb(175,82,222)',
					dark: 'rgb(191,90,242)'
				},
				systemPink: {
					light: 'rgb(255,45,85)',
					dark: 'rgb(255,55,95)'
				},
				systemBrown: {
					light: 'rgb(162,132,94)',
					dark: 'rgb(172,142,104)'
				},

				// System Gray Colors
				systemGray: {
					light: 'rgb(142,142,147)',
					dark: 'rgb(142,142,147)'
				},
				systemGray2: {
					light: 'rgb(174,174,178)',
					dark: 'rgb(99,99,102)'
				},
				systemGray3: {
					light: 'rgb(199,199,204)',
					dark: 'rgb(72,72,74)'
				},
				systemGray4: {
					light: 'rgb(209,209,214)',
					dark: 'rgb(58,58,60)'
				},
				systemGray5: {
					light: 'rgb(229,229,234)',
					dark: 'rgb(44,44,46)'
				},
				systemGray6: {
					light: 'rgb(242,242,247)',
					dark: 'rgb(28,28,30)'
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
