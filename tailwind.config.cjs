/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				frank: ['"Frank Ruhl Libre"', 'serif'],
				source: ['"Source Sans Pro"', 'sans-serif']
			},
			screens: {
				md: '942px'
			},
			colors: {
				white: '#ffffff',
				accent: '#C4E2FC',
				primary: '#181818',
				background: '#eeeeee',
				backgroundDark: '#727272',
				success: '#A0E99D',
				warning: '#FFBB59',
			},
			borderRadius: {
				primary: '80px'
			}
		}
	},
	plugins: []
};
