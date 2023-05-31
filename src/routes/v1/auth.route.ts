import { FastifyPluginAsync, RouteHandler } from 'fastify';

import * as authController from '../../controllers/auth.controller.js';
import { auth } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import * as authValidation from '../../validations/auth.validation.js';

export const authRouterPlugin: FastifyPluginAsync = async (app) => {
	app.post(
		'/log-in',
		{ preHandler: validate(authValidation.logInRequestSchema) },
		authController.logIn as RouteHandler,
	);

	app.post(
		'/log-out',
		{ preHandler: auth('USER') },
		authController.logOut as RouteHandler,
	);

	app.post(
		'/sign-up',
		{ preHandler: validate(authValidation.signUpRequestSchema) },
		authController.signUp as RouteHandler,
	);

	app.post(
		'/refresh-token',
		{ preHandler: auth('USER') },
		authController.refreshToken as RouteHandler,
	);
};
