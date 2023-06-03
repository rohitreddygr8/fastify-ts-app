import { FastifyPluginAsync } from 'fastify';

export const viewRouterPlugin: FastifyPluginAsync = async (app) => {
	app.get('/', (request, reply) => {
		const query = request.query as { name: string };
		return reply.view('hello', { name: query.name ?? 'user' });
	});
};
