import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const sources = {
	guardian: 'Guardian',
	newyorktimes: 'New York Times',
	techcrunch: 'TechCrunch',
	cnn: 'CNN',
	medium: 'Medium',
	bbc: 'BBC'
};

const discovers = Object.keys(sources).map((key) => `/discover/${key}`)
const routes = ['/signup', '/', '/add', '/read', '/signin', '/signin', ...discovers];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: routes
		},
		alias: {
			$types: 'types'
		}
	},
	preprocess: vitePreprocess()
};

export default config;
