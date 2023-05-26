import { Role } from '@types';
import { preHandlerHookHandler } from 'fastify';

export const auth = (role?: Role) => {
	const fn: preHandlerHookHandler = (request, reply, done) => {
		console.log(role);

		done();
	};
	return fn;
};
