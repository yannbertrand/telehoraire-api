import { parseXmltv } from '@iptv/xmltv';
import type { Xmltv } from '../types/xmltv.i18n.ts';

/**
 * Convert the raw XMLTV text content to JavaScript object.
 *
 * @param {string} [xmltvTextContent] The raw XMLTV text content.
 * @returns {Xmltv} The parsed XMLTV file content.
 */
export function parseXmltvTextContent(xmltvTextContent: string): Xmltv {
	const xmltv = parseXmltv(xmltvTextContent);
	xmltv.generatorInfoName = 'Téléhoraire';
	xmltv.generatorInfoUrl = 'https://github.com/yannbertrand/telehoraire';

	return xmltv;
}
