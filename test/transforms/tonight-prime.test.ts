import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, it, expect, beforeEach } from 'vitest';
import { getTonightPrime } from '../../src/transforms/tonight-prime.ts';
import { parseXmltvTextContent } from '../../src/parse.ts';
import type { XmltvProgramme } from '../../types/xmltv.i18n.ts';

describe('#getTonightPrime', () => {
  let xmltvSampleText: string;
  let xmltvProgrammes: XmltvProgramme[];
  let today: Date;
  beforeEach(async () => {
    xmltvSampleText = await readFile(resolve('test', 'samples', 'fr_tnt_2024-09-19.xml'), 'utf8');
    xmltvProgrammes = parseXmltvTextContent(xmltvSampleText).programmes;
    today = new Date('2024-09-19');
  });

  it('should filter programmes beetween 20h30 and 00h00', async () => {
    // when
    const programmes = getTonightPrime(xmltvProgrammes, today);

    // then
    expect(programmes.every((programme) => programme.start.getHours() >= 20 && programme.start.getHours() < 24)).toBe(
      true,
    );
  });

  it('should filter programmes with duration < 30min (before midnight)', async () => {
    // when
    const programmes = getTonightPrime(xmltvProgrammes, today);

    // then
    expect(
      programmes.every((programme) => {
        const duration = programme.stop.getTime() - programme.start.getTime();
        const thirthyMinutesInMilliseconds = 30 * 60 * 1000;
        return duration >= thirthyMinutesInMilliseconds;
      }),
    ).toBe(true);
  });

  it('should return 2 programmes on TF1.fr channel', async () => {
    // given
    const tf1Programmes = xmltvProgrammes.filter((programme) => programme.channel === 'TF1.fr');

    // when
    const programmes = getTonightPrime(tf1Programmes, today);

    // then
    expect(programmes.length).toBe(2);
  });

  it('should return 2 programmes on France2.fr channel', async () => {
    // given
    const france2Programmes = xmltvProgrammes.filter((programme) => programme.channel === 'France2.fr');

    // when
    const programmes = getTonightPrime(france2Programmes, today);

    // then
    expect(programmes.length).toBe(2);
  });

  it('should return 2 programmes on France3.fr channel', async () => {
    // given
    const France3Programmes = xmltvProgrammes.filter((programme) => programme.channel === 'France3.fr');

    // when
    const programmes = getTonightPrime(France3Programmes, today);

    // then
    expect(programmes.length).toBe(2);
  });
});
