import { describe, expect, expectTypeOf, it } from 'vitest';
import { getConfig } from '../src/config.ts';
import type { EnvironmentConfig } from '../types/config.ts';

describe('#config', () => {
	it('should throw if `SOURCE_XMLTV_URL` is not defined', () => {
		expect(() => getConfig()).toThrowError(
			'An XMLTV file URL must be set in a `SOURCE_XMLTV_URL` environment variable',
		);
	});

	it('should throw if `SOURCE_XMLTV_URL` is not a valid URL', () => {
		expect(() => getConfig({ SOURCE_XMLTV_URL: 'not-an-url' })).toThrowError(
			'An XMLTV file URL must be set in a `SOURCE_XMLTV_URL` environment variable',
		);
	});

	it('should return the config object if `SOURCE_XMLTV_URL` is a valid URL', () => {
		// when
		const config = getConfig({
			SOURCE_XMLTV_URL: 'https://example.org/file.json',
		});

		// then
		expectTypeOf(config).toEqualTypeOf<EnvironmentConfig>();
	});
});
