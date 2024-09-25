import { describe, expect, expectTypeOf, it } from 'vitest';
import { getConfig } from '../src/config.ts';
import type { EnvironmentConfig } from '../types/config.ts';

describe('#config', () => {
	describe('SOURCE_XMLTV_URL', () => {
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
	});

	describe('DESTINATION_JSON_FOLDER', () => {
		it('should throw if `DESTINATION_JSON_FOLDER` is not defined', () => {
			expect(() =>
				getConfig({ SOURCE_XMLTV_URL: 'https://example.org/file.json' }),
			).toThrowError(
				'An existing folder name must be set in a `DESTINATION_JSON_FOLDER` environment variable',
			);
		});

		it('should throw if `DESTINATION_JSON_FOLDER` is not an existing folder', () => {
			expect(() =>
				getConfig({
					SOURCE_XMLTV_URL: 'https://example.org/file.json',
					DESTINATION_JSON_FOLDER: 'non-existing-folder',
				}),
			).toThrowError(
				'An existing folder name must be set in a `DESTINATION_JSON_FOLDER` environment variable',
			);
		});
	});

	describe('TZ', () => {
		it('should throw if `TZ` is not defined', () => {
			expect(() =>
				getConfig({
					SOURCE_XMLTV_URL: 'https://example.org/file.json',
					DESTINATION_JSON_FOLDER: 'test',
				}),
			).toThrowError(
				'A valid timezone IANA identifier must be set in a `TZ` environment variable',
			);
		});
	});

	it('should return the config object if environment is valid', () => {
		// when
		const config = getConfig({
			SOURCE_XMLTV_URL: 'https://example.org/file.json',
			DESTINATION_JSON_FOLDER: 'test',
			TZ: 'Asia/Sakhalin',
		});

		// then
		expectTypeOf(config).toEqualTypeOf<EnvironmentConfig>();
		expect(config.sourceXmltvUrl).toEqual(
			new URL('https://example.org/file.json'),
		);
		expect(config.destinationJsonFolder).toBe('test');
		expect(config.tz).toBe('Asia/Sakhalin');
	});
});
