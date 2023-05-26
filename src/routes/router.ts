import { FastifyPluginCallback } from 'fastify';

import { v1RouterPlugin } from './v1';

export const routerPlugin: FastifyPluginCallback = (fastify, _, done) => {
	fastify.register(v1RouterPlugin, { prefix: '/v1' });

	done();
};
