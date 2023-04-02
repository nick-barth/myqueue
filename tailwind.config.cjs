/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				colors: {
					white: '#ffffff',
					accent: '#C1EBFF',
					accent2: '#D8BBFE',
					primary: '#181818',
					primary2: '#363636',
					primary3: '#545454',
					background: 'F2F2F2',
					error: '#ef4444'
				},
				borderRadius: {
					primary: '80px'
				}
			}
		}
	},
	plugins: []
};
