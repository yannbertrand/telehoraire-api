/**
 * Fetches the XMLTV file from the given URL.
 *
 * @param {URL} [url] The URL of the XMLTV file.
 * @returns {Promise<string>} The fetched raw XMLTV text file content.
 */
export async function fetchXmltvFile(url: URL): Promise<string> {
	const response = await fetch(url.href);

	if (!response.ok) {
		throw new Error(
			`Failed to fetch XMLTV file from ${url.href} (${response.status} ${response.statusText})`,
		);
	}

	const contentType = response.headers.get('content-type');
	if (contentType !== 'application/xml' && contentType !== 'text/xml') {
		console.warn("The fetched XMLTV file content-type doesn't look like XML.");
		console.warn('Continuing anyway.');
	}

	return response.text();
}
