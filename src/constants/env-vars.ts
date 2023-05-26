import path from 'node:path';

import dotEnv from 'dotenv';
import z from 'zod';

dotEnv.config({ path: path.resolve('./.env.development') });

const envSchema = z
	.object({
		HOST: z.string().default('127.0.0.1'),
		PORT: z.number().default(8080),
		NODE_ENV: z
			.union([z.literal('development'), z.literal('production')])
			.default('development'),
		MAX_REQUESTS_PER_MINUTE: z.number().default(30),
	})

	.transform((val) => ({
		...val,
		IS_DEV: val.NODE_ENV === 'development',
	}));

const envVariables: Partial<Record<keyof z.infer<typeof envSchema>, unknown>> =
	{
		HOST: process.env.HOST,
		PORT: process.env.PORT,
		NODE_ENV: process.env.NODE_ENV,
		MAX_REQUESTS_PER_MINUTE: process.env.MAX_REQUESTS_PER_MINUTE,
	};

if (envVariables.NODE_ENV === 'production') {
	const undefinedList: string[] = [];
	Object.entries(envVariables).forEach(([key, val]) => {
		if (val === undefined) {
			undefinedList.push(key);
		}
	});
	if (undefinedList.length > 0) {
		throw new Error(
			`${undefinedList.join(', ')} ${
				undefinedList.length > 1 ? 'are' : 'is'
			} undefined`,
		);
	}
}

export const ENV = envSchema.parse(envVariables);
