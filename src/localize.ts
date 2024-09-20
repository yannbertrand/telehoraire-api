import type {
	Xmltv,
	XmltvChannel,
	XmltvCredits,
	XmltvProgramme,
	XmltvStringWithLang,
} from '../types/xmltv.i18n.ts';
import type {
	XmltvLocalized,
	XmltvLocalizedChannel,
	XmltvLocalizedCredits,
	XmltvLocalizedProgramme,
} from '../types/xmltv.localized.ts';

export function localize(xmltv: Xmltv, lang: string): XmltvLocalized {
	const localizedChannels = localizeChannels(xmltv.channels, lang) ?? [];
	const localizedProgrammes = localizeProgrammes(xmltv.programmes, lang) ?? [];

	return {
		...xmltv,
		channels: localizedChannels,
		programmes: localizedProgrammes,
	};
}

function localizeChannels(
	channels: XmltvChannel[],
	lang: string,
): XmltvLocalizedChannel[] {
	return channels?.map((channel) => ({
		...channel,
		displayName: localizeUniqueXmltvStringWithLang(channel.displayName, lang),
	}));
}

function localizeProgrammes(
	programmes: XmltvProgramme[],
	lang: string,
): XmltvLocalizedProgramme[] {
	return programmes?.map((programme) => ({
		...programme,
		title: localizeUniqueXmltvStringWithLang(programme.title, lang),
		subTitle: localizeUniqueXmltvStringWithLang(programme.subTitle, lang),
		desc: localizeUniqueXmltvStringWithLang(programme.desc, lang),
		category: localizeXmltvStringsWithLang(programme.category, lang),
		credits: localizeCredits(programme.credits),
	}));
}

export function localizeCredits(
	credits: XmltvCredits,
): XmltvLocalizedCredits | undefined {
	if (typeof credits !== 'object') {
		return undefined;
	}

	const localizedCredits: XmltvLocalizedCredits = {};
	if (credits.director && credits?.director?.length > 0) {
		localizedCredits.director = credits.director.map(
			(director) => director._value,
		);
	}
	if (credits.actor && credits?.actor?.length > 0) {
		localizedCredits.actor = credits.actor.map((actor) => actor._value);
	}
	if (credits.writer && credits?.writer?.length > 0) {
		localizedCredits.writer = credits.writer.map((writer) => writer._value);
	}
	if (credits.adapter && credits?.adapter?.length > 0) {
		localizedCredits.adapter = credits.adapter.map((adapter) => adapter._value);
	}
	if (credits.producer && credits?.producer?.length > 0) {
		localizedCredits.producer = credits.producer.map(
			(producer) => producer._value,
		);
	}
	if (credits.composer && credits?.composer?.length > 0) {
		localizedCredits.composer = credits.composer.map(
			(composer) => composer._value,
		);
	}
	if (credits.editor && credits?.editor?.length > 0) {
		localizedCredits.editor = credits.editor.map((editor) => editor._value);
	}
	if (credits.presenter && credits?.presenter?.length > 0) {
		localizedCredits.presenter = credits.presenter.map(
			(presenter) => presenter._value,
		);
	}
	if (credits.commentator && credits?.commentator?.length > 0) {
		localizedCredits.commentator = credits.commentator.map(
			(commentator) => commentator._value,
		);
	}
	if (credits.guest && credits.guest?.length > 0) {
		localizedCredits.guest = credits.guest.map((guest) => guest._value);
	}

	return localizedCredits;
}

export function localizeUniqueXmltvStringWithLang(
	xmltvStringsWithLang: XmltvStringWithLang[],
	lang: string,
): string | undefined {
	if (
		!Array.isArray(xmltvStringsWithLang) ||
		xmltvStringsWithLang.length === 0
	) {
		return undefined;
	}

	const localizedXmltvStringWithLang = xmltvStringsWithLang.find(
		(xmltvStringWithLang) => xmltvStringWithLang.lang === lang,
	);
	if (localizedXmltvStringWithLang !== undefined) {
		return localizedXmltvStringWithLang._value;
	}

	return xmltvStringsWithLang[0]._value;
}

export function localizeXmltvStringsWithLang(
	xmltvStringsWithLang: XmltvStringWithLang[],
	lang: string,
): string[] {
	if (
		!Array.isArray(xmltvStringsWithLang) ||
		xmltvStringsWithLang.length === 0
	) {
		return [];
	}

	const localizedXmltvStrings = xmltvStringsWithLang
		.filter((xmltvStringWithLang) => xmltvStringWithLang.lang === lang)
		.map((xmltvStringWithLang) => xmltvStringWithLang._value);
	if (localizedXmltvStrings.length > 0) {
		return localizedXmltvStrings;
	}

	return localizeXmltvStringsWithLang(
		xmltvStringsWithLang,
		xmltvStringsWithLang[0].lang,
	);
}
