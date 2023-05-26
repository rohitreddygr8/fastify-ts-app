import { z } from 'zod';

import {
	logInRequestBodySchema,
	signUpRequestBodySchema,
} from './auth.validations';

export type LoginRequestBody = z.infer<typeof logInRequestBodySchema>;

export type SignUpRequestBody = z.infer<typeof signUpRequestBodySchema>;
