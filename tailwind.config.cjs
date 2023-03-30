/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				primary: '#ff9155',
				background: '#16081a',
				backgroundSecondary: 'rgb(41 28 44 / var(--tw-bg-opacity))',
				backgroundSecondaryHover: '#4E2A56'
			}
		}
	},
	plugins: []
};
