import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { parseXmltvTextContent } from '../../src/parse.ts';
import { getTonightPrime } from '../../src/transforms/tonight-prime.ts';
import type { Xmltv } from '../../types/xmltv.i18n.ts';

describe('#getTonightPrime', () => {
	let xmltvSampleText: string;
	let xmltv: Xmltv[];
	let today: Date;
	beforeEach(async () => {
		xmltvSampleText = await readFile(
			resolve('test', 'samples', 'fr_tnt_2024-09-19.xml'),
			'utf8',
		);
		xmltv = parseXmltvTextContent(xmltvSampleText);
		today = new Date('2024-09-19');
	});

	it('should filter programmes beetween 20h30 and 00h00', async () => {
		// when
		const filteredXmltv = getTonightPrime(xmltv.programmes, today);

		// then
		expect(
			filteredXmltv.programmes.every(
				(programme) =>
					programme.start.getHours() >= 20 && programme.start.getHours() < 24,
			),
		).toBe(true);
	});

	it('should filter programmes with duration <= 30min (before midnight)', async () => {
		// when
		const filteredXmltv = getTonightPrime(xmltv.programmes, today);

		// then
		expect(
			filteredXmltv.programmes.every((programme) => {
				const duration = programme.stop.getTime() - programme.start.getTime();
				const thirthyMinutesInMilliseconds = 30 * 60 * 1000;
				return duration >= thirthyMinutesInMilliseconds;
			}),
		).toBe(true);
	});

	it('should return empty programmes array if none found', () => {
		// when
		const filteredXmltv = getTonightPrime({ programmes: [] }, today);

		// then
		expect(filteredXmltv.programmes).toStrictEqual([]);
	});

	it('should return 2 programmes on TF1.fr channel', async () => {
		// given
		const tf1Programmes = xmltv.programmes.filter(
			(programme) => programme.channel === 'TF1.fr',
		);

		// when
		const filteredXmltv = getTonightPrime({ programmes: tf1Programmes }, today);

		// then
		expect(filteredXmltv.programmes.length).toBe(2);
	});

	it('should return 2 programmes on France2.fr channel', async () => {
		// given
		const france2Programmes = xmltv.programmes.filter(
			(programme) => programme.channel === 'France2.fr',
		);

		// when
		const filteredXmltv = getTonightPrime(
			{ programmes: france2Programmes },
			today,
		);

		// then
		expect(filteredXmltv.programmes.length).toBe(2);
	});

	it('should return 2 programmes on France3.fr channel', async () => {
		// given
		const france3Programmes = xmltv.programmes.filter(
			(programme) => programme.channel === 'France3.fr',
		);

		// when
		const filteredXmltv = getTonightPrime(
			{ programmes: france3Programmes },
			today,
		);

		// then
		expect(filteredXmltv.programmes.length).toBe(2);
	});
});
