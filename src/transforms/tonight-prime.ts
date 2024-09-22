import type { Xmltv } from '../../types/xmltv.i18n.ts';
import type { XmltvLocalized } from '../../types/xmltv.localized.ts';

export function getTonightPrime(
	xmltv: Xmltv | XmltvLocalized,
	date: Date,
): Xmltv | XmltvLocalized {
	const tonight = new Date(date);
	tonight.setHours(20, 30, 0, 0);

	const tomorrow = new Date(date);
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(0, 0, 0, 0);

	return {
		...xmltv,
		programmes:
			xmltv.programmes
				?.filter((programme) => {
					const start = new Date(programme.start);
					return start >= tonight && start < tomorrow;
				})
				?.filter((programme) => {
					const stopOrTomorrow =
						programme.stop >= tomorrow ? tomorrow : programme.stop;
					const duration =
						new Date(stopOrTomorrow).getTime() -
						new Date(programme.start).getTime();
					const thirthyMinutesInMilliseconds = 30 * 60 * 1000;
					return duration > thirthyMinutesInMilliseconds;
				}) ?? [],
	};
}
