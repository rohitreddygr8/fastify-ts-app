import { FastifyRequest, preHandlerAsyncHookHandler } from 'fastify';
import httpStatus from 'http-status';

import { USER_ROLES } from '../constants/user-roles.js';
import { UserRole } from '../types/user-roles.js';

const getUserAndDecorateRequest = async (request: FastifyRequest) => {
	//Get user from database

	const user = {
		role: 'USER' as UserRole,
	};
	request.user = user;
	return user;
};

export const auth = (requiredUserRole: UserRole) => {
	const fn: preHandlerAsyncHookHandler = async (request, reply) => {
		const userRole = (await getUserAndDecorateRequest(request)).role;
		const hasAcess =
			USER_ROLES[userRole].accessLevel >=
			USER_ROLES[requiredUserRole].accessLevel;
		if (!hasAcess) {
			return reply.status(httpStatus.FORBIDDEN).send();
		}
		return;
	};
	return fn;
};
