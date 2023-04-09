/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				md: '942px'
			},
			colors: {
				white: '#ffffff',
				accent: '#C1EBFF',
				accent2: '#D8BBFE',
				primary: '#181818',
				primary2: '#363636',
				primary3: '#545454',
				background: '#F4F4F4',
				error: '#ef4444',

				//gray
				gray100: '#181818',
				gray200: '#2f2f2f',
				gray300: '#464646',
				gray400: '#747474',
				gray500: '#8c8c8c',
				gray600: '#a3a3a3',
				gray700: '#bababa',
				gray800: '#d1d1d1',
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
