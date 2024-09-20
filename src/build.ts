import { getConfig } from './config.ts';
import { fetchXmltvFile } from './fetch.ts';
import { parseXmltvTextContent } from './parse.ts';

import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { getTonightPrime } from './transforms/tonight-prime.ts';
import { localize } from './localize.ts';

export async function build(): Promise<void> {
  const config = getConfig();
  console.log('Got config');

  const xmltvTextContent = await fetchXmltvFile(config.sourceXmltvUrl);
  console.log('Fetched XMLTV file');

  const xmltv = parseXmltvTextContent(xmltvTextContent);
  console.log('Parsed XMLTV file');

  await writeFile(resolve('dist', 'tnt.i18n.json'), JSON.stringify(xmltv));
  console.log('Wrote dist/tnt.i18n.json file');

  const prime = { ...xmltv, programmes: getTonightPrime(xmltv.programmes, new Date()) };
  await writeFile(resolve('dist', 'tnt.prime.i18n.json'), JSON.stringify(prime));
  console.log('Wrote dist/tnt.prime.i18n.json file');

  const localized = localize(xmltv, 'fr');
  await writeFile(resolve('dist', 'tnt.fr.json'), JSON.stringify(localized));
  console.log('Wrote dist/tnt.fr.json file');

  const localizedPrime = localize(prime, 'fr');
  await writeFile(resolve('dist', 'tnt.prime.fr.json'), JSON.stringify(localizedPrime));
  console.log('Wrote dist/tnt.prime.fr.json file');
}

await build();
