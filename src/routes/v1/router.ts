import { FastifyPluginCallback } from 'fastify';

import { authRouterPlugin } from './auth.route';

export const v1RouterPlugin: FastifyPluginCallback = (fastify, _, done) => {
	fastify.register(authRouterPlugin, { prefix: '/auth' });

	done();
};
