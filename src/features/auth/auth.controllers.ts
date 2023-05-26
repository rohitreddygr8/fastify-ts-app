import { RouteHandler } from 'fastify';

import { LoginRequestBody, SignUpRequestBody } from './auth.types';

export const logIn: RouteHandler<{ Body: LoginRequestBody }> = (
	request,
	reply,
) => {
	return reply.send('Logged in!');
};

export const logOut: RouteHandler = (request, reply) => {
	return reply.send('Logged out!');
};

export const signUp: RouteHandler<{ Body: SignUpRequestBody }> = (
	request,
	reply,
) => {
	return reply.send('Signed Up!');
};

export const refreshToken: RouteHandler = (request, reply) => {
	return reply.send('Refreshed tokens!');
};
