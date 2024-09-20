import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchXmltvFile } from '../src/fetch.ts';

describe('#fetch', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('should throw an error if fetch does not work', async () => {
		// given
		const url = 'https://example.org/fake-url';
		vi.stubGlobal('fetch', () =>
			Promise.resolve({ ok: false, status: 404, statusText: 'Not found' }),
		);

		// when & then
		await expect(() => fetchXmltvFile(new URL(url))).rejects.toThrowError(
			`Failed to fetch XMLTV file from ${url} (404 Not found)`,
		);
	});

	describe('content-type warning', () => {
		it('should warn if the fetched XMLTV file has content-type looks not supported', async () => {
			// given
			const warnSpy = vi.spyOn(console, 'warn');
			const expectedTextResult = 'just some text';
			const headers = new Headers();
			headers.set('content-type', 'text/plain');
			vi.stubGlobal('fetch', () =>
				Promise.resolve({
					ok: true,
					headers,
					text: () => Promise.resolve(expectedTextResult),
				}),
			);

			// when
			await fetchXmltvFile(new URL('https://example.org/file.txt'));

			// then
			expect(warnSpy).toHaveBeenCalledWith(
				"The fetched XMLTV file content-type doesn't look like XML.",
			);
			expect(warnSpy).toHaveBeenCalledWith('Continuing anyway.');
		});

		it('should return the raw file text content anyway', async () => {
			// given
			const expectedTextResult = 'just some text';
			const headers = new Headers();
			headers.set('content-type', 'text/plain');
			vi.stubGlobal('fetch', () =>
				Promise.resolve({
					ok: true,
					headers,
					text: () => Promise.resolve(expectedTextResult),
				}),
			);

			// when
			const textResult = await fetchXmltvFile(
				new URL('https://example.org/file.txt'),
			);

			// then
			expect(textResult).toBe(expectedTextResult);
		});
	});

	it('should return the raw file text content', async () => {
		// given
		const expectedTextResult = '<?xml version="1.0" encoding="UTF-8"?>';
		const headers = new Headers();
		headers.set('content-type', 'application/xml');
		vi.stubGlobal('fetch', () =>
			Promise.resolve({
				ok: true,
				headers,
				text: () => Promise.resolve(expectedTextResult),
			}),
		);

		// when
		const textResult = await fetchXmltvFile(
			new URL('https://example.org/file.xml'),
		);

		// then
		expect(textResult).toBe(expectedTextResult);
	});
});
