import { describe, it, expectTypeOf, beforeEach, expect } from 'vitest';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { Xmltv } from '../types/xmltv.ts';
import { parseXmltvTextContent } from '../src/parse.ts';

describe('#parseXmltvTextContent', () => {
  describe('sample 1', () => {
    let xmltvSampleText: string;
    beforeEach(async () => {
      // given
      xmltvSampleText = await readFile(resolve('test', 'samples', 'cesbo-sample.xml'), 'utf8');
    });

    it('should parse valid xmltv file', async () => {
      // when
      const result = parseXmltvTextContent(xmltvSampleText);

      // then
      expectTypeOf(result).toEqualTypeOf<Xmltv>();
    });
  });

  describe('sample 2', () => {
    let xmltvSampleText: string;
    beforeEach(async () => {
      // given
      xmltvSampleText = await readFile(resolve('test', 'samples', 'fr_tnt_2024-09-19.xml'), 'utf8');
    });

    it('should parse valid xmltv file', () => {
      // when
      const result = parseXmltvTextContent(xmltvSampleText);

      // then
      expectTypeOf(result).toEqualTypeOf<Xmltv>();
    });

    it('should set generatorInfoName', () => {
      // when
      const result = parseXmltvTextContent(xmltvSampleText);

      // then
      expect(result.generatorInfoName).toBe('Téléhoraire');
    });

    it('should set generatorInfoUrl', () => {
      // when
      const result = parseXmltvTextContent(xmltvSampleText);

      // then
      expect(result.generatorInfoUrl).toBe('https://github.com/yannbertrand/telehoraire');
    });
  });
});
