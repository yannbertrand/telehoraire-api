import { getConfig } from './config.ts';
import { fetchXmltvFile } from './fetch.ts';
import { parseXmltvTextContent } from './parse.ts';

import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { localize } from './localize.ts';
import { filterChannel } from './transforms/filter-channel.ts';
import { getTonightPrime } from './transforms/tonight-prime.ts';

export async function build(): Promise<void> {
	const config = getConfig();
	console.log('Got config');

	const xmltvTextContent = await fetchXmltvFile(config.sourceXmltvUrl);
	console.log('Fetched XMLTV file');

	const xmltv = parseXmltvTextContent(xmltvTextContent);
	console.log('Parsed XMLTV file');

	await writeFile(
		resolve(config.destinationJsonFolder, 'tnt.i18n.json'),
		JSON.stringify(xmltv),
	);
	console.log(`Wrote ${config.destinationJsonFolder}/tnt.i18n.json file`);

	const prime = getTonightPrime(xmltv, new Date());
	await writeFile(
		resolve(config.destinationJsonFolder, 'tnt.prime.i18n.json'),
		JSON.stringify(prime),
	);
	console.log(`Wrote ${config.destinationJsonFolder}/tnt.prime.i18n.json file`);

	const localized = localize(xmltv, 'fr');
	await writeFile(
		resolve(config.destinationJsonFolder, 'tnt.fr.json'),
		JSON.stringify(localized),
	);
	console.log(`Wrote ${config.destinationJsonFolder}/tnt.fr.json file`);

	for (const channel of localized.channels) {
		await writeFile(
			resolve(config.destinationJsonFolder, `${channel.id}.json`),
			JSON.stringify(filterChannel(localized, channel.id)),
		);
		console.log(
			`Wrote ${config.destinationJsonFolder}/${channel.id}.json file`,
		);
	}

	const localizedPrime = localize(prime, 'fr');
	await writeFile(
		resolve(config.destinationJsonFolder, 'tnt.prime.fr.json'),
		JSON.stringify(localizedPrime),
	);
	console.log(`Wrote ${config.destinationJsonFolder}/tnt.prime.fr.json file`);

	for (const channel of localizedPrime.channels) {
		await writeFile(
			resolve(config.destinationJsonFolder, `${channel.id}.prime.json`),
			JSON.stringify(filterChannel(localizedPrime, channel.id)),
		);
		console.log(
			`Wrote ${config.destinationJsonFolder}/${channel.id}.prime.json file`,
		);
	}
}

await build();
