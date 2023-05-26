import { preHandlerHookHandler } from 'fastify';
import httpStatus from 'http-status';
import { AnyZodObject, z, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => {
	const fn: preHandlerHookHandler<any, any, any, z.infer<typeof schema>> = (
		request,
		reply,
		done,
	) => {
		try {
			schema.parse(request);
			return done();
		} catch (error) {
			if (error instanceof ZodError) {
				return reply.status(httpStatus.BAD_REQUEST).send(error.issues);
			}
			return reply.status(httpStatus.INTERNAL_SERVER_ERROR).send();
		}
	};

	return fn;
};
