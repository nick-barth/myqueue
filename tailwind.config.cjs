/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				domine: ['"Domine"', 'serif'],
				source: ['"Source Sans Pro"', 'sans-serif']
			},
			screens: {
				md: '942px'
			},
			colors: {
				white: '#ffffff',
				accent: '#C4E2FC',
				accent2: '#D8BBFE',
				primary: '#181818',
				primary2: '#363636',
				primary3: '#545454',
				background: '#F4F4F4',
				error: '#ef4444',
				success: '#A0E99D',

				//gray
				gray100: '#181818',
				gray200: '#2f2f2f',
				gray300: '#464646',
				gray400: '#747474',
				gray500: '#8c8c8c',
				gray600: '#a3a3a3',
				gray700: '#bababa',
				gray800: '#D1D1D1',
				gray900: '#e8e8e8',
				gray950: '#f4f4f4'
			},
			borderRadius: {
				primary: '80px'
			}
		}
	},
	plugins: []
};
