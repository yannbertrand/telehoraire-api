import { env } from 'node:process';
import type { EnvironmentConfig } from '../types/config.ts';

/**
 * Get the sanitized required configuration for the application.
 *
 * @param {EnvironmentConfig} [env] The raw environment configuration.
 * @returns {EnvironmentConfig} The safe environment configuration.
 */
export function getConfig({ SOURCE_XMLTV_URL } = env): EnvironmentConfig {
  if (!URL.canParse(SOURCE_XMLTV_URL)) {
    throw new Error('An XMLTV file URL must be set in a `SOURCE_XMLTV_URL` environment variable');
  }

  const sourceXmltvUrl = new URL(SOURCE_XMLTV_URL);

  return { sourceXmltvUrl };
}

getConfig;
