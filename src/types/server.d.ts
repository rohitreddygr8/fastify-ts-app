import { FastifyRequest } from 'fastify';
import { z } from 'zod';

import { Role } from './roles';

type RequestSchema = Partial<FastifyRequest> & z.ZodRawShape;

declare module 'fastify' {
	export interface FastifyRequest {
		user: {
			role: Role;
		};
	}
}
