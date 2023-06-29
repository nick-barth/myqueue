import { CapacitorConfig } from '@capacitor/cli';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const config: CapacitorConfig = {
	plugins: {
		CapacitorCookies: {
			enabled: true
		}
	},
	appId: 'so.play.myqueue',
	appName: 'My Queue',
	webDir: 'build',
	server: {
		url: 'http://192.168.1.87:5173/',
		cleartext: true
	}
};

export default config;
