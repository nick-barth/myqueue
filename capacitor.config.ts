import { CapacitorConfig } from '@capacitor/cli';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const config: CapacitorConfig = {
	plugins: {
		CapacitorCookies: {
			enabled: true
		},
		GoogleAuth: {
			scopes: ['profile', 'email'],
			serverClientId: '831091108438-hihvt9nrfbd8qke8sfhru1tog8gsoggs.apps.googleusercontent.com',
			forceCodeForRefreshToken: true
		}
	},
	appId: 'so.play.myqueue',
	appName: 'My Queue',
	webDir: 'build'
};

export default config;
