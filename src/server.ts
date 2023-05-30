import path from 'node:path';

import { ENV } from '@constants';
import eTagPlugin from '@fastify/etag';
import helmetPlugin from '@fastify/helmet';
import rateLimitPlugin from '@fastify/rate-limit';
import staticPlugin from '@fastify/static';
import { routerPlugin } from '@routes';
import chalk from 'chalk';
import { fastify } from 'fastify';

export const server = fastify({
	logger: {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				destination: ENV.IS_DEV ? false : './server.log',
			},
		},
	},
});

await server.register(rateLimitPlugin, {
	max: ENV.MAX_REQUESTS_PER_MINUTE,
	ban: 5,
});

await server.register(staticPlugin, {
	root: path.resolve('./public'),
	prefix: '/public',
});

await server.register(helmetPlugin);

await server.register(eTagPlugin);

await server.register(async (fastify, _, done) => {
	fastify.get('/', (_request, reply) => {
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

	await fastify.register(routerPlugin, { prefix: '/api' });

	done();
});

console.log('\n');
console.log(
	`${chalk.white.bold('>>> Environment variables in')} ${chalk.magenta.bold(
		ENV.NODE_ENV.toLocaleUpperCase(),
	)} ${chalk.white.bold('environment:')}`,
);
console.table(
	Object.entries(ENV).map(([key, value]) => ({
		KEY: key,
		VALUE: value,
	})),
);
console.log('\n');

await server.listen({ host: ENV.HOST, port: ENV.PORT });
