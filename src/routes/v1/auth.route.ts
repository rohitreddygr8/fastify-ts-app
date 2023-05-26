import { authControllers, authValidations } from '@features/auth';
import { auth, validate } from '@middleware';
import { FastifyPluginCallback } from 'fastify';

export const authRouterPlugin: FastifyPluginCallback = (fastify, _, done) => {
	fastify.post(
		'/log-in',
		{ preHandler: validate(authValidations.logInRequestBodySchema) },
		authControllers.logIn,
	);

	fastify.post('log-out', { preHandler: auth('user') }, authControllers.logOut);

	fastify.post(
		'/sign-up',
		{ preHandler: validate(authValidations.signUpRequestBodySchema) },
		authControllers.signUp,
	);

	fastify.post(
		'/refresh-token',
		{ preHandler: auth('user') },
		authControllers.refreshToken,
	);

	done();
};
