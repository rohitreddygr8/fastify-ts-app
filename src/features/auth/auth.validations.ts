import { z } from 'zod';

export const logInRequestBodySchema = z.object({
	username: z.string().nonempty(),
	password: z.string().nonempty(),
});

export const signUpRequestBodySchema = z.object({
	email: z.string().nonempty().email(),
	username: z.string().nonempty(),
	password: z
		.string()
		.nonempty()
		.regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})\S+$/, {
			message:
				'Password should contain at least 1 uppercase letter, 1 lowercase letter, 1 special character and should be 8 or more characters in length',
		}),
});
