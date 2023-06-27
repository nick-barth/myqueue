import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'so.myqueue.play',
	appName: 'My Queue',
	webDir: 'build',
	server: {
		androidScheme: 'https'
	}
};

export default config;
