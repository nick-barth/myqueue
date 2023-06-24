import { CapacitorConfig } from '@capacitor/cli';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const config: CapacitorConfig = {
	appId: 'so.play.myqueue',
	appName: 'My Queue',
	webDir: 'build'
};

export default config;