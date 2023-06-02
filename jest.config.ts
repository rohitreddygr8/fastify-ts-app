import { Config } from 'jest';

const config: Config = {
	setupFiles: ['./src/tests/set-up.ts'],
	testEnvironment: 'node',
};

export default config;
