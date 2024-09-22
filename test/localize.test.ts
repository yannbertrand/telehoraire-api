import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, expectTypeOf, it } from 'vitest';
import {
	localize,
	localizeUniqueXmltvStringWithLang,
	localizeXmltvStringsWithLang,
} from '../src/localize.ts';
import { parseXmltvTextContent } from '../src/parse.ts';
import { getTonightPrime } from '../src/transforms/tonight-prime.ts';
import type { Xmltv, XmltvStringWithLang } from '../types/xmltv.i18n.ts';
import type { XmltvLocalized } from '../types/xmltv.localized.ts';

describe('#localize', () => {
	describe('sample', () => {
		let xmltv: Xmltv;
		beforeEach(async () => {
			const xmltvSampleText = await readFile(
				resolve('test', 'samples', 'fr_tnt_2024-09-19.xml'),
				'utf8',
			);
			xmltv = parseXmltvTextContent(xmltvSampleText);
		});

		it('should transform sample from i18n Xmltv to XmltvLocalized', async () => {
			// when
			const result = localize(xmltv, 'fr');

			// then
			expectTypeOf(result).toEqualTypeOf<XmltvLocalized>();
		});

		it('should localize channels displayName', () => {
			// when
			const result = localize(xmltv, 'fr');

			// then
			const localizedChannelDisplayNames = result.channels.map(
				(channel) => channel.displayName,
			);
			expect(localizedChannelDisplayNames).toContain('TF1');
			expect(localizedChannelDisplayNames).toContain('France 2');
			expect(localizedChannelDisplayNames).toContain('M6');
			expect(localizedChannelDisplayNames).toContain('Gulli');
		});

		it('should localize programmes title', () => {
			// when
			const result = localize(
				getTonightPrime(xmltv, new Date('2024-09-19')),
				'fr',
			);

			// then
			const localizedProgrammeTitles = result.programmes.map(
				(programme) => programme.title,
			);
			expect(localizedProgrammeTitles).toContain('HPI');
			expect(localizedProgrammeTitles).toContain('Envoyé spécial');
			expect(localizedProgrammeTitles).toContain("Voyages au bout de l'effort");
		});

		it('should localize programmes subTitle', () => {
			// when
			const result = localize(
				getTonightPrime(xmltv, new Date('2024-09-19')),
				'fr',
			);

			// then
			const localizedProgrammeSubTitles = result.programmes.map(
				(programme) => programme.subTitle,
			);
			expect(localizedProgrammeSubTitles).toContain(
				'Coccinella septempunctata',
			);
			expect(localizedProgrammeSubTitles).toContain(undefined);
			expect(localizedProgrammeSubTitles).toContain('Dehors');
		});

		it('should localize programmes desc', () => {
			// when
			const result = localize(
				getTonightPrime(xmltv, new Date('2024-09-19')),
				'fr',
			);

			// then
			const localizedProgrammeDescs = result.programmes.map(
				(programme) => programme.desc,
			);
			expect(localizedProgrammeDescs).toContain(
				"La DIPJ enquête sur la disparition inexpliquée d'une jeune femme datant d'il y a plusieurs années, aux confins de la Bretagne. Cette enquête dans le Far West français va amener Morgane à rencontrer les parents de Karadec. C'est en effet le père du commandant, gendarme à la retraite, qui s'était occupé de cette affaire à l'époque. Il détient de nombreuses informations qui pourrait aider l'équipe à faire la lumière sur cette sombre affaire. L'occasion pour Super Poulet de régler ses comptes avec sa famille, et d'assumer enfin son désir de paternité...",
			);
			expect(localizedProgrammeDescs).toContain(
				`Au sommaire : "La météo dans le brouillard". Les prévisions de Météo France ont été automatisées, générant une pluie d'erreurs. - "Laurène, derniers regards". Laurène, 38 ans, devient peu à peu aveugle. - "Les nostalgiques de l'apartheid". En Afrique du Sud, des extrémistes cultivent la nostalgie de l'apartheid. - "Au sommet de la ruée vers l'or". Au Pérou, la Rinconada attire les chercheurs d'or.`,
			);
			expect(localizedProgrammeDescs).toContain(
				"Philippe Etchebest se rend dans un petit village de Mayenne, à Saint-Berthevin-la-Tannière, pour tenter d'aider Isabelle et son fils Jeffrey qui ont repris un restaurant il y a seulement huit mois. Leur situation est critique au point que les difficultés financières de cette famille l'obligent à avoir recours aux Restos du Cœur pour se nourrir. Chez Isabelle et Jeffrey, le chef s'est vite senti comme à la maison, mais Isabelle semble avoir de grosses difficulté à gérer son établissement : recettes trouvées sur Internet, pas de bons pour gérer le service, désorganisation en salle, le chef s'est retrouvé face à une restauratrice de bonne volonté mais totalement dépassée. Et Philippe Etchebest n'est pas au bout de ses surprises car pour la première fois, un événement va le faire douter de pouvoir réussir sa mission.",
			);
		});

		it('should localize programmes category list', () => {
			// when
			const result = localize(
				getTonightPrime(xmltv, new Date('2024-09-19')),
				'fr',
			);

			// then
			const localizedProgrammeCategories = result.programmes.map(
				(programme) => programme.category,
			);
			expect(localizedProgrammeCategories).toContainEqual([
				'Série',
				'Policier',
			]);
			expect(localizedProgrammeCategories).toContainEqual([
				'Documentaire',
				'Découvertes',
			]);
			expect(localizedProgrammeCategories).toContainEqual([
				'Divertissement',
				'Humour',
			]);
		});

		it('should localize programmes credits list', () => {
			// when
			const result = localize(
				getTonightPrime(xmltv, new Date('2024-09-19')),
				'fr',
			);

			// then
			const localizedProgrammeCredits = result.programmes.map(
				(programme) => programme.credits,
			);
			expect(localizedProgrammeCredits).toContainEqual({
				actor: [
					'Iain Glen',
					'Ferdinand Kingsley',
					'Rebecca Ferguson',
					'Christian Ochoa',
					'Harriet Walter',
					'Shane McRae',
					'Van Pierre',
					'Will Merrick',
					'Henry Garrett',
				],
				composer: ['Atli Örvarsson'],
				director: ['Morten Tyldum'],
				editor: ['Hugh Howey'],
				producer: [
					'Fred Golan',
					'Graham Yost',
					'Rebecca Ferguson',
					'Jonathan Midlane',
					'Aric Avelino',
				],
			});
			expect(localizedProgrammeCredits).toContainEqual({
				guest: ['Cyril Hanouna'],
			});
			expect(localizedProgrammeCredits).toContainEqual({
				actor: [
					'Nuno Lopes',
					'Wim Willaert',
					'Yann Goven',
					'Axel Granberger',
					'Guido Caprino',
					'Andrzej Chyra',
					'Antonio López',
					'Maxence Perrin',
					'Teng Va',
					'Francesco Casisa',
					'Arnaud Churin',
					'Felix Meyer',
				],
				adapter: ['David Oelhoffen'],
				composer: ['Superpoze'],
				director: ['David Oelhoffen'],
				guest: ['Laurent Harjani', 'Antoine Théron'],
				producer: [
					'Frédéric Bouté',
					'Olli Barbé',
					'Jacques-Henri Bronckart',
					'Gwennaëlle Libert',
					'Mathieu Simonet',
					'Daniel Marquet',
					'Nicolas Elghozi',
					'Eric Deroo',
					'Jacques Perrin',
				],
			});
		});
	});

	describe('credits', () => {
		it('should return undefined credits when empty', () => {
			// given
			const xmltv: Xmltv = {
				programmes: [
					{
						start: new Date('2024-09-19T20:00:00+02:00'),
						stop: new Date('2024-09-19T21:00:00+02:00'),
						channel: 'TF1',
						title: [{ lang: 'en', _value: 'Title' }],
					},
				],
			};

			// when
			const result = localize(xmltv, 'fr');

			// then
			expect(result.programmes[0].credits).toBeUndefined();
		});

		it('should return empty object credits if none is provided', () => {
			// given
			const xmltv: Xmltv = {
				programmes: [
					{
						start: new Date('2024-09-19T20:00:00+02:00'),
						stop: new Date('2024-09-19T21:00:00+02:00'),
						channel: 'TF1',
						title: [{ lang: 'fr', _value: 'Titre' }],
						credits: {},
					},
				],
			};

			// when
			const result = localize(xmltv, 'fr');

			// then
			expect(result.programmes[0].credits).toStrictEqual({});
		});

		it('should only localize credits director', () => {
			// given
			const xmltv: Xmltv = {
				programmes: [
					{
						start: new Date('2024-09-19T20:00:00+02:00'),
						stop: new Date('2024-09-19T21:00:00+02:00'),
						channel: 'TF1',
						title: [{ lang: 'fr', _value: 'Titre' }],
						credits: {
							director: [{ _value: 'Réalisateur' }],
						},
					},
				],
			};

			// when
			const result = localize(xmltv, 'fr');

			// then
			expect(result.programmes[0].credits?.director).toStrictEqual([
				'Réalisateur',
			]);
			expect(result.programmes[0].credits?.actor).toBeUndefined();
			expect(result.programmes[0].credits?.guest).toBeUndefined();
		});

		it('should localize all credits roles', () => {
			// given
			const xmltv: Xmltv = {
				programmes: [
					{
						start: new Date('2024-09-19T20:00:00+02:00'),
						stop: new Date('2024-09-19T21:00:00+02:00'),
						channel: 'TF1',
						title: [{ lang: 'fr', _value: 'Titre' }],
						credits: {
							director: [{ _value: 'Réalisateur' }],
							actor: [
								{ _value: 'Acteur 1', image: [{ _value: 'Acteur-1.jpg' }] },
								{
									_value: 'Acteur 2',
									url: [
										{ _value: 'https://example.org/', system: 'example.org' },
									],
								},
							],
							writer: [{ _value: 'Scénariste' }],
							adapter: [{ _value: 'Adapteur' }],
							producer: [{ _value: 'Producteur' }],
							composer: [{ _value: 'Compositeur' }],
							editor: [{ _value: 'Éditeur' }],
							presenter: [{ _value: 'Présentateur' }],
							commentator: [{ _value: 'Commentateur' }],
							guest: [
								{ _value: 'Invité 1', role: 'Invité' },
								{ _value: 'Invité 2', guest: true },
								{ _value: 'Invité 3' },
							],
						},
					},
				],
			};

			// when
			const result = localize(xmltv, 'fr');

			// then
			expect(result.programmes[0].credits?.director).toStrictEqual([
				'Réalisateur',
			]);
			expect(result.programmes[0].credits?.actor).toStrictEqual([
				'Acteur 1',
				'Acteur 2',
			]);
			expect(result.programmes[0].credits?.writer).toStrictEqual([
				'Scénariste',
			]);
			expect(result.programmes[0].credits?.adapter).toStrictEqual(['Adapteur']);
			expect(result.programmes[0].credits?.producer).toStrictEqual([
				'Producteur',
			]);
			expect(result.programmes[0].credits?.composer).toStrictEqual([
				'Compositeur',
			]);
			expect(result.programmes[0].credits?.editor).toStrictEqual(['Éditeur']);
			expect(result.programmes[0].credits?.presenter).toStrictEqual([
				'Présentateur',
			]);
			expect(result.programmes[0].credits?.commentator).toStrictEqual([
				'Commentateur',
			]);
			expect(result.programmes[0].credits?.guest).toStrictEqual([
				'Invité 1',
				'Invité 2',
				'Invité 3',
			]);
		});
	});

	describe('#localizeUniqueXmltvStringWithLang', () => {
		describe('when empty array', () => {
			it('should return undefined', () => {
				// given
				const xmltvStringsWithLang: XmltvStringWithLang[] = [];

				// when
				const result = localizeUniqueXmltvStringWithLang(
					xmltvStringsWithLang,
					'fr',
				);

				// then
				expect(result).toBeUndefined();
			});
		});

		describe('when lang available', () => {
			it('should return a unique localized _value', () => {
				// given
				const xmltvStringsWithLang: XmltvStringWithLang[] = [
					{ lang: 'en', _value: 'English' },
					{ lang: 'fr', _value: 'French' },
				];

				// when
				const result = localizeUniqueXmltvStringWithLang(
					xmltvStringsWithLang,
					'fr',
				);

				// then
				expect(result).toStrictEqual('French');
			});
		});

		describe('when lang not available', () => {
			it('should return the first unique localized _value', () => {
				// given
				const xmltvStringsWithLang: XmltvStringWithLang[] = [
					{ lang: 'br', _value: 'Breton' },
					{ lang: 'en', _value: 'English' },
				];

				// when
				const result = localizeUniqueXmltvStringWithLang(
					xmltvStringsWithLang,
					'fr',
				);

				// then
				expect(result).toStrictEqual('Breton');
			});
		});
	});

	describe('#localizeXmltvStringsWithLang', () => {
		describe('when empty array', () => {
			it('should return an empty array', () => {
				// given
				const xmltvStringsWithLang: XmltvStringWithLang[] = [];

				// when
				const result = localizeXmltvStringsWithLang(xmltvStringsWithLang, 'fr');

				// then
				expect(result).toStrictEqual([]);
			});
		});

		describe('when lang available', () => {
			it('should return all localized _values', () => {
				// given
				const xmltvStringsWithLang: XmltvStringWithLang[] = [
					{ lang: 'en', _value: 'English' },
					{ lang: 'fr', _value: 'French 1' },
					{ lang: 'fr', _value: 'French 2' },
				];

				// when
				const result = localizeXmltvStringsWithLang(xmltvStringsWithLang, 'fr');

				// then
				expect(result).toStrictEqual(['French 1', 'French 2']);
			});
		});

		describe('when lang not available', () => {
			it("should return the first item lang's localized _values", () => {
				// given
				const xmltvStringsWithLang: XmltvStringWithLang[] = [
					{ lang: 'br', _value: 'Breton 1' },
					{ lang: 'en', _value: 'English 1' },
					{ lang: 'br', _value: 'Breton 2' },
					{ lang: 'en', _value: 'English 2' },
				];

				// when
				const result = localizeXmltvStringsWithLang(xmltvStringsWithLang, 'fr');

				// then
				expect(result).toStrictEqual(['Breton 1', 'Breton 2']);
			});
		});
	});
});
