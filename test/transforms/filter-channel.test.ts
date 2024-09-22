import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { localize } from '../../src/localize.ts';
import { parseXmltvTextContent } from '../../src/parse.ts';
import { filterChannel } from '../../src/transforms/filter-channel.ts';
import type { Xmltv } from '../../types/xmltv.i18n.ts';
import type { XmltvLocalized } from '../../types/xmltv.localized.ts';

describe('#filterChannel', () => {
	let xmltvSampleText: string;
	let xmltv: Xmltv | XmltvLocalized;
	beforeEach(async () => {
		xmltvSampleText = await readFile(
			resolve('test', 'samples', 'fr_tnt_2024-09-19.xml'),
			'utf8',
		);
		xmltv = parseXmltvTextContent(xmltvSampleText);
	});

	it("should return an empty xmltv object if the channel doesn't exist", () => {
		// when
		const filteredChannelXmltv = filterChannel(xmltv, 'unknown-channel');

		// then
		expect(filteredChannelXmltv.channels).toHaveLength(0);
		expect(filteredChannelXmltv.programmes).toHaveLength(0);
	});

	describe('when not localized', () => {
		it('should filter channels to the requested one only', async () => {
			// given
			const channel = 'France2.fr';

			// when
			const filteredChannelXmltv = filterChannel(xmltv, channel);

			// then
			expect(filteredChannelXmltv.channels).toHaveLength(1);
			expect(filteredChannelXmltv.channels[0].id).toBe(channel);
		});

		it('should filter programmes from a specific channel', async () => {
			// given
			const channel = 'France2.fr';

			// when
			const filteredChannelXmltv = filterChannel(xmltv, channel);

			// then
			expect(
				filteredChannelXmltv.programmes.every(
					(programme) => programme.channel === channel,
				),
			).toBe(true);
		});
	});

	describe('when localized', () => {
		beforeEach(() => {
			xmltv = localize(xmltv as Xmltv, 'fr');
		});

		it('should filter channels to the requested one only', async () => {
			// given
			const channel = 'France2.fr';

			// when
			const filteredChannelXmltv = filterChannel(xmltv, channel);

			// then
			expect(filteredChannelXmltv.channels).toHaveLength(1);
			expect(filteredChannelXmltv.channels[0].id).toBe(channel);
		});

		it('should filter programmes from a specific channel', async () => {
			// given
			const channel = 'France2.fr';

			// when
			const filteredChannelXmltv = filterChannel(xmltv, channel);

			// then
			expect(
				filteredChannelXmltv.programmes.every(
					(programme) => programme.channel === channel,
				),
			).toBe(true);
		});
	});

	it('should return 158 programmes on TF1.fr channel', async () => {
		// given
		const channel = 'TF1.fr';

		// when
		const filteredChannelXmltv = filterChannel(xmltv, channel);

		// then
		expect(filteredChannelXmltv.programmes.length).toBe(158);
	});

	it('should return 235 programmes on France2.fr channel', async () => {
		// given
		const channel = 'France2.fr';

		// when
		const filteredChannelXmltv = filterChannel(xmltv, channel);

		// then
		expect(filteredChannelXmltv.programmes.length).toBe(235);
	});

	it('should return 329 programmes on France3.fr channel', async () => {
		// given
		const channel = 'France3.fr';

		// when
		const filteredChannelXmltv = filterChannel(xmltv, channel);

		// then
		expect(filteredChannelXmltv.programmes.length).toBe(329);
	});
});
