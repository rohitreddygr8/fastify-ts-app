import assert from 'node:assert';
import { test } from 'node:test';

import { server } from '../server';

test('API', async () => {
	const res = await server
		.inject()
		.post('/api/v1/auth/log-in')
		.payload({
			username: 'rohit',
			password: 'pooop',
		})
		.end();
	assert.equal(res.statusCode, 400);
});
