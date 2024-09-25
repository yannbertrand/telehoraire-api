import { existsSync } from 'node:fs';
import { env } from 'node:process';
import type { EnvironmentConfig } from '../types/config.ts';

/**
 * Get the sanitized required configuration for the application.
 *
 * @param {EnvironmentConfig} [env] The raw environment configuration.
 * @returns {EnvironmentConfig} The safe environment configuration.
 */
export function getConfig({
	SOURCE_XMLTV_URL,
	DESTINATION_JSON_FOLDER,
	TZ,
} = env): EnvironmentConfig {
	if (!URL.canParse(SOURCE_XMLTV_URL)) {
		throw new Error(
			'An XMLTV file URL must be set in a `SOURCE_XMLTV_URL` environment variable',
		);
	}

	const sourceXmltvUrl = new URL(SOURCE_XMLTV_URL);

	if (!existsSync(DESTINATION_JSON_FOLDER)) {
		throw new Error(
			'An existing folder name must be set in a `DESTINATION_JSON_FOLDER` environment variable',
		);
	}

	const destinationJsonFolder = DESTINATION_JSON_FOLDER;

	if (typeof TZ !== 'string') {
		throw new Error(
			'A valid timezone IANA identifier must be set in a `TZ` environment variable',
		);
	}

	const tz = TZ;

	return { sourceXmltvUrl, destinationJsonFolder, tz };
}

getConfig;
