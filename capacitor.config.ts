import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'myqueue.so',
	appName: 'My Queue',
	webDir: 'build',
	bundledWebRuntime: false,
	server: {
		url: 'http://192.168.1.141:5173',
		cleartext: true
	}
};

export default config;
