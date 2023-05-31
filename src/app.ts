import path from 'node:path';

import cookiePlugin from '@fastify/cookie';
import eTagPlugin from '@fastify/etag';
import formBodyPlugin from '@fastify/formbody';
import helmetPlugin from '@fastify/helmet';
import multipartPlugin from '@fastify/multipart';
import rateLimitPlugin from '@fastify/rate-limit';
import staticPlugin from '@fastify/static';
import chalk from 'chalk';
import { fastify, FastifyPluginAsync } from 'fastify';

import { ENV } from './constants/env-vars.js';
import { authRouterPlugin } from './routes/v1/auth.route.js';

export const app = fastify({
	logger: ENV.LOGS_ENABLED && {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				destination: ENV.IS_DEV ? false : './server.log',
			},
		},
	},
});

const v1Plugin: FastifyPluginAsync = async (app) => {
	await app.register(authRouterPlugin, { prefix: '/auth' });
};

await app.register(rateLimitPlugin, {
	max: ENV.MAX_REQUESTS_PER_MINUTE,
	ban: 5,
});

await app.register(staticPlugin, {
	root: path.resolve('./public'),
	prefix: '/public',
});

await app.register(helmetPlugin);

await app.register(eTagPlugin);

await app.register(cookiePlugin);

await app.register(formBodyPlugin);

await app.register(multipartPlugin);

await app.register(v1Plugin, { prefix: '/v1' });

app.decorateRequest('user', null);

app.get('/', (_, reply) => {
	return reply.type('text/html; charset=utf-8;').send(
		`<pre style="text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">
███████╗░█████╗░░██████╗████████╗██╗███████╗██╗░░░██╗	░░░░░░
██╔════╝██╔══██╗██╔════╝╚══██╔══╝██║██╔════╝╚██╗░██╔╝	░░░░░░
█████╗░░███████║╚█████╗░░░░██║░░░██║█████╗░░░╚████╔╝░	█████╗
██╔══╝░░██╔══██║░╚═══██╗░░░██║░░░██║██╔══╝░░░░╚██╔╝░░	╚════╝
██║░░░░░██║░░██║██████╔╝░░░██║░░░██║██║░░░░░░░░██║░░░	░░░░░░
╚═╝░░░░░╚═╝░░╚═╝╚═════╝░░░░╚═╝░░░╚═╝╚═╝░░░░░░░░╚═╝░░░	░░░░░░

████████╗██╗░░░██╗██████╗░███████╗░██████╗░█████╗░██████╗░██╗██████╗░████████╗
╚══██╔══╝╚██╗░██╔╝██╔══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗██║██╔══██╗╚══██╔══╝
░░░██║░░░░╚████╔╝░██████╔╝█████╗░░╚█████╗░██║░░╚═╝██████╔╝██║██████╔╝░░░██║░░░
░░░██║░░░░░╚██╔╝░░██╔═══╝░██╔══╝░░░╚═══██╗██║░░██╗██╔══██╗██║██╔═══╝░░░░██║░░░
░░░██║░░░░░░██║░░░██║░░░░░███████╗██████╔╝╚█████╔╝██║░░██║██║██║░░░░░░░░██║░░░
░░░╚═╝░░░░░░╚═╝░░░╚═╝░░░░░╚══════╝╚═════╝░░╚════╝░╚═╝░░╚═╝╚═╝╚═╝░░░░░░░░╚═╝░░░</pre>`,
	);
});

export const startServer = async () => {
	try {
		console.log('\n');
		console.log(
			`${chalk.white.bold('<-- Environment variables in')} ${chalk.magenta.bold(
				ENV.NODE_ENV.toLocaleUpperCase(),
			)} ${chalk.white.bold('environment -->')}`,
		);
		console.table(
			Object.entries(ENV).map(([key, value]) => ({
				KEY: key,
				VALUE: value,
			})),
		);
		console.log(`\n${chalk.green.bold('Starting server...')}`);
		console.log('\n');

		await app.listen({ host: ENV.HOST, port: ENV.PORT });
	} catch (err) {
		console.error(err);
		console.log(`${chalk.red.bold('Stopping server...')}`);
		await app.close();
	}
};
