import type { XmltvProgramme } from '../../types/xmltv.i18n.ts';

export function getTonightPrime(programmes: XmltvProgramme[], date: Date) {
  const tonight = new Date(date);
  tonight.setHours(20, 30, 0, 0);

  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return programmes
    .filter((programme) => {
      const start = new Date(programme.start);
      return start >= tonight && start < tomorrow;
    })
    .filter((programme) => {
      const stopOrTomorrow = programme.stop >= tomorrow ? tomorrow : programme.stop;
      const duration = new Date(stopOrTomorrow).getTime() - new Date(programme.start).getTime();
      const thirthyMinutesInMilliseconds = 30 * 60 * 1000;
      return duration >= thirthyMinutesInMilliseconds;
    });
}
