import { z } from 'zod';

import {
	logInRequestSchema,
	signUpRequestSchema,
} from '../validations/auth.validation.js';

export type LoginRequestBody = z.infer<typeof logInRequestSchema>['body'];

export type SignUpRequestBody = z.infer<typeof signUpRequestSchema>['body'];
