import { preHandlerAsyncHookHandler } from 'fastify';
import httpStatus from 'http-status';

import { USER_ROLES } from '../constants/user-roles.js';
import { getUserFromId } from '../features/auth/auth.service.js';
import { UserRole } from '../types/user-roles.js';

export const auth = (requiredUserRole: UserRole) => {
	const fn: preHandlerAsyncHookHandler = async (request, reply) => {
		const user = await getUserFromId('1');
		const hasAcess =
			USER_ROLES[user.role].accessLevel >=
			USER_ROLES[requiredUserRole].accessLevel;
		if (!hasAcess) {
			return reply.status(httpStatus.FORBIDDEN).send();
		}
		request.user = user;
		return;
	};
	return fn;
};
