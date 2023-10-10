/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./views/**/*.ejs'],
	theme: {
		extend: {
			colors: {
				primaryColor: '#1B8900',
				primaryColorShade: '#65A184',
				secondaryColor: '#15562B',
				secondaryColorShade: '#d1d5db',
				tertiaryColor: '#FC3400',
				tColor: '#84818A',
				tColor2: '#2E2C34',
				tColor3: '#504F54',
			},
			fontFamily: {
				mulish: 'Mulish',
				helvetica: 'Helvetica',
			},
		},
		screens: {
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
			'2xl': '1400px',
		},
	},
	plugins: [
		require('daisyui'),
		function ({ addBase }) {
			addBase({
				h1: { fontSize: '4.0rem' },
				h2: { fontSize: '3.5rem' },
				h3: { fontSize: '3.0rem' },
				h4: { fontSize: '2.5rem' },
				h5: { fontSize: '2.0rem' },
				h6: { fontSize: '1.5rem' },
			});
		},
	],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#4F5955',
					secondary: '#15562B',
					accent: '#1B8900',
					light: '#F7F7F7',
					'base-100': '#ffffff',
				},
			},
			'light',
		],
	},
};
