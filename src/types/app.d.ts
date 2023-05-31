import 'fastify';

import { UserRole } from './user-roles.js';

declare module 'fastify' {
	export interface FastifyRequest {
		user: {
			role: UserRole;
		};
	}
}
