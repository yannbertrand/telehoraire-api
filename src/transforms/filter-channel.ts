import type { Xmltv } from '../../types/xmltv.i18n.ts';
import type { XmltvLocalized } from '../../types/xmltv.localized.ts';

export function filterChannel(
	xmltv: Xmltv | XmltvLocalized,
	wantedChannel: string,
): Xmltv | XmltvLocalized {
	const channel = xmltv.channels?.find(
		(channel) => channel.id === wantedChannel,
	);

	if (channel === undefined) {
		return { ...xmltv, channels: [], programmes: [] };
	}

	return {
		...xmltv,
		channels: [channel],
		programmes:
			xmltv.programmes?.filter(
				(programme) => programme.channel === wantedChannel,
			) ?? [],
	};
}
