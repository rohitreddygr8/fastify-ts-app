import { Config } from 'jest';

const config: Config = {
	setupFiles: ['./src/tests/set-up.ts'],
	testEnvironment: 'jest-environment-node',
};

export default config;
