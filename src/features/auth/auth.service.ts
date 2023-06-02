import { UserRole } from '../../types/user-roles.js';

export const getUserFromId = async (id: string) => {
	return {
		role: 'USER' as UserRole,
	};
};
